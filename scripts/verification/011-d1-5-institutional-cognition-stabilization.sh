#!/usr/bin/env bash
# 011-d1-5-institutional-cognition-stabilization.sh — D1.5 Verification
# Verifies all P0/P1 institutional cognition stabilization items:
#  Track 1: ByteOfTheWeek register fracture remediation
#  Track 2: /systems index Phase-B drift correction
#  Track 3: service-page-client legacy treatment removal
#  Track 4: Industries icon density correction
# Plus P2 dead-code removal checks.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
cd "${REPO_ROOT}"

PASS=0
FAIL=0

echo "011-d1-5: Raystrat D1.5 Institutional Cognition Stabilization Verification"
echo ""

# ============================================================
# TRACK 1: ByteOfTheWeek — register fracture remediation (P0)
# ============================================================

# Check 1: AnimatedGridBackground removed from byte-of-the-week
if grep -q "AnimatedGridBackground" src/components/sections/byte-of-the-week.tsx 2>/dev/null; then
  echo "  FAIL: byte-of-the-week.tsx still imports AnimatedGridBackground"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: AnimatedGridBackground removed from byte-of-the-week.tsx"
  PASS=$((PASS + 1))
fi

# Check 2: animated-grid-background.tsx file deleted
if [ -f "src/components/ui/animated-grid-background.tsx" ]; then
  echo "  FAIL: animated-grid-background.tsx still exists (dead code not removed)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: animated-grid-background.tsx deleted"
  PASS=$((PASS + 1))
fi

# Check 3: No raster animation imports remain in byte-of-the-week
if grep -qE "animate-pulse-slower|move-background|AnimatedGrid" src/components/sections/byte-of-the-week.tsx 2>/dev/null; then
  echo "  FAIL: byte-of-the-week.tsx contains residual animation references"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: byte-of-the-week.tsx free of animation references"
  PASS=$((PASS + 1))
fi

# Check 4: rounded-2xl removed from byte-of-the-week
if grep -q "rounded-2xl" src/components/sections/byte-of-the-week.tsx 2>/dev/null; then
  echo "  FAIL: byte-of-the-week.tsx contains rounded-2xl (Phase Visual System violation)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: rounded-2xl absent from byte-of-the-week.tsx"
  PASS=$((PASS + 1))
fi

# Check 5: bg-card/50 removed from byte-of-the-week section
if grep -q "bg-card/50" src/components/sections/byte-of-the-week.tsx 2>/dev/null; then
  echo "  FAIL: byte-of-the-week.tsx uses bg-card/50 (opacity wash forbidden)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: bg-card/50 absent from byte-of-the-week.tsx"
  PASS=$((PASS + 1))
fi

# Check 6: No text-6xl decorative label in byte-of-the-week
if grep -q "text-6xl" src/components/sections/byte-of-the-week.tsx 2>/dev/null; then
  echo "  FAIL: byte-of-the-week.tsx contains text-6xl decorative panel"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: text-6xl decorative panel removed from byte-of-the-week.tsx"
  PASS=$((PASS + 1))
fi

# Check 7: byte-of-the-week uses bg-secondary for section surface
if grep -q "bg-secondary" src/components/sections/byte-of-the-week.tsx 2>/dev/null; then
  echo "  PASS: byte-of-the-week.tsx uses bg-secondary surface"
  PASS=$((PASS + 1))
else
  echo "  FAIL: byte-of-the-week.tsx missing bg-secondary surface"
  FAIL=$((FAIL + 1))
fi

# Check 8: byte-of-the-week editorial panel uses rounded-md (not rounded-2xl)
if grep -q "rounded-md" src/components/sections/byte-of-the-week.tsx 2>/dev/null; then
  echo "  PASS: byte-of-the-week.tsx editorial panel uses rounded-md"
  PASS=$((PASS + 1))
else
  echo "  FAIL: byte-of-the-week.tsx editorial panel missing rounded-md"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# TRACK 2: /systems index — Phase-B drift correction (P0)
# ============================================================

