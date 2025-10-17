// apps/agents/src/sendgrid/send.ts
import { accessTenantSecret } from '../secrets/secretManager.js';
import type { SendRequest, SendResult } from '../types.js';
import sgMail, {
  type MailDataRequired,
  type ClientResponse,
} from '@sendgrid/mail';

/**
 * Sends an email via SendGrid using a per-tenant API key loaded from Secret Manager.
 * - Secret name convention: sg_key__TENANT_<tenantId>
 * - Caller must supply a strong Idempotency-Key (e.g., sequenceEventId)
 */
export async function sendEmail(req: SendRequest): Promise<SendResult> {
  const { tenantId, idempotencyKey, message } = req;

  if (!tenantId) {
    return { ok: false, status: 400, code: 'TENANT_REQUIRED' };
  }
  if (!idempotencyKey) {
    return { ok: false, status: 400, code: 'IDEMPOTENCY_KEY_REQUIRED' };
  }

  // Load per-tenant API key
  const secretName = `sg_key__TENANT_${tenantId}`;
  try {
    const projectId = process.env.GOOGLE_CLOUD_PROJECT || '';
    if (!projectId) {
      return { ok: false, status: 500, code: 'PROJECT_ID_MISSING' };
    }
    const apiKey = await accessTenantSecret(projectId, secretName);
    sgMail.setApiKey(apiKey);
  } catch (e) {
    return {
      ok: false,
      status: 500,
      code: 'SECRET_LOAD_FAILED',
      details: { secretName, error: (e as Error).message },
    };
  }

  // Build base payload using Partial<MailDataRequired> to avoid version-specific types.
  const base: Partial<MailDataRequired> = {
    to: message.to,
    from: { email: 'team@raystratsystems.com', name: 'Raystrat' },
    subject: message.subject,
    headers: {
      ...(message.headers ?? {}),
      'Idempotency-Key': idempotencyKey,
    },
    customArgs: message.customArgs,
  };

  // Conditionally add body (text/html). At least one is required.
  const body: Partial<MailDataRequired> = {};
  if (message.text) (body as any).text = message.text;
  if (message.html) (body as any).html = message.html;

  if (!(body as any).text && !(body as any).html) {
    return {
      ok: false,
      status: 400,
      code: 'NO_CONTENT',
      details: 'Email must have either a text or html body.',
    };
  }

  const sgMessage = { ...base, ...body } as MailDataRequired;

  try {
    const [res] = (await sgMail.send(sgMessage)) as [ClientResponse, unknown];

    if (res.statusCode >= 200 && res.statusCode < 300) {
      const hdrs = res.headers || {};
      const requestId =
        (hdrs['x-message-id'] as string | undefined) ??
        (hdrs['X-Message-Id'] as string | undefined) ??
        undefined;

      return { ok: true, status: res.statusCode, requestId };
    }

    let details: unknown = res.body;
    if (typeof res.body === 'string') {
      try {
        details = JSON.parse(res.body);
      } catch {
        /* keep raw string */
      }
    }

    return {
      ok: false,
      status: res.statusCode,
      code: 'SENDGRID_SEND_FAILED',
      details,
    };
  } catch (error: any) {
    const status =
      typeof error?.code === 'number' ? (error.code as number) : 500;

    let details: unknown = error?.message;
    const respBody = error?.response?.body;
    if (respBody) {
      try {
        details =
          typeof respBody === 'string'
            ? JSON.parse(respBody)
            : respBody.errors || respBody;
      } catch {
        details = respBody;
      }
    }

    return {
      ok: false,
      status,
      code: 'SENDGRID_EXCEPTION',
      details,
    };
  }
}
