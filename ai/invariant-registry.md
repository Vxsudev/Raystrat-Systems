# Invariant Registry — Raystrat Systems Website

## Purpose

Catalogue of all invariants extracted from project doctrine.
Each invariant is classified as RATIFIED (programmatically enforceable) or
CANDIDATE (requires runtime/human judgment).

RATIFIED invariants are enforced by `vendor/engineering-os/scripts/invariant-engine.sh`.
CANDIDATE invariants are recorded here but NOT enforced automatically.

Source files:
- `ai/product-invariants.md`
- `ai/runtime-contracts.md`
- `ai/service-boundaries.md`

---

## RATIFIED Invariants

Enforced by the invariant engine on every supervisor run.

| ID | Name | Source | Enforcement Level | Rule File |
|----|------|--------|-------------------|-----------|
| INV-001 | Marketing domain isolation | `ai/product-invariants.md` | CHECK | `.engineering-os/invariants/INV-001-marketing-domain-isolation.sh` |
| INV-002 | No client-side secret exposure | `ai/product-invariants.md` | CHECK | `.engineering-os/invariants/INV-002-no-client-side-secrets.sh` |
| INV-003 | Genkit flows server-only boundary | `ai/runtime-contracts.md` | CHECK | `.engineering-os/invariants/INV-003-genkit-server-boundary.sh` |

### INV-001 Detail

**Invariant:** The marketing domain (`raystratsystems.com`) must never render dashboard routes or app-authenticated surfaces. Host-based routing in `src/app/page.tsx` enforces this split.

**Check:** Verify the host-router in `src/app/page.tsx` still contains the domain-conditional branch and that no dashboard components are imported unconditionally at the page root.

**Source citation:** "domain router + marketing section composition" — `src/app/page.tsx`

---

### INV-002 Detail

**Invariant:** No API keys, service account credentials, or secret tokens may appear in client-side TypeScript/TSX files (files under `src/` that are not API routes or server actions).

**Check:** Grep `src/` excluding `src/app/api/` and `src/app/actions.ts` for patterns: `process.env.GOOGLE_`, `process.env.SENDGRID_`, `process.env.FIREBASE_PRIVATE`, raw key-like strings.

**Source citation:** Genkit flows and Firebase Admin must remain server-side only — `ai/runtime-contracts.md`

---

### INV-003 Detail

**Invariant:** Genkit AI flows (`src/ai/flows/`) must only be imported from server-side entry points: API routes (`src/app/api/`) or server actions (`src/app/actions.ts`). They must never be imported from client components.

**Check:** Verify no `src/components/**/*.tsx` file has a *runtime* import from `@/ai/flows/`. `import type` statements are permitted (they are erased at compile time). Client components may only receive typed output via server action return values or `import type` for TypeScript safety.

**Source citation:** "`@/ai/flows/service-suggester`" imported only in `src/app/actions.ts` — current architecture.

---

## Candidate Invariants

Ratified in doctrine but NOT yet programmatically enforceable without runtime infrastructure.

| ID | Name | Source | Reason Not Enforced |
|----|------|--------|---------------------|
| CAND-001 | App subdomain serves only auth'd users | `ai/product-invariants.md` | Requires runtime session check; not statically detectable |
| CAND-002 | No Firebase Admin SDK in edge runtime | `ai/runtime-contracts.md` | Edge detection requires deploy-time manifest analysis |
