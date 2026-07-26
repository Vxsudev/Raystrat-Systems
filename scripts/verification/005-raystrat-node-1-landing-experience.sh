#!/usr/bin/env bash
# 005 — Feature verification: raystrat-node-1-landing-experience
#
# Serves the production build on :3105 and asserts the rendered HTML of /
# carries the locked Node 1 substrate, all commands, all section anchors,
# no forbidden language, and no fabricated evidence. Assumes 003-build has
# produced .next (scripts run in numeric order).

set -u
PORT=3105
FAIL=0

pass() { echo "  PASS  $1"; }
fail() { echo "  FAIL  $1"; FAIL=1; }

if [ ! -d ".next" ]; then
  echo "005: .next missing — run 003-build first"
  exit 1
fi

# ── Serve ──────────────────────────────────────────────────────────────────
npx next start -p $PORT > /tmp/.005-server.log 2>&1 &
SERVER_PID=$!
trap 'kill $SERVER_PID 2>/dev/null' EXIT

READY=0
for _ in $(seq 1 30); do
  sleep 1
  if curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT/" | grep -q 200; then
    READY=1; break
  fi
done
[ "$READY" = "1" ] || { echo "005: server did not become ready"; exit 1; }

HTML=$(curl -s "http://localhost:$PORT/")

# ── Locked substrate present (one dominant thought per screen) ─────────────
echo "V1. Locked screen substrate"
for s in \
  "Raystrat will find the way forward" \
  "cannot carry" \
  "Put Raystrat on the problem" \
  "divides the outcome between teams" \
  "The outcome is forward movement" \
  "where the problem crosses business and software" \
  "Engineering deployed into the problem" \
  "Fieldwork records are being prepared"
do
  if echo "$HTML" | grep -qi "$s"; then pass "substrate: $s"; else fail "substrate missing: $s"; fi
done

# ── Commands present ───────────────────────────────────────────────────────
echo "V2. Commands"
for c in "Deploy Raystrat" "Explore Deployments" "Understand the Model" "View Fieldwork"; do
  if echo "$HTML" | grep -qi "$c"; then pass "command: $c"; else fail "command missing: $c"; fi
done

# ── Section anchors ────────────────────────────────────────────────────────
echo "V3. Section anchors"
for a in condition intervention ownership outcome deployments forward-deployed-engineering fieldwork deploy; do
  if echo "$HTML" | grep -q "id=\"$a\""; then pass "anchor: #$a"; else fail "anchor missing: #$a"; fi
done

# ── Forbidden language / fabricated evidence ───────────────────────────────
echo "V4. Forbidden language"
if echo "$HTML" | grep -qiE "revolutionary|cutting-edge|game-changing|trusted by|testimonial|case stud|our clients|fortune 500"; then
  fail "forbidden language present"
else
  pass "no forbidden language, no fabricated evidence markers"
fi

# ── Heading structure: exactly one h1 ──────────────────────────────────────
echo "V5. Heading structure"
H1_COUNT=$(echo "$HTML" | grep -o "<h1" | wc -l | tr -d ' ')
if [ "$H1_COUNT" = "1" ]; then pass "exactly one <h1>"; else fail "<h1> count = $H1_COUNT (expected 1)"; fi
H2_COUNT=$(echo "$HTML" | grep -o "<h2" | wc -l | tr -d ' ')
if [ "$H2_COUNT" -ge 8 ]; then pass "<h2> count = $H2_COUNT (>= 8 screens)"; else fail "<h2> count = $H2_COUNT (expected >= 8)"; fi

# ── Performance budget: First Load JS for / ≤ 140 kB ──────────────────────
echo "V6b. Performance budget"
FIRST_LOAD_KB=$(node -e '
  const fs = require("fs");
  const m = JSON.parse(fs.readFileSync(".next/app-build-manifest.json", "utf8"));
  const files = new Set(m.pages["/page"] || []);
  let bytes = 0;
  for (const f of files) if (f.endsWith(".js")) bytes += fs.statSync(".next/" + f).size;
  console.log(Math.round(bytes / 1024));
' 2>/dev/null || echo "ERR")
if [ "$FIRST_LOAD_KB" = "ERR" ]; then
  fail "budget: could not compute First Load JS"
elif [ "$FIRST_LOAD_KB" -le 460 ]; then
  # 460 kB uncompressed ≈ 140 kB gzip envelope reported by next build
  pass "budget: First Load JS ${FIRST_LOAD_KB} kB uncompressed (≤460 kB envelope)"
else
  fail "budget: First Load JS ${FIRST_LOAD_KB} kB uncompressed exceeds 460 kB envelope"
fi

# ── Scope: no unexpected routes materialised ───────────────────────────────
echo "V6. Route scope"
UNEXPECTED=$(find app -mindepth 1 -maxdepth 1 -type d ! -name api 2>/dev/null | wc -l | tr -d ' ')
if [ "$UNEXPECTED" = "0" ]; then pass "no new route directories"; else fail "$UNEXPECTED unexpected route dir(s) under app/"; fi

echo ""
if [ "$FAIL" = "0" ]; then
  echo "005-raystrat-node-1-landing-experience: PASS"
  exit 0
else
  echo "005-raystrat-node-1-landing-experience: FAIL"
  exit 1
fi
