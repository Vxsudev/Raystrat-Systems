#!/usr/bin/env bash
# 018-rhythm-lab-detheatricalization.sh — De-theatricalization Pass Verification
# Verifies removal of fictional-runtime semantics and preservation of structural rhythm.
# Parent spec: specs/rhythm-lab-detheatricalization.md
# Recon:       ai/recon/rhythm-lab-detheatricalization-recon.md

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
cd "${REPO_ROOT}"

PASS=0
FAIL=0

ok()   { echo "  PASS: $1"; PASS=$((PASS + 1)); }
fail() { echo "  FAIL: $1"; FAIL=$((FAIL + 1)); }
section() { echo ""; echo "── $1 ──"; }

# Helper: assert pattern absent from a path (uses grep -rE; case-sensitive)
assert_absent() {
  local pattern="$1"
  local path="$2"
  local label="$3"
  if grep -rEq -- "$pattern" "$path" 2>/dev/null; then
    fail "$label"
  else
    ok "$label"
  fi
}

# Helper: assert pattern present in a file
assert_present() {
  local pattern="$1"
  local path="$2"
  local label="$3"
  if grep -Eq -- "$pattern" "$path" 2>/dev/null; then
    ok "$label"
  else
    fail "$label"
  fi
}

# Helper: assert path exists
assert_exists() {
  local path="$1"
  local label="$2"
  if [ -e "$path" ]; then
    ok "$label"
  else
    fail "$label"
  fi
}

# Helper: assert path does NOT exist
assert_not_exists() {
  local path="$1"
  local label="$2"
  if [ ! -e "$path" ]; then
    ok "$label"
  else
    fail "$label"
  fi
}

echo "018-rhythm-lab-detheatricalization: De-theatricalization Pass Verification"
echo ""

# ── A. Fictional runtime semantics — must be absent ─────────────────────────
section "A. Forbidden fictional-runtime semantics"

assert_absent '\bLIVE\b' src/components/sections/ "no \`LIVE\` status badge in sections/"
assert_absent '\bLIVE\b' src/components/ui/      "no \`LIVE\` status badge in ui/"
assert_absent 'tail -f'              src/ "no \`tail -f\` chrome anywhere in src/"
assert_absent '/var/log/'            src/ "no fictional /var/log/ paths"
assert_absent 'ALL SYSTEMS NOMINAL'  src/ "no \"ALL SYSTEMS NOMINAL\" semantics"
assert_absent 'All deployed systems nominal' src/ "no \"All deployed systems nominal\" tooltip"
assert_absent 'DEPLOYED\.SYSTEMS'    src/ "no \"DEPLOYED.SYSTEMS\" header chrome"
assert_absent '\bv?4\.2\.1\b'        src/ "no fictional v4.2.1 release version"
assert_absent 'BUILD-2026'           src/ "no fictional BUILD-2026 stamp"
assert_absent 'system-pulse-dot'     src/ "no system-pulse-dot animation class"
assert_absent 'audit-row-anim'       src/ "no audit-row-anim shimmer class"

# ── B. Specific component-level removals ────────────────────────────────────
section "B. Removed components / data"

assert_not_exists src/components/ui/system-pulse.tsx "src/components/ui/system-pulse.tsx deleted"
assert_absent 'heroMeta'        src/data/content.ts   "heroMeta export removed from content.ts"
assert_absent 'HeroStatusPanel' src/components/sections/hero.tsx "HeroStatusPanel removed from hero"
assert_absent 'HeroMetaRow'     src/components/sections/hero.tsx "HeroMetaRow removed from hero"
assert_absent 'STATUS_ROWS'     src/components/sections/hero.tsx "STATUS_ROWS array removed"
assert_absent '147'             src/data/content.ts   "fictional 147 metric removed from content.ts"
assert_absent '12\.4M'          src/data/content.ts   "fictional 12.4M metric removed"
assert_absent '99\.94%'         src/data/content.ts   "fictional 99.94% SLA metric removed"
assert_absent '⏵ GOVERNED'      src/components/sections/failure-thesis.tsx "GOVERNED per-row pill removed from failure-thesis"

# ── C. Governance panel detheatricalization ─────────────────────────────────
section "C. Governance audit panel"

assert_absent 'setInterval'    src/components/sections/governance.tsx "no setInterval in governance.tsx (no simulated rotation)"
assert_absent 'new Date('      src/components/sections/governance.tsx "no real-time Date construction in governance.tsx"
assert_absent 'use client'     src/components/sections/governance.tsx "governance.tsx is server-rendered (no 'use client')"
assert_absent 'text-green-400' src/components/sections/governance.tsx "no green outcome color in governance.tsx"
assert_absent 'text-amber-400' src/components/sections/governance.tsx "no amber outcome color in governance.tsx"

