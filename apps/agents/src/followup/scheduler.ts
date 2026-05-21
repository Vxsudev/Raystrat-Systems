import type { Express } from 'express';
import { runDueSequences } from '../sequence/engine.js';
import type { ApiResult } from '../types.js';
import { db } from '../firestore.js';

export function bindSchedulerRoute(app: Express) {
  app.post('/scheduler/run', async (req, res) => {
    const t0 = Date.now();
    try {
      // --- Secret validation (header first, fallback to body) ---
      const headerSecret = req.header('x-cron-secret') || '';
      let bodySecret = '';
      try {
        bodySecret = (req.body && (req.body as any).cronSecret) || '';
      } catch {
        bodySecret = '';
      }

      const provided = headerSecret || bodySecret;
      if (provided !== process.env.CRON_SECRET) {
        return res
          .status(401)
          .json({ ok: false, status: 401, code: 'CRON_UNAUTHORIZED' } satisfies ApiResult);
      }

      // --- Tenant selection ---
      const body = (req.body ?? {}) as { tenantId?: string; batchLimit?: number };
      let tenantIds: string[];
      if (body.tenantId) {
        tenantIds = [body.tenantId];
      } else {
        const tenantsSnap = await db.collection('tenants').select().get();
        tenantIds = tenantsSnap.docs.map((d) => d.id);
      }

      if (!tenantIds.length) {
        return res
          .status(400)
          .json({ ok: false, status: 400, code: 'NO_TENANTS_CONFIGURED' } satisfies ApiResult);
      }

      // --- Run due sequences per tenant ---
      const results = [];
      for (const t of tenantIds) {
        results.push(await runDueSequences(t, body.batchLimit));
      }

      res.json({ ok: true, data: results } satisfies ApiResult);
    } catch (e) {
      res
        .status(500)
        .json({
          ok: false,
          status: 500,
          code: 'SCHEDULER_ERROR',
          details: (e as Error).message,
        } satisfies ApiResult);
    } finally {
      console.log(
        JSON.stringify({
          route: '/scheduler/run',
          op: 'tick',
          status: res.statusCode,
          durationMs: Date.now() - t0,
        })
      );
    }
  });
}
