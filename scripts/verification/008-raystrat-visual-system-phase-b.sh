#!/usr/bin/env bash
# 008-raystrat-visual-system-phase-b.sh — Visual System Phase B Verification
# Verifies component doctrine: no forbidden motion, standardized radius,
# hero scale, CTA consistency, no decorative animation, and prior suite integrity.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
cd "${REPO_ROOT}"

PASS=0
FAIL=0

echo "008-phase-b: Raystrat Visual System Phase B Verification"
echo ""

# Check 1: No icon rotation hover in services.tsx
if grep -q "rotate-6" src/components/sections/services.tsx 2>/dev/null; then
  echo "  FAIL: services.tsx still has icon rotation hover"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: services.tsx has no icon rotation hover"
  PASS=$((PASS + 1))
fi

# Check 2: No exaggerated scale hover in services.tsx
if grep -q "scale-110" src/components/sections/services.tsx 2>/dev/null; then
  echo "  FAIL: services.tsx still has scale-110 hover"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: services.tsx has no scale-110 hover"
  PASS=$((PASS + 1))
fi

# Check 3: Card primitive uses rounded-md (not rounded-lg or rounded-2xl)
if grep -q "rounded-lg border bg-card" src/components/ui/card.tsx 2>/dev/null; then
  echo "  FAIL: card.tsx still has rounded-lg (not updated to rounded-md)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: card.tsx uses rounded-md (rounded-lg removed)"
  PASS=$((PASS + 1))
fi

# Check 4: Hero headline scale reduced (no text-7xl or text-8xl on hero)
if grep -qE "text-7xl|text-8xl" src/components/sections/hero.tsx 2>/dev/null; then
  echo "  FAIL: hero.tsx still has text-7xl or text-8xl"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: hero.tsx headline scale reduced (no text-7xl/text-8xl)"
  PASS=$((PASS + 1))
fi

# Check 5: Hero CTA is canonical primary (no ghost variant override)
if grep -q 'variant="ghost"' src/components/sections/hero.tsx 2>/dev/null; then
  echo "  FAIL: hero.tsx still has ghost variant CTA"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: hero.tsx CTA uses canonical primary (no ghost override)"
  PASS=$((PASS + 1))
fi

# Check 6: No gradients introduced in Phase B-touched files
if grep -l "gradient" \
    src/components/sections/hero.tsx \
    src/components/sections/services.tsx \
    src/components/sections/failure-thesis.tsx \
    src/components/sections/agent-advantage.tsx \
    src/components/sections/industries.tsx \
    src/components/sections/results.tsx \
    src/components/header.tsx \
    src/components/footer.tsx \
    src/components/ui/card.tsx \
    src/components/ui/service-suggester.tsx \
    src/components/ui/floating-ai-suggestor.tsx \
    2>/dev/null | grep -q .; then
  echo "  FAIL: Gradient found in Phase B-touched files"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: No gradients in Phase B-touched files"
  PASS=$((PASS + 1))
fi

# Check 7: No glassmorphism (backdrop-blur on floating non-header elements)
if grep -q "backdrop-blur" src/components/ui/service-suggester.tsx 2>/dev/null; then
  echo "  FAIL: service-suggester.tsx still has backdrop-blur (glassmorphism)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: service-suggester.tsx has no backdrop-blur"
  PASS=$((PASS + 1))
fi

# Check 8: No animate-pulse on floating advisor
if grep -q "animate-pulse" src/components/ui/floating-ai-suggestor.tsx 2>/dev/null; then
  echo "  FAIL: floating-ai-suggestor.tsx still has animate-pulse"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: floating-ai-suggestor.tsx has no animate-pulse"
  PASS=$((PASS + 1))
fi

# Check 9: No green ping animations (decorative status dots removed)
if grep -r "animate-ping" src/components/ 2>/dev/null | grep -qv "\.d\.ts"; then
  echo "  FAIL: animate-ping still present in component files"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: No animate-ping in component files"
  PASS=$((PASS + 1))
fi

# Check 10: No 30s auto-open timer in service-suggester
if grep -q "30000" src/components/ui/service-suggester.tsx 2>/dev/null; then
  echo "  FAIL: service-suggester.tsx still has 30s auto-open timer"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: service-suggester.tsx has no 30s auto-open timer"
  PASS=$((PASS + 1))
fi

# Check 11: No rounded-2xl in governance section
if grep -q "rounded-2xl" src/components/sections/agent-advantage.tsx 2>/dev/null; then
  echo "  FAIL: agent-advantage.tsx still has rounded-2xl"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: agent-advantage.tsx has no rounded-2xl"
  PASS=$((PASS + 1))
fi

# Check 12: Prior verification suite 007 would still pass — token checks
if grep -q -- "--primary: 214 98% 40%" src/app/globals.css 2>/dev/null; then
  echo "  PASS: globals.css Raystrat blue token intact (007 regression check)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: globals.css Raystrat blue token missing (007 regression)"
  FAIL=$((FAIL + 1))
fi

# Check 13: No italic CardDescription duplicate in services
if grep -q "italic" src/components/sections/services.tsx 2>/dev/null; then
  echo "  FAIL: services.tsx still has italic text (duplicate subhead)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: services.tsx has no italic text"
  PASS=$((PASS + 1))
fi

# Check 14: Sparkles icon removed from floating advisor
if grep -q "Sparkles" src/components/ui/floating-ai-suggestor.tsx 2>/dev/null; then
  echo "  FAIL: floating-ai-suggestor.tsx still uses Sparkles icon"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: floating-ai-suggestor.tsx has no Sparkles icon"
  PASS=$((PASS + 1))
fi

# Check 15: Positioning invariants still pass (spot check — Governance by Design)
if grep -q "Governance by Design" src/components/sections/agent-advantage.tsx 2>/dev/null; then
  echo "  PASS: Governance by Design section intact (positioning regression check)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Governance by Design section missing (positioning regression)"
  FAIL=$((FAIL + 1))
fi

echo ""
echo "008-phase-b result: ${PASS} pass, ${FAIL} fail"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
exit 0
