#!/usr/bin/env bash
# INV-002: No client-side secret exposure
#
# Service credentials must never appear in client-bundle code.
# Scans src/ excluding API routes and server actions for secret-pattern env vars.

set -euo pipefail

PASS=0
FAIL=0

echo "INV-002: No client-side secret exposure"

# Secret env var patterns that must not appear in client components
SECRET_PATTERNS=(
  "GOOGLE_GENAI_API_KEY"
  "GOOGLE_AI_API_KEY"
  "SENDGRID_API_KEY"
  "FIREBASE_PRIVATE_KEY"
  "FIREBASE_CLIENT_EMAIL"
  "process\.env\.GOOGLE_"
  "process\.env\.SENDGRID"
  "process\.env\.FIREBASE_PRIVATE"
)

SECRET_FAIL=0
for pattern in "${SECRET_PATTERNS[@]}"; do
  MATCHES=$(grep -rn --include="*.ts" --include="*.tsx" \
      --exclude-dir="node_modules" --exclude-dir=".next" \
      --exclude-dir="app" --exclude-dir="api" \
      -E "$pattern" \
      src/components/ src/lib/ 2>/dev/null | grep -v "// " || true)
  if [ -n "$MATCHES" ]; then
    echo "  FAIL: Secret pattern '$pattern' found in client-side code:"
    echo "$MATCHES" | sed 's/^/         /'
    SECRET_FAIL=$((SECRET_FAIL + 1))
    FAIL=$((FAIL + 1))
  fi
done

if [ "$SECRET_FAIL" -eq 0 ]; then
  echo "  PASS: No secret env var patterns found in client components or lib"
  PASS=$((PASS + 1))
fi

# Check that NEXT_PUBLIC_ is not used for known secrets
PUBMATCHES=$(grep -rn --include="*.ts" --include="*.tsx" \
    --exclude-dir="node_modules" --exclude-dir=".next" \
    -E "NEXT_PUBLIC_(GOOGLE_AI|SENDGRID|FIREBASE_PRIVATE)" src/ 2>/dev/null || true)

if [ -n "$PUBMATCHES" ]; then
  echo "  FAIL: Secret exposed via NEXT_PUBLIC_ prefix (will appear in browser bundle)"
  echo "$PUBMATCHES" | sed 's/^/         /'
  FAIL=$((FAIL + 1))
else
  echo "  PASS: No secrets exposed via NEXT_PUBLIC_ prefix"
  PASS=$((PASS + 1))
fi

echo ""
echo "INV-002 result: ${PASS} pass, ${FAIL} fail"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
exit 0
