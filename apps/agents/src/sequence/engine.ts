
// apps/agents/src/sequence/engine.ts
import { db } from '../firestore';
import { sendEmail } from '../sendgrid/send';
import {
  LeadDoc, LeadSequence, EngineRunResult, SequenceState, SequenceStep,
} from '../types';
import * as admin from 'firebase-admin';

const BATCH_LIMIT = 100;
const DEFAULT_RATE_LIMIT_PER_MIN = 60;
const DEFAULT_REPLY_SUPPRESS_MIN = 72 * 60; // 72 hours

export async function runDueSequences(tenantId: string, nowMs = Date.now()): Promise<EngineRunResult> {
  const t0 = Date.now();
  let checked = 0, attempted = 0, sent = 0, suppressed = 0, throttled = 0, alreadySent = 0, errors = 0;

  // 1) fetch due batch
  const snap = await db.collection('leadSequences')
    .where('tenantId', '==', tenantId)
    .where('state', '==', 'scheduled')
    .where('nextRunAt', '<=', nowMs)
    .limit(BATCH_LIMIT)
    .get();

  checked = snap.size;

  for (const doc of snap.docs) {
    const seqRef = doc.ref;

    // 2) claim atomically
    const claimed = await db.runTransaction(async (tx) => {
      const fresh = await tx.get(seqRef);
      if (!fresh.exists) return false;
      const s = fresh.data() as LeadSequence;
      if (s.state !== 'scheduled' || s.nextRunAt > nowMs) return false;
      tx.update(seqRef, { state: 'sending', lastAttemptAt: nowMs });
      return true;
    });
    if (!claimed) continue;

    try {
      const seqSnap = await seqRef.get();
      const seq = seqSnap.data() as LeadSequence;

      // Load lead
      const leadSnap = await db.collection('leads').doc(seq.leadId).get();
      const lead = leadSnap.data() as LeadDoc;

      // Guard: suppression / idempotency / rate-limit
      const guard = await evaluateGuards(seq, lead, nowMs);
      if (guard.action === 'suppress') { suppressed++; await writeEvent('email.suppressed', seq, lead); await reschedOrCompleteAfterSuppress(seqRef, seq, nowMs); continue; }
      if (guard.action === 'alreadySent') { alreadySent++; await advanceOrComplete(seqRef, seq, nowMs); continue; }
      if (guard.action === 'throttle') { throttled++; await throttle(seqRef, seq, nowMs); continue; }

      attempted++;

      // Build message
      const step = seq.steps[seq.currentStep];
      const idempotencyKey = `${seq.id}:${seq.currentStep}`;
      const res = await sendEmail({
        tenantId: seq.tenantId,
        idempotencyKey,
        message: {
          from: { email: 'no-reply@raystratsystems.com', name: 'Raystrat' },
          to: [{ email: lead.email, name: lead.name }],
          subject: render(step.templateSubject, lead),
          html: step.templateHtml ? render(step.templateHtml, lead) : undefined,
          text: step.templateText ? render(step.templateText, lead) : undefined,
        },
      });

      if (res.ok) {
        sent++;
        await writeEvent('email.sent', seq, lead, { idempotencyKey, status: res.status });
        await advanceOrComplete(seqRef, seq, nowMs);
      } else {
        await writeEvent('email.failed', seq, lead, { code: res.code, details: res.details, status: res.status });
        await retryOrError(seqRef, seq, nowMs);
        errors++;
      }
    } catch (e) {
      await seqRef.update({ state: 'error', pauseReason: `engine_error:${(e as Error).message}` });
      errors++;
    }
  }

  return { tenantId, checked, attempted, sent, suppressed, throttled, alreadySent, errors, durationMs: Date.now() - t0 };
}

