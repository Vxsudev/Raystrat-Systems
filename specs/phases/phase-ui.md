# Phase Specification — UI Surface

Phase: phase-ui

## Scope

All user-facing website surfaces of raystrat-systems: `app/`, `components/`,
`lib/`, `styles/`, `public/`. Next.js App Router, React, TypeScript,
Three.js / React Three Fiber / drei, GSAP / ScrollTrigger, CSS, native
browser APIs.

## Boundaries

- No backend services, no CMS, no authentication, no analytics without
  explicit operator approval.
- No mutation of DNS, mail records, `proposals.raystratsystems.com`, or
  unrelated Vercel projects.
- Secrets are never read into specs, tasks, logs, or commits.

## Verification Surfaces

- `scripts/verification/001-typecheck.sh`
- `scripts/verification/002-lint.sh`
- `scripts/verification/003-build.sh`
- `scripts/verification/004-invariants.sh`
- Feature-specific wrappers under `scripts/verification/`
