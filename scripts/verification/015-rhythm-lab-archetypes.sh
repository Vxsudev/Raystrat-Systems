#!/usr/bin/env bash
# 015-rhythm-lab-archetypes.sh — Rhythm Lab Archetypes Verification
# Verifies the RHYTHM_LAB_ARCHETYPES directive:
#   Branch: rhythm-lab-archetypes
#   Route: /rhythm-lab (lab-only, not in public nav)
#   5 archetypes present, labeled, structurally distinct
#   No production surface mutations
#   No forbidden visual patterns

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
cd "${REPO_ROOT}"

PASS=0
FAIL=0

echo "015-rhythm-lab: Raystrat Rhythm Lab Archetypes Verification"
echo ""

LAB_FILE="src/app/rhythm-lab/page.tsx"

# ============================================================
# BRANCH DISCIPLINE
# ============================================================

# Check 1: Currently on rhythm-lab branch family (archetypes / detheatricalization descendant / main)
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
case "${CURRENT_BRANCH}" in
  rhythm-lab-archetypes|feature/rhythm-lab-detheatricalization|rhythm-lab-decosplay-pass|feature/above-fold-authority-pass|feature/hide-deferred-legal-trust-surfaces|main)
    echo "  PASS: on rhythm-lab branch family (${CURRENT_BRANCH})"
    PASS=$((PASS + 1))
    ;;
  *)
    echo "  FAIL: expected rhythm-lab branch family, got ${CURRENT_BRANCH}"
    FAIL=$((FAIL + 1))
    ;;
esac

# ============================================================
# ROUTE PRESENCE
# ============================================================

# Check 2: /rhythm-lab route file exists
if [ -f "${LAB_FILE}" ]; then
  echo "  PASS: /rhythm-lab route exists at ${LAB_FILE}"
  PASS=$((PASS + 1))
else
  echo "  FAIL: /rhythm-lab route missing (${LAB_FILE})"
  FAIL=$((FAIL + 1))
fi

# Check 3: robots noindex set on lab page
if grep -q "index: false" "${LAB_FILE}" 2>/dev/null || grep -qiE "index.*false|noindex" "${LAB_FILE}" 2>/dev/null; then
  echo "  PASS: /rhythm-lab page has robots noindex"
  PASS=$((PASS + 1))
else
  echo "  FAIL: /rhythm-lab page missing robots noindex"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# 5 ARCHETYPES PRESENT
# ============================================================

# Check 4: Archetype 1 Editorial Doctrine present
if grep -qi "editorial" "${LAB_FILE}" 2>/dev/null && \
   grep -qi "archetype" "${LAB_FILE}" 2>/dev/null; then
  echo "  PASS: Archetype 1 (Editorial Doctrine) present"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Archetype 1 (Editorial Doctrine) missing"
  FAIL=$((FAIL + 1))
fi

# Check 5: Archetype 2 Documentary Artifact present
if grep -qi "documentary" "${LAB_FILE}" 2>/dev/null; then
  echo "  PASS: Archetype 2 (Documentary Artifact) present"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Archetype 2 (Documentary Artifact) missing"
  FAIL=$((FAIL + 1))
fi

# Check 6: Archetype 3 Architecture Exhibition present
if grep -qi "exhibition\|architecture exhibition" "${LAB_FILE}" 2>/dev/null; then
  echo "  PASS: Archetype 3 (Architecture Exhibition) present"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Archetype 3 (Architecture Exhibition) missing"
  FAIL=$((FAIL + 1))
fi

# Check 7: Archetype 4 Governance Matrix present
if grep -qi "matrix\|governance matrix" "${LAB_FILE}" 2>/dev/null; then
  echo "  PASS: Archetype 4 (Governance Matrix) present"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Archetype 4 (Governance Matrix) missing"
  FAIL=$((FAIL + 1))
fi

# Check 8: Archetype 5 Transitional Reset present
if grep -qi "transitional\|transitional reset" "${LAB_FILE}" 2>/dev/null; then
  echo "  PASS: Archetype 5 (Transitional Reset) present"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Archetype 5 (Transitional Reset) missing"
  FAIL=$((FAIL + 1))
