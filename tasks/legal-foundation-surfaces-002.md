# Task: Verification gate 023 + reconcile 022 + run suite

## Parent Spec
specs/legal-foundation-surfaces.md

## Phase
phase-legal-foundation

## Status
done

## Layer
verification

## Description
Author `scripts/verification/023-legal-foundation-surfaces.sh` and reconcile the existing
deferral gate, then run the full verification suite.

1. `scripts/verification/023-legal-foundation-surfaces.sh` (model on 022's structure:
   PASS/FAIL counters, sections, exit 1 on any FAIL). Assert:
   - `src/app/privacy/page.tsx` and `src/app/terms/page.tsx` exist.
   - Footer references Privacy + Terms and hrefs `/privacy`, `/terms`.
   - Footer does NOT reference Documentation, Trust, Principal, Continuity (still deferred).
   - No cookie banner/popup mounted (no consent-banner component import; no `/cookies` route).
   - Privacy contains a cookie disclosure section and the required disclosures.
   - Terms states governing law = India and the required disclaimers.
   - New pages contain none of the banned phrases (certified, ISO, SOC 2, HIPAA, GDPR-compliant,
     military-grade, guarantee uptime/outcomes, DPO, fiduciary).
   - Footer integrity: brand wordmark, Systems column, Engage column, grid stays 2-col,
     no `legalLinks` array.
2. Reconcile `scripts/verification/022-hide-deferred-legal-trust-surfaces.sh`: footer-absence
   loop now covers only the four still-deferred surfaces; add assertions that Privacy + Terms
   are now published (routes exist + footer-linked); keep deferred-doc name checks valid.
3. Run: `npm run typecheck` (001), `npm run build` (003), and the full numeric regression
   suite `scripts/verification/0*.sh`. Best-effort route 200 checks for `/privacy`, `/terms`.

## Acceptance Criteria
- [ ] `023-legal-foundation-surfaces.sh` exists, is executable, and passes.
- [ ] `022` reconciled so it passes with Privacy + Terms restored to the footer.
- [ ] `npm run typecheck` passes.
- [ ] `npm run build` succeeds.
- [ ] Full numeric verification suite (004–023) passes.

## Files Likely Affected
- scripts/verification/023-legal-foundation-surfaces.sh (new)
- scripts/verification/022-hide-deferred-legal-trust-surfaces.sh

## Blocked By
- tasks/legal-foundation-surfaces-001.md
