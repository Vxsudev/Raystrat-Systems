# Task: Author verification gate 018-rhythm-lab-detheatricalization.sh

## Parent Spec
specs/rhythm-lab-detheatricalization.md

## Phase
phase-visual-system

## Status
pending

## Layer
verification

## Description
Implement the verification gate defined in Task 9 of the parent spec. The script enforces:
- absence of fictional-runtime semantics (LIVE, tail -f, /var/log/, ALL SYSTEMS NOMINAL, DEPLOYED.SYSTEMS, V4.2.1, BUILD-2026, system-pulse-dot, audit-row-anim, setInterval in governance, heroMeta, HeroStatusPanel, HeroMetaRow, STATUS_ROWS, ⏵ GOVERNED pill, dashboard color treatments in sections)
- absence of `src/components/ui/system-pulse.tsx` (file deleted)
- absence of `new Date(` in governance.tsx (no real-time clocks)
- preservation of section arc (10 sections in order), 5 diagram files, asymmetric hero layout, monochrome SCHEMATIC labels, footer copyright cleanliness, TweaksPanel gating, --primary / --structure tokens

Implementation must follow the existing pattern in `scripts/verification/017-homepage-pdf-exact-match.sh`: PASS/FAIL counters, per-check `[OK]`/`[FAIL]` output, final `PASS X/Y` summary, exit non-zero on any failure.

## Acceptance Criteria
- [ ] Script exists at `scripts/verification/018-rhythm-lab-detheatricalization.sh` and is executable
- [ ] All 32 checks from spec §Task 9 are implemented
- [ ] Script passes on green; fails non-zero on any check failure
- [ ] Regression scripts 004–017 continue to pass after implementation tasks 1–8 ship

## Files Likely Affected
- `scripts/verification/018-rhythm-lab-detheatricalization.sh` (new)

Implementation tasks (1–8 in the spec) touch:
- `src/components/header.tsx`
- `src/components/ui/system-pulse.tsx` (delete)
- `src/app/globals.css`
- `src/components/footer.tsx`
- `src/components/sections/hero.tsx`
- `src/data/content.ts`
- `src/components/sections/governance.tsx`
- `src/components/sections/failure-mode-registry.tsx`
- `src/app/page.tsx`
- `src/components/sections/failure-thesis.tsx`
- `src/components/sections/results.tsx`

## Blocked By
- none
