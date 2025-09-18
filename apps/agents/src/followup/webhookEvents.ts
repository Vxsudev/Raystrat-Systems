import type { Express } from 'express';
import express from 'express';
import { verifySignedEvent } from '../sendgrid/verifySignature.js';
import { db } from '../firestore.js';
import type { ApiResult } from '../types.js';

const RAW_LIMIT = '256kb';

export function bindWebhookEventsRoute(app: Express) {
  app.post('/webhooks/sendgrid/:tenantId', express.raw({ type: 'application/json', limit: RAW_LIMIT }), async (req, res) => {
    const t0 = Date.now();
    const tenantId = req.params.tenantId;

    try {
      const signature = req.header('x-twilio-email-event-webhook-signature') || '';
      const timestamp = req.header('x-twilio-email-event-webhook-timestamp') || '';
      const rawBody: Buffer = Buffer.isBuffer(req.body) ? req.body : Buffer.from(req.body);

      const ok = await verifySignedEvent(tenantId, { signature, timestamp }, rawBody);
      if (!ok) return res.status(401).json({ ok:false, status:401, code:'WEBHOOK_VERIFY_FAILED' } satisfies ApiResult);

      // Only parse after verification succeeds
      let payload: any = {};
      try { payload = JSON.parse(rawBody.toString('utf8')); } catch { /* ignore */ }
      const arr = Array.isArray(payload) ? payload : [payload];

      const nowMs = Date.now();
      const batch = db.batch();
      for (const ev of arr) {
        batch.set(db.collection('events').doc(), {
          tenantId,
          type: `sendgrid.${ev?.event ?? 'unknown'}`,
          route: 'webhooks.sendgrid',
          createdAt: nowMs,
          sgEventId: ev?.sg_event_id,
          sgMessageId: ev?.sg_message_id,
          email: ev?.email,
          timestamp: ev?.timestamp,
        }, { merge: true });

        // Optional: mark engagement; replies will be handled by inbound parse endpoint later
      }
      await batch.commit();

      res.json({ ok:true } satisfies ApiResult);
    } catch (e) {
      res.status(500).json({ ok:false, status:500, code:'WEBHOOK_ERROR', details:(e as Error).message } satisfies ApiResult);
    } finally {
      console.log(JSON.stringify({ tenantId, route:'/webhooks/sendgrid/:tenantId', op:'ingest', status: res.statusCode, durationMs: Date.now()-t0 }));
    }
  });
}
