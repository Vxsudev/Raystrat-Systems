#!/usr/bin/env bash
# 005-raystrat-homepage-repositioning.sh — Positioning verification
# Verifies that the homepage repositioning is structurally correct.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
cd "${REPO_ROOT}"

PASS=0
FAIL=0

echo "005-positioning: Raystrat Homepage Repositioning Verification"
echo ""

# Check 1: Hero does NOT contain "Agents Run" or DynamicHeadline
if grep -q "Agents Run\|DynamicHeadline" src/components/sections/hero.tsx 2>/dev/null; then
  echo "  FAIL: Hero still contains agent-first language or DynamicHeadline"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: Hero does not contain 'Agents Run' or DynamicHeadline"
  PASS=$((PASS + 1))
fi

# Check 2: Hero contains operational failure framing
if grep -q "Operational Breakdown\|operational breakdown\|prevent" src/components/sections/hero.tsx 2>/dev/null; then
  echo "  PASS: Hero contains operational failure framing"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Hero does not contain operational failure framing"
  FAIL=$((FAIL + 1))
fi

# Check 3: FailureThesis component exists
if [ -f "src/components/sections/failure-thesis.tsx" ]; then
  echo "  PASS: FailureThesis component exists"
  PASS=$((PASS + 1))
else
  echo "  FAIL: FailureThesis component missing"
  FAIL=$((FAIL + 1))
fi

# Check 4: Homepage imports and renders FailureThesis
if grep -q "FailureThesis" src/app/page.tsx 2>/dev/null; then
  echo "  PASS: Homepage imports FailureThesis"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Homepage does not import FailureThesis"
  FAIL=$((FAIL + 1))
fi

# Check 5: Systems route exists
if [ -f "src/app/systems/[slug]/page.tsx" ] || [ -f "src/app/systems/%5Bslug%5D/page.tsx" ]; then
  echo "  PASS: /systems/[slug] route exists"
  PASS=$((PASS + 1))
else
  # Try alternate check
  if ls src/app/systems/ 2>/dev/null | grep -q "slug\|\["; then
    echo "  PASS: /systems/[slug] route exists"
    PASS=$((PASS + 1))
  else
    echo "  FAIL: /systems/[slug] route missing"
    FAIL=$((FAIL + 1))
  fi
fi

# Check 6: No /services/ hrefs remaining in src/
SERVICES_HREFS=$(grep -rn '"/services/\|`/services/' src/ --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v "node_modules" | grep -v ".next" || true)
if [ -n "$SERVICES_HREFS" ]; then
  echo "  FAIL: Remaining /services/ href references found:"
  echo "$SERVICES_HREFS" | sed 's/^/         /'
  FAIL=$((FAIL + 1))
else
  echo "  PASS: No /services/ href references in src/"
  PASS=$((PASS + 1))
fi

# Check 7: next.config.js has redirects
if grep -q "redirects" next.config.js 2>/dev/null; then
  echo "  PASS: next.config.js contains redirects"
  PASS=$((PASS + 1))
else
  echo "  FAIL: next.config.js missing redirects"
  FAIL=$((FAIL + 1))
fi

# Check 8: No "Agents." headline in services section
if grep -q '>Agents<' src/components/sections/services.tsx 2>/dev/null; then
  echo "  FAIL: Services section still has 'Agents' headline"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: Services section does not have 'Agents' headline"
  PASS=$((PASS + 1))
fi

# Check 9: Governance Layer section exists (AgentAdvantage replaced)
if grep -q "Governance by Design" src/components/sections/agent-advantage.tsx 2>/dev/null; then
  echo "  PASS: Governance Layer section exists"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Governance Layer section missing or not updated"
  FAIL=$((FAIL + 1))
fi

# Check 10: AI flows use operational vocabulary
if grep -q "operational advisor\|operational systems" src/ai/flows/contextual-assistant.ts 2>/dev/null; then
  echo "  PASS: AI contextual assistant uses operational vocabulary"
  PASS=$((PASS + 1))
else
  echo "  FAIL: AI contextual assistant still uses old vocabulary"
  FAIL=$((FAIL + 1))
fi

echo ""
echo "005-positioning result: ${PASS} pass, ${FAIL} fail"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
exit 0
