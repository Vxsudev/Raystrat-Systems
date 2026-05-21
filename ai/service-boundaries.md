# Service Boundaries — Raystrat Systems Website

## Top-Level Surface Map

```
Raystrat-Systems/
├── src/                   APPLICATION LAYER (Next.js App Router)
│   ├── app/               Routes, API handlers, server actions
│   ├── components/        React components (UI + AI widget containers)
│   ├── data/content.ts    Single source of marketing copy
│   ├── ai/flows/          Genkit AI flows (SERVER-ONLY — see runtime-contracts.md)
│   └── lib/               Shared utilities
├── functions/             CLOUD FUNCTIONS LAYER (Firebase Functions v2)
├── dataconnect/           FIREBASE DATA CONNECT SCHEMA (not app code)
├── ai/                    ENGINEERING OS GOVERNANCE (not app code)
├── specs/                 SPEC ARTIFACTS (OS control layer)
├── tasks/                 TASK ARTIFACTS (OS control layer)
├── scripts/               VERIFICATION SCRIPTS (OS control layer)
├── vendor/engineering-os/ ENGINEERING OS RUNTIME (read-only submodule)
├── .engineering-os/       ADAPTER CONFIG + INVARIANTS
├── public/                STATIC ASSETS
└── apps/ + home/          LEGACY ARCHIVES (not referenced by build)
```

---

## Boundary Rules

### src/ → Application Layer

- All user-facing rendering and server-side logic lives here.
- `src/app/page.tsx` is the host-router: marketing vs. app domain split happens here.
- Server actions (`src/app/actions.ts`) are the only legal bridge between client and AI flows.

### functions/ → Cloud Functions Layer

- Firebase-triggered and HTTPS callable functions.
- Has its own `package.json` and deploys independently via `firebase deploy --only functions`.
- May import shared types from `src/` only as type-only imports (never runtime imports).

### dataconnect/ → Schema Layer

- Firebase Data Connect `.gql` schema files.
- Not imported by application code.
- Deploy via `firebase deploy --only dataconnect`.

### ai/ → Engineering OS Governance Layer

- Contains: `engineering-journal.md`, `invariant-registry.md`, `state_registry.json`, and doctrine files.
- NOT imported by application code. Genkit auto-discovery does not scan `*.md` files.
- The `src/ai/` path (i.e., `@/ai/`) is the application AI layer, separate from the root `ai/` governance layer.

### vendor/engineering-os/ → OS Runtime Layer

- Git submodule. Read-only. Never modify files here.
- Reference scripts via `bash vendor/engineering-os/scripts/<script>.sh`.
- Update via `git submodule update --remote vendor/engineering-os`.

### .engineering-os/ → Adapter Layer

- `adapter.config.sh`: project-specific OS configuration.
- `invariants/`: executable invariant rule scripts.
- Not deployed; not imported by application code.
