#!/usr/bin/env bash
# 020-hero-reposition.sh — Hero Reposition + Above-the-Fold De-theatricalization
# Verifies exact category copy, deletion of consulting-thesis prose, restrained
# right-column descriptor, and absence of theatrical UI above the fold.
# Parent spec: specs/hero-reposition.md

set -uo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
cd "${REPO_ROOT}"
HERO="src/components/sections/hero.tsx"

PASS=0
FAIL=0
ok()   { echo "  PASS: $1"; PASS=$((PASS + 1)); }
fail() { echo "  FAIL: $1"; FAIL=$((FAIL + 1)); }
section() { echo ""; echo "── $1 ──"; }
present() { grep -Fq -- "$1" "$HERO" 2>/dev/null && ok "$2" || fail "$2"; }
absent()  { grep -Fq -- "$1" "$HERO" 2>/dev/null && fail "$2" || ok "$2"; }
absent_re() { grep -Eq -- "$1" "$HERO" 2>/dev/null && fail "$2" || ok "$2"; }

echo "020-hero-reposition: Hero Reposition Verification"
echo ""

# ── A. Banned prior copy removed ─────────────────────────────────────────────
section "A. Consulting-thesis / manifesto copy removed"
absent 'Operational Breakdown'        "headline 'Operational Breakdown' removed"
absent 'Is Preventable'               "manifesto 'Is Preventable' removed"
absent "don't fail because people"    "consulting-thesis body removed (people-aren't-trying)"
absent 'governed execution systems for businesses' "right-col paragraph 1 deleted"
absent 'Each engagement begins with an operational audit' "right-col paragraph 2 deleted"
absent 'audit accountability, SLA compliance, and operational' "right-col governance prose deleted"

# ── B. Exact new copy present ────────────────────────────────────────────────
section "B. Exact category copy present"
present 'Systems That Run the Business' "exact headline present"
present 'Raystrat builds systems for sales, support, operations, and' "subheadline present (line 1)"
present 'spreadsheets, or manual follow-through.' "subheadline present (line 2)"

# ── C. CTA preservation ──────────────────────────────────────────────────────
section "C. CTA copy"
present 'Book Operational Audit'      "primary CTA 'Book Operational Audit' present"
present 'View Systems'                "secondary CTA 'View Systems' present"
absent  'Book Operational Audit →'    "decorative arrow removed from primary CTA"

# ── D. Structure ─────────────────────────────────────────────────────────────
section "D. Asymmetric institutional layout"
# above-fold-authority pass widened the asymmetry and replaced the border-l prose
# block with a contained Operating Functions panel; assert the panel structure.
grep -Eq 'md:grid-cols-\[1[\.0-9]*fr_[0-9.]+fr\]' "$HERO" && ok "asymmetric md two-column grid present" || fail "asymmetric md grid missing"
grep -Fq 'Operating functions Raystrat builds for' "$HERO" && ok "right column carries Operating Functions panel" || fail "right column panel missing"

# ── E. No theatrical UI above the fold ───────────────────────────────────────
section "E. Visual restraint (no theater in hero)"
absent '<svg'                  "no SVG diagram in hero"
absent 'viewBox'               "no SVG viewBox in hero"
absent 'TweaksPanel'           "no mode switcher in hero"
absent 'Schematic'             "no schematic reference in hero"
absent 'Operational Surfaces'  "no 'operational surfaces' panel in hero"
absent 'setInterval'           "no runtime simulation in hero"
absent 'HeroStatusPanel'       "no fake status panel in hero"
absent_re '\b720h\b|\b12\.4M\b|99\.94' "no fake counters/metrics in hero"

# ── Summary ─────────────────────────────────────────────────────────────────
echo ""
echo "──────────────────────────────────────────────────"
TOTAL=$((PASS + FAIL))
echo "RESULT: $PASS/$TOTAL"
if [ "$FAIL" -gt 0 ]; then echo "STATUS: FAIL"; exit 1; fi
echo "STATUS: PASS"; exit 0
