# Task: Write verification script 016 — homepage design V2

## Parent Spec
specs/homepage-design-v2.md

## Phase
phase-visual-system

## Status
done

## Layer
verification

## Description
Author `scripts/verification/016-homepage-design-v2.sh` following the project's
verification script conventions (see scripts/verification/015-*.sh for pattern).

The script must verify:
- All 9 new/augmented component files exist
- SystemPulse: renders clock, uses useEffect, has 'UTC'
- HeroStatusPanel: uses useState/useMemo, has pill classes, 5-system rows
- HeroMetaRow: 4 stat values present (147, 12.4M, 99.94, 2.3)
- ChokeDiagram SVG: useState activeId, SVG element, cx/cy coords present
- AuditTicker: setInterval with 2400, rotating entries, 4-col grid
- FailureModeRegistry: 6 FM rows, sev badge classes (crit/high/med)
- AuditCTA: OUT-01, OUT-02, OUT-03 deliverable card IDs present
- FAQ: grid-template-rows transition, min-h-0, useState openIndex
- TweaksPanel: mode-ledger, mode-editorial, mode-blueprint body classes
- globals.css: mode-editorial and mode-blueprint override rules present
- Anti-theater: banned patterns absent from all new component files
- TypeScript: `npm run typecheck` exits 0
- Build: `npm run build` exits 0
- Prior regression: all checks 001-015 pass

Run from repo root: `bash scripts/verification/016-homepage-design-v2.sh`
Exit 0 = all pass. Exit 1 = any failure.

## Acceptance Criteria
- [ ] Script exists at `scripts/verification/016-homepage-design-v2.sh`
- [ ] Script is executable (`chmod +x`)
- [ ] Script passes after task-001 implementation completes
- [ ] Prior regression suite 001-015 invoked and passes

## Files Likely Affected
- `scripts/verification/016-homepage-design-v2.sh` (new)

## Blocked By
- tasks/homepage-design-v2-001.md
