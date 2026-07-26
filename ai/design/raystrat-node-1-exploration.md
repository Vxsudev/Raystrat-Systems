# DESIGN EXPLORATION — raystrat-node-1-landing-experience

One coherent direction under the locked thesis **Operational Monumentality**.
Deliverable: working desktop hero prototype at `/` + this proposal.
State: exploration (pre-spec). Nothing here is final until SPEC_LOCKED.

---

## 1. Design-System Proposal — "Command Surface"

Tokens (CSS custom properties, `styles/globals.css`):

| Token | Value | Role |
|---|---|---|
| `--ink-0` | `#0B0C0E` | Near-black field |
| `--ink-1` | `#131518` | Charcoal panels |
| `--ink-2` | `#1D2024` | Graphite structure |
| `--line`  | `#2A2E33` | Hairline structure borders |
| `--steel` | `#8C939B` | Steel grey — secondary text |
| `--paper` | `#EDEAE3` | Warm off-white — primary text |
| `--signal` | `#B4703A` | Oxidised copper — the ONLY accent |
| `--signal-dim` | `#7E4F2B` | Copper at rest / borders |

Signal discipline: copper appears only on (a) the Forward Line, (b) the
primary command, (c) active/selected states, (d) micro-markers that indicate
direction. Never decorative. No gradients. No enterprise blue.

Interface language: rectangular forms, 0–2px corner radii, 1px hairlines,
hard 12-col alignment, inset structural frame (24px) as recurring device.

## 2. Typography Proposal

| Role | Face | Rationale |
|---|---|---|
| DISPLAY → COMMAND | **Archivo** (600/700, tracking −0.015em, tight leading 0.94) | Sharp neo-grotesk built for large-scale headline work; authority without SF novelty; variable, free (Google Fonts, next/font self-hosted) |
| BODY → CLARITY | **IBM Plex Sans** (400/500) | Engineered heritage, calm editorial rhythm, excellent legibility on near-black |
| MONO → EVIDENCE | **IBM Plex Mono** (400/500, letterspaced uppercase micro-labels) | Same superfamily as body — evidence layer reads as the same institution |

Plex Sans + Plex Mono are one designed system; Archivo cuts against them with
monumental geometry. No paid or unlicensed dependencies (all via
`next/font/google`, self-hosted at build time — zero external requests).

## 3. Colour & Material Proposal

3D materials: graphite `MeshStandardMaterial` (colour `#23262b`, roughness
0.55–0.7, metalness 0.35) under one warm key light + low ambient; near-black
fog carries depth. Copper line: flat copper material — **no bloom, no
post-processing**. Material weight over spectacle.

## 4. Structural 3D Concept — "The Alignment Corridor"

- 26 rectangular structural frames (4 thin bars each) arrayed in depth,
  forming a corridor whose vanishing point sits right-of-centre (copy owns
  the left).
- Initial state: each frame carries deterministic (seeded) rotational and
  positional scatter — complexity without chaos. **DISORIENTATION.**
- A single progress value drives every frame from scattered → exactly aligned
  transform. **RECOGNITION.**
- On alignment, the Forward Line (thin copper member) draws through the
  corridor floor toward the vanishing point. **RELIEF / DIRECTION.**
- Mono state-marker in the structural frame flips `UNRESOLVED → ESTABLISHED`
  at completion. State language, used once.
- Implementation: ONE `InstancedMesh` (104 instances, one BoxGeometry) —
  single draw call for the whole field; procedural only, no 3D assets.

Forbidden-language check: no particles, no network sphere, no glow field, no
floating icons, no dashboard cosplay. Frames are architectural members with
mass, not UI cards.

## 5. Motion Model

