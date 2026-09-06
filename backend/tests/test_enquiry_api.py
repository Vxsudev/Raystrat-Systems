"""Tests for the marketing site's static/metadata surface.

Covers:
- GET /sitemap.xml (3 canonical URLs, XML content-type, valid XML)
- GET /robots.txt (preview allows crawling, no sitemap reference)
- Per-page x-robots-tag header, meta robots, canonical (production URL)
- Public email/LinkedIn appear in footer; the historical private
  recipient (vp@raystrat.com, used by the retired Resend integration)
  never appears in rendered HTML

The enquiry form no longer posts to a route on this site — it submits
client-side, directly, to Formspree (https://formspree.io/f/mbgjagaz).
There is no server-side endpoint left to test here; Formspree's own
delivery/validation/spam-filtering behaviour is out of this codebase's
test surface. See ai/runtime-contracts.md Contract 2.
"""
import os
import re
import xml.etree.ElementTree as ET
import requests
import pytest

BASE = os.environ.get(
    "REACT_APP_BACKEND_URL",
    "http://localhost:3000",
).rstrip("/")
PAGES = ["/", "/ai-solutions", "/forward-deployed-engineering"]


@pytest.fixture(scope="module")
def s():
    return requests.Session()


# ---------------- Sitemap ----------------
def test_sitemap_ok(s):
    r = s.get(f"{BASE}/sitemap.xml")
    assert r.status_code == 200
    assert "xml" in r.headers.get("content-type", "").lower()
    root = ET.fromstring(r.text)
    locs = [e.text for e in root.iter() if e.tag.endswith("loc")]
    assert sorted(locs) == sorted([
        "https://raystratsystems.com/",
        "https://raystratsystems.com/ai-solutions",
        "https://raystratsystems.com/forward-deployed-engineering",
    ])
    for l in locs:
        assert "#" not in l
        assert "preview" not in l


# ---------------- Robots ----------------
def test_robots_preview(s):
    r = s.get(f"{BASE}/robots.txt")
    assert r.status_code == 200
    assert r.headers.get("content-type", "").startswith("text/plain")
    body = r.text.lower()
    assert "allow: /" in body
    assert "sitemap" not in body  # no sitemap ref in preview


# ---------------- Per-page headers/meta/canonical ----------------
@pytest.mark.parametrize("path", PAGES)
def test_page_headers_and_meta(s, path):
    r = s.get(f"{BASE}{path}")
    assert r.status_code == 200
    xrt = r.headers.get("x-robots-tag", "").lower()
    assert "noindex" in xrt and "nofollow" in xrt
    html = r.text
    # meta robots present in preview
    assert re.search(r'<meta[^>]+name="robots"[^>]+content="[^"]*noindex[^"]*nofollow[^"]*nocache', html, re.I), \
        f"meta robots noindex,nofollow,nocache missing on {path}"
    # canonical points to production
    expected = "https://raystratsystems.com" + ("" if path == "/" else path)
    expected_slash = "https://raystratsystems.com/" if path == "/" else expected
    assert re.search(rf'<link[^>]+rel="canonical"[^>]+href="(?:{re.escape(expected)}|{re.escape(expected_slash)})"', html), \
        f"canonical missing/incorrect for {path}"
    # Historical private recipient must never leak into rendered output
    assert "vp@raystrat.com" not in html, f"Private email leaked into {path}"
    # Public contact present in footer
    assert "founder@raystratsystems.com" in html
    assert "linkedin.com/company/raystrat-systems" in html
    assert 'data-testid="footer-contact"' in html
    assert 'data-testid="footer-email-link"' in html
    assert 'data-testid="footer-linkedin-link"' in html


# ---------------- Enquiry form (client-side Formspree submission) --------
def test_homepage_form_targets_formspree(s):
    """The enquiry form's submission target is public by design (it's a
    client-side POST to Formspree, not a secret). The fetch() call lives
    inside a client-component event handler, not an HTML form `action`
    attribute, so it only appears in the compiled client JS bundle, never
    in server-rendered HTML — check the actual shipped script chunks."""
    r = s.get(f"{BASE}/")
    script_srcs = re.findall(r'<script[^>]+src="([^"]+)"', r.text)
    assert script_srcs, "no script tags found on homepage"
    found = False
    for src in script_srcs:
        chunk = s.get(f"{BASE}{src}")
        if chunk.status_code == 200 and "formspree.io/f/mbgjagaz" in chunk.text:
            found = True
            break
    assert found, "formspree.io/f/mbgjagaz not found in any shipped script chunk"
    # The retired Resend route must actually be gone, not just unused.
    stale = s.post(f"{BASE}/enquiry/submit", json={})
    assert stale.status_code == 404
