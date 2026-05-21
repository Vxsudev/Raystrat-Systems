#!/usr/bin/env bash
# 014-phase-e-audit-surface-foundation.sh — Phase E Verification
# Verifies the Phase E AUDIT_SURFACE_FOUNDATION implementation:
#   - Canonical /audit engagement surface
#   - Mounts deployment-lifecycle-diagram + failure-mode-registry-preview
#   - Documentary register preserved
#   - No forbidden visual patterns / no theater
#   - No new trust surfaces, no new artifacts, no homepage clutter
#   - Positioning invariant preserved
# Plus prior-phase regression checks (D, D1.5, D2, D2.5).

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
cd "${REPO_ROOT}"

PASS=0
FAIL=0

echo "014-phase-e: Raystrat Phase E Audit Surface Foundation Verification"
echo ""

AUDIT_FILE="src/app/audit/page.tsx"
DIAG_DIR="src/components/diagrams"
HEADER_FILE="src/components/header.tsx"
FOOTER_FILE="src/components/footer.tsx"

# ============================================================
# ROUTE PRESENCE
# ============================================================

# Check 1: /audit route file exists
if [ -f "${AUDIT_FILE}" ]; then
  echo "  PASS: src/app/audit/page.tsx exists"
  PASS=$((PASS + 1))
else
  echo "  FAIL: src/app/audit/page.tsx missing"
  FAIL=$((FAIL + 1))
fi

# Check 2: /audit page exports default AuditPage (or default component)
if grep -qE "export default function AuditPage|export default.*AuditPage" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  PASS: /audit page exports default AuditPage"
  PASS=$((PASS + 1))
else
  echo "  FAIL: /audit page missing default export"
  FAIL=$((FAIL + 1))
fi

# Check 3: /audit page declares metadata (title, description)
if grep -q "export const metadata" "${AUDIT_FILE}" 2>/dev/null \
   && grep -q "Operational Audit" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  PASS: /audit page declares metadata with operational audit title"
  PASS=$((PASS + 1))
else
  echo "  FAIL: /audit page missing metadata"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# CANONICAL ARTIFACT MOUNTS
# ============================================================

# Check 4: Deployment Lifecycle Diagram imported and mounted on /audit (canonical home)
if grep -q "DeploymentLifecycleDiagram" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  PASS: DeploymentLifecycleDiagram mounted on /audit (canonical home)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: DeploymentLifecycleDiagram not mounted on /audit"
  FAIL=$((FAIL + 1))
fi

# Check 5: Failure Mode Registry Preview integrated in /audit deliverables section
if grep -q "FailureModeRegistryPreview" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  PASS: FailureModeRegistryPreview integrated on /audit"
  PASS=$((PASS + 1))
else
  echo "  FAIL: FailureModeRegistryPreview not integrated on /audit"
  FAIL=$((FAIL + 1))
fi

# Check 6: CalendlyButton present (single restrained CTA)
if grep -q "CalendlyButton" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  PASS: CalendlyButton present (single restrained CTA)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: CalendlyButton missing"
  FAIL=$((FAIL + 1))
fi

# Check 7: Exactly one CalendlyButton instance (single-CTA discipline)
CTA_COUNT=$(grep -c "<CalendlyButton" "${AUDIT_FILE}" 2>/dev/null || echo "0")
if [ "$CTA_COUNT" -eq 1 ]; then
  echo "  PASS: exactly one CalendlyButton instance (single-CTA discipline)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: ${CTA_COUNT} CalendlyButton instances found (expected 1)"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# DOCUMENTARY REGISTER
# ============================================================

# Check 8: Page renders Header + Footer (institutional layout chrome)
if grep -q "<Header" "${AUDIT_FILE}" 2>/dev/null \
   && grep -q "<Footer" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  PASS: /audit renders Header and Footer chrome"
  PASS=$((PASS + 1))
else
  echo "  FAIL: /audit missing Header or Footer"
  FAIL=$((FAIL + 1))
fi

# Check 9: Documentary structure — page uses semantic <section> elements
SECTION_COUNT=$(grep -c "<section" "${AUDIT_FILE}" 2>/dev/null || echo "0")
if [ "$SECTION_COUNT" -ge 6 ]; then
  echo "  PASS: /audit uses ${SECTION_COUNT} semantic section elements (documentary structure)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: /audit has only ${SECTION_COUNT} section elements (expected >=6)"
  FAIL=$((FAIL + 1))
