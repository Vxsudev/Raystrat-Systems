#!/usr/bin/env bash
# 016-homepage-design-v2.sh — SUPERSEDED by decosplay pass (spec rhythm-lab-decosplay.md)
#
# The Homepage Design V2 bundle (interactive SystemPulse, HeroStatusPanel, AuditTicker,
# ChokeDiagram, live mode system) was first detheatricalized (spec 018) and then removed
# entirely by the de-cosplay / de-hype reduction pass. The live contract for the homepage
# is now scripts/verification/019-rhythm-lab-decosplay.sh.
#
# This script is retained as an ANTI-REGRESSION GUARD: it asserts the design-v2 cosplay
# layer does NOT return. Original component-presence checks are intentionally inverted.

set -uo pipefail
REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$REPO_ROOT"

PASS=0
FAIL=0
ok()   { echo "  PASS  $1"; PASS=$((PASS+1)); }
fail() { echo "  FAIL  $1"; FAIL=$((FAIL+1)); }
absent() { grep -rEq -- "$1" "$2" 2>/dev/null && fail "$3" || ok "$3"; }
gone() { [ ! -e "$1" ] && ok "$2" || fail "$2"; }

echo "Verification 016 — Homepage Design V2 (SUPERSEDED — anti-regression guard)"
echo "══════════════════════════════════════════════════════"

# Design-v2 interactive cosplay must not return
gone src/components/ui/system-pulse.tsx              "SystemPulse live-clock component stays deleted"
gone src/components/ui/choke-diagram.tsx             "ChokeDiagram decorative SVG stays deleted"
absent 'HeroStatusPanel'   src/components/sections/hero.tsx        "HeroStatusPanel not reintroduced in hero"
absent 'HeroSurfaceReference' src/components/sections/hero.tsx     "HeroSurfaceReference schematic not reintroduced"
absent 'setInterval'       src/components/sections/governance.tsx  "live AuditTicker rotation not reintroduced"
absent 'auditSeed'         src/components/sections/governance.tsx  "audit-seed live feed not reintroduced"
absent 'sys-pulse|system-pulse' src/app/globals.css                "sys-pulse keyframes stay removed"
absent 'ChokeDiagram'      src/components/sections/failure-thesis.tsx "ChokeDiagram not reintroduced in failure-thesis"

# Current homepage authority delegated to 019
if [ -f scripts/verification/019-rhythm-lab-decosplay.sh ]; then
  ok "current homepage contract delegated to 019-rhythm-lab-decosplay.sh"
else
  fail "019-rhythm-lab-decosplay.sh (current authority) missing"
fi

echo ""
echo "══════════════════════════════════════════════════════"
echo "  PASS: $PASS"
echo "  FAIL: $FAIL"
echo "══════════════════════════════════════════════════════"
if [ "$FAIL" -eq 0 ]; then echo "  Result: PASS"; exit 0; else echo "  Result: FAIL"; exit 1; fi
