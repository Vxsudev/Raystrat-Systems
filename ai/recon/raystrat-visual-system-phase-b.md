# Recon: Visual System Phase B — Component Doctrine
**Date:** 2026-05-21  
**Pass:** RAYSTRAT_VISUAL_SYSTEM_PHASE_B_COMPONENT_DOCTRINE  
**Status:** PRE-IMPLEMENTATION

---

## 1. Component Doctrine Map

### 1.1 Hero (`src/components/sections/hero.tsx`)

| Surface | Current | Problem | Target |
|---------|---------|---------|--------|
| Section height | `min-h-[calc(100vh-4rem)] flex items-center justify-center` | Full-viewport hero signals startup drama; FailureThesis not peeking | `py-20 md:py-28`, content-determined |
| Container | `max-w-9xl mx-auto text-center` | `max-w-9xl` has no spec basis; essentially unconstrained | Default centered container |
| Headline scale | `text-6xl sm:text-7xl md:text-8xl` | `text-8xl` = 96px at desktop — exuberance, not authority | `text-5xl md:text-6xl` (Display tier per §9.2) |
| Leading | `font-bold font-headline` (no leading class) | Needs `leading-tight` for display headlines | Add `leading-tight tracking-tighter` |
| CTA style | `variant="ghost" bg-background text-primary border-primary border hover:bg-primary/10 py-4 px-10 text-xl` | Ghost/custom override is inconsistent; no canonical primary treatment | `variant="default" size="lg"` — identical to Results CTA |
| Eyebrow | absent | Spec §13.2 recommends optional eyebrow `OPERATIONAL SYSTEMS ENGINEERING` | Add eyebrow in `--muted-foreground` above H1 |
| Section bg | `bg-transparent` | Fine — light canvas shows through | Retain |
| Section padding | `py-24 md:py-32` overridden by `min-h` | On removal of min-h, need explicit py | `py-20 md:py-28` |

### 1.2 Card Primitive (`src/components/ui/card.tsx`)

| Property | Current | Problem | Target |
|----------|---------|---------|--------|
| Border radius | `rounded-lg` (8px) | Too soft; startup-SaaS feel | `rounded-md` (6px) per §14.2 |
| Shadow | `shadow-sm` | Decorative; system uses borders not shadows | Remove — zero shadow default |

**Impact:** Fix applies globally to all Card usages (services, industries, audit deliverables, governance container).

### 1.3 Services Cards (`src/components/sections/services.tsx`)

| Surface | Current | Problem | Target |
|---------|---------|---------|--------|
| Icon animation | `group-hover:scale-110 group-hover:-rotate-6` | Forbidden motion per §18.3 (scale + rotate on hover) | Remove entirely |
| Shadow on hover | `group-hover:shadow-lg group-hover:shadow-primary/20` | Shadow glow is forbidden hover treatment per §14.3 | Remove |
| Border | `border-2 border-transparent group-hover:border-primary` | 2px border is overly assertive baseline; transparent baseline is correct but should be 1px | `border border-transparent group-hover:border-primary` |
| Transition | `transition-all duration-300` | `transition-all` too broad; spec says color/border transition 150ms | `transition-colors duration-150` |
| Duplicate subhead | `CardDescription` appears twice — once in header, once as italic in CardContent | §9.6 italic removed; §14.4 one subhead per card | Remove italic duplicate in CardContent |

### 1.4 AgentAdvantage/Governance (`src/components/sections/agent-advantage.tsx`)

| Surface | Current | Problem | Target |
|---------|---------|---------|--------|
| Section bg | `bg-card/50` | Opacity-based tint artifact of dark canvas era; on light canvas near-invisible | `bg-secondary` (solid tint per §12.2) |
| Outer container radius | `rounded-2xl` | §14.2 says eliminate `rounded-2xl` | `rounded-md` |
| Container bg | `bg-background/50` | Opacity-based | `bg-background` (solid) |
| Icon marker container | `rounded-full bg-primary/10` | §14.5 says icon containers use `rounded-md` (square) | `rounded-sm bg-primary/10` |
| Container border | `border rounded-2xl` | Border good, radius wrong | `border rounded-md` |

### 1.5 FailureThesis (`src/components/sections/failure-thesis.tsx`)

| Surface | Current | Problem | Target |
|---------|---------|---------|--------|
| Section bg | `bg-card/50` | Dark canvas artifact | `bg-secondary` |

