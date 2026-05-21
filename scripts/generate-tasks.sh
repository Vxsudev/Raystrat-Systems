#!/usr/bin/env bash
# shellcheck disable=SC1091
source "$(dirname "$0")/../.engineering-os/adapter.config.sh"
export EOS_STATE_REGISTRY
exec "$(dirname "$0")/../vendor/engineering-os/scripts/generate-tasks.sh" "$@"
