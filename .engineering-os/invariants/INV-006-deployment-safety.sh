# INV-006 — Deployment Safety (directive INV-WEB-010)
# Vercel linkage must target the raystrat-systems project only.
EOS_INV_ID="INV-006"
EOS_INV_NAME="Deployment safety: Vercel link targets raystrat-systems"
check() {
  # If no linkage exists, nothing can be mis-deployed from here — pass.
  [ -f .vercel/project.json ] || return 0
  grep -q '"projectName":"raystrat-systems"' .vercel/project.json
}
