#!/usr/bin/env bash
# 021-above-fold-authority.sh — Above-the-Fold Authority Pass
# Verifies the concrete Operating Functions panel, exact hero copy, deletion of
# abstract right-column prose, and absence of theater + floating pill above the fold.
# Parent spec: specs/above-fold-authority.md

set -uo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
cd "${REPO_ROOT}"
HERO="src/components/sections/hero.tsx"
APPC="src/components/app-content.tsx"

PASS=0
FAIL=0
ok()   { echo "  PASS: $1"; PASS=$((PASS + 1)); }
fail() { echo "  FAIL: $1"; FAIL=$((FAIL + 1)); }
section() { echo ""; echo "── $1 ──"; }
present() { grep -Fq -- "$1" "$2" 2>/dev/null && ok "$3" || fail "$3"; }
absent()  { grep -Fq -- "$1" "$2" 2>/dev/null && fail "$3" || ok "$3"; }
absent_re() { grep -Eq -- "$1" "$2" 2>/dev/null && fail "$3" || ok "$3"; }

echo "021-above-fold-authority: Above-the-Fold Authority Verification"
echo ""

# ── A. Exact hero copy ───────────────────────────────────────────────────────
section "A. Exact hero copy"
present 'Systems That Run the Business' "$HERO" "exact headline present"
present 'Raystrat builds systems for sales, support, operations, and' "$HERO" "subheadline line 1 present"
present 'spreadsheets, or manual follow-through.' "$HERO" "subheadline line 2 present"

# ── B. Banned abstract right-column prose removed ────────────────────────────
section "B. Abstract right-column prose hard-deleted"
absent 'Demand and follow-through' "$HERO" "'Demand and follow-through' removed"
absent 'manual chasing'            "$HERO" "'manual chasing' removed"
absent 'individual memory'         "$HERO" "'individual memory' removed"
absent 'spreadsheet assembly'      "$HERO" "'spreadsheet assembly' removed"
absent 'Reporting that stays current' "$HERO" "'Reporting that stays current' removed"
absent 'Support and operations'    "$HERO" "'Support and operations' removed"

# ── C. Concrete Operating Functions panel ────────────────────────────────────
section "C. Operating Functions panel"
present 'Operating functions Raystrat builds for' "$HERO" "panel title present"
present 'lead capture, qualification, follow-up, pipeline movement' "$HERO" "Sales row exact"
present 'intake, routing, escalation, resolution tracking' "$HERO" "Support row exact"
present 'task routing, reminders, approvals, handoffs' "$HERO" "Operations row exact"
present 'dashboards, summaries, weekly operating visibility' "$HERO" "Reporting row exact"
for fn in Sales Support Operations Reporting; do
  grep -Fq "'$fn'" "$HERO" 2>/dev/null && ok "function '$fn' present" || fail "function '$fn' missing"
done
present 'border border-border rounded-md' "$HERO" "panel is a contained bordered panel"
present 'divide-y divide-border' "$HERO" "panel rows separated by keylines"

# ── D. No theater above the fold ─────────────────────────────────────────────
section "D. Visual restraint"
absent '<svg'                 "$HERO" "no SVG diagram above fold"
absent 'viewBox'              "$HERO" "no SVG viewBox above fold"
absent 'TweaksPanel'          "$HERO" "no mode switcher above fold"
absent 'Schematic'            "$HERO" "no schematic reference label"
absent 'setInterval'          "$HERO" "no fake runtime/telemetry"
absent_re '\bLIVE\b|ALL SYSTEMS NOMINAL|PROD\b|tail -f' "$HERO" "no fake live/prod/status"
absent_re '\b720h\b|\b12\.4M\b|99\.94|v[0-9]+\.[0-9]+\.[0-9]+' "$HERO" "no fake metrics/version numbers"

# ── E. No floating AI pill on homepage ───────────────────────────────────────
section "E. Homepage floating pill removed"
absent 'ServiceSuggester' "$APPC" "ServiceSuggester no longer mounted (homepage pill removed)"
absent_re "isHomePage.*ServiceSuggester|ServiceSuggester.*isHomePage" "$APPC" "no homepage-gated pill"

# ── F. Structural framing ────────────────────────────────────────────────────
section "F. Structural framing"
present 'border-b border-border' "$HERO" "hero has section-boundary keyline"
grep -Eq 'md:grid-cols-\[1\.[0-9]+fr_0\.[0-9]+fr\]|md:grid-cols-\[1fr_1fr\]' "$HERO" \
  && ok "balanced asymmetric width choreography" || fail "width choreography missing"

# ── Summary ─────────────────────────────────────────────────────────────────
# ── G. Logo scale — institutional brand mark (header + footer) ───────────────
section "G. Logo scale"
HDR="src/components/header.tsx"
FTR="src/components/footer.tsx"
# Header desktop mark ≥ 40px (h-10) and props match for crisp downscale
present 'className="h-10 w-10"' "$HDR" "header desktop logo scaled to 40px (h-10)"
present 'width={40}'            "$HDR" "header logo width prop = 40 (crisp render)"
present 'Raystrat Systems'      "$HDR" "header wordmark present"
present 'text-lg font-semibold' "$HDR" "header wordmark legible weight/size"
# Header mobile mark ≥ 32px (h-8)
present 'className="h-8 w-8"'   "$HDR" "header mobile logo scaled to 32px (h-8)"
# Navbar height stays restrained (h-16, not oversized)
present 'h-16' "$HDR" "navbar height remains restrained (h-16)"
absent_re 'h-2[0-9]\b' "$HDR" "navbar not oversized (no h-20+ container)"
# Footer mark ≥ 48px (h-12)
present 'h-12 w-12 shrink-0' "$FTR" "footer logo scaled to 48px (h-12)"
present 'width={48}'         "$FTR" "footer logo width prop = 48 (crisp render)"
present 'text-xl font-semibold' "$FTR" "footer wordmark legible weight/size"

echo ""
echo "──────────────────────────────────────────────────"
TOTAL=$((PASS + FAIL))
echo "RESULT: $PASS/$TOTAL"
if [ "$FAIL" -gt 0 ]; then echo "STATUS: FAIL"; exit 1; fi
echo "STATUS: PASS"; exit 0
