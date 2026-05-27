# Recon: Raystrat Visual System Spec
## Capability: RAYSTRAT_VISUAL_SYSTEM_SPEC

**Date:** 2026-05-21
**Status:** Pre-spec recon — authoritative for spec generation
**Scope:** SPEC ONLY. No implementation. Documents the current visual layer and the constraints/risks that the spec must resolve.

---

## 1. Current Visual System Inventory

### 1.1 Mode and theme

- `html` element has hardcoded `className='dark'` in `src/app/layout.tsx`
- `ThemeProvider` (`next-themes`) is configured with `defaultTheme="dark"`, `attribute="class"`, `enableSystem`
- `ThemeToggle` component is wired into `src/components/header.tsx`
- A `.light` variable block exists in `globals.css` but is shadowed by `:root` always resolving to dark values
- Net effect: site runs in dark only; light mode is dead code

### 1.2 Background composition

| Surface | Background |
|---------|------------|
| Page-level wrapper (homepage) | `bg-dotted-pattern bg-fixed` (radial-gradient dotted lattice, 16px tile, foreground/10 dots, fixed attachment) |
| Sections (transparent) | Hero, Services, FAQ — show the dotted pattern |
| Sections (card tint) | FailureThesis, Industries, AgentAdvantage, ByteOfTheWeek — `bg-card/50` |
| Sections (solid card) | Results — `bg-card text-card-foreground` |
| Header (scrolled) | `bg-background/80 backdrop-blur-sm` with bottom border |
| Header (top) | `bg-transparent` |
| Footer | inherits page background, top border |

The dotted pattern is the most distinctive ambient visual element on the marketing site and runs behind every page section.

### 1.3 Section rhythm

All sections inherit `@apply py-16 md:py-24 lg:py-32` from `globals.css` base layer. Individual sections occasionally override (`py-16 md:py-24` on Industries, FailureThesis, ByteOfTheWeek; `py-20 md:py-32` on Results). The rhythm is mostly consistent but with mild drift.

Container: `mx-auto w-full max-w-screen-xl px-4 md:px-6` — 1280px maximum width. One custom utility `max-w-9xl` (96rem ≈ 1536px) defined in tailwind config but used only on the hero center wrapper.

### 1.4 Component density inventory

| Component | Location | Notes |
|-----------|----------|-------|
| Header | `src/components/header.tsx` | Sticky, transparent → translucent on scroll, green-ping status dot, wordmark "Raystrat Systems" in headline font, ThemeToggle button, mobile Sheet menu, login dropdown |
| Footer | `src/components/footer.tsx` | Minimal: green-ping status dot + wordmark + back-to-top link |
| Hero | `src/components/sections/hero.tsx` | `min-h-[calc(100vh-4rem)]`, transparent bg, centered 8xl headline, CalendlyButton CTA with primary-border outline style |
| FailureThesis | `src/components/sections/failure-thesis.tsx` | 2-column grid, ordered list left + prose right, "The Problem" uppercase tracking-widest primary label |
| Services (Systems) | `src/components/sections/services.tsx` | 3-column card grid, hover: border-primary + shadow-primary/20 + icon scale-110 rotate-6, italic duplicate subhead, Check bullet icons |
| AgentAdvantage (Governance) | `src/components/sections/agent-advantage.tsx` | 3-column grid inside bordered surface, ArrowRight chevron per item, "Governance by Design" h2 |
| Industries | `src/components/sections/industries.tsx` | 3-column card grid (Fintech, Legal, Healthcare), icon-in-tinted-square + title pattern |
| Results (Audit CTA) | `src/components/sections/results.tsx` | Centered narrow column, 3 small audit-deliverable cards, primary CalendlyButton "Book Operational Audit", trailing muted disclaimer "Not a demo. Not a trial." |
| ByteOfTheWeek | `src/components/sections/byte-of-the-week.tsx` | 2-column layout, animated grid background tile, big primary-colored "B01" label |
| FAQ | `src/components/sections/faq.tsx` | Standard Accordion, centered narrow column |

