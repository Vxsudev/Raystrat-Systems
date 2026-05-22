# Task: Write verification script 017 — homepage PDF exact-match

## Parent Spec
specs/homepage-pdf-exact-match.md

## Phase
phase-visual-system

## Status
done

## Layer
verification

## Description
Author `scripts/verification/017-homepage-pdf-exact-match.sh` following the
project's verification script conventions (see 016 for pattern).

The script must verify:
- Header nav contains: Systems, Governance, Evidence, Bytes, "Book Audit"
- Footer has three columns: SYSTEMS, ENGAGE, LEGAL
- Footer bottom bar contains "STATUS · ALL SYSTEMS NOMINAL"
- Hero status panel: "DEPLOYED.SYSTEMS · PROD" header, "GOVERNED" and "WATCH" pill text
- FailureThesis: `⏵ GOVERNED` pill text, `SCHEMATIC.V1` footer label
- Services: "THE SOLUTION" eyebrow, "SYS-01" notation, "VIEW SYSTEM" link text
- Governance: "GOVERNANCE LAYER" eyebrow, "01 / 06" label format, dark audit ticker present
- Industries: "HIGH-ACCOUNTABILITY ENVIRONMENTS", "SEG-01" notation
- Results: "OPERATIONAL EVIDENCE", metric values "2–5×", "+10–25%", "30–60", "~56"
- FailureModeRegistry component: FM-001 through FM-006 IDs present
- Contact: "THE FIRST MOVE", "Book 30-min Audit", OUT-01/02/03 IDs, no ContactForm import
- ByteOfTheWeek: "BYTE · B-" prefix present, "OPERATIONAL INTELLIGENCE" in preview card
- FAQ: "Operational questions, answered." heading, "Q.01" notation
- page.tsx: FailureModeRegistry imported and rendered, AgentAdvantage NOT rendered
- Anti-theater: none of the banned patterns in any modified file
- TypeScript: `npm run typecheck` exits 0
- Prior regression: scripts 010-016 all pass

Run from repo root: `bash scripts/verification/017-homepage-pdf-exact-match.sh`
Exit 0 = all pass. Exit 1 = any failure.

## Acceptance Criteria
- [ ] Script exists at `scripts/verification/017-homepage-pdf-exact-match.sh`
- [ ] Script is executable (`chmod +x`)
- [ ] Script passes after task-001 implementation completes
- [ ] Prior regression suite 010-016 invoked and passes

## Files Likely Affected
- `scripts/verification/017-homepage-pdf-exact-match.sh` (new)

## Blocked By
- tasks/homepage-pdf-exact-match-001.md
