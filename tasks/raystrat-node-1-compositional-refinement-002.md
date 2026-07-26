# Task: Audit the recomposed Screens 02–09 against the spec and repair app-code deviations

## Parent Spec
specs/raystrat-node-1-compositional-refinement.md

## Phase
phase-ui

## Status
done

## Layer
verification

## Description
Audit the recomposition against the parent spec and repair any deviation IN
APPLICATION SOURCE ONLY (do not touch scripts/, tasks/, ai/, vendor/). Read
the parent spec's per-screen specifications and check each:

1. Hero lock: components/hero/**, app/layout.tsx, lib/webgl.ts, and existing
   globals.css token VALUES are unchanged. (The 006 wrapper enforces md5 —
   confirm you did not touch them.)
2. S03 Intervention: numbered bordered rows are GONE; five statements are
   stations on one continuous copper spine; "Then we build and deploy…" is a
   resolving terminus; editorial line sits apart. Not a checklist.
3. S06 Deployments: card grid is GONE; five bays/vectors share a left origin;
   no card backgrounds/tiles/icons/hover gimmicks; all five titles + bodies
   present verbatim; "Explore Deployments" present.
4. S04 Ownership: four staggered gapped segments (fragmentation visible) vs
   one unbroken copper line; contrast reads before copy; all four handoff
   lines + "Raystrat removes that distance." present.
5. S05 Outcome: six statements advance along an axis (not a bordered list);
   all six present; last is most advanced.
6. S07–S09: calm + negative space preserved; spine carries into paper; S08
   reads as future evidence system (no fabrication); S09 resolves the line at
   Deploy Raystrat (arrival).
7. Contracts: all motion is GSAP dynamic-imported (never static first-load),
   matchMedia reduced-motion gated, once, no pin/scrub; spine/nodes/tracks are
   aria-hidden; DOM order = narrative order; one h1 + h2 per screen; commands
   keyboard-reachable with visible focus; no border-radius > 2px introduced;
   no gradients; no fabricated evidence; no forbidden language.
8. Build: `npx tsc --noEmit` and `npm run build` pass; First Load JS for `/`
   <= 140 kB and ScrollTrigger not in first-load chunks. Serve the build
   (`npx next start -p 3107`), curl `/`, confirm all substrate strings + five
   deployment titles + commands + anchors are present; kill the server after.

If everything conforms, make no changes and exit.

## Acceptance Criteria
- [ ] Every per-screen spec point verified (S03/S04/S05/S06 recomposed;
      S07–S09 calm + continuity; S02 quiet with faint spine)
- [ ] Hero + locked files + token values unchanged
- [ ] Motion/accessibility/responsive/performance contracts hold
- [ ] typecheck + build pass; budget held; rendered HTML carries all
      grep-critical strings
- [ ] No control-plane files touched

## Files Likely Affected
- components/sections/*.tsx (repairs only, if drift found)
- components/sections/sections.module.css (repairs only)
- styles/globals.css (additive repairs only)
- app/page.tsx (repairs only)

## Blocked By
- tasks/raystrat-node-1-compositional-refinement-001.md
