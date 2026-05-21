# Recon: Homepage Repositioning Implementation
## Capability: RAYSTRAT_HOMEPAGE_REPOSITIONING_IMPLEMENTATION

**Date:** 2026-05-21  
**Status:** Pre-implementation recon — authoritative for task graph generation

---

## 1. Route Dependencies

### Current service routes
```
/services/leads-hunter-agent          → src/app/services/[slug]/page.tsx
/services/follow-up-agent             → src/app/services/[slug]/page.tsx
/services/support-agent               → src/app/services/[slug]/page.tsx
/services/operations-agent            → src/app/services/[slug]/page.tsx
/services/data-command-agent          → src/app/services/[slug]/page.tsx
/services/custom-ai-agent             → src/app/services/[slug]/page.tsx
```

### Target system routes
```
/systems/demand-acquisition           → src/app/systems/[slug]/page.tsx (NEW)
/systems/follow-through               → src/app/systems/[slug]/page.tsx (NEW)
/systems/frontline-support            → src/app/systems/[slug]/page.tsx (NEW)
/systems/operations-control           → src/app/systems/[slug]/page.tsx (NEW)
/systems/command-intelligence         → src/app/systems/[slug]/page.tsx (NEW)
/systems/custom-operations            → src/app/systems/[slug]/page.tsx (NEW)
```

### Required 301 redirects (next.config.js)
```
/services/leads-hunter-agent          → /systems/demand-acquisition
/services/follow-up-agent             → /systems/follow-through
/services/support-agent               → /systems/frontline-support
/services/operations-agent            → /systems/operations-control
/services/data-command-agent          → /systems/command-intelligence
/services/custom-ai-agent             → /systems/custom-operations
/services/:slug                       → /systems/:slug (catch-all fallback)
```

---

## 2. Service Slug References (All locations)

### Locations that hardcode `/services/` path string:

| File | Line | Content | Action |
|------|------|---------|--------|
| `src/components/sections/services.tsx` | 21 | `href={\`/services/${service.slug}\`}` | Update to `/systems/` |
| `src/components/app-content.tsx` | 14 | `pathname.startsWith('/services/')` | Update to `/systems/` |
| `src/components/ui/ai-suggestor.tsx` | 62 | `href={\`/services/${turn.data.suggestedService.slug}\`}` | Update to `/systems/` |
| `src/components/ui/service-suggester.tsx` | 101 | `router.push('/services/...')` | Update to `/systems/` |
| `src/app/sitemap.ts` | 14 | `` `${siteUrl}/services/${service.slug}` `` | Update to `/systems/` |
| `src/app/actions.ts` | 215 | Email template `/services/${agentSlug}` | Update to `/systems/` |

### Locations that use `agentName`/`agentSlug` variable names (in `actions.ts`):
- Lines 154-171, 181, 191, 194-195, 210-215 — variable names; keep working but update email copy language
- `FavoriteAgentButton` component uses `agentName`/`agentSlug` props — may keep as internal variable names

### Locations in `service-page-client.tsx`:
- Line 165: `href={\`/services/${nextService.slug}\`}` — update to `/systems/`
- Line 55: "Agent Found!" popup title — update language
- Line 151: `FavoriteAgentButton agentName={service.title} agentSlug={service.slug}` — internal props, keep

---

## 3. CTA Surfaces

| Location | Current CTA | Target CTA |
|----------|-------------|------------|
| `hero.tsx` | "See The Five Agents" → `#services` | "Book Operational Audit" → external Calendly or `/audit` |
| `service-page-client.tsx` sidebar | "Book a Demo" (CalendlyButton) | "Book Operational Audit" (same component, new label) |
| `header.tsx` | No primary CTA (Download Playbook + CalendlyButton in mobile menu) | Add "Book Operational Audit" to desktop nav |
| Services grid cards | Link to `/services/[slug]` | Link to `/systems/[slug]` |
| `service-suggester.tsx` | Routes to `/services/...` | Routes to `/systems/...` |

