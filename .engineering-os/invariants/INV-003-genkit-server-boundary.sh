#!/usr/bin/env bash
# INV-003: Genkit flows server-only boundary
#
# src/ai/flows/ must only be imported at runtime from server-side entry points.
# Client components (src/components/) must never have RUNTIME imports of AI flows.
# `import type` is permitted — it is erased at compile time and carries no runtime code.

set -euo pipefail

PASS=0
FAIL=0

echo "INV-003: Genkit flows server-only boundary"

# Check 1: No RUNTIME AI flow imports in src/components/
# `import type` lines are excluded — they are TypeScript-only and erased at build time.
VIOLATIONS=$(grep -rn --include="*.ts" --include="*.tsx" \
  --exclude-dir="node_modules" --exclude-dir=".next" \
  -E "from ['\"]@/ai/flows" \
  src/components/ 2>/dev/null \
  | grep -v "import type " \
  || true)

if [ -n "$VIOLATIONS" ]; then
  echo "  FAIL: AI flow runtime-imported in client component(s):"
  echo "$VIOLATIONS" | sed 's/^/         /'
  FAIL=$((FAIL + 1))
else
  echo "  PASS: No runtime AI flow imports in src/components/ (type-only imports allowed)"
  PASS=$((PASS + 1))
fi

# Check 2: RUNTIME AI flow imports only in permitted server-side locations
# Find all files that runtime-import from @/ai/flows (excluding type-only imports)
RUNTIME_IMPORTERS=$(grep -rln --include="*.ts" --include="*.tsx" \
  --exclude-dir="node_modules" --exclude-dir=".next" \
  -E "from ['\"]@/ai/flows" \
  src/ 2>/dev/null || true)

if [ -n "$RUNTIME_IMPORTERS" ]; then
  VIOLATION_FOUND=0
  while IFS= read -r file; do
    # Check if this file has any runtime import (not just type-import) from @/ai/flows
    RUNTIME_IMPORT=$(grep -n -E "from ['\"]@/ai/flows" "$file" 2>/dev/null | grep -v "import type " || true)
    if [ -z "$RUNTIME_IMPORT" ]; then
      continue  # Only type imports — safe
    fi
    # Allow: src/app/api/, src/app/actions.ts
    if [[ "$file" != src/app/api/* && "$file" != "src/app/actions.ts" ]]; then
      echo "  FAIL: AI flow runtime-imported from non-permitted location: $file"
      echo "$RUNTIME_IMPORT" | sed 's/^/         /'
      VIOLATION_FOUND=1
      FAIL=$((FAIL + 1))
    fi
  done <<< "$RUNTIME_IMPORTERS"

  if [ "$VIOLATION_FOUND" -eq 0 ]; then
    echo "  PASS: All runtime AI flow imports are in permitted server-side locations"
    PASS=$((PASS + 1))
  fi
else
  echo "  NOTE: No AI flow imports found — flows may be unused"
  PASS=$((PASS + 1))
fi

echo ""
echo "INV-003 result: ${PASS} pass, ${FAIL} fail"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
exit 0
