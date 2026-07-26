# RECON — raystrat-node-1-production-readiness

Capability: Node 1 — Production Readiness
Date: 2026-07-26
Directive: RAYSTRAT EXECUTION DIRECTIVE — NODE 1 PRODUCTION READINESS CAPABILITY
Predecessors: raystrat-node-1-landing-experience (RELEASE_APPROVED),
raystrat-node-1-compositional-refinement (RELEASE_APPROVED), both committed
at `0e098fd`.
State target: RECON_READY

---

## 1. Objective

Wire every navigation/CTA destination to a real, resolving anchor; remove
every accidental `href="#"`; add production metadata (favicon, apple touch
icon, Open Graph image, Twitter image, canonical URL, complete title/
description, theme colour). Composition, copy, hero visuals, performance,
accessibility, reduced-motion, and WebGL fallback are otherwise unchanged.

## 2. Exact href Inventory (before → required after)

| File | Element | Current | Required |
|---|---|---|---|
| `components/hero/Hero.tsx` | wordmark | `href="#"` | `href="/"` |
| `components/hero/Hero.tsx` | nav "Forward-Deployed Engineering" | `href="#"` | `href="#forward-deployed-engineering"` |
| `components/hero/Hero.tsx` | nav "Deployments" | `href="#"` | `href="#deployments"` |
| `components/hero/Hero.tsx` | nav "Fieldwork" | `href="#"` | `href="#fieldwork"` |
| `components/hero/Hero.tsx` | nav "Company" | `href="#"` | **REMOVED** — no Node 6, directive offers omit-or-placeholder; omitting avoids any dead/fake link |
| `components/hero/Hero.tsx` | nav "Deploy Raystrat" command | `href="#"` | `href="#deploy"` |
| `components/hero/Hero.tsx` | hero primary "Deploy Raystrat" | `href="#"` | `href="#deploy"` |
| `components/hero/Hero.tsx` | hero secondary "What is forward-deployed engineering?" | `href="#"` | `href="#forward-deployed-engineering"` |
| `components/sections/FinalAction.tsx` | "Deploy Raystrat" | `href="#"` | `href="#deploy"` |
| `components/sections/Fieldwork.tsx` | "View Fieldwork" | `href="#deploy"` (existing, non-`#`, but directive overrides) | `href="#fieldwork"` |
| `components/sections/ForwardDeployedEngineering.tsx` | "Understand the Model" | `href="#intervention"` (existing, non-`#`, but directive overrides) | `href="#forward-deployed-engineering"` |
| `components/sections/DeploymentSurface.tsx` | "Explore Deployments" | `href="#deploy"` (existing, non-`#`, but directive overrides) | `href="#deployments"` |

No other `href="#"` or href values exist anywhere else in `app/` or
`components/` (confirmed via full-tree grep). Three of the twelve targets
are NOT literal `href="#"` today — the directive explicitly overrides their
prior (already-functioning) destinations. The task must change all twelve,
not just the six literal `"#"` occurrences.

All eight anchor ids these hrefs resolve to already exist and render
server-side: `condition`, `intervention`, `ownership`, `outcome`,
`deployments`, `forward-deployed-engineering`, `fieldwork`, `deploy`
(confirmed present in `components/sections/*.tsx` via prior capability's
verification wrapper 006).

## 3. Hero-Lock Scope Revision (transparent, directive-authorized)

The predecessor capability's hero-lock (wrapper 006) byte-checked
`components/hero/Hero.tsx` and `app/layout.tsx` as immutable. THIS directive
explicitly requires editing both: wiring Hero.tsx's nav/CTA hrefs is
literally this capability's primary scope item, and "Add production
metadata" requires editing layout.tsx's `metadata`/`viewport` exports. This
is not a silent loosening — it is the highest-authority directive for this
capability explicitly authorizing exactly these edits, recorded here and in
the new verification wrapper.

**Revised lock scope for this capability** (still byte-checked, still
forbidden to touch): the hero's 3D/visual/motion/fallback system —
`AlignmentField.tsx`, `HeroCanvas.tsx`, `HeroFallback.tsx`,
`fallback.module.css`, `hero.module.css`, `lib/webgl.ts`. These five files +
1 govern geometry, lighting, materials, the Forward Line, camera rig,
reduced-motion gating, and WebGL fallback — none of which this capability
touches.

**Explicitly permitted, narrow edits:**
- `components/hero/Hero.tsx` — ONLY href values and the `NAV_ITEMS`
  structure (converting it to `{label, href}` pairs and dropping "Company").
  No JSX structure, class names, copy text, or visual markup may change.
- `app/layout.tsx` — ONLY the `metadata` export (add `metadataBase`,
  `alternates.canonical`, `openGraph`, `twitter`) and a new `viewport` export
  (`themeColor`). Font loading, `html` element structure, and
  `RootLayout`/children rendering are unchanged.

## 4. Current Metadata / Icon State

- `app/layout.tsx` currently exports only `title` + `description` in
  `metadata`. No `metadataBase`, no `alternates`, no `openGraph`, no
  `twitter`, no `viewport`/`themeColor`.