---

## 4. DynamicHeadline Usage

**File:** `src/components/ui/dynamic-headline.tsx`  
**Used only in:** `src/components/sections/hero.tsx` (line 5 import, line 14 usage)

**Current behavior:** Cycles through "Your Leads.", "Your Follow-Up.", "Your Support.", "Your Operations.", "Your Data." every 3 seconds

**Action:** Remove from hero.tsx; do NOT delete the file yet (soft deprecation). Replace with a static, authority-carrying headline.

---

## 5. AI Flow Coupling

### `src/ai/flows/contextual-assistant.ts`
- **System prompt:** Agent-first language ("Raystrat Systems AI Assistant... Raystrat Systems services... service page")
- **Service list:** Dynamically built from `services` data at module load time: `services.map(s => \`- ${s.title} (slug: ${s.slug})\`)`
- **Cross-sell logic:** References "service page" in examples
- **Key issue:** After content.ts slug rename, the serviceList will automatically update (good). But system prompt text needs vocabulary update.

### `src/ai/flows/service-suggester.ts`
- **Output:** `suggestedServiceSlug` (string) — this slug feeds into the `/services/` redirect in `service-suggester.tsx`
- **Service list:** Same dynamic build from `services` data
- **Key issue:** After slug rename in content.ts, the output slugs will be the new slugs (e.g., `demand-acquisition`). The route in `service-suggester.tsx` must be updated to `/systems/${slug}` BEFORE users can use the suggester.

---

## 6. Build Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Breaking content.ts types | HIGH | New fields must be additive; existing field names must be preserved or all consumers updated |
| Slug rename without redirect | HIGH | Must add 301 redirects to next.config.js before/simultaneously with slug changes |
| DynamicHeadline removal breaks hero | LOW | File kept; just not imported |
| AI flow slug mismatch post-rename | MEDIUM | content.ts slug rename + service-suggester.tsx route update must happen in same task |
| `app-content.tsx` widget not showing on /systems/ pages | MEDIUM | Must update `isServicePage` check |
| `sitemap.ts` still listing /services/ | LOW | Update after route creation |
| `actions.ts` email link still /services/ | LOW | Update in same pass as other /services/ hrefs |
| Pre-existing typecheck failures (unrelated) | LOW | Already documented; build has `ignoreBuildErrors: true` |

---

## 7. Redirect Risks

The current `next.config.js` has no `redirects` configuration. Adding a `redirects()` async function is additive and non-breaking.

```js
// Pattern to add:
async redirects() {
  return [
    { source: '/services/leads-hunter-agent', destination: '/systems/demand-acquisition', permanent: true },
    { source: '/services/follow-up-agent', destination: '/systems/follow-through', permanent: true },
    { source: '/services/support-agent', destination: '/systems/frontline-support', permanent: true },
    { source: '/services/operations-agent', destination: '/systems/operations-control', permanent: true },
    { source: '/services/data-command-agent', destination: '/systems/command-intelligence', permanent: true },
    { source: '/services/custom-ai-agent', destination: '/systems/custom-operations', permanent: true },
  ];
}
```

Note: A wildcard `/services/:slug → /systems/:slug` would not work for slug renames, only for same-slug routes. Must use explicit mappings.

---

## 8. content.ts Dependency Graph

`src/data/content.ts` exports consumed by:

| Export | Consumers |
|--------|-----------|
| `services` (array) | `src/components/sections/services.tsx`, `src/app/services/[slug]/page.tsx`, `src/components/ui/service-page-client.tsx`, `src/ai/flows/contextual-assistant.ts`, `src/ai/flows/service-suggester.ts`, `src/app/sitemap.ts` |
| `navigationLinks` | `src/components/header.tsx` |
| `faq` | `src/components/sections/faq.tsx` |
| `results` | NOT CONSUMED by any component currently (Results section in `results.tsx` is standalone) |
| `pricing` | NOT CONSUMED anywhere |
| `bytes` | `src/app/bytes/`, `src/app/sitemap.ts` |
| `ContextualAssistantOutput` (type re-export) | `src/data/content.ts` re-exports from `@/ai/flows/contextual-assistant` — check if used |

