#!/usr/bin/env bash
# 017-homepage-pdf-exact-match.sh — SUPERSEDED by decosplay pass (spec rhythm-lab-decosplay.md)
#
# The PDF exact-match design (DEPLOYED.SYSTEMS·PROD hero chrome, GOVERNED/WATCH pills,
# SYS-XX/SEG-XX flat-slab cards, Operational Evidence metrics, standalone Failure Mode
# Registry, BYTE·B-XX metadata sidecard, ALL SYSTEMS NOMINAL footer) was detheatricalized
# (spec 018) and then removed/reverted by the de-cosplay / de-hype reduction pass.
# The live contract for the homepage is scripts/verification/019-rhythm-lab-decosplay.sh.
#
# This script is retained as an ANTI-REGRESSION GUARD: it asserts the pdf-exact-match
# runtime-theater layer does NOT return.

set -uo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
cd "${REPO_ROOT}"

PASS=0
FAIL=0
ok()   { echo "  PASS: $1"; PASS=$((PASS + 1)); }
fail() { echo "  FAIL: $1"; FAIL=$((FAIL + 1)); }
absent() { grep -rEq -- "$1" "$2" 2>/dev/null && fail "$3" || ok "$3"; }
gone() { [ ! -e "$1" ] && ok "$2" || fail "$2"; }

echo "017-homepage-pdf-exact-match: SUPERSEDED — anti-regression guard"
echo ""

# pdf-exact-match runtime theater must not return
absent 'DEPLOYED\.SYSTEMS'   src/components/sections/hero.tsx        "hero DEPLOYED.SYSTEMS chrome stays removed"
absent 'GOVERNED|WATCH'      src/components/sections/hero.tsx        "hero GOVERNED/WATCH status pills stay removed"
absent '720h|733h|746h'      src/components/sections/hero.tsx        "hero fictional uptime hours stay removed"
absent 'ALL SYSTEMS NOMINAL' src/components/footer.tsx               "footer ALL SYSTEMS NOMINAL stays removed"
absent 'Audit Trail — Entry Format' src/components/sections/governance.tsx "governance audit-trail panel stays removed"
gone src/components/sections/results.tsx              "Operational Evidence section stays deleted"
gone src/components/sections/failure-mode-registry.tsx "Failure Mode Registry section stays deleted"
absent 'Operational Intelligence' src/components/sections/byte-of-the-week.tsx "bytes metadata sidecard stays removed"
absent '<Results|<FailureModeRegistry' src/app/page.tsx             "homepage does not mount deleted sections"

# Current homepage authority delegated to 019
if [ -f scripts/verification/019-rhythm-lab-decosplay.sh ]; then
  ok "current homepage contract delegated to 019-rhythm-lab-decosplay.sh"
else
  fail "019-rhythm-lab-decosplay.sh (current authority) missing"
fi

echo ""
TOTAL=$((PASS + FAIL))
echo "017-homepage-pdf-exact-match result: $PASS pass, $FAIL fail"
[ "$FAIL" -eq 0 ] && exit 0 || exit 1
