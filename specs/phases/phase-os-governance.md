# Phase Specification — Engineering OS Governance Surface

Phase: phase-os-governance

## Scope

Engineering OS control-plane content authored by an adopting project
(not the vendored package itself): `ai/execution-orchestrator.md`,
`ai/coding-patterns.md`, `ai/runtime-contracts.md`, and narrowly-scoped
smoke tests proving the supervised execution pipeline functions. Not
application code — `app/`, `components/`, `lib/`, `styles/`, `public/`
remain governed by `phase-ui`.

## Boundaries

- No application-surface change of any kind under this phase.
- No mutation of `vendor/**` — the vendored package is out of scope for
  any individual capability.
- No new architectural policy invented beyond what already-verified
  application behaviour supports.
- Any marker or scratch artifact created under this phase must live at an
  explicitly named path, never inferred or globbed.

## Verification Surfaces

- A capability-specific wrapper under `scripts/verification/`, narrowly
  asserting only what that capability's marker/artifact requires.