fi

# Check 10: Documentary structure — page uses tables or structured lists
if grep -qE "<table|<dl|<thead" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  PASS: /audit uses structured tables / definition lists (documentary)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: /audit missing structured tables / dl (documentary format)"
  FAIL=$((FAIL + 1))
fi

# Check 11: Engagement Boundary section present (client/Raystrat contrast)
if grep -q "Client retains" "${AUDIT_FILE}" 2>/dev/null \
   && grep -q "Raystrat governs" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  PASS: engagement boundary section names client/Raystrat scopes"
  PASS=$((PASS + 1))
else
  echo "  FAIL: engagement boundary section missing client/Raystrat contrast"
  FAIL=$((FAIL + 1))
fi

# Check 12: Page carries 'Not a demo. Not a trial.' disclaimer (institutional register)
if grep -q "Not a demo. Not a trial" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  PASS: /audit carries institutional disclaimer"
  PASS=$((PASS + 1))
else
  echo "  FAIL: /audit missing institutional disclaimer"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# ANTI-THEATER — visual hygiene
# ============================================================

# Check 13: No gradients on /audit
if grep -qE "bg-gradient-|gradient-to-|linearGradient|radialGradient" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  FAIL: /audit contains gradient (forbidden)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: /audit free of gradients"
  PASS=$((PASS + 1))
fi

# Check 14: No backdrop-blur / glassmorphism on /audit
if grep -qE "backdrop-blur|backdrop-filter" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  FAIL: /audit contains backdrop-blur (forbidden)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: /audit free of glassmorphism"
  PASS=$((PASS + 1))
fi

# Check 15: No shadow theatrics on /audit
if grep -qE "shadow-2xl|shadow-primary|drop-shadow-" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  FAIL: /audit contains shadow theatrics"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: /audit free of shadow theatrics"
  PASS=$((PASS + 1))
fi

# Check 16: No decorative animation on /audit
if grep -qE "animate-pulse|animate-ping|animate-bounce|animate-spin" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  FAIL: /audit contains decorative animation"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: /audit free of decorative animation"
  PASS=$((PASS + 1))
fi

# Check 17: No hover scale/rotate theatrics on /audit
if grep -qE "hover:scale-|hover:rotate-|group-hover:scale-|group-hover:rotate-" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  FAIL: /audit contains hover scale/rotate theatrics"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: /audit free of hover scale/rotate theatrics"
  PASS=$((PASS + 1))
fi

# Check 18: No icon spam — /audit imports no lucide-react icons
if grep -q "from 'lucide-react'" "${AUDIT_FILE}" 2>/dev/null \
   || grep -q "from \"lucide-react\"" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  FAIL: /audit imports lucide-react icons (icon spam)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: /audit free of icon imports"
  PASS=$((PASS + 1))
fi

# Check 19: No animation/3D library imports on /audit
if grep -qE "from 'lottie|from \"lottie|from '@splinetool|from \"@splinetool|from 'react-spring|from \"react-spring" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  FAIL: /audit imports an animation/3D library"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: /audit free of animation/3D library imports"
  PASS=$((PASS + 1))
fi

# ============================================================
# DASHBOARD COSPLAY — no fake-live / fake-telemetry
# ============================================================

# Check 20: No fake-live / dashboard cosplay strings on /audit
# (\bLIVE\b avoids matching DELIVERABLES; case-insensitive for prose tokens like "uptime guarantee")
if grep -qE "\\bLIVE\\b|🟢|System Status:" "${AUDIT_FILE}" 2>/dev/null \
   || grep -qiE "real-time|99\\.9%|100% uptime|uptime guarantee" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  FAIL: /audit contains dashboard cosplay / fake-telemetry string"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: /audit free of dashboard cosplay strings"
  PASS=$((PASS + 1))
fi

# ============================================================
# AI-AGENCY / STARTUP COPY ANTI-PATTERNS
# ============================================================

# Check 21: No AI-agency / startup language on /audit
if grep -qiE "supercharge|unlock growth|scale faster|transform your operations|cutting-edge ai|next-gen|ai-powered|ai agents|revolutionize" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  FAIL: /audit contains AI-agency / startup language"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: /audit free of AI-agency / startup language"
  PASS=$((PASS + 1))
