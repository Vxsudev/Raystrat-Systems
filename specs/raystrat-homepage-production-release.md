# Spec: Raystrat Homepage Production Release

## Status
approved

## Phase
phase-ui

## Capability

Take PR #2 (`feat/homepage-software-systems`, head `e14ce7f`, the approved
"Software systems businesses run on" homepage) through to production on
raystratsystems.com. The PR's design and copy are already implemented and
approved; this capability resolves the deployment blocker (Vercel rejects
the project's discontinued Node.js 20.x runtime) and verifies the result.
Recon: `ai/recon/raystrat-homepage-production-release.md`.

Directive authority: operator instruction of 2026-11-20 authorising the
necessary fixes, Vercel configuration update, merge and production
deployment of PR #2, without a further approval stop.

## Data Model Changes

none

## API Surface

none

## Frontend Surface

- `package.json` — add `"engines": { "node": "26.x" }`. No other field,
  dependency or script changes. `yarn.lock` must remain unchanged (Vercel
  installs with `--frozen-lockfile`).

Pre-existing in PR #2 (verified, not authored by this capability):
`app/page.tsx`, `app/layout.tsx`, `app/globals.css`,
`app/components/{SiteHeader,SiteFooter,ContactForm}.tsx`,
`app/{opengraph,twitter}-image.tsx`, and the 011 headline assertion.

## Verification Scripts

- 001-typecheck.sh
- 003-build.sh
- 004-invariants.sh
- 011-raystrat-emergent-site-takeover.sh
- 013-raystrat-homepage-production-release.sh (NEW)

## Locked Constraints (INVARIANT — violation fails the capability)

1. **Preserve the approved homepage.** Static design, copy, enquiry form
   and public email (`founder@raystratsystems.com`) unchanged.
2. **No stage labels, no "proof of concept", no "with quality gates".**
3. **"Laboratory work-order and test-allocation system"** stays verbatim.
4. **`/ai-solutions` and `/forward-deployed-engineering` stay available.**
5. **Indexing:** production indexable (`SITE_ENV=production`, Production
   scope only); previews stay noindex. No env change.
6. **No real enquiry is sent** during any verification.
7. **Only strictly necessary changes** for a successful deployment.

## Release Operations (operator session, after RELEASE_APPROVED)

1. Set Vercel project `raystrat-systems` Node.js Version to `26.x`.
2. Push the branch; obtain a Ready Vercel preview; verify all three pages,
   desktop/mobile layout, navigation, enquiry-form client validation (no
   submission), and preview noindex.
3. Merge PR #2 into `main`; confirm Vercel builds the merge commit to
   production on the existing project.
4. Verify https://raystratsystems.com: new homepage, navigation, public
   contact details, Formspree configuration, metadata, sitemap, robots
   and production indexing.
5. If production is materially broken, roll back to
   `dpl_26PT2dke49oECr81YtcBiSPQD7oU`.