# Check 9: border-2 removed from system cards
if grep -q "border-2" src/app/systems/page.tsx 2>/dev/null; then
  echo "  FAIL: systems/page.tsx contains border-2 (Phase B violation)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: border-2 absent from systems/page.tsx"
  PASS=$((PASS + 1))
fi

# Check 10: bg-card/50 removed from system cards
if grep -q "bg-card/50" src/app/systems/page.tsx 2>/dev/null; then
  echo "  FAIL: systems/page.tsx contains bg-card/50 (opacity wash forbidden)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: bg-card/50 absent from systems/page.tsx"
  PASS=$((PASS + 1))
fi

# Check 11: duration-200 replaced with duration-150 on system cards
if grep -q "duration-200" src/app/systems/page.tsx 2>/dev/null; then
  echo "  FAIL: systems/page.tsx contains duration-200 (Phase B transition canon violation)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: duration-200 absent from systems/page.tsx"
  PASS=$((PASS + 1))
fi

# Check 12: duration-150 present on system cards
if grep -q "duration-150" src/app/systems/page.tsx 2>/dev/null; then
  echo "  PASS: systems/page.tsx uses duration-150 (Phase B transition canon)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: systems/page.tsx missing duration-150"
  FAIL=$((FAIL + 1))
fi

# Check 13: rounded-lg removed from audit CTA block
if grep -q "rounded-lg" src/app/systems/page.tsx 2>/dev/null; then
  echo "  FAIL: systems/page.tsx contains rounded-lg on audit CTA (Phase Visual System violation)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: rounded-lg absent from systems/page.tsx"
  PASS=$((PASS + 1))
fi

# Check 14: audit CTA block uses rounded-md
if grep -q "rounded-md" src/app/systems/page.tsx 2>/dev/null; then
  echo "  PASS: systems/page.tsx audit CTA uses rounded-md"
  PASS=$((PASS + 1))
else
  echo "  FAIL: systems/page.tsx audit CTA missing rounded-md"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# TRACK 3: service-page-client — legacy treatment removal (P1)
# ============================================================

# Check 15: italic removed from service subhead
if grep -q "text-xl italic" src/components/ui/service-page-client.tsx 2>/dev/null; then
  echo "  FAIL: service-page-client.tsx subhead retains italic treatment"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: italic removed from service-page-client.tsx subhead"
  PASS=$((PASS + 1))
fi

# Check 16: prose-invert removed from service page content
if grep -q "prose-invert" src/components/ui/service-page-client.tsx 2>/dev/null; then
  echo "  FAIL: service-page-client.tsx retains prose-invert (dark canvas treatment)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: prose-invert removed from service-page-client.tsx"
  PASS=$((PASS + 1))
fi

# Check 17: JustificationPopup shadow-2xl removed
if grep -q "shadow-2xl" src/components/ui/service-page-client.tsx 2>/dev/null; then
  echo "  FAIL: service-page-client.tsx JustificationPopup retains shadow-2xl"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: shadow-2xl removed from service-page-client.tsx"
  PASS=$((PASS + 1))
fi

# Check 18: JustificationPopup border-primary neutralized to border-border
if grep -q "border-primary" src/components/ui/service-page-client.tsx 2>/dev/null; then
  echo "  FAIL: service-page-client.tsx JustificationPopup retains border-primary accent"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: border-primary neutralized on JustificationPopup"
  PASS=$((PASS + 1))
fi

# Check 19: JustificationPopup slide animation removed (translate-y-10)
if grep -q "translate-y-10" src/components/ui/service-page-client.tsx 2>/dev/null; then
  echo "  FAIL: service-page-client.tsx JustificationPopup retains translate-y-10 slide animation"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: translate-y-10 slide animation removed from JustificationPopup"
  PASS=$((PASS + 1))
fi

# Check 20: sidebar aside uses rounded-md (not rounded-lg)
if grep -q "sticky p-6 rounded-lg" src/components/ui/service-page-client.tsx 2>/dev/null; then
  echo "  FAIL: service-page-client.tsx sidebar retains rounded-lg"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: sidebar rounded-lg corrected to rounded-md"
  PASS=$((PASS + 1))
fi

# ============================================================
# TRACK 4: Industries — icon density correction (P1)
# ============================================================

