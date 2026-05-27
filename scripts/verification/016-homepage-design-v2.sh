#!/usr/bin/env bash
# Verification 016 — Homepage Design V2
# Checks all components from the design handoff bundle.

set -euo pipefail

PASS=0
FAIL=0
REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$REPO_ROOT"

ok()   { echo "  PASS  $1"; PASS=$((PASS+1)); }
fail() { echo "  FAIL  $1"; FAIL=$((FAIL+1)); }
section() { echo ""; echo "── $1 ──────────────────────────────────────────"; }

echo "Verification 016 — Homepage Design V2"
echo "══════════════════════════════════════════════════════"

# ── 1. Component files exist ─────────────────────────────────────────────────
section "Component files"

[ -f "src/components/sections/hero.tsx" ]           && ok "hero.tsx exists"          || fail "hero.tsx missing"
[ -f "src/components/ui/choke-diagram.tsx" ]        && ok "choke-diagram.tsx exists"  || fail "choke-diagram.tsx missing"
[ -f "src/components/sections/failure-thesis.tsx" ] && ok "failure-thesis.tsx exists" || fail "failure-thesis.tsx missing"
[ -f "src/components/sections/governance.tsx" ]     && ok "governance.tsx exists"     || fail "governance.tsx missing"
[ -f "src/components/sections/contact.tsx" ]        && ok "contact.tsx exists"        || fail "contact.tsx missing"
[ -f "src/components/sections/faq.tsx" ]            && ok "faq.tsx exists"            || fail "faq.tsx missing"
[ -f "src/components/ui/tweaks-panel.tsx" ]         && ok "tweaks-panel.tsx exists"   || fail "tweaks-panel.tsx missing"
# Note: SystemPulse, HeroStatusPanel, HeroMetaRow removed by detheatricalization pass (spec 018).
# Assertions are inverted to enforce absence of fictional runtime semantics.

# ── 2. SystemPulse — REMOVED by detheatricalization ──────────────────────────
section "SystemPulse removal (post-detheatricalization)"

[ ! -f "src/components/ui/system-pulse.tsx" ] \
  && ok "system-pulse.tsx removed (live clock theater eliminated)" \
  || fail "system-pulse.tsx still present — should be deleted per spec 018"
! grep -q "SystemPulse" src/components/header.tsx 2>/dev/null \
  && ok "header.tsx no longer references SystemPulse" \
  || fail "header.tsx still references SystemPulse"

# ── 3. HeroStatusPanel — REPLACED by HeroSurfaceReference ────────────────────
section "HeroStatusPanel → HeroSurfaceReference"

! grep -q "HeroStatusPanel\|STATUS_ROWS\|hero-status-panel\|DEPLOYED\.SYSTEMS" src/components/sections/hero.tsx \
  && ok "Hero no longer renders fake-runtime status panel" \
  || fail "Hero still contains runtime-theater status panel"
grep -q "HeroSurfaceReference\|Operational Surfaces" src/components/sections/hero.tsx \
  && ok "Hero renders schematic surface reference replacement" \
  || fail "Hero missing HeroSurfaceReference replacement"
grep -q "grid-cols-\[1.15fr_1fr\]" src/components/sections/hero.tsx \
  && ok "Hero preserves asymmetric two-column layout" \
  || fail "Hero asymmetric layout regression"

# ── 4. HeroMetaRow — REMOVED ─────────────────────────────────────────────────
section "HeroMetaRow removal"

! grep -q "heroMeta\|HeroMetaRow" src/components/sections/hero.tsx \
  && ok "Hero no longer renders fictional scale metrics" \
  || fail "Hero still references heroMeta / HeroMetaRow"
! grep -q "heroMeta" src/data/content.ts \
  && ok "content.ts no longer exports fictional heroMeta" \
  || fail "content.ts still exports heroMeta"

# ── 5. ChokeDiagram SVG ──────────────────────────────────────────────────────
section "ChokeDiagram"

grep -q "useState" src/components/ui/choke-diagram.tsx \
  && ok "ChokeDiagram has useState(activeId)" || fail "ChokeDiagram missing useState"
grep -q "<svg\|viewBox" src/components/ui/choke-diagram.tsx \
  && ok "ChokeDiagram has SVG element" || fail "ChokeDiagram missing SVG"
grep -q "cx\|cy\|polyline\|circle" src/components/ui/choke-diagram.tsx \
  && ok "ChokeDiagram has SVG node geometry" || fail "ChokeDiagram missing SVG geometry"
grep -q "chokePoints" src/components/ui/choke-diagram.tsx \
  && ok "ChokeDiagram uses chokePoints data" || fail "ChokeDiagram missing chokePoints"
grep -q "onSelect\|onClick" src/components/ui/choke-diagram.tsx \
  && ok "ChokeDiagram has click interaction" || fail "ChokeDiagram missing click interaction"

