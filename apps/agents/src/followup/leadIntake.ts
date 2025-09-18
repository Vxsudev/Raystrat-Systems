import type { Express } from 'express';
import { db } from '../firestore.js';
import { requireRole } from '../auth/verifyToken.js';
import type { LeadIntakeRequest, ApiResult, LeadDoc, LeadSequence, SequenceStep } from '../types';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function bindLeadIntakeRoute(app: Express) {
  app.post('/followup/lead-intake', requireRole('writer', 'admin'), async (req, res) => {
    const t0 = Date.now();
    const auth = (req as any).auth as { tenantId: string; uid: string };
    const tenantId = auth?.tenantId;
    let leadIdForLog: string | undefined;

    try {
      const body = req.body as LeadIntakeRequest;
      if (!tenantId) return res.status(401).json({ ok:false, status:401, code:'TENANT_MISSING' } satisfies ApiResult);
      if (!body?.email || !EMAIL_RE.test(body.email))
        return res.status(400).json({ ok:false, status:400, code:'INVALID_EMAIL' } satisfies ApiResult);
      if (!body.steps && !body.sequenceTemplateId)
        return res.status(400).json({ ok:false, status:400, code:'MISSING_STEPS_OR_TEMPLATE' } satisfies ApiResult);

      // TODO (template): resolve sequenceTemplateId → steps
      const steps: SequenceStep[] = body.steps ?? [];
      if (!steps.length)
        return res.status(400).json({ ok:false, status:400, code:'EMPTY_STEPS' } satisfies ApiResult);

      // Upsert lead
      const leadRef = db.collection('leads').doc(); // could de-dup by email per tenant later
      leadIdForLog = leadRef.id;
      const lead: LeadDoc = { id: leadRef.id, tenantId, email: body.email, name: body.name };
      await leadRef.set(lead, { merge: true });

      // Soft de-dup: block duplicate sequence creation for same lead/template in 10m unless force=true
      if (!body.force) {
        const since = Date.now() - 10 * 60 * 1000;
        const dup = await db.collection('events')
          .where('tenantId', '==', tenantId)
          .where('type', '==', 'sequence.create')
          .where('leadId', '==', leadRef.id)
          .where('createdAt', '>=', since)
          .limit(1).get();
        if (!dup.empty) {
          return res.status(409).json({ ok:false, status:409, code:'DUPLICATE_SEQUENCE_RECENT' } satisfies ApiResult);
        }
      }

      const seqRef = db.collection('leadSequences').doc();
      const nowMs = Date.now();
      const nextRunAt = nowMs + (Math.max(0, body.startInMinutes ?? 0) * 60_000);
      const seq: Omit<LeadSequence, 'id'> & { id?: string } = {
        tenantId,
        leadId: leadRef.id,
        state: 'scheduled',
        currentStep: 0,
        steps,
        nextRunAt,
      };
      
      seq.id = seqRef.id;

      await seqRef.set(seq);
      await db.collection('events').add({
        tenantId, type: 'sequence.create', route: 'lead-intake', createdAt: nowMs,
        seqId: seqRef.id, leadId: leadRef.id,
      });

      res.json({ ok: true, data: { seqId: seqRef.id } } satisfies ApiResult);
    } catch (e) {
      res.status(500).json({
        ok: false, status: 500, code: 'LEAD_INTAKE_ERROR', details: (e as Error).message,
      } satisfies ApiResult);
    } finally {
      // light structured log
      console.log(JSON.stringify({ tenantId, leadId: leadIdForLog, route:'/followup/lead-intake', op:'create', status: res.statusCode, durationMs: Date.now()-t0 }));
    }
  });
}
