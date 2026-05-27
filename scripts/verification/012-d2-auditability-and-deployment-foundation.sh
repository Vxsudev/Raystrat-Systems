#!/usr/bin/env bash
# 012-d2-auditability-and-deployment-foundation.sh — Phase D2 Verification
# Verifies the D2 auditability and deployment lifecycle implementation:
#  Track 1: Audit Trail Entry Preview — mounted on agent-advantage.tsx
#  Track 2: Deployment Lifecycle Diagram — mounted on results.tsx
# Anti-theater, scope discipline, D1 artifact integrity, D1.5 regression checks.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
cd "${REPO_ROOT}"

PASS=0
FAIL=0

echo "012-d2: Raystrat Phase D2 Auditability and Deployment Foundation Verification"
echo ""

DIAG_DIR="src/components/diagrams"

# ============================================================
# TRACK 1 — AUDIT TRAIL ENTRY PREVIEW
# ============================================================

# Check 1: audit-trail-entry-preview.tsx exists
if [ -f "${DIAG_DIR}/audit-trail-entry-preview.tsx" ]; then
  echo "  PASS: audit-trail-entry-preview.tsx exists"
  PASS=$((PASS + 1))
else
  echo "  FAIL: audit-trail-entry-preview.tsx missing"
  FAIL=$((FAIL + 1))
fi

# Check 2: AuditTrailEntryPreview mounted on agent-advantage.tsx
if grep -q "AuditTrailEntryPreview" src/components/sections/agent-advantage.tsx 2>/dev/null; then
  echo "  PASS: agent-advantage.tsx imports/mounts AuditTrailEntryPreview"
  PASS=$((PASS + 1))
else
  echo "  FAIL: agent-advantage.tsx does not mount AuditTrailEntryPreview"
  FAIL=$((FAIL + 1))
fi

# Check 3: Audit trail preview free of internal version stamp notation (D2.5 simplified)
if grep -q "AUDIT-TRAIL-FORMAT-v" "${DIAG_DIR}/audit-trail-entry-preview.tsx" 2>/dev/null; then
  echo "  FAIL: audit-trail-entry-preview contains version stamp notation (removed in D2.5)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: audit-trail-entry-preview free of version stamp notation"
  PASS=$((PASS + 1))
fi

# Check 4: Audit trail entries use monospace treatment
if grep -q "font-mono" "${DIAG_DIR}/audit-trail-entry-preview.tsx" 2>/dev/null; then
  echo "  PASS: audit-trail-entry-preview uses font-mono for identifiers"
  PASS=$((PASS + 1))
else
  echo "  FAIL: audit-trail-entry-preview missing font-mono treatment"
  FAIL=$((FAIL + 1))
fi

# Check 5: Audit trail preview carries 'Schematic' disclosure label
if grep -q "Schematic" "${DIAG_DIR}/audit-trail-entry-preview.tsx" 2>/dev/null; then
  echo "  PASS: audit-trail-entry-preview carries 'Schematic' disclosure"
  PASS=$((PASS + 1))
else
  echo "  FAIL: audit-trail-entry-preview missing 'Schematic' disclosure"
  FAIL=$((FAIL + 1))
fi

# Check 6: No animation in audit trail preview
if grep -qE "animate-pulse|animate-ping|animate-bounce|animate-spin" "${DIAG_DIR}/audit-trail-entry-preview.tsx" 2>/dev/null; then
  echo "  FAIL: audit-trail-entry-preview contains decorative animation"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: audit-trail-entry-preview free of decorative animation"
  PASS=$((PASS + 1))
fi

# Check 7: No fake 'LIVE' / 'live' status or dashboard telemetry in audit trail preview
if grep -qE "LIVE|live status|🟢|real-time|realtime|updating" "${DIAG_DIR}/audit-trail-entry-preview.tsx" 2>/dev/null; then
  echo "  FAIL: audit-trail-entry-preview contains fake-live / dashboard telemetry string"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: audit-trail-entry-preview free of fake-live / telemetry strings"
  PASS=$((PASS + 1))
fi

# ============================================================
# TRACK 2 — DEPLOYMENT LIFECYCLE DIAGRAM
# ============================================================

# Check 8: deployment-lifecycle-diagram.tsx exists
if [ -f "${DIAG_DIR}/deployment-lifecycle-diagram.tsx" ]; then
  echo "  PASS: deployment-lifecycle-diagram.tsx exists"
  PASS=$((PASS + 1))
else
  echo "  FAIL: deployment-lifecycle-diagram.tsx missing"
  FAIL=$((FAIL + 1))
