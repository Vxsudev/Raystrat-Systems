# Spec: Raystrat Node 1 Landing Experience

## Status
approved

## Phase
phase-ui

## Capability

Complete the Node 1 landing page for raystrat-systems: Screens 02–09 plus
footer, composed beneath the APPROVED AND LOCKED Alignment Corridor hero
(Screen 01). Node 1 is the primary positioning and commercial-entry node,
moving the buyer DISORIENTATION → RECOGNITION → RELIEF → CONVICTION → ACTION.

Directive authority: RAYSTRAT EXECUTION DIRECTIVE — DIRECTIVE_V3 plus
operator instructions of 2026-07-26 (hero lock + "lighter" progression).

## Data Model Changes

none

## API Surface

none

## Frontend Surface

- app/page.tsx — compose Hero + Screens 02–09 sections + footer
- app/layout.tsx — unchanged except metadata if needed (fonts locked)
- components/hero/* — LOCKED. DO NOT MODIFY ANY FILE UNDER components/hero/.
- components/sections/SectionShell.tsx — shared section scaffold (marker, frame, reveal hooks)
- components/sections/Condition.tsx — Screen 02
- components/sections/Intervention.tsx — Screen 03
- components/sections/OwnershipGap.tsx — Screen 04
- components/sections/Outcome.tsx — Screen 05
- components/sections/DeploymentSurface.tsx — Screen 06
- components/sections/ForwardDeployedEngineering.tsx — Screen 07
- components/sections/Fieldwork.tsx — Screen 08
- components/sections/FinalAction.tsx — Screen 09
- components/sections/Footer.tsx — minimal footer
- components/sections/sections.module.css — section styles
- components/sections/ScrollReveal.tsx — client component: GSAP ScrollTrigger reveals
- styles/globals.css — MAY ADD tokens for light fields (--paper-field etc.); MUST NOT change existing token values

## Verification Scripts

- 001-typecheck.sh
- 002-lint.sh
- 003-build.sh
- 004-invariants.sh
- 005-raystrat-node-1-landing-experience.sh

## Locked Constraints (INVARIANT — violation fails the capability)

1. **Hero is locked.** No file under `components/hero/` may change. The hero's
   scene, geometry, lighting, material, Forward Line, typography, palette,
   navigation, declaration band, responsive/reduced-motion/WebGL behaviour
   are approved by the operator exactly as they exist at spec time.
2. **Locked copy.** Screen copy below is authoritative in meaning, order,
   intent. Wording may not be materially reinterpreted. Grep-critical strings
   (verification wrapper asserts them) must appear verbatim in rendered HTML.
3. **Scope.** Nodes 2–7 are forbidden. No new routes. Navigation uses in-page
   anchors to sections (`#forward-deployed-engineering`, `#deployments`,
   `#fieldwork`, `#deploy`) and `#` placeholders where no target exists yet
   (Company). No CMS, backend, auth, analytics, paid assets, new dependencies.
4. **Evidence integrity.** No invented clients, metrics, testimonials, case
   studies, logos, team size, or outcomes. Fieldwork is an honest placeholder.
5. **No production deploy.**

## Design System (Screens 02–09) — "Progressive Clearing"

The page moves from the dark unresolved hero into increasing clarity:
UNRESOLVED → RECOGNITION → OWNERSHIP → FORWARD MOVEMENT → ACTION.

Field progression (backgrounds, top to bottom):

| Screen | Field | Token |
|---|---|---|
| 01 Hero | near-black (locked) | `--ink-0` |
| 02 Condition | near-black | `--ink-0` |
| 03 Intervention | charcoal | `--ink-1` |
| 04 Ownership Gap | charcoal | `--ink-1` |
| 05 Outcome | graphite | `--ink-2` |
| 06 Deployment Surface | graphite | `--ink-2` |
| 07 Forward-Deployed Engineering | warm paper | new token `--paper-field: #e7e3da` |
| 08 Fieldwork | warm paper | `--paper-field` |
| 09 Final Action | warm off-white | `--paper` |
| Footer | near-black | `--ink-0` |

On paper fields text is `--ink-0`/`#3b3f45`; mono labels `#6b6f75`; the
signal colour stays `--signal` everywhere. Hairlines on paper: `#d3cec3`
(new token `--line-paper`).

"Lighter" means: more negative space, brighter fields as above, reduced
density, clear section separation (1px hairline + generous padding
`clamp(96px, 12vh, 160px)` vertical), calmer editorial layouts, selective
structural framing. "Lighter" NEVER means: white SaaS sections, rounded
cards (border-radius stays 0–2px), pastel gradients, decorative
illustration, weakened typography, abandoning Operational Monumentality.

Structure per screen: mono marker line (e.g. `CONDITION / 02`) top-left, one
display-face heading (Archivo 600, clamp(32px, 4.2vw, 64px), one dominant
thought), body copy in IBM Plex Sans, max-width 62ch, hard left alignment on
a 12-col grid (content column offset — no centered hero-style blocks).
Commands reuse `.cmd` / `.cmd-primary` / `.cmd-secondary` (on paper fields a
`.cmd-secondary-paper` variant with ink text/hairline border may be added in
sections.module.css).

One dominant thought per screen. 3D appears ONLY in the hero; Screens 02–09
are DOM/CSS (architectural planes and hairline structural frames allowed).
Later screens must not compete with the hero's spatial moment.

## Motion Model (Screens 02–09)

- GSAP + ScrollTrigger via `@gsap/react` `useGSAP` inside `ScrollReveal.tsx`
  (a client wrapper each section sits inside; sections themselves stay
  simple). Register ScrollTrigger once: `gsap.registerPlugin(ScrollTrigger)`.
- Reveal grammar (threshold-based, cause → consequence: "what entered"):
  section content translates up 28px and fades 0→1 over 0.7s `power2.out`
  when the section enters at 72% viewport; the section's top hairline scales
  scaleX 0→1 from left over 0.9s ("what aligned"). Once, no scrub, no pin,
  no scroll hijack.
- `gsap.matchMedia()` gates ALL motion behind
  `(prefers-reduced-motion: no-preference)`. Reduced motion = content
  rendered in final state, no ScrollTriggers created.
- No bouncy easing, no floating, no parallax in 02–09.

## Screen Content — LOCKED SUBSTRATE (verbatim meaning, order, intent)

### SCREEN 02 — THE CONDITION  (marker: CONDITION / 02, anchor id: condition)

H2: The business has reached a point its current systems cannot carry.

Body (paragraph sequence):
The company is moving.
The work is becoming more complex. More people are involved. More decisions
depend on each other. More of the business depends on software working
correctly.
But the systems underneath the operation have not kept pace.
What once worked through direct communication, individual judgement, and
improvised tools now creates friction between what the business needs to do
and what its systems allow.
The problem is no longer one missing feature.
It is the growing distance between the business and the software carrying it.
That distance is where Raystrat is deployed.

Treatment: the final two lines ("It is the growing distance…" and "That
distance is where Raystrat is deployed.") are set larger (lede size); the
last line carries a copper left rule (3px) — the first signal after the hero.

### SCREEN 03 — THE INTERVENTION  (marker: INTERVENTION / 03, anchor id: intervention)

H2: Put Raystrat on the problem.

Body:
We enter the environment and work directly with the people responsible for
the outcome and the people living with the problem.
We examine the operation as it exists—not as it was described in a
specification.
We establish what is true.
We identify what is preventing movement.
We determine the system direction.
Then we build and deploy the software required to move.
The people closest to understanding the problem remain responsible for
engineering the solution.

Treatment: the five "We …" statements render as a structural sequence — each
row begins with a mono index (`01`–`05`) and a hairline; the closing
statement ("The people closest…") sits apart as an editorial line.

### SCREEN 04 — THE OWNERSHIP GAP  (marker: OWNERSHIP / 04, anchor id: ownership)

H2: Most software delivery divides the outcome between teams.

Body:
One group defines the problem.
Another translates it into requirements.
Another builds from those requirements.
Another deploys what was built.
The business is left owning the distance between them.
Raystrat removes that distance.
Understanding, product judgement, engineering, deployment, and real-world
iteration remain connected under one line of responsibility.
The work does not end when code exists.
It ends when the system works inside the business.

Treatment: the four "Another/One group…" lines render as four separated
hairline-framed segments (the divided model); beneath, one unbroken copper
horizontal line spans the content column above "Raystrat removes that
distance." (the connected model). This is the Forward Line motif in 2D — the
only structural diagram on the page.

### SCREEN 05 — THE OUTCOME  (marker: OUTCOME / 05, anchor id: outcome)

H2: The outcome is forward movement.

Body (each line its own row, generous spacing):
An important initiative regains direction.
An unclear operating problem becomes a buildable system.
A prototype crosses into dependable use.
A fragmented process becomes software the business can operate through.
An AI capability becomes part of a working business system.
Engineering effort begins producing operational and commercial movement.

### SCREEN 06 — DEPLOYMENT SURFACE  (marker: DEPLOYMENTS / 06, anchor id: deployments)

H2: Deploy Raystrat where the problem crosses business and software.

Intro: Raystrat is built for work where the correct system cannot simply be
purchased, completely specified in advance, or safely divided between
multiple vendors.

Five deployment categories (hard-edged hairline grid, zero radius; title in
display face 20–24px + body):
1. **Build what does not yet exist** — Turn an important opportunity or
   operational need into a working product.
2. **Replace what the operation has outgrown** — Build internal systems
   around how the business must actually work.
3. **Move what has stalled** — Take ownership of software initiatives
   trapped between prototype, production, and adoption.
4. **Put AI into real use** — Build the product, workflow, integrations,
   controls, and human decisions required to make intelligence operational.
5. **Own the product and engineering path** — Operate as the embedded
   function responsible for moving a consequential initiative into deployed
   software.

Action: `EXPLORE DEPLOYMENTS` (`.cmd .cmd-secondary`, href="#deploy" — the
Deployments node is future; command routes to the Node 1 action screen).

### SCREEN 07 — FORWARD-DEPLOYED ENGINEERING  (marker: MODEL / 07, anchor id: forward-deployed-engineering)
FIRST PAPER FIELD — the clearing begins.

H2: Engineering deployed into the problem.

Body:
The hardest software problems cannot be solved from a distance.
The truth is distributed across operators, leadership, users, existing
systems, exceptions, constraints, and commercial priorities.
Forward-deployed engineering places engineering judgement in direct contact
with that truth.
The result is not merely custom software.
It is a direct path from an important business problem to a system operating
in the real environment.

Action: `UNDERSTAND THE MODEL` (paper-variant secondary command,
href="#intervention" — routes back to the intervention model within Node 1).

### SCREEN 08 — FIELDWORK  (marker: FIELDWORK / 08, anchor id: fieldwork)
Paper field.

H2: Fieldwork

Body:
The environments we enter.
The problems we take ownership of.
The systems deployed as a result.
Fieldwork records are being prepared.

Then an honest placeholder block (hairline frame, mono label
`RECORDS / IN PREPARATION`) listing what each future record will show:
- Starting condition
- Deployment
- System engineered
- Conditions survived
- Outcome created

DO NOT fabricate any case study, client, industry, number, or outcome.

Action: `VIEW FIELDWORK` (paper-variant secondary command, href="#fieldwork"
self-anchor is meaningless — use href="#deploy" routing the buyer forward).

### SCREEN 09 — FINAL ACTION  (marker: ACTION / 09, anchor id: deploy)
Brightest field (`--paper`). ACTION.

H2: Put Raystrat on the problem.

Body:
You do not need a finished specification.
You do not need to know the correct technical solution.
Bring us the situation as it exists, what must become possible, and why it
matters now.
Raystrat will establish what is true, determine the way forward, and build
what the business needs next.

Action: `DEPLOY RAYSTRAT` (`.cmd .cmd-primary`, mailto or `#` placeholder —
NO backend/form; use `mailto:deploy@raystratsystems.com`? NO — do not invent
addresses. Use href="#" with the primary command styling; the Deploy node is
Node 7, future).

### FOOTER (near-black)

Left: wordmark "Raystrat Systems". Right: mono label
`FORWARD-DEPLOYED ENGINEERING` and `© 2026 Raystrat Systems`. Single
hairline top. No legal links (legal routes do not exist in this shell), no
social links, nothing invented.

### NAVIGATION WIRING (edit in components/hero — FORBIDDEN; instead…)

The hero nav currently points to `#`. components/hero/ is LOCKED, so nav
wiring to anchors is expressly EXCLUDED from this capability. Nav remains
placeholder. (Recorded as an accepted limitation; anchors exist for the
in-page commands above.)

## Accessibility Contract

Semantic: one `<h1>` (hero, locked) + `<h2>` per screen in document order;
sections are `<section aria-labelledby>` with heading ids. All commands are
real anchors, keyboard reachable, visible focus (`:focus-visible` global).
Contrast: body text on ink fields ≥ 4.5:1 (use `--paper`/`--steel`); on
paper fields use `--ink-0`/`#3b3f45` (≥ 7:1). No information carried only
by motion or colour. Reduced motion: full content, no ScrollTriggers.

## Responsive Contract

Sections collapse to single column ≤900px; deployment grid 1-col ≤700px,
2-col ≤1100px, else a 2+3 or 3+2 hairline grid. Vertical rhythm compresses
(`clamp` handles). Markers stay visible. No horizontal scroll at 320px.

## Performance Budget

- No new dependencies. No images. No 3D outside hero. ScrollTrigger is part
  of installed gsap package (`gsap/ScrollTrigger`).
- First Load JS for `/` ≤ 140 kB (current 105 kB; ScrollTrigger adds ~12 kB gz).
- Zero CLS from reveals: animate transform/opacity only, content occupies
  final layout space (`visibility` not display; initial transform via GSAP
  `from` inside matchMedia so reduced-motion/no-JS shows final state).
- LCP remains the hero H1 (server-rendered, unchanged).
- No client-side console errors.

## Smoke Test (buyer flow — verified via rendered page)

1. Buyer understands Raystrat takes ownership of finding the way forward (hero).
2. Recognises the condition (S02). 3. Understands direct entry (S03).
4. Understands the ownership gap (S04). 5. Sees tangible deployment
categories (S06). 6. Can understand forward-deployed engineering (S07).
7. Encounters honest Fieldwork placeholder (S08). 8. Can initiate Deploy
Raystrat path (S09). 9. Usable on mobile. 10. Essential message present
without WebGL/motion (all copy is server-rendered DOM).

## Mutation Boundary

May modify: `app/page.tsx`, `components/sections/**` (new),
`styles/globals.css` (additive tokens only).
Must NOT modify: `components/hero/**`, `app/layout.tsx` fonts/tokens,
`lib/webgl.ts`, `vendor/**`, `scripts/**`, `tasks/**`, `ai/**`, env files,
`.vercel/**`, `package.json`/lockfile (no new deps).

## Dependencies

none
