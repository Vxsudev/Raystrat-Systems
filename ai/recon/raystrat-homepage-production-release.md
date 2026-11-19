# RECON — raystrat-homepage-production-release

Capability: take PR #2 (`feat/homepage-software-systems`, head `e14ce7f`)
through to production on raystratsystems.com.
Date: 2026-11-20
Directive: operator instruction of 2026-11-20 authorising fixes, Vercel
configuration changes, merge and production deploy of PR #2 without a
further approval stop.
State target: RECON_READY

## 1. Deployment blocker (observed, not assumed)

Vercel preview deployment for `e14ce7f`
(`raystrat-systems-qraen3whf-raystrat-systems.vercel.app`) failed in 4s,
before install:

    Node.js Version "20.x" is discontinued and must be upgraded. Please set
    Node.js Version to 26.x in your Project Settings to use Node.js 26.

`vercel project inspect raystrat-systems` confirms `Node.js Version 20.x`.
No build ran, so nothing about the PR's own code was exercised by Vercel.

## 2. Repository runtime declarations

- `package.json`: no `engines` field. `@types/node` is `^20` (type
  definitions only; not a runtime selector; changing it would also change
  `yarn.lock`, which Vercel installs with `--frozen-lockfile`. Not strictly
  necessary, so left alone).
- No `.nvmrc`, `.node-version`, `.tool-versions`, `vercel.json` or
  `vercel.ts`.
- Local toolchain: Node v26.3.1, GNU Bash 5.3.9 (`/opt/homebrew/bin/bash`
  first on PATH, so `011`'s `declare -A` runs under Bash 4+).

Vercel honours `engines.node` in `package.json` over the project setting.
Declaring `"26.x"` there aligns the repo with the project setting and keeps
a future dashboard drift from silently changing the runtime.

## 3. Vercel project (raystrat-systems / team raystrat-systems)

- Project `prj_cEByobo5s2YSZBwSRRb5lsG9PRGa`, framework Next.js, install
  `yarn install --frozen-lockfile`, build `npm run build`, production
  branch `main`, Git-connected to `Vxsudev/Raystrat-Systems`.
- Env: `SITE_ENV=production` scoped to **Production only**. Preview has no
  `SITE_ENV`, so `middleware.ts` / `app/robots.ts` / page metadata serve
  noindex on previews and indexable output on production. No change needed.
- Domain `raystratsystems.com` (+ `www`), Vercel nameservers.
- Current production: `dpl_26PT2dke49oECr81YtcBiSPQD7oU`
  (`raystrat-systems-rjjxupnu1-…`), created 2026-09-06 09:52 IST, matching
  `main` head `f47721f` (Formspree). **This is the rollback target.**

## 4. PR #2 content vs operator constraints

Checked directly in `app/page.tsx` at `e14ce7f`:
- No project stage labels, no "proof of concept", no "with quality gates".
- "Laboratory work-order and test-allocation system" present exactly once.
- Public email `founder@raystratsystems.com` in footer + form error copy.
- Formspree endpoint unchanged (`app/lib/site.ts`); `ContactForm`
  validation/request/response code unchanged per PR description.
- `/ai-solutions` and `/forward-deployed-engineering` untouched and linked
  from the footer.

## 5. Scope decision

The only code change strictly necessary is the `engines` declaration.
Vercel project Node version and the merge/deploy are release operations,
performed by the operator session after `RELEASE_APPROVED`, as with every
predecessor capability.
