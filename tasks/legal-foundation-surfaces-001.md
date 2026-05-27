# Task: Build Privacy + Terms surfaces and reintroduce footer legal links

## Parent Spec
specs/legal-foundation-surfaces.md

## Phase
phase-legal-foundation

## Status
done

## Layer
frontend

## Description
Create the public Privacy and Terms pages and restore minimal footer legal navigation.

1. `src/app/privacy/page.tsx` — reuse the documentary template from
   `src/app/principal/page.tsx` (Header / `main flex-1` / Footer; `container`; restrained
   `max-w` width; eyebrow + H1 + sectioned hierarchy; manual body styling, no icons/diagrams).
   Export `metadata`. Include all required Privacy sections (effective date, company
   identification — Raystrat Systems operating from India, information collected, contact-form
   data handling, analytics/cookies disclosure, third-party processors: Firebase / Google
   GenAI(Genkit) / SendGrid / hosting(Google Cloud), AI provider processing disclosure, data
   retention, operational security statement, user rights + contact team@raystratsystems.com,
   international processing, policy updates) plus an embedded cookie disclosure section. No
   banner, no `/cookies` route.
2. `src/app/terms/page.tsx` — same template. Include scope of services, operational/
   infrastructure positioning, client responsibilities (review outputs + maintain internal
   controls), third-party dependency disclaimer, AI output disclaimer, no-guaranteed-outcomes,
   IP boundaries, modification/termination, limitation of liability, governing law = India,
   contact. Explicitly disclaim guaranteed outcomes, uninterrupted uptime, legal/compliance
   certification, sole-decision AI authority.
3. `src/components/footer.tsx` — add Privacy + Terms as low-noise inline links in the bottom
   utility bar near the copyright. Keep grid at 2 columns; do NOT add a "Legal" column or the
   old `legalLinks` array; do NOT add Documentation/Trust/Principal/Continuity.
4. `src/app/sitemap.ts` — add `/privacy` and `/terms`.
5. `ai/deferred/cookie-consent-banner.md` — document the deferred banner (why + triggers).
6. `ai/deferred/deferred-public-trust-surfaces.md` — mark Privacy + Terms RESURFACED; other
   four remain deferred.

Adhere to ai/coding-patterns.md (RSC pages, `@/` aliases, Tailwind, no client secrets) and
INV-001 (public routes safe without a session — no AuthProvider / Firebase client bootstrap).
No banned language: certifications, GDPR cosplay, fake DPO, "military-grade", uptime/outcome/
zero-risk guarantees, compliance badges.

## Acceptance Criteria
- [ ] `src/app/privacy/page.tsx` and `src/app/terms/page.tsx` exist, export `metadata`, render Header+Footer, contain all required sections.
- [ ] Privacy contains an embedded cookie disclosure section; no banner/popup component and no `/cookies` route added.
- [ ] Terms states governing law = India and includes the required disclaimers.
- [ ] Footer links Privacy (`/privacy`) + Terms (`/terms`) in the utility bar; grid stays 2-col; no "Legal" column / `legalLinks` array; no Documentation/Trust/Principal/Continuity.
- [ ] `sitemap.ts` includes `/privacy` and `/terms`.
- [ ] `cookie-consent-banner.md` exists; `deferred-public-trust-surfaces.md` marks Privacy+Terms resurfaced.
- [ ] No banned trust/security/compliance language in the new pages.

## Files Likely Affected
- src/app/privacy/page.tsx (new)
- src/app/terms/page.tsx (new)
- src/components/footer.tsx
- src/app/sitemap.ts
- ai/deferred/cookie-consent-banner.md (new)
- ai/deferred/deferred-public-trust-surfaces.md

## Blocked By
- none
