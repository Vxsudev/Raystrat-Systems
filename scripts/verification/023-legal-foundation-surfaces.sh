#!/usr/bin/env bash
# 023-legal-foundation-surfaces.sh — Legal Foundation Surfaces v1
# Verifies the resurfaced Privacy + Terms surfaces: routes exist, footer links them,
# required content present, governing law = India, cookie disclosure embedded (no banner),
# the four other trust surfaces remain deferred, and no fake-compliance / banned language.
# Parent capability: LEGAL_FOUNDATION_SURFACES_V1

set -uo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
cd "${REPO_ROOT}"

PRIV="src/app/privacy/page.tsx"
TERMS="src/app/terms/page.tsx"
FTR="src/components/footer.tsx"
PRIV_TXT="$( [ -f "$PRIV" ] && cat "$PRIV" || echo "" )"
TERMS_TXT="$( [ -f "$TERMS" ] && cat "$TERMS" || echo "" )"
BOTH_TXT="${PRIV_TXT}
${TERMS_TXT}"
COOKIE_DEF="ai/deferred/cookie-consent-banner.md"

PASS=0
FAIL=0
ok()   { echo "  PASS: $1"; PASS=$((PASS + 1)); }
fail() { echo "  FAIL: $1"; FAIL=$((FAIL + 1)); }
section() { echo ""; echo "── $1 ──"; }
# has <haystack-text> <regex>  — case-insensitive grep over a text blob
has() { echo "$1" | grep -qiE "$2"; }

echo "023-legal-foundation-surfaces: Legal Foundation Surfaces Verification"
echo ""

# ── A. Routes exist and export metadata ──────────────────────────────────────
section "A. Privacy + Terms routes"
[ -f "$PRIV" ]  && ok "privacy route exists ($PRIV)"   || fail "privacy route missing ($PRIV)"
[ -f "$TERMS" ] && ok "terms route exists ($TERMS)"    || fail "terms route missing ($TERMS)"
has "$PRIV_TXT"  "export const metadata" && ok "privacy exports metadata" || fail "privacy missing metadata"
has "$TERMS_TXT" "export const metadata" && ok "terms exports metadata"   || fail "terms missing metadata"
has "$PRIV_TXT"  "<Header" && has "$PRIV_TXT" "<Footer" && ok "privacy renders Header+Footer" || fail "privacy missing Header/Footer"
has "$TERMS_TXT" "<Header" && has "$TERMS_TXT" "<Footer" && ok "terms renders Header+Footer"   || fail "terms missing Header/Footer"

# ── B. Footer links Privacy + Terms; four surfaces stay deferred ─────────────
section "B. Footer legal navigation"
has "$(cat "$FTR")" "/privacy" && ok "footer links /privacy" || fail "footer missing /privacy link"
has "$(cat "$FTR")" "/terms"   && ok "footer links /terms"   || fail "footer missing /terms link"
# Check for actual links (route hrefs), not bare words — the footer comment may
# legitimately name the deferred surfaces while not linking them.
for path in /documentation /trust /principal /continuity; do
  if grep -qE "href=[\"']${path}[\"']|href:[[:space:]]*['\"]${path}['\"]" "$FTR" 2>/dev/null; then
    fail "footer links still-deferred surface '$path'"
  else
    ok "footer does not link still-deferred surface '$path'"
  fi
done
# Restrained placement: no restored "Legal" column / old legalLinks array
grep -q "legalLinks" "$FTR" 2>/dev/null && fail "footer reintroduced old legalLinks array" || ok "no old legalLinks array"
grep -q "sm:grid-cols-2" "$FTR" 2>/dev/null && ! grep -q "md:grid-cols-3" "$FTR" 2>/dev/null \
  && ok "footer grid stays 2-col (no restored Legal column)" || fail "footer grid changed / Legal column restored"

# ── C. Required Privacy content ──────────────────────────────────────────────
section "C. Privacy required content"
has "$PRIV_TXT" "effective"                              && ok "effective date"            || fail "missing effective date"
has "$PRIV_TXT" "raystrat systems"                       && ok "company identification"    || fail "missing company identification"
has "$PRIV_TXT" "information we collect|information you submit" && ok "information collected" || fail "missing information collected"
has "$PRIV_TXT" "contact (and audit )?form|form"         && ok "contact-form data handling" || fail "missing contact-form handling"
has "$PRIV_TXT" "cookie"                                 && ok "cookie disclosure section" || fail "missing cookie disclosure"
has "$PRIV_TXT" "firebase"                               && ok "discloses Firebase"        || fail "missing Firebase disclosure"
has "$PRIV_TXT" "sendgrid"                               && ok "discloses SendGrid"        || fail "missing SendGrid disclosure"
has "$PRIV_TXT" "genkit|generative ai|ai providers?|ai (processing|infrastructure)" && ok "AI provider processing disclosure" || fail "missing AI processing disclosure"
has "$PRIV_TXT" "retention|retain|keep"                  && ok "data retention statement"  || fail "missing data retention"
has "$PRIV_TXT" "security"                               && ok "security statement"        || fail "missing security statement"
has "$PRIV_TXT" "international|other countries|outside your" && ok "international processing" || fail "missing international processing"
has "$PRIV_TXT" "changes to this notice|update this notice|we may update" && ok "policy updates clause" || fail "missing policy updates clause"
has "$PRIV_TXT" "team@raystratsystems.com"               && ok "contact email present"     || fail "missing contact email"