fi

# Check 22: No urgency manipulation on /audit
if grep -qiE "Limited time|Hurry|Book now|Limited audit availability|slots run out|countdown|book this week|only [0-9]+ left|act fast" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  FAIL: /audit contains urgency manipulation"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: /audit free of urgency manipulation"
  PASS=$((PASS + 1))
fi

# Check 23: No "fake enterprise" patterns on /audit
if grep -qiE "Trusted by|As featured in|Y Combinator|Backed by|Built with|Fortune 500|Get a quote|Talk to sales|Free trial|Schedule a demo" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  FAIL: /audit contains fake-enterprise pattern"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: /audit free of fake-enterprise patterns"
  PASS=$((PASS + 1))
fi

# ============================================================
# PROCUREMENT / COMPLIANCE OVERCLAIM
# ============================================================

# Check 24: No compliance certification overclaim on /audit
# (must not claim SOC 2 / ISO 27001 / HIPAA-compliant / PCI DSS compliance the company does not hold)
if grep -qE "SOC 2 (certified|compliant)|ISO 27001 (certified|compliant)|HIPAA-compliant|PCI DSS (certified|compliant)|GDPR-compliant" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  FAIL: /audit contains compliance certification overclaim"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: /audit free of compliance certification overclaim"
  PASS=$((PASS + 1))
fi

# Check 25: No pricing on /audit (engagement-bound per spec §42.8)
if grep -qE "\\\$[0-9]+|/month|/yr|/year|Starter|Pro tier|Enterprise tier|pricing tier" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  FAIL: /audit contains pricing copy (forbidden on marketing surface)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: /audit free of pricing copy"
  PASS=$((PASS + 1))
fi

# ============================================================
# SCOPE DISCIPLINE — no new artifacts, no new routes, no homepage clutter
# ============================================================

# Check 26: Diagrams dir unchanged (no new evidence artifacts invented)
EXPECTED_DIAGRAMS=5
ACTUAL_DIAGRAMS=$(find "${DIAG_DIR}" -name "*.tsx" 2>/dev/null | wc -l | tr -d ' ')
if [ "$ACTUAL_DIAGRAMS" -eq "$EXPECTED_DIAGRAMS" ]; then
  echo "  PASS: diagrams dir unchanged at ${EXPECTED_DIAGRAMS} files (no new artifacts)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: diagrams dir has ${ACTUAL_DIAGRAMS} files, expected ${EXPECTED_DIAGRAMS}"
  FAIL=$((FAIL + 1))
fi

# Check 27: No new out-of-scope trust/procurement routes created
SCOPE_CREEP=0
for route in trust-center compliance sla escalation cases case-studies pricing blueprint architecture engagement; do
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

# Check 28: No new section files added to src/components/sections/ (homepage IA not bloated)
# Updated to 11: governance.tsx added in homepage-design-v2 (authorized in spec)
EXPECTED_SECTIONS=11
ACTUAL_SECTIONS=$(find src/components/sections -name "*.tsx" 2>/dev/null | wc -l | tr -d ' ')
if [ "$ACTUAL_SECTIONS" -eq "$EXPECTED_SECTIONS" ]; then
  echo "  PASS: src/components/sections unchanged at ${EXPECTED_SECTIONS} files"
  PASS=$((PASS + 1))
else
  echo "  FAIL: src/components/sections has ${ACTUAL_SECTIONS} files, expected ${EXPECTED_SECTIONS}"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# ROUTE LINKAGE — single restrained linkage in footer only
# ============================================================

# Check 29: Footer contains /audit link (single restrained linkage)
if grep -q "/audit" "${FOOTER_FILE}" 2>/dev/null; then
  echo "  PASS: footer carries /audit institutional link"
  PASS=$((PASS + 1))
else
  echo "  FAIL: footer missing /audit institutional link"
  FAIL=$((FAIL + 1))
fi

# Check 30: Header NOT modified — header has no /audit reference (single linkage discipline)
if grep -q "/audit" "${HEADER_FILE}" 2>/dev/null; then
  echo "  FAIL: header contains /audit reference (header should remain unmodified)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: header free of /audit reference (single linkage discipline)"
  PASS=$((PASS + 1))
fi

