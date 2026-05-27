#!/usr/bin/env bash
# 019-rhythm-lab-decosplay.sh — De-Cosplay / De-Hype Reduction Verification
# Verifies deletion of simulated operational evidence, reversion of over-editorialized
# layouts to grounded card architecture, and removal of decorative diagrams.
# Parent spec: specs/rhythm-lab-decosplay.md
# Recon:       ai/recon/rhythm-lab-decosplay-recon.md

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
cd "${REPO_ROOT}"

PASS=0
FAIL=0
ok()   { echo "  PASS: $1"; PASS=$((PASS + 1)); }
fail() { echo "  FAIL: $1"; FAIL=$((FAIL + 1)); }
section() { echo ""; echo "── $1 ──"; }

assert_absent_file() { [ ! -e "$1" ] && ok "$2" || fail "$2"; }
assert_present() { grep -Eq -- "$1" "$2" 2>/dev/null && ok "$3" || fail "$3"; }
assert_absent()  { grep -rEq -- "$1" "$2" 2>/dev/null && fail "$3" || ok "$3"; }

echo "019-rhythm-lab-decosplay: De-Cosplay / De-Hype Reduction Verification"
echo ""

# ── A. Deleted sections fully removed ────────────────────────────────────────
section "A. Section deletions"

assert_absent_file src/components/sections/results.tsx            "results.tsx (Operational Evidence) deleted"
assert_absent_file src/components/sections/failure-mode-registry.tsx "failure-mode-registry.tsx deleted"
assert_absent_file src/components/ui/choke-diagram.tsx            "choke-diagram.tsx (decorative pipeline) deleted"

# ── B. No orphaned references on homepage ────────────────────────────────────
section "B. No orphaned references"

assert_absent '<Results' src/app/page.tsx                "page.tsx does not mount <Results>"
assert_absent '<FailureModeRegistry' src/app/page.tsx    "page.tsx does not mount <FailureModeRegistry>"
assert_absent "from '@/components/sections/results'" src/app/page.tsx "page.tsx does not import results"
assert_absent "from '@/components/sections/failure-mode-registry'" src/app/page.tsx "page.tsx does not import failure-mode-registry"
assert_absent 'ChokeDiagram' src/components/sections/failure-thesis.tsx "failure-thesis no longer references ChokeDiagram"

# ── C. Orphaned data removed ─────────────────────────────────────────────────
section "C. Dead data removed"

assert_absent 'auditSeed' src/data/content.ts       "auditSeed export removed from content.ts"
assert_absent 'failureRegistry' src/data/content.ts "failureRegistry export removed from content.ts"

# ── D. Hero — typography-first, no schematic panel ───────────────────────────
section "D. Hero cleanup"

assert_absent 'HeroSurfaceReference' src/components/sections/hero.tsx "hero has no HeroSurfaceReference schematic panel"
assert_absent 'Schematic Reference'  src/components/sections/hero.tsx "hero has no schematic-reference chrome"
assert_absent '/ 05'                 src/components/sections/hero.tsx "hero has no /05 counter"
assert_present 'Operational Breakdown' src/components/sections/hero.tsx "hero retains headline"
assert_present 'CalendlyButton'        src/components/sections/hero.tsx "hero retains CTA"

# ── E. FailureThesis — static documentary list ───────────────────────────────
section "E. FailureThesis"

assert_absent "use client"            src/components/sections/failure-thesis.tsx "failure-thesis is static (no 'use client')"
assert_absent 'SCHEMATIC.V1'          src/components/sections/failure-thesis.tsx "failure-thesis has no schematic pipeline footer"
assert_present 'chokePoints'          src/components/sections/failure-thesis.tsx "failure-thesis retains choke-point list"

# ── F. Services — grounded card architecture ─────────────────────────────────
section "F. Services card grid"

assert_present "from '@/components/ui/card'" src/components/sections/services.tsx "services uses Card primitive"
assert_present 'service.icon'                src/components/sections/services.tsx "services cards carry icons"
assert_present 'lg:grid-cols-3'              src/components/sections/services.tsx "services uses 3-col card grid"
assert_present 'View System'                 src/components/sections/services.tsx "services retains View System link"

