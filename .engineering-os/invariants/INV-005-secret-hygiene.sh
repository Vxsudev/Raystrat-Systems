# INV-005 — Secret Hygiene
# No env/secret files may ever be tracked by git (sendgrid.env, .env*).
EOS_INV_ID="INV-005"
EOS_INV_NAME="Secrets: no env/secret files tracked by git"
check() {
  ! git ls-files --cached | grep -qE "(^|/)(\.env[^/]*|sendgrid\.env)$"
}