# ── D. Dashboard-cosplay color treatments — absent from sections ────────────
section "D. Dashboard cosplay color treatments"

assert_absent 'bg-green-950'  src/components/sections/ "no bg-green-950 dashboard pill in sections/"
assert_absent 'bg-amber-950'  src/components/sections/ "no bg-amber-950 dashboard pill in sections/"
assert_absent 'bg-red-950'    src/components/sections/ "no bg-red-950 dashboard pill in sections/"
assert_absent 'border-green-800' src/components/sections/ "no border-green-800 pill chrome in sections/"
assert_absent 'border-amber-800' src/components/sections/ "no border-amber-800 pill chrome in sections/"
assert_absent 'border-red-800'   src/components/sections/ "no border-red-800 pill chrome in sections/"

# ── E. Footer cleanliness ───────────────────────────────────────────────────
section "E. Footer"

assert_absent 'STATUS · ALL SYSTEMS NOMINAL' src/components/footer.tsx "footer status row removed"
assert_absent 'v4\.2\.1'                     src/components/footer.tsx "footer version chrome removed"
assert_absent 'BUILD-2026'                   src/components/footer.tsx "footer build stamp removed"
assert_present 'Raystrat Systems · Operational Systems Engineering' src/components/footer.tsx "footer copyright preserved (institutional identity)"

# ── F. Header cleanliness ───────────────────────────────────────────────────
section "F. Header"

assert_absent 'SystemPulse'  src/components/header.tsx "header no longer references SystemPulse"
assert_absent 'system-pulse' src/components/header.tsx "header no longer imports system-pulse"

# ── G. TweaksPanel removed ──────────────────────────────────────────────────
section "G. TweaksPanel fully removed (decosplay directive #1)"

# Decosplay removed the Ledger/Editorial/Blueprint switcher entirely (it rendered on
# the dev server under the prior NODE_ENV gate). Mount + component now deleted.
assert_absent 'TweaksPanel' src/app/page.tsx "TweaksPanel mount removed from page.tsx"

# ── H. Preservation invariants ──────────────────────────────────────────────
section "H. Preservation invariants"

# Section arc (8 sections — decosplay deleted Results + FailureModeRegistry)
assert_present 'Hero'                src/app/page.tsx "page.tsx imports Hero"
assert_present 'FailureThesis'       src/app/page.tsx "page.tsx imports FailureThesis"
assert_present 'Services'            src/app/page.tsx "page.tsx imports Services"
assert_present 'Governance'          src/app/page.tsx "page.tsx imports Governance"
assert_present 'Industries'          src/app/page.tsx "page.tsx imports Industries"
assert_present 'Contact'             src/app/page.tsx "page.tsx imports Contact"
assert_present 'ByteOfTheWeek'       src/app/page.tsx "page.tsx imports ByteOfTheWeek"
assert_present 'Faq'                 src/app/page.tsx "page.tsx imports Faq"

# Diagrams directory still at 5 files
DIAGRAM_COUNT=$(ls -1 src/components/diagrams/ 2>/dev/null | wc -l | tr -d '[:space:]')
if [ "$DIAGRAM_COUNT" = "5" ]; then
  ok "src/components/diagrams/ preserves 5 schematic diagrams"
else
  fail "expected 5 diagrams, found $DIAGRAM_COUNT"
fi

# Hero typography-first (decosplay removed the detheatricalization-era schematic panel)
assert_present 'Operational Breakdown' src/components/sections/hero.tsx "hero retains headline"
assert_absent 'HeroSurfaceReference' src/components/sections/hero.tsx "hero schematic panel removed (decosplay)"

# Governance audit panel removed by decosplay (property grid retained)
assert_present 'Governance by design' src/components/sections/governance.tsx "governance retains 6-property grid"
assert_absent 'Audit Trail — Entry Format' src/components/sections/governance.tsx "governance audit panel removed (decosplay)"

# Token preservation (Phase A primary + structure)
assert_present '--primary: 214 98% 40%'  src/app/globals.css "Phase A primary token preserved"
assert_present '--structure: 220 24% 12%' src/app/globals.css "Phase A structure token preserved"

# Rhythm-lab exploratory route preserved (target of original directive name; already clean)
assert_exists src/app/rhythm-lab/page.tsx "rhythm-lab exploratory page preserved"

# ── Summary ─────────────────────────────────────────────────────────────────
echo ""
echo "──────────────────────────────────────────────────"
TOTAL=$((PASS + FAIL))
echo "RESULT: $PASS/$TOTAL"
if [ "$FAIL" -gt 0 ]; then
  echo "STATUS: FAIL"
  exit 1
fi
echo "STATUS: PASS"
exit 0
