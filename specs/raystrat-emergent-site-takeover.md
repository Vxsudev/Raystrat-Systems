# Spec: Raystrat Emergent Site Takeover

## Status
approved

## Phase
phase-ui

## Capability

Replace the entire committed Node 1 website (3D/WebGL hero, GSAP-driven
sections, `find the way forward` copy substrate) with the approved Emergent
build, verified against archive `raystrat-systems-handoff-c5724273.zip`
(SHA-256 `c572427383f69d69b24d41943e02ff4e4ddaf8c54301e5bb0e18693e89b37ab2`,
independently confirmed — see `ai/recon/raystrat-emergent-site-takeover.md`
§2). One clean replacement, not old and new stitched together. Exactly
three routes survive: `/`, `/ai-solutions`, `/forward-deployed-engineering`,
plus the shared homepage enquiry form and its `/enquiry/submit` server
endpoint (delivery stays disabled).

Directive authority: RAYSTRAT SYSTEMS — GOVERNED WEBSITE REPLACEMENT
(2026-09-05), authorising isolated local implementation and verification
only — no commit, push, deploy, DNS change, or email activation.

## Data Model Changes

none

## API Surface

none

(`/enquiry/submit` is a Next.js Route Handler inside the same app, not a
separate backend service — matches this project's existing convention:
prior capabilities also declare "none" for in-app route handlers, and it is
implemented as part of Frontend Surface below.)

## Frontend Surface

Full replacement of the committed Node 1 app surface with the archive's
`frontend/` content, merged into the existing repo-root convention (not
nested — directive §6). Internal structure of the Emergent app itself
(`app/components/`, `app/lib/`) is preserved exactly as shipped, not
refactored to match the old repo's `components/`/`lib/` root convention —
see recon §5 for the reasoning.

**New / replaced (from archive `frontend/`):**
- `app/page.tsx`, `app/layout.tsx` — replace old Node 1 versions
- `app/ai-solutions/page.tsx` — NEW
- `app/forward-deployed-engineering/page.tsx` — NEW
- `app/enquiry/submit/route.ts` — NEW
- `app/components/SiteHeader.tsx`, `SiteFooter.tsx`, `ContactForm.tsx` — NEW
- `app/lib/site.ts` — NEW
- `app/globals.css` — NEW (replaces repo-root `styles/globals.css`)
- `app/sitemap.ts`, `app/robots.ts` — NEW
- `middleware.ts` — NEW (repo root)
- `package.json`, `yarn.lock` — replace old `package.json`/
  `package-lock.json`; switches package manager to yarn (archive's supplied,
  compatible manager — HANDOFF.md: npm resolves a different tree).
  `"start"` script corrected from the archive's `next dev -H 0.0.0.0 -p 3000`
  to `next start -H 0.0.0.0 -p 3000` (directive §7 required fix).
- `tsconfig.json`, `next-env.d.ts` — replace old
- `.env.example` — NEW (repo root; placeholder values only)
- `app/{icon,apple-icon,opengraph-image,twitter-image}.tsx` — recoloured to
  the Emergent site's own tokens (`--ink #0f0f0e`/`--accent #2743d4`);
  OG/Twitter copy swapped from the retired tagline to the real, already-
  approved homepage eyebrow/H1 — recon §7, disclosed judgment call.
- `backend/tests/test_enquiry_api.py` — NEW, adapted: default `BASE`
  changed from the Emergent preview hostname to `http://localhost:3000`
  (directive §10 — tests adapted to localhost).
- `memory/PRD.md`, `test_reports/**` — NEW, preserved as historical
  reference/evidence, not application code.

**Deleted (old Node 1 3D/GSAP surface — full list, recon §6):**
- `components/hero/**` (6 files)
- `components/sections/**` (11 files + CSS module)
- `lib/webgl.ts`
- `styles/globals.css` (and the emptied `styles/` directory)

**Engineering OS surface (consequence of the replacement, not independent
work):**
- `.engineering-os/invariants/INV-002-content-integrity.sh` → relocated to
  `.engineering-os/invariants/_legacy/` (superseded — recon §8, no successor
  phrase exists in the new copy)
- `.engineering-os/invariants/INV-003-scope-integrity.sh` → allowlist
  updated to `ai-solutions forward-deployed-engineering enquiry components
  lib`; header comment updated to describe the new scope
- `scripts/verification/005-raystrat-node-1-landing-experience.sh`,
  `006-raystrat-node-1-compositional-refinement.sh`,
  `007-raystrat-node-1-production-readiness.sh` → relocated to
  `scripts/verification/_legacy/` (superseded — recon §9)
