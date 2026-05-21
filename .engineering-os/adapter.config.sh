# Engineering OS Adapter Config — Raystrat Systems Website
#
# This file configures the local adapter for the central Engineering OS runtime.
# The OS runtime lives at vendor/engineering-os/ (git submodule).
# Do NOT copy or modify runtime scripts from vendor/ — reference them directly.
#
# All paths are relative to the repository root (CWD at invocation).

# Identity
export EOS_PROJECT_NAME="raystrat-systems-website"

# Application surfaces — space-separated path prefixes the pre-commit gate
# uses to detect application-layer changes.
export EOS_APP_SURFACE_PATHS="src/ functions/"

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

# Vendor runtime path (submodule — do not edit)
export EOS_VENDOR_DIR="vendor/engineering-os/"

# Verification commands
export EOS_TYPECHECK_CMD="npm run typecheck"
export EOS_LINT_CMD="npm run lint"
export EOS_BUILD_CMD="npm run build"
export EOS_TEST_CMD="npm test"
