# Runtime Contracts — Raystrat Systems Website

## Overview

This document defines the runtime boundary contracts that must hold in production.
These are architectural facts, not aspirational goals.

---

## Contract 1 — Genkit Flows Are Server-Only

**Boundary:** `src/ai/flows/` → server-side only.

**Permitted callers:**
- `src/app/api/genkit/**/*.ts` (API routes)
- `src/app/actions.ts` (Next.js server actions)

**Forbidden callers:**
- Any file under `src/components/`
- Any file under `src/app/` that is NOT an API route or server action

**Why:** Genkit flows invoke Google GenAI with an API key sourced from `process.env.GOOGLE_GENAI_API_KEY`. This must never reach the browser bundle.

**Status:** RATIFIED — enforced by INV-003.

---

## Contract 2 — Firebase Admin Is Server-Only

**Boundary:** Firebase Admin SDK (initialized via service account) must only be used in `functions/` (Cloud Functions) or server-side Next.js code.

**Permitted callers:**
- `functions/` (Cloud Functions for Firebase)
- `src/app/api/` routes
- `src/app/actions.ts`

**Forbidden callers:**
- Any client component
- Any edge runtime route (`runtime = 'edge'`)

**Why:** Firebase Admin holds full read/write access to Firestore. Client-side exposure would allow privilege escalation.

**Status:** CANDIDATE — edge detection requires deploy-time analysis.

---

## Contract 3 — SendGrid Email Dispatch Is Server-Only

**Boundary:** All email sending via SendGrid API must originate from `src/app/api/contact/` or `functions/`.

**Why:** SendGrid API key must remain server-side. Email dispatch from the browser would expose the key and enable abuse.

**Status:** CANDIDATE — structurally enforced by Next.js API routing; not explicitly checked.

---

## Contract 4 — Dataconnect Is Firebase Data Connect

**Boundary:** `dataconnect/` is a Firebase Data Connect schema definition — it is NOT application code. Changes there require a `firebase deploy --only dataconnect` step that is separate from the Next.js build.

**Why:** Prevents accidental breakage from treating schema files as regular TypeScript imports.

**Status:** CANDIDATE — structural separation; documented for human awareness.
