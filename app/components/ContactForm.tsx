"use client";

import { useRef, useState } from "react";
import { FORMSPREE_ENDPOINT } from "../lib/site";

type Fields = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; name: string }
  | { kind: "error"; message: string };

const EMPTY: Fields = { name: "", email: "", company: "", message: "" };

const FALLBACK_ERROR =
  "We could not send your enquiry. Your details are still in the form — please try again, or email founder@raystratsystems.com.";

// Formspree's own field name for its honeypot spam filter. If this field
// arrives non-empty, Formspree silently discards the submission server-side.
const HONEYPOT_FIELD = "_gotcha";

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  else if (values.name.trim().length > 120) errors.name = "Please keep your name under 120 characters.";
  if (!values.email.trim()) {
    errors.email = "Please enter your work email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.company.trim()) errors.company = "Please enter your company.";
  else if (values.company.trim().length > 160)
    errors.company = "Please keep your company under 160 characters.";
  if (!values.message.trim()) errors.message = "Please tell us what you want to solve.";
  else if (values.message.trim().length < 10)
    errors.message = "Please add a little more detail (at least 10 characters).";
  else if (values.message.trim().length > 4000)
    errors.message = "Please keep your message under 4000 characters.";
  return errors;
}

// Formspree's field-level error responses use { field, message } (or
// { field, code } with no message on some plans) per its documented
// SubmissionError shape. Only fields we actually render are mapped; anything
// else falls back to the top-level error/generic message so nothing is
// silently dropped.
const RENDERED_FIELDS = ["name", "email", "company", "message"] as const;

function isRenderedField(value: unknown): value is keyof Fields {
  return (RENDERED_FIELDS as readonly unknown[]).includes(value);
}

function mapFormspreeFieldErrors(
  formspreeErrors: unknown
): Errors | null {
  if (!Array.isArray(formspreeErrors)) return null;
  const mapped: Errors = {};
  for (const entry of formspreeErrors as unknown[]) {
    const field = (entry as { field?: unknown } | null)?.field;
    const message = (entry as { message?: unknown } | null)?.message;
    if (isRenderedField(field) && typeof message === "string") {
      mapped[field] = message;
    }
  }
  return Object.keys(mapped).length > 0 ? mapped : null;
}

export default function ContactForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const honeypot = useRef("");

  const update = (key: keyof Fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (status.kind !== "sending") setStatus({ kind: "idle" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status.kind === "sending") return; // belt-and-braces against double submit
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus({ kind: "idle" });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          company: values.company,
          message: values.message,
          _replyto: values.email,
          [HONEYPOT_FIELD]: honeypot.current,
        }),
      });
      const data = await res.json().catch(() => ({}));

      // Formspree signals failure via response shape (an `error` string
      // and/or an `errors` array), not solely via HTTP status — treat
      // either as present as a rejection, matching how its own client
      // libraries discriminate success from error responses.
      const hasError =
        typeof data?.error === "string" ||
        (Array.isArray(data?.errors) && data.errors.length > 0);

      if (res.ok && !hasError) {
        const sentName = values.name.split(" ")[0] || "there";
        setValues(EMPTY);
        setStatus({ kind: "success", name: sentName });
        return;
      }

      const fieldErrors = mapFormspreeFieldErrors(data?.errors);
      if (fieldErrors) {
        setErrors(fieldErrors);
        setStatus({ kind: "idle" });
        return;
      }

      const message =
        typeof data?.error === "string" && data.error.trim()
          ? data.error
          : FALLBACK_ERROR;
      setStatus({ kind: "error", message });
    } catch {
      setStatus({ kind: "error", message: FALLBACK_ERROR });
    }
  };

  const sending = status.kind === "sending";

  return (
    <form className="form" onSubmit={handleSubmit} noValidate data-testid="contact-form">
      <div className="field">
        <label htmlFor="name">
          Name <span className="req-star" aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={120}
          value={values.name}
          onChange={update("name")}
          aria-required="true"
          aria-invalid={errors.name ? "true" : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          data-testid="contact-name-input"
        />
        {errors.name && (
          <p className="field-error" id="name-error" data-testid="contact-name-error">
            {errors.name}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="email">
          Work email <span className="req-star" aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          value={values.email}
          onChange={update("email")}
          aria-required="true"
          aria-invalid={errors.email ? "true" : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          data-testid="contact-email-input"
        />
        {errors.email && (
          <p className="field-error" id="email-error" data-testid="contact-email-error">
            {errors.email}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="company">
          Company <span className="req-star" aria-hidden="true">*</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          maxLength={160}
          value={values.company}
          onChange={update("company")}
          aria-required="true"
          aria-invalid={errors.company ? "true" : undefined}
          aria-describedby={errors.company ? "company-error" : undefined}
          data-testid="contact-company-input"
        />
        {errors.company && (
          <p className="field-error" id="company-error" data-testid="contact-company-error">
            {errors.company}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="message">
          What are you trying to solve? <span className="req-star" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={4000}
          value={values.message}
          onChange={update("message")}
          aria-required="true"
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          data-testid="contact-message-input"
        />
        {errors.message && (
          <p className="field-error" id="message-error" data-testid="contact-message-error">
            {errors.message}
          </p>
        )}
      </div>

      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          onChange={(e) => {
            honeypot.current = e.target.value;
          }}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={sending}
        data-testid="contact-submit-button"
      >
        {sending ? "Sending…" : "Discuss Your Project"}
      </button>

      <div aria-live="polite">
        {status.kind === "success" && (
          <div className="form-status info" role="status" data-testid="contact-form-status">
            Thanks, {status.name}. Your enquiry has been sent to the Raystrat team and we will reply
            to the email address you gave.
          </div>
        )}
        {status.kind === "error" && (
          <div className="form-status error" role="alert" data-testid="contact-form-error-status">
            {status.message}
          </div>
        )}
      </div>
    </form>
  );
}
