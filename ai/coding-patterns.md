# Coding Patterns — Raystrat Systems Website

## Stack

- **Next.js 15** (App Router, RSC-first)
- **React 18** (server + client components)
- **TypeScript** (strict mode)
- **Tailwind CSS 3.4** (utility-first, no CSS modules)
- **Radix UI** (unstyled primitives for accessible components)
- **Genkit 1.x + Google GenAI** (server-side AI flows)
- **Firebase** (Auth, Firestore, Functions, Data Connect, Hosting)
- **SendGrid** (transactional email via API route)

---

## Established Patterns

### 1. Marketing Copy

All marketing copy lives in `src/data/content.ts` as typed constants. Section components receive data as props — they do not hardcode strings.

### 2. Server Actions as AI Bridge

Client components call server actions in `src/app/actions.ts`. Server actions invoke Genkit flows and return typed results. Client components never import from `@/ai/flows/`.

### 3. Component Widget Pattern

Floating AI widgets (ServiceSuggester, FloatingAiSuggestor, FloatingNoteTaker) are gated in `src/components/app-content.tsx` based on route. Each widget is a client component with a server action callback.

### 4. Radix UI + Tailwind

Primitive UI components use Radix for accessibility contracts (Dialog, Popover, etc.) with Tailwind for visual styling. Do not use CSS modules or `styled-components`.

### 5. API Routes for Genkit

Each Genkit flow has a corresponding API route in `src/app/api/genkit/<flowName>/route.ts`. These are the HTTP endpoints for server-to-server or external access. Server actions are preferred for client→server flow.

### 6. Environment Variable Conventions

| Prefix | Usage |
|--------|-------|
| `NEXT_PUBLIC_*` | Client-safe (Firebase client config only) |
| Everything else | Server-only (AI keys, admin SDK, SendGrid) |

Never use `NEXT_PUBLIC_` for secrets. Firebase client config (app ID, API key for client SDK) is intentionally public.

### 7. Path Aliases

`@/` resolves to `src/`. Use `@/` for all internal imports. Do not use relative `../../` imports across feature boundaries.
