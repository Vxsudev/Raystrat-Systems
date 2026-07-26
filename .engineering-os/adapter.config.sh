# Engineering OS Adapter Config — raystrat-systems
#
# Installed from vendor/engineering-os/templates/adapter.config.sh per
# vendor/engineering-os/INSTALL.md. All paths relative to repository root.

# Identity
export EOS_PROJECT_NAME="raystrat-systems"

# Application surfaces — space-separated path prefixes the pre-commit gate
# will use to detect application-layer changes.
export EOS_APP_SURFACE_PATHS="app/ components/ lib/ styles/ public/ src/"

# State machine + journal
export EOS_STATE_REGISTRY="ai/state_registry.json"
export EOS_JOURNAL="ai/engineering-journal.md"

# OS artifact directories
export EOS_SPEC_DIR="specs/"
export EOS_TASK_DIR="tasks/"
export EOS_PHASE_DIR="specs/phases/"
export EOS_VERIFICATION_DIR="scripts/verification/"

# Project-specific invariant rule files (one *.sh per invariant)
export EOS_INVARIANTS_DIR=".engineering-os/invariants/"