---

## 2. Current Color/Token Inventory

All tokens defined in `src/app/globals.css` and mapped through `tailwind.config.ts` to `bg-*`, `text-*`, `border-*` utilities.

### 2.1 Dark mode (currently active)

| Token | HSL | Notes |
|-------|-----|-------|
| `--background` | `0 0% 0%` | Pure black |
| `--foreground` | `0 0% 100%` | Pure white |
| `--card` | `0 0% 10%` | Near-black, slight elevation |
| `--card-foreground` | `0 0% 100%` | White |
| `--popover` | `0 0% 0%` | Pure black |
| `--primary` | **`43 74% 49%`** | **Gold / amber** — approximate hex `#D9A929` / `#D4AF37` family |
| `--primary-foreground` | `220 5.9% 6.1%` | Near-black with cool tint |
| `--secondary` | `0 0% 21.2%` | Dark gray |
| `--muted` | `0 0% 21.2%` | Dark gray (same as secondary) |
| `--muted-foreground` | `0 0% 63.9%` | Mid gray |
| `--accent` | `0 0% 21.2%` | Dark gray (background) |
| `--accent-foreground` | `43 74% 49%` | Gold (foreground on accent surfaces) |
| `--destructive` | `0 62.8% 30.6%` | Muted red |
| `--border` | `0 0% 21.2%` | Dark gray |
| `--input` | `0 0% 14%` | Near-card black |
| `--ring` | `43 74% 49%` | Gold (focus ring) |

### 2.2 Light mode (defined but inert)

`--background: 0 0% 98%`, `--foreground: 0 0% 3.9%`, `--card: 0 0% 100%`, `--border: 0 0% 89.8%`, `--ring: 43 74% 49%` (still gold).

### 2.3 Brand-color inconsistency

| Surface | Color |
|---------|-------|
| Logo geometry | Black + bright structural blue (`~#1E5BFF` family, based on PNG inspection) |
| Logo wordmark | Black with blue accent on "STRAT" and blue underline beneath "SYSTEMS" |
| Logo background | White / light |
| Site primary token | **Gold `43 74% 49%`** |
| Calendly widget URL | hardcoded `primary_color=d4af37` (gold) |

**Conclusion:** The site's primary accent is structurally misaligned with the brand identity. The logo signals a blue-led, light-canvas system; the site delivers a gold-led, dark-canvas system. The visual layer contradicts the brand mark.

---

## 3. Typography Inventory

### 3.1 Families

- **Body:** Inter, loaded via `next/font/google`, `--font-body` CSS variable
- **Headline:** Space Grotesk, loaded via `next/font/google`, `--font-headline` CSS variable
- **Code:** `monospace` defined in tailwind config but no observed usage

### 3.2 Observed scale and weights

| Class | Usage |
|-------|-------|
| `text-6xl sm:text-7xl md:text-8xl font-bold font-headline` | Hero H1 (single occurrence — extreme display weight) |
| `text-4xl sm:text-5xl md:text-6xl font-bold font-headline tracking-tighter` | Results audit headline |
| `text-3xl sm:text-4xl md:text-5xl font-bold font-headline tracking-tighter` | Section H2s (Services, Industries, FAQ) |
| `text-2xl font-bold font-headline` | Sub-section H2s (FailureThesis left/right titles) |
| `text-xl font-bold font-headline` | Card titles (Industries) |
| `text-lg font-semibold font-headline` | Service card titles |
| `text-lg / text-xl text-foreground/80 / text-muted-foreground` | Body / lead paragraphs |
| `text-sm font-semibold tracking-widest uppercase text-primary` | Eyebrow labels ("The Problem", "The First Move") |

### 3.3 Type observations

- Hero uses 8xl — the largest scale in the system. Reads as marketing exuberance more than institutional weight.
- Eyebrow labels (uppercase tracking-widest primary) appear consistently in 2 sections. Good pattern; under-utilized.
- Italic copy used in services section CardDescription. One-off.
- No defined line-height tokens beyond `leading-none` and `leading-relaxed`.
- No explicit numeric-tabular treatment for stats or numbers.

