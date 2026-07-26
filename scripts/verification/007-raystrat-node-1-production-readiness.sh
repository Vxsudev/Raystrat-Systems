#!/usr/bin/env bash
# 007 — Feature verification: raystrat-node-1-production-readiness
#
# Asserts nav/CTA wiring is complete, no href="#" remains, production
# metadata (icons, OG/Twitter images, canonical, theme-color) is present and
# resolves, the revised hero-lock scope holds, and the performance budget is
# unchanged. Serves the production build on :3108 (assumes 003-build ran).

set -u
PORT=3108
FAIL=0
pass() { echo "  PASS  $1"; }
fail() { echo "  FAIL  $1"; FAIL=1; }
MD5() { md5 -r "$1" 2>/dev/null | awk '{print $1}' || md5sum "$1" 2>/dev/null | awk '{print $1}'; }

# ── V1. Revised hero-lock scope (3D/motion/fallback system only) ──────────
echo "V1. Hero 3D/motion/fallback system unchanged"
BASELINE="dc5f94fed31af540faaf45a229cff3f0 components/hero/AlignmentField.tsx
8bcdc4fb7e92a88658a70cd36953a1ad components/hero/HeroCanvas.tsx
e5e9c81bf999f9c1ece860c4131132fa components/hero/HeroFallback.tsx
2485649adffeee499165c5315d5375c6 components/hero/fallback.module.css
30821fc2e9ce6611e130605800722aa7 components/hero/hero.module.css
13a95f02b56fb4898b99862213c0c514 lib/webgl.ts"
while IFS= read -r row; do
  want=$(echo "$row" | awk '{print $1}'); file=$(echo "$row" | awk '{print $2}')
  got=$(MD5 "$file")
  [ "$got" = "$want" ] && pass "locked: $file" || fail "MODIFIED: $file (want $want got $got)"
done <<< "$BASELINE"

# ── V2. No href="#" anywhere ────────────────────────────────────────────────
echo "V2. No accidental href=\"#\""
if grep -rq 'href="#"' app/ components/ 2>/dev/null; then
  fail "href=\"#\" still present:"; grep -rn 'href="#"' app/ components/
else
  pass "no href=\"#\" anywhere in app/ or components/"
fi

# ── globals.css token freeze (still applies) ───────────────────────────────
echo "V2b. globals.css frozen token values"
for tok in "--ink-0: #0b0c0e" "--signal: #b4703a" "--paper: #edeae3"; do
  grep -qF -- "$tok" styles/globals.css && pass "token intact: $tok" || fail "token changed: $tok"
done

# ── Serve for rendered-HTML + route checks ─────────────────────────────────
if [ ! -d ".next" ]; then echo "007: .next missing — run 003-build first"; exit 1; fi
npx next start -p $PORT > /tmp/.007-server.log 2>&1 &
SERVER_PID=$!
trap 'kill $SERVER_PID 2>/dev/null' EXIT
READY=0
for _ in $(seq 1 30); do sleep 1; curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT/" | grep -q 200 && { READY=1; break; }; done
[ "$READY" = "1" ] || { echo "007: server not ready"; exit 1; }
HTML=$(curl -s "http://localhost:$PORT/")
HEAD_ONLY=$(echo "$HTML" | sed -n '/<head/,/<\/head>/p')

# ── V3. All 12 corrected hrefs present, resolving to real anchors ─────────
echo "V3. Corrected navigation/CTA hrefs"
declare -a TARGETS=('href="/"' 'href="#forward-deployed-engineering"' 'href="#deployments"' 'href="#fieldwork"' 'href="#deploy"')
for t in "${TARGETS[@]}"; do
  echo "$HTML" | grep -qF "$t" && pass "present: $t" || fail "missing: $t"