Cause → consequence ledger (every animation answers the directive's question):

1. Copy is server-rendered DOM — present before any 3D (LCP is the H1).
2. Canvas fades in (0.6s) — *what entered: the field*.
3. Alignment: progress 0→1 over 2.6s, `power3.inOut` — heavy machinery
   settling into true; camera dollies forward on the same ease — *what
   aligned; what direction was established*.
4. Forward Line draws 0→1 (1.1s, `power2.out`) after alignment — *what was
   revealed*.
5. Marker flips `UNRESOLVED → ESTABLISHED` — *what changed state*.
6. Idle: pointer-damped parallax ≤0.6° (desktop, fine pointers only), no
   constant floating, no scroll hijack. Render loop is demand-driven —
   zero GPU work when idle and no pointer movement.

GSAP timeline via `@gsap/react` `useGSAP` (auto-cleanup). No bouncy easing.

## 6. Desktop Hero Composition

```
┌──────────────────────────────────────────────────────────────┐
│ RAYSTRAT SYSTEMS   Forward-Deployed Eng · Deployments ·      │ ← nav rail (hairline below)
│                            Fieldwork · Company  [DEPLOY →]   │
│ ┌─ structural frame (24px inset, hairline) ────────────────┐ │
│ │ SYS/01 · FORWARD-DEPLOYED ENGINEERING        UNRESOLVED→ │ │ ← mono evidence layer
│ │                                                           │ │
│ │ Raystrat will find              [ 3D: alignment corridor │ │
│ │ the way forward.                  vanishing right-of-    │ │
│ │                                   centre, copper line ]  │ │
│ │ Forward-deployed engineering for                          │ │
│ │ difficult business problems. …                            │ │
│ │                                                           │ │
│ │ [DEPLOY RAYSTRAT]  WHAT IS FORWARD-DEPLOYED ENGINEERING? │ │
│ │ ───────────────────────────────────────────────────────  │ │
│ │ No waiting… / No separation… / We own the distance…       │ │ ← declaration band
│ └───────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

Locked Screen 01 copy carried verbatim (order and meaning intact).

## 7. Mobile-Equivalent Concept

Not a compressed desktop: vertical composition, corridor recomposed to recede
upward behind the copy (camera raised, narrower frustum), 14 frames, DPR cap
1.75, no pointer parallax, alignment sequence shortened to 1.8s. Content
hierarchy and emotional order unchanged. If GPU class is weak the scene loads
in its final aligned state (single render).

## 8. Reduced-Motion Concept

`prefers-reduced-motion: reduce` → no timeline, no parallax, no camera drift:
the corridor renders once in its final aligned state with the Forward Line
drawn; marker reads `ESTABLISHED`. Meaning preserved, motion removed.

## 9. WebGL Fallback Strategy

- Capability probe before the 3D chunk is ever requested (no wasted bytes).
- Fallback: static layered-perspective corridor rendered in pure CSS
  (nested hairline frames + copper line) — same composition, zero JS motion.
- All copy, nav, and CTAs are semantic DOM in both paths; the canvas layer is
  `aria-hidden` enhancement only (INV-WEB-005).
- `webglcontextlost` → swap to fallback.

## 10. Performance Targets (proposed; spec will lock)

| Metric | Target |
|---|---|
| Semantic page First Load JS (no 3D) | ≤ 130 kB (baseline 102 kB) |
| 3D chunk (three+r3f+drei, dynamic, deferred) | ≤ 260 kB gzip, loads after hydration, only if WebGL probe passes |
| LCP (hero H1, server-rendered) | < 2.0 s desktop / < 2.5 s mobile |
| CLS | < 0.02 (canvas absolutely positioned; no layout participation) |
| Frame stability during intro | 60 fps desktop / ≥ 30 fps mid-tier mobile (1 draw call) |
| Idle GPU | ~0 (demand frameloop; renders only on invalidate) |
| DPR cap | 2.0 desktop / 1.75 mobile |
| Cleanup | geometry/material disposed on unmount; no leaked rAF |

## 11. Dependency Note

Added `@gsap/react` (official GSAP React adapter — cleanup discipline for
StrictMode). GSAP + three/r3f/drei were already installed per directive
technical direction.

**Recon-proven stack correction (2026-07-26):** the pre-installed
`@react-three/fiber@8` crashed at runtime (`ReactCurrentBatchConfig` TypeError)
because Next 15 App Router runs React 19 on the client while R3F 8's
reconciler requires React 18 internals. Upgraded: `react`/`react-dom` →
19.2.8, `@react-three/fiber` → 9.6.1, `@react-three/drei` → 10.7.7,
`@types/react(-dom)` → 19. This is the R3F line built for React 19; no other
change was viable within the mandated stack.

## 12. Exploration Results (verified in-browser via Playwright MCP)

Evidence: `ai/design/evidence/`

| Evidence | State |
|---|---|
| `hero-desktop-seq0-scattered.png` | Scattered field, marker `UNRESOLVED`, no line — DISORIENTATION |
| `hero-desktop-seq55-aligning.png` | Mid-alignment (55%) — RECOGNITION in progress |
| `hero-desktop-final.png` (1440×900) | Aligned corridor, Forward Line drawn, marker `ESTABLISHED` (copper) |
| `hero-desktop-2560.png` | Large-desktop composition — monumental negative space holds |
| `hero-tablet-1024.png` | Tablet composition |
| `hero-mobile-390-v3.png` | Mobile: 3D as framed observation window above copy (intentional recomposition, 14 frames, DPR ≤1.75) |
| `hero-mobile-320.png` | Narrow mobile — hierarchy intact (nav wraps; refine in implementation) |
| `hero-desktop-reduced-motion.png` | `prefers-reduced-motion`: final established state rendered immediately, no timeline |
| `hero-desktop-no-webgl.png` | WebGL disabled: CSS structural-corridor fallback + full semantic copy/CTAs |
| `hero-desktop-focus.png` | Keyboard: visible copper focus ring, rational tab order |

Verification: typecheck PASS · production build PASS · invariants 6/6 PASS ·
console errors: 0 · semantic `/` route **105 kB First Load JS** (3D chunk
dynamic + probe-gated). A `?seq=<0..1>` hook freezes the sequence for
deterministic Playwright inspection of intermediate states.

Design quality gate (self-assessment, operator to confirm): original — yes
(alignment corridor is subject-derived, not template); enterprise-ready —
yes; hackathon energy — none (one accent, no glow/particles/gradients); 3D
structurally meaningful — yes (thesis made literal); copy readable
immediately — yes (server-rendered DOM, left field kept clear); CTA
unmistakable — yes; mobile intentional — yes (observation-window
recomposition); "would removing the 3D destroy the positioning?" — **NO**
(WebGL-off evidence shows the page carries the positioning alone).

Known refinements deferred to implementation: 320px nav wrap tightening,
tablet secondary-CTA/corridor overlap, corridor interior lighting depth,
favicon.

## 13. Refinement Pass (operator-directed, 2026-07-26) — APPROVED DIRECTION

Operator approved The Alignment Corridor subject to one hero refinement pass.
Changes (evidence: `ai/design/evidence/r2-*.png`):

1. **Material legibility / interior depth** — graphite lightened to `#3a4148`
   (roughness 0.6, metalness 0.3), member depth 0.05→0.09, warm key
   (`#fff4e6`, 1.3) + cool fill (`#9fb2c4`, 0.4) temperature separation, fog
   widened 6→28. No glow, bloom, particles, gradients, or post-processing.
   Note: an interim per-instance colour approach rendered nondeterministically
   across mounts and was replaced with a single deterministic material —
   depth recession is carried by fog + fill.
2. **Forward Line re-engineered** — now a rail (0.055×0.02) seated ON the
   bottom members (no float), travelling the full corridor from the
   foreground frame to the vanishing point.
3. **Terminal condition** — a copper stele (0.07×0.85) rises at the
   corridor's destination as the line arrives (smoothstep 0.82→1 of line
   progress), lit by a short-range copper point light at the terminal:
   arrival is a place, not an effect.