# Check 21: oversized p-3 icon density absent (D1.5 corrected to p-2.5)
# (decosplay pass restored card+icon architecture at the D1.5-corrected density)
if grep -q '"p-3 rounded-md bg-primary/10"' src/components/sections/industries.tsx 2>/dev/null; then
  echo "  FAIL: industries.tsx icon container retains oversized p-3"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: oversized p-3 absent from industries.tsx icon containers"
  PASS=$((PASS + 1))
fi

# Check 22: icon containers present at corrected density (decosplay restored Card+icon)
if grep -q "p-2.5 rounded-md bg-primary" src/components/sections/industries.tsx 2>/dev/null; then
  echo "  PASS: industries.tsx uses corrected p-2.5 icon container density"
  PASS=$((PASS + 1))
else
  echo "  FAIL: industries.tsx missing corrected p-2.5 icon container"
  FAIL=$((FAIL + 1))
fi

# Check 23: oversized w-6 h-6 icons absent (D1.5 corrected to w-5 h-5)
if grep -q "w-6 h-6 text-primary" src/components/sections/industries.tsx 2>/dev/null; then
  echo "  FAIL: industries.tsx icons retain oversized w-6 h-6"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: oversized w-6 h-6 absent from industries.tsx icons"
  PASS=$((PASS + 1))
fi

# Check 24: icons present at corrected w-5 h-5 density (decosplay restored icons)
if grep -q "w-5 h-5 text-primary" src/components/sections/industries.tsx 2>/dev/null; then
  echo "  PASS: industries.tsx uses corrected w-5 h-5 icon density"
  PASS=$((PASS + 1))
else
  echo "  FAIL: industries.tsx missing corrected w-5 h-5 icon density"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# SCOPE DISCIPLINE — no new theater introduced
# ============================================================

# Check 25: No new animation classes introduced in modified files
THEATER_FAIL=0
for f in \
  src/components/sections/byte-of-the-week.tsx \
  src/app/systems/page.tsx \
  src/components/ui/service-page-client.tsx \
  src/components/sections/industries.tsx; do
  if grep -qE "animate-pulse|animate-ping|animate-bounce|animate-spin|bg-gradient-|rounded-2xl" "$f" 2>/dev/null; then
    THEATER_FAIL=$((THEATER_FAIL + 1))
    echo "    (theater violation in: $f)"
  fi
done
if [ "$THEATER_FAIL" -eq 0 ]; then
  echo "  PASS: no theater classes introduced in modified files"
  PASS=$((PASS + 1))
else
  echo "  FAIL: ${THEATER_FAIL} theater violation(s) in modified files"
  FAIL=$((FAIL + 1))
fi

# Check 26: AnimatedGridBackground has no remaining references site-wide
if grep -rq "AnimatedGridBackground\|animated-grid-background" src/ 2>/dev/null; then
  echo "  FAIL: AnimatedGridBackground still referenced somewhere in src/"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: AnimatedGridBackground fully removed from codebase"
  PASS=$((PASS + 1))
fi

# ============================================================
# PRIOR-PHASE REGRESSION SPOT CHECKS
# ============================================================

# Check 27: Phase D1 diagrams still present
if [ -f "src/components/diagrams/governance-layer-diagram.tsx" ] \
   && [ -f "src/components/diagrams/failure-mode-registry-preview.tsx" ] \
   && [ -f "src/components/diagrams/frontline-support-architecture-diagram.tsx" ]; then
  echo "  PASS: Phase D1 diagram components intact"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Phase D1 diagram components regressed"
  FAIL=$((FAIL + 1))
fi

# Check 28: Phase C footer institutional anchors intact
if [ -f src/app/principal/page.tsx ] && [ -f src/app/documentation/page.tsx ] && [ -f src/app/continuity/page.tsx ]; then
  echo "  PASS: Phase C institutional surfaces preserved as routes (deferred from footer)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Phase C institutional routes missing"
  FAIL=$((FAIL + 1))
fi

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

echo ""
echo "011-d1-5 result: ${PASS} pass, ${FAIL} fail"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
exit 0