fi

# Check 9: DeploymentLifecycleDiagram mounted on results.tsx
if grep -q "DeploymentLifecycleDiagram" src/components/sections/results.tsx 2>/dev/null; then
  echo "  PASS: results.tsx imports/mounts DeploymentLifecycleDiagram"
  PASS=$((PASS + 1))
else
  echo "  FAIL: results.tsx does not mount DeploymentLifecycleDiagram"
  FAIL=$((FAIL + 1))
fi

# Check 10: Deployment lifecycle diagram has <title> for a11y
if grep -q "<title" "${DIAG_DIR}/deployment-lifecycle-diagram.tsx" 2>/dev/null; then
  echo "  PASS: deployment-lifecycle-diagram has <title> for a11y"
  PASS=$((PASS + 1))
else
  echo "  FAIL: deployment-lifecycle-diagram missing <title>"
  FAIL=$((FAIL + 1))
fi

# Check 11: Deployment lifecycle diagram has <desc> for a11y
if grep -q "<desc" "${DIAG_DIR}/deployment-lifecycle-diagram.tsx" 2>/dev/null; then
  echo "  PASS: deployment-lifecycle-diagram has <desc> for a11y"
  PASS=$((PASS + 1))
else
  echo "  FAIL: deployment-lifecycle-diagram missing <desc>"
  FAIL=$((FAIL + 1))
fi

# Check 12: Governed arc stages carry primary accent (fill-primary or stroke-primary)
if grep -q "fill-primary" "${DIAG_DIR}/deployment-lifecycle-diagram.tsx" 2>/dev/null; then
  echo "  PASS: deployment-lifecycle-diagram uses primary accent for governed arc"
  PASS=$((PASS + 1))
else
  echo "  FAIL: deployment-lifecycle-diagram missing primary accent on governed arc"
  FAIL=$((FAIL + 1))
fi

# Check 13: Deployment lifecycle contains all six stage names (DL-stage IDs removed in D2.5)
STAGE_MISSING=0
for stage in "OPERATIONAL AUDIT" "ARCHITECTURE REVIEW" "BUILD" "DEPLOYMENT" "GOVERNANCE RUN" "CONTINUITY REVIEW"; do
  if ! grep -q "${stage}" "${DIAG_DIR}/deployment-lifecycle-diagram.tsx" 2>/dev/null; then
    STAGE_MISSING=$((STAGE_MISSING + 1))
    echo "    (missing stage name: ${stage})"
  fi
done
if [ "$STAGE_MISSING" -eq 0 ]; then
  echo "  PASS: deployment-lifecycle-diagram contains all six stage names"
  PASS=$((PASS + 1))
else
  echo "  FAIL: ${STAGE_MISSING} stage name(s) missing from deployment-lifecycle-diagram"
  FAIL=$((FAIL + 1))
fi

# Check 14: Deployment lifecycle carries 'Schematic' disclosure in figcaption
if grep -q "Schematic" "${DIAG_DIR}/deployment-lifecycle-diagram.tsx" 2>/dev/null; then
  echo "  PASS: deployment-lifecycle-diagram carries 'Schematic' disclosure"
  PASS=$((PASS + 1))
else
  echo "  FAIL: deployment-lifecycle-diagram missing 'Schematic' disclosure"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# DIAGRAM DOCTRINE — total count, SVG only, no theater
# ============================================================

# Check 15: Diagrams dir has exactly 5 files (3 D1 + 2 D2 sanctioned)
EXPECTED_DIAGRAMS=5
ACTUAL_DIAGRAMS=$(find "${DIAG_DIR}" -name "*.tsx" 2>/dev/null | wc -l | tr -d ' ')
if [ "$ACTUAL_DIAGRAMS" -eq "$EXPECTED_DIAGRAMS" ]; then
  echo "  PASS: diagrams dir contains exactly ${EXPECTED_DIAGRAMS} files (D1=3 + D2=2)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: diagrams dir has ${ACTUAL_DIAGRAMS} files, expected ${EXPECTED_DIAGRAMS}"
  FAIL=$((FAIL + 1))
fi

# Check 16: No additional system architecture diagrams added beyond FLS
ARCH_DIAGRAMS=$(find "${DIAG_DIR}" -name "*-architecture-diagram.tsx" 2>/dev/null | wc -l | tr -d ' ')
if [ "$ARCH_DIAGRAMS" -eq 1 ]; then
  echo "  PASS: no additional system architecture diagrams added (FLS only)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: unexpected system architecture diagram count: ${ARCH_DIAGRAMS} (expected 1)"
  FAIL=$((FAIL + 1))
