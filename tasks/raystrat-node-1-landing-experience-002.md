# Task: Audit Node 1 implementation against the locked spec and repair app-code deviations

## Parent Spec
specs/raystrat-node-1-landing-experience.md

## Phase
phase-ui

## Status
done

## Layer
verification

## Description
Audit the implemented Node 1 page against the parent spec and repair any
deviation IN APPLICATION SOURCE ONLY (you must not touch scripts/, tasks/,
ai/, or vendor/). Checklist:

1. Copy fidelity: read each section component and compare against the
   spec's LOCKED SUBSTRATE blocks line by line. Fix any drift.
2. Field progression: confirm backgrounds follow the spec table
   (02 ink-0, 03–04 ink-1, 05–06 ink-2, 07–08 paper-field, 09 paper,
   footer ink-0) and text colours meet the accessibility contract on each
   field (ink text on paper fields).
3. Anchors + headings: ids condition/intervention/ownership/outcome/
   deployments/forward-deployed-engineering/fieldwork/deploy; one h1 total;
   h2 per screen; sections use aria-labelledby.
4. Commands: Deploy Raystrat (primary, Screen 09), Explore Deployments,
   Understand the Model, View Fieldwork — correct classes and hrefs per
   spec; visible focus states; reachable by keyboard.
5. Forbidden checks: no border-radius > 2px in new CSS, no gradients, no
   invented evidence, no "revolutionary/cutting-edge/game-changing"
   language, no modification of components/hero/.
6. Motion: ScrollReveal uses gsap.matchMedia gated on
   prefers-reduced-motion: no-preference; gsap.from pattern; no pin/scrub.
7. Run `npx tsc --noEmit` and `npm run build`; both must pass. Serve the
   build briefly (`npx next start -p 3106`) and curl / to confirm the
   grep-critical substrings from the spec are in the HTML; kill the server
   afterwards.

If everything conforms, make no changes and exit.

## Acceptance Criteria
- [ ] Section copy matches the locked substrate with no material drift
- [ ] Field progression and contrast conform to spec
- [ ] All anchors, headings, commands, and focus behaviour verified
- [ ] typecheck + production build pass; rendered HTML carries all
      grep-critical substrings
- [ ] No control-plane files touched

## Files Likely Affected
- components/sections/*.tsx (repairs only, if drift found)
- components/sections/sections.module.css (repairs only)
- app/page.tsx (repairs only)

## Blocked By
- tasks/raystrat-node-1-landing-experience-001.md
