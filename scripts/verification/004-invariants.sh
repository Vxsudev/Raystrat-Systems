#!/usr/bin/env bash
# 004-invariants.sh — Run all Engineering OS invariant checks
#
# Iterates over all *.sh scripts in .engineering-os/invariants/ and runs each.
# Fails fast on first invariant violation.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
INVARIANTS_DIR="${REPO_ROOT}/.engineering-os/invariants"

echo "[004-invariants] Running invariant checks..."
cd "${REPO_ROOT}"

TOTAL=0
PASSED=0
FAILED=0

for invariant_script in "${INVARIANTS_DIR}"/*.sh; do
  [ -f "$invariant_script" ] || continue
  TOTAL=$((TOTAL + 1))
  if bash "$invariant_script"; then
    PASSED=$((PASSED + 1))
  else
    FAILED=$((FAILED + 1))
    echo ""
    echo "[004-invariants] INVARIANT VIOLATION: ${invariant_script}"
  fi
  echo ""
done

echo "[004-invariants] Total: ${TOTAL} | Passed: ${PASSED} | Failed: ${FAILED}"

if [ "$FAILED" -gt 0 ]; then
  echo "[004-invariants] FAIL — ${FAILED} invariant(s) violated"
  exit 1
fi

echo "[004-invariants] PASS — all invariants hold"
