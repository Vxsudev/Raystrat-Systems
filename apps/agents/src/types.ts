
export type SendRequest = {
  tenantId: string;
  idempotencyKey: string;     // required per Critical Requirements
  message: OutboundEmail;
};

export type SendResult =
  | { ok: true; status: number; requestId?: string }
  | { ok: false; status: number; code: string; details?: unknown };

export type VerifyHeaders = {
  signature: string; // x-twilio-email-event-webhook-signature
  timestamp: string; // x-twilio-email-event-webhook-timestamp
};

export type SequenceState = 'idle' | 'scheduled' | 'sending' | 'paused' | 'done' | 'error';

export type LeadRef = { id: string; tenantId: string };

export type LeadDoc = {
  id: string;
  tenantId: string;
  email: string;
  name?: string;
  unsubscribed?: boolean;
  doNotContact?: boolean;
  lastInboundReplyAt?: number; // ms epoch
};

export type SequenceStep = {
  stepIndex: number;
  templateSubject: string;
  templateHtml?: string;
  templateText?: string;
  delayMinutes: number; // delay to next step when success
  suppressIfRepliedMinutes?: number; // default 72h if unset
  maxRetries?: number; // default 3
  backoffSeconds?: number; // default 30
};

export type LeadSequence = {
  id: string;
  tenantId: string;
  leadId: string;
  state: SequenceState;
  currentStep: number;
  steps: SequenceStep[];
  nextRunAt: number; // ms epoch
  lastAttemptAt?: number;
  pauseReason?: string;
  rateLimitPerMin?: number; // optional tenant override
  attemptCount?: number;
};

export type EngineRunResult = {
  tenantId: string;
  checked: number;
  attempted: number;
  sent: number;
  suppressed: number;
  throttled: number;
  alreadySent: number;
  errors: number;
  durationMs: number;
};
export type OutboundEmail = {
  from: { email: string; name?: string };
  to: { email: string; name?: string }[];
  subject: string;
  text?: string;
  html?: string;
  headers?: Record<string, string>;
  customArgs?: Record<string, string | number | boolean>;
};