4. **Declaration band simplified** — three columns → one quiet line, locked
   copy verbatim, copper interpuncts.
5. **Legibility** — `--steel` `#8c939b`→`#9aa2ab`, mono labels 11→12px, nav
   links 11.5→12.5px, secondary CTA text paper-on-hairline.
6. **320px nav** — single row held to 320 (13px wordmark, compact command,
   nowrap); short viewports drop the TL corner label, keeping the state
   marker. **Tablet** — corridor recomposed (x=1.7, scale 0.85, same view
   axis as desktop); interim x=2.45 attempt viewed the corridor from outside
   its mouth and was corrected.
7. **Tier model formalised** — desktop / tablet (≤1280) / mobile (≤900)
   transforms in one table (`TIER_TRANSFORM`).

Verification: five widths re-rendered (`r2-desktop-2560`, `r2-laptop-1440`,
`r2-tablet-1024`, `r2-mobile-390`, `r2-mobile-320`), reduced-motion
(`r2-reduced-motion`) and WebGL-off (`r2-no-webgl`) preserved, typecheck
PASS, build PASS (105 kB First Load), invariants 6/6, **zero console errors
through the full intro sequence**. Verification procedure hardened:
cache-busted navigations after each rebuild (browser HTTP cache had served
stale static HTML referencing prior-build chunks).

## 14. Scene Revert (operator-directed, 2026-07-26) — CURRENT STATE

Operator reviewed the r2 refinement and ordered the SCENE reverted to the
approved exploration visual (§12 screenshots), retaining only usability
refinements. Applied exactly — no reinterpretation:

**Restored (original approved values):** member cross-section 0.05³, material
graphite `#2b2f36` (roughness 0.5, metalness 0.4), lighting ambient 0.5 +
key `[4,5,3]`@1.4 + faint copper fill `[-3,-1,6]`@0.25, fog `[5,24]`,
Forward Line as the original 0.024² member at `y = -H/2 + BAR` starting
−0.5 inside the threshold, desktop composition `[1.9, 0.32, 0]`, mobile
window composition `[0, 0.35, 0]` rot 0.08 scale 0.85.

**Removed:** copper terminal stele, terminal point light, lifted `#3a4148`
graphite, cool fill, widened fog, rail treatment, deeper members.

**Retained from r2:** nav/mono-label/secondary-CTA legibility (steel
`#9aa2ab`, 12/12.5px, paper-on-hairline secondary), single-line declaration
band (locked copy verbatim), 320px single-row nav, tablet tier fix
(`[1.7, 0.32, 0]` scale 0.85 — same view axis), `TIER_TRANSFORM` mechanism,
reduced-motion + WebGL fallback behaviour, demand frameloop + probe-gated
dynamic 3D chunk + `?seq=` verification hook.

Evidence: `ai/design/evidence/r3-*.png` (five widths). Verification:
typecheck PASS, build PASS (105 kB First Load), invariants 6/6, zero
console/page errors through full intro, reduced-motion marker `Established`
immediately. Note: one r3 screenshot round initially captured the CSS
fallback because the WebGL-kill init script persisted in the Playwright
browser context — browser restarted, WebGL-live asserted in-run before
capture; the pipeline's Playwright wrapper must isolate fallback simulation
in a dedicated context.
