# Spec: Raystrat Node 1 Compositional Refinement

## Status
approved

## Phase
phase-ui

## Capability

Elevate Screens 02–09 of the Node 1 landing page from editorial layouts into
architectural compositions worthy of the approved Alignment Corridor hero,
tied together by a continuous Forward Line spine that resolves at the final
action. Composition only — copy is locked in substance; the hero is locked.

Directive authority: RAYSTRAT EXECUTION DIRECTIVE — NODE 1 COMPOSITIONAL
REFINEMENT PASS (2026-07-26). Where this spec and prior work conflict, this
spec wins for Screens 02–09; the hero always wins over everything.

## Data Model Changes

none

## API Surface

none

## Frontend Surface

- components/sections/ForwardSpine.tsx — NEW. Reusable structural spine
  (CSS/inline-SVG line + optional nodes). No WebGL. `aria-hidden`.
- components/sections/SectionShell.tsx — may gain an optional spine slot/prop
- components/sections/Intervention.tsx — S03 recomposition (Priority 1)
- components/sections/OwnershipGap.tsx — S04 recomposition (Priority 3)
- components/sections/Outcome.tsx — S05 recomposition (Priority 4)
- components/sections/DeploymentSurface.tsx — S06 recomposition (Priority 2)
- components/sections/ForwardDeployedEngineering.tsx — S07 continuity (minimal)
- components/sections/Fieldwork.tsx — S08 continuity (minimal)
- components/sections/FinalAction.tsx — S09 Forward Line resolution (arrival)
- components/sections/Condition.tsx — S02 faint spine intro only (minimal)
- components/sections/ScrollReveal.tsx — may gain spine-draw reveal hooks
- components/sections/sections.module.css — composition styles
- styles/globals.css — ADDITIVE tokens only (existing values frozen)
- app/page.tsx — only if page-level spine wiring is required

## Verification Scripts

- 001-typecheck.sh
- 002-lint.sh
- 003-build.sh
- 004-invariants.sh
- 005-raystrat-node-1-landing-experience.sh
- 006-raystrat-node-1-compositional-refinement.sh

## Locked Constraints (INVARIANT — violation fails the capability)

1. **Hero locked.** No file under `components/hero/` may change; nor
   `app/layout.tsx` nor `lib/webgl.ts`. Baseline md5 (wrapper 006 asserts):
   - AlignmentField.tsx `dc5f94fed31af540faaf45a229cff3f0`
   - Hero.tsx `72f4cfd45291804a111cfab570726060`
   - HeroCanvas.tsx `8bcdc4fb7e92a88658a70cd36953a1ad`
   - HeroFallback.tsx `e5e9c81bf999f9c1ece860c4131132fa`
   - fallback.module.css `2485649adffeee499165c5315d5375c6`
   - hero.module.css `30821fc2e9ce6611e130605800722aa7`
   - app/layout.tsx `8e6bc33bae3b1928c7e64f9d77779c35`
   - lib/webgl.ts `13a95f02b56fb4898b99862213c0c514`
2. **Copy locked in substance.** The predecessor spec
   `specs/raystrat-node-1-landing-experience.md` holds the authoritative
   substrate for every screen. Only line breaks, grouping, spatial order
   (narrative order intact), and typographic emphasis may change. These
   grep-critical strings must remain in the rendered HTML verbatim:
   "cannot carry", "Put Raystrat on the problem", "divides the outcome between
   teams", "The outcome is forward movement", "where the problem crosses
   business and software", "Engineering deployed into the problem", "Fieldwork
   records are being prepared"; commands "Deploy Raystrat", "Explore
   Deployments", "Understand the Model", "View Fieldwork"; anchors condition,
   intervention, ownership, outcome, deployments,
   forward-deployed-engineering, fieldwork, deploy. All five deployment
   category titles and all five intervention statements and all six outcome
   statements remain present as real text.
3. **No new dependencies. No new WebGL. No new routes.** GSAP stays
   dynamic-imported (never static into first-load). Three.js/R3F only in hero.
4. **Existing globals.css token values frozen** (additive tokens only).
5. **No fabricated evidence; no new marketing claims/metrics/industries.**
6. **No production deploy / push / commit.**

## Design System — Progressive Clearing + the Forward Line spine

Preserve Operational Monumentality: enterprise, architectural, materially
restrained, hard-edged (border-radius 0–2px), one signal colour (`--signal`
oxidised copper), no gradients/particles/glow/glass/illustration/SaaS-white.
Field progression is unchanged (S02 ink0 · S03–04 ink1 · S05–06 ink2 ·
S07–08 paper-field · S09 paper · footer ink0).

### The Forward Line spine (unifying device)

