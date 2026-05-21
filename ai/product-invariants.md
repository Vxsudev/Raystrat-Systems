# Product Invariants — Raystrat Systems Website

## Context

Raystrat Systems is a B2B data + AI services company. This repository serves two surfaces:

1. **Marketing site** (`raystratsystems.com`) — public-facing, no auth
2. **App dashboard** (`app.raystratsystems.com`) — auth-gated client portal

These surfaces share a single Next.js deployment but must remain architecturally isolated.

---

## Invariant 1 — Marketing Domain Isolation

**Statement:** The marketing host must never render authenticated dashboard surfaces. The host-based router in `src/app/page.tsx` is the enforcement boundary.

**Rationale:** Mixing public and auth'd surfaces creates confusion, leaks dashboard UI to unauthenticated visitors, and breaks the brand segmentation between marketing and product.

**Constraint:** Any component that appears unconditionally on the marketing path must be safe to render without a session. Dashboard components must only appear inside the `app.raystratsystems.com` branch of the host router.

**Status:** RATIFIED — enforced by INV-001.

---

## Invariant 2 — No Client-Side Secret Exposure

**Statement:** Service credentials (Google AI API keys, SendGrid keys, Firebase private keys) must never appear in client-bundle code.

**Rationale:** Next.js server components, API routes, and server actions run exclusively on the server. Any credential placed in a client component or a non-prefixed env var becomes part of the browser bundle.

**Constraint:** All AI flow invocations, Firebase Admin operations, and email dispatch must originate from `src/app/api/` routes or `src/app/actions.ts` (server actions). Client components may only hold typed outputs.

**Status:** RATIFIED — enforced by INV-002.

---

## Candidate Invariant — App Subdomain Auth Gate

**Statement:** Every route under `app.raystratsystems.com` must redirect unauthenticated visitors to the sign-in page.

**Rationale:** The dashboard is a client-visible service portal. Unauthenticated access would expose client data.

**Status:** CANDIDATE — runtime enforcement; not statically checkable.
