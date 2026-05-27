#!/usr/bin/env bash
# 013-d2-5-evidence-cognition-simplification.sh — D2.5 Verification
# Verifies the D2.5 evidence cognition simplification pass:
#  Track 1: Audit Trail Entry Preview — internal notation removed
#  Track 2: Deployment Lifecycle Diagram — stage IDs removed
# No new artifacts. No new trust surfaces. Density + language stabilization only.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
cd "${REPO_ROOT}"

PASS=0
FAIL=0

echo "013-d2-5: Raystrat D2.5 Evidence Cognition Simplification Verification"
echo ""

DIAG_DIR="src/components/diagrams"
AUDIT_FILE="${DIAG_DIR}/audit-trail-entry-preview.tsx"
LIFECYCLE_FILE="${DIAG_DIR}/deployment-lifecycle-diagram.tsx"

# ============================================================
# TRACK 1 — AUDIT TRAIL NOTATION REMOVAL
# ============================================================

# Check 1: No AE-xxx entry IDs in audit trail preview
if grep -qE "AE-DEM|AE-PUR|AE-SUP|AE-[A-Z]+-[0-9]+" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  FAIL: audit-trail-entry-preview.tsx contains AE-xxx entry ID notation"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: AE-xxx entry ID notation removed from audit trail preview"
  PASS=$((PASS + 1))
fi

# Check 2: No SYS-xxx system identifiers in audit trail preview
if grep -qE "SYS-DEM|SYS-PUR|SYS-SUP|SYS-[A-Z]+-[0-9]+" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  FAIL: audit-trail-entry-preview.tsx contains SYS-xxx system identifier notation"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: SYS-xxx system identifier notation removed from audit trail preview"
  PASS=$((PASS + 1))
fi

# Check 3: No AUDIT-TRAIL-FORMAT-v version stamp in audit trail preview
if grep -q "AUDIT-TRAIL-FORMAT-v" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  FAIL: audit-trail-entry-preview.tsx contains AUDIT-TRAIL-FORMAT-v version stamp"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: AUDIT-TRAIL-FORMAT-v version stamp removed from audit trail preview"
  PASS=$((PASS + 1))
fi

# Check 4: No CTX-[redacted] context references in audit trail preview
if grep -q "CTX-" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  FAIL: audit-trail-entry-preview.tsx contains CTX- context reference notation"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: CTX- context reference notation removed from audit trail preview"
  PASS=$((PASS + 1))
fi

# Check 5: No dot-notation action class strings in audit trail preview
if grep -qE "demand\.|pursuit\.|support\." "${AUDIT_FILE}" 2>/dev/null; then
  echo "  FAIL: audit-trail-entry-preview.tsx contains dot-notation action class strings"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: dot-notation action class strings removed from audit trail preview"
  PASS=$((PASS + 1))
fi

# Check 6: Audit trail preview retains 'Schematic' disclosure
if grep -q "Schematic" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  PASS: audit-trail-entry-preview.tsx retains 'Schematic' disclosure"
  PASS=$((PASS + 1))
else
  echo "  FAIL: audit-trail-entry-preview.tsx missing 'Schematic' disclosure"
  FAIL=$((FAIL + 1))
fi

# Check 7: Audit trail preview retains font-mono for timestamp
if grep -q "font-mono" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  PASS: audit-trail-entry-preview.tsx retains font-mono treatment"
  PASS=$((PASS + 1))
else
  echo "  FAIL: audit-trail-entry-preview.tsx missing font-mono treatment"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# TRACK 2 — DEPLOYMENT LIFECYCLE NOTATION REMOVAL
# ============================================================

# Check 8: No DL-01 through DL-06 stage notation in lifecycle diagram
if grep -qE "DL-0[1-6]" "${LIFECYCLE_FILE}" 2>/dev/null; then
  echo "  FAIL: deployment-lifecycle-diagram.tsx contains DL-0x stage notation"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: DL-0x stage notation removed from deployment lifecycle diagram"
  PASS=$((PASS + 1))
fi

# Check 9: Deployment lifecycle still contains all 6 stage names
STAGE_MISSING=0
for stage in "OPERATIONAL AUDIT" "ARCHITECTURE REVIEW" "BUILD" "DEPLOYMENT" "GOVERNANCE RUN" "CONTINUITY REVIEW"; do
  if ! grep -q "${stage}" "${LIFECYCLE_FILE}" 2>/dev/null; then
    STAGE_MISSING=$((STAGE_MISSING + 1))
    echo "    (missing stage name: ${stage})"
  fi
done
if [ "$STAGE_MISSING" -eq 0 ]; then
  echo "  PASS: deployment lifecycle diagram retains all six stage names"
  PASS=$((PASS + 1))
else
  echo "  FAIL: ${STAGE_MISSING} stage name(s) missing from deployment lifecycle diagram"
  FAIL=$((FAIL + 1))
fi

# Check 10: Deployment lifecycle retains primary accent on governed arc
if grep -q "fill-primary" "${LIFECYCLE_FILE}" 2>/dev/null; then
  echo "  PASS: deployment lifecycle diagram retains primary accent on governed arc"
  PASS=$((PASS + 1))
else
  echo "  FAIL: deployment lifecycle diagram missing primary accent"
  FAIL=$((FAIL + 1))
fi

# Check 11: Deployment lifecycle retains <title> for a11y
if grep -q "<title" "${LIFECYCLE_FILE}" 2>/dev/null; then
  echo "  PASS: deployment lifecycle diagram retains <title> for a11y"
  PASS=$((PASS + 1))
