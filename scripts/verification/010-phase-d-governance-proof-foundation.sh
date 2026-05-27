#!/usr/bin/env bash
# 010-phase-d-governance-proof-foundation.sh — Phase D1 Verification
# Verifies the first trust/evidence insertion wave:
#  - Governance Layer Diagram component + mount
#  - Failure Mode Registry Preview component + mount
#  - Frontline Support System Architecture diagram + conditional mount
# Plus anti-theater enforcement and prior-phase regression spot checks.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
cd "${REPO_ROOT}"

PASS=0
FAIL=0

echo "010-phase-d: Raystrat Phase D1 Governance Proof Foundation Verification"
echo ""

DIAG_DIR="src/components/diagrams"

# ============================================================
# DELIVERABLE FILE PRESENCE
# ============================================================

# Check 1: Governance Layer Diagram component exists
if [ -f "${DIAG_DIR}/governance-layer-diagram.tsx" ]; then
  echo "  PASS: governance-layer-diagram.tsx exists"
  PASS=$((PASS + 1))
else
  echo "  FAIL: governance-layer-diagram.tsx missing"
  FAIL=$((FAIL + 1))
fi

# Check 2: Failure Mode Registry Preview component exists
if [ -f "${DIAG_DIR}/failure-mode-registry-preview.tsx" ]; then
  echo "  PASS: failure-mode-registry-preview.tsx exists"
  PASS=$((PASS + 1))
else
  echo "  FAIL: failure-mode-registry-preview.tsx missing"
  FAIL=$((FAIL + 1))
fi

# Check 3: Frontline Support Architecture Diagram component exists
if [ -f "${DIAG_DIR}/frontline-support-architecture-diagram.tsx" ]; then
  echo "  PASS: frontline-support-architecture-diagram.tsx exists"
  PASS=$((PASS + 1))
else
  echo "  FAIL: frontline-support-architecture-diagram.tsx missing"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# DELIVERABLE INTEGRATION
# ============================================================

# Check 4: Governance Layer Diagram mounted on agent-advantage.tsx
if grep -q "GovernanceLayerDiagram" src/components/sections/agent-advantage.tsx 2>/dev/null; then
  echo "  PASS: agent-advantage.tsx imports/mounts GovernanceLayerDiagram"
  PASS=$((PASS + 1))
else
  echo "  FAIL: agent-advantage.tsx does not mount GovernanceLayerDiagram"
  FAIL=$((FAIL + 1))
fi

# Check 5: Failure Mode Registry Preview mounted on canonical /audit surface
# (decosplay pass deleted homepage results.tsx; /audit is the canonical mount per Phase E)
if grep -q "FailureModeRegistryPreview" src/app/audit/page.tsx 2>/dev/null; then
  echo "  PASS: /audit mounts FailureModeRegistryPreview (canonical home)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: /audit does not mount FailureModeRegistryPreview"
  FAIL=$((FAIL + 1))
fi

# Check 6: Frontline Support diagram mounted on service-page-client.tsx
if grep -q "FrontlineSupportArchitectureDiagram" src/components/ui/service-page-client.tsx 2>/dev/null; then
  echo "  PASS: service-page-client.tsx imports FrontlineSupportArchitectureDiagram"
  PASS=$((PASS + 1))
else
  echo "  FAIL: service-page-client.tsx does not import frontline-support diagram"
  FAIL=$((FAIL + 1))
fi

# Check 7: Frontline Support diagram conditionally rendered on slug match
if grep -q "service.slug === 'frontline-support'" src/components/ui/service-page-client.tsx 2>/dev/null; then
  echo "  PASS: service-page-client.tsx conditionally renders diagram on frontline-support slug"
  PASS=$((PASS + 1))
else
  echo "  FAIL: service-page-client.tsx missing conditional slug guard for diagram"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# DIAGRAM DOCTRINE — SVG ONLY / a11y
# ============================================================

# Check 8: All diagrams use inline <svg> (no PNG/JPG/raster imports in diagram dir)
if grep -rE "\.png|\.jpg|\.jpeg|\.gif|\.webp" "${DIAG_DIR}" 2>/dev/null; then
  echo "  FAIL: diagram dir contains raster asset reference"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: diagram dir free of raster references"
  PASS=$((PASS + 1))
fi