fi

# Check 9: All 5 archetype IDs labeled (archetype-01 through 05 or similar)
ARCHETYPE_COUNT=$(grep -ciE "archetype.?0[1-5]|archetype\s+0[1-5]" "${LAB_FILE}" 2>/dev/null || echo "0")
if [ "${ARCHETYPE_COUNT}" -ge 5 ] 2>/dev/null; then
  echo "  PASS: all 5 archetype labels found"
  PASS=$((PASS + 1))
else
  echo "  FAIL: fewer than 5 archetype labels found (found: ${ARCHETYPE_COUNT})"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# NOT IN PUBLIC NAV
# ============================================================

# Check 10: /rhythm-lab not in header nav
if grep -q "rhythm-lab" src/components/header.tsx 2>/dev/null; then
  echo "  FAIL: /rhythm-lab link found in header.tsx (lab must not be in public nav)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: /rhythm-lab absent from header nav"
  PASS=$((PASS + 1))
fi

# Check 11: /rhythm-lab not in footer nav
if grep -q "rhythm-lab" src/components/footer.tsx 2>/dev/null; then
  echo "  FAIL: /rhythm-lab link found in footer.tsx (lab must not be in public nav)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: /rhythm-lab absent from footer nav"
  PASS=$((PASS + 1))
fi

# Check 12: /rhythm-lab not in homepage
if grep -q "rhythm-lab" src/app/page.tsx 2>/dev/null; then
  echo "  FAIL: /rhythm-lab link found in homepage (lab must not be on production surfaces)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: /rhythm-lab absent from homepage"
  PASS=$((PASS + 1))
fi

# ============================================================
# NO PRODUCTION SURFACE MUTATIONS
# ============================================================

# Check 13: Homepage sections unchanged (count vs baseline)
HOMEPAGE_SECTIONS=$(grep -c "^import " src/app/page.tsx 2>/dev/null || echo "0")
# Just verify the homepage hasn't had rhythm-lab content injected
if grep -qiE "rhythm|lab|archetype" src/app/page.tsx 2>/dev/null; then
  echo "  FAIL: rhythm-lab content detected in homepage (production mutation)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: homepage free of rhythm-lab content"
  PASS=$((PASS + 1))
fi

# Check 14: /audit page untouched
if grep -qiE "rhythm|lab|archetype" src/app/audit/page.tsx 2>/dev/null; then
  echo "  FAIL: rhythm-lab content detected in /audit page (production mutation)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: /audit page free of rhythm-lab content"
  PASS=$((PASS + 1))
fi

# Check 15: Diagrams directory unchanged (still exactly 5 files)
EXPECTED_DIAGRAMS=5
ACTUAL_DIAGRAMS=$(find src/components/diagrams -name "*.tsx" 2>/dev/null | wc -l | tr -d ' ')
if [ "${ACTUAL_DIAGRAMS}" -eq "${EXPECTED_DIAGRAMS}" ]; then
  echo "  PASS: diagrams dir unchanged at ${EXPECTED_DIAGRAMS} files"
  PASS=$((PASS + 1))
else
  echo "  FAIL: diagrams dir has ${ACTUAL_DIAGRAMS} files, expected ${EXPECTED_DIAGRAMS}"
  FAIL=$((FAIL + 1))
fi

# Check 16: Sections directory baseline (rhythm-lab must not add production sections)
# 10: decosplay pass deleted results.tsx + failure-mode-registry.tsx from homepage
EXPECTED_SECTIONS=10
ACTUAL_SECTIONS=$(find src/components/sections -name "*.tsx" 2>/dev/null | wc -l | tr -d ' ')
if [ "${ACTUAL_SECTIONS}" -eq "${EXPECTED_SECTIONS}" ]; then
  echo "  PASS: sections dir unchanged at ${EXPECTED_SECTIONS} files"
  PASS=$((PASS + 1))
