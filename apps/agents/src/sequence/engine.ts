// apps/agents/src/sequence/engine.ts
import { db } from '../firestore.js';
import { sendEmail } from '../sendgrid/send.js';
import {
  LeadDoc, LeadSequence, EngineRunResult, SequenceState, SequenceStep,
} from '../types.js';
import * as admin from 'firebase-admin';

const BATCH_LIMIT = 100;
const DEFAULT_RATE_LIMIT_PER_MIN = 60;
const DEFAULT_REPLY_SUPPRESS_MIN = 72 * 60; // 72 hours
const MAX_REPLY_SUPPRESS_MIN = 30 * 24 * 60; // 30 days

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
      
      if (!lead?.email) {
          await writeEvent('email.failed', seq, lead, { code: 'NO_RECIPIENT', reason: 'Lead email is missing or invalid' });
          await seqRef.update({ state: 'error', pauseReason: 'no_recipient' });
          errors++;
          continue;
      }

      // Guard: suppression / idempotency / rate-limit
      const guard = await evaluateGuards(seq, lead, nowMs);
      if (guard.action === 'suppress') { suppressed++; await writeEvent('email.suppressed', seq, lead, { reason: guard.reason }); await reschedOrCompleteAfterSuppress(seqRef, seq, nowMs); continue; }
      if (guard.action === 'alreadySent') { alreadySent++; await advanceOrComplete(seqRef, seq, nowMs); continue; }
      if (guard.action === 'throttle') { throttled++; await throttle(seqRef, seq, nowMs); continue; }

      attempted++;
      
      // Idempotency Write-Barrier
      const idempotencyKey = `${seq.id}:${seq.currentStep}`;
      const dedupeRef = db.collection('idempotency').doc(`${seq.tenantId}__${idempotencyKey}`);
      try {
        await dedupeRef.create({ tenantId: seq.tenantId, key: idempotencyKey, createdAt: nowMs });
      } catch {
        alreadySent++;
        await writeEvent('email.suppressed', seq, lead, { reason: 'alreadySent(dedupe)' });
        await advanceOrComplete(seqRef, seq, nowMs);
        continue;
      }

      // Build message
      const step = seq.steps[seq.currentStep];
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
        errors++;
        await writeEvent('email.failed', seq, lead, { code: res.code, details: res.details, status: res.status });
        await retryOrError(seqRef, seq, nowMs);
      }
    } catch (e) {
      errors++;
      await seqRef.update({ state: 'error', pauseReason: `engine_error:${(e as Error).message}` });
    }
  }

  return { tenantId, checked, attempted, sent, suppressed, throttled, alreadySent, errors, durationMs: Date.now() - t0 };
}

// Helper implementations
async function evaluateGuards(seq: LeadSequence, lead: LeadDoc, nowMs: number): Promise<{action: 'ok'|'suppress'|'alreadySent'|'throttle', reason?: string}> {
  // Suppression Guard
  if (lead.unsubscribed || lead.doNotContact) {
    return { action: 'suppress', reason: 'do_not_contact' };
  }
  const step = seq.steps[seq.currentStep];
  let suppressMinutes = step.suppressIfRepliedMinutes ?? DEFAULT_REPLY_SUPPRESS_MIN;
  suppressMinutes = Math.min(suppressMinutes, MAX_REPLY_SUPPRESS_MIN);

  if (lead.lastInboundReplyAt && (nowMs - lead.lastInboundReplyAt) < suppressMinutes * 60 * 1000) {
    return { action: 'suppress', reason: 'recent_reply' };
  }

  // Idempotency Guard (read check as a fallback)
  const idempotencyKey = `${seq.id}:${seq.currentStep}`;
  const eventSnap = await db.collection('events')
    .where('tenantId', '==', seq.tenantId)
    .where('idempotencyKey', '==', idempotencyKey)
    .limit(1)
    .get();
  if (!eventSnap.empty) {
    return { action: 'alreadySent', reason: 'idempotency_key_exists' };
  }

  // Rate Limit Guard
  const rateLimit = seq.rateLimitPerMin ?? DEFAULT_RATE_LIMIT_PER_MIN;
  const oneMinAgo = nowMs - 60 * 1000;
  const sentInLastMinSnap = await db.collection('events')
    .where('tenantId', '==', seq.tenantId)
    .where('type', '==', 'email.sent')
    .where('createdAt', '>=', oneMinAgo)
    .count()
    .get();
  
  if (sentInLastMinSnap.data().count >= rateLimit) {
    return { action: 'throttle', reason: 'rate_limit_exceeded' };
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
  const currentAttempt = (seq as any).attemptCount ?? 0;

  if (currentAttempt < maxRetries) {
    const backoffSeconds = step.backoffSeconds ?? 30;
    const attempt = currentAttempt + 1;
    const baseDelay = backoffSeconds * 1000;
    const backoffDelay = Math.min(15 * 60 * 1000, baseDelay * Math.pow(2, attempt)); // Cap at 15 mins
    const jitter = Math.floor(Math.random() * 5000); // 0-5s jitter
    const nextRunAt = nowMs + backoffDelay + jitter;
    
    await seqRef.update({ state: 'scheduled', nextRunAt, attemptCount: attempt });
  } else {
    await seqRef.update({ state: 'error', pauseReason: 'max_retries_exceeded' });
  }
}

function render(tpl: string, lead: LeadDoc): string {
  if (!lead.name) return tpl.replace(/\{\{name\}\}/g, 'there');
  return tpl.replace(/\{\{name\}\}/g, lead.name.split(' ')[0]);
}