// Helper implementations
async function evaluateGuards(seq: LeadSequence, lead: LeadDoc, nowMs: number): Promise<{action: 'ok'|'suppress'|'alreadySent'|'throttle'}> {
  // Suppression Guard
  if (lead.unsubscribed || lead.doNotContact) {
    return { action: 'suppress' };
  }
  const step = seq.steps[seq.currentStep];
  const suppressMinutes = step.suppressIfRepliedMinutes ?? DEFAULT_REPLY_SUPPRESS_MIN;
  if (lead.lastInboundReplyAt && (nowMs - lead.lastInboundReplyAt) < suppressMinutes * 60 * 1000) {
    return { action: 'suppress' };
  }

  // Idempotency Guard
  const idempotencyKey = `${seq.id}:${seq.currentStep}`;
  const eventSnap = await db.collection('events')
    .where('tenantId', '==', seq.tenantId)
    .where('idempotencyKey', '==', idempotencyKey)
    .where('type', '==', 'email.sent')
    .limit(1)
    .get();
  if (!eventSnap.empty) {
    return { action: 'alreadySent' };
  }

  // Rate Limit Guard
  const rateLimit = seq.rateLimitPerMin ?? DEFAULT_RATE_LIMIT_PER_MIN;
  const oneMinAgo = nowMs - 60 * 1000;
  const sentInLastMinSnap = await db.collection('events')
    .where('tenantId', '==', seq.tenantId)
    .where('type', '==', 'email.sent')
    .where('createdAt', '>=', oneMinAgo)
    .get();
  
  if (sentInLastMinSnap.size >= rateLimit) {
    return { action: 'throttle' };
  }

  return { action: 'ok' };
}

async function writeEvent(type: string, seq: LeadSequence, lead: LeadDoc, extra: Record<string, unknown> = {}) {
  await db.collection('events').add({
    tenantId: seq.tenantId,
    type,
    createdAt: Date.now(),
    seqId: seq.id,
    stepIndex: seq.currentStep,
    leadId: lead.id,
    ...extra,
  });
}

async function reschedOrCompleteAfterSuppress(seqRef: admin.firestore.DocumentReference, seq: LeadSequence, nowMs: number) {
  // Reschedule for 24 hours later to re-evaluate
  const nextRunAt = nowMs + 24 * 60 * 60 * 1000;
  await seqRef.update({ state: 'scheduled', nextRunAt, pauseReason: 'suppressed_auto_reschedule' });
}

async function throttle(seqRef: admin.firestore.DocumentReference, seq: LeadSequence, nowMs: number) {
  // Reschedule for 60 seconds later
  const nextRunAt = nowMs + 60 * 1000;
  await seqRef.update({ state: 'scheduled', nextRunAt, pauseReason: 'rate_limited' });
}

async function advanceOrComplete(seqRef: admin.firestore.DocumentReference, seq: LeadSequence, nowMs: number) {
  const nextStepIndex = seq.currentStep + 1;
  if (nextStepIndex >= seq.steps.length) {
    await seqRef.update({ state: 'done' });
    await writeEvent('sequence.done', seq, { id: seq.leadId } as LeadDoc);
  } else {
    const nextStep = seq.steps[nextStepIndex];
    const nextRunAt = nowMs + nextStep.delayMinutes * 60 * 1000;
    await seqRef.update({ state: 'scheduled', currentStep: nextStepIndex, nextRunAt, attemptCount: 0 });
    await writeEvent('sequence.advance', seq, { id: seq.leadId } as LeadDoc, { nextStep: nextStepIndex });
  }
}

async function retryOrError(seqRef: admin.firestore.DocumentReference, seq: LeadSequence, nowMs: number) {
  const step = seq.steps[seq.currentStep];
  const maxRetries = step.maxRetries ?? 3;
  const currentAttempt = seq.attemptCount ?? 0;

  if (currentAttempt < maxRetries) {
    const backoffSeconds = step.backoffSeconds ?? 30;
    const nextAttempt = currentAttempt + 1;
    const delayMs = Math.pow(nextAttempt, 2) * backoffSeconds * 1000;
    const nextRunAt = nowMs + delayMs;
    await seqRef.update({ state: 'scheduled', nextRunAt, attemptCount: nextAttempt });
  } else {
    await seqRef.update({ state: 'error', pauseReason: 'max_retries_exceeded' });
  }
}

function render(tpl: string, lead: LeadDoc): string {
  return tpl.replace(/\{\{name\}\}/g, lead.name?.split(' ')[0] ?? 'there');
}