---

## 4. Card / Surface / Interaction Inventory

### 4.1 Base Card primitive (`src/components/ui/card.tsx`)

```
rounded-lg border bg-card text-card-foreground shadow-sm
```

`rounded-lg = 0.5rem (8px)`. Border uses `--border` (dark gray). Subtle shadow.

### 4.2 Service card overrides

- `border-2 border-transparent` base → `group-hover:border-primary` (gold on hover)
- `group-hover:shadow-lg group-hover:shadow-primary/20` (gold glow)
- Icon: `group-hover:scale-110 group-hover:-rotate-6` (scale and tilt)
- Icon container: `p-3 rounded-md bg-primary/10` (gold-tinted square)
- Bullets: `Check` icon at `text-primary` (gold)

### 4.3 Other card surfaces

- Audit deliverable cards (Results): `rounded-lg border border-border bg-background/50` — semi-transparent against the dark card background
- Governance properties (AgentAdvantage): displayed inside a single bordered container `max-w-5xl mx-auto p-8 border rounded-2xl bg-background/50` — note **`rounded-2xl`** here, larger radius than standard cards
- Industries cards: same Card primitive, no hover treatment beyond default
- Byte tile: `rounded-2xl border` with an `AnimatedGridBackground` filling it

### 4.4 Radius inconsistency

The codebase uses three radii on similar surfaces:
- `rounded-md` (icon containers): 6px
- `rounded-lg` (cards default): 8px
- `rounded-2xl` (governance container, byte tile): 16px

There is no published rule about when each is used. Pattern is inherited from shadcn defaults plus ad-hoc decisions.

### 4.5 Hover states

| Element | Hover treatment |
|---------|-----------------|
| Service card | border → primary, shadow → primary glow, icon scale+rotate |
| Default button | `bg-primary/90` opacity shift |
| Outline button | `bg-accent` fill + `text-accent-foreground` |
| Ghost button | `bg-accent` + `text-accent-foreground` |
| Nav links | `text-foreground/80` → `text-foreground` |
| Floating-ai-suggestor trigger | `hover:bg-primary/90 hover:animate-none` (pulse stops on hover) |

---

## 5. Button and CTA Inventory

### 5.1 Variants and sizes

`src/components/ui/button.tsx` defines:
- Variants: `default` (filled primary), `destructive`, `outline`, `secondary`, `ghost`, `link`
- Sizes: `default` (h-10 px-4), `sm` (h-9 px-3), `lg` (h-11 px-8), `icon` (h-10 w-10)
- All `rounded-md` (6px)
- Focus: `ring-2 ring-ring ring-offset-2` (ring uses gold token)

### 5.2 Visible CTAs on the marketing surface

| CTA | Variant | Where |
|-----|---------|-------|
| "Book Operational Audit" (Hero) | `ghost` with primary-border override class | Hero only |
| "Book Operational Audit" (Results) | `default` (filled primary/gold) `size="lg"` | Primary results CTA |
| "Diagnose a Breakdown" (floating trigger) | `outline` with custom backdrop-blur classes | Homepage floating |
| "Save This System" | `outline` `size="lg"` full-width | System detail pages |
| "Read Now" (Byte) | `default` `size="lg"` | ByteOfTheWeek |
| "Explore All Bytes" | `outline` `size="lg"` | ByteOfTheWeek |
| Mobile-menu "Download Playbook" | `outline` | Header mobile drawer |
| Mobile-menu CalendlyButton | `default` (inherits) | Header mobile drawer |

### 5.3 CTA-style inconsistency

The Hero CTA breaks pattern — it uses `ghost` + primary-color border override, not `default`. The Results audit CTA uses `default` (filled). This makes two different visual signatures for the same conceptual action ("Book Operational Audit"). A standardized primary-CTA treatment is needed.

