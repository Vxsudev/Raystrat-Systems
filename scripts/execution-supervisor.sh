#!/usr/bin/env bash
# Adapter proxy (INSTALL.md §5) — sources adapter config (as raystrat-os CLI
# does) so EOS_* vars reach the vendored script, then delegates.
[ -f ".engineering-os/adapter.config.sh" ] && . ".engineering-os/adapter.config.sh"
exec bash vendor/engineering-os/scripts/execution-supervisor.sh "$@"