A single structural axis descends the page at a consistent horizontal
position — aligned to the LEFT EDGE OF THE CONTENT COLUMN (the boundary
between SectionShell's marker column and content column). Implement as
`ForwardSpine.tsx`: a thin vertical element (2px) rendered per section,
absolutely positioned within `.inner`, full section height, at that x.

- Default appearance: hairline `--sec-line` (adapts per field via
  `--sec-line`), 1–2px wide.
- Copper (`--signal`) segments/nodes appear only at MOMENTS OF MOVEMENT AND
  RESOLUTION (defined per screen below), never decoratively everywhere.
- Because every section places the spine at the same x and sections abut, the
  line reads as ONE continuous axis running the whole page.
- `aria-hidden="true"`. Decorative only — never the sole carrier of meaning.
- Motion: as its section enters, the spine draws top→bottom (scaleY 0→1,
  transform-origin top) via the existing GSAP reveal (`data-reveal-rule` style
  hook), `once`, reduced-motion → rendered full immediately.

Nodes on the spine: small solid squares (6–8px, zero radius) in `--sec-line`
or `--signal`, marking stations/branch points.

### PRIORITY 1 — S03 Intervention: ownership in motion, one continuous path

Remove `.seq` numbered bordered rows entirely. Compose the five locked
intervention statements as STATIONS along one continuous descending copper
spine (this screen's spine is copper — the movement is active here):

- The spine runs down the content column's left edge.
- Each of the five statements is a station: a small node on the spine + a
  short horizontal connector (tick) + the statement text to the right. No
  border boxes, no big index numbers, no per-row rules. Optional ultra-quiet
  mono state word per station is NOT permitted (no copy beyond substrate) —
  the statements themselves are the stations.
- The five statements descend in order (ENTER→ESTABLISH→DETERMINE, expressed
  by the locked statements) with generous vertical rhythm — reads as one
  movement, not five rows.
- "Then we build and deploy the software required to move." is the RESOLVING
  TERMINUS: the spine ends in a filled copper terminal node, this line set
  larger (lede weight), visibly resolving the sequence.
- "The people closest to understanding the problem remain responsible for
  engineering the solution." sits apart as an editorial line, off the spine.
- Motion: spine draws top→bottom; station nodes/ticks tick in as the line
  passes; terminus node resolves last. Once. Reduced-motion = final state.
- Mobile: spine stays on the far left; stations stack; connectors shorten;
  terminus still resolves. No horizontal overflow.

### PRIORITY 2 — S06 Deployments: five vectors from a shared origin, not cards

Remove `.deployGrid` card grid entirely. Compose the five categories as five
DEPLOYMENT BAYS / VECTORS sharing one left origin on the spine:

- A shared origin node on the spine (copper) at the top of the group.
- Five full-width horizontal bays stacked as structural strata. Each bay:
  a hairline top rule spanning the content width (the "vector" extending from
  the origin), a large mono index (01–05), the category TITLE in the display
  face, and the body text. NO card background, NO equal tiles, NO border box,
  NO icons, NO hover gimmick, NO pricing language.
- Bays may be asymmetric (e.g. title occupies a left sub-column, body a right
  sub-column) to read as architectural bays rather than list rows — but they
  must not become cards. The shared left origin (spine) makes them read as
  five directions from one system.
- Preserve all five category titles and bodies verbatim.
- "Explore Deployments" command unchanged (`.cmd .cmd-secondary`, href
  "#deploy").
- Motion: each bay's vector rule draws left→right (scaleX) in sequence as the
  section enters; once; reduced-motion = final.
- Mobile: bays stack (already vertical); origin/spine stays left; title over
  body within each bay; indices legible; no overflow.

### PRIORITY 3 — S04 Ownership: fragmentation made physical

Remove `.segments` bordered boxes. Make divided ownership physically obvious
BEFORE the copy is read:

- Top: a horizontal DIVIDED TRACK representing the four handoff stages as four
  disconnected segments with VISIBLE GAPS between them, staggered (each
  segment at a slightly different vertical offset) so continuity is broken.
  Each segment carries its locked line ("One group defines the problem." …
  "Another deploys what was built."). The gaps are real empty space — the
  eye sees breaks. The segments are hairline/graphite, NOT copper (this is the
  broken model).
- "The business is left owning the distance between them." sits with/beneath
  the gaps.
- Then, in deliberate contrast: ONE UNBROKEN COPPER LINE spanning the full
  content width (the Forward Line continuing in 2D), beneath which
  "Raystrat removes that distance." and the connected copy follow. The
  contrast — broken staggered segments vs one continuous copper line — must
  be understood before reading.
- "It ends when the system works inside the business." stays as the firm
  closing line.
- Motion: segments settle (fade/translate), THEN the unbroken copper line
  draws left→right (connection). Once; reduced-motion = final.
- Mobile: segments stack vertically with visible gaps; the unbroken line
  becomes a continuous vertical copper span alongside the connected copy;
  contrast preserved; no overflow.

### PRIORITY 4 — S05 Outcome: movement, not a list

Remove `.outcomes` uniform top-bordered rows. Show the six outcomes ADVANCING
along a directional axis — unresolved → established, increasing openness:

- Each outcome is a forward step on the spine: successive statements indented
  progressively further right (advancing) and/or vertical spacing opening
  progressively wider toward the bottom. No uniform borders; no table.
- The final line "Engineering effort begins producing operational and
  commercial movement." is the most advanced/open — the arrival of movement.
- The title "The outcome is forward movement." remains the dominant thought.
- Motion: statements advance in (translate along the axis) in sequence; once;
  reduced-motion = final (statements in final advanced positions).
- Mobile: CAP the rightward advance so nothing overflows (e.g. advance via
  increasing indent up to a small max, then rely on opening vertical rhythm);
  progression still reads as forward movement.

### PRIORITY 5 — S07–S09 continuity (minimal; preserve calm + negative space)

- The spine continues into the warm-paper field as a subtle paper-tone
  hairline (`--sec-line` = `--line-paper` there). The S06→S07 transition must
  feel EARNED — not merely a background-colour change: carry the spine across
  the boundary and let the field open (more negative space, calmer rhythm).
- S07: keep copy + "Understand the Model"; spine present, quiet.
- S08 Fieldwork: the `.recordsFrame` reads as a FUTURE EVIDENCE SYSTEM (an
  awaiting-data structure on the spine), not a document template — keep the
  honest `RECORDS / IN PREPARATION` placeholder and the five record fields;
  no fabrication.
- S09 FinalAction: the spine RESOLVES here — a copper terminal node/segment
  arriving at the "Deploy Raystrat" primary command (arrival). The journey
  visibly ends at action. Keep brightest paper field and calm.

### S02 Condition (minimal)

Introduce the spine faintly at the content column edge so S03's continuous
line reads as a continuation. Keep the condition quiet, serious, readable;
keep the copper `.signalRule` on "That distance is where Raystrat is
deployed." Do not redesign gratuitously.

## Motion Contract

GSAP + ScrollTrigger via the EXISTING dynamic-import pattern in ScrollReveal
(never static into first-load). Permitted purposes only: draw the path,
connect divided segments, advance unresolved→established, transition density→
clarity, resolve at the final action. `matchMedia("(prefers-reduced-motion:
no-preference)")` gates ALL motion; reduced-motion and no-JS render the final
composed state (server-rendered). Everything `once:true`; no pin, no scrub,
no scroll-hijack, no looping/decorative/cursor motion, no motion that delays
reading.

## Accessibility Contract

Semantic heading order preserved (one hero h1; one h2 per screen; sections
`aria-labelledby`). Spine, nodes, connectors, segment tracks, vectors are
DECORATIVE → `aria-hidden="true"`; DOM order matches narrative order; locked
copy remains real selectable text (never baked into SVG paths). Visible
`:focus-visible` on all commands; keyboard reachable; contrast maintained on
every field (ink text on paper; paper/steel on ink); no meaning by colour or
motion alone (copper is emphasis; the text always states the point).

## Responsive Contract

Verify 2560 / 1440 / 1024 / 390 / 320. Each composition has an INTENTIONAL
mobile equivalent (per-screen notes above) — not stacked desktop geometry.
No horizontal overflow at 320; no clipped copy; mono labels legible; no
hover-dependent interaction.

## Performance Budget

First Load JS for `/` ≤ 140 kB (baseline 106 kB; wrapper V6b asserts ≤460 kB
uncompressed envelope). GSAP dynamic only. No Three.js/R3F outside hero. No
images. Prefer CSS/SVG over JS. No continuous animation loops. Zero critical
console errors. Static crawlable content preserved. Zero CLS from reveals
(animate transform/opacity; final layout occupied; `from` tweens so
reduced-motion/no-JS shows final state).

## Mutation Boundary

MAY modify: `components/sections/**` (incl. new ForwardSpine.tsx),
`components/sections/sections.module.css`, `styles/globals.css` (additive
tokens only), `app/page.tsx` (only if spine wiring requires it),
`scripts/verification/006-*.sh`.
MUST NOT modify: `components/hero/**`, `app/layout.tsx`, `lib/webgl.ts`,
existing globals.css token values, `vendor/**`, OS `scripts/`, `tasks/**`,
`ai/**` (except journal via supervisor), env files, `.vercel/**`,
`package.json`/lockfile.

## Design Quality Gate (must pass before RELEASE_APPROVED)

1 page sustains hero quality · 2 one dominant thought per screen · 3 report
layouts replaced by structural compositions · 4 services-grid feeling
eliminated (S06) · 5 ownership fragmentation visible before explained (S04) ·
6 density→clarity progression reads · 7 Forward Line connects the narrative ·
8 final action feels like arrival · 9 still enterprise-friendly · 10 restraint
preserved. Adding animation without improving composition = FAIL.

## Dependencies

none
