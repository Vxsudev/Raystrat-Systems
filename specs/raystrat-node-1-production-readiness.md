# Spec: Raystrat Node 1 Production Readiness

## Status
approved

## Phase
phase-ui

## Capability

Wire every Node 1 navigation and CTA destination to a real, resolving
in-page anchor; remove every accidental `href="#"`; add production
metadata (favicon, apple touch icon, Open Graph image, Twitter image,
canonical URL, complete title/description, theme colour). No visual,
compositional, copy, performance, accessibility, reduced-motion, or WebGL
fallback change beyond what is explicitly listed here. No Nodes 2–7. No
Node.js runtime change.

Directive authority: RAYSTRAT EXECUTION DIRECTIVE — NODE 1 PRODUCTION
READINESS CAPABILITY (2026-07-26). This directive explicitly authorizes
editing `components/hero/Hero.tsx` (hrefs only) and `app/layout.tsx`
(metadata/viewport only) — see Locked Constraints §1 for the revised
hero-lock scope.

## Data Model Changes

none

## API Surface

none

## Frontend Surface

- components/hero/Hero.tsx — href/NAV_ITEMS wiring ONLY
- components/sections/FinalAction.tsx — href value only
- components/sections/Fieldwork.tsx — href value only
- components/sections/ForwardDeployedEngineering.tsx — href value only
- components/sections/DeploymentSurface.tsx — href value only
- app/layout.tsx — metadata + new viewport export ONLY
- app/icon.tsx — NEW
- app/apple-icon.tsx — NEW
- app/opengraph-image.tsx — NEW
- app/twitter-image.tsx — NEW

## Verification Scripts

- 001-typecheck.sh
- 002-lint.sh
- 003-build.sh
- 004-invariants.sh
- 005-raystrat-node-1-landing-experience.sh
- 006-raystrat-node-1-compositional-refinement.sh
- 007-raystrat-node-1-production-readiness.sh

## Locked Constraints (INVARIANT — violation fails the capability)

1. **Revised hero-lock scope (directive-authorized).** The following remain
   BYTE-FOR-BYTE unchanged (md5-checked): `components/hero/AlignmentField.tsx`,
   `components/hero/HeroCanvas.tsx`, `components/hero/HeroFallback.tsx`,
   `components/hero/fallback.module.css`, `components/hero/hero.module.css`,
   `lib/webgl.ts`. `components/hero/Hero.tsx` and `app/layout.tsx` MAY change
   ONLY per the exact edits in this spec (hrefs/NAV_ITEMS; metadata/viewport)
   — no other line in either file may change (no JSX restructuring, no class
   name changes, no font/html changes, no copy changes).
2. **Exact href corrections (apply all twelve; three override existing
   non-`#` values — do not skip those because they are not literally `"#"`):**
   - Hero.tsx wordmark: → `href="/"`
   - Hero.tsx nav "Forward-Deployed Engineering": → `href="#forward-deployed-engineering"`
   - Hero.tsx nav "Deployments": → `href="#deployments"`
   - Hero.tsx nav "Fieldwork": → `href="#fieldwork"`
   - Hero.tsx nav "Company": REMOVE this nav item entirely (delete from the
     nav items list; do not render any link, placeholder, or disabled
     element for it)
   - Hero.tsx nav "Deploy Raystrat" command: → `href="#deploy"`
   - Hero.tsx hero primary "Deploy Raystrat": → `href="#deploy"`
   - Hero.tsx hero secondary "What is forward-deployed engineering?": →
     `href="#forward-deployed-engineering"`
   - FinalAction.tsx "Deploy Raystrat": → `href="#deploy"`
   - Fieldwork.tsx "View Fieldwork": → `href="#fieldwork"` (was `#deploy`)
   - ForwardDeployedEngineering.tsx "Understand the Model": →
     `href="#forward-deployed-engineering"` (was `#intervention`)
   - DeploymentSurface.tsx "Explore Deployments": → `href="#deployments"`
     (was `#deploy`)
   After these changes, `grep -r 'href="#"' app/ components/` must return
   NOTHING.
3. **No copy change.** Only `href` attribute values and the nav-items data
   structure change in Hero.tsx; all visible text, all other section text,
   remains byte-identical.
4. **No new dependencies.** Icon/OG/Twitter images use `next/og`'s
   `ImageResponse` (bundled with Next.js 15.5.9 — already installed, zero
   new packages). No `next.config.*` is created or modified (none exists
   today).
5. **No Node.js runtime change.** Do not add `export const runtime = ...` to
   any file, including the new icon/image routes. Leave Next's default
   runtime untouched everywhere.
6. **No fabricated evidence, no new marketing claims.**
7. **No production deploy / push / DNS / domain-alias modification.**

## Metadata Implementation (exact)

### app/layout.tsx additions

Add to the existing `metadata` export (do not remove `title`/`description`):

```ts
metadataBase: new URL("https://raystratsystems.com"),
alternates: {
  canonical: "https://raystratsystems.com",
},
openGraph: {
  title: "Raystrat Systems — Forward-Deployed Engineering",
  description:
    "Forward-deployed engineering for difficult business problems. Raystrat enters the operation, establishes what is true, determines what must change, and builds the software required to move the business forward.",
  url: "https://raystratsystems.com",
  siteName: "Raystrat Systems",
  images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  type: "website",
  locale: "en_US",
},
twitter: {
  card: "summary_large_image",
  title: "Raystrat Systems — Forward-Deployed Engineering",
  description:
    "Forward-deployed engineering for difficult business problems.",
  images: ["/twitter-image"],
},
```

Add a new sibling export (Next.js 14+ requires `themeColor` in `viewport`,
not `metadata`):

