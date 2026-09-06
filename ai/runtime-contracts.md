# Runtime Contracts — Raystrat Systems Website

Authored 2026-09-06, for `raystrat-emergent-site-takeover`. Replaces the
2026-07-26 version, which stated Node 1/2/3's Three.js/GSAP contracts —
all deleted by this capability, so that version no longer applies, for
the same reason it itself gave for retiring the `a28cc84` Genkit/Firebase
version. Every contract below states what was actually verified during
this capability (`scripts/verification/011-raystrat-emergent-site-
takeover.sh`, the adapted pytest suite, and direct source reading), not
what the archive's `HANDOFF.md` merely claims — where verification and
claim diverge, that is called out explicitly.

## Contract 1 — One server-side endpoint; everything else is static

**Boundary:** the only server-side logic in the app is
`app/enquiry/submit/route.ts`. All three page routes, the sitemap, and
robots.txt are static or file-convention-generated; none read request
state beyond what Next.js provides automatically.

**Why:** matches the archive's own description (`HANDOFF.md` §0): "Static
marketing site with one server-side endpoint... No database. No
authentication."

**Status:** RATIFIED — verified directly: no other file under `app/`
imports from `next/server` or defines a Route Handler; confirmed by
reading the full `app/` tree during this capability's implementation.

## Contract 2 — The enquiry endpoint's full request contract

**Boundary:** `POST /enquiry/submit`.

1. Malformed JSON body → `400 { ok:false, reason:"bad_request" }`.
2. Honeypot (`website` field non-empty) or `elapsedMs < 2500` →
   `422 { ok:false, reason:"rejected" }`, checked **before** validation.
3. Field validation (name ≤120 chars required; email required, ≤254
   chars, must match `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`; company required
   ≤160 chars; message required, 10–4000 chars) → on failure,
   `400 { ok:false, reason:"validation", errors:{...} }` with one message
   per invalid field.
4. Rate limit: in-memory `Map` keyed by `x-forwarded-for` (falling back to
   `x-real-ip`, then the literal string `"unknown"`), 3 requests per 15
   minutes, counted only for requests that already passed steps 2–3 →
   `429 { ok:false, reason:"rate_limited" }`.
5. If `ENQUIRY_DELIVERY_ENABLED !== "true"` OR any of `RESEND_API_KEY` /
   `ENQUIRY_FROM_EMAIL` / `ENQUIRY_TO_EMAIL` is unset →
   `503 { ok:false, reason:"not_configured" }`. This is the *default*
   state — delivery has never been enabled outside this check.
6. Otherwise: direct `fetch` to `https://api.resend.com/emails` (no SDK),
   `to` fixed from `ENQUIRY_TO_EMAIL` (never from the request body),
   visitor's address set only as `reply_to`, both HTML (values
   HTML-escaped) and plain-text bodies sent. Non-2xx from Resend →
   `502 { ok:false, reason:"provider_error" }`; network failure →
   `502 { ok:false, reason:"network_error" }`; success →
   `200 { ok:true, id }`.

**Why:** server-side validation independent of the client, spam
resistance without a CAPTCHA, and a fixed non-client-supplied recipient so
the endpoint cannot be used to relay mail anywhere else.

**Status:** steps 1–5 **RATIFIED** — every branch through step 5 was
exercised directly by `011-raystrat-emergent-site-takeover.sh` (the
`503 not_configured` path) and the adapted pytest suite (validation,
honeypot, timing, rate-limit sequence — 9/9 passing against the local dev
server). **Step 6 is CANDIDATE, not ratified** — no message has ever been
sent through Resend from this codebase; the delivery branch has never
been exercised end-to-end by any capability, including this one
(`ENQUIRY_DELIVERY_ENABLED` was never set to `true` during verification,
by design — directive §12 forbids it). Do not treat step 6 as proven
until an actual send has been confirmed received.

## Contract 3 — `SITE_ENV` is the sole indexing switch

**Boundary:** every indexing-relevant behaviour (sitemap presence,
robots.txt crawl/disallow rules, `X-Robots-Tag` header, page-level
`robots` meta, `metadataBase`) reads `IS_PRODUCTION =
process.env.SITE_ENV === "production"` from `app/lib/site.ts`. No other
environment variable or hostname check gates indexing.

**Why:** guarantees a preview/local instance can never accidentally index
by any path other than deliberately setting `SITE_ENV=production`.

**Status:** RATIFIED — verified directly by `011-*.sh`: with `SITE_ENV`
unset (this capability's default local state), `robots.txt` allows
crawling and omits the sitemap reference, `X-Robots-Tag: noindex, nofollow`
is present on all three page routes, and the sitemap itself still
resolves and returns exactly the three production URLs (sitemap
generation is not gated by `IS_PRODUCTION` — only its *advertisement* in
`robots.txt` is). Production-mode behaviour (`SITE_ENV=production`) was
exercised locally during verification but never on the real
`raystratsystems.com` origin — that remains unverified by any capability
to date, per the archive's own disclosure (`HANDOFF.md` §8).

## Contract 4 — yarn only; `next start`, not `next dev`, in production

**Boundary:** `yarn.lock` is the dependency source of truth; `npm
install`/`npm ci` must not be run against this `package.json` (resolves a
different tree). `package.json`'s `start` script runs `next start -H
0.0.0.0 -p 3000` — corrected during this capability from the archive's
`next dev -H 0.0.0.0 -p 3000` (a real bug, not a hypothetical: the
archive's own `HANDOFF.md` documented it, and the wrong version was
confirmed present before the fix).

**Why:** shipping a dev server as "production" defeats optimisation,
disables production error handling, and is measurably slower.

**Status:** RATIFIED — verified directly: `yarn start` was run and its
underlying command confirmed (`next start -H 0.0.0.0 -p 3000`, not `next
dev`); the resulting server was used for all of this capability's
browser- and endpoint-level verification.

## Contract 5 — Design tokens are the only source of colour/type values

**Boundary:** no component may hardcode a hex colour or font-family that
duplicates a value already defined in `app/globals.css`'s `:root` block.

**Why:** carried forward from the prior version of this file — still the
correct principle, now against a much smaller token set (`--bg`, `--ink`,
`--accent`, etc. — see `ai/coding-patterns.md` Stack) than the Node 1/2/3
design system it replaced.

**Status:** CANDIDATE — the principle held throughout this capability's
own additions (the four recoloured metadata-image routes reuse
`app/globals.css`'s actual token values, not new hex literals chosen
independently), but no automated grep/md5 check enforces it the way
Node 1/2/3's wrappers enforced their own token freeze. Not enforced by
tooling; enforced by discipline only, until a future capability adds a
check.
