#!/usr/bin/env bash
# 011 — Feature verification: raystrat-emergent-site-takeover
#
# Serves the production build on :3111 and asserts the replaced Emergent
# site's three routes render with their real copy, the sitemap/robots/
# headers behave correctly in non-production mode, the enquiry endpoint's
# disabled-delivery contract holds, the private recipient never leaks into
# rendered HTML, and no Emergent hostname survives into the shipped app.
# Assumes 003-build has produced .next (scripts run in numeric order).
# Does not set SITE_ENV (defaults to non-production / preview behaviour).

set -u
PORT=3111
FAIL=0

pass() { echo "  PASS  $1"; }
fail() { echo "  FAIL  $1"; FAIL=1; }

if [ ! -d ".next" ]; then
  echo "011: .next missing — run 003-build first"
  exit 1
fi

# ── Serve ──────────────────────────────────────────────────────────────────
npx next start -p $PORT > /tmp/.011-server.log 2>&1 &
SERVER_PID=$!
trap 'kill $SERVER_PID 2>/dev/null' EXIT

READY=0
for _ in $(seq 1 30); do
  sleep 1
  if curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT/" | grep -q 200; then
    READY=1; break
  fi
done
[ "$READY" = "1" ] || { echo "011: server did not become ready"; exit 1; }

# ── V1. All three routes return 200 with real, distinctive copy ───────────
echo "V1. Routes render with real copy"
declare -A ROUTE_COPY=(
  ["/"]="AI built on what your business knows."
  ["/ai-solutions"]="AI systems built around your operations."
  ["/forward-deployed-engineering"]="Engineers embedded in the work."
)
declare -A ROUTE_HTML=()
for route in "/" "/ai-solutions" "/forward-deployed-engineering"; do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT$route")
  BODY=$(curl -s "http://localhost:$PORT$route")
  ROUTE_HTML["$route"]="$BODY"
  if [ "$CODE" = "200" ]; then pass "route $route -> 200"; else fail "route $route -> $CODE"; fi
  if echo "$BODY" | grep -qF "${ROUTE_COPY[$route]}"; then
    pass "copy present on $route: ${ROUTE_COPY[$route]}"
  else
    fail "copy missing on $route: ${ROUTE_COPY[$route]}"
  fi
done

# ── V2. Footer contact + private-recipient non-leak, per route ────────────
echo "V2. Footer contact present, private recipient never leaks"
for route in "/" "/ai-solutions" "/forward-deployed-engineering"; do
  BODY="${ROUTE_HTML[$route]}"
  echo "$BODY" | grep -qF "founder@raystratsystems.com" && pass "$route: public email present" || fail "$route: public email missing"
  echo "$BODY" | grep -qi "linkedin.com/company/raystrat-systems" && pass "$route: LinkedIn link present" || fail "$route: LinkedIn link missing"
  if echo "$BODY" | grep -qF "vp@raystrat.com"; then
    fail "$route: PRIVATE recipient leaked into rendered HTML"
  else
    pass "$route: private recipient not present"
  fi
done

# ── V3. No Emergent hostname/branding in any fetched response ─────────────
echo "V3. No Emergent hostname in shipped output"
LEAKED=0
for route in "/" "/ai-solutions" "/forward-deployed-engineering"; do
  echo "${ROUTE_HTML[$route]}" | grep -qi "emergentagent\|preview\.emergentagent" && LEAKED=1
done
SITEMAP_BODY=$(curl -s "http://localhost:$PORT/sitemap.xml")
ROBOTS_BODY=$(curl -s "http://localhost:$PORT/robots.txt")
echo "$SITEMAP_BODY$ROBOTS_BODY" | grep -qi "emergentagent" && LEAKED=1
[ "$LEAKED" = "0" ] && pass "no Emergent hostname/branding anywhere fetched" || fail "Emergent hostname/branding leaked into shipped output"