# ── G. Governance — audit-trail panel removed, property grid kept ────────────
section "G. Governance"

assert_absent 'Audit Trail — Entry Format' src/components/sections/governance.tsx "audit-trail dark panel removed"
assert_absent 'auditSeed'                  src/components/sections/governance.tsx "governance no longer imports auditSeed"
assert_absent 'hsl(220_24%_12%)'           src/components/sections/governance.tsx "governance dark audit band removed"
assert_present 'Governance by design'      src/components/sections/governance.tsx "governance retains 6-property grid"

# ── H. Industries — grounded card architecture ───────────────────────────────
section "H. Industries card grid"

assert_present "from '@/components/ui/card'" src/components/sections/industries.tsx "industries uses Card primitive"
assert_present 'lg:grid-cols-3'              src/components/sections/industries.tsx "industries uses 3-col card grid"
assert_absent 'SEG-0'                        src/components/sections/industries.tsx "industries SEG-XX flat-slab notation removed"

# ── I. Bytes — restrained layout ─────────────────────────────────────────────
section "I. Bytes"

assert_absent 'Operational Intelligence' src/components/sections/byte-of-the-week.tsx "bytes metadata sidecard label removed"
assert_absent 'BYTE · ' src/components/sections/byte-of-the-week.tsx "bytes oversized BYTE · B-XX eyebrow removed"
assert_present 'Latest Insight' src/components/sections/byte-of-the-week.tsx "bytes restrained prior layout restored"

# ── J. Homepage section arc (8 sections) ─────────────────────────────────────
section "J. Section arc"

for s in Hero FailureThesis Services Governance Industries Contact ByteOfTheWeek Faq; do
  assert_present "<$s" src/app/page.tsx "page.tsx mounts <$s>"
done

SECTION_COUNT=$(find src/components/sections -name "*.tsx" 2>/dev/null | wc -l | tr -d '[:space:]')
if [ "$SECTION_COUNT" = "10" ]; then
  ok "src/components/sections has 10 files (results + failure-mode-registry deleted)"
else
  fail "expected 10 section files, found $SECTION_COUNT"
fi

# ── K. Preserved surfaces (not in directive) ─────────────────────────────────
section "K. Preservation"

assert_present 'FailureModeRegistryPreview' src/app/audit/page.tsx "trust-evidence preview retained on /audit"
assert_present 'DeploymentLifecycleDiagram'  src/app/audit/page.tsx "lifecycle diagram retained on /audit"
[ -f src/components/sections/contact.tsx ] && ok "contact.tsx preserved" || fail "contact.tsx missing"
[ -f src/components/sections/faq.tsx ] && ok "faq.tsx preserved" || fail "faq.tsx missing"
assert_present 'auditDeliverables' src/components/sections/contact.tsx "contact retains OUT-01/02/03 deliverables"
assert_present 'primary: 214 98% 40%' src/app/globals.css "primary token preserved"

# ── L. Dead CSS removed ──────────────────────────────────────────────────────
section "L. Dead CSS"

assert_absent 'hero-status-panel' src/app/globals.css "dead .hero-status-panel selector removed"
assert_absent '#results'          src/app/globals.css "dead #results mode selector removed"
assert_absent '#evidence'         src/app/globals.css "dead #evidence mode selector removed"
assert_absent 'mode-editorial|mode-blueprint|mode-ledger' src/app/globals.css "dead mode-* selectors removed"

# ── M. Ledger/Editorial/Blueprint switcher removed (directive #1) ────────────
section "M. Mode switcher removed"

assert_absent_file src/components/ui/tweaks-panel.tsx "tweaks-panel.tsx (Ledger/Editorial/Blueprint) deleted"
assert_absent 'TweaksPanel' src/app/page.tsx          "TweaksPanel mount removed from homepage"

# ── Summary ─────────────────────────────────────────────────────────────────
echo ""
echo "──────────────────────────────────────────────────"
TOTAL=$((PASS + FAIL))
echo "RESULT: $PASS/$TOTAL"
if [ "$FAIL" -gt 0 ]; then echo "STATUS: FAIL"; exit 1; fi
echo "STATUS: PASS"; exit 0
