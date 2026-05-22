#!/usr/bin/env bash
# 017-homepage-pdf-exact-match.sh — PDF Exact-Match Verification
# Verifies that all homepage sections match the design from UI Work.pdf.
# Parent spec: specs/homepage-pdf-exact-match.md

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
cd "${REPO_ROOT}"

PASS=0
FAIL=0

ok()   { echo "  PASS: $1"; PASS=$((PASS + 1)); }
fail() { echo "  FAIL: $1"; FAIL=$((FAIL + 1)); }
section() { echo ""; echo "── $1 ──"; }

echo "017-homepage-pdf-exact-match: PDF Design Exact-Match Verification"
echo ""

# ── 1. Header nav ────────────────────────────────────────────────────────────
section "Header"

grep -q "Governance" src/components/header.tsx src/data/content.ts 2>/dev/null \
  && ok "Header nav includes Governance link" || fail "Header nav missing Governance link"
grep -q "Evidence" src/components/header.tsx src/data/content.ts 2>/dev/null \
  && ok "Header nav includes Evidence link" || fail "Header nav missing Evidence link"
grep -q "Book.*Audit\|Book Operational Audit" src/components/header.tsx 2>/dev/null \
  && ok "Header CTA is Book Audit variant" || fail "Header CTA missing Book Audit"

# ── 2. Footer ────────────────────────────────────────────────────────────────
section "Footer"

grep -q "SYSTEMS\|Systems" src/components/footer.tsx 2>/dev/null \
  && ok "Footer has SYSTEMS column" || fail "Footer missing SYSTEMS column"
grep -q "ENGAGE\|Engage" src/components/footer.tsx 2>/dev/null \
  && ok "Footer has ENGAGE column" || fail "Footer missing ENGAGE column"
grep -q "LEGAL\|Legal" src/components/footer.tsx 2>/dev/null \
  && ok "Footer has LEGAL column" || fail "Footer missing LEGAL column"
grep -q "STATUS.*ALL SYSTEMS NOMINAL\|ALL SYSTEMS NOMINAL" src/components/footer.tsx 2>/dev/null \
  && ok "Footer bottom bar has STATUS · ALL SYSTEMS NOMINAL" || fail "Footer missing STATUS bar"
grep -q "Operational Systems Engineering" src/components/footer.tsx 2>/dev/null \
  && ok "Footer contains Operational Systems Engineering" || fail "Footer missing Operational Systems Engineering"
grep -q "Principal" src/components/footer.tsx 2>/dev/null \
  && ok "Footer has Principal link" || fail "Footer missing Principal link"
grep -q "Continuity" src/components/footer.tsx 2>/dev/null \
  && ok "Footer has Continuity link" || fail "Footer missing Continuity link"
grep -q "/audit" src/components/footer.tsx 2>/dev/null \
  && ok "Footer has /audit link" || fail "Footer missing /audit link"

# ── 3. Hero section ──────────────────────────────────────────────────────────
section "Hero"

grep -q "DEPLOYED.SYSTEMS.*PROD\|DEPLOYED\.SYSTEMS" src/components/sections/hero.tsx 2>/dev/null \
  && ok "Hero status panel header: DEPLOYED.SYSTEMS · PROD" || fail "Hero missing DEPLOYED.SYSTEMS header"
grep -q "GOVERNED" src/components/sections/hero.tsx 2>/dev/null \
  && ok "Hero status rows have GOVERNED pill" || fail "Hero missing GOVERNED pill"
grep -q "WATCH" src/components/sections/hero.tsx 2>/dev/null \
  && ok "Hero status rows have WATCH pill" || fail "Hero missing WATCH pill"
grep -q "720h\|733h\|746h" src/components/sections/hero.tsx 2>/dev/null \
  && ok "Hero status rows have hours-format uptime" || fail "Hero missing hours-format uptime"

# ── 4. FailureThesis ─────────────────────────────────────────────────────────
section "FailureThesis"

grep -q "THE PROBLEM\|The Problem\|THE_PROBLEM" src/components/sections/failure-thesis.tsx 2>/dev/null \
  && ok "FailureThesis has THE PROBLEM eyebrow" || fail "FailureThesis missing THE PROBLEM eyebrow"
grep -q "GOVERNED\|⏵" src/components/sections/failure-thesis.tsx 2>/dev/null \
  && ok "FailureThesis rows have GOVERNED pill" || fail "FailureThesis missing GOVERNED pill"
grep -q "SCHEMATIC.V1\|SCHEMATIC" src/components/sections/failure-thesis.tsx 2>/dev/null \
  && ok "FailureThesis has SCHEMATIC footer label" || fail "FailureThesis missing SCHEMATIC label"
grep -q "ChokeDiagram" src/components/sections/failure-thesis.tsx 2>/dev/null \
  && ok "FailureThesis mounts ChokeDiagram" || fail "FailureThesis missing ChokeDiagram"

