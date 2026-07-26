# Task: Audit href wiring and production metadata against the spec; repair app-code deviations

## Parent Spec
specs/raystrat-node-1-production-readiness.md

## Phase
phase-ui

## Status
done

## Layer
verification

## Description
Audit the implementation against the parent spec and repair any deviation
IN APPLICATION SOURCE ONLY (do not touch scripts/, tasks/, ai/, vendor/).

1. Href table: re-check all 12 corrections from the spec's exact table,
   including the 3 that override previously-non-`#` values. Confirm
   `grep -r 'href="#"' app/ components/` is empty. Confirm the Company nav
   item is fully removed (not just hidden).
2. Hero-lock: confirm md5 of AlignmentField.tsx, HeroCanvas.tsx,
   HeroFallback.tsx, fallback.module.css, hero.module.css, lib/webgl.ts are
   unchanged from before this capability started (git diff against HEAD
   before your changes, or compare against the spec's stated baseline —
   these 6 files must show ZERO diff).
3. app/layout.tsx: confirm metadataBase, alternates.canonical, openGraph,
   twitter, and viewport(themeColor) are present exactly as specified, and
   that title/description/font-loading/JSX structure are unchanged.
4. Icon/OG/Twitter files: confirm they exist, use next/og ImageResponse,
   correct sizes (32/180/1200x630/1200x630), correct content-type, no
   runtime export added, no new package.json dependency.
5. Build: `npx tsc --noEmit` and `npm run build` pass; First Load JS for `/`
   stays within budget (<=140 kB; check the build output number directly).
   Serve the build (`npx next start -p 3109`), curl `/`, `/icon`,
   `/apple-icon`, `/opengraph-image`, `/twitter-image` — confirm 200 +
   image/png on the four image routes, and confirm canonical/OG/twitter/
   theme-color meta tags are in the rendered `<head>`. Kill the server after.
6. Confirm no copy/text content changed anywhere versus the predecessor
   capability's locked substrate (spot check a few lines from
   specs/raystrat-node-1-landing-experience.md against rendered HTML).

If everything conforms, make no changes and exit.

## Acceptance Criteria
- [ ] All href corrections verified exact; no href="#" anywhere
- [ ] Hero-lock 6-file scope verified unchanged
- [ ] Metadata (canonical/OG/Twitter/theme-color) verified present and correct
- [ ] Icon/OG/Twitter image routes verified 200 + image/png
- [ ] typecheck + build pass; budget held
- [ ] No control-plane files touched

## Files Likely Affected
- components/hero/Hero.tsx (repairs only, if drift found)
- components/sections/*.tsx (repairs only, if drift found)
- app/layout.tsx (repairs only, if drift found)
- app/icon.tsx, app/apple-icon.tsx, app/opengraph-image.tsx, app/twitter-image.tsx (repairs only, if drift found)

## Blocked By
- tasks/raystrat-node-1-production-readiness-001.md