- `scripts/verification/011-raystrat-emergent-site-takeover.sh` — NEW

## Verification Scripts

- 001-typecheck.sh
- 002-lint.sh (SKIP — no linter configured, pre-existing)
- 003-build.sh
- 004-invariants.sh
- 011-raystrat-emergent-site-takeover.sh (NEW)

(005/006/007 deliberately excluded — superseded, moved to `_legacy/`, would
assert facts about a website this capability replaces.)

## Locked Constraints (INVARIANT — violation fails the capability)

1. **No redesign, no copy rewrite.** Every word of copy, every route, the
   layout and the CSS come from the archive unchanged, except the four
   metadata-image generators (recon §7, disclosed) and the test file's base
   URL (recon §5).
2. **Exactly three public routes**: `/`, `/ai-solutions`,
   `/forward-deployed-engineering`. `How We Work` stays a homepage anchor
   section (`/#how-we-work`), not a route. No additional pages.
3. **One shared homepage enquiry form**, `/enquiry/submit` unchanged.
   `ENQUIRY_DELIVERY_ENABLED` stays `false`. No credentials entered, no test
   send, no email activation.
4. **Private recipient (`vp@raystrat.com`) stays server-side only** — never
   rendered, never in a browser bundle. Verified by scanning rendered HTML
   of all three routes (011's own check).
5. **`/sitemap.xml` contains exactly the three production URLs**, no
   preview hostnames, no anchors, no nonexistent routes.
6. **No commit, push, merge, deploy, DNS change, or paid infrastructure** —
   this capability stops at `RELEASE_APPROVED` with a verified local build
   for operator review, exactly like every predecessor capability.
7. **No Emergent branding or hostname anywhere in the shipped application
   surface** (already true of the archive's own `frontend/` source —
   confirmed by full-tree grep during recon; this constraint guards against
   regression, not a known current violation).

## Portability Requirements

- `yarn install` in place of `npm install`/`npm ci` (package manager
  switch, directive §7).
- `yarn dev` → `next dev -H 0.0.0.0 -p 3000`; `yarn build` → `next build`;
  `yarn start` (fixed) → `next start -H 0.0.0.0 -p 3000`; `yarn serve` kept
  as an equivalent alias.
- `pytest backend/tests/test_enquiry_api.py` runnable locally against
  `http://localhost:3000` (dev server running), per HANDOFF.md's own
  instructions, adapted off the Emergent preview hostname.
- `SITE_ENV` unset/`preview` locally → `noindex,nofollow,nocache` +
  `X-Robots-Tag: noindex, nofollow` on all three page routes; robots.txt
  allows crawling (so the noindex directive itself is readable) and omits
  the sitemap reference. `SITE_ENV=production` is the only switch that
  changes this — verified locally by setting it temporarily during
  production-mode verification only, never in a running/deployed instance.

## Metadata (route-specific, already implemented in the archive — verified, not authored)

- `/` — no dedicated title override (root `layout.tsx` metadata applies:
  "Raystrat Systems — AI systems built for your business"), canonical `/`.
- `/ai-solutions` — title "AI Solutions — Raystrat Systems", canonical
  `/ai-solutions`, OG present.
- `/forward-deployed-engineering` — title "Forward-Deployed Engineering —
  Raystrat Systems", canonical `/forward-deployed-engineering`, OG present.
- All three: `robots` meta gated by `IS_PRODUCTION`; `metadataBase` =
  `https://raystratsystems.com`.

## Accessibility (already implemented in the archive — verified, not authored)

Semantic landmarks, labelled form inputs, `aria-invalid`/`aria-describedby`
on `ContactForm`, `aria-live` status region, native `<details>` for FAQs,
`aria-current="page"` on the active nav link. No automated accessibility
audit was run per HANDOFF.md (disclosed as an outstanding item, not fixed
by this capability — directive doesn't ask for new work beyond the
replacement itself).

## Performance Budget

Not carried over from Node 1 (different framework surface entirely — no
Three.js/GSAP, no WebGL). Measured fresh during verification (011)/production
build output; no prior baseline applies.

## Mutation Boundary

MAY modify: everything listed under Frontend Surface above, plus the named
Engineering OS artifacts (invariants, verification scripts, recon/spec/
tasks/journal/state-registry).

MUST NOT modify: `vendor/**`, OS `scripts/` runtime, `.vercel/**`,
`.git/hooks/**`, `specs/phases/phase-ui.md`, any DNS/mail record, the
`raystrat.com` domain, any file outside this worktree.

## Dependencies

none
