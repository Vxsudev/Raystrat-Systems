# Spec: Raystrat OS Bootstrap Smoke Test

## Status
approved

## Phase
phase-os-governance

## Capability

Prove that a supervised `execution-supervisor.sh` worker can now execute
inside the `feature/emergent-site-takeover` worktree — using the newly
authored `ai/execution-orchestrator.md`, `ai/coding-patterns.md`, and
`ai/runtime-contracts.md` — without writing anything outside this
worktree. One task, one file, one narrow verification check.

Directive authority: operator's "APPROVED — ENGINEERING OS REPAIR ONLY"
(2026-09-06), §3.

## Data Model Changes

none

## API Surface

none

## Frontend Surface

Not a frontend change — the OS's generic layer taxonomy has no "governance
smoke test" bucket, so this is declared under Frontend Surface as the
single implementation task, per this repo's established two-task pattern
(implementation + verification):

- `ai/smoke-test/marker.txt` — NEW. The worker creates exactly this file,
  at exactly this path, containing exactly this content (verbatim, no
  paraphrase, no additional lines):

  ```
  raystrat-os-bootstrap-smoke-test: supervised worker executed successfully in the isolated worktree.
  ```

  No other file may be created, modified, or deleted by this task. The
  path is absolute-from-worktree-root: `ai/smoke-test/marker.txt`. If this
  exact path cannot be written for any reason, the worker must stop and
  report why, not choose an alternate path.

## Verification Scripts

- 012-os-bootstrap-smoke-test.sh (NEW — the only script this capability
  runs; 001/002/003/004/011 are deliberately not re-run, since nothing
  they check is affected by this capability)

## Locked Constraints (INVARIANT — violation fails the capability)

1. Exactly one file created: `ai/smoke-test/marker.txt`, exact content as
   specified above.
2. No file outside `ai/smoke-test/` is touched.
3. No file outside this worktree (`/Users/vasudevarao/raystrat-emergent-
   site-takeover`) is touched — proved by an external full-filesystem
   before/after sweep of the original checkout, not by this capability's
   own verification script (which can only see inside the worktree it
   runs in).
4. No commit, push, deploy, email, or DNS change.
5. `raystrat-emergent-site-takeover`'s own state (`RELEASE_APPROVED`) is
   not reset, reopened, or otherwise modified by this capability.

## Mutation Boundary

MAY modify: `ai/smoke-test/marker.txt` (new), this capability's own recon/
spec/tasks/verification-script/journal/state-registry artifacts.

MUST NOT modify: anything under `app/`, `components/`, `lib/`, `styles/`,
`package.json`, any `.engineering-os/invariants/*.sh`, any other
`scripts/verification/*.sh`, `vendor/**`, `.vercel/**`, `.git/hooks/**`,
the original checkout, or `raystrat-emergent-site-takeover`'s recorded
state.

## Dependencies

none
