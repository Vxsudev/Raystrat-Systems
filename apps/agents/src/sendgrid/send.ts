
import { accessTenantSecret } from '../secrets/secretManager.js';
import type { SendRequest, SendResult } from '../types.js';
import sgMail from '@sendgrid/mail';

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
    sgMail.setApiKey(apiKey);
  } catch (e) {
    return {
      ok: false,
      status: 500,
      code: 'SECRET_LOAD_FAILED',
      details: { secretName, error: (e as Error).message },
    };
  }
  
  try {
    const sgMessage: sgMail.MailDataRequired = {
      to: message.to,
      from: message.from,
      subject: message.subject,
      headers: {
        ...message.headers,
        'Idempotency-Key': idempotencyKey,
      },
      customArgs: message.customArgs,
    };

    if (message.text) {
      sgMessage.text = message.text;
    }
    if (message.html) {
      sgMessage.html = message.html;
    }
    
    const [res] = await sgMail.send(sgMessage);

    if (res.statusCode >= 200 && res.statusCode < 300) {
      // SendGrid often returns 202 for accepted.
      const requestId = res.headers['x-message-id'] ? String(res.headers['x-message-id']) : undefined;
      return { ok: true, status: res.statusCode, requestId };
    }
    
    let details: unknown;
    try {
      if (typeof res.body === 'string') {
        details = JSON.parse(res.body);
      } else {
        details = res.body;
      }
    } catch {
      details = res.body;
    }

    return {
        ok: false,
        status: res.statusCode,
        code: 'SENDGRID_SEND_FAILED',
        details,
    };

  } catch (error: any) {
    let errorDetails: any = error.message;
    if (error.response && error.response.body) {
        try {
            // response.body can be a string or an object
            if (typeof error.response.body === 'string') {
                 errorDetails = JSON.parse(error.response.body).errors;
            } else {
                errorDetails = error.response.body.errors || error.response.body;
            }
        } catch (e) {
            errorDetails = error.response.body;
        }
    }
    
    return {
      ok: false,
      status: error?.code ?? 500,
      code: 'SENDGRID_EXCEPTION',
      details: errorDetails
    }
  }
}
