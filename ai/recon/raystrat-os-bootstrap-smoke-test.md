# RECON — raystrat-os-bootstrap-smoke-test

Capability: prove the repaired Engineering OS control docs let a
supervised worker execute, without leaking outside this worktree.
Date: 2026-09-06
Directive: operator's "APPROVED — ENGINEERING OS REPAIR ONLY" (2026-09-06),
§3 "Prove the repair."
State target: RECON_READY

## 1. Purpose

`raystrat-emergent-site-takeover` task 001's supervised worker refused to
act because `ai/execution-orchestrator.md`, `ai/coding-patterns.md`, and
`ai/runtime-contracts.md` did not exist in this worktree (full diagnosis:
`ai/incidents/2026-09-05-execution-gate-diagnosis.md`). Those three files
now exist (`ai/incidents/2026-09-06-control-doc-repair.md`). This
capability is the proof that the repair actually restores supervised
execution — a real worker, given a real (if trivial) task, actually
executing — and that it does so without writing anything outside this
worktree, checked by full filesystem sweep of the original checkout, not
`git status` alone.

## 2. Why this is its own capability, not folded into the repair

The operator's authorisation explicitly separates authoring the control
docs (direct edit, authorised) from proving they work (must go through
the real, supervised pipeline) — the two are different claims and must
not be conflated the way task 001's implementation and its verification
were conflated before.

## 3. What this capability does and does not touch

**Does**: creates exactly one new file, at a path named in the task
description before any worker runs, containing a fixed marker string.

**Does not**: touch `app/`, `components/`, `lib/`, `styles/`, `package.json`,
any invariant, any verification script other than its own new one, the
`raystrat-emergent-site-takeover` capability's own state (left at
`RELEASE_APPROVED`, untouched), or anything outside this worktree.

## 4. Isolation proof method

A full path+mtime+size manifest of the entire original checkout
(excluding `.git` internals, including every ignored and untracked file)
was captured before this capability's execution and stored outside the
checkout, at `ai/smoke-test/evidence/original-checkout-BEFORE.manifest`.
An identical sweep will be taken after, and diffed — catching additions,
deletions, and modifications `git status` would miss entirely for
ignored/untracked paths.

STATUS: RECON COMPLETE — ready for spec lock.