# Check 9: No animation/Lottie/Spline imports in diagrams
if grep -rE "from 'lottie|from \"lottie|from '@splinetool|from \"@splinetool|from 'react-spring|from \"react-spring" "${DIAG_DIR}" 2>/dev/null; then
  echo "  FAIL: diagram dir imports an animation/3D library"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: diagram dir free of animation/3D libraries"
  PASS=$((PASS + 1))
fi

# Check 10: Each diagram component declares <title> and <desc>
DIAGRAM_FILES=$(find "${DIAG_DIR}" -name "*-diagram.tsx" 2>/dev/null)
A11Y_FAIL=0
for f in $DIAGRAM_FILES; do
  if ! grep -q "<title" "$f" 2>/dev/null; then
    A11Y_FAIL=$((A11Y_FAIL + 1))
    echo "    (diagram missing <title>: $f)"
  fi
  if ! grep -q "<desc" "$f" 2>/dev/null; then
    A11Y_FAIL=$((A11Y_FAIL + 1))
    echo "    (diagram missing <desc>: $f)"
  fi
done
if [ "$A11Y_FAIL" -eq 0 ]; then
  echo "  PASS: every diagram declares <title> and <desc> for a11y"
  PASS=$((PASS + 1))
else
  echo "  FAIL: ${A11Y_FAIL} a11y omission(s) in diagram components"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# ANTI-THEATER ENFORCEMENT
# ============================================================

# Check 11: No animate-pulse / animate-ping / animate-bounce / animate-spin in diagram files
if grep -rE "animate-pulse|animate-ping|animate-bounce|animate-spin" "${DIAG_DIR}" 2>/dev/null; then
  echo "  FAIL: diagram dir contains decorative animation class"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: diagram dir free of decorative animation classes"
  PASS=$((PASS + 1))
fi

# Check 12: No gradient utilities in diagram files
if grep -rE "bg-gradient-|gradient-to-|linearGradient|radialGradient" "${DIAG_DIR}" 2>/dev/null; then
  echo "  FAIL: diagram dir contains gradient (forbidden)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: diagram dir free of gradients"
  PASS=$((PASS + 1))
fi

# Check 13: No backdrop-blur / glassmorphism in diagram files
if grep -rE "backdrop-blur|backdrop-filter" "${DIAG_DIR}" 2>/dev/null; then
  echo "  FAIL: diagram dir contains backdrop-blur (glassmorphism)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: diagram dir free of glassmorphism"
  PASS=$((PASS + 1))
fi

# Check 14: No shadow theatrics in diagram files
if grep -rE "shadow-2xl|shadow-primary|drop-shadow-" "${DIAG_DIR}" 2>/dev/null; then
  echo "  FAIL: diagram dir contains shadow theatrics"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: diagram dir free of shadow theatrics"
  PASS=$((PASS + 1))
fi

# Check 15: No SVG-internal animation tags (<animate>, <animateMotion>, <animateTransform>)
if grep -rE "<animate|<animateMotion|<animateTransform" "${DIAG_DIR}" 2>/dev/null; then
  echo "  FAIL: diagram contains SVG-internal animation tag"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: diagram dir free of SVG-internal animation"
  PASS=$((PASS + 1))
fi

# Check 16: No hover scale/rotate theatrics on diagrams
if grep -rE "hover:scale-|hover:rotate-|group-hover:scale-|group-hover:rotate-" "${DIAG_DIR}" 2>/dev/null; then
  echo "  FAIL: diagram dir contains hover scale/rotate theatrics"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: diagram dir free of hover scale/rotate theatrics"
  PASS=$((PASS + 1))
fi

# ============================================================
# REDACTION DISCIPLINE — failure-mode registry preview
# ============================================================

# Check 17: Failure Mode Registry Preview carries "Schematic" disclosure label
if grep -q "Schematic" src/components/diagrams/failure-mode-registry-preview.tsx 2>/dev/null; then
  echo "  PASS: failure-mode-registry-preview carries 'Schematic' disclosure"
  PASS=$((PASS + 1))
else
  echo "  FAIL: failure-mode-registry-preview missing 'Schematic' disclosure"
  FAIL=$((FAIL + 1))
fi

# Check 18: Failure mode IDs use monospace family (font-mono class present)
if grep -q "font-mono" src/components/diagrams/failure-mode-registry-preview.tsx 2>/dev/null; then
  echo "  PASS: failure-mode IDs render in monospace"
  PASS=$((PASS + 1))
else
  echo "  FAIL: failure-mode IDs missing monospace treatment"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# SCOPE DISCIPLINE — no additional trust surfaces created
# ============================================================