# ── 5. Services ──────────────────────────────────────────────────────────────
section "Services"

grep -q "THE SOLUTION\|The Solution" src/components/sections/services.tsx 2>/dev/null \
  && ok "Services has THE SOLUTION eyebrow" || fail "Services missing THE SOLUTION eyebrow"
grep -q "SYS-01\|SYS-0" src/components/sections/services.tsx 2>/dev/null \
  && ok "Services cards have SYS-XX notation" || fail "Services missing SYS-XX notation"
grep -q "VIEW SYSTEM\|view system" src/components/sections/services.tsx 2>/dev/null \
  && ok "Services cards have VIEW SYSTEM link" || fail "Services missing VIEW SYSTEM link"
grep -q "grid-cols-1.*md:grid-cols-2\|md:grid-cols-2" src/components/sections/services.tsx 2>/dev/null \
  && ok "Services uses 2-column grid" || fail "Services missing 2-column grid"

# ── 6. Governance ────────────────────────────────────────────────────────────
section "Governance"

grep -q "GOVERNANCE LAYER\|Governance Layer\|governance-layer\|governance" src/components/sections/governance.tsx 2>/dev/null \
  && ok "Governance has GOVERNANCE LAYER eyebrow" || fail "Governance missing GOVERNANCE LAYER eyebrow"
grep -qE "/ 06|01 / 06|01/06|padStart.*06|06.*padStart" src/components/sections/governance.tsx 2>/dev/null \
  && ok "Governance properties have 01/06 label format" || fail "Governance missing 01/06 label format"
grep -q "setInterval\|2400" src/components/sections/governance.tsx 2>/dev/null \
  && ok "Governance audit ticker has interval" || fail "Governance missing audit ticker interval"

# ── 7. Industries ────────────────────────────────────────────────────────────
section "Industries"

grep -q "HIGH-ACCOUNTABILITY\|High-Accountability" src/components/sections/industries.tsx 2>/dev/null \
  && ok "Industries has HIGH-ACCOUNTABILITY ENVIRONMENTS eyebrow" || fail "Industries missing eyebrow"
grep -q "SEG-01\|SEG-0" src/components/sections/industries.tsx 2>/dev/null \
  && ok "Industries cards have SEG-XX notation" || fail "Industries missing SEG-XX notation"
grep -q "em-dash\|— \|\"—\"" src/components/sections/industries.tsx 2>/dev/null \
  && ok "Industries bullets use em-dash" || fail "Industries missing em-dash bullets"

# ── 8. Results / Operational Evidence ────────────────────────────────────────
section "Results"

grep -q "OPERATIONAL EVIDENCE\|Operational Evidence" src/components/sections/results.tsx 2>/dev/null \
  && ok "Results has OPERATIONAL EVIDENCE eyebrow" || fail "Results missing OPERATIONAL EVIDENCE eyebrow"
grep -q "2.5×\|2–5×\|2-5x" src/components/sections/results.tsx 2>/dev/null \
  && ok "Results has 2-5x metric" || fail "Results missing 2-5x metric"
grep -q "+10–25\|10-25\|10–25" src/components/sections/results.tsx 2>/dev/null \
  && ok "Results has +10-25% metric" || fail "Results missing +10-25% metric"
grep -q "~56" src/components/sections/results.tsx 2>/dev/null \
  && ok "Results has ~56 metric" || fail "Results missing ~56 metric"

# ── 9. Failure Mode Registry standalone section ───────────────────────────────
section "FailureModeRegistry (standalone)"

[ -f "src/components/sections/failure-mode-registry.tsx" ] \
  && ok "failure-mode-registry.tsx exists" || fail "failure-mode-registry.tsx missing"
grep -q "FM-001" src/components/sections/failure-mode-registry.tsx 2>/dev/null \
  && ok "FailureModeRegistry has FM-001" || fail "FailureModeRegistry missing FM-001"
grep -q "FM-006" src/components/sections/failure-mode-registry.tsx 2>/dev/null \
  && ok "FailureModeRegistry has FM-006" || fail "FailureModeRegistry missing FM-006"
grep -q "CRITICAL" src/components/sections/failure-mode-registry.tsx 2>/dev/null \
  && ok "FailureModeRegistry has CRITICAL severity" || fail "FailureModeRegistry missing CRITICAL severity"
grep -q "FailureModeRegistry" src/app/page.tsx 2>/dev/null \
  && ok "FailureModeRegistry mounted on homepage" || fail "FailureModeRegistry not mounted on homepage"

# ── 10. Contact ───────────────────────────────────────────────────────────────
section "Contact"

grep -q "THE FIRST MOVE\|The First Move" src/components/sections/contact.tsx 2>/dev/null \
  && ok "Contact has THE FIRST MOVE eyebrow" || fail "Contact missing THE FIRST MOVE eyebrow"
