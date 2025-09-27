// apps/agents/src/index.ts
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import crypto from 'crypto';
import { db } from './firestore.js';
import { verifyToken } from './auth/verifyToken.js';
import { bindLeadIntakeRoute } from './followup/leadIntake.js';
import { bindSchedulerRoute } from './followup/scheduler.js';
import { bindWebhookEventsRoute } from './followup/webhookEvents.js';
import { bindInboundParseRoute } from './followup/inboundParse.js';

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', true);

const SERVICE = 'followup-agent';
const VERSION = process.env.SERVICE_VERSION || 'dev';
const CRON_SECRET = process.env.RAYSTRAT_CRON_SECRET;

// 1) Request ID / start log
app.use((req: Request, _res: Response, next: NextFunction) => {
  (req as any).id = req.headers['x-request-id'] || crypto.randomUUID();
  (req as any).startTs = Date.now();
  console.log(JSON.stringify({
    ts: Date.now(), level: 'info', service: SERVICE, version: VERSION,
    event: 'request.start', reqId: (req as any).id, method: req.method, url: req.url
  }));
  next();
});

// 2) Basic security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Request-Id', (req as any).id);
  res.setHeader('X-Service', SERVICE);
  res.setHeader('X-Version', VERSION);
  next();
});

// 3) CORS (strict allowlist)
const ALLOW_ORIGINS = new Set((process.env.ALLOWED_ORIGINS || 'https://app.raystratsystems.com').split(','));
app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, false); // disallow non-browser by default
    cb(null, ALLOW_ORIGINS.has(origin));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type', 'x-cron-secret'],
  credentials: false,
  maxAge: 86400,
}));
app.use((req, res, next) => { res.setHeader('Vary', 'Origin'); next(); });

// Explicit preflight handler
app.options('*', (_req, res) => {
  res.status(204).end();
});

// 4) Webhook route with RAW body is bound within its own module now

// 5) JSON parser for the rest
app.use(express.json({ limit: '1mb' }));


// 6) Route binders
app.use('/followup/lead-intake', verifyToken);
bindLeadIntakeRoute(app);
bindSchedulerRoute(app);
bindWebhookEventsRoute(app);
bindInboundParseRoute(app);

// 7) Health / readiness
app.get('/healthz', (_req, res) => res.json({ ok: true }));
app.get('/readyz', async (_req, res) => {
  const t0 = Date.now();
  try {
    const p = db.listCollections();
    const timeout = new Promise((_r, rej) => setTimeout(() => rej(new Error('timeout')), 250));
    await Promise.race([p, timeout]);
    res.json({ ok: true, durationMs: Date.now() - t0 });
  } catch (e) {
    res.status(503).json({ ok: false, code: 'NOT_READY', details: (e as Error).message });
  }
});

// 8) 404 handler
app.use((_req, res) => {
  res.status(404).json({ ok: false, status: 404, code: 'NOT_FOUND' });
});

// 9) Error handler (structured)
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  const status = err?.status || 500;
  const code = err?.code || 'UNHANDLED_ERROR';
  console.error(JSON.stringify({
    ts: Date.now(), level: 'error', service: SERVICE, version: VERSION,
    event: 'request.error', reqId: (req as any).id, status, code, msg: err?.message, stack: err?.stack,
  }));
  res.status(status).json({ ok: false, status, code, details: err?.message });
});

// 10) End log
app.use((req: Request, res: Response, next: NextFunction) => {
  const startTs = (req as any).startTs ?? Date.now();
  res.on('finish', () => {
    console.log(JSON.stringify({
      ts: Date.now(), level: 'info', service: SERVICE, version: VERSION,
      event: 'request.end', reqId: (req as any).id, method: req.method, url: req.url,
      status: res.statusCode, durationMs: Date.now() - startTs
    }));
  });
  next();
});

// Optional runtime guard
if (!CRON_SECRET) {
  console.warn(`[${SERVICE}] RAYSTRAT_CRON_SECRET not set. /scheduler/run will reject until configured.`);
}

// Server bootstrap for local/dev or Cloud Run
if (process.env.NODE_ENV !== 'test') {
  const port = Number(process.env.PORT || 8080);
  app.listen(port, () => {
    console.log(JSON.stringify({
      ts: Date.now(), level: 'info', service: SERVICE, version: VERSION,
      event: 'server.listen', port
    }));
  });
}

export default app;
