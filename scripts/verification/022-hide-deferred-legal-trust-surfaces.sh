#!/usr/bin/env bash
# 022-hide-deferred-legal-trust-surfaces.sh — Hide Deferred Legal/Trust Surfaces
# Verifies the six deferred surfaces are hidden from public footer/header while
# their route files + a deferred registry are preserved.
# Parent capability: HIDE_DEFERRED_LEGAL_TRUST_SURFACES

set -uo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
cd "${REPO_ROOT}"
FTR="src/components/footer.tsx"
HDR="src/components/header.tsx"
DEF="ai/deferred/deferred-public-trust-surfaces.md"
SURFACES=(Documentation Privacy Terms Trust Principal Continuity)

PASS=0
FAIL=0
ok()   { echo "  PASS: $1"; PASS=$((PASS + 1)); }
fail() { echo "  FAIL: $1"; FAIL=$((FAIL + 1)); }
section() { echo ""; echo "── $1 ──"; }

echo "022-hide-deferred-legal-trust-surfaces: Deferred Surface Hiding Verification"
echo ""

# ── A. Footer does not expose the six surfaces ───────────────────────────────
section "A. Footer free of deferred surfaces"
for s in "${SURFACES[@]}"; do
  if grep -q "$s" "$FTR" 2>/dev/null; then
    fail "footer still references '$s'"
  else
    ok "footer no longer references '$s'"
  fi
done

# ── B. Header/nav does not expose the six surfaces ───────────────────────────
section "B. Header/nav free of deferred surfaces"
for s in "${SURFACES[@]}"; do
  if grep -q "$s" "$HDR" 2>/dev/null; then
    fail "header still references '$s'"
  else
    ok "header no longer references '$s'"
  fi
done
# navigationLinks (data source for nav) must not carry them either
for s in "${SURFACES[@]}"; do
  if grep -qE "name: '$s'|href: '/(documentation|principal|continuity|privacy|terms|trust)'" src/data/content.ts 2>/dev/null; then
    fail "navigationLinks references deferred surface '$s'"
  else
    ok "navigationLinks free of '$s'"
  fi
done

# ── C. Route files preserved (not deleted) for surfaces that had routes ──────
section "C. Existing route files preserved"
for r in documentation principal continuity; do
  if [ -f "src/app/$r/page.tsx" ]; then
    ok "route preserved: src/app/$r/page.tsx"
  else
    fail "route file deleted: src/app/$r/page.tsx"
  fi
done

# ── D. Deferred registry exists and names all six surfaces ───────────────────
section "D. Deferred registry"
if [ -f "$DEF" ]; then
  ok "deferred registry exists at $DEF"
else
  fail "deferred registry missing at $DEF"
fi
for s in "${SURFACES[@]}"; do
  if grep -q "$s" "$DEF" 2>/dev/null; then
    ok "deferred registry names '$s'"
  else
    fail "deferred registry missing '$s'"
  fi
done
grep -qiE "deliberate deferral|not (accidental )?dead code" "$DEF" 2>/dev/null \
  && ok "deferred registry states intentional (not dead code)" \
  || fail "deferred registry missing intentional-deferral statement"
grep -qiE "resurfac" "$DEF" 2>/dev/null \
  && ok "deferred registry lists resurfacing conditions" \
  || fail "deferred registry missing resurfacing conditions"

# ── E. Footer still renders brand + system/engage links cleanly ──────────────
section "E. Footer integrity"
grep -q "Raystrat Systems" "$FTR" 2>/dev/null && ok "footer renders brand wordmark" || fail "footer brand wordmark missing"
grep -q "services.map" "$FTR" 2>/dev/null && ok "footer renders Systems column" || fail "footer Systems column missing"
grep -q "engageLinks.map" "$FTR" 2>/dev/null && ok "footer renders Engage column" || fail "footer Engage column missing"
grep -q "sm:grid-cols-2" "$FTR" 2>/dev/null && ! grep -q "md:grid-cols-3" "$FTR" 2>/dev/null \
  && ok "footer grid rebalanced to 2 columns (md:grid-cols-3 removed)" || fail "footer grid not rebalanced"
# no leftover empty Legal column / dangling array
grep -q "legalLinks" "$FTR" 2>/dev/null && fail "footer retains dangling legalLinks reference" || ok "no dangling legalLinks reference"

# ── F. No broken imports (footer imports resolve) ────────────────────────────
section "F. Import integrity"
# ThemeToggle + services + Image + Link still imported and used
grep -q "import { services }" "$FTR" 2>/dev/null && grep -q "services.map" "$FTR" 2>/dev/null \
  && ok "services import used (no dead import)" || fail "services import/use mismatch"
grep -q "ThemeToggle" "$FTR" 2>/dev/null && ok "ThemeToggle retained" || fail "ThemeToggle missing"

# ── Summary ─────────────────────────────────────────────────────────────────
echo ""
echo "──────────────────────────────────────────────────"
TOTAL=$((PASS + FAIL))
echo "RESULT: $PASS/$TOTAL"
if [ "$FAIL" -gt 0 ]; then echo "STATUS: FAIL"; exit 1; fi
echo "STATUS: PASS"; exit 0
