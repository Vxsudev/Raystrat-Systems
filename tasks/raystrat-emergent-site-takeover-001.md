# Task: Replace the Node 1 3D/GSAP website with the approved Emergent build

## Parent Spec
specs/raystrat-emergent-site-takeover.md

## Phase
phase-ui

## Status
done

## Layer
frontend

## Description

Implement the full replacement described in `specs/raystrat-emergent-site-
takeover.md` (Frontend Surface section) and `ai/recon/raystrat-emergent-
site-takeover.md` (§5–§9 for exact mapping and reasoning). Do not
reinterpret copy, layout, or CSS — this is an import + adapt task, not a
design task.

**Source of truth**: `/Users/vasudevarao/Desktop/raystrat-systems-handoff-
c5724273.zip` (SHA-256 `c572427383f69d69b24d41943e02ff4e4ddaf8c54301e5bb0e
18693e89b37ab2` — already independently verified; re-verify before use).
Extract it to a fresh temp directory before copying from it. Its
application root is `frontend/`.

**1. Delete the old committed Node 1 app surface** (exact list, recon §6):
`app/page.tsx`, `app/layout.tsx`, `components/hero/**` (6 files),
`components/sections/**` (11 files + `sections.module.css`), `lib/webgl.ts`,
`styles/globals.css` (remove the emptied `styles/` directory too).

**2. Copy the archive's `frontend/` content into the repo root** (merge,
do not nest under a `frontend/` subdirectory): `app/**` (including its own
internal `app/components/`, `app/lib/`, `app/enquiry/`, `app/ai-solutions/`,
`app/forward-deployed-engineering/` — preserve this internal structure
exactly as shipped, do not move `app/components`/`app/lib` to repo-root
`components`/`lib`), `package.json`, `yarn.lock` (replacing old
`package.json`; delete old `package-lock.json`), `tsconfig.json`,
`next-env.d.ts`, `middleware.ts`, `.env.example`.

