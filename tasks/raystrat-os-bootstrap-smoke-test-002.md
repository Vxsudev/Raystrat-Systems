# Task: Verify the smoke-test marker

## Parent Spec
specs/raystrat-os-bootstrap-smoke-test.md

## Phase
phase-os-governance

## Status
done

## Layer
verification

## Description

Run exactly `scripts/verification/012-os-bootstrap-smoke-test.sh` (the
only script this capability declares) and confirm it passes. Do not run
001/002/003/004/011 — nothing they check is affected by this capability.
Do not modify anything to make it pass; if it fails, report why.

## Acceptance Criteria
- [ ] `012-os-bootstrap-smoke-test.sh` passes (marker exists, content
      exact, no other file under `ai/smoke-test/`)

## Files Likely Affected
- none expected

## Blocked By
- tasks/raystrat-os-bootstrap-smoke-test-001.md
