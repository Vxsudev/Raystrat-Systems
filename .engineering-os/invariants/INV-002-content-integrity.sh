# INV-002 — Content Integrity (directive INV-WEB-002)
# The locked Node 1 core promise must remain intact in the app surface.
EOS_INV_ID="INV-002"
EOS_INV_NAME="Content: core promise 'find the way forward' present"
check() {
  grep -ril "find the way forward" app/ components/ > /dev/null 2>&1
}
