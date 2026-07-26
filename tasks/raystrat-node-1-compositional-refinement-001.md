# Task: Recompose Screens 02–09 as architectural compositions on a Forward Line spine

## Parent Spec
specs/raystrat-node-1-compositional-refinement.md

## Phase
phase-ui

## Status
done

## Layer
frontend

## Description
Read the ENTIRE parent spec first — it carries the exact per-screen
compositional specifications, the Forward Line spine device, the motion/
accessibility/responsive/performance contracts, the locked constraints, and
the mutation boundary. Implement composition only; do not change copy
substance; do not touch the hero.

WHAT TO BUILD (summary — the spec is authoritative):

1. NEW `components/sections/ForwardSpine.tsx`: a reusable, `aria-hidden`
   structural vertical line (2px) positioned at the LEFT EDGE OF THE CONTENT
   COLUMN inside SectionShell's `.inner`, full section height. Default
   hairline `--sec-line`; accepts props to render copper (`--signal`)
   segments/nodes at movement/resolution points. Pure CSS or inline SVG — NO
   WebGL, NO new dependency. Provide a draw-in hook (a `data-reveal-rule`-style
   attribute) so the existing ScrollReveal draws it top→bottom (scaleY 0→1)
   with reduced-motion → full immediately.

2. S03 Intervention (Priority 1): REMOVE the numbered bordered `.seq` rows.
   Compose the five locked statements as STATIONS on one continuous COPPER
   spine — node + short connector tick + statement text, descending in order,
   generous rhythm, NO borders/boxes/big-index. "Then we build and deploy the
   software required to move." is the resolving terminus (filled copper node,
   lede size). "The people closest…" sits apart as an editorial line off the
   spine. Reads as one movement, not five rows.

3. S06 Deployments (Priority 2): REMOVE the `.deployGrid` card grid. Compose
   the five categories as five BAYS/VECTORS sharing one left origin node on
   the spine: each bay = a hairline top rule spanning the content width (the
   vector), a large mono index (01–05), the display-face TITLE, and body.
   NO card background, NO equal tiles, NO icons, NO hover gimmick, NO pricing.
   Preserve all five titles + bodies verbatim. Keep "Explore Deployments"
   (`.cmd .cmd-secondary`, href "#deploy").

4. S04 Ownership (Priority 3): REMOVE the bordered `.segments` boxes. Top: a
   DIVIDED TRACK — four disconnected, staggered segments with VISIBLE GAPS
   (hairline/graphite, NOT copper), each carrying its locked handoff line;
   the gaps are real empty space. "The business is left owning the distance
   between them." with the gaps. Then, in contrast, ONE UNBROKEN COPPER LINE
   full content width, under which "Raystrat removes that distance." + the
   connected copy + "It ends when the system works inside the business."
   The broken-vs-continuous contrast must read before the copy.

5. S05 Outcome (Priority 4): REMOVE uniform `.outcomes` top-bordered rows.
   Show the six outcomes ADVANCING along a directional axis — each statement
   indented progressively further right and/or vertical spacing opening
   progressively wider toward the bottom; the last line is most advanced/open.
   No borders, no table. Title stays the dominant thought.

6. S07–S09 continuity (Priority 5, minimal): spine continues into the warm-
   paper field as a subtle paper-tone hairline; make the S06→S07 transition
   feel EARNED (carry the spine across; field opens with more negative space),
   NOT just a background change. S08 Fieldwork `.recordsFrame` reads as a
   future evidence system on the spine (keep RECORDS / IN PREPARATION + five
   fields; no fabrication). S09 FinalAction: the spine RESOLVES at the
   "Deploy Raystrat" primary command — a copper terminal node/segment arriving
   at the CTA (arrival). Keep calm + negative space; keep brightest paper.

7. S02 Condition (minimal): introduce the spine faintly so S03 reads as
   continuation; keep it quiet; keep the copper `.signalRule` line.

HARD RULES:
- Do NOT modify components/hero/**, app/layout.tsx, lib/webgl.ts, or existing
  styles/globals.css TOKEN VALUES (additive tokens only). No package.json
  changes. No new deps. No new WebGL. No new routes.
- Copy locked in substance — the verification wrapper (006) greps the rendered
  HTML for the substrate strings, all five deployment titles, commands,
  anchors, one h1 + >=8 h2. Keep all locked text as real selectable DOM text
  (never baked into SVG paths).
- GSAP stays dynamic-imported inside ScrollReveal (never static into first
  load). All motion `once`, matchMedia reduced-motion gated, no pin/scrub/
  hijack. Spine/nodes/connectors/tracks/vectors are `aria-hidden`.
- Each composition needs an intentional MOBILE equivalent (see spec per-screen
  notes). No horizontal overflow at 320px.
- Verify locally: `npx tsc --noEmit` and `npm run build` both pass before
  exiting; keep First Load JS for `/` <= 140 kB (ScrollTrigger must not appear
  in first-load chunks).

## Acceptance Criteria
- [ ] S03 no longer a checklist; five statements are stations on one continuous
      copper spine with a resolving terminus
- [ ] S06 no longer a card grid; five bays/vectors from a shared left origin
- [ ] S04 fragmentation physically visible (staggered gapped segments) vs one
      unbroken copper line
- [ ] S05 reads as advancing movement, not a bordered list
- [ ] S07–S09 keep calm; spine carries through; final action resolves (arrival)
- [ ] Hero, app/layout.tsx, lib/webgl.ts, globals token values unchanged
- [ ] typecheck + build pass; First Load <= 140 kB; GSAP dynamic; reduced-motion
      and WebGL fallback intact; no console errors

## Files Likely Affected
- components/sections/ForwardSpine.tsx (new)
- components/sections/SectionShell.tsx
- components/sections/Intervention.tsx
- components/sections/OwnershipGap.tsx
- components/sections/Outcome.tsx
- components/sections/DeploymentSurface.tsx
- components/sections/ForwardDeployedEngineering.tsx
- components/sections/Fieldwork.tsx
- components/sections/FinalAction.tsx
- components/sections/Condition.tsx
- components/sections/ScrollReveal.tsx
- components/sections/sections.module.css
- styles/globals.css (additive tokens only)
- app/page.tsx (only if spine wiring requires it)

## Blocked By
- none