CalendlyButton itself hardcodes `primary_color=d4af37` in the Calendly URL parameter — the in-modal Calendly widget will continue showing gold even after a primary swap unless this is updated.

---

## 6. Motion / Animation Inventory

### 6.1 Defined animations in tailwind.config.ts and globals.css

| Animation | Definition | Usage |
|-----------|------------|-------|
| `animate-ping` | Tailwind built-in | Green status dot in Header, Footer, ServiceSuggester trigger, ServiceSuggester dialog |
| `animate-pulse` | Tailwind built-in | FloatingAiSuggestor trigger button |
| `animate-blur-fade-in` | Custom 3s ease-in-out infinite | Defined in globals.css; no observable usage in src/ |
| `animate-marquee` | Custom 60s linear infinite | Defined in tailwind.config.ts; referenced by `src/components/ui/marquee.tsx` (which has a pre-existing build error) |
| `animate-accordion-down/up` | Custom 0.2s ease-out | Used by Accordion primitive |
| `animate-pulse-slower` | **UNDEFINED** | Referenced in `AnimatedGridBackground`; falls back to no-animation |
| `move-background` | **UNDEFINED** | Referenced inline in `AnimatedGridBackground` via `style` attribute; will not run |
| Card hover scale + rotate | Tailwind utility classes | Service card icon |
| Hero/section transitions | `transition-colors duration-300` (Header) | Header sticky scroll |

### 6.2 Motion observations

- The site has a "playful" motion vocabulary: ping dots, pulsing trigger button, icon scale+rotate, animated grid.
- Two referenced animations are undefined (`animate-pulse-slower`, `move-background`), meaning the visual intent was never fully realized.
- The pulsing floating trigger ("Sparkles" icon with `animate-pulse`) on `/systems/*` pages reads as chatbot/AI-vendor decoration, not operational governance.
- Green-ping status dots (3 separate places) imply "live system" but are decorative — they signal nothing real.
- Card hover scale+rotate is gamified, not institutional.

---

## 7. Floating Advisor Surfaces

### 7.1 Inventory

| Component | File | Where rendered | Trigger style |
|-----------|------|----------------|---------------|
| ServiceSuggester | `src/components/ui/service-suggester.tsx` | Homepage (`AppContent` gate: `pathname === '/'`) | Outline button, `bottom-6 right-6`, green ping, label "Diagnose a Breakdown" |
| FloatingAiSuggestor | `src/components/ui/floating-ai-suggestor.tsx` | System pages (`AppContent` gate: `pathname.startsWith('/systems/')`) | Filled primary circle, `animate-pulse`, `Sparkles` icon, sr-only "Operational Advisor" |
| FloatingNoteTaker | `src/components/ui/floating-note-taker.tsx` | Bytes pages (`pathname.startsWith('/bytes/')`) | Not inspected in detail |

### 7.2 Collision risk

The `AppContent` gates are mutually exclusive by path, so only ONE floating surface renders per page. However, the visual languages of the two homepage-relevant surfaces (ServiceSuggester and FloatingAiSuggestor) are inconsistent — outline pill vs filled glowing circle. From a user mental model, both serve the same role (advisor / assistant) and should converge on a single visual signature.

### 7.3 Behavioral pattern risks

- `ServiceSuggester` auto-opens after 30 seconds (session-gated). This is interruption-pattern: it overrides user intent rather than rewarding it.
- `FloatingAiSuggestor` opens an in-page Sheet on click; tooltip appears 1.5s after page load and auto-dismisses 4s later — micro-interruption.

---

## 8. Dark-Mode Risks

