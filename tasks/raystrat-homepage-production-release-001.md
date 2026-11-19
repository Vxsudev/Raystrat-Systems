# Task: Declare the Node.js 26.x runtime in package.json

## Parent Spec
specs/raystrat-homepage-production-release.md

## Phase
phase-ui

## Status
done

## Layer
frontend

## Description

Vercel rejected PR #2's deployment because the project runtime is the
discontinued Node.js 20.x (recon §1). Align the repository's runtime
declaration with the supported 26.x runtime.

1. In the repo-root `package.json`, add a top-level `engines` field:
   `"engines": { "node": "26.x" }`. Place it after `"private": true` and
   keep the file's existing 2-space JSON formatting and trailing newline.
2. Change nothing else: no dependency, devDependency (leave
   `@types/node` at `^20`), script or other field. Do not run
   `yarn install`/`npm install` in a way that rewrites `yarn.lock`;
   `yarn.lock` must be byte-identical afterwards.
3. Do not touch any file under `app/`. The homepage, both secondary
   pages, the enquiry form and the public email are approved and frozen
   (spec Locked Constraints 1–4).
4. Do not commit, push, merge, deploy or change any Vercel setting.

## Acceptance Criteria
- [ ] `node -p "require('./package.json').engines.node"` prints `26.x`
- [ ] `git diff --stat` shows `package.json` as the only modified tracked application file
- [ ] `git diff yarn.lock` is empty
- [ ] No file under `app/` changed

## Files Likely Affected
- package.json

## Blocked By
- none
