# Task: Implement Node 1 Screens 02–09, footer, and scroll-reveal motion

## Parent Spec
specs/raystrat-node-1-landing-experience.md

## Phase
phase-ui

## Status
done

## Layer
frontend

## Description
Implement Screens 02–09 plus footer beneath the LOCKED hero, exactly per the
parent spec. Read the ENTIRE parent spec first — it contains the locked copy
for every screen, the field-progression table (ink-0 → ink-1 → ink-2 →
paper-field → paper), the treatment notes per screen, the motion model, the
accessibility contract, and the mutation boundary.

Hard rules (from spec Locked Constraints):
- DO NOT modify anything under components/hero/ or app/layout.tsx or
  lib/webgl.ts or package.json. No new dependencies (gsap/ScrollTrigger is
  already inside the installed gsap package: `import { ScrollTrigger } from
  "gsap/ScrollTrigger"`).
- Locked copy verbatim — the verification wrapper greps the rendered HTML
  for exact substrings: "cannot carry", "Put Raystrat on the problem",
  "divides the outcome between teams", "The outcome is forward movement",
  "where the problem crosses business and software", "Engineering deployed
  into the problem", "Fieldwork records are being prepared", plus commands
  "Deploy Raystrat", "Explore Deployments", "Understand the Model",
  "View Fieldwork", plus section ids: condition, intervention, ownership,
  outcome, deployments, forward-deployed-engineering, fieldwork, deploy.
- Exactly one <h1> on the page (the hero owns it, already present); every
  screen 02–09 uses <h2>. Sections are <section id="..." aria-labelledby>.
- No fabricated evidence of any kind (Fieldwork is a placeholder frame).
- Styling: reuse tokens from styles/globals.css; you may ADD tokens
  --paper-field: #e7e3da and --line-paper: #d3cec3 (additive only). Zero
  border-radius aesthetic, hairline borders, mono markers via existing
  .mono-label class, commands via existing .cmd classes (add a paper-field
  secondary variant in components/sections/sections.module.css).
- Motion: components/sections/ScrollReveal.tsx — "use client", useGSAP from
  @gsap/react, ScrollTrigger, gsap.matchMedia() gating on
  (prefers-reduced-motion: no-preference); reveal = translateY 28px→0 +
  fade 0→1, 0.7s power2.out, trigger at "top 72%", once. Animate with
  gsap.from so no-JS/reduced-motion shows final state. No pinning, no
  scrub, no parallax.
- Files to create: components/sections/{SectionShell,Condition,Intervention,
  OwnershipGap,Outcome,DeploymentSurface,ForwardDeployedEngineering,
  Fieldwork,FinalAction,Footer,ScrollReveal}.tsx and sections.module.css.
  Compose them in app/page.tsx after <Hero />.
- Sections 02–06 sit on dark fields; 07–09 on paper fields with ink text —
  follow the spec's field table exactly. Section vertical padding
  clamp(96px, 12vh, 160px); content column max-width 1200px with the copy
  block max-width 62ch, left-aligned.
- Verify locally with `npx tsc --noEmit` and `npm run build` before exiting.

## Acceptance Criteria
- [ ] All Screen 02–09 sections render in order after the hero with correct
      anchors, markers, locked copy, and field progression
- [ ] Verification wrapper strings all present in server-rendered HTML
- [ ] One <h1>, eight+ <h2>, semantic sections with aria-labelledby
- [ ] No changes to components/hero/, app/layout.tsx, package.json, lib/
- [ ] typecheck and production build pass locally
- [ ] Reduced-motion renders full content without ScrollTriggers

## Files Likely Affected
- app/page.tsx
- components/sections/SectionShell.tsx (new)
- components/sections/Condition.tsx (new)
- components/sections/Intervention.tsx (new)
- components/sections/OwnershipGap.tsx (new)
- components/sections/Outcome.tsx (new)
- components/sections/DeploymentSurface.tsx (new)
- components/sections/ForwardDeployedEngineering.tsx (new)
- components/sections/Fieldwork.tsx (new)
- components/sections/FinalAction.tsx (new)
- components/sections/Footer.tsx (new)
- components/sections/ScrollReveal.tsx (new)
- components/sections/sections.module.css (new)
- styles/globals.css (additive tokens only)

## Blocked By
- none
