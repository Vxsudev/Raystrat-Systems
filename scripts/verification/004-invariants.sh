#!/usr/bin/env bash
# 004 — Engineering OS invariant gate
set -e
[ -f ".engineering-os/adapter.config.sh" ] && . ".engineering-os/adapter.config.sh"
bash vendor/engineering-os/scripts/invariant-engine.sh
echo "004-invariants: PASS"
