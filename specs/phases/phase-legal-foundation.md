Phase: phase-legal-foundation
Description: Public legal foundation surfaces. Privacy + Terms pages and restrained footer legal navigation. Frontend-only — no data model or API changes. Conservative, operational, non-compliance-theater posture.
Layers: frontend, verification

# Phase Spec — Raystrat Legal Foundation

## Intent

Establish the minimal, production-ready public legal posture for Raystrat Systems:
a Privacy surface and a Terms surface, written to read like a serious operational
infrastructure vendor — not VC SaaS, not a legal-document generator, not enterprise
compliance theater. Reintroduce only Privacy + Terms into the footer. Defer cookie
consent infrastructure and the remaining trust surfaces (Documentation, Trust,
Principal, Continuity).

## Scope boundary

- IN: `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, footer legal links,
  cookie disclosure inside Privacy, deferred-banner registry, sitemap entries,
  verification gate, gate 022 reconciliation, deferred registry update.
- OUT: cookie consent banner/popup, any of the four still-deferred surfaces,
  homepage / hero / section changes, data model, API, auth surfaces.

## Invariants

- INV-001 marketing domain isolation: legal routes are public, render Header/Footer
  only, safe without a session.
- No fabricated certifications, regulatory accreditation, fiduciary duty, uptime,
  zero-risk AI, or outcome guarantees.
- No new cookie-banner libraries or consent infrastructure.
- No regression to the homepage authority pass.

## Layers

- frontend: pages, footer, cookie disclosure, sitemap, deferred docs.
- verification: gate 023 + 022 reconciliation + typecheck/build/suite.