# ── D. Required Terms content ────────────────────────────────────────────────
section "D. Terms required content"
has "$TERMS_TXT" "operational systems|automation workflows|reporting infrastructure" && ok "scope of services" || fail "missing scope of services"
has "$TERMS_TXT" "clients? remain responsible|your responsibilit" && ok "client responsibilities" || fail "missing client responsibilities"
has "$TERMS_TXT" "third-party|third party"               && ok "third-party dependency disclaimer" || fail "missing third-party disclaimer"
has "$TERMS_TXT" "ai (output|-generated)|artificial intelligence" && ok "AI output disclaimer" || fail "missing AI output disclaimer"
has "$TERMS_TXT" "no guarantee|do not guarantee|make no guarantee" && ok "no-guaranteed-outcomes clause" || fail "missing no-outcomes clause"
has "$TERMS_TXT" "intellectual property"                 && ok "IP boundaries"             || fail "missing IP boundaries"
has "$TERMS_TXT" "modify, suspend|discontinue|terminat"  && ok "modification/termination rights" || fail "missing modification/termination"
has "$TERMS_TXT" "limitation of liability|not liable"    && ok "limitation of liability"   || fail "missing limitation of liability"
has "$TERMS_TXT" "laws of india|governed by the laws of india" && ok "governing law = India" || fail "governing law not India"
has "$TERMS_TXT" "sole decision authority|sole-decision|sole decision" && ok "disclaims sole AI decision authority" || fail "missing sole-AI-authority disclaimer"

# ── E. No cookie consent banner / popup anywhere ─────────────────────────────
section "E. Cookie banner intentionally absent"
if grep -rniE "cookieconsent|cookie-?banner|consentbanner|cookie consent (banner|popup)" src 2>/dev/null | grep -v "no cookie" >/dev/null; then
  fail "a cookie consent banner/popup appears to be mounted in src/"
else
  ok "no cookie consent banner/popup mounted in src/"
fi
[ -d "src/app/cookies" ] && fail "dedicated /cookies route added (disclosure should live in Privacy)" || ok "no dedicated /cookies route"
[ -f "$COOKIE_DEF" ] && ok "cookie-banner deferral documented ($COOKIE_DEF)" || fail "missing cookie deferral doc"
grep -qiE "trigger|condition" "$COOKIE_DEF" 2>/dev/null && ok "deferral doc lists triggering conditions" || fail "deferral doc missing triggers"

# ── F. No banned / fake-compliance language in the legal pages ───────────────
# NOTE: bare words like "certification"/"guarantee" appear legitimately in
# DISCLAIMING sentences, so we ban only affirmative-overclaim phrases.
section "F. No fake-compliance / banned language"
BANNED=(
  "military-grade"
  "bank-grade"
  "soc ?2 (certified|compliant)"
  "iso ?27001"
  "iso certified"
  "hipaa (certified|compliant)"
  "gdpr[ -]compliant"
  "fully compliant"
  "guaranteed uptime"
  "100% uptime"
  "zero[ -]risk"
  "data protection officer"
  "\bdpo\b"
  "fiduciary"
)
for b in "${BANNED[@]}"; do
  if has "$BOTH_TXT" "$b"; then
    fail "banned phrase present in legal pages: /$b/"
  else
    ok "absent: /$b/"
  fi
done

# ── G. Sitemap registers the new routes ──────────────────────────────────────
section "G. Sitemap"
grep -q "/privacy" src/app/sitemap.ts 2>/dev/null && ok "sitemap includes /privacy" || fail "sitemap missing /privacy"
grep -q "/terms"   src/app/sitemap.ts 2>/dev/null && ok "sitemap includes /terms"   || fail "sitemap missing /terms"

# ── Summary ──────────────────────────────────────────────────────────────────
echo ""
echo "──────────────────────────────────────────────────"
TOTAL=$((PASS + FAIL))
echo "RESULT: $PASS/$TOTAL"
if [ "$FAIL" -gt 0 ]; then echo "STATUS: FAIL"; exit 1; fi
echo "STATUS: PASS"; exit 0