else
  echo "  FAIL: sections dir has ${ACTUAL_SECTIONS} files, expected ${EXPECTED_SECTIONS}"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# ANTI-THEATER — FORBIDDEN VISUAL PATTERNS IN LAB
# ============================================================

# Check 17: No decorative animation in lab page
if grep -qE "animate-pulse|animate-ping|animate-bounce|animate-spin" "${LAB_FILE}" 2>/dev/null; then
  echo "  FAIL: lab page contains decorative animation classes"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: lab page free of decorative animation"
  PASS=$((PASS + 1))
fi

# Check 18: No Tailwind gradient utilities in lab page
# Checks bg-gradient-, and from-/via-/to- only when preceding a Tailwind color token (lowercase letter)
if grep -qE "bg-gradient-" "${LAB_FILE}" 2>/dev/null || \
   grep -qE "(className|class)=[\"'][^\"']*\bfrom-[a-z]" "${LAB_FILE}" 2>/dev/null || \
   grep -qE "(className|class)=[\"'][^\"']*\bvia-[a-z]" "${LAB_FILE}" 2>/dev/null || \
   grep -qE "(className|class)=[\"'][^\"']*\bto-[a-z]" "${LAB_FILE}" 2>/dev/null; then
  echo "  FAIL: lab page contains Tailwind gradient utility"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: lab page free of Tailwind gradient utilities"
  PASS=$((PASS + 1))
fi

# Check 19: No backdrop blur in lab page
if grep -q "backdrop-blur" "${LAB_FILE}" 2>/dev/null; then
  echo "  FAIL: lab page contains backdrop-blur"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: lab page free of backdrop-blur"
  PASS=$((PASS + 1))
fi

# Check 20: No shadow-2xl in lab page (per D1.5 doctrine)
if grep -q "shadow-2xl" "${LAB_FILE}" 2>/dev/null; then
  echo "  FAIL: lab page contains shadow-2xl"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: lab page free of shadow-2xl"
  PASS=$((PASS + 1))
fi

# Check 21: No parallax or scroll-jacking in lab page
if grep -qiE "parallax|scrolljack|scroll-snap|overflow.*hidden.*scroll" "${LAB_FILE}" 2>/dev/null; then
  echo "  FAIL: lab page contains parallax or scroll-jacking pattern"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: lab page free of parallax/scroll-jacking"
  PASS=$((PASS + 1))
fi

# Check 22: No testimonials/logo walls/pricing in lab page
if grep -qiE "testimonial|logo.wall|pricing.block|price|trusted.by" "${LAB_FILE}" 2>/dev/null; then
  echo "  FAIL: lab page contains testimonial/logo wall/pricing block"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: lab page free of testimonials/logo walls/pricing"
  PASS=$((PASS + 1))
fi

# Check 23: No cyberpunk styling in lab page
if grep -qiE "terminal-green|hacker|neon|cyberpunk" "${LAB_FILE}" 2>/dev/null; then
  echo "  FAIL: lab page contains cyberpunk styling"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: lab page free of cyberpunk styling"
  PASS=$((PASS + 1))
fi

# Check 24: No startup SaaS clichés in lab page copy
if grep -qiE "seamless|effortless|game.chang|disrupt|unlock potential|scale without limits" "${LAB_FILE}" 2>/dev/null; then
  echo "  FAIL: lab page contains startup SaaS cliché copy"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: lab page free of startup SaaS clichés"
  PASS=$((PASS + 1))
fi

# ============================================================
# LAB STRUCTURE INTEGRITY
# ============================================================

# Check 25: Lab identifier bar present (marks it as a lab surface)
if grep -qi "RHYTHM-LAB\|rhythm-lab-archetypes\|design experiment surface\|lab" "${LAB_FILE}" 2>/dev/null; then
  echo "  PASS: lab identifier present in page"
  PASS=$((PASS + 1))
else
  echo "  FAIL: lab identifier missing from page"
  FAIL=$((FAIL + 1))
fi

