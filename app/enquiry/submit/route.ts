import { NextResponse, type NextRequest } from "next/server";

const LIMITS = {
  name: 120,
  email: 254,
  company: 160,
  message: 4000,
};

const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX = 3;
const MIN_FILL_MS = 2500;

const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

function clientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type Errors = Record<string, string>;

function validate(body: Record<string, unknown>) {
  const errors: Errors = {};
  const read = (key: string) => (typeof body[key] === "string" ? (body[key] as string).trim() : "");

  const name = read("name");
  const email = read("email");
  const company = read("company");
  const message = read("message");

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name) errors.name = `Please keep your name under ${LIMITS.name} characters.`;

  if (!email) errors.email = "Please enter your work email.";
  else if (email.length > LIMITS.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email = "Please enter a valid email address.";

  if (!company) errors.company = "Please enter your company.";
  else if (company.length > LIMITS.company)
    errors.company = `Please keep your company under ${LIMITS.company} characters.`;

  if (!message) errors.message = "Please tell us what you want to solve.";
  else if (message.length < 10) errors.message = "Please add a little more detail (at least 10 characters).";
  else if (message.length > LIMITS.message)
    errors.message = `Please keep your message under ${LIMITS.message} characters.`;

  return { errors, values: { name, email, company, message } };
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_request" }, { status: 400 });
  }

  // Spam checks: honeypot field and implausibly fast submission.
  const honeypot = typeof body.website === "string" ? body.website.trim() : "";
  const elapsed = typeof body.elapsedMs === "number" ? body.elapsedMs : Number.MAX_SAFE_INTEGER;
  if (honeypot || elapsed < MIN_FILL_MS) {
    return NextResponse.json({ ok: false, reason: "rejected" }, { status: 422 });
  }

  const { errors, values } = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, reason: "validation", errors }, { status: 400 });
  }

  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      {
        ok: false,
        reason: "rate_limited",
        message:
          "You have sent several enquiries recently. Please wait a few minutes, or email founder@raystratsystems.com directly.",
      },
      { status: 429 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const enabled = process.env.ENQUIRY_DELIVERY_ENABLED === "true";

  if (!enabled || !apiKey || !from || !to) {
    return NextResponse.json(
      {
        ok: false,
        reason: "not_configured",
        message:
          "Email delivery is not configured yet, so this enquiry was not sent. Your details are still in the form — please email founder@raystratsystems.com and we will reply.",
      },
      { status: 503 }
    );
  }

  const subject = `Enquiry — ${values.company} (${values.name})`;
  const html = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#141414;">
  <tr><td style="padding-bottom:14px;font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:#6b6b6b;">Raystrat Systems — website enquiry</td></tr>
  <tr><td style="padding:4px 0;"><strong>Name:</strong> ${escapeHtml(values.name)}</td></tr>
  <tr><td style="padding:4px 0;"><strong>Work email:</strong> ${escapeHtml(values.email)}</td></tr>
  <tr><td style="padding:4px 0;"><strong>Company:</strong> ${escapeHtml(values.company)}</td></tr>
  <tr><td style="padding:16px 0 6px;"><strong>What are you trying to solve?</strong></td></tr>
  <tr><td style="padding:0;white-space:pre-wrap;line-height:1.55;">${escapeHtml(values.message)}</td></tr>
</table>`;

  const text = `Raystrat Systems — website enquiry

Name: ${values.name}
Work email: ${values.email}
Company: ${values.company}

What are you trying to solve?
${values.message}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend rejected enquiry", res.status, detail);
      return NextResponse.json(
        {
          ok: false,
          reason: "provider_error",
          message:
            "We could not send your enquiry just now. Your details are still in the form — please try again, or email founder@raystratsystems.com.",
        },
        { status: 502 }
      );
    }

    const data = (await res.json()) as { id?: string };
    return NextResponse.json({ ok: true, id: data.id ?? null });
  } catch (error) {
    console.error("Enquiry delivery failed", error);
    return NextResponse.json(
      {
        ok: false,
        reason: "network_error",
        message:
          "We could not reach our email service. Your details are still in the form — please try again, or email founder@raystratsystems.com.",
      },
      { status: 502 }
    );
  }
}
