import type { Express } from 'express';
import type { ApiResult } from '../types.js';

export function bindInboundParseRoute(app: Express) {
  app.post('/inbound/parse', async (_req, res) => {
    res.json({ ok:true, data:{ note:'placeholder' } } satisfies ApiResult);
  });
}