# Check 26: Archetype sections have aria-label for a11y
ARIA_COUNT=$(grep -c "aria-label" "${LAB_FILE}" 2>/dev/null || echo "0")
if [ "${ARIA_COUNT}" -ge 5 ] 2>/dev/null; then
  echo "  PASS: archetype sections have aria-labels (found: ${ARIA_COUNT})"
  PASS=$((PASS + 1))
else
  echo "  FAIL: fewer than 5 aria-labels on archetype sections (found: ${ARIA_COUNT})"
  FAIL=$((FAIL + 1))
fi

# Check 27: SVG diagram present (archetype 3 exhibition requires schematic)
if grep -q "<svg" "${LAB_FILE}" 2>/dev/null; then
  echo "  PASS: SVG schematic present (Archetype 3 diagram)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: SVG schematic missing (Archetype 3 requires schematic-first layout)"
  FAIL=$((FAIL + 1))
fi

# Check 28: Table elements present (docudmentary + matrix archetypes require tables)
TABLE_COUNT=$(grep -c "<table" "${LAB_FILE}" 2>/dev/null || echo "0")
if [ "${TABLE_COUNT}" -ge 2 ] 2>/dev/null; then
  echo "  PASS: multiple table elements present (documentary + matrix archetypes)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: fewer than 2 table elements (expected in Archetypes 2 and 4)"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# PRIOR-PHASE REGRESSIONS
# ============================================================

# Check 29: Phase A Raystrat blue token intact
if grep -q -- "--primary: 214 98% 40%" src/app/globals.css 2>/dev/null; then
  echo "  PASS: Phase A Raystrat blue token intact"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Phase A Raystrat blue token regressed"
  FAIL=$((FAIL + 1))
fi

# Check 30: Phase C ThemeToggle absent from header
if grep -q "ThemeToggle" src/components/header.tsx 2>/dev/null; then
  echo "  FAIL: ThemeToggle re-entered header (Phase C regression)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: ThemeToggle absent from header (Phase C intact)"
  PASS=$((PASS + 1))
fi

# Check 31: Phase E /audit page still exists
if [ -f "src/app/audit/page.tsx" ]; then
  echo "  PASS: Phase E /audit page intact"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Phase E /audit page removed (Phase E regression)"
  FAIL=$((FAIL + 1))
fi

# Check 32: Operational Audit still in footer institutional links
if grep -q "Operational Audit" src/components/footer.tsx 2>/dev/null; then
  echo "  PASS: Phase E footer link intact"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Phase E footer Operational Audit link removed"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# NO SCOPE CREEP
# ============================================================

# Check 33: No new production routes created by rhythm-lab branch
SCOPE_CREEP=0
for route in trust-center compliance sla escalation cases case-studies pricing blueprint architecture trust; do
  if [ -f "src/app/${route}/page.tsx" ]; then
    SCOPE_CREEP=$((SCOPE_CREEP + 1))
    echo "    (scope creep route: /${route})"
  fi
done
if [ "${SCOPE_CREEP}" -eq 0 ]; then
  echo "  PASS: no out-of-scope production routes created"
  PASS=$((PASS + 1))
else
  echo "  FAIL: ${SCOPE_CREEP} out-of-scope route(s) detected"
  FAIL=$((FAIL + 1))
fi

# Check 34: rhythm-lab route only contains one page file
LAB_FILE_COUNT=$(find src/app/rhythm-lab -name "*.tsx" 2>/dev/null | wc -l | tr -d ' ')
if [ "${LAB_FILE_COUNT}" -ge 1 ] && [ "${LAB_FILE_COUNT}" -le 3 ]; then
  echo "  PASS: rhythm-lab dir has ${LAB_FILE_COUNT} file(s) (expected 1–3)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: rhythm-lab dir has unexpected file count: ${LAB_FILE_COUNT}"
  FAIL=$((FAIL + 1))
fi

echo ""
echo "015-rhythm-lab result: ${PASS} pass, ${FAIL} fail"

if [ "${FAIL}" -gt 0 ]; then
  exit 1
fi
exit 0
