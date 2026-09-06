# Task: Create the smoke-test marker file

## Parent Spec
specs/raystrat-os-bootstrap-smoke-test.md

## Phase
phase-os-governance

## Status
done

## Layer
frontend

## Description

This is a smoke test proving supervised execution works now that
`ai/execution-orchestrator.md`, `ai/coding-patterns.md`, and
`ai/runtime-contracts.md` exist. Read them first — that you can read them
without hitting a missing-file wall is itself part of what this task
proves.

Then do exactly this, and nothing else:

Create the file `ai/smoke-test/marker.txt` (relative to the repository
root you are running in — this worktree), containing exactly this one
line, verbatim, no extra whitespace, no trailing content beyond a single
newline:

```
raystrat-os-bootstrap-smoke-test: supervised worker executed successfully in the isolated worktree.
```

Do not create, modify, or delete any other file. Do not touch `app/`,
`components/`, `lib/`, `styles/`, `package.json`, any invariant file, any
other verification script, or anything outside this worktree's own
directory tree. If you cannot write to exactly this path for any reason,
stop and report why rather than choosing a different path.

## Acceptance Criteria
- [ ] `ai/smoke-test/marker.txt` exists with exactly the specified content
- [ ] No other file was created, modified, or deleted

## Files Likely Affected
- `ai/smoke-test/marker.txt` (new — the only file this task may touch)

## Blocked By
- none
