# INV-004 — Evidence Integrity (directive INV-WEB-008)
# No fabricated clients, testimonials, case studies, metrics, or logos.
EOS_INV_ID="INV-004"
EOS_INV_NAME="Evidence: no fabricated testimonials/case-study/trust markers"
check() {
  ! grep -rilE "testimonial|trusted by|our clients|case stud(y|ies)|fortune 500" app/ components/ 2>/dev/null | grep -q .
}
