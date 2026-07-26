# RECON — raystrat-node-1-compositional-refinement

Capability: Node 1 — Compositional Refinement
Date: 2026-07-26
Directive: RAYSTRAT EXECUTION DIRECTIVE — NODE 1 COMPOSITIONAL REFINEMENT PASS
Predecessor: raystrat-node-1-landing-experience (RELEASE_APPROVED)
State target: RECON_READY

---

## 1. Objective (composition, not substance)

Elevate Screens 02–09 from competent editorial layouts into structural visual
storytelling worthy of the approved Alignment Corridor hero. Replace
report-like layouts, numbered rows, bordered boxes, and the SaaS card grid
with architectural compositions that make the narrative physically legible,
tied together by a continuous Forward Line that resolves at the final action.
Copy is locked in substance. Hero is locked.

## 2. Files Inspected (exact)

- `app/page.tsx` (composition order — Hero + 8 sections + Footer)
- `components/sections/SectionShell.tsx` (shared scaffold)
- `components/sections/ScrollReveal.tsx` (motion)
- `components/sections/Condition.tsx` (S02)
- `components/sections/Intervention.tsx` (S03)
- `components/sections/OwnershipGap.tsx` (S04)
- `components/sections/Outcome.tsx` (S05)
- `components/sections/DeploymentSurface.tsx` (S06)
- `components/sections/ForwardDeployedEngineering.tsx` (S07)
- `components/sections/Fieldwork.tsx` (S08)
- `components/sections/FinalAction.tsx` (S09)
- `components/sections/Footer.tsx`
- `components/sections/sections.module.css` (383 lines)
- `styles/globals.css` (token block)
- `scripts/verification/*` (001–005)
- `ai/state_registry.json`

## 3. Current Architecture

- **SectionShell**: every screen shares one scaffold — a 12-col grid
  (`minmax(160px,3fr)` marker column / `minmax(0,9fr)` content column), a top
  hairline `.rule` (`data-reveal-rule`), and content wrapped in `data-reveal`.
  Field palette (`ink0/ink1/ink2/paperField/paper`) flows via section-scoped
  custom properties `--sec-bg/--sec-fg/--sec-body/--sec-line/--sec-mono`.
- **ScrollReveal**: client wrapper; dynamic-imports `gsap` + `gsap/ScrollTrigger`
  AFTER hydration (keeps first-load bundle clean); `matchMedia
  ("(prefers-reduced-motion: no-preference)")` gate; reveal = `[data-reveal]`
  translateY 28→0 + fade, `[data-reveal-rule]` scaleX 0→1; `once:true`; no
  pin/scrub. Reduced-motion / no-JS = server-rendered final state.
- **Per-screen present composition (the refinement targets):**
  - S02 Condition — copy block; last line has copper `.signalRule` left border. *(broadly approved)*
  - S03 Intervention — `.seq`: five **numbered bordered rows** (`.seqRow`, `.seqIndex` 01–05) → reads as a **consulting checklist**. *(Priority 1)*
  - S04 OwnershipGap — `.segments`: four **bordered boxes**, then a 2px copper `.forwardLine` span, then connected copy. *(Priority 3)*
  - S05 Outcome — `.outcomes`: six **top-bordered rows** → reads as a **list**. *(Priority 4)*
  - S06 DeploymentSurface — `.deployGrid`: **6-col card grid**, cells span 2/3 → reads as a **SaaS services grid**. *(Priority 2)*
  - S07 ForwardDeployedEngineering — paper field, copy + "Understand the Model". *(approved; needs earned transition + Forward Line continuity)*
  - S08 Fieldwork — paper, `.recordsFrame` bordered placeholder. *(approved; should feel like a future evidence system)*
  - S09 FinalAction — brightest paper, "Deploy Raystrat" primary. *(approved; Forward Line must resolve here — arrival)*
  - Footer — near-black, wordmark + mono meta.

## 4. Bundle Baseline (locked budget to hold)

Production build of `/`:

```
Route (app)                 Size     First Load JS
┌ ○ /                       3.7 kB   106 kB
+ First Load JS shared      102 kB
```

GSAP is NOT in first load (dynamic-imported post-hydration). Budget from the
predecessor spec: **First Load JS ≤ 140 kB** (wrapper asserts ≤460 kB
uncompressed envelope). No Three.js/R3F outside the hero. No images.

## 5. Verification Baseline

- `001-typecheck.sh` PASS · `002-lint.sh` SKIP (no linter) · `003-build.sh`
  PASS · `004-invariants.sh` 6/6 PASS · `005-raystrat-node-1-landing-experience.sh`
  PASS (substrate strings, commands, anchors, headings, forbidden-language,
  route scope, First-Load budget V6b).
- This capability adds `006-raystrat-node-1-compositional-refinement.sh`
  asserting **hero files unchanged** against recorded checksums (below) plus
  the design-integrity checks.

### Hero-lock baseline checksums (md5, recorded 2026-07-26)

