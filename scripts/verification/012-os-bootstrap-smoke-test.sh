#!/usr/bin/env bash
# 012 — Feature verification: raystrat-os-bootstrap-smoke-test
#
# Narrow, single-purpose check: confirms the smoke-test worker created
# exactly the one authorised marker file, with exactly the expected
# content, at exactly the expected path — inside this worktree. Does not
# re-run typecheck/build/invariants/011 — nothing they check is affected
# by this capability. Does not and cannot check the original checkout
# (a verification script only ever runs inside the worktree it's invoked
# from) — that proof is external, via a full filesystem sweep, not this
# script.

set -u
FAIL=0

pass() { echo "  PASS  $1"; }
fail() { echo "  FAIL  $1"; FAIL=1; }

MARKER="ai/smoke-test/marker.txt"
EXPECTED="raystrat-os-bootstrap-smoke-test: supervised worker executed successfully in the isolated worktree."

echo "V1. Marker file exists at the exact authorised path"
if [ -f "$MARKER" ]; then
  pass "exists: $MARKER"
else
  fail "missing: $MARKER"
fi

echo "V2. Marker content is exactly as specified"
if [ -f "$MARKER" ]; then
  ACTUAL=$(cat "$MARKER")
  if [ "$ACTUAL" = "$EXPECTED" ]; then
    pass "content matches exactly"
  else
    fail "content mismatch — got: $ACTUAL"
  fi
else
  fail "content check skipped — file missing"
fi

echo "V3. No other file exists under ai/smoke-test/"
COUNT=$(find ai/smoke-test -type f | wc -l | tr -d ' ')
if [ "$COUNT" = "1" ]; then
  pass "exactly 1 file under ai/smoke-test/"
else
  fail "expected exactly 1 file under ai/smoke-test/, found $COUNT"
  find ai/smoke-test -type f
fi

echo ""
if [ "$FAIL" = "0" ]; then
  echo "012-os-bootstrap-smoke-test: PASS"
  exit 0
else
  echo "012-os-bootstrap-smoke-test: FAIL"
  exit 1
fi
