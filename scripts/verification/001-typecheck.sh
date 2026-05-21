#!/usr/bin/env bash
# 001-typecheck.sh — TypeScript type check
#
# Runs tsc --noEmit via npm run typecheck.
# Exits non-zero if any type errors are present.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

echo "[001-typecheck] Running TypeScript type check..."
cd "${REPO_ROOT}"

npm run typecheck

echo "[001-typecheck] PASS"
