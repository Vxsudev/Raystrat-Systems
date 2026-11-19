#!/usr/bin/env bash
# 013 — Feature verification: raystrat-homepage-production-release
#
# Asserts the repository declares the Node.js 26.x runtime Vercel requires,
# and that the prerendered homepage keeps the operator-approved copy
# constraints (no stage labels / "proof of concept" / "with quality gates";
# the laboratory line verbatim) with both secondary pages still built.
# Assumes 003-build has produced .next (scripts run in numeric order).

set -u
FAIL=0

pass() { echo "  PASS  $1"; }
fail() { echo "  FAIL  $1"; FAIL=1; }

echo "R1. Runtime declaration"
ENGINES=$(node -p "(require('./package.json').engines || {}).node || ''")
[ "$ENGINES" = "26.x" ] && pass "package.json engines.node is 26.x" || fail "package.json engines.node is '$ENGINES', expected 26.x"
NODE_MAJOR=$(node -p "process.versions.node.split('.')[0]")
[ "$NODE_MAJOR" = "26" ] && pass "local build ran on Node $NODE_MAJOR" || fail "local Node major is $NODE_MAJOR, expected 26"

HOME_HTML=".next/server/app/index.html"
if [ ! -f "$HOME_HTML" ]; then
  echo "013: $HOME_HTML missing — run 003-build first"
  exit 1
fi

echo "R2. Homepage copy constraints"
grep -qF "Software systems businesses run on." "$HOME_HTML" && pass "approved headline present" || fail "approved headline missing"
grep -qF "Laboratory work-order and test-allocation system" "$HOME_HTML" && pass "laboratory line present verbatim" || fail "laboratory line missing or altered"
grep -qi "proof of concept" "$HOME_HTML" && fail "'proof of concept' present" || pass "'proof of concept' absent"
grep -qi "quality gates" "$HOME_HTML" && fail "'with quality gates' present" || pass "'quality gates' absent"
grep -qiE 'class="[^"]*(stage|status-badge|maturity)[^"]*"|data-testid="[^"]*(stage|maturity)[^"]*"' "$HOME_HTML" \
  && fail "stage/maturity label markup present" || pass "no stage/maturity label markup"
grep -qF "founder@raystratsystems.com" "$HOME_HTML" && pass "public email present" || fail "public email missing"

echo "R3. Secondary pages still built"
for p in ai-solutions forward-deployed-engineering; do
  [ -f ".next/server/app/$p.html" ] && pass "/$p prerendered" || fail "/$p not built"
done

echo ""
if [ "$FAIL" = "0" ]; then
  echo "013-raystrat-homepage-production-release: PASS"
  exit 0
else
  echo "013-raystrat-homepage-production-release: FAIL"
  exit 1
fi
