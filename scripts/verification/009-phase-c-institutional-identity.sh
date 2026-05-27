#!/usr/bin/env bash
# 009-phase-c-institutional-identity.sh — Phase C Institutional Identity Verification
# Verifies header institutionalization, footer institutional spine, terminology canon,
# institutional anchor routes, and absence of forbidden vocabulary / motion.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
cd "${REPO_ROOT}"

PASS=0
FAIL=0

echo "009-phase-c: Raystrat Phase C Institutional Identity Verification"
echo ""

# ============================================================
# TRACK 1 — HEADER INSTITUTIONALIZATION
# ============================================================

# Check 1: Header is always-opaque (no scroll-dependent transparency)
if grep -q "bg-transparent" src/components/header.tsx 2>/dev/null; then
  echo "  FAIL: header.tsx still has bg-transparent (scroll-dependent state)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: header.tsx has no bg-transparent (always-opaque)"
  PASS=$((PASS + 1))
fi

# Check 2: Header has no scrolled/setScrolled state
if grep -qE "setScrolled|scrolled.*=.*useState" src/components/header.tsx 2>/dev/null; then
  echo "  FAIL: header.tsx still has scroll-state useState"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: header.tsx has no scroll-state useState"
  PASS=$((PASS + 1))
fi

# Check 3: ThemeToggle removed from header
if grep -q "ThemeToggle" src/components/header.tsx 2>/dev/null; then
  echo "  FAIL: header.tsx still references ThemeToggle"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: header.tsx has no ThemeToggle"
  PASS=$((PASS + 1))
fi

# Check 4: ThemeToggle present in footer
if grep -q "ThemeToggle" src/components/footer.tsx 2>/dev/null; then
  echo "  PASS: footer.tsx contains ThemeToggle"
  PASS=$((PASS + 1))
else
  echo "  FAIL: footer.tsx does not contain ThemeToggle"
  FAIL=$((FAIL + 1))
fi

# Check 5: Logo mark image referenced in header
if grep -qE "raystrat-(logo|mark)" src/components/header.tsx 2>/dev/null; then
  echo "  PASS: header.tsx references raystrat-logo asset"
  PASS=$((PASS + 1))
else
  echo "  FAIL: header.tsx does not reference raystrat-logo asset"
  FAIL=$((FAIL + 1))
fi

# Check 6: NavLink active state implementation present
if grep -qE "aria-current|isActive" src/components/header.tsx 2>/dev/null; then
  echo "  PASS: header.tsx implements active nav state"
  PASS=$((PASS + 1))
else
  echo "  FAIL: header.tsx does not implement active nav state"
  FAIL=$((FAIL + 1))
fi

# Check 7: Canonical CTA in header
if grep -q "Book Operational Audit" src/components/header.tsx 2>/dev/null; then
  echo "  PASS: header.tsx carries canonical CTA 'Book Operational Audit'"
  PASS=$((PASS + 1))
else
  echo "  FAIL: header.tsx missing canonical CTA"
  FAIL=$((FAIL + 1))
fi

# Check 8: No Download Playbook in header (removed)
if grep -q "Download Playbook\|PlaybookForm" src/components/header.tsx 2>/dev/null; then
  echo "  FAIL: header.tsx still references Download Playbook"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: header.tsx has no Download Playbook"
  PASS=$((PASS + 1))
fi

# Check 9: No Login/Sign Up styled buttons in marketing header
# (we permit useAuth/userMenu — auth state — but not Login/Sign Up CTA-equivalents)
if grep -qE "href=\"/signup\"|<UserPlus|<LogIn " src/components/header.tsx 2>/dev/null; then
  echo "  FAIL: header.tsx still has signup/Login CTA-equivalent buttons"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: header.tsx has no Login/Signup CTA-equivalents"
  PASS=$((PASS + 1))
fi

# ============================================================
# TRACK 2 — FOOTER INSTITUTIONAL SPINE
# ============================================================

# Check 10: Footer uses --structure dark surface token
if grep -q -- "--structure" src/components/footer.tsx 2>/dev/null; then
  echo "  PASS: footer.tsx uses --structure token"
  PASS=$((PASS + 1))
else
  echo "  FAIL: footer.tsx does not use --structure token"
  FAIL=$((FAIL + 1))
fi

# Check 11: Principal institutional surface preserved as a route
# (deferred from public footer per HIDE_DEFERRED_LEGAL_TRUST_SURFACES; route retained)
if [ -f src/app/principal/page.tsx ]; then
  echo "  PASS: Principal route preserved (deferred from footer)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Principal route missing"
  FAIL=$((FAIL + 1))
fi

# Check 12: Documentation institutional surface preserved as a route
if [ -f src/app/documentation/page.tsx ]; then
  echo "  PASS: Documentation route preserved (deferred from footer)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Documentation route missing"
  FAIL=$((FAIL + 1))
fi

