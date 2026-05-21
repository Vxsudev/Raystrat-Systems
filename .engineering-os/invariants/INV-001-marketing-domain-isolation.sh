#!/usr/bin/env bash
# INV-001: Marketing domain isolation
#
# The marketing domain branch in src/app/page.tsx must remain isolated from
# dashboard surfaces. This script verifies the host-router is still present
# and that no dashboard components are imported unconditionally at the page root.

set -euo pipefail

PASS=0
FAIL=0

echo "INV-001: Marketing domain isolation"

# Check 1: Host-based routing still present in src/app/page.tsx
if grep -q "raystratsystems.com\|app\.\|hostname\|host" src/app/page.tsx 2>/dev/null; then
  echo "  PASS: Host-based routing present in src/app/page.tsx"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Host-based routing not found in src/app/page.tsx"
  echo "        The domain router that separates marketing from app dashboard may have been removed."
  FAIL=$((FAIL + 1))
fi

# Check 2: No direct import of dashboard components at page root
if grep -E "import.*[Dd]ashboard|import.*AppDashboard|import.*app-dashboard" src/app/page.tsx 2>/dev/null; then
  echo "  FAIL: Dashboard component unconditionally imported in src/app/page.tsx"
  echo "        Dashboard imports must only appear inside the host-conditional branch."
  FAIL=$((FAIL + 1))
else
  echo "  PASS: No unconditional dashboard imports in src/app/page.tsx"
  PASS=$((PASS + 1))
fi

echo ""
echo "INV-001 result: ${PASS} pass, ${FAIL} fail"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
exit 0
