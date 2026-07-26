#!/usr/bin/env bash
# 001 — TypeScript typecheck (no emit)
set -e
npx tsc --noEmit
echo "001-typecheck: PASS"
