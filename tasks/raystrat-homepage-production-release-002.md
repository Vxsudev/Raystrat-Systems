# Task: Verify the homepage release candidate locally on Node 26

## Parent Spec
specs/raystrat-homepage-production-release.md

## Phase
phase-ui

## Status
done

## Layer
verification

## Description

Run the capability's declared verification suite against the real
working tree on Node 26 and Bash 4+, and report the results honestly.

1. Confirm `node -v` reports v26 and `bash --version` reports 4 or newer.
2. Run `yarn install --frozen-lockfile` (the install Vercel uses). It must
   succeed without modifying `yarn.lock`.
3. Run, in order, exactly the scripts declared in the spec's
   § Verification Scripts: `001-typecheck.sh`, `003-build.sh`,
   `004-invariants.sh` (all five invariants), 
   `011-raystrat-emergent-site-takeover.sh`,
   `013-raystrat-homepage-production-release.sh`.
4. If any script fails, treat it as a real signal. Fix the application
   only if the failure is caused by task 001; otherwise report it. Do not
   weaken an assertion, and do not modify `scripts/`, `tasks/` or `ai/`.
5. Do not submit the enquiry form, send any email, commit, push, merge,
   deploy or change any Vercel setting.

## Acceptance Criteria
- [ ] `yarn install --frozen-lockfile` succeeds on Node 26
- [ ] `001-typecheck.sh` passes
- [ ] `003-build.sh` passes
- [ ] `004-invariants.sh` passes (5/5)
- [ ] `011-raystrat-emergent-site-takeover.sh` passes under Bash 4+
- [ ] `013-raystrat-homepage-production-release.sh` passes
- [ ] No enquiry sent, no commit/push/deploy performed

## Files Likely Affected
- none expected (verification only)

## Blocked By
- tasks/raystrat-homepage-production-release-001.md
