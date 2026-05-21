#!/usr/bin/env bash
# 002-lint.sh — ESLint via Next.js lint
#
# Runs next lint. Exits non-zero if linting errors are present.
# NOTE: This project does not have an ESLint config (.eslintrc / eslint.config.js).
# `npm run lint` will prompt for interactive setup if no config is present.
# Until ESLint is configured, this script reports SKIP.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

cd "${REPO_ROOT}"

echo "[002-lint] Checking for ESLint config..."

if [ ! -f ".eslintrc" ] && [ ! -f ".eslintrc.js" ] && [ ! -f ".eslintrc.json" ] && \
   [ ! -f ".eslintrc.cjs" ] && [ ! -f "eslint.config.js" ] && \
   [ ! -f "eslint.config.mjs" ] && [ ! -f "eslint.config.cjs" ]; then
  echo "[002-lint] SKIP — No ESLint config found. Run 'npx eslint --init' to configure."
  echo "[002-lint] TODO: Add ESLint config (eslint.config.mjs) before treating this as a gate."
  exit 0
fi

echo "[002-lint] Running ESLint..."
npm run lint

echo "[002-lint] PASS"