done
# Scope to the primary nav only — "company" also appears legitimately in
# locked body copy ("The company is moving.", Screen 02) elsewhere on the
# page, which must not trip this check.
NAV_REGION=$(python3 -c "
import re, sys
html = sys.stdin.read()
m = re.search(r'<nav\b[^>]*aria-label=\"Primary\"[^>]*>.*?</nav>', html, re.DOTALL)
print(m.group(0) if m else '')
" <<< "$HTML")
if echo "$NAV_REGION" | grep -qi ">Company<"; then
  fail "Company nav item still present in primary nav (should be removed)"
else
  pass "Company nav item removed from primary nav"
fi
for a in condition intervention ownership outcome deployments forward-deployed-engineering fieldwork deploy; do
  echo "$HTML" | grep -q "id=\"$a\"" && pass "anchor exists: #$a" || fail "anchor missing: #$a"
done

# ── V4. Nav item count ──────────────────────────────────────────────────────
echo "V4. Nav composition"
# Word-boundary match: "navLink" must not also match the container's own
# "navLinks" class (navLink is a substring of navLinks).
NAVLINK_COUNT=$(echo "$NAV_REGION" | grep -oE 'class="[a-zA-Z0-9_]*navLink[a-zA-Z0-9_]*"' | grep -v 'navLinks' | wc -l | tr -d ' ')
[ "$NAVLINK_COUNT" = "3" ] && pass "3 nav links (Company removed)" || fail "nav link count=$NAVLINK_COUNT (want 3)"

# ── V5. Icon / OG / Twitter routes return 200 image/png ─────────────────────
echo "V5. Metadata image routes"
for route in "/icon" "/apple-icon" "/opengraph-image" "/twitter-image"; do
  CT=$(curl -s -D - -o /dev/null "http://localhost:$PORT$route" | grep -i '^content-type' | tr -d '\r')
  CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT$route")
  if [ "$CODE" = "200" ] && echo "$CT" | grep -qi "image/png"; then
    pass "$route -> 200 image/png"
  else
    fail "$route -> code=$CODE content-type='$CT'"
  fi
done

# ── V6. Head metadata: canonical, OG, Twitter, theme-color ─────────────────
echo "V6. Head metadata"
echo "$HEAD_ONLY" | grep -qi 'rel="canonical"' && echo "$HEAD_ONLY" | grep -qi 'raystratsystems.com' && pass "canonical link present" || fail "canonical link missing/incorrect"
echo "$HEAD_ONLY" | grep -qi 'property="og:title"' && pass "og:title present" || fail "og:title missing"
echo "$HEAD_ONLY" | grep -qi 'property="og:image"' && pass "og:image present" || fail "og:image missing"
echo "$HEAD_ONLY" | grep -qi 'name="twitter:card"' && echo "$HEAD_ONLY" | grep -qi 'summary_large_image' && pass "twitter:card present" || fail "twitter:card missing"
echo "$HEAD_ONLY" | grep -qi 'name="theme-color"' && echo "$HEAD_ONLY" | grep -qi '#0b0c0e' && pass "theme-color present (#0b0c0e)" || fail "theme-color missing/incorrect"
echo "$HEAD_ONLY" | grep -qi 'rel="icon"' && pass "icon link present" || fail "icon link missing"
echo "$HEAD_ONLY" | grep -qi 'apple-touch-icon' && pass "apple-touch-icon link present" || fail "apple-touch-icon link missing"

# ── V7. Predecessor substrate still intact ─────────────────────────────────
echo "V7. Predecessor substrate spot-check"
echo "$HTML" | grep -qi "find the way forward" && pass "hero promise present" || fail "hero promise missing"
echo "$HTML" | grep -qi "cannot carry" && pass "condition substrate present" || fail "condition substrate missing"

# ── V8. Performance budget ───────────────────────────────────────────────────
echo "V8. Performance budget"
KB=$(node -e '
  const fs=require("fs");
  const m=JSON.parse(fs.readFileSync(".next/app-build-manifest.json","utf8"));
  const files=new Set(m.pages["/page"]||[]); let b=0;
  for (const f of files) if (f.endsWith(".js")) b+=fs.statSync(".next/"+f).size;
  console.log(Math.round(b/1024));' 2>/dev/null || echo ERR)
if [ "$KB" = "ERR" ]; then fail "budget: could not compute"; elif [ "$KB" -le 460 ]; then pass "First Load ${KB}kB uncompressed (<=460 envelope)"; else fail "First Load ${KB}kB > 460 envelope"; fi

echo ""
if [ "$FAIL" = "0" ]; then echo "007-raystrat-node-1-production-readiness: PASS"; exit 0
else echo "007-raystrat-node-1-production-readiness: FAIL"; exit 1; fi