### 1.6 Industries (`src/components/sections/industries.tsx`)

| Surface | Current | Problem | Target |
|---------|---------|---------|--------|
| Section bg | `bg-card/50` | Dark canvas artifact | `bg-secondary` |
| Card bg | `bg-card/50` | Cards should be solid white on tinted section | `bg-card` |

### 1.7 Results (`src/components/sections/results.tsx`)

| Surface | Current | Problem | Target |
|---------|---------|---------|--------|
| Section padding | `py-20 md:py-32` | Inconsistent; not canonical spacing | `py-16 md:py-24 lg:py-32` |
| Section bg | `bg-card text-card-foreground` | `text-card-foreground` is redundant on light canvas; `bg-card` (white) vs `bg-background` (99% white) barely different | `bg-secondary` for clear section differentiation |
| H2 scale | `text-4xl sm:text-5xl md:text-6xl` | Section H2 per §9.2 is Title 1 = `text-3xl md:text-4xl` | `text-3xl md:text-4xl` |
| Audit deliverable card bg | `bg-background/50` | Opacity artifact | `bg-background` (solid) |

### 1.8 Header (`src/components/header.tsx`)

| Surface | Current | Problem | Target |
|---------|---------|---------|--------|
| Green ping dots on logo | `animate-ping bg-green-500` + solid dot | §6.6 explicit removal | Remove entire ping/dot span |
| Scroll behavior | `bg-transparent → bg-background/80 backdrop-blur-sm` | Spec §16.4 says always opaque — Phase C concern | Defer to Phase C |

### 1.9 Footer (`src/components/footer.tsx`)

| Surface | Current | Problem | Target |
|---------|---------|---------|--------|
| Green ping dots | `animate-ping bg-green-500` + solid dot | §6.6 explicit removal | Remove entire ping/dot span |

### 1.10 ServiceSuggester (`src/components/ui/service-suggester.tsx`)

| Surface | Current | Problem | Target |
|---------|---------|---------|--------|
| FloatingTrigger: green pings | `animate-ping bg-green-500` | §6.6 removal | Remove |
| FloatingTrigger: shadow | `shadow-2xl` | Excessive | `shadow-sm` |
| FloatingTrigger: bg | `bg-background/80 backdrop-blur-sm` | Opacity artifact | `bg-background` |
| FloatingTrigger: border | `border-primary/30` | Muted primary border is non-standard | `border-border` |
| DialogTitle: green pings | `animate-ping bg-green-500` in dialog title | §6.6 removal | Remove |
| Auto-open 30s | `setTimeout(() => setIsOpen(true), 30000)` | §17.4: auto-open eliminated | Remove useEffect |

### 1.11 FloatingAiSuggestor (`src/components/ui/floating-ai-suggestor.tsx`)

| Surface | Current | Problem | Target |
|---------|---------|---------|--------|
| Pulse animation | `animate-pulse` on trigger button | §17.3 + §18.3 forbidden | Remove |
| `hover:animate-none` | needed to cancel pulse | Remove with pulse | Remove |
| Icon | `Sparkles` — AI-cliché | §17.2: NOT Sparkles; operational glyph | `MessageSquare` from lucide-react |
| Button style | `bg-primary` filled circle | §17.2: light canvas bg, border, bottom shadow | Outline variant, `bg-background border-border` |
| Tooltip auto-appear | 1.5s timer auto-shows tooltip | §17.5: tooltip on hover only | Remove timer state/useEffect |
| Tooltip controlled | `open={isTooltipOpen} onOpenChange={setIsTooltipOpen}` | Becomes unnecessary | Remove controlled state |

---

## 2. Radius Inventory

| Usage | Current | Target | Location |
|-------|---------|--------|----------|
| Card primitive | `rounded-lg` | `rounded-md` | `card.tsx` |
| Card primitive `rounded-2xl` (governance container) | `rounded-2xl` | `rounded-md` | `agent-advantage.tsx` |
| Button (base) | `rounded-md` | Retain | `button.tsx` |
| Icon container (services/industries) | `rounded-md` | Retain per §14.5 | `services.tsx`, `industries.tsx` |
| Icon marker (governance) | `rounded-full` | `rounded-sm` | `agent-advantage.tsx` |
| FloatingTrigger shape | `rounded-full` | Retain (FAB convention) | various |
| Audit deliverable card | `rounded-lg` → fixed by primitive | `rounded-md` | `results.tsx` (via card) |
| ServiceSuggester dialog | `rounded-full` ping dots | Removed | `service-suggester.tsx` |

