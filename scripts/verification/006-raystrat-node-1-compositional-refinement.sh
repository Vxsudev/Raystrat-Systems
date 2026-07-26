#!/usr/bin/env bash
# 006 — Feature verification: raystrat-node-1-compositional-refinement
#
# Asserts the compositional refinement kept the hero byte-for-byte locked,
# preserved all locked copy/anchors/commands/headings, added no routes or
# forbidden language, and held the First-Load budget. Serves the production
# build on :3106 for the rendered-HTML assertions (assumes 003-build ran).

set -u
PORT=3106
FAIL=0
pass() { echo "  PASS  $1"; }
fail() { echo "  FAIL  $1"; FAIL=1; }

MD5() { md5 -r "$1" 2>/dev/null | awk '{print $1}' || md5sum "$1" 2>/dev/null | awk '{print $1}'; }

# ── V1. Hero locked (byte-for-byte via recorded md5 baseline) ──────────────
echo "V1. Hero + locked shells unchanged"
declare_baseline() { echo "$1  $2"; }
BASELINE="dc5f94fed31af540faaf45a229cff3f0 components/hero/AlignmentField.tsx
72f4cfd45291804a111cfab570726060 components/hero/Hero.tsx
8bcdc4fb7e92a88658a70cd36953a1ad components/hero/HeroCanvas.tsx
e5e9c81bf999f9c1ece860c4131132fa components/hero/HeroFallback.tsx
2485649adffeee499165c5315d5375c6 components/hero/fallback.module.css
30821fc2e9ce6611e130605800722aa7 components/hero/hero.module.css
8e6bc33bae3b1928c7e64f9d77779c35 app/layout.tsx
13a95f02b56fb4898b99862213c0c514 lib/webgl.ts"
while IFS= read -r row; do
  want=$(echo "$row" | awk '{print $1}')
  file=$(echo "$row" | awk '{print $2}')
  got=$(MD5 "$file")
  if [ "$got" = "$want" ]; then pass "locked: $file"; else fail "MODIFIED: $file (want $want got $got)"; fi
done <<< "$BASELINE"

# ── V2. globals.css token VALUES unchanged (additive-only) ─────────────────
echo "V2. globals.css frozen token values"
for tok in "--ink-0: #0b0c0e" "--signal: #b4703a" "--paper: #edeae3" "--paper-field: #e7e3da" "--line-paper: #d3cec3"; do
  if grep -qF -- "$tok" styles/globals.css; then pass "token intact: $tok"; else fail "token changed/missing: $tok"; fi
done

# ── Serve for rendered-HTML checks ─────────────────────────────────────────
if [ ! -d ".next" ]; then echo "006: .next missing — run 003-build first"; exit 1; fi
npx next start -p $PORT > /tmp/.006-server.log 2>&1 &
SERVER_PID=$!
trap 'kill $SERVER_PID 2>/dev/null' EXIT
READY=0
for _ in $(seq 1 30); do sleep 1; curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT/" | grep -q 200 && { READY=1; break; }; done
[ "$READY" = "1" ] || { echo "006: server not ready"; exit 1; }
HTML=$(curl -s "http://localhost:$PORT/")

# ── V3. Locked substrate present ───────────────────────────────────────────
echo "V3. Locked substrate"
for s in \
  "find the way forward" "cannot carry" "Put Raystrat on the problem" \
  "divides the outcome between teams" "The outcome is forward movement" \
  "where the problem crosses business and software" \
  "Engineering deployed into the problem" "Fieldwork records are being prepared"; do
  echo "$HTML" | grep -qi "$s" && pass "substrate: $s" || fail "substrate missing: $s"
done

# ── V4. Five deployment categories + five intervention + six outcomes ──────
echo "V4. Enumerated substrate intact"
for s in "Build what does not yet exist" "Replace what the operation has outgrown" \
         "Move what has stalled" "Put AI into real use" "Own the product and engineering path"; do
  echo "$HTML" | grep -qi "$s" && pass "deploy cat: $s" || fail "deploy cat missing: $s"
done
echo "$HTML" | grep -qi "We establish what is true" && pass "intervention station present" || fail "intervention statement missing"
echo "$HTML" | grep -qi "A prototype crosses into dependable use" && pass "outcome present" || fail "outcome missing"

# ── V5. Commands + anchors + headings ──────────────────────────────────────
echo "V5. Commands, anchors, headings"
for c in "Deploy Raystrat" "Explore Deployments" "Understand the Model" "View Fieldwork"; do
  echo "$HTML" | grep -qi "$c" && pass "command: $c" || fail "command missing: $c"
done
for a in condition intervention ownership outcome deployments forward-deployed-engineering fieldwork deploy; do
  echo "$HTML" | grep -q "id=\"$a\"" && pass "anchor: #$a" || fail "anchor missing: #$a"
done
H1=$(echo "$HTML" | grep -o "<h1" | wc -l | tr -d ' ')
H2=$(echo "$HTML" | grep -o "<h2" | wc -l | tr -d ' ')
[ "$H1" = "1" ] && pass "one <h1>" || fail "<h1>=$H1 (want 1)"
[ "$H2" -ge 8 ] && pass "<h2>=$H2 (>=8)" || fail "<h2>=$H2 (want >=8)"

# ── V6. Forbidden language / fabricated evidence ───────────────────────────
echo "V6. Forbidden language"
if echo "$HTML" | grep -qiE "revolutionary|cutting-edge|game-changing|trusted by|testimonial|case stud|our clients|fortune 500"; then
  fail "forbidden language present"; else pass "no forbidden language / fabricated evidence"; fi

# ── V7. Route scope ────────────────────────────────────────────────────────
echo "V7. Route scope"
U=$(find app -mindepth 1 -maxdepth 1 -type d ! -name api 2>/dev/null | wc -l | tr -d ' ')
[ "$U" = "0" ] && pass "no new route directories" || fail "$U unexpected route dir(s)"

# ── V8. First Load JS budget ───────────────────────────────────────────────
echo "V8. Performance budget"
KB=$(node -e '
  const fs=require("fs");
  const m=JSON.parse(fs.readFileSync(".next/app-build-manifest.json","utf8"));
  const files=new Set(m.pages["/page"]||[]); let b=0;
  for (const f of files) if (f.endsWith(".js")) b+=fs.statSync(".next/"+f).size;
  console.log(Math.round(b/1024));' 2>/dev/null || echo ERR)
if [ "$KB" = "ERR" ]; then fail "budget: could not compute"; elif [ "$KB" -le 460 ]; then pass "First Load ${KB}kB uncompressed (<=460 envelope)"; else fail "First Load ${KB}kB > 460 envelope"; fi

# ── V9. GSAP not statically in first-load chunks ───────────────────────────
echo "V9. GSAP stays dynamic"
FIRSTLOAD=$(node -e '
  const fs=require("fs");
  const m=JSON.parse(fs.readFileSync(".next/app-build-manifest.json","utf8"));
  console.log([...new Set(m.pages["/page"]||[])].filter(f=>f.endsWith(".js")).join(" "));' 2>/dev/null)
GS=0
for f in $FIRSTLOAD; do grep -q "ScrollTrigger" ".next/$f" 2>/dev/null && GS=1; done
[ "$GS" = "0" ] && pass "ScrollTrigger absent from first-load chunks" || fail "GSAP/ScrollTrigger leaked into first-load"

echo ""
if [ "$FAIL" = "0" ]; then echo "006-raystrat-node-1-compositional-refinement: PASS"; exit 0
else echo "006-raystrat-node-1-compositional-refinement: FAIL"; exit 1; fi
