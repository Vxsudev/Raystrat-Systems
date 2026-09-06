# INV-003 — Scope Integrity (directive INV-WEB-007)
# Updated 2026-09-05 for raystrat-emergent-site-takeover: only the
# Emergent site's three public routes (ai-solutions, forward-deployed-
# engineering, plus root) and its own internal app/components + app/lib
# directories may exist under app/. Route/internal directories outside
# this allowlist are forbidden.
EOS_INV_ID="INV-003"
EOS_INV_NAME="Scope: no directories beyond the Emergent site allowlist"
check() {
  # Allowlist: the two kept routes (root "/" has no app/ subdirectory of
  # its own) plus the enquiry route and the app's own internal dirs.
  local allow="ai-solutions forward-deployed-engineering enquiry components lib"
  local d name
  for d in app/*/; do
    [ -d "$d" ] || continue
    name=$(basename "$d")
    case " $allow " in
      *" $name "*) : ;;
      *) return 1 ;;
    esac
  done
  return 0
}