```
dc5f94fed31af540faaf45a229cff3f0  components/hero/AlignmentField.tsx
72f4cfd45291804a111cfab570726060  components/hero/Hero.tsx
8bcdc4fb7e92a88658a70cd36953a1ad  components/hero/HeroCanvas.tsx
e5e9c81bf999f9c1ece860c4131132fa  components/hero/HeroFallback.tsx
2485649adffeee499165c5315d5375c6  components/hero/fallback.module.css
30821fc2e9ce6611e130605800722aa7  components/hero/hero.module.css
8e6bc33bae3b1928c7e64f9d77779c35  app/layout.tsx
13a95f02b56fb4898b99862213c0c514  lib/webgl.ts
```

The verification wrapper recomputes these and fails on any drift. Existing
`globals.css` token VALUES must not change (additive only).

## 6. Proposed Mutation Boundary

MAY modify:
- `components/sections/*.tsx` (S02–S09 composition + shared shell)
- `components/sections/sections.module.css`
- New lightweight structural components under `components/sections/`
  (e.g. `ForwardSpine.tsx` — CSS/SVG line; no WebGL)
- `styles/globals.css` — **additive only** (new structural tokens; existing
  token values frozen)
- `app/page.tsx` (only if spine composition requires page-level wiring)
- `scripts/verification/006-*.sh` (new), recon/spec/task/journal artifacts

MUST NOT modify:
- `components/hero/**`, `app/layout.tsx`, `lib/webgl.ts`
- existing `globals.css` token values
- `vendor/**`, `scripts/` OS runtime, `tasks/**` (control plane), env, `.vercel/**`
- `package.json`/lockfile (no new deps)
- Locked copy substance (line breaks / grouping / emphasis only)

## 7. Design Direction (recon-level; spec locks detail)

**Unifying device — the Forward Line as a page-spanning spine.** A single
structural axis descends the whole page at a consistent x (the marker/content
column boundary), mostly hairline (`--sec-line`), turning copper (`--signal`)
at moments of movement and resolution. It physically threads the narrative:
- S03: the axis carries the five intervention statements as **stations** on
  one continuous descending line (ENTER→ESTABLISH→DETERMINE→BUILD→DEPLOY),
  the "build and deploy" line as the resolving terminus. No list rows.
- S04: the axis **breaks** — four disconnected, staggered segments with
  visible gaps (fragmentation made physical), contrasted below by one
  unbroken copper span under "Raystrat removes that distance." Contrast
  legible before the copy is read.
- S05: statements **advance** along a directional axis (staggered forward,
  increasing openness) — movement, not a list.
- S06: five **deployment vectors/bays** from a shared left origin
  (architectural strata), not cards, not tiles, not icons.
- S07–S09: the spine continues subtly into the warm-paper field (earned
  transition), Fieldwork reads as a future evidence system, and the line
  **resolves at DEPLOY RAYSTRAT** — arrival.
- S02: introduce the spine faintly so S03 reads as continuation; otherwise
  quiet.

All structure is HTML/CSS + lightweight SVG; motion via the existing
dynamic-imported GSAP (draw the path / connect segments / advance / resolve),
reduced-motion gated, once-only.

## 8. Risks

**Performance**
- Spine/SVG must stay CSS/SVG-only; GSAP must remain dynamic (no static
  import into first-load bundle). Budget ≤140 kB First Load.
- No continuous animation loops; all reveals `once:true`.

**Accessibility**
- Spine, nodes, connective lines are decorative → `aria-hidden`; DOM order
  must still match narrative order; heading hierarchy (one h1 hero + h2/section)
  preserved; locked copy remains real text (not baked into SVG); focus states
  intact; no meaning by colour/motion alone (copper is emphasis, not sole
  carrier — text remains).

**Responsive**
- Each composition needs an INTENTIONAL mobile equivalent (not stacked
  desktop geometry): S03 spine on far left with stations stacked; S04 segments
  stack with gaps + vertical copper continuity; S05 capped rightward advance
  (no overflow); S06 bays stack from the left origin. Verify 2560/1440/1024/
  390/320. No horizontal overflow; mono labels legible; no hover-only meaning.

**Visual-quality (process risk)**
- The supervisor executes via a blind headless worker; visual nuance is hard
  to land blind (this capability exists because the first blind pass produced
  report-like layouts). Mitigation: spec + task files carry exact
  per-screen compositional specifications; after the supervisor reaches
  RELEASE_APPROVED, the main agent performs Playwright visual verification +
  the design quality gate and tunes composition directly with full journal
  transparency (precedent: the Node 1 post-gate gsap bundle fix).

## 9. Proposed Verification Strategy

1. `001`–`004` standard. `002` SKIP.
2. `005` predecessor wrapper (still must pass — content/anchors/budget intact).
3. `006-raystrat-node-1-compositional-refinement.sh` (new): hero-lock
   checksums, all locked copy present, all 8 sections + anchors present, one
   h1 / eight h2, no new routes, no forbidden language, no fabricated evidence,
   First-Load budget, CTA labels present.
4. Playwright visual pass (5 widths + S03/S04/S05/S06 closeups + S07–09
   transition + final action + reduced-motion + WebGL-off + keyboard focus).
5. Design quality gate (10 questions). Journal. No deploy/commit.

STATUS: RECON COMPLETE — ready for spec authoring.
