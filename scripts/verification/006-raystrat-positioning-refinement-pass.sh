#!/usr/bin/env bash
# 006-raystrat-positioning-refinement-pass.sh — Positioning Refinement Verification
# Verifies that all agent-language surfaces have been corrected and /systems index exists.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
cd "${REPO_ROOT}"

PASS=0
FAIL=0

echo "006-refinement: Raystrat Positioning Refinement Pass Verification"
echo ""

# Check 1: No "Suggest an Agent" in service-suggester.tsx
if grep -q "Suggest an Agent" src/components/ui/service-suggester.tsx 2>/dev/null; then
  echo "  FAIL: service-suggester.tsx still has 'Suggest an Agent'"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: service-suggester.tsx has no 'Suggest an Agent'"
  PASS=$((PASS + 1))
fi

# Check 2: No "AI-Powered Agent Suggester" in service-suggester.tsx
if grep -q "AI-Powered Agent Suggester" src/components/ui/service-suggester.tsx 2>/dev/null; then
  echo "  FAIL: service-suggester.tsx still has 'AI-Powered Agent Suggester'"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: service-suggester.tsx has no 'AI-Powered Agent Suggester'"
  PASS=$((PASS + 1))
fi

# Check 3: "Diagnose a Breakdown" CTA present
if grep -q "Diagnose a Breakdown" src/components/ui/service-suggester.tsx 2>/dev/null; then
  echo "  PASS: service-suggester.tsx has 'Diagnose a Breakdown' CTA"
  PASS=$((PASS + 1))
else
  echo "  FAIL: service-suggester.tsx missing 'Diagnose a Breakdown' CTA"
  FAIL=$((FAIL + 1))
fi

# Check 4: No "Agent Assist" in floating-ai-suggestor.tsx
if grep -q "Agent Assist" src/components/ui/floating-ai-suggestor.tsx 2>/dev/null; then
  echo "  FAIL: floating-ai-suggestor.tsx still has 'Agent Assist'"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: floating-ai-suggestor.tsx has no 'Agent Assist'"
  PASS=$((PASS + 1))
fi

# Check 5: "Operational Advisor" present in floating-ai-suggestor.tsx
if grep -q "Operational Advisor" src/components/ui/floating-ai-suggestor.tsx 2>/dev/null; then
  echo "  PASS: floating-ai-suggestor.tsx has 'Operational Advisor'"
  PASS=$((PASS + 1))
else
  echo "  FAIL: floating-ai-suggestor.tsx missing 'Operational Advisor'"
  FAIL=$((FAIL + 1))
fi

# Check 6: No "Favorite This Agent" in favorite-agent-button.tsx
if grep -q "Favorite This Agent" src/components/ui/favorite-agent-button.tsx 2>/dev/null; then
  echo "  FAIL: favorite-agent-button.tsx still has 'Favorite This Agent'"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: favorite-agent-button.tsx has no 'Favorite This Agent'"
  PASS=$((PASS + 1))
fi

# Check 7: No "agents" in industries.tsx feature bullets
if grep -q "agents" src/components/sections/industries.tsx 2>/dev/null; then
  echo "  FAIL: industries.tsx still has 'agents' in feature bullets"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: industries.tsx has no 'agents' in feature bullets"
  PASS=$((PASS + 1))
fi

# Check 8: No "AI-driven" in industries.tsx
if grep -qi "AI-driven\|AI-powered" src/components/sections/industries.tsx 2>/dev/null; then
  echo "  FAIL: industries.tsx still has AI-driven or AI-powered language"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: industries.tsx has no AI-driven/AI-powered language"
  PASS=$((PASS + 1))
fi

# Check 9: notes-taker.tsx agent placeholder removed
if grep -q "our agents" src/components/ui/notes-taker.tsx 2>/dev/null; then
  echo "  FAIL: notes-taker.tsx still has 'our agents' in placeholder"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: notes-taker.tsx has no 'our agents' in copy"
  PASS=$((PASS + 1))
fi

# Check 10: agent-advantage.tsx section id updated
if grep -q 'id="agent-advantage"' src/components/sections/agent-advantage.tsx 2>/dev/null; then
  echo "  FAIL: agent-advantage.tsx still has id='agent-advantage'"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: agent-advantage.tsx section id updated (no 'agent-advantage')"
  PASS=$((PASS + 1))
fi

# Check 11: /systems index route exists
if [ -f "src/app/systems/page.tsx" ]; then
  echo "  PASS: /systems index route exists (src/app/systems/page.tsx)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: /systems index route missing"
  FAIL=$((FAIL + 1))
fi

# Check 12: /systems page has no agent language
if grep -qi "agent\|AI-powered" src/app/systems/page.tsx 2>/dev/null; then
  echo "  FAIL: /systems page contains agent or AI-powered language"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: /systems page has no agent/AI-powered language"
  PASS=$((PASS + 1))
fi

# Check 13: /systems page imports from content.ts services
if grep -q "services" src/app/systems/page.tsx 2>/dev/null; then
  echo "  PASS: /systems page imports services from content.ts"
  PASS=$((PASS + 1))
else
  echo "  FAIL: /systems page does not import services"
  FAIL=$((FAIL + 1))
fi

# Check 14: Governance by Design remains (no regression from earlier pass)
if grep -q "Governance by Design" src/components/sections/agent-advantage.tsx 2>/dev/null; then
  echo "  PASS: Governance by Design section intact"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Governance by Design section missing"
  FAIL=$((FAIL + 1))
fi

# Check 15: Metadata updated — no "AI Automations Wing"
if grep -q "AI Automations Wing" src/app/layout.tsx 2>/dev/null; then
  echo "  FAIL: layout.tsx still has 'AI Automations Wing' in metadata"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: layout.tsx metadata has no 'AI Automations Wing'"
  PASS=$((PASS + 1))
fi

echo ""
echo "006-refinement result: ${PASS} pass, ${FAIL} fail"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
exit 0
