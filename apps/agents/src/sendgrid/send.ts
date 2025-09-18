import { accessTenantSecret } from '../secrets/secretManager.js';
import type { SendRequest, SendResult } from '../types.js';

const SENDGRID_ENDPOINT = 'https://api.sendgrid.com/v3/mail/send';

/**
 * Sends an email via SendGrid using a per-tenant API key loaded from Secret Manager.
 * Requirements:
 *  - Per-tenant key name: sg_key__TENANT_<tenantId>
 *  - Caller supplies a strong Idempotency-Key (e.g., sequenceEventId)
 */
export async function sendEmail(req: SendRequest): Promise<SendResult> {
  const { tenantId, idempotencyKey, message } = req;

  if (!tenantId) {
    return { ok: false, status: 400, code: 'TENANT_REQUIRED' };
  }
  if (!idempotencyKey) {
    return { ok: false, status: 400, code: 'IDEMPOTENCY_KEY_REQUIRED' };
  }

  // Secret name convention: sg_key__TENANT_<tenantId>
  const secretName = `sg_key__TENANT_${tenantId}`;
  let apiKey: string;
  try {
    apiKey = await accessTenantSecret(process.env.GOOGLE_CLOUD_PROJECT || "", secretName);
  } catch (e) {
    return {
      ok: false,
      status: 500,
      code: 'SECRET_LOAD_FAILED',
      details: { secretName, error: (e as Error).message },
    };
  }
  
  const [res] = await (sg as any).send({
    to: message.to,
    from: message.from,
    subject: message.subject,
    text: message.text,
    html: message.html,
    headers: message.headers,
    customArgs: message.customArgs,
    idempotencyKey: idempotencyKey,
  }, (err: any, result: any) => {
    if (err) {
      // Not using custom error type for now
    }
  }, apiKey);


  if (res.statusCode >= 200 && res.statusCode < 300) {
    // SendGrid often returns 202 for accepted.
    const requestId = res.headers['x-message-id'] ?? undefined;
    return { ok: true, status: res.statusCode, requestId };
  }

  let details: unknown;
  try {
    details = JSON.parse(res.body);
  } catch {
    details = res.body;
  }

  return {
    ok: false,
    status: res.statusCode,
    code: 'SENDGRID_SEND_FAILED',
    details,
  };
}