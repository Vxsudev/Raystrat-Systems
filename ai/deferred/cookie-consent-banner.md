# Deferred: Cookie Consent Banner / Popup

**Date deferred:** 2026-05-28
**Capability:** `LEGAL_FOUNDATION_SURFACES_V1`
**Branch:** `feature/legal-foundation-surfaces`
**Status:** INTENTIONALLY ABSENT — no consent UI built; disclosure embedded in Privacy notice

> This is a **deliberate deferral, not an oversight.** No cookie consent banner or popup
> is mounted anywhere in the application. The reasoning and the conditions that would
> justify building one are recorded here so the decision is auditable and reversible.

---

## Why deferred

The site does not run the kind of tracking that a consent banner exists to govern:

- No third-party advertising or ad networks.
- No retargeting / remarketing pixels.
- No cross-site behavioural tracking.
- No advanced or third-party behavioural analytics stack.

The only client-side storage in use is first-party and strictly functional (e.g.
remembering the light/dark theme preference). Storage of that nature does not require
opt-in consent under common consent regimes.

Mounting a consent banner now would be **premature compliance theater**: it would imply a
tracking apparatus that does not exist, add friction with no protective benefit, and signal
a posture the site has not actually adopted. The conservative, honest choice is a plain
cookie-disclosure section inside the Privacy notice (`src/app/privacy/page.tsx`) instead of
a consent popup.

---

## Current treatment (what exists instead)

- A **"Cookies and analytics"** section in `src/app/privacy/page.tsx` that states what
  first-party storage is used, confirms there is no advertising/retargeting/invasive
  analytics, and commits to adding consent controls before any such change ships.

---

## Triggering conditions (build the banner when ANY become true)

Implement a consent mechanism before shipping any of the following:

1. **Advertising** — introducing ad networks or ad pixels.
2. **Retargeting / remarketing** — pixels or audiences that track users across sites.
3. **Advanced analytics** — third-party behavioural analytics, session recording, or
   fingerprinting that goes beyond first-party functional storage.
4. **EU-specific compliance expansion** — actively serving EU/EEA visitors under an
   ePrivacy/GDPR consent expectation, or a contractual obligation to obtain consent.

---

## How to implement (when triggered)

1. Choose a consent approach proportional to the actual tracking introduced — prefer a
   first-party, lightweight prior-consent gate over a heavy third-party CMP unless the
   tracking genuinely requires one.
2. Block non-essential scripts/cookies until consent is given; keep essential/functional
   storage exempt.
3. Persist the consent choice and provide a way to change it.
4. Update the Privacy notice "Cookies and analytics" section to match the new reality and
   move/replace the "no banner" statement.
5. Add or update a verification gate asserting the banner is mounted and gates the relevant
   scripts; retire the "no cookie banner mounted" assertion in
   `scripts/verification/023-legal-foundation-surfaces.sh`.

---

## Verification

`scripts/verification/023-legal-foundation-surfaces.sh` asserts that **no** cookie consent
banner/popup component is mounted and that the cookie disclosure lives inside the Privacy
notice. That assertion must be intentionally revised (not silently removed) when a banner is
introduced under one of the triggering conditions above.
