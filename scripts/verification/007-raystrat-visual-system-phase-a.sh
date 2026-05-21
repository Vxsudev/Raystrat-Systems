#!/usr/bin/env bash
# 007-raystrat-visual-system-phase-a.sh — Visual System Phase A Verification
# Verifies token swap: light canvas, Raystrat blue primary, structure tokens,
# dark class removal, dotted pattern removal, Calendly URL update.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
cd "${REPO_ROOT}"

PASS=0
FAIL=0

echo "007-phase-a: Raystrat Visual System Phase A Verification"
echo ""

# Check 1: :root background is light canvas (not pure black)
if grep -q -- "--background: 0 0% 99%" src/app/globals.css 2>/dev/null; then
  echo "  PASS: globals.css :root --background is light canvas (0 0% 99%)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: globals.css :root --background is not light canvas"
  FAIL=$((FAIL + 1))
fi

# Check 2: :root primary is Raystrat blue (not gold)
if grep -q -- "--primary: 214 98% 40%" src/app/globals.css 2>/dev/null; then
  echo "  PASS: globals.css :root --primary is Raystrat blue (214 98% 40%)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: globals.css :root --primary is not Raystrat blue"
  FAIL=$((FAIL + 1))
fi

# Check 3: :root ring is Raystrat blue (not gold)
if grep -q -- "--ring: 214 98% 40%" src/app/globals.css 2>/dev/null; then
  echo "  PASS: globals.css :root --ring is Raystrat blue (214 98% 40%)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: globals.css :root --ring is not Raystrat blue"
  FAIL=$((FAIL + 1))
fi

# Check 4: --structure token exists
if grep -q -- "--structure: 220 24% 12%" src/app/globals.css 2>/dev/null; then
  echo "  PASS: globals.css has --structure token (220 24% 12%)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: globals.css missing --structure token"
  FAIL=$((FAIL + 1))
fi

# Check 5: --structure-foreground token exists
if grep -q -- "--structure-foreground: 0 0% 99%" src/app/globals.css 2>/dev/null; then
  echo "  PASS: globals.css has --structure-foreground token"
  PASS=$((PASS + 1))
else
  echo "  FAIL: globals.css missing --structure-foreground token"
  FAIL=$((FAIL + 1))
fi

# Check 6: .dark has no gold primary (43 74%)
if grep -A 30 "\.dark {" src/app/globals.css 2>/dev/null | grep -q "43 74%"; then
  echo "  FAIL: globals.css .dark still has gold primary (43 74%)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: globals.css .dark has no gold primary"
  PASS=$((PASS + 1))
fi

# Check 7: No hardcoded className='dark' on <html> in layout.tsx
if grep -q "className='dark'" src/app/layout.tsx 2>/dev/null; then
  echo "  FAIL: layout.tsx still has className='dark' on <html>"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: layout.tsx has no hardcoded className='dark'"
  PASS=$((PASS + 1))
fi

# Check 8: ThemeProvider defaultTheme is "light"
if grep -q 'defaultTheme="light"' src/app/layout.tsx 2>/dev/null; then
  echo "  PASS: layout.tsx ThemeProvider defaultTheme is \"light\""
  PASS=$((PASS + 1))
else
  echo "  FAIL: layout.tsx ThemeProvider defaultTheme is not \"light\""
  FAIL=$((FAIL + 1))
fi

# Check 9: No bg-dotted-pattern in page.tsx
if grep -q "bg-dotted-pattern" src/app/page.tsx 2>/dev/null; then
  echo "  FAIL: page.tsx still has bg-dotted-pattern"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: page.tsx has no bg-dotted-pattern"
  PASS=$((PASS + 1))
fi

# Check 10: No gold color in Calendly URL
if grep -q "primary_color=d4af37" src/components/ui/calendly-button.tsx 2>/dev/null; then
  echo "  FAIL: calendly-button.tsx still has gold primary_color (d4af37)"
  FAIL=$((FAIL + 1))
else
  echo "  PASS: calendly-button.tsx has no gold primary_color"
  PASS=$((PASS + 1))
fi

# Check 11: Raystrat blue in Calendly URL
if grep -q "primary_color=0459ca" src/components/ui/calendly-button.tsx 2>/dev/null; then
  echo "  PASS: calendly-button.tsx has Raystrat blue primary_color (0459ca)"
  PASS=$((PASS + 1))
else
  echo "  FAIL: calendly-button.tsx missing Raystrat blue primary_color"
  FAIL=$((FAIL + 1))
fi

echo ""
echo "007-phase-a result: ${PASS} pass, ${FAIL} fail"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
exit 0