fi

# Check 17: No raster imports in new D2 diagram files
if grep -rE "\.png|\.jpg|\.jpeg|\.gif|\.webp" \
  "${DIAG_DIR}/audit-trail-entry-preview.tsx" \
  "${DIAG_DIR}/deployment-lifecycle-diagram.tsx" 2>/dev/null; then
  echo "  FAIL: D2 diagram files contain raster asset references"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: D2 diagram files free of raster asset references"
  PASS=$((PASS + 1))
fi

# Check 18: No animation/3D library imports in D2 diagram files
if grep -rE "from 'lottie|from \"lottie|from '@splinetool|from \"@splinetool|from 'react-spring|from \"react-spring" \
  "${DIAG_DIR}/audit-trail-entry-preview.tsx" \
  "${DIAG_DIR}/deployment-lifecycle-diagram.tsx" 2>/dev/null; then
  echo "  FAIL: D2 diagram files import animation/3D library"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: D2 diagram files free of animation/3D libraries"
  PASS=$((PASS + 1))
fi

# Check 19: No decorative animation classes in D2 diagram files
if grep -rE "animate-pulse|animate-ping|animate-bounce|animate-spin" \
  "${DIAG_DIR}/audit-trail-entry-preview.tsx" \
  "${DIAG_DIR}/deployment-lifecycle-diagram.tsx" 2>/dev/null; then
  echo "  FAIL: D2 diagram files contain decorative animation classes"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: D2 diagram files free of decorative animation classes"
  PASS=$((PASS + 1))
fi

# Check 20: No gradient in D2 diagram files
if grep -rE "bg-gradient-|gradient-to-|linearGradient|radialGradient" \
  "${DIAG_DIR}/audit-trail-entry-preview.tsx" \
  "${DIAG_DIR}/deployment-lifecycle-diagram.tsx" 2>/dev/null; then
  echo "  FAIL: D2 diagram files contain gradient (forbidden)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: D2 diagram files free of gradients"
  PASS=$((PASS + 1))
fi

# Check 21: No glassmorphism in D2 diagram files
if grep -rE "backdrop-blur|backdrop-filter" \
  "${DIAG_DIR}/audit-trail-entry-preview.tsx" \
  "${DIAG_DIR}/deployment-lifecycle-diagram.tsx" 2>/dev/null; then
  echo "  FAIL: D2 diagram files contain backdrop-blur (glassmorphism)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: D2 diagram files free of glassmorphism"
  PASS=$((PASS + 1))
fi

# Check 22: No shadow theatrics in D2 diagram files
if grep -rE "shadow-2xl|shadow-primary|drop-shadow-" \
  "${DIAG_DIR}/audit-trail-entry-preview.tsx" \
  "${DIAG_DIR}/deployment-lifecycle-diagram.tsx" 2>/dev/null; then
  echo "  FAIL: D2 diagram files contain shadow theatrics"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: D2 diagram files free of shadow theatrics"
  PASS=$((PASS + 1))
fi

# ============================================================
# SCOPE DISCIPLINE — no Phase E leakage
# ============================================================

# Check 23: No new out-of-scope trust/procurement routes created
SCOPE_CREEP=0
for route in trust-center compliance sla escalation cases case-studies pricing blueprint architecture; do
  if [ -f "src/app/${route}/page.tsx" ]; then
    SCOPE_CREEP=$((SCOPE_CREEP + 1))
    echo "    (scope creep route: /${route})"
  fi
done
if [ "$SCOPE_CREEP" -eq 0 ]; then
  echo "  PASS: no out-of-scope trust/procurement routes created"
  PASS=$((PASS + 1))
else
  echo "  FAIL: ${SCOPE_CREEP} out-of-scope route(s) detected"
  FAIL=$((FAIL + 1))
fi

# Check 24: No dashboard cosplay strings in D2 files
if grep -rE "Live Status|System Status:|🟢|99\.9|uptime guarantee|real-time monitoring" \
  "${DIAG_DIR}/audit-trail-entry-preview.tsx" \
  "${DIAG_DIR}/deployment-lifecycle-diagram.tsx" 2>/dev/null; then
  echo "  FAIL: D2 files contain dashboard cosplay string"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: D2 files free of dashboard cosplay strings"
  PASS=$((PASS + 1))
fi

# ============================================================
# D1 ARTIFACT INTEGRITY
# ============================================================

