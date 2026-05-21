#!/usr/bin/env bash
# 003-build.sh — Next.js production build
#
# Runs next build. Exits non-zero on build failure.
# NOTE: This is the slowest verification step. Run after typecheck and lint pass.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

echo "[003-build] Running Next.js production build..."
cd "${REPO_ROOT}"

npm run build

echo "[003-build] PASS"