# ── V4. Sitemap: exactly the three production URLs, valid XML ─────────────
echo "V4. Sitemap"
SITEMAP_CT=$(curl -s -D - -o /dev/null "http://localhost:$PORT/sitemap.xml" | grep -i '^content-type' | tr -d '\r')
echo "$SITEMAP_CT" | grep -qi "xml" && pass "sitemap content-type is xml ($SITEMAP_CT)" || fail "sitemap content-type not xml ($SITEMAP_CT)"
SITEMAP_CHECK=$(python3 -c "
import sys, xml.etree.ElementTree as ET
body = sys.stdin.read()
try:
    root = ET.fromstring(body)
except ET.ParseError as e:
    print('PARSE_ERROR:' + str(e)); sys.exit(0)
locs = sorted(e.text for e in root.iter() if e.tag.endswith('loc'))
expected = sorted([
    'https://raystratsystems.com/',
    'https://raystratsystems.com/ai-solutions',
    'https://raystratsystems.com/forward-deployed-engineering',
])
if locs != expected:
    print('MISMATCH:' + repr(locs)); sys.exit(0)
for l in locs:
    if '#' in l or 'preview' in l or 'localhost' in l:
        print('BAD_URL:' + l); sys.exit(0)
print('OK')
" <<< "$SITEMAP_BODY")
[ "$SITEMAP_CHECK" = "OK" ] && pass "sitemap has exactly the 3 production URLs, no fragments/preview/localhost" || fail "sitemap check: $SITEMAP_CHECK"

# ── V5. Robots.txt (non-production: allow crawling, no sitemap ref) ───────
echo "V5. Robots (non-production)"
ROBOTS_LOWER=$(echo "$ROBOTS_BODY" | tr '[:upper:]' '[:lower:]')
echo "$ROBOTS_LOWER" | grep -q "allow: /" && pass "robots allows crawling" || fail "robots does not allow crawling"
echo "$ROBOTS_LOWER" | grep -q "sitemap" && fail "robots references sitemap in non-production" || pass "robots omits sitemap reference (non-production)"

# ── V6. X-Robots-Tag header on all three page routes (non-production) ─────
echo "V6. X-Robots-Tag header"
for route in "/" "/ai-solutions" "/forward-deployed-engineering"; do
  XRT=$(curl -s -D - -o /dev/null "http://localhost:$PORT$route" | grep -i '^x-robots-tag' | tr -d '\r')
  echo "$XRT" | grep -qi "noindex" && echo "$XRT" | grep -qi "nofollow" && pass "$route: X-Robots-Tag noindex,nofollow" || fail "$route: X-Robots-Tag missing/incorrect ($XRT)"
done

# ── V7. Enquiry endpoint: disabled-delivery contract ───────────────────────
echo "V7. Enquiry endpoint (delivery disabled)"
ENQ_RESP=$(curl -s -w "\n%{http_code}" -X POST "http://localhost:$PORT/enquiry/submit" \
  -H "Content-Type: application/json" \
  -d '{"name":"Verification Run","email":"verify@example.com","company":"Raystrat QA","message":"Local verification submission, not a real enquiry.","elapsedMs":5000}')
ENQ_CODE=$(echo "$ENQ_RESP" | tail -1)
ENQ_BODY=$(echo "$ENQ_RESP" | sed '$d')
if [ "$ENQ_CODE" = "503" ] && echo "$ENQ_BODY" | grep -q '"reason":"not_configured"'; then
  pass "enquiry endpoint: 503 not_configured (delivery correctly disabled)"
else
  fail "enquiry endpoint: expected 503 not_configured, got $ENQ_CODE: $ENQ_BODY"
fi

# ── V8. Route scope: no app/*/ directory outside the INV-003 allowlist ────
echo "V8. Route scope"
ALLOW="ai-solutions forward-deployed-engineering enquiry components lib"
UNEXPECTED=0
for d in app/*/; do
  [ -d "$d" ] || continue
  name=$(basename "$d")
  case " $ALLOW " in
    *" $name "*) : ;;
    *) UNEXPECTED=1; echo "    unexpected: app/$name/" ;;
  esac
done
[ "$UNEXPECTED" = "0" ] && pass "no app/ directory outside the allowlist" || fail "unexpected app/ subdirectory present"

echo ""
if [ "$FAIL" = "0" ]; then
  echo "011-raystrat-emergent-site-takeover: PASS"
  exit 0
else
  echo "011-raystrat-emergent-site-takeover: FAIL"
  exit 1
fi