# Check 25: D1 diagram components untouched
if [ -f "${DIAG_DIR}/governance-layer-diagram.tsx" ] \
   && [ -f "${DIAG_DIR}/failure-mode-registry-preview.tsx" ] \
   && [ -f "${DIAG_DIR}/frontline-support-architecture-diagram.tsx" ]; then
  echo "  PASS: all three D1 diagram components intact"
  PASS=$((PASS + 1))
else
  echo "  FAIL: one or more D1 diagram components missing"
  FAIL=$((FAIL + 1))
fi

# Check 26: GovernanceLayerDiagram still mounted on agent-advantage.tsx
if grep -q "GovernanceLayerDiagram" src/components/sections/agent-advantage.tsx 2>/dev/null; then
  echo "  PASS: GovernanceLayerDiagram still mounted on agent-advantage.tsx"
  PASS=$((PASS + 1))
else
  echo "  FAIL: GovernanceLayerDiagram removed from agent-advantage.tsx"
  FAIL=$((FAIL + 1))
fi

# Check 27: FailureModeRegistryPreview still mounted on results.tsx
if grep -q "FailureModeRegistryPreview" src/components/sections/results.tsx 2>/dev/null; then
  echo "  PASS: FailureModeRegistryPreview still mounted on results.tsx"
  PASS=$((PASS + 1))
else
  echo "  FAIL: FailureModeRegistryPreview removed from results.tsx"
  FAIL=$((FAIL + 1))
fi

# Check 28: FrontlineSupportArchitectureDiagram still mounted on service-page-client.tsx
if grep -q "FrontlineSupportArchitectureDiagram" src/components/ui/service-page-client.tsx 2>/dev/null; then
  echo "  PASS: FrontlineSupportArchitectureDiagram still mounted on service-page-client.tsx"
  PASS=$((PASS + 1))
else
  echo "  FAIL: FrontlineSupportArchitectureDiagram removed from service-page-client.tsx"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# D1.5 REGRESSIONS
# ============================================================

# Check 29: shadow-2xl absent from service-page-client (D1.5 Track 3)
if grep -q "shadow-2xl" src/components/ui/service-page-client.tsx 2>/dev/null; then
  echo "  FAIL: shadow-2xl reintroduced in service-page-client.tsx (D1.5 regression)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: shadow-2xl absent from service-page-client.tsx (D1.5 intact)"
  PASS=$((PASS + 1))
fi

# Check 30: border-2 absent from systems/page.tsx (D1.5 Track 2)
if grep -q "border-2" src/app/systems/page.tsx 2>/dev/null; then
  echo "  FAIL: border-2 reintroduced in systems/page.tsx (D1.5 regression)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: border-2 absent from systems/page.tsx (D1.5 intact)"
  PASS=$((PASS + 1))
fi

# ============================================================
# PRIOR-PHASE REGRESSIONS
# ============================================================

# Check 31: Phase A Raystrat blue token intact
if grep -q -- "--primary: 214 98% 40%" src/app/globals.css 2>/dev/null; then
  echo "  PASS: Phase A Raystrat blue token intact"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Phase A Raystrat blue token regressed"
  FAIL=$((FAIL + 1))
fi

# Check 32: Phase B card primitive intact
if grep -q "rounded-md border bg-card" src/components/ui/card.tsx 2>/dev/null; then
  echo "  PASS: Phase B card primitive intact"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Phase B card primitive regressed"
  FAIL=$((FAIL + 1))
fi

# Check 33: Phase B animate-ping absent site-wide
if grep -rq "animate-ping" src/components/ 2>/dev/null; then
  echo "  FAIL: animate-ping reintroduced site-wide (Phase B regression)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: animate-ping absent site-wide"
  PASS=$((PASS + 1))
fi

# Check 34: Phase C ThemeToggle absent from header
if grep -q "ThemeToggle" src/components/header.tsx 2>/dev/null; then
  echo "  FAIL: ThemeToggle re-entered header (Phase C regression)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: ThemeToggle absent from header (Phase C intact)"
  PASS=$((PASS + 1))
fi

# Check 35: Phase C institutional anchors intact in footer
if grep -q "Principal" src/components/footer.tsx 2>/dev/null \
   && grep -q "Documentation" src/components/footer.tsx 2>/dev/null \
   && grep -q "Continuity" src/components/footer.tsx 2>/dev/null; then
  echo "  PASS: Phase C institutional anchors intact in footer"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Phase C institutional anchors regressed"
  FAIL=$((FAIL + 1))
fi

echo ""
echo "012-d2 result: ${PASS} pass, ${FAIL} fail"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
exit 0
