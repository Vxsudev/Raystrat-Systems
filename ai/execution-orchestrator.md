# Execution Orchestrator — pointer

This project is OS-ENABLED (vendored adapter, not OS-NATIVE) — the
authoritative execution-lifecycle doctrine lives in the vendored package,
not duplicated here:

`vendor/engineering-os/core-docs/execution-orchestrator.md`

Read that file for the task lifecycle (pending → in-progress → done),
dependency verification, and error-condition handling that
`scripts/execution-supervisor.sh` implements. This stub exists only so
that worker dispatch prompts referencing `ai/execution-orchestrator.md`
resolve to a real file — a project-level convention gap that blocked
`raystrat-emergent-site-takeover` task 001's supervised execution entirely
(see `ai/incidents/2026-09-05-execution-gate-diagnosis.md` and
`ai/incidents/2026-09-06-control-doc-repair.md`). `vendor/**` is out of
scope for individual capability mutation boundaries, so this redirect is
the fix rather than editing the vendored prompt.

This file was never committed to this repository's history at any point —
`git show a28cc84:ai/execution-orchestrator.md` confirms no prior version
ever existed. It previously existed only as an uncommitted convenience
copy in the original checkout, created by an earlier session that hit the
same gap. This copy exists only in the `feature/emergent-site-takeover`
worktree, authored directly (not through supervised execution — see the
governance note below) under explicit operator authorisation dated
2026-09-06, on the reasoning that the file's own absence is precisely what
prevents supervised execution from running at all.