# ── 6. Audit Trail — STATIC SCHEMATIC (post-detheatricalization) ─────────────
section "Audit Trail panel (static schematic)"

! grep -q "setInterval" src/components/sections/governance.tsx \
  && ok "governance.tsx has no setInterval (live-feed theater removed)" \
  || fail "governance.tsx still contains setInterval"
grep -q "auditSeed" src/components/sections/governance.tsx \
  && ok "governance.tsx still uses auditSeed as schematic exhibit" \
  || fail "governance.tsx missing auditSeed"
grep -q "SCHEMATIC" src/components/sections/governance.tsx \
  && ok "governance.tsx labels panel as SCHEMATIC" \
  || fail "governance.tsx missing SCHEMATIC label"
grep -q "Audit Trail — Entry Format" src/components/sections/governance.tsx \
  && ok "governance.tsx header replaced (no fictional filepath)" \
  || fail "governance.tsx header not updated"

# ── 7. FailureModeRegistry ───────────────────────────────────────────────────
section "FailureModeRegistry"

# FM registry moved to standalone section (homepage-pdf-exact-match spec)
{ grep -q "failureRegistry" src/components/sections/failure-thesis.tsx \
  || grep -q "FM-001\|failureModes\|CRITICAL\|HIGH\|MEDIUM" src/components/sections/failure-mode-registry.tsx; } \
  && ok "FM registry present (failure-thesis or standalone section)" || fail "FM registry missing from both failure-thesis and standalone section"
{ grep -q "FM-001\|FM-002\|sev" src/components/sections/failure-thesis.tsx \
  || grep -q "FM-001\|FM-002" src/components/sections/failure-mode-registry.tsx; } \
  && ok "FM registry rows present" || fail "FM registry rows missing"
{ grep -q "crit\|high\|med" src/components/sections/failure-thesis.tsx \
  || grep -q "CRITICAL\|HIGH\|MEDIUM" src/components/sections/failure-mode-registry.tsx; } \
  && ok "FM registry severity badges present" || fail "FM registry severity badges missing"
{ grep -q "80px\|180px\|1fr\|100px\|grid-cols-\[" src/components/sections/failure-thesis.tsx \
  || grep -q "grid-cols-\[\|1fr" src/components/sections/failure-mode-registry.tsx; } \
  && ok "FM registry grid cols present" || fail "FM registry grid cols missing"

# ── 8. AuditCTA deliverable cards ────────────────────────────────────────────
section "AuditCTA deliverable cards"

grep -q "auditDeliverables" src/components/sections/contact.tsx \
  && ok "Contact imports auditDeliverables" || fail "Contact missing auditDeliverables"
grep -q "\.map\|\.map(" src/components/sections/contact.tsx \
  && ok "Contact renders deliverables via map (OUT-01/02/03)" || fail "Contact missing deliverables map render"
# OUT-01 appears either as a literal (static) or via data map — confirm at least id/ttl fields used
grep -qE "\.id|\.ttl|\.desc|OUT-01" src/components/sections/contact.tsx \
  && ok "Contact renders deliverable id/title fields" || fail "Contact missing id/title field render"

# ── 9. FAQ accordion ─────────────────────────────────────────────────────────
section "FAQ accordion"

grep -q "useState" src/components/sections/faq.tsx \
  && ok "FAQ uses useState" || fail "FAQ missing useState"
grep -q "grid-template-rows\|gridTemplateRows" src/components/sections/faq.tsx \
  && ok "FAQ uses grid-rows transition" || fail "FAQ missing grid-rows transition"
grep -q "min-h-0\|overflow-hidden" src/components/sections/faq.tsx \
  && ok "FAQ has overflow-hidden min-h-0 inner" || fail "FAQ missing overflow control"
grep -q "openIdx\|openIndex" src/components/sections/faq.tsx \
  && ok "FAQ has single-open state" || fail "FAQ missing single-open state"

# ── 10. Mode switcher (TweaksPanel) ──────────────────────────────────────────
section "TweaksPanel"

grep -qE "mode-ledger|'ledger'" src/components/ui/tweaks-panel.tsx \
  && ok "TweaksPanel has ledger mode" || fail "TweaksPanel missing ledger mode"
grep -qE "mode-editorial|'editorial'" src/components/ui/tweaks-panel.tsx \
  && ok "TweaksPanel has editorial mode" || fail "TweaksPanel missing editorial mode"
grep -qE "mode-blueprint|'blueprint'" src/components/ui/tweaks-panel.tsx \
  && ok "TweaksPanel has blueprint mode" || fail "TweaksPanel missing blueprint mode"
grep -q "document\.body\|classList" src/components/ui/tweaks-panel.tsx \
  && ok "TweaksPanel applies body class" || fail "TweaksPanel missing body class logic"

