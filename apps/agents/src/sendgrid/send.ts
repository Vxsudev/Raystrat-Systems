
import { accessTenantSecret } from '../secrets/secretManager.js';
import type { SendRequest, SendResult } from '../types.js';
import sgMail, { MailDataRequired, ClientResponse } from '@sendgrid/mail';

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

  // Build message using standard fields; no MailContent[] type required.
  if (!message.text && !message.html) {
    return {
      ok: false,
      status: 400,
      code: 'NO_CONTENT',
      details: 'Email must have either a text or html body.',
    };
  }

  const sgMessage: MailDataRequired = {
    to: message.to,
    from: message.from,
    subject: message.subject,
    text: message.text,
    html: message.html,
    headers: {
      ...(message.headers ?? {}),
      'Idempotency-Key': idempotencyKey,
    },
    customArgs: message.customArgs,
  };

  try {
    const [res] = (await sgMail.send(sgMessage)) as [ClientResponse, unknown];

    // 2xx considered success; SendGrid often returns 202.
    if (res.statusCode >= 200 && res.statusCode < 300) {
      // Try to pull request id if present (header keys may vary in case)
      const hdrs = res.headers || {};
      const requestId =
        (hdrs['x-message-id'] as string | undefined) ??
        (hdrs['X-Message-Id'] as string | undefined) ??
        undefined;

      return { ok: true, status: res.statusCode, requestId };
    }

    // Include response body (string or object) for diagnostics
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
    // Normalize error details from @sendgrid/mail
    let status =
      typeof error?.code === 'number'
        ? (error.code as number)
        : 500;

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
