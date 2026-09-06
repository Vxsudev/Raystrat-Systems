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

**Updated 2026-09-06 (same day, later revision)**: Contracts 1 and 2
rewritten again — the archive's Resend-based `/enquiry/submit` Route
Handler was replaced with a direct client-side submission to Formspree.
The delivery mechanism changed; nothing else in this document changed.

## Contract 1 — No server-side logic at all; everything is static

**Boundary:** there is no Route Handler, Server Action, or other
server-side logic anywhere in the app. All three page routes, the
sitemap, and robots.txt are static or file-convention-generated. The
enquiry form submits directly from the browser to Formspree
(`https://formspree.io/f/mbgjagaz`) — a third-party origin, not a route on
this site.

**Why:** removes the one server-side surface this app used to have
(`app/enquiry/submit/route.ts`, a Resend-backed Route Handler) in favour
of a form-delivery provider, per explicit instruction to replace the
unused Resend integration.

**Status:** RATIFIED — verified directly: no file under `app/` imports
from `next/server` or defines a Route Handler; `app/enquiry/` no longer
exists.

## Contract 2 — The enquiry form's submission contract (Formspree)

**Boundary:** `app/components/ContactForm.tsx` (`"use client"`) posts
directly to `FORMSPREE_ENDPOINT` (`app/lib/site.ts`,
`https://formspree.io/f/mbgjagaz`) — no server-side code on this site is
involved.

1. Client-side field validation is unchanged from the Resend-era
   implementation (name ≤120 chars required; email required, ≤254 chars,
   must match `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`; company required ≤160
   chars; message required, 10–4000 chars) — runs before any network
   request, exactly as before.
2. Request: `POST` to the Formspree endpoint, `Accept: application/json` +
   `Content-Type: application/json`, JSON body
   `{ name, email, company, message, _replyto: email, _gotcha: "" }`.
   `_gotcha` is Formspree's own recognised honeypot field name (a filled
   value causes Formspree to silently discard the submission server-side);
   `_replyto` is a widely-documented Formspree convention that, if
   honoured by the account's plan, sets the notification email's Reply-To
   to the visitor's own address.
3. Response handling (matches Formspree's own client-library discriminator
   logic, confirmed against its public `formspree-core` source — success
   is a body shaped `{ next: string }`; error is `{ error: string,
   errors？: [{ field?, message }] }` — not solely an HTTP status code):
   a response is treated as failed if `data.error` is a string or
   `data.errors` is a non-empty array, **even if the HTTP status was 2xx**.
   Field-level `errors[].field` entries matching `name`/`email`/`company`/
   `message` are mapped back onto the form's own error display; anything
   else surfaces `data.error` or a generic fallback message. A thrown
   `fetch` (network failure) is caught and shown as the same generic
   fallback.
4. Success is shown **only** when the response is both HTTP-ok and
   error-shape-free — the form is cleared and a thank-you message shown
   only then. On any failure, all typed values remain in the form
   (`setValues` is never called except on confirmed success).
5. Duplicate submission is prevented by disabling the submit button while
   `status.kind === "sending"`, plus an early-return guard in the submit
   handler itself if a submission is already in flight.

**Why:** delivery moved to a managed provider (Formspree) rather than a
direct email API, per explicit instruction; recipient routing, the
sending domain, and spam/reCAPTCHA handling are configured in the
Formspree dashboard for that specific form, not in this codebase — no
credential of any kind is required client-side because the form endpoint
itself is not a secret (Formspree's own model: the `/f/{id}` URL is the
public submission target, not an authentication token).

**Status:** the client-side contract (steps 1, 4, 5) is **RATIFIED** —
verified directly by mocked-response browser testing (success, field
error, generic error, and network-failure paths all produce the intended
UI state, values preserved on every failure path). **Step 2/3's exact
wire contract against the real Formspree API is CANDIDATE** — confirmed
against Formspree's own published `formspree-core` source (not assumed),
but never exercised against the live `mbgjagaz` form with a real
network round-trip as of this revision; a real controlled test submission
is a separate, explicitly-gated step (recipient routing must be confirmed
first — see the engineering journal). Do not treat provider acceptance or
inbox delivery as proven until that real test has been run and both
outcomes reported.

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