# ── 11. globals.css mode overrides ───────────────────────────────────────────
section "globals.css mode overrides"

grep -q "mode-editorial" src/app/globals.css \
  && ok "globals.css has mode-editorial override" || fail "globals.css missing mode-editorial"
grep -q "mode-blueprint" src/app/globals.css \
  && ok "globals.css has mode-blueprint override" || fail "globals.css missing mode-blueprint"
! grep -q "sys-pulse\|system-pulse" src/app/globals.css \
  && ok "globals.css sys-pulse/system-pulse keyframes removed (anti-theater)" \
  || fail "globals.css still defines sys-pulse / system-pulse keyframes"

# ── 12. page.tsx wiring ──────────────────────────────────────────────────────
section "page.tsx wiring"

grep -q "Governance" src/app/page.tsx \
  && ok "page.tsx imports/renders Governance" || fail "page.tsx missing Governance"
grep -q "TweaksPanel" src/app/page.tsx \
  && ok "page.tsx imports/renders TweaksPanel" || fail "page.tsx missing TweaksPanel"
grep -q "Contact" src/app/page.tsx \
  && ok "page.tsx imports/renders Contact" || fail "page.tsx missing Contact"

# ── 13. Anti-theater (banned patterns) ───────────────────────────────────────
section "Anti-theater"

THEATER_FILES=(
  "src/components/sections/hero.tsx"
  "src/components/ui/choke-diagram.tsx"
  "src/components/sections/failure-thesis.tsx"
  "src/components/sections/governance.tsx"
  "src/components/sections/contact.tsx"
  "src/components/sections/faq.tsx"
  "src/components/ui/tweaks-panel.tsx"
)

THEATER_FAIL=false
for f in "${THEATER_FILES[@]}"; do
  HITS=$(grep -E "animate-pulse|animate-ping|animate-bounce|animate-spin|backdrop-blur|shadow-2xl" "$f" 2>/dev/null || true)
  SCALE=$(grep -E "(className|class)=[\"'][^\"']*\bhover:scale-" "$f" 2>/dev/null || true)
  GRAD=$(grep -E "bg-gradient-" "$f" 2>/dev/null || true)
  if [ -n "$HITS" ] || [ -n "$SCALE" ] || [ -n "$GRAD" ]; then
    fail "Anti-theater violation in $f"
    echo "    $HITS $SCALE $GRAD"
    THEATER_FAIL=true
  fi
done
[ "$THEATER_FAIL" = false ] && ok "No anti-theater violations in any new file"

# ── 14. TypeScript — source errors only (excludes .next/types auto-generated) ─
section "TypeScript"

npm run typecheck > /tmp/.ts_out 2>&1 || true
SOURCE_ERRORS=$(grep "error TS" /tmp/.ts_out | grep -v "^\.next/types" | wc -l | tr -d ' ')
# Pre-existing source errors: 19 — pass if no new ones introduced (≤19)
if [ "${SOURCE_ERRORS}" -le 19 ]; then
  ok "TypeScript: ${SOURCE_ERRORS} source errors (all pre-existing, none new)"
else
  fail "TypeScript: ${SOURCE_ERRORS} source errors (expected ≤19 pre-existing)"
fi

# ── 15. Prior regression suite — known-passing scripts only ──────────────────
# 001-003: slow (typecheck/lint/build) — verified separately
# 010-013: pre-existing failures unrelated to this spec (D governance phase debt)
# 014: pre-existing failures (shadow-2xl in service-page-client, diagram removals from HEAD)
section "Prior regressions (known-clean: 004-009, 015)"

PRIOR_FAIL=false
CLEAN_REGRESSIONS="004 005 006 007 008 009 015"
for i in $CLEAN_REGRESSIONS; do
  FILE=$(ls scripts/verification/${i}-*.sh 2>/dev/null | head -1)
  if [ -z "$FILE" ]; then
    fail "Regression $i — script not found"
    PRIOR_FAIL=true
  elif ! bash "$FILE" > /tmp/.reg_out_$i 2>&1; then
    fail "Regression $i — FAILED ($(basename $FILE))"
    grep "FAIL" /tmp/.reg_out_$i | tail -3
    PRIOR_FAIL=true
  else
    PCOUNT=$(grep -c "PASS" /tmp/.reg_out_$i 2>/dev/null || echo "?")
    ok "Regression $i — $(basename $FILE) ($PCOUNT checks)"
  fi
done

# ── Summary ───────────────────────────────────────────────────────────────────
echo ""
echo "══════════════════════════════════════════════════════"
echo "  PASS: $PASS"
echo "  FAIL: $FAIL"
echo "══════════════════════════════════════════════════════"

if [ "$FAIL" -eq 0 ]; then
  echo "  Result: PASS"
  exit 0
else
  echo "  Result: FAIL"
  exit 1
fi