| Risk | Severity | Detail |
|------|----------|--------|
| Pure-black background reads as cybersecurity / consumer tech | HIGH | Operational systems buyers (compliance, ops, finance) work in light-primary tools (Salesforce, Workday, SAP, Office, Notion, Linear). A pure-black marketing surface signals consumer/dev, not institutional. |
| Gold on black reads as luxury / financial-private-banking | HIGH | The accent reads like a high-fee advisory firm or a luxury watch brand, not an engineering company. |
| Logo composition mismatch | HIGH | Logo was designed for white backgrounds. On black, the black geometry disappears and the blue accent becomes orphaned. |
| Reduced LinkedIn first-glance trust | MEDIUM | LinkedIn previews render against light surfaces. A black-background OG image reads "edgy startup" rather than "operational systems." |
| Cognitive load for long body reading | MEDIUM | Dark surfaces with white text increase reading fatigue for body-heavy content (FAQ, system pages). |
| Focus ring is gold against gold borders | MEDIUM | Service card hover state has `border-primary` and focus ring is `--ring: 43 74% 49%` (also gold). Focus indication becomes invisible against the hovered state. |
| Dotted pattern adds noise to every section | MEDIUM | The full-page dotted lattice competes with content typography and amplifies visual fatigue. |

---

## 9. Light-Mode Feasibility

### 9.1 Technical readiness

- Tokens for light mode already defined in `globals.css` (`.light` block)
- ThemeProvider and ThemeToggle already wired
- Components use semantic tokens (`bg-card`, `bg-background`, `text-foreground`) — palette swap propagates automatically
- A token override is sufficient for ~90% of surfaces

### 9.2 Required adjustments for a clean light-primary launch

| Surface | Required change |
|---------|-----------------|
| `src/app/layout.tsx` `<html className='dark'>` | Remove hardcoded class; let ThemeProvider control |
| `globals.css` `:root` block | Set to light values (currently mirrors dark) |
| `--primary` token | Swap from gold (`43 74% 49%`) to brand blue (target HSL TBD by spec) |
| `--ring` token | Match new primary |
| `--accent-foreground` token | Update to reflect new primary |
| CalendlyButton URL | Update `primary_color` parameter from `d4af37` to brand blue hex |
| `bg-dotted-pattern` page wrapper | Decide replacement (clean, subtle horizontal rules, or remove) |
| `bg-card/50` opacity usages | Verify contrast against new light card token (`0 0% 100%` = pure white) |
| `text-foreground/80` patterns | Verify contrast against light background (currently a soft white on black; would become soft black on white — fine for body but verify) |
| `bg-background/50` usages (audit cards) | Verify; semi-transparent white against semi-transparent surface may collapse |
| `bg-primary/10` icon tints | Verify with new primary; blue/10 is colder than gold/10 |
| Logo on light surface | Validated by brand mark — designed for this |
| AnimatedGridBackground | Uses `bg-background` + primary-tinted gradient; rerender in light + new primary needed |
| Calendly modal | External; only the open-trigger color we can influence is the URL param |

### 9.3 Light-mode risks

- Light backgrounds risk reading "generic SaaS landing page" if structure and typography are bland.
- The site must compensate with strong structural anchors (dense, sharp typography, deliberate spacing rhythm, visible section dividers, dark structural elements such as the header bar or hero anchor).
- "Light = friendly" is a trap; the spec must keep the surface controlled and institutional.

---

## 10. Brand-Logo Compatibility Analysis

### 10.1 Logo composition (verified from `public/raystrat-logo.png`)

- Bold geometric mark — a stylized "A" or peaked form rendered as two solid wedges
- Left wedge: solid black / graphite
- Right wedge: structural bright blue (mid-saturation, slightly cool; reads as engineering/financial blue, not navy)
- Wordmark "RAYSTRAT" in black, with "STRAT" rendered in the same blue
- Horizontal blue rule beneath the wordmark
- Subtitle "SYSTEMS" in sentence-case dark gray
- Background: white

### 10.2 Compatibility requirements

| Site element | Requirement |
|--------------|-------------|
| Site primary accent | Must be the same blue (within perceptual tolerance) |
| Site background | Light primary canvas (logo white-native) OR if any dark areas, must isolate logo with a white plate or be inverted-logo variant |
| Logo placement | Header currently shows wordmark text only ("Raystrat Systems") in headline font, not the actual logo mark |
| Favicon / OG image | Should derive from the logo mark and respect its color |
| Visual mark usage on site | Not currently used outside the file; spec should consider mark integration |

