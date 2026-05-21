# Repo Index — Raystrat Systems Website

## Entry Points

| Surface | Entry Point | Notes |
|---------|-------------|-------|
| Marketing site | `src/app/page.tsx` | Host-routes to marketing or app |
| App dashboard | `src/app/app-dashboard/` | Auth-gated |
| API routes | `src/app/api/` | Genkit flows + contact form |
| Server actions | `src/app/actions.ts` | Client→server AI bridge |
| Cloud Functions | `functions/src/index.ts` | Firebase-triggered |

## Key Files

| File | Role |
|------|------|
| `src/data/content.ts` | All marketing copy (services, industries, FAQs, results) |
| `src/components/app-content.tsx` | AI widget gate by route |
| `src/components/sections/` | 9 marketing section components |
| `src/ai/flows/contextual-assistant.ts` | Context-aware AI chat flow |
| `src/ai/flows/notes-analyzer.ts` | Meeting notes → CTA analyzer flow |
| `src/ai/flows/service-suggester.ts` | Service recommendation flow |
| `src/ai/genkit.ts` | Genkit instance initialization |

## OS Governance Files

| File | Role |
|------|------|
| `ai/engineering-journal.md` | Append-only change log |
| `ai/invariant-registry.md` | Invariant catalogue |
| `ai/state_registry.json` | OS state machine state |
| `ai/product-invariants.md` | Product-level architectural invariants |
| `ai/runtime-contracts.md` | Server/client boundary contracts |
| `ai/service-boundaries.md` | Surface map and boundary rules |
| `ai/coding-patterns.md` | Stack and pattern reference |
| `.engineering-os/adapter.config.sh` | OS adapter configuration |
| `.engineering-os/invariants/` | Executable invariant rule scripts |
| `specs/` | Spec artifacts (OS controlled) |
| `tasks/` | Task artifacts (OS controlled) |
| `scripts/verification/` | Verification wrapper scripts |
| `vendor/engineering-os/` | Engineering OS runtime (submodule) |

## Build Outputs

- `next build` → `.next/` (not committed)
- `firebase deploy --only hosting` → serves `.next/` via Firebase Hosting
- `firebase deploy --only functions` → deploys `functions/`
- `firebase deploy --only dataconnect` → deploys Data Connect schema
