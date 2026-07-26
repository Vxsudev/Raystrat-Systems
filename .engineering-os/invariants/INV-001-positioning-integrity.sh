# INV-001 — Positioning Integrity (directive INV-WEB-001)
# The website must present Raystrat as a forward-deployed engineering company.
EOS_INV_ID="INV-001"
EOS_INV_NAME="Positioning: forward-deployed engineering present in app surface"
check() {
  grep -ril "forward-deployed" app/ components/ > /dev/null 2>&1
}
