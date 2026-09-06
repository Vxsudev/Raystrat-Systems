"""Tests for Next.js route handlers on the marketing site.

Covers:
- POST /enquiry/submit (validation / honeypot / timing / not_configured / rate_limit)
- GET /sitemap.xml (3 canonical URLs, XML content-type, valid XML)
- GET /robots.txt (preview allows crawling, no sitemap reference)
- Per-page x-robots-tag header, meta robots, canonical (production URL)
- Public email/LinkedIn appear in footer; private vp@raystrat.com never in HTML
"""
import os
import time
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
    # Private recipient must not leak
    assert "vp@raystrat.com" not in html, f"Private email leaked into {path}"
    # Public contact present in footer
    assert "founder@raystratsystems.com" in html
    assert "linkedin.com/company/raystrat-systems" in html
    assert 'data-testid="footer-contact"' in html
    assert 'data-testid="footer-email-link"' in html
    assert 'data-testid="footer-linkedin-link"' in html


# ---------------- Enquiry endpoint ----------------
ENQ = "/enquiry/submit"


def test_enquiry_validation(s):
    r = s.post(f"{BASE}{ENQ}", json={"name": "", "email": "bad", "company": "", "message": "hi"})
    assert r.status_code == 400
    data = r.json()
    assert data["reason"] == "validation"
    assert set(data["errors"].keys()) >= {"name", "email", "company", "message"}


def test_enquiry_honeypot(s):
    r = s.post(f"{BASE}{ENQ}", json={
        "name": "Ada", "email": "a@b.co", "company": "Acme",
        "message": "This is enough text.", "website": "spam", "elapsedMs": 5000,
    })
    assert r.status_code == 422
    assert r.json()["reason"] == "rejected"


def test_enquiry_timing(s):
    r = s.post(f"{BASE}{ENQ}", json={
        "name": "Ada", "email": "a@b.co", "company": "Acme",
        "message": "This is enough text.", "elapsedMs": 100,
    })
    assert r.status_code == 422
    assert r.json()["reason"] == "rejected"


def test_enquiry_not_configured_then_rate_limit():
    """3 valid submissions -> 503 not_configured; 4th -> 429 rate_limited."""
    sess = requests.Session()
    payload = {
        "name": "Ada Lovelace",
        "email": "ada@example.com",
        "company": "Analytical Engines",
        "message": "Please contact us about a pilot workflow.",
        "elapsedMs": 5000,
    }
    statuses = []
    for i in range(4):
        r = sess.post(f"{BASE}{ENQ}", json=payload)
        statuses.append((r.status_code, r.json().get("reason")))
    # First three should be 503 not_configured
    assert statuses[0] == (503, "not_configured"), statuses
    assert statuses[1] == (503, "not_configured"), statuses
    assert statuses[2] == (503, "not_configured"), statuses
    # 4th should be rate limited
    assert statuses[3] == (429, "rate_limited"), statuses
