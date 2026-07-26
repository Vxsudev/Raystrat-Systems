# INV-003 — Scope Integrity (directive INV-WEB-007)
# Only the design system and Node 1 landing page may be fully implemented.
# Route directories outside the declared Node 1 allowlist are forbidden.
EOS_INV_ID="INV-003"
EOS_INV_NAME="Scope: no full route implementations beyond Node 1 allowlist"
check() {
  # Allowlist: root page, api, legal surfaces, controlled placeholder routes.
  local allow="api privacy terms deployments fieldwork company forward-deployed-engineering deploy"
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