grep -q "Book.*30.*min\|30-min\|30 min" src/components/sections/contact.tsx 2>/dev/null \
  && ok "Contact has Book 30-min Audit CTA" || fail "Contact missing Book 30-min Audit CTA"
grep -q "OUT-01\|outuput\|auditDeliverables" src/components/sections/contact.tsx 2>/dev/null \
  && ok "Contact has OUT-01 deliverables" || fail "Contact missing OUT-01 deliverables"
! grep -q "ContactForm\|contact-form" src/components/sections/contact.tsx 2>/dev/null \
  && ok "Contact has no ContactForm (removed per spec)" || fail "Contact still has ContactForm"
grep -q "bg-\[hsl.*220.*24\|bg-structure\|hsl(220" src/components/sections/contact.tsx 2>/dev/null \
  && ok "Contact has dark background" || fail "Contact missing dark background"

# ── 11. ByteOfTheWeek ────────────────────────────────────────────────────────
section "ByteOfTheWeek"

grep -qE "BYTE.*B-|BYTE.*code|BYTE.*{code}|const code.*B-" src/components/sections/byte-of-the-week.tsx 2>/dev/null \
  && ok "ByteOfTheWeek has BYTE · B-XX eyebrow" || fail "ByteOfTheWeek missing BYTE · B-XX eyebrow"
grep -qi "OPERATIONAL INTELLIGENCE\|operational intelligence\|operational-intelligence" src/components/sections/byte-of-the-week.tsx 2>/dev/null \
  && ok "ByteOfTheWeek preview card has OPERATIONAL INTELLIGENCE" || fail "ByteOfTheWeek missing OPERATIONAL INTELLIGENCE in preview"

# ── 12. FAQ ───────────────────────────────────────────────────────────────────
section "FAQ"

grep -q "Operational questions, answered\|operational questions" src/components/sections/faq.tsx 2>/dev/null \
  && ok "FAQ has 'Operational questions, answered.' heading" || fail "FAQ missing correct heading"
grep -qE 'Q\.\$\{|Q\.0|Q\.[0-9]|const label.*Q\.' src/components/sections/faq.tsx 2>/dev/null \
  && ok "FAQ items have Q.01 notation" || fail "FAQ missing Q.01 notation"

# ── 13. Page order ────────────────────────────────────────────────────────────
section "Page order"

grep -q "FailureModeRegistry" src/app/page.tsx 2>/dev/null \
  && ok "page.tsx imports/renders FailureModeRegistry" || fail "page.tsx missing FailureModeRegistry"
! grep -q "AgentAdvantage" src/app/page.tsx 2>/dev/null \
  && ok "AgentAdvantage removed from homepage" || fail "AgentAdvantage still in homepage"

# ── 14. Anti-theater ─────────────────────────────────────────────────────────
section "Anti-theater"

THEATER_FAIL=0
for f in \
  src/components/header.tsx \
  src/components/footer.tsx \
  src/components/sections/hero.tsx \
  src/components/sections/failure-thesis.tsx \
  src/components/sections/services.tsx \
  src/components/sections/governance.tsx \
  src/components/sections/industries.tsx \
  src/components/sections/results.tsx \
  src/components/sections/failure-mode-registry.tsx \
  src/components/sections/contact.tsx \
  src/components/sections/byte-of-the-week.tsx \
  src/components/sections/faq.tsx; do
  if grep -qE "animate-pulse|animate-ping|animate-bounce|animate-spin|bg-gradient-|rounded-2xl|shadow-2xl|backdrop-blur" "$f" 2>/dev/null; then
    THEATER_FAIL=$((THEATER_FAIL + 1))
    echo "    (theater violation in: $f)"
  fi
done
if [ "$THEATER_FAIL" -eq 0 ]; then
  ok "no anti-theater violations in modified files"
else
  fail "anti-theater violations found ($THEATER_FAIL file(s))"
fi

# ── 15. Prior regression ─────────────────────────────────────────────────────
section "Prior regression (009-016)"

for script in \
  scripts/verification/009-phase-c-institutional-identity.sh \
  scripts/verification/010-phase-d-governance-proof-foundation.sh \
  scripts/verification/011-d1-5-institutional-cognition-stabilization.sh \
  scripts/verification/012-d2-auditability-and-deployment-foundation.sh \
  scripts/verification/013-d2-5-evidence-cognition-simplification.sh \
  scripts/verification/014-phase-e-audit-surface-foundation.sh \
  scripts/verification/015-rhythm-lab-archetypes.sh \
  scripts/verification/016-homepage-design-v2.sh; do
  if bash "$script" > /dev/null 2>&1; then
    ok "$(basename $script) passes"
  else
    fail "$(basename $script) FAILED"
  fi
done

# ── Summary ───────────────────────────────────────────────────────────────────
echo ""
echo "017-homepage-pdf-exact-match result: ${PASS} pass, ${FAIL} fail"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
exit 0