# Check 19: No SLA / Escalation Matrix / Compliance Hub / Trust Center / Cases routes introduced
SCOPE_CREEP=0
for route in sla escalation compliance trust-center cases case-studies blueprint architecture pricing; do
  if [ -f "src/app/${route}/page.tsx" ]; then
    SCOPE_CREEP=$((SCOPE_CREEP + 1))
    echo "    (scope creep route: /${route})"
  fi
done
if [ "$SCOPE_CREEP" -eq 0 ]; then
  echo "  PASS: no out-of-scope trust/evidence routes created"
  PASS=$((PASS + 1))
else
  echo "  FAIL: ${SCOPE_CREEP} out-of-scope route(s) detected"
  FAIL=$((FAIL + 1))
fi

# Check 20: Diagram file count matches sanctioned scope (3 from D1 + 2 from D2 = 5 total)
EXPECTED_DIAGRAMS=5
ACTUAL_DIAGRAMS=$(find "${DIAG_DIR}" -name "*.tsx" 2>/dev/null | wc -l | tr -d ' ')
if [ "$ACTUAL_DIAGRAMS" -eq "$EXPECTED_DIAGRAMS" ]; then
  echo "  PASS: diagrams dir contains exactly ${EXPECTED_DIAGRAMS} components (D1+D2 sanctioned scope)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: diagrams dir has ${ACTUAL_DIAGRAMS} components, expected ${EXPECTED_DIAGRAMS} (D1=3, D2=2)"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# POSITIONING INVARIANT spot checks (no operational cosplay leaked into copy)
# ============================================================

# Check 21: No fake-uptime / live-status / dashboard cosplay strings in diagrams
if grep -rE "Live Status|System Status:|🟢|99\.9|uptime guarantee|real-time monitoring" "${DIAG_DIR}" 2>/dev/null; then
  echo "  FAIL: diagram contains dashboard cosplay/fake-uptime string"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: diagrams free of dashboard cosplay strings"
  PASS=$((PASS + 1))
fi

# Check 22: Diagram components use theme tokens (fill-foreground / stroke-foreground / fill-primary)
# — at least one such utility class must appear in each diagram, indicating theme compatibility
TOKEN_FAIL=0
for f in $DIAGRAM_FILES; do
  if ! grep -qE "fill-(foreground|primary|card|muted-foreground)|stroke-(foreground|primary|border|muted-foreground)" "$f" 2>/dev/null; then
    TOKEN_FAIL=$((TOKEN_FAIL + 1))
  fi
done
if [ "$TOKEN_FAIL" -eq 0 ]; then
  echo "  PASS: all diagrams use theme-token utility classes (dark/light compatible)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: ${TOKEN_FAIL} diagram(s) missing theme-token utilities"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# PRIOR-PHASE REGRESSION SPOT CHECKS
# ============================================================

# Check 23: Phase A Raystrat blue token intact
if grep -q -- "--primary: 214 98% 40%" src/app/globals.css 2>/dev/null; then
  echo "  PASS: Phase A Raystrat blue token intact"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Phase A Raystrat blue token regressed"
  FAIL=$((FAIL + 1))
fi

# Check 24: Phase B card primitive intact
if grep -q "rounded-md border bg-card" src/components/ui/card.tsx 2>/dev/null; then
  echo "  PASS: Phase B card primitive intact"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Phase B card primitive regressed"
  FAIL=$((FAIL + 1))
fi

# Check 25: Phase B animate-ping absent site-wide
if grep -rq "animate-ping" src/components/ 2>/dev/null; then
  echo "  FAIL: animate-ping reintroduced (Phase B regression)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: animate-ping absent site-wide"
  PASS=$((PASS + 1))
fi

# Check 26: Phase C ThemeToggle absent from header
if grep -q "ThemeToggle" src/components/header.tsx 2>/dev/null; then
  echo "  FAIL: ThemeToggle re-entered header (Phase C regression)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: ThemeToggle absent from header (Phase C intact)"
  PASS=$((PASS + 1))
fi

# Check 27: Phase C institutional anchors intact in footer
if [ -f src/app/principal/page.tsx ] && [ -f src/app/documentation/page.tsx ] && [ -f src/app/continuity/page.tsx ]; then
  echo "  PASS: Phase C institutional surfaces preserved as routes (deferred from footer)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Phase C institutional routes missing"
  FAIL=$((FAIL + 1))
fi

echo ""
echo "010-phase-d result: ${PASS} pass, ${FAIL} fail"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
exit 0