# Check 31: navigationLinks in content.ts NOT mutated to include /audit
if grep -A 6 "export const navigationLinks" src/data/content.ts 2>/dev/null | grep -q "/audit"; then
  echo "  FAIL: navigationLinks mutated to include /audit (navbar clutter)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: navigationLinks unchanged (no navbar clutter)"
  PASS=$((PASS + 1))
fi

# ============================================================
# POSITIONING INVARIANT — single CTA preserved sitewide
# ============================================================

# Check 32: Single canonical CTA copy ("Book Operational Audit") present on /audit
if grep -q "Book Operational Audit" "${AUDIT_FILE}" 2>/dev/null; then
  echo "  PASS: canonical CTA copy 'Book Operational Audit' preserved on /audit"
  PASS=$((PASS + 1))
else
  echo "  FAIL: canonical CTA copy missing on /audit"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# D2 MOUNT INTEGRITY — diagrams remain on prior surfaces
# ============================================================

# Check 33: AuditTrailEntryPreview still mounted on agent-advantage.tsx (D2 intact)
if grep -q "AuditTrailEntryPreview" src/components/sections/agent-advantage.tsx 2>/dev/null; then
  echo "  PASS: AuditTrailEntryPreview still mounted on agent-advantage.tsx"
  PASS=$((PASS + 1))
else
  echo "  FAIL: AuditTrailEntryPreview removed from agent-advantage.tsx (D2 regression)"
  FAIL=$((FAIL + 1))
fi

# Check 34: DeploymentLifecycleDiagram still mounted on results.tsx (homepage evidence retained)
if grep -q "DeploymentLifecycleDiagram" src/components/sections/results.tsx 2>/dev/null; then
  echo "  PASS: DeploymentLifecycleDiagram still mounted on results.tsx"
  PASS=$((PASS + 1))
else
  echo "  FAIL: DeploymentLifecycleDiagram removed from results.tsx"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# PRIOR-PHASE REGRESSIONS
# ============================================================

# Check 35: Phase A Raystrat blue token intact
if grep -q -- "--primary: 214 98% 40%" src/app/globals.css 2>/dev/null; then
  echo "  PASS: Phase A Raystrat blue token intact"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Phase A Raystrat blue token regressed"
  FAIL=$((FAIL + 1))
fi

# Check 36: Phase B card primitive intact
if grep -q "rounded-md border bg-card" src/components/ui/card.tsx 2>/dev/null; then
  echo "  PASS: Phase B card primitive intact"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Phase B card primitive regressed"
  FAIL=$((FAIL + 1))
fi

# Check 37: Phase B animate-ping absent site-wide
if grep -rq "animate-ping" src/components/ 2>/dev/null; then
  echo "  FAIL: animate-ping reintroduced (Phase B regression)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: animate-ping absent site-wide"
  PASS=$((PASS + 1))
fi

# Check 38: Phase C ThemeToggle absent from header
if grep -q "ThemeToggle" "${HEADER_FILE}" 2>/dev/null; then
  echo "  FAIL: ThemeToggle re-entered header (Phase C regression)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: ThemeToggle absent from header (Phase C intact)"
  PASS=$((PASS + 1))
fi

# Check 39: D1.5 shadow-2xl absent from service-page-client
if grep -q "shadow-2xl" src/components/ui/service-page-client.tsx 2>/dev/null; then
  echo "  FAIL: shadow-2xl reintroduced in service-page-client.tsx (D1.5 regression)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: shadow-2xl absent from service-page-client.tsx (D1.5 intact)"
  PASS=$((PASS + 1))
fi

# Check 40: D2.5 — AE-xxx / SYS-xxx / AUDIT-TRAIL-FORMAT-v absent from audit-trail preview
if grep -qE "AE-DEM|AE-PUR|AE-SUP|SYS-DEM|SYS-PUR|SYS-SUP|AUDIT-TRAIL-FORMAT-v" "${DIAG_DIR}/audit-trail-entry-preview.tsx" 2>/dev/null; then
  echo "  FAIL: D2.5 simplification regressed in audit-trail-entry-preview.tsx"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: D2.5 simplification intact (no internal notation)"
  PASS=$((PASS + 1))
fi

echo ""
echo "014-phase-e result: ${PASS} pass, ${FAIL} fail"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
exit 0
