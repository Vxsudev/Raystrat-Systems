# Task: Verify the Emergent site replacement locally

## Parent Spec
specs/raystrat-emergent-site-takeover.md

## Phase
phase-ui

## Status
done

## Layer
verification

## Description

Run the capability's declared verification suite and confirm it passes
against the real, replaced application — genuine verification, not a
restatement of task 001's acceptance criteria.

1. `yarn install` at the repo root (package manager switched to yarn —
   spec §Portability Requirements; do not run `npm install`, it would
   resolve a different dependency tree against `yarn.lock`).
2. Run, in order, exactly the scripts declared in
   `specs/raystrat-emergent-site-takeover.md` § Verification Scripts:
   `001-typecheck.sh`, `002-lint.sh` (expected SKIP, not a failure),
   `003-build.sh`, `004-invariants.sh`,
   `011-raystrat-emergent-site-takeover.sh`. Do not run `005`/`006`/`007`
   — they were relocated to `_legacy/` by task 001 because they assert
   facts about the website this capability replaced.
3. If `004-invariants.sh` fails, check whether it is because
   `.engineering-os/invariants/INV-003-scope-integrity.sh`'s allowlist or
   `INV-002`'s relocation from task 001 is incomplete or incorrect — fix
   the invariant file, not the application, unless the application itself
   is genuinely out of scope.
4. If `011-*.sh` fails, treat it as real signal: either the copied
   application doesn't yet match the archive/spec, or the new wrapper
   itself has a bug (e.g. wrong port, wrong string). Fix whichever is
   actually wrong — do not weaken an assertion to make it pass without a
   documented reason.
5. Additionally start the dev server (`yarn dev`) and, with it running,
   run `pytest backend/tests/test_enquiry_api.py` (installing `pytest`
   and `requests` into a local virtualenv first if not already available
   — do not install them globally). Record the pass/fail count; a failure
   here is not necessarily a capability-blocking failure (HANDOFF.md notes
   the rate-limit test trips the shared in-memory limiter — restart the
   dev server before re-running if that happens), but must be reported
   honestly either way.
6. Do not commit, push, or deploy anything. Do not set any real
   `RESEND_API_KEY`/`ENQUIRY_FROM_EMAIL`/`ENQUIRY_TO_EMAIL` value or send
   a real email. `ENQUIRY_DELIVERY_ENABLED` must remain unset/`false`
   throughout.

## Acceptance Criteria
- [ ] `001-typecheck.sh` passes
- [ ] `003-build.sh` passes (production build succeeds)
- [ ] `004-invariants.sh` passes (5/5, with INV-002 absent from the active set and INV-003's new allowlist)
- [ ] `011-raystrat-emergent-site-takeover.sh` passes
- [ ] `pytest backend/tests/test_enquiry_api.py` run against the local dev server, with results reported honestly (pass count, and the reason for any failure)
- [ ] No email sent, no credential entered, no commit/push/deploy performed

## Files Likely Affected
- none expected (verification only); may touch `scripts/verification/011-*.sh` or the two edited invariant files if step 3/4 finds a genuine bug introduced by task 001

## Blocked By
- tasks/raystrat-emergent-site-takeover-001.md
