# Spec: Legal Foundation Surfaces v1

## Status
approved

## Phase
phase-legal-foundation

## Capability

Deploy production-ready **Privacy** and **Terms** surfaces and reintroduce footer legal
navigation (Privacy + Terms only) with restrained institutional presentation. Tone target:
serious operational infrastructure vendor — not VC SaaS, not a legal-document generator,
not enterprise compliance theater. Branch `feature/legal-foundation-surfaces`.

This is a partial resurfacing of surfaces hidden by capability
`HIDE_DEFERRED_LEGAL_TRUST_SURFACES` (see `ai/deferred/deferred-public-trust-surfaces.md`).
Only Privacy + Terms are resurfaced; Documentation, Trust, Principal, Continuity remain deferred.

## Data Model Changes
none

## API Surface
none

## Frontend Surface

### Routes (reuse `src/app/principal/page.tsx` documentary template)
- `src/app/privacy/page.tsx` — Privacy surface.
- `src/app/terms/page.tsx` — Terms surface.

Both: `<div className="flex flex-col min-h-screen"><Header/><main className="flex-1">…<Footer/></div>`,
restrained width (`max-w-2xl`/`max-w-3xl`), eyebrow + H1 + section hierarchy, manual body
styling (no glossy chrome, no icons, no diagrams). Each exports `metadata`.

### Privacy — required content
Effective date; company identification (Raystrat Systems, operating from India);
information collected; contact-form data handling; analytics/cookies disclosure;
third-party processors (Firebase, Google GenAI/Genkit, SendGrid, hosting/Google Cloud);
AI provider processing disclosure ("Raystrat may use third-party AI/infrastructure
providers to operate systems and workflows"); data retention; security statement
(operational, no "military-grade"); user rights / contact (team@raystratsystems.com);
international processing language; policy updates clause; **embedded cookie disclosure
section** (no separate route, no banner).

### Terms — required content
Scope of services (operational systems, automation workflows, reporting infrastructure,
integrations, implementation services); operational/infrastructure positioning; client
responsibilities (clients remain responsible for reviewing operational outputs and
maintaining internal controls); third-party dependency disclaimer; AI output disclaimer;
no-guaranteed-outcomes clause; IP boundaries; service modification/termination rights;
limitation of liability; **governing law = India**; contact information.
Explicitly disclaim: guaranteed business outcomes, uninterrupted uptime, legal/compliance
certification, sole-decision AI authority.

### Footer (`src/components/footer.tsx`)
Reintroduce **only** Privacy + Terms as low-noise inline links in the bottom utility bar
near the brand/copyright. Do NOT restore a "Legal" column or the old `legalLinks` array;
keep grid at 2 columns. Do NOT restore Documentation, Trust, Principal, Continuity.

### Cookie strategy
No popup/banner. Minimal disclosure embedded in Privacy. Document deferral in
`ai/deferred/cookie-consent-banner.md` (triggers: ads, retargeting, advanced analytics,
EU-specific compliance expansion).

### SEO
Register `/privacy` + `/terms` in `src/app/sitemap.ts`.

### Deferred registry reconciliation
Update `ai/deferred/deferred-public-trust-surfaces.md`: mark Privacy + Terms RESURFACED
(routes now exist, footer-linked); the other four remain deferred.

## Forbidden

Invented certifications; GDPR cosplay / fake DPO; compliance badges; "military-grade
security"; guarantees of uptime, outcomes, or zero-risk AI; fiduciary/regulatory
accreditation claims; cookie consent banner/popup; restoring the four still-deferred
surfaces; decorative shields/checkmark grids/enterprise gradients; any homepage regression.

## Verification

`scripts/verification/023-legal-foundation-surfaces.sh`: privacy + terms routes exist;
footer links Privacy + Terms (hrefs `/privacy`, `/terms`); four deferred surfaces absent
from footer; no cookie banner mounted; required Privacy + Terms sections present; governing
law = India in Terms; cookie disclosure present in Privacy; no banned trust/security/
compliance language in new pages; footer brand/Systems/Engage intact, grid 2-col.
Reconcile `022` for Privacy/Terms resurfacing. Run `001` typecheck, `003` build, and full
numeric regression suite. Best-effort route 200 checks.

## Stop Condition

Privacy + Terms routes production-ready; footer legal links restored minimally; cookie
popup intentionally absent and documented; build + verification suite green; no visual
regression to the homepage authority pass.
