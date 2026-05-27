# Deferred Public Trust / Legal Surfaces

**Date deferred:** 2026-05-27
**Capability:** `HIDE_DEFERRED_LEGAL_TRUST_SURFACES`
**Branch:** `feature/hide-deferred-legal-trust-surfaces`
**Status:** HIDDEN FROM PUBLIC UI — routes preserved, intentional deferral

> This is a **deliberate deferral, not accidental dead code.** The surfaces below
> are removed from the public footer/nav because they are unfinished and would
> emit premature trust / compliance / legal signaling that a procurement reviewer
> could (reasonably) hold against the firm. The route files are intentionally
> retained so the surfaces can be resurfaced once they carry procurement-safe
> substance.

---

## Reason hidden

The footer "Legal" column linked six institutional/legal surfaces that are either
stub-level (Documentation, Principal, Continuity — Phase C v1 stubs) or non-existent
placeholders (Privacy, Terms, Trust pointed at `#`). Publishing them implies:

- legal coverage we have not authored (Privacy, Terms),
- a compliance/trust posture we have not bounded (Trust),
- institutional documentation depth we have not yet written (Documentation),
- named accountability + continuity guarantees still at stub substance (Principal, Continuity).

Premature exposure is a procurement-trust **risk**: an evaluator who clicks a
"Privacy" or "Trust" link and finds a placeholder downgrades institutional credibility.
Hiding them until they are real is the conservative, trust-preserving choice.

---

## Hidden surfaces + current route/file paths

| Surface | Footer link (removed) | Route file | File status |
|---|---|---|---|
| Documentation | `/documentation` | `src/app/documentation/page.tsx` | EXISTS (stub) — retained |
| Privacy | `#` (placeholder) | (none) | no route file; link removed |
| Terms | `#` (placeholder) | (none) | no route file; link removed |
| Trust | `#` (placeholder) | (none) | no route file; link removed |
| Principal | `/principal` | `src/app/principal/page.tsx` | EXISTS (stub) — retained |
| Continuity | `/continuity` | `src/app/continuity/page.tsx` | EXISTS (stub) — retained |

What changed in the UI:
- `src/components/footer.tsx` — `legalLinks` array deleted; the entire "Legal" footer
  column removed; footer grid reduced `md:grid-cols-3` → `md:grid-cols-2` (Systems + Engage remain).
- Header / mobile nav — never linked these surfaces; unchanged.
- No route files deleted. Direct navigation to `/documentation`, `/principal`,
  `/continuity` still resolves; they are simply not linked from the public chrome.

---

## Resurfacing conditions

Re-enable a surface in the footer only when ALL of the following hold for that surface:

1. **Real content** — the page carries substantive, non-stub content.
2. **Privacy / Terms reviewed** — authored and reviewed (legal sign-off) before publishing; not placeholders.
3. **Trust / compliance claims bounded** — any compliance posture is explicitly bounded
   (operational properties without certification overclaim; no "SOC 2 / ISO / HIPAA certified"
   language unless actually certified).
4. **Principal / Continuity procurement-safe substance** — named-accountability and
   continuity statements filled with procurement-safe substance (ratified by the principal).
5. **Footer re-enabled intentionally** — restore `legalLinks` + the Legal column in
   `footer.tsx` as a deliberate act, with its own verification update; do not let it
   creep back accidentally.

---

## How to resurface (mechanical)

1. Restore the `legalLinks` array in `src/components/footer.tsx` (see git history:
   commit prior to `feature/hide-deferred-legal-trust-surfaces`).
2. Restore the third footer column block and set the grid back to `md:grid-cols-3`.
3. Author the corresponding route content (and add `src/app/privacy`, `src/app/terms`,
   `src/app/trust` if those surfaces are published).
4. Update verification: revert the route-existence reconciliations in
   `009/010/011/012` back to footer-anchor assertions, and update
   `022-hide-deferred-legal-trust-surfaces.sh` (or retire it).

---

## Verification

Gate: `scripts/verification/022-hide-deferred-legal-trust-surfaces.sh` enforces that the
six surfaces are absent from footer/header, the retained route files still exist, this
deferred doc exists and names all six surfaces, and the footer still renders Systems/Engage cleanly.