### 10.3 Light-canvas alignment

The logo is light-canvas native. A light-primary site doctrine is directly brand-aligned. A blue accent doctrine is directly brand-aligned. Both decisions are not just aesthetically preferable — they are brand-derived.

---

## 11. Cognitive Friction Points

| Point | Where | Friction caused |
|-------|-------|-----------------|
| 8xl hero headline | Hero | Reads as marketing exuberance; institutional buyers register oversized text as "trying hard" |
| Dotted pattern background | Page-level | Adds noise to every reading surface; competes with typography |
| Gold accent against dark | All sections | Color carries unintended luxury/private-banking connotations |
| Icon scale + rotate on hover | Service cards | Gamified motion; reads as "AI startup easter egg," not operational governance |
| Auto-opening ServiceSuggester | Homepage 30s | Interruption pattern; overrides user reading flow |
| Floating advisor with pulse animation | System pages | Pulsing UI signals "AI feature" rather than "advisor" |
| Three different status-ping dots | Header, Footer, suggester | The visual signal is decorative; no real status is being reported |
| Italic duplicate subhead in service cards | Services section | Visual redundancy; the subhead appears twice with slightly different styling |
| Two CTA visual styles for "Book Operational Audit" | Hero (ghost+border) vs Results (filled) | Splits the primary action's visual identity |
| Two card radii (`rounded-lg` vs `rounded-2xl`) | Default cards vs Governance container vs Byte tile | Unsystematized radii signal lack of design discipline |
| Undefined animations referenced | `animate-pulse-slower`, `move-background` | Visual intent never realized; will look broken after a stricter CSS audit |
| `text-foreground/80` for body | Most sections | Subtle but consistent body desaturation; readability OK on dark, requires re-evaluation on light |

---

## 12. Perception Risks

### 12.1 Risks that would dilute positioning

| Risk | What it looks like |
|------|---------------------|
| AI-agency aesthetic | Pulsing trigger buttons, sparkle icons, gradient meshes, dark glow effects |
| Generic SaaS minimalism | Excessive whitespace, no structural anchors, oversized hero, single big CTA, soft palette |
| Cybersecurity cosplay | Pure black, terminal-green status dots, monospace-heavy, gradient mesh, fake "network" visuals |
| Luxury financial advisory | Gold-on-black, serif headlines, "white-glove" framing, formal stock imagery |
| Generic enterprise consulting | Stock imagery of handshakes, generic photos of professionals, soft blue background, blank cards with icon-and-title |
| Trendy portfolio site | Heavy scroll-jacking, oversized typography, asymmetric grids, motion-heavy reveals |
| Playful SaaS | Friendly illustrations, rounded-3xl cards, pastel accents, multi-color highlights |

### 12.2 Risks specific to the current implementation

- Dark + gold + pulsing icon = AI-agency aesthetic
- Dotted background + status pings = cybersecurity cosplay drift
- 8xl headline + filled gold buttons = startup pitch drift
- Italic copy + ornamental hover = portfolio drift
- Missing structural rhythm in spacing = generic SaaS drift

---

## 13. Implementation Risk Map (for the eventual implementation phase)