**3. Fix the package manager's `start` script** — the archive's
`package.json` has `"start": "next dev -H 0.0.0.0 -p 3000"` (a real bug,
documented in the archive's own `HANDOFF.md` §1/§6). Change it to
`"start": "next start -H 0.0.0.0 -p 3000"`. Leave `dev`, `build`, `serve`
as supplied.

**4. Adapt the Python test suite for local use**: copy
`backend/tests/test_enquiry_api.py` to `backend/tests/test_enquiry_api.py`
in the repo root. Change its `BASE` default from the Emergent preview
hostname (`https://85edb4c8-b227-4af8-b48f-372f851d955e.preview
.emergentagent.com`) to `http://localhost:3000`, keeping the
`REACT_APP_BACKEND_URL` env-var override mechanism intact.

**5. Preserve historical reference material** (not application code, do
not wire into the app): copy `memory/PRD.md` to `memory/PRD.md` and
`test_reports/**` to `test_reports/**` in the repo root, matching the
archive's own relative layout.

**6. Recolour the four Next.js metadata-image generators** (recon §7 — the
archive does not ship these; the old ones hard-code the retired dark/copper
palette and tagline). Keep the exact same component structure/sizes/
`ImageResponse` usage as the current committed files, changing only:
  - `app/icon.tsx`, `app/apple-icon.tsx`: background `#0b0c0e` → `#0f0f0e`
    (the Emergent site's own `--ink`), letter colour `#b4703a` → `#2743d4`
    (its own `--accent`). Everything else (the "R" glyph, sizes, layout)
    unchanged.
  - `app/opengraph-image.tsx`, `app/twitter-image.tsx`: background
    `#0b0c0e` → `#0f0f0e`; the small eyebrow line changes from
    `FORWARD-DEPLOYED ENGINEERING` to `AI SOLUTIONS · FORWARD-DEPLOYED
    ENGINEERING` (the homepage's real hero eyebrow, `app/page.tsx`); the
    large headline changes from the retired `Raystrat will find the way
    forward.` to the homepage's real H1, `AI built on what your business
    knows.`; the accent bar colour `#b4703a` → `#2743d4`. Text colours
    `#9aa2ab`/`#edeae3` may stay if they still read correctly against the
    new background, or be adjusted minimally for contrast — use judgement,
    but do not add any new visual device beyond a straight recolour +
    real-copy swap.

**7. Retire INV-002 and update INV-003** (recon §8):
  - `mkdir -p .engineering-os/invariants/_legacy` and move
    `.engineering-os/invariants/INV-002-content-integrity.sh` there
    unchanged except a prepended comment: `# SUPERSEDED 2026-09-05 —
    raystrat-emergent-site-takeover replaced the Node 1 copy this
    invariant locked ("find the way forward"); no successor phrase exists
    in the new copy (distinct per-page headlines, not one repeated
    tagline). Retired, not deleted, per directive governance — moved out
    of .engineering-os/invariants/ so invariant-engine.sh's non-recursive
    *.sh glob no longer runs it.` above its existing header.
  - Edit `.engineering-os/invariants/INV-003-scope-integrity.sh`: replace
    the header comment (currently describing a "Node 1 landing page"
    allowlist) with one describing the Emergent 3-route scope, and change
    `local allow="api privacy terms deployments fieldwork company
    forward-deployed-engineering deploy"` to
    `local allow="ai-solutions forward-deployed-engineering enquiry
    components lib"`. Do not change the function logic, only the header
    comment and the `allow` value.

**8. Move the three superseded Node 1 verification wrappers** (recon §9):
`mkdir -p scripts/verification/_legacy` and move
`scripts/verification/005-raystrat-node-1-landing-experience.sh`,
`006-raystrat-node-1-compositional-refinement.sh`,
`007-raystrat-node-1-production-readiness.sh` there unchanged (they assert
facts — exact hero md5s, the retired tagline, old routes — about a website
this task deletes; `list_full_corpus()` already excludes `_legacy/`).

**9. Author `scripts/verification/011-raystrat-emergent-site-takeover.sh`**
(new — task 002/verification will run it, this task only writes it).
Mirror the structure of `005`/`006`/`007` (build must already exist in
`.next`, serve on an unused port, curl the rendered HTML, `trap` server
teardown) but assert facts true of the **new** site instead:
  - All three routes (`/`, `/ai-solutions`, `/forward-deployed-engineering`)
    return 200.
  - Real, distinctive copy present per route (e.g. "AI built on what your
    business knows." on `/`; "AI systems built around your operations." on
    `/ai-solutions`; "Engineers embedded in the work." on
    `/forward-deployed-engineering`).
  - `founder@raystratsystems.com` and the LinkedIn URL appear in the footer
    on every route; `vp@raystrat.com` never appears in any rendered HTML.
  - `GET /sitemap.xml` returns exactly the three production URLs, valid
    XML, no `#` fragments, no preview/localhost hostnames.
  - `GET /robots.txt` in non-production mode allows crawling and omits the
    sitemap reference (per `SITE_ENV` unset/`preview` behaviour).
  - `X-Robots-Tag: noindex, nofollow` header present on all three page
    routes in non-production mode.
  - `POST /enquiry/submit` with `ENQUIRY_DELIVERY_ENABLED` unset/false
    returns `503` with `reason: "not_configured"`.
  - No Emergent hostname (`emergentagent.com`) or `preview.emergentagent`
    string anywhere in any fetched response body.
  - No `app/*/` directory outside the INV-003 allowlist (route-scope spot
    check, same pattern as 005/006/007's own "Route scope" check).
  Exit 0 only if every check passes; otherwise print each failure and
  exit 1, matching the exact `pass`/`fail`/summary-line convention used by
  every other wrapper in this directory.

## Acceptance Criteria
- [ ] Old Node 1 app surface (step 1's exact list) no longer exists anywhere in the repo
- [ ] All three routes (`/`, `/ai-solutions`, `/forward-deployed-engineering`) exist with the archive's real content, unmodified copy
- [ ] `package.json`'s `start` script runs `next start`, not `next dev`
- [ ] `yarn.lock` present; `package-lock.json` absent
- [ ] `backend/tests/test_enquiry_api.py` defaults to `http://localhost:3000`
- [ ] `.engineering-os/invariants/INV-002-content-integrity.sh` exists only under `_legacy/`, with the superseded-note prepended
- [ ] `.engineering-os/invariants/INV-003-scope-integrity.sh` allowlist is exactly `ai-solutions forward-deployed-engineering enquiry components lib`
- [ ] `scripts/verification/005/006/007-*.sh` exist only under `scripts/verification/_legacy/`
- [ ] `scripts/verification/011-raystrat-emergent-site-takeover.sh` exists, is executable, and implements every check listed in step 9
- [ ] `vp@raystrat.com` does not appear in any file under `app/` or `components/`
- [ ] No file anywhere in the repo contains an Emergent preview hostname, except the adapted test file's own historical comment (if any) and `ai/`/`memory/`/`test_reports/` reference material

## Files Likely Affected
- `app/**` (full replacement)
- `components/hero/**`, `components/sections/**`, `lib/webgl.ts`, `styles/**` (deleted)
- `package.json`, `yarn.lock` (new), `package-lock.json` (deleted), `tsconfig.json`, `next-env.d.ts`, `middleware.ts`, `.env.example`
- `backend/tests/test_enquiry_api.py`, `memory/PRD.md`, `test_reports/**` (new)
- `.engineering-os/invariants/INV-002-content-integrity.sh` (relocated), `INV-003-scope-integrity.sh` (edited)
- `scripts/verification/005/006/007-*.sh` (relocated), `011-raystrat-emergent-site-takeover.sh` (new)

## Blocked By
- none