### Type shape of `services` array (must preserve or update all consumers):
```ts
{
  slug: string;
  title: string;
  subhead: string;
  bullets: string[];
  icon: LucideIcon;
  pageContent: string;
  iconClassName?: string;
  presetQuestions?: string[];
}
```

### Safe to add new fields to the type — existing consumers only destructure known fields.

---

## 9. System Naming Decisions

Final system names (ratified for implementation):

| Old title | New title | New slug |
|-----------|-----------|----------|
| Leads Hunter Agent | Demand Acquisition | `demand-acquisition` |
| Follow-Up Agent | Follow-Through Infrastructure | `follow-through` |
| Support Agent | Frontline Support | `frontline-support` |
| Operations Agent | Operations Control | `operations-control` |
| Data Command Agent | Command Intelligence | `command-intelligence` |
| Custom AI Agent | Custom Operations Build | `custom-operations` |

---

## 10. Homepage Section Order (Target)

```
1. Hero                   → new: operational failure framing, static headline, audit CTA
2. FailureThesis          → NEW COMPONENT: names the 5 choke points + structural failure mode
3. SystemsCatalogue       → renamed/updated: replaces Services
4. GovernanceLayer        → replaced: replaces AgentAdvantage
5. OperationalContexts    → updated: replaces Industries (3 verticals only)
6. EngagementEntry        → replaced: replaces Results (audit CTA block)
7. ByteOfTheWeek          → UNCHANGED
8. Faq                    → updated content only
```

---

## 11. Files Modified vs Created

### New files:
- `src/app/systems/[slug]/page.tsx` (cloned from services/[slug]/page.tsx, updated)
- `src/components/sections/failure-thesis.tsx` (new section)
- `scripts/verification/005-raystrat-homepage-repositioning.sh` (new)
- `ai/recon/raystrat-homepage-repositioning-implementation.md` (this file)

### Modified files:
- `src/data/content.ts` — systems, navigation, faq
- `next.config.js` — add redirects
- `src/app/page.tsx` — new section composition
- `src/app/sitemap.ts` — /systems/ route
- `src/components/sections/hero.tsx` — new copy, remove DynamicHeadline
- `src/components/sections/services.tsx` → repurposed as `systems-catalogue.tsx` (OR renamed in place)
- `src/components/sections/agent-advantage.tsx` → replaced by `governance-layer.tsx` (OR renamed in place)
- `src/components/sections/industries.tsx` → updated to `operational-contexts.tsx` (OR updated in place)
- `src/components/sections/results.tsx` → replaced by `engagement-entry.tsx` (OR updated in place)
- `src/components/app-content.tsx` — /services/ → /systems/ pathname check
- `src/components/ui/ai-suggestor.tsx` — /services/ → /systems/ link
- `src/components/ui/service-suggester.tsx` — /services/ → /systems/ router.push
- `src/components/ui/service-page-client.tsx` — /services/ → /systems/ next-service link, "Agent Found!" → "System Match"
- `src/app/actions.ts` — email template /services/ → /systems/ URL
- `src/ai/flows/contextual-assistant.ts` — system prompt vocabulary update
- `src/ai/flows/service-suggester.ts` — system prompt vocabulary update

### Not modified:
- `src/app/dashboard/` (untouched)
- `functions/` (untouched)
- Firebase/deployment config (untouched)
- `src/components/sections/byte-of-the-week.tsx` (unchanged)
- `src/components/sections/faq.tsx` (structure unchanged, content via content.ts)
- `src/components/sections/contact.tsx` (unchanged)