else
  echo "  FAIL: deployment lifecycle diagram missing <title>"
  FAIL=$((FAIL + 1))
fi

# Check 12: Deployment lifecycle retains 'Schematic' disclosure in figcaption
if grep -q "Schematic" "${LIFECYCLE_FILE}" 2>/dev/null; then
  echo "  PASS: deployment lifecycle diagram retains 'Schematic' disclosure"
  PASS=$((PASS + 1))
else
  echo "  FAIL: deployment lifecycle diagram missing 'Schematic' disclosure"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# D2 ARTIFACT MOUNT INTEGRITY
# ============================================================

# Check 13: AuditTrailEntryPreview still mounted on agent-advantage.tsx
if grep -q "AuditTrailEntryPreview" src/components/sections/agent-advantage.tsx 2>/dev/null; then
  echo "  PASS: AuditTrailEntryPreview still mounted on agent-advantage.tsx"
  PASS=$((PASS + 1))
else
  echo "  FAIL: AuditTrailEntryPreview removed from agent-advantage.tsx"
  FAIL=$((FAIL + 1))
fi

# Check 14: DeploymentLifecycleDiagram still mounted on results.tsx
if grep -q "DeploymentLifecycleDiagram" src/components/sections/results.tsx 2>/dev/null; then
  echo "  PASS: DeploymentLifecycleDiagram still mounted on results.tsx"
  PASS=$((PASS + 1))
else
  echo "  FAIL: DeploymentLifecycleDiagram removed from results.tsx"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# NO EXPANSION — no new trust surfaces or artifacts
# ============================================================

# Check 15: No new routes created
SCOPE_CREEP=0
for route in trust-center compliance sla escalation cases case-studies pricing blueprint architecture; do
  if [ -f "src/app/${route}/page.tsx" ]; then
    SCOPE_CREEP=$((SCOPE_CREEP + 1))
    echo "    (scope creep route: /${route})"
  fi
done
if [ "$SCOPE_CREEP" -eq 0 ]; then
  echo "  PASS: no new trust/procurement routes created"
  PASS=$((PASS + 1))
else
  echo "  FAIL: ${SCOPE_CREEP} out-of-scope route(s) detected"
  FAIL=$((FAIL + 1))
fi

# Check 16: Diagrams dir still has exactly 5 files (no new diagrams added)
EXPECTED_DIAGRAMS=5
ACTUAL_DIAGRAMS=$(find "${DIAG_DIR}" -name "*.tsx" 2>/dev/null | wc -l | tr -d ' ')
if [ "$ACTUAL_DIAGRAMS" -eq "$EXPECTED_DIAGRAMS" ]; then
  echo "  PASS: diagrams dir unchanged at ${EXPECTED_DIAGRAMS} files (no new artifacts)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: diagrams dir has ${ACTUAL_DIAGRAMS} files, expected ${EXPECTED_DIAGRAMS}"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# ANTI-THEATER — no new theater introduced
# ============================================================

# Check 17: No animation in D2.5 modified files
if grep -rqE "animate-pulse|animate-ping|animate-bounce|animate-spin" \
  "${AUDIT_FILE}" "${LIFECYCLE_FILE}" 2>/dev/null; then
  echo "  FAIL: D2.5 files contain decorative animation classes"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: D2.5 files free of decorative animation classes"
  PASS=$((PASS + 1))
fi

# ============================================================
# D1 ARTIFACT INTEGRITY
# ============================================================

# Check 18: All D1 diagram components intact
if [ -f "${DIAG_DIR}/governance-layer-diagram.tsx" ] \
   && [ -f "${DIAG_DIR}/failure-mode-registry-preview.tsx" ] \
   && [ -f "${DIAG_DIR}/frontline-support-architecture-diagram.tsx" ]; then
  echo "  PASS: all D1 diagram components intact"
  PASS=$((PASS + 1))
else
  echo "  FAIL: one or more D1 diagram components missing"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# PRIOR-PHASE REGRESSIONS
# ============================================================

# Check 19: Phase A Raystrat blue token intact
if grep -q -- "--primary: 214 98% 40%" src/app/globals.css 2>/dev/null; then
  echo "  PASS: Phase A Raystrat blue token intact"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Phase A Raystrat blue token regressed"
  FAIL=$((FAIL + 1))
fi

# Check 20: Phase C ThemeToggle absent from header
if grep -q "ThemeToggle" src/components/header.tsx 2>/dev/null; then
  echo "  FAIL: ThemeToggle re-entered header (Phase C regression)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: ThemeToggle absent from header (Phase C intact)"
  PASS=$((PASS + 1))
fi

# Check 21: D1.5 shadow-2xl absent from service-page-client
if grep -q "shadow-2xl" src/components/ui/service-page-client.tsx 2>/dev/null; then
  echo "  FAIL: shadow-2xl reintroduced in service-page-client.tsx (D1.5 regression)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: shadow-2xl absent from service-page-client.tsx (D1.5 intact)"
  PASS=$((PASS + 1))
fi

# Check 22: D1.5 border-2 absent from systems/page.tsx
if grep -q "border-2" src/app/systems/page.tsx 2>/dev/null; then
  echo "  FAIL: border-2 reintroduced in systems/page.tsx (D1.5 regression)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: border-2 absent from systems/page.tsx (D1.5 intact)"
  PASS=$((PASS + 1))
fi

echo ""
echo "013-d2-5 result: ${PASS} pass, ${FAIL} fail"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
exit 0
