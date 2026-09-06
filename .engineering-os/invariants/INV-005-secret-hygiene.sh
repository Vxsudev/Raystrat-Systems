# INV-005 — Secret Hygiene
# No env/secret files may ever be tracked by git (sendgrid.env, .env*),
# except the placeholder-only .env.example template (updated 2026-09-06 —
# the original directive explicitly requires a committed, placeholder-only
# .env.example; the prior regex did not distinguish it from a real .env
# file and would have blocked it).
EOS_INV_ID="INV-005"
EOS_INV_NAME="Secrets: no env/secret files tracked by git (except .env.example)"
check() {
  local matches
  matches=$(git ls-files --cached | grep -E "(^|/)(\.env[^/]*|sendgrid\.env)$" | grep -vE "(^|/)\.env\.example$")
  [ -z "$matches" ]
}