- No `public/` directory exists.
- No `next.config.*` exists (none needed for this capability).
- No favicon, apple-touch-icon, OG image, or Twitter image files exist
  anywhere (`app/icon.*`, `app/apple-icon.*`, `app/opengraph-image.*`,
  `app/twitter-image.*` all absent).
- Next.js version: 15.5.9 — supports the file-convention image routes
  (`icon.tsx` / `apple-icon.tsx` / `opengraph-image.tsx` / `twitter-image.tsx`
  using `next/og`'s `ImageResponse`, bundled with Next itself — **zero new
  dependencies required**).

## 5. Proposed Metadata Implementation

- `app/icon.tsx` — 32×32 `ImageResponse`: `--ink-0` (#0b0c0e) background,
  bold copper (#b4703a) "R" monogram — legible at favicon sizes where an
  abstract line motif would not be.
- `app/apple-icon.tsx` — 180×180, same monogram design, more breathing room.
- `app/opengraph-image.tsx` + `app/twitter-image.tsx` — 1200×630
  `ImageResponse`: `--ink-0` background, uppercase mono-style eyebrow label
  "FORWARD-DEPLOYED ENGINEERING" in steel, the locked promise line "Raystrat
  will find the way forward." in bold paper-coloured type, a thin copper
  rule, "RAYSTRAT SYSTEMS" mono footer. System sans/monospace fonts only (no
  font-buffer fetch) — appropriate for a static share-preview image, not the
  live page.
- `app/layout.tsx` metadata additions:
  - `metadataBase: new URL("https://raystratsystems.com")`
  - `title`/`description`: kept (already complete)
  - `alternates: { canonical: "https://raystratsystems.com" }`
  - `openGraph: { title, description, url, siteName: "Raystrat Systems", images: [...], type: "website", locale: "en_US" }`
  - `twitter: { card: "summary_large_image", title, description, images: [...] }`
  - new `viewport` export: `{ themeColor: "#0b0c0e" }` (matches `--ink-0`,
    the approved near-black field)

No `next.config.*` change; no runtime export (`export const runtime = ...`)
added to any file — Next's default runtime is left untouched, satisfying
"Do not change Node.js runtime in this capability."

## 6. Bundle / Performance Impact

Icon and OG/Twitter image routes are generated Node.js route handlers,
entirely separate from the `/` page's client JS bundle — they add zero
bytes to First Load JS. Baseline to hold: **106 kB** (unchanged since the
compositional-refinement capability).

## 7. Verification Baseline

001–006 all PASS at HEAD (`0e098fd`). This capability adds
`007-raystrat-node-1-production-readiness.sh` asserting: revised hero-lock
(5+1 files, not the full former 8), no `href="#"` anywhere in rendered HTML,
every one of the 12 corrected hrefs present and pointing at an anchor that
exists, favicon/apple-icon/OG-image/twitter-image routes return HTTP 200
with correct content-type, canonical link tag present with the exact
domain, OG/Twitter meta tags present, theme-color meta present, First-Load
budget held, GSAP still dynamic-only.

## 8. Mutation Boundary

MAY modify: `components/hero/Hero.tsx` (hrefs/NAV_ITEMS only),
`app/layout.tsx` (metadata/viewport only), `components/sections/FinalAction.tsx`,
`components/sections/Fieldwork.tsx`,
`components/sections/ForwardDeployedEngineering.tsx`,
`components/sections/DeploymentSurface.tsx` (href values only — no copy/
structure change), NEW `app/icon.tsx`, `app/apple-icon.tsx`,
`app/opengraph-image.tsx`, `app/twitter-image.tsx`,
`scripts/verification/007-*.sh`, recon/spec/task/journal artifacts.

MUST NOT modify: `components/hero/AlignmentField.tsx`, `HeroCanvas.tsx`,
`HeroFallback.tsx`, `fallback.module.css`, `hero.module.css`, `lib/webgl.ts`,
`styles/globals.css` token values, any section's copy text, `next.config.*`
(none exists — none added), `package.json`/lockfile (no new deps), `vendor/`,
OS `scripts/` runtime, `tasks/**` control plane, env files, `.vercel/**`.
No Node.js runtime export added anywhere. No Nodes 2–7 routes.

## 9. Risks

- **Accessibility**: nav item count drops from 4→3 (Company removed) —
  confirm remaining nav items keep visible focus, correct tab order, and
  `aria-label="Primary"` still applies.
- **Metadata correctness**: Next's `metadataBase` + relative image paths
  must resolve to correct absolute URLs in rendered `<head>` — verify via
  curl, not assumption.
- **Icon legibility**: a monogram must remain legible at 16–32px — visual
  inspection required, not just "it built."
- **Self-referencing anchors**: three corrected hrefs (View Fieldwork →
  #fieldwork, Understand the Model → #forward-deployed-engineering, Explore
  Deployments → #deployments) point at the section the control already sits
  in — this is the directive's explicit, deliberate instruction (each CTA
  gets the best real in-page destination standing in for its eventual
  dedicated Node page) and is implemented literally, not second-guessed.

STATUS: RECON COMPLETE — ready for spec authoring.
