# Task: Wire navigation/CTA hrefs and add production metadata (icons, OG/Twitter, canonical, theme-color)

## Parent Spec
specs/raystrat-node-1-production-readiness.md

## Phase
phase-ui

## Status
done

## Layer
frontend

## Description
Read the ENTIRE parent spec first — it has the exact before/after href table,
the exact metadata TypeScript to add, and the exact icon/OG/Twitter image
designs. This task is composed of two independent halves; do both.

### HALF A — href wiring (components/hero/Hero.tsx + 4 section files)

Apply ALL TWELVE corrections below. Three of them override an EXISTING
non-`"#"` href (Fieldwork, ForwardDeployedEngineering, DeploymentSurface) —
do not skip those just because they are not literally `href="#"` today.

In `components/hero/Hero.tsx`:
1. Wordmark anchor: `href="#"` → `href="/"`
2. Restructure `NAV_ITEMS` from a plain string array into an array of
   `{ label, href }` objects (or equivalent), REMOVE the "Company" entry
   entirely (no link, no placeholder element in its place), and set:
   - "Forward-Deployed Engineering" → `href="#forward-deployed-engineering"`
   - "Deployments" → `href="#deployments"`
   - "Fieldwork" → `href="#fieldwork"`
   Update the `.map()` that renders these to use the new `{label, href}`
   shape. Do not change the `navLink` class, styling, or any other markup.
3. Nav "Deploy Raystrat" command anchor: `href="#"` → `href="#deploy"`
4. Hero primary "Deploy Raystrat" CTA: `href="#"` → `href="#deploy"`
5. Hero secondary "What is forward-deployed engineering?" CTA: `href="#"` →
   `href="#forward-deployed-engineering"`

Elsewhere (href value only — change nothing else in these files):
6. `components/sections/FinalAction.tsx` "Deploy Raystrat": `href="#"` →
   `href="#deploy"`
7. `components/sections/Fieldwork.tsx` "View Fieldwork": `href="#deploy"` →
   `href="#fieldwork"`
8. `components/sections/ForwardDeployedEngineering.tsx` "Understand the
   Model": `href="#intervention"` → `href="#forward-deployed-engineering"`
9. `components/sections/DeploymentSurface.tsx` "Explore Deployments":
   `href="#deploy"` → `href="#deployments"`

After all edits: `grep -r 'href="#"' app/ components/` MUST return nothing.
These are self-referencing anchors in three cases (the button lives inside
the very section its href points at) — this is intentional and specified
exactly this way in the spec; do not "fix" it differently.

### HALF B — production metadata (all NEW files except layout.tsx edit)

In `app/layout.tsx`, ADD to the existing `metadata` export (keep `title` and
`description` exactly as they are) — do not touch font loading, the
`html`/`body` JSX, or the `RootLayout` function signature:

```ts
metadataBase: new URL("https://raystratsystems.com"),
alternates: { canonical: "https://raystratsystems.com" },
openGraph: {
  title: "Raystrat Systems — Forward-Deployed Engineering",
  description: "Forward-deployed engineering for difficult business problems. Raystrat enters the operation, establishes what is true, determines what must change, and builds the software required to move the business forward.",
  url: "https://raystratsystems.com",
  siteName: "Raystrat Systems",
  images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  type: "website",
  locale: "en_US",
},
twitter: {
  card: "summary_large_image",
  title: "Raystrat Systems — Forward-Deployed Engineering",
  description: "Forward-deployed engineering for difficult business problems.",
  images: ["/twitter-image"],
},
```

Also ADD a new sibling export (import `Viewport` type from "next" alongside
the existing `Metadata` import):

```ts
export const viewport: Viewport = { themeColor: "#0b0c0e" };
```

Create these NEW files using Next.js 15's file-convention image routes
(`next/og`'s `ImageResponse` — already bundled with Next, zero new
dependencies, do not add ANY `export const runtime = ...` to these files —
leave Next's default runtime untouched per the spec's "no runtime change"
constraint):

- `app/icon.tsx`: `export const size = { width: 32, height: 32 }`,
  `export const contentType = "image/png"`, default export an async function
  returning `ImageResponse` from `next/og`. Design: full-bleed `#0b0c0e`
  background, centered bold "R" glyph in `#b4703a`
  (`fontFamily: "system-ui, -apple-system, sans-serif"`, `fontWeight: 700`),
  sized to read clearly at 16–32px (large glyph, minimal padding).
- `app/apple-icon.tsx`: same design, `size = { width: 180, height: 180 }`,
  same colours/glyph, just more surrounding padding — must be recognizably
  the same mark.
- `app/opengraph-image.tsx` and `app/twitter-image.tsx`: both
  `size = { width: 1200, height: 630 }`, `contentType = "image/png"`.
  Identical design in both files (this is intentional): full-bleed
  `#0b0c0e` background; top-left uppercase mono-style eyebrow
  "FORWARD-DEPLOYED ENGINEERING" in `#9aa2ab` with letter-spacing; below it
  the line "Raystrat will find the way forward." in bold `#edeae3`
  (~64–72px, tight line-height, left-aligned, system sans-serif bold — no
  custom font fetch needed for these static share images); a thin `#b4703a`
  horizontal rule beneath the headline; bottom "RAYSTRAT SYSTEMS" in small
  mono-style `#9aa2ab`. ~80px padding on all sides so nothing crops in
  social previews. No gradients, no photography, no illustration.

## Hard Rules
- Do NOT modify components/hero/AlignmentField.tsx, HeroCanvas.tsx,
  HeroFallback.tsx, fallback.module.css, hero.module.css, or lib/webgl.ts —
  these remain byte-for-byte locked (verified by md5 in the 007 wrapper).
- Do NOT change any copy/text content anywhere.
- Do NOT add package.json dependencies or create/modify next.config.*.
- Do NOT add `export const runtime = ...` anywhere.
- Verify locally: `npx tsc --noEmit` and `npm run build` both pass; First
  Load JS for `/` stays <=140 kB (icon/OG/Twitter routes must not affect it
  — they are separate server routes, not part of the page bundle).

## Acceptance Criteria
- [ ] All 12 href corrections applied exactly; `grep -r 'href="#"' app/ components/` empty
- [ ] Company nav item removed cleanly (no dead link/placeholder)
- [ ] app/layout.tsx has metadataBase, alternates.canonical, openGraph, twitter, and a new viewport export with themeColor "#0b0c0e" — title/description/fonts/JSX otherwise unchanged
- [ ] app/icon.tsx, app/apple-icon.tsx, app/opengraph-image.tsx, app/twitter-image.tsx created per the design spec, no new deps, no runtime export
- [ ] The 6 hero-lock files unchanged
- [ ] typecheck + build pass; First Load <=140 kB

## Files Likely Affected
- components/hero/Hero.tsx
- components/sections/FinalAction.tsx
- components/sections/Fieldwork.tsx
- components/sections/ForwardDeployedEngineering.tsx
- components/sections/DeploymentSurface.tsx
- app/layout.tsx
- app/icon.tsx (new)
- app/apple-icon.tsx (new)
- app/opengraph-image.tsx (new)
- app/twitter-image.tsx (new)

## Blocked By
- none