# Check 13: Continuity institutional surface preserved as a route
if [ -f src/app/continuity/page.tsx ]; then
  echo "  PASS: Continuity route preserved (deferred from footer)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Continuity route missing"
  FAIL=$((FAIL + 1))
fi

# Check 14: Footer logo mark integration
if grep -qE "raystrat-(logo|mark)" src/components/footer.tsx 2>/dev/null; then
  echo "  PASS: footer.tsx references raystrat-logo asset"
  PASS=$((PASS + 1))
else
  echo "  FAIL: footer.tsx does not reference raystrat-logo asset"
  FAIL=$((FAIL + 1))
fi

# Check 15: Operational doctrine sentence in footer
if grep -q "Operational Systems Engineering" src/components/footer.tsx 2>/dev/null; then
  echo "  PASS: footer.tsx contains operational doctrine sentence"
  PASS=$((PASS + 1))
else
  echo "  FAIL: footer.tsx missing operational doctrine sentence"
  FAIL=$((FAIL + 1))
fi

# Check 16: No newsletter / subscribe in footer
if grep -qiE "newsletter|subscribe" src/components/footer.tsx 2>/dev/null; then
  echo "  FAIL: footer.tsx contains newsletter/subscribe (forbidden)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: footer.tsx has no newsletter/subscribe"
  PASS=$((PASS + 1))
fi

# Check 17: No "As featured in" / "Trusted by" / "Built with" in footer
if grep -qE "As featured in|Trusted by|Built with|Powered by" src/components/footer.tsx 2>/dev/null; then
  echo "  FAIL: footer.tsx contains procurement-theater string"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: footer.tsx has no procurement-theater strings"
  PASS=$((PASS + 1))
fi

# ============================================================
# TRACK 2 SUB — INSTITUTIONAL ANCHOR ROUTES
# ============================================================

# Check 18: /principal route exists
if [ -f "src/app/principal/page.tsx" ]; then
  echo "  PASS: /principal route exists"
  PASS=$((PASS + 1))
else
  echo "  FAIL: /principal route missing"
  FAIL=$((FAIL + 1))
fi

# Check 19: /documentation route exists
if [ -f "src/app/documentation/page.tsx" ]; then
  echo "  PASS: /documentation route exists"
  PASS=$((PASS + 1))
else
  echo "  FAIL: /documentation route missing"
  FAIL=$((FAIL + 1))
fi

# Check 20: /continuity route exists
if [ -f "src/app/continuity/page.tsx" ]; then
  echo "  PASS: /continuity route exists"
  PASS=$((PASS + 1))
else
  echo "  FAIL: /continuity route missing"
  FAIL=$((FAIL + 1))
fi

# ============================================================
# TRACK 3 — TERMINOLOGY CANON RECONCILIATION
# ============================================================

# Check 21: No forbidden marketing vocab in core marketing section components
# (transform, unlock, empower, seamless, cutting-edge — all capitalized variants)
MARKETING_FILES=$(find src/components/sections src/app/page.tsx src/app/systems/page.tsx -name "*.tsx" 2>/dev/null)
FORBIDDEN_HITS=0
for word in "Transform " "Unlock " "Empower " "Seamless " "cutting-edge" "Cutting-edge" "Powered by AI" "powered by AI" "Smart automation" "smart automation"; do
  if echo "$MARKETING_FILES" | xargs grep -l "$word" 2>/dev/null | grep -q .; then
    FORBIDDEN_HITS=$((FORBIDDEN_HITS + 1))
  fi
done
if [ "$FORBIDDEN_HITS" -gt 0 ]; then
  echo "  FAIL: ${FORBIDDEN_HITS} forbidden vocab term(s) detected in marketing sections"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: no forbidden marketing vocab in section components"
  PASS=$((PASS + 1))
fi

# Check 22: Choke point canon present in failure-thesis
if grep -q "Demand Acquisition" src/components/sections/failure-thesis.tsx 2>/dev/null \
   && grep -q "Pursuit" src/components/sections/failure-thesis.tsx 2>/dev/null \
   && grep -q "Frontline Resolution" src/components/sections/failure-thesis.tsx 2>/dev/null \
   && grep -q "Operations" src/components/sections/failure-thesis.tsx 2>/dev/null \
   && grep -q "Command Intelligence" src/components/sections/failure-thesis.tsx 2>/dev/null; then
  echo "  PASS: choke point canon present in failure-thesis.tsx"
  PASS=$((PASS + 1))
else
  echo "  FAIL: choke point canon missing or drifted in failure-thesis.tsx"
  FAIL=$((FAIL + 1))
fi

# Check 23: System canon present in content.ts (titles)
if grep -q "Demand Acquisition" src/data/content.ts 2>/dev/null \
   && grep -q "Follow-Through Infrastructure" src/data/content.ts 2>/dev/null \
   && grep -q "Frontline Support" src/data/content.ts 2>/dev/null \
   && grep -q "Operations Control" src/data/content.ts 2>/dev/null \
   && grep -q "Command Intelligence" src/data/content.ts 2>/dev/null \
   && grep -q "Custom Operations Build" src/data/content.ts 2>/dev/null; then
  echo "  PASS: system canon present in content.ts"
  PASS=$((PASS + 1))