**Radius hierarchy post-Phase-B:**
- `rounded-sm` (4px): icon markers within governance properties
- `rounded-md` (6px): all standard cards, buttons, icon containers — the primary radius
- `rounded-lg` (8px): reserved for major containers (e.g., dialog) — current dialogs inherit this from shadcn
- `rounded-full`: FAB buttons (floating advisor, floating trigger), avatars, pills

---

## 3. Hover Inventory

| Element | Current hover | Problem | Target |
|---------|--------------|---------|--------|
| Services card | border-primary + shadow-lg + shadow-primary/20 + icon rotate + icon scale | Forbidden (shadow glow, rotation, scale) | border-primary only |
| Industries card | `rounded-lg shadow-sm` via Card primitive | Shadow removed by primitive fix | border-primary (if linked) |
| Nav links | `hover:text-foreground` | Fine | Retain |
| Primary button | `hover:bg-primary/90` | Fine — darken on hover | Retain |
| Ghost button | `hover:bg-accent hover:text-accent-foreground` | Fine | Retain |
| FloatingTrigger (service-suggester) | `hover:border-primary` | Fine | Retain; fix shadow/bg |
| FloatingTrigger (floating-ai) | `hover:bg-primary/90 hover:animate-none` | Remove animate-none with pulse | Keep `hover:border-primary`, update |
| Footer links | `hover:text-foreground` | Fine | Retain |

---

## 4. Motion Inventory

| Animation | Where | Status | Action |
|-----------|-------|--------|--------|
| `animate-ping` | Header logo, footer logo, service-suggester trigger, service-suggester dialog title | **FORBIDDEN** (decorative ping) | Remove all 4 instances |
| `animate-pulse` | FloatingAiSuggestor trigger button | **FORBIDDEN** | Remove |
| `group-hover:rotate-6` | Services icon | **FORBIDDEN** | Remove |
| `group-hover:scale-110` | Services icon | **FORBIDDEN** | Remove |
| `hover:animate-none` | Services card icon (cancel pulse) | Remove with pulse | Remove |
| `transition-all duration-300` | Services card | Non-canonical | `transition-colors duration-150` |
| `blur-fade-in` keyframe | `globals.css` @keyframes | Dead code, referenced nowhere in components | Retain as dead (not introduced, not removed — Phase D cleanup) |
| `animate-blur-fade-in` | `globals.css` utility | Dead code | Same |
| Accordion open/close | FAQ via shadcn radix | 200ms ease-out — correct | Retain |
| Sheet open/close | Mobile drawer, floating advisors | 200ms — correct | Retain |
| Color/border hover | Buttons, cards | 150ms — target | Enforce via `transition-colors duration-150` |

---

## 5. Spacing Inventory

| Section | Current py | Issue | Target |
|---------|-----------|-------|--------|
| Hero | `py-24 md:py-32` + `min-h-[calc(100vh-4rem)]` | Overconstrained; effectively full-viewport | `py-20 md:py-28` (section base overridden) |
| FailureThesis | `py-16 md:py-24` (section base) | Correct | Retain |
| Services | section base `py-16 md:py-24 lg:py-32` | Correct | Retain |
| AgentAdvantage | `py-16 md:py-24` | Missing `lg:py-32` | Accept as-is (close enough) |
| Industries | section base | Correct | Retain |
| Results | `py-20 md:py-32` | Non-canonical | `py-16 md:py-24 lg:py-32` |
| Services card header | `p-6 flex-row gap-4` | Reasonable | Retain |
| Services card content | `p-6 pt-0 space-y-3` | Reasonable | Retain |
| Governance gap | `gap-x-8 gap-y-10` | Matches §11.2 | Retain |

---

## 6. Hero Rhythm Analysis

**Current state:** Hero occupies full viewport on all screen sizes. Buyer sees nothing but headline + CTA until they scroll. This:
- Signals "big reveal" startup launch energy
- Prevents FailureThesis from peeking (losing the diagnostic arc signal)
- Creates a blank white field at the bottom of the hero viewport — negative space theater

**Target state:** Hero fills roughly 60-70% of first viewport. FailureThesis section header begins to appear, signaling "there is a systematic argument below." Buyer sees: headline → CTA → "there's more below." This is the operational diagnostic frame, not the disruption frame.