```ts
export const viewport: Viewport = {
  themeColor: "#0b0c0e",
};
```

(Import `Viewport` type alongside the existing `Metadata` import from
`next`.) Do not touch font loading, the `html`/`body` JSX, or
`RootLayout`'s signature.

### app/icon.tsx (NEW — favicon)

`ImageResponse`, `size = { width: 32, height: 32 }`,
`contentType = "image/png"`. Design: full-bleed background `#0b0c0e`;
centered bold "R" glyph in `#b4703a`, `fontWeight: 700`,
`fontFamily: "system-ui, -apple-system, sans-serif"`, sized to fill most of
the square with balanced padding. No gradients, no border, no additional
ornament — must read clearly as a single glyph at 16–32px.

### app/apple-icon.tsx (NEW — apple touch icon)

Same design language, `size = { width: 180, height: 180 }`,
`contentType = "image/png"`. Same background/glyph colours; proportion may
give the glyph slightly more surrounding padding at this larger size, but
it must be recognizably the same mark as the favicon (not a different
design).

### app/opengraph-image.tsx and app/twitter-image.tsx (NEW)

Both `size = { width: 1200, height: 630 }`, `contentType = "image/png"`.
Identical design (Twitter falls back visually to look the same as OG — this
is intentional, not duplication error): full-bleed `#0b0c0e` background;
top-left uppercase mono-style eyebrow "FORWARD-DEPLOYED ENGINEERING" in
`#9aa2ab` with letter-spacing; below it, the locked promise line "Raystrat
will find the way forward." in bold `#edeae3`, large (~64–72px), tight
line-height, left-aligned, matching the hero's headline character (system
sans-serif bold is acceptable here — no custom font fetch); a thin
`#b4703a` horizontal rule beneath the headline; bottom-left or bottom-right
small mono-style "RAYSTRAT SYSTEMS" in `#9aa2ab`. Generous padding (~80px)
on all sides so nothing crops in social-card previews. No gradients, no
photography, no illustration, no 3D.

## Accessibility Contract

Nav item count changes from 4 to 3 (Company removed) — `aria-label="Primary"`
on the `<nav>` stays; each remaining link keyboard-reachable in DOM order
with visible `:focus-visible`. No new elements introduced that break
heading order (h1 hero + h2 per screen unchanged). Icon/OG/Twitter images
carry no semantic meaning removed from the page — they are metadata only,
never referenced from in-page content.

## Responsive Contract

No layout change is introduced by this capability (only href values, one
removed nav item, and out-of-band metadata). Verify at the same five widths
that the nav still fits without wrapping issues now that it is one item
shorter (should only improve fit, never regress).

## Performance Budget

First Load JS for `/` remains ≤140 kB (baseline 106 kB unchanged — icon/OG/
Twitter routes are server-rendered image responses, entirely outside the
page's client bundle). No new dependencies. No runtime change.

## Verification Requirements (007 wrapper, exact)

1. Hero-lock (revised scope): md5 match for the 6 files in Locked
   Constraints §1 (AlignmentField/HeroCanvas/HeroFallback/fallback.module.css/
   hero.module.css/webgl.ts).
2. `grep -r 'href="#"' app/ components/` → empty.
3. All twelve corrected href targets present in rendered HTML, each pointing
   at an anchor id that exists in the DOM (condition, intervention,
   ownership, outcome, deployments, forward-deployed-engineering, fieldwork,
   deploy, or `/` for the wordmark).
4. Nav renders exactly 3 items + 1 command (Company absent; no dead link,
   no disabled placeholder element in its place).
5. `GET /icon` (or resolved icon path), `GET /apple-icon`,
   `GET /opengraph-image`, `GET /twitter-image` all return HTTP 200 with
   `content-type: image/png`.
6. Rendered `<head>` contains: `<link rel="canonical" href="https://raystratsystems.com">`
   (or equivalent via `alternates.canonical`), `<meta property="og:title"`,
   `<meta property="og:image"`, `<meta name="twitter:card" content="summary_large_image">`,
   `<meta name="theme-color" content="#0b0c0e">`, an icon `<link>`.
7. First Load JS ≤140 kB (envelope ≤460 kB uncompressed, matching prior
   wrappers' method).
8. All predecessor substrate/anchor/command checks (005, 006) still pass
   unmodified.

## Design Quality Gate

1. Do all nav links and CTAs go somewhere real? 2. Is Company's absence
   clean (no dead link)? 3. Are the favicon and apple icon legible at their
   actual render sizes? 4. Does the OG/Twitter card read as an authentic
   extension of the approved visual system (not a generic template)? 5. Is
   metadata complete and correct when inspected in real HTML? 6. Is
   everything else — hero motion, compositions, copy, performance,
   accessibility, reduced-motion, WebGL fallback — provably unchanged?

## Mutation Boundary

MAY modify: `components/hero/Hero.tsx` (hrefs/NAV_ITEMS only),
`app/layout.tsx` (metadata/viewport only), `components/sections/FinalAction.tsx`,
`components/sections/Fieldwork.tsx`,
`components/sections/ForwardDeployedEngineering.tsx`,
`components/sections/DeploymentSurface.tsx` (href values only),
`app/icon.tsx`, `app/apple-icon.tsx`, `app/opengraph-image.tsx`,
`app/twitter-image.tsx` (all new), `scripts/verification/007-*.sh`.
MUST NOT modify: the 6 revised-lock hero files, `styles/globals.css` token
values, any section's copy text, `package.json`/lockfile, `next.config.*`
(none exists), `vendor/**`, OS `scripts/` runtime, `tasks/**`, `ai/**`
(except journal via supervisor), env files, `.vercel/**`.

## Dependencies

none
