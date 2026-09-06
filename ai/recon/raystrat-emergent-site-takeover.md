# RECON — raystrat-emergent-site-takeover

Capability: Governed website replacement — retire the Node 1 (3D/GSAP) site,
install the approved Emergent build as the new canonical website.
Date: 2026-09-05
Directive: RAYSTRAT SYSTEMS — GOVERNED WEBSITE REPLACEMENT (2026-09-05)
Predecessor: Node 1 (3 capabilities, `RELEASE_APPROVED`, committed at `main`
HEAD `baf6731`). Node 2 (2 capabilities) and Node 3 (1 capability), all
`RELEASE_APPROVED`, exist only as **uncommitted** working-tree changes in the
original checkout — not present at `main` HEAD, therefore not present in this
capability's worktree, and untouched by this capability.
State target: RECON_READY

---

## 1. Baseline recorded (original checkout, untouched)

- Branch `main` at `baf6731`, 2 commits ahead of `origin/main` (unpushed).
- Working tree carried substantial uncommitted/untracked Node 2/Node 3 work
  (specs, tasks, evidence, `app/company` `/deployments` `/fieldwork`
  `/forward-deployed-engineering`, `components/node2`, `components/node3`,
  `src/`). None of this is committed, so none of it exists at the commit this
  capability's worktree is based on. Left entirely alone.
- One other live process had this repository open: confirmed via the
  background daemon's own `spawned-by` metadata to be this session's
  spawning parent (interactive terminal), not an independent agent. VS Code
  had the repo open as an editor only. No conflicting concurrent-agent
  session found (same due-diligence pattern as the Node 3 reconciliation
  incident record).
- Engineering OS self-test (`vendor/engineering-os/tests/run-self-tests.sh`)
  was run once from the original checkout during setup verification and its
  CLI-wrapper test (V13, `intent`) left a stray `updated_at` timestamp bump
  on the real `ai/state_registry.json`'s `pipeline-test` fixture entry (state
  field itself unchanged, no spec/task files left behind). Identified via
  `git diff` against a pre-recon snapshot and reverted immediately, byte-for-
  byte, before any further work. Self-test suite is not re-run against the
  original checkout again for this reason; `os-boot-check.sh` (read-only)
  is used there instead. Running the self-test suite again inside this
  worktree is safe — worktrees have independent working trees, so it cannot
  touch the original checkout.

## 2. Archive verification

`/Users/vasudevarao/Desktop/raystrat-systems-handoff-c5724273.zip` — SHA-256
independently computed and matched the directive's expected hash exactly
(`c572427383f69d69b24d41943e02ff4e4ddaf8c54301e5bb0e18693e89b37ab2`).
Listed via `unzip -l` before extraction; extracted to an isolated staging
directory outside both the original checkout and this worktree. Contents:
`HANDOFF.md`, `frontend/` (Next.js 15 App Router app — the only application
code in the archive), `backend/tests/` (pytest suite only, no service),
`memory/PRD.md` (Emergent platform decision record), `test_reports/` (QA
evidence). No `.git`. No Emergent hostnames or branding anywhere in
`frontend/` source — confirmed by full-tree grep; the only occurrences of
the preview hostname are in `HANDOFF.md`, `backend/tests/test_enquiry_api.py`
(default `BASE` fallback) and `test_reports/pytest/enquiry_results.xml`
(all non-shipped, non-production files).

`HANDOFF.md` read in full and cross-checked line-by-line against the actual
`frontend/` source (every claim verified against real files, not taken on
faith): routes, `/enquiry/submit` server logic, rate limiter, spam gate,
Resend delivery contract, disabled-delivery gate, sitemap/robots/middleware/
canonical behaviour, and the `yarn start` → `next dev` bug all confirmed
present exactly as described.

## 3. Private-address flag (directive §8)

`vp@raystrat.com` (the private enquiry recipient) appears in three
non-production files carried over from the archive: `backend/tests/
test_enquiry_api.py` (asserts it never leaks into rendered HTML),
`memory/PRD.md` (decision record), and `test_reports/iteration_5.json` (QA
evidence). It does **not** appear anywhere in `frontend/` application source
— `ContactForm.tsx`, `SiteFooter.tsx` and `route.ts` all read it exclusively
from `process.env.ENQUIRY_TO_EMAIL` server-side. `.env.example`'s
`ENQUIRY_TO_EMAIL` value is a generic placeholder, not the real address.
Flagged per directive instruction; not redacted — these files are not being
published, and the test file's own assertion (`vp@raystrat.com` not in
HTML) is a genuine, useful regression guard worth keeping. Whoever
eventually commits/publishes this repository should decide whether test
fixtures containing the real private address belong in git history.

## 4. Committed baseline this worktree actually starts from