**Typography:** `text-8xl` at desktop is 96px. That is product-launch energy. `text-6xl` (60px) is boardroom-authority energy. Per spec §9.2 and §13.2: max Display = `text-5xl md:text-6xl`.

**CTA:** The ghost/custom override gives the hero CTA a unique visual identity separate from the Results CTA. Spec §15.6 explicitly says "Hero CTA looks identical to the Results CTA." One button visual across the site.

---

## 7. Surface Depth Analysis

**Current depth model (pre-Phase B):** 
- Dark canvas → `shadow-sm` elevated cards → `shadow-lg` on hover
- Two levels of elevation: base and hovered

**Problems:**
- Shadow elevation is incompatible with flat enterprise surfaces
- Shadows on light canvas produce soft "floating" feel (startup SaaS)
- Two-level model encourages card-hover lift, which is forbidden

**Target depth model (post-Phase B):**
- Light canvas as baseline
- Cards: white (`bg-card`) — barely lifted from `--background` (99%) by color contrast alone
- Cards on tinted sections (`bg-secondary`): white cards pop cleanly without any shadow
- No shadow on any card
- Borders are the structural signal: `border border-border` → `border border-primary` on hover
- Sections differentiated by background tone (primary canvas ↔ secondary tint), not depth

This is the "honest borders" doctrine: the structure is visible through linework, not lighting.

---

## 8. Implementation Sequencing

Execute in this order to minimize regression risk:

1. **Card primitive fix** (`card.tsx`) — global impact, do first so all other section changes compound correctly
2. **Green ping removal** (header, footer, service-suggester ×2) — pure removal, zero regression risk
3. **ServiceSuggester trigger + auto-open** (`service-suggester.tsx`) — behavior fix + visual
4. **FloatingAiSuggestor** (`floating-ai-suggestor.tsx`) — motion + icon + tooltip
5. **Hero** (`hero.tsx`) — scale + CTA + layout
6. **Section backgrounds** (failure-thesis, agent-advantage, industries) — `bg-card/50` → `bg-secondary`
7. **AgentAdvantage container** (`agent-advantage.tsx`) — radius + bg
8. **Services cards** (`services.tsx`) — motion removal + border fix + duplicate removal
9. **Results** (`results.tsx`) — heading scale + padding + card bg
10. **Verification script creation** (`008.sh`)

---

## 9. Regression Risks

| Change | Risk | Mitigation |
|--------|------|------------|
| Card primitive radius change | Affects all card uses site-wide | Accept — all go to `rounded-md`; no breakage |
| Removing Card `shadow-sm` | Cards may appear less elevated on pure white sections | On `bg-secondary` sections, cards pop cleanly. On `bg-background` sections, `border border-border` handles separation |
| Hero `min-h` removal | Hero may be shorter on tall screens | Correct per spec — use content-determined height |
| Hero CTA style change | May affect conversion behavior | Visual only; Calendly functionality unchanged |
| Removing auto-open (ServiceSuggester 30s) | Users who relied on auto-prompt for discoverability | Explicit trigger remains. SessionStorage check already prevents repeat; removing auto-open improves UX |
| FloatingAiSuggestor icon change | `Sparkles` is recognizable; `MessageSquare` is more generic | Correct per spec; operational cognition > AI cliché |
| Removing tooltip auto-appear | Tooltip was a 1.5s auto-nudge | Tooltip still works on hover; explicit hover is the correct trigger |
| `bg-card/50` → `bg-secondary` on sections | Color change on all tinted sections | On light canvas, `bg-secondary` is `220 10% 96%` — visually very close to `bg-card/50` over white. Minimal visible change |
| Results H2 scale reduction | Headline visually smaller | Correct — Title 1 scale per spec; less drama, more authority |

---

## 10. Out-of-Scope for Phase B (Defer)

| Item | Phase |
|------|-------|
| Header always-opaque (scroll behavior) | Phase C |
| Logo mark PNG in header | Phase C |
| NavLink active state | Phase C |
| ThemeToggle relocation to footer | Phase C |
| AnimatedGridBackground (ByteOfTheWeek) | Phase C |
| System diagram/visual assets | Phase D |
| Footer redesign (structural dark surface) | Phase C |
| Monospace font for numerals | Phase C |
| `/systems` page card consistency | Phase C (inherits from card primitive fix here) |
| `blur-fade-in` dead code removal | Phase D cleanup |