else
  echo "  FAIL: system canon missing or drifted in content.ts"
  FAIL=$((FAIL + 1))
fi

# Check 24: CTA canon (no "Get Started" / "Try Free" / "Demo" as CTA in header)
if grep -qE "Get Started|Try Free|Sign Up Now" src/components/header.tsx 2>/dev/null; then
  echo "  FAIL: header.tsx contains forbidden CTA vocab"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: header.tsx free of forbidden CTA vocab"
  PASS=$((PASS + 1))
fi

# ============================================================
# ANTI-PATTERN REGISTRY
# ============================================================

# Check 25: No animate-pulse / animate-ping / animate-bounce in header or footer
if grep -qE "animate-pulse|animate-ping|animate-bounce" src/components/header.tsx src/components/footer.tsx 2>/dev/null; then
  echo "  FAIL: header.tsx or footer.tsx contains decorative animation"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: header.tsx and footer.tsx free of decorative animation"
  PASS=$((PASS + 1))
fi

# Check 26: No gradient backgrounds in header or footer
if grep -qE "bg-gradient-|gradient-to" src/components/header.tsx src/components/footer.tsx 2>/dev/null; then
  echo "  FAIL: header.tsx or footer.tsx contains gradient"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: header.tsx and footer.tsx free of gradients"
  PASS=$((PASS + 1))
fi

# Check 27: No glassmorphism (backdrop-blur) in header
if grep -q "backdrop-blur" src/components/header.tsx 2>/dev/null; then
  echo "  FAIL: header.tsx contains backdrop-blur (glassmorphism)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: header.tsx free of backdrop-blur"
  PASS=$((PASS + 1))
fi

# Check 28: No shadow theatrics (shadow-2xl, shadow-primary glow) in header/footer
if grep -qE "shadow-2xl|shadow-primary" src/components/header.tsx src/components/footer.tsx 2>/dev/null; then
  echo "  FAIL: header.tsx or footer.tsx contains shadow theatrics"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: header.tsx and footer.tsx free of shadow theatrics"
  PASS=$((PASS + 1))
fi

# ============================================================
# PROHIBITED ROUTES (per Phase C §14 deferred surfaces)
# ============================================================

# Check 29: No /team, /careers, /press, /investors, /trust routes introduced
PROHIBITED_ROUTE_HITS=0
for route in team careers press investors trust about; do
  if [ -f "src/app/${route}/page.tsx" ]; then
    PROHIBITED_ROUTE_HITS=$((PROHIBITED_ROUTE_HITS + 1))
  fi
done
if [ "$PROHIBITED_ROUTE_HITS" -gt 0 ]; then
  echo "  FAIL: ${PROHIBITED_ROUTE_HITS} prohibited corporate-apparatus route(s) detected"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: no prohibited corporate-apparatus routes (team/careers/press/investors/trust/about)"
  PASS=$((PASS + 1))
fi

# ============================================================
# PRIOR-PHASE REGRESSION CHECKS (spot-check)
# ============================================================

# Check 30: Phase A token intact (Raystrat blue)
if grep -q -- "--primary: 214 98% 40%" src/app/globals.css 2>/dev/null; then
  echo "  PASS: Phase A Raystrat blue token intact"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Phase A Raystrat blue token regressed"
  FAIL=$((FAIL + 1))
fi

# Check 31: Phase A --structure token intact
if grep -q -- "--structure:" src/app/globals.css 2>/dev/null; then
  echo "  PASS: Phase A --structure token intact"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Phase A --structure token regressed"
  FAIL=$((FAIL + 1))
fi

# Check 32: Phase B card primitive rounded-md preserved
if grep -q "rounded-md border bg-card" src/components/ui/card.tsx 2>/dev/null; then
  echo "  PASS: Phase B card primitive intact"
  PASS=$((PASS + 1))
else
  echo "  FAIL: Phase B card primitive regressed"
  FAIL=$((FAIL + 1))
fi

# Check 33: Phase B animate-ping absent site-wide
if grep -rq "animate-ping" src/components/ 2>/dev/null; then
  echo "  FAIL: animate-ping reintroduced (Phase B regression)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: animate-ping absent site-wide"
  PASS=$((PASS + 1))
fi

# Check 34: Sparkles icon not in floating advisor (Phase B canon)
if grep -q "Sparkles" src/components/ui/floating-ai-suggestor.tsx 2>/dev/null; then
  echo "  FAIL: Sparkles reintroduced in floating-ai-suggestor (Phase B regression)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: Sparkles absent from floating-ai-suggestor"
  PASS=$((PASS + 1))
fi

echo ""
echo "009-phase-c result: ${PASS} pass, ${FAIL} fail"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
exit 0
