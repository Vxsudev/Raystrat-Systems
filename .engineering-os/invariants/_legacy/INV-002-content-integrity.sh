# SUPERSEDED 2026-09-05 — raystrat-emergent-site-takeover replaced the
# Node 1 copy this invariant locked ("find the way forward"); no successor
# phrase exists in the new copy (distinct per-page headlines, not one
# repeated tagline). Retired, not deleted, per directive governance —
# moved out of .engineering-os/invariants/ so invariant-engine.sh's
# non-recursive *.sh glob no longer runs it. See ai/recon/
# raystrat-emergent-site-takeover.md §8.
#
# INV-002 — Content Integrity (directive INV-WEB-002)
# The locked Node 1 core promise must remain intact in the app surface.
EOS_INV_ID="INV-002"
EOS_INV_NAME="Content: core promise 'find the way forward' present"
check() {
  grep -ril "find the way forward" app/ components/ > /dev/null 2>&1
}
