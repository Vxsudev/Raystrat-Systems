# INV-001 — Positioning Integrity (directive INV-WEB-001)
# The website must present Raystrat as a forward-deployed engineering company.
# Fixed 2026-09-06: grep with multiple path arguments fails outright on BSD
# grep (macOS) if any one argument doesn't exist as a path, even when the
# others have matches — a real bug, not a content problem, surfaced once
# raystrat-emergent-site-takeover removed repo-root components/ entirely
# (git never materialises an empty directory on checkout, so it silently
# existed in some working trees and not others). Only existing candidate
# directories are searched now.
EOS_INV_ID="INV-001"
EOS_INV_NAME="Positioning: forward-deployed engineering present in app surface"
check() {
  local dirs=""
  for d in app components; do
    [ -d "$d" ] && dirs="$dirs $d"
  done
  [ -n "$dirs" ] || return 1
  grep -ril "forward-deployed" $dirs > /dev/null 2>&1
}