| Surface | Risk | Mitigation principle (to be spec'd) |
|---------|------|-------------------------------------|
| Color token swap (gold → blue) | LOW — tokens are semantic and propagate | Coordinate with Calendly URL param + AnimatedGridBackground review |
| Dark → light canvas | MEDIUM — many `bg-*/N` opacity usages, contrast verification needed | Build a contrast audit script and verify all `/N` patterns |
| Logo introduction on site | LOW — already in public/ | Spec must address where to use the mark vs wordmark |
| Removing dotted pattern | LOW — single page-wrapper line | Decide replacement (none, hairlines, micro-grid?) |
| Hero scale reduction | LOW — text-class change | Spec must justify the smaller scale as institutional |
| Card hover treatment | LOW — utility classes | Spec must define a single hover doctrine and ban icon theatrics |
| Button consistency (CTA system) | LOW | Spec must define one primary, one secondary, one tertiary; ban variant proliferation |
| Floating advisor visual convergence | MEDIUM — two components differ structurally | Spec must define a single floating-surface doctrine |
| Removing decorative animations | LOW | Spec must enumerate which motion remains and define its purpose |
| ThemeToggle decision | LOW — keep or remove | Spec must decide whether dark-mode is a supported theme or a deprecated artifact |
| Calendly modal color | LOW — URL param | Update in CalendlyButton |
| Pre-existing build crash (buffer-equal-constant-time) | UNCHANGED — out of scope for visual spec | Tracked separately in engineering journal |
| Section radii inconsistency | LOW | Spec must define one rule for radius scale |
| Typography weight choices | LOW | Spec must commit to a weight ladder and stop ad-hoc bold/semibold mixing |

---

## 14. Spec-Authoring Constraints

The forthcoming `phase-visual-system.md` spec must:

1. Be **exhaustive** — 31 numbered sections required by the directive.
2. Be **decisional** — every doctrine section must commit to a position; no "we should consider..." hedge language.
3. Be **derivational** — each decision must trace back to either the positioning invariant or to the brand mark, not to taste.
4. Be **enforceable** — anti-pattern lists and verification criteria must be concrete enough to check in a script.
5. Be **bounded** — the spec is SPEC ONLY. It must not contain code, Tailwind config, or component sketches. It defines doctrine; an implementation phase will produce code.
6. Be **safely reversible** — must include a Current Site Replacement Map and Implementation Phasing recommendation so the implementation phase can be sequenced without all-or-nothing risk.

---

## 15. Unresolved Questions for Spec to Decide

These questions are open. The spec must close them.

1. Should Raystrat move from full dark to light-primary? (Recon recommendation: YES, light-primary with dark structural anchors)
2. Should the dotted background pattern be retained, replaced, or removed?
3. Should the gold accent be eliminated entirely, retained for specific surfaces, or retained as a deprecated/legacy token?
4. What is the exact blue HSL value? (Must be derived from the logo and stated as canonical.)
5. Should dark mode remain as a user-togglable theme, or be deprecated outright?
6. What is the canonical primary-CTA treatment (one variant, one size)?
7. What hover behavior is permitted on system cards?
8. Should the floating advisor be unified across homepage and system pages?
9. Should the green-ping status dots be retained, replaced with something operationally honest, or removed?
10. What is the maximum hero headline scale (current 8xl is recon-flagged as too large)?
11. Should the wordmark in the header be replaced with the actual logo mark?
12. What is the trust-signal architecture (logos, certifications, case studies, audit-deliverable evidence)?
13. Should the site introduce systems diagrams as visual assets, and if so where?

---

## 16. Files Inspected

- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `tailwind.config.ts`
- `src/components/header.tsx`
- `src/components/footer.tsx`
- `src/components/app-content.tsx`
- `src/components/sections/hero.tsx`
- `src/components/sections/failure-thesis.tsx`
- `src/components/sections/services.tsx`
- `src/components/sections/agent-advantage.tsx`
- `src/components/sections/industries.tsx`
- `src/components/sections/results.tsx`
- `src/components/sections/byte-of-the-week.tsx`
- `src/components/sections/faq.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/calendly-button.tsx`
- `src/components/ui/animated-grid-background.tsx`
- `src/components/ui/floating-ai-suggestor.tsx`
- `src/components/ui/service-suggester.tsx`
- `src/components/ui/favorite-agent-button.tsx`
- `public/raystrat-logo.png` (visual inspection)
- `specs/phases/phase-1.md` (positioning anchor)
- `ai/product-invariants.md`
- `ai/runtime-contracts.md`
- `ai/repo-index.md`
- `ai/engineering-journal.md` (recent entries)
