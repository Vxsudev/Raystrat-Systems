
export type SequenceStep = { id: string; waitMs: number; channel: "email"; templateKey: string; abKey?: string };

export type TenantSettings = {
  id: string;
  fromName: string;
  fromEmail: string;
  replyTo?: string;
  templateIds: Record<string, string>;
  sequences: Record<string, { name: string; steps: SequenceStep[] }>;
};

// SendGrid outbound message shape (minimal for our use)
export type OutboundEmail = {
  from: { email: string; name?: string };
  to: { email: string; name?: string }[];
  subject: string;
  text?: string;
  html?: string;
  headers?: Record<string, string>;
  customArgs?: Record<string, string | number | boolean>;
};

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
  // Not a persisted field, just for engine logic
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