`main` HEAD (`baf6731`) commits only the Node 1 3D/GSAP homepage — no
Node 2/3 route directories exist there. Committed application surface:
`app/{page,layout,icon,apple-icon,opengraph-image,twitter-image}.tsx`,
`components/hero/**` (6 files, WebGL/R3F), `components/sections/**` (11
files + CSS module, GSAP `ScrollReveal`), `lib/webgl.ts`, `styles/
globals.css`, `package.json`/`package-lock.json` (three/@react-three/gsap
dependencies). This is the entire "previous 3D website and Node-based
design direction" the directive supersedes — confirmed via `git ls-tree` of
the actual committed tree, not assumed from the messy working directory.

`specs/phases/phase-ui.md` is committed and covers this surface
(`app/ components/ lib/ styles/ public/`) — reused as this capability's
Phase tag; not edited (its "Scope" prose mentions Three.js/GSAP as
technologies in use, now stale, but it gates nothing content-specific and
changing a shared phase file has a blast radius beyond this capability).

## 5. Source → destination mapping

Archive root is `frontend/`; established project root convention (already
used by the retiring Node 1 code) is repo-root `app/`, `components/`,
`lib/`, `styles/`, `package.json`. Per directive §6 ("prefer retaining the
established root"), `frontend/` is merged into the repo root — not nested.
Internal structure of the Emergent app (`app/components/`, `app/lib/`,
under `app/` rather than repo-root) is preserved exactly as shipped —
refactoring the app's own internal layout to match the old repo's
convention would be an unrequested structural change with import-path risk
for no benefit, and risks exactly the "stitched together" outcome the
directive forbids.

| Archive path | Destination |
| --- | --- |
| `frontend/app/**` | `app/**` (replaces old `app/`) |
| `frontend/package.json`, `frontend/yarn.lock` | repo root (replaces old `package.json`/`package-lock.json` — package manager switches to yarn, matching HANDOFF.md's explicit warning that npm resolves a different tree) |
| `frontend/tsconfig.json`, `frontend/next-env.d.ts` | repo root (replace old) |
| `frontend/middleware.ts` | repo root (new) |
| `frontend/.env.example` | repo root (replaces old — old repo has no `.env.example` committed) |
| `backend/tests/test_enquiry_api.py` | `backend/tests/test_enquiry_api.py` (new — default `BASE` adapted from the Emergent preview hostname to `http://localhost:3000`, per directive's "adapted to localhost" instruction) |
| `memory/PRD.md` | `memory/PRD.md` (preserved as historical reference — HANDOFF.md's own description: "a useful record of decisions and copy history") |
| `test_reports/*` | `test_reports/*` (preserved as historical QA evidence, not current proof — directive §10) |
| `HANDOFF.md` | not copied into the app surface; already fully read and its substance captured in this recon and the spec |

Old `styles/` directory is dropped entirely (Emergent puts `globals.css`
inside `app/`, matching its own convention).

## 6. Deletions (old Node 1 3D/GSAP surface, exact list)

- `components/hero/AlignmentField.tsx`, `HeroCanvas.tsx`, `HeroFallback.tsx`,
  `fallback.module.css`, `hero.module.css`, and `components/hero/Hero.tsx`
- `components/sections/Condition.tsx`, `DeploymentSurface.tsx`,
  `Fieldwork.tsx`, `FinalAction.tsx`, `Footer.tsx`,
  `ForwardDeployedEngineering.tsx`, `ForwardSpine.tsx`, `Intervention.tsx`,
  `Outcome.tsx`, `OwnershipGap.tsx`, `ScrollReveal.tsx`, `SectionShell.tsx`,
  `sections.module.css`
- `lib/webgl.ts`
- `styles/globals.css` (and the now-empty `styles/` directory)
- `app/page.tsx`, `app/layout.tsx` (replaced by the Emergent equivalents)

## 7. Icon / social-card metadata — disclosed judgment call

The archive does not include favicon or OG/Twitter-image generators (not
mentioned anywhere in HANDOFF.md). The old, committed
`app/{icon,apple-icon,opengraph-image,twitter-image}.tsx` are simple
`next/og` `ImageResponse` generators, but hard-code the **old** Node design
system's dark/copper palette (`#0b0c0e`/`#b4703a`/`#edeae3`) and the old,
retired tagline ("Raystrat will find the way forward") — both gone with
this replacement. Dropping them entirely would ship a broken/default
favicon and no social-card image; keeping them unchanged would ship a
favicon and share-card that visually contradict the new white/blue-accent
site. Judgment call, disclosed rather than silently made: kept the exact
same minimal wordmark structure and sizes, recoloured to the Emergent
site's own real tokens (`--ink #0f0f0e` / `--accent #2743d4`), and for the
OG/Twitter cards swapped the retired tagline for the homepage's own real,
already-approved eyebrow/H1 copy ("AI Solutions · Forward-Deployed
Engineering" / "AI built on what your business knows.") — no invented copy,
no new design device, purely a mechanical palette/content-source swap so
the metadata routes match the site actually being shipped. Flagged for
operator override if a different treatment (e.g. dropping them entirely) is
preferred.

## 8. Invariant classification (directive §6 — retain / replace / supersede)

- **INV-001 (positioning: "forward-deployed" present)** — retained
  unchanged. The Emergent copy uses "forward-deployed" throughout
  (`/forward-deployed-engineering`, nav, footer copyright line); still
  passes against the new content.
- **INV-002 (content: "find the way forward" locked)** — **superseded**.
  This was a Node-1-specific copy lock; the phrase does not exist anywhere
  in the Emergent copy, which uses distinct per-page headlines rather than
  one repeated tagline, so there is no successor phrase to lock without
  inventing new copy (forbidden by directive §2). Moved to
  `.engineering-os/invariants/_legacy/` (mirrors the existing
  `scripts/verification/_legacy/` convention for retired checks; the
  invariant engine's file discovery is a non-recursive `*.sh` glob, so this
  reliably removes it from the active gate while preserving the file as
  historical governance evidence).
- **INV-003 (scope: route allowlist)** — **updated in place**. Old allowlist
  (`api privacy terms deployments fieldwork company forward-deployed-
  engineering deploy`) reflected the old site's placeholder routes, none of
  which are committed at this worktree's baseline anyway. New allowlist
  reflects the Emergent app's actual `app/*/` subdirectories: `ai-solutions
  forward-deployed-engineering enquiry components lib` (the last two are
  the Emergent app's own internal `app/components/` and `app/lib/`
  directories, not route directories, but the check does not distinguish —
  they must be allow-listed or every build would trip scope integrity).
- **INV-004 (no fabricated evidence)** — retained unchanged; Emergent copy
  has no testimonials/case studies/metrics, confirmed by direct read.
- **INV-005 (secret hygiene)** — retained unchanged; `.env.example` is a
  template, no real secret introduced.
- **INV-006 (Vercel deployment safety)** — retained unchanged; `.vercel/`
  linkage not touched by this capability.

## 9. Verification classification

- **001-typecheck.sh, 003-build.sh, 004-invariants.sh** — retained
  unchanged (framework-agnostic wrappers; `003` runs `npm run build`, which
  works regardless of whether `node_modules` was populated by npm or yarn).
- **002-lint.sh** — retained unchanged (already a documented SKIP, no
  linter configured, pre-existing condition, not something this capability
  introduces or fixes).
- **005/006/007 (Node 1 landing / compositional-refinement / production-
  readiness)** — **superseded**. All three assert exact md5 hashes of the
  deleted hero files, the retired "find the way forward" substrate, and
  routes/anchors that no longer exist. Moved to `scripts/verification/
  _legacy/` (the OS's own existing convention for retired wrappers —
  `list_full_corpus()` already excludes that path). Not deleted — preserved
  as historical governance evidence per directive §6.
- **011-raystrat-emergent-site-takeover.sh** — new wrapper (continues the
  numeric sequence from Node 3's `010`, rather than reusing a vacated number,
  to keep the audit trail unambiguous) — asserts the three real routes
  render, the enquiry endpoint's documented response contract, sitemap/
  robots/canonical correctness, no Emergent hostname/branding in output, and
  the disabled-delivery gate's honest copy.

## 10. Portability findings

- `package.json`'s `"start"` script is `next dev -H 0.0.0.0 -p 3000` —
  confirmed exactly as HANDOFF.md warned. Fixed to `next start -H 0.0.0.0
  -p 3000` before any production-mode verification.
  Node/npm/yarn all present locally (`node v26.3.1`, `npm 11.16.0`, `yarn
  1.22.22`) — yarn install is viable, no missing toolchain.
- `/enquiry/submit` kept as-is (directive default; no demonstrated technical
  reason to move it found during this recon — the Emergent-ingress
  constraint that put it there doesn't apply locally/on Vercel, but moving
  it isn't required either).
- `ENQUIRY_DELIVERY_ENABLED` stays `false`; no credentials entered, no send
  attempted, per directive §8 and §12.

## 11. Proposed mutation boundary

**MAY modify:** `app/**` (full replacement), `components/**` at repo root
(deletion only — old Node 1 hero/sections), `lib/webgl.ts` (deletion),
`styles/**` (deletion), `package.json`, `package-lock.json` (removed),
`yarn.lock` (new), `tsconfig.json`, `next-env.d.ts`, `middleware.ts` (new),
`.env.example`, `backend/tests/test_enquiry_api.py` (new, adapted),
`memory/PRD.md` (new), `test_reports/**` (new),
`.engineering-os/invariants/INV-002-*.sh` (relocated to `_legacy/`),
`.engineering-os/invariants/INV-003-*.sh` (allowlist updated),
`scripts/verification/005-007-*.sh` (relocated to `_legacy/`),
`scripts/verification/011-*.sh` (new), recon/spec/tasks/journal/state-
registry artifacts.

**MUST NOT modify:** `vendor/**`, OS `scripts/` runtime, `.vercel/**`,
`.git/hooks/**`, `specs/phases/phase-ui.md`, any file outside this
worktree (the original checkout stays untouched), any DNS/mail record,
`raystrat.com` domain configuration.

STATUS: RECON COMPLETE — ready for spec lock.
