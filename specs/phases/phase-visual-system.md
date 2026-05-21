Phase: phase-visual-system
Description: Frontend-only phase. Homepage visual redesign — no data model or API changes.
Layers: frontend, verification

# Phase Spec — Raystrat Visual System
## Capability: RAYSTRAT_VISUAL_SYSTEM_SPEC

**Status:** DRAFT — requires principal ratification before implementation
**Authored:** 2026-05-21
**Author:** Claude Opus 4.7 (recon-driven; directive from principal)
**Invariant class:** PERCEPTION-CRITICAL — no implementation without this spec ratified
**Recon source:** `ai/recon/raystrat-visual-system-spec-recon.md`
**Positioning anchor:** `specs/phases/phase-1.md` (locked)

This spec defines doctrine. It does not contain code. An implementation phase, governed by its own task graph, will produce code from this spec.

---

## 1. Strategic Intent

The Raystrat positioning is locked: operational systems engineering, governed execution infrastructure, business reliability architecture. Language, narrative arc, and engagement model are ratified.

The visual layer has not caught up.

The current site signals an AI-agency aesthetic — gold accent on pure black, pulsing widgets, dotted lattice background, oversized hero typography, ornamental card animations. The positioning says "operational systems engineering." The pixels say "AI automation vendor."

This spec closes that gap. Its job is to translate the operational-systems identity into a visual operating system that an enterprise buyer recognizes in the first 50 milliseconds and that a returning systems engineer trusts across every session.

The visual system is not decoration. It is part of the trust architecture. It is what makes "we install governed execution systems" believable before a single word is read.

This spec governs what gets visible. It does not touch what gets said.

---

## 2. Positioning Immutability Invariant

No visual decision in this spec may dilute:

- Operational systems framing
- Governed execution cognition
- Infrastructure seriousness
- Structured density
- Audit-first engagement model
- Enterprise trust
- LinkedIn first-glance readability
- Controlled competence as the dominant emotional signature

If any visual decision in this spec creates ambiguity against the above, the positioning wins. The pixels are subordinate to the position.

This invariant is checked at three places:
1. During spec ratification (principal review).
2. During implementation design review (before code is written).
3. During verification (`scripts/verification/` will include a visual-positioning gate).

---

## 3. Target Emotional Signature

The site must transmit **Controlled Competence**.

Decompose:

| Quality | What it means in pixels |
|---------|--------------------------|
| Calm under complexity | No competing visual signals. The eye finds one thing at a time. Density without noise. |
| Institutionally trustworthy | Surfaces look engineered. Borders are honest. Spacing is deliberate. Nothing improvised. |
| Operationally serious | The page reads like documentation, an audit report, or a control panel — not a pitch deck. |
| Engineered | Geometric forms. Predictable grid. Type respects vertical rhythm. Numbers feel deliberate. |
| Deliberate | Every element justifies its presence. Decorative elements are absent. |
| Clear | Content is the foreground. Surfaces are containers, not characters. |
| Composed | Whitespace is functional. Hierarchy is unambiguous. Rhythm holds across sections. |
| Reliable | Interactions do what they appear to do. No surprise motion. Hover states are honest. |

The site must not transmit:

- Excitement ("Look what AI can do!")
- Friendliness ("We're approachable!")
- Drama ("Watch this animation!")
- Cleverness ("Notice how the cards rotate!")
- Mystery ("Hover to see what happens!")
- Luxury ("Premium and exclusive!")

The site is the workshop where operational systems are engineered. It must look like the workshop.

---

## 4. Enterprise Perception Target

An enterprise founder, COO, CFO, or head of operations is the target. The visual system must transmit, within ~50ms of first impression and continuously across the session:

1. **"This company has built things."** Surfaces look maintained, not freshly minted. There is structural confidence everywhere.

2. **"They understand systems."** The visual layer itself reads as a system — token-driven, predictable, with rules visible to a trained eye.

3. **"They take ongoing responsibility."** Nothing in the visual layer signals "demo," "trial," or "vendor pitch." The audit-first engagement model is visually present.

4. **"This is not chatbot consultancy."** No AI-agency signifiers (pulses, sparkles, gradient meshes, neural-network graphics, glowing orbs).

5. **"I can read this."** Body copy is high-contrast, comfortable density, no scroll-jacking, no full-bleed video, no hero animation theatre.

6. **"This is not a startup pitch."** The hero is restrained. The CTA is singular. The footer is institutional, not playful.

7. **"My business has operational exposure I haven't addressed."** The visual layer reinforces the diagnostic frame — choke points, failure modes, governance gaps — rather than presenting Raystrat as a solution catalog.

The single emotional moment we are engineering for is the moment when the buyer registers, "This is the operational systems company I needed to find."

---

## 5. Brand Compatibility Analysis

Verified from `public/raystrat-logo.png`:

- The logo mark is composed of two solid wedge forms suggesting an "A" or peaked structure.
- Left wedge: solid black / graphite.
- Right wedge: structural mid-saturation blue. Reads as engineering blue, not navy. Closer to financial-tech blue than to consumer-app blue.
- Wordmark "RAYSTRAT" in black with "STRAT" emphasized in the same blue.
- Horizontal blue rule beneath wordmark.
- "SYSTEMS" subtitle in dark gray, sentence case.
- Logo native canvas: white.

Brand-derived constraints (binding):

| Constraint | Statement |
|------------|-----------|
| B1 | The accent color of the site must be the same blue as the logo (within perceptual tolerance, ΔE < 5). Gold is removed. |
| B2 | The default site canvas must be light. The logo was engineered for light. |
| B3 | If any surface is dark (header bar, hero anchor, footer, system-detail hero zones), an inverted logo treatment must exist; or the dark element must not display the logo mark. |
| B4 | The logo mark itself must appear on the site, not only the wordmark text. Brand recognition compounds across the visual system; using only typography weakens the brand. |
| B5 | Favicon, OG image, app icons, dashboard icon must all derive from the logo mark in its native blue. |
| B6 | Color reproduction must not drift. The blue is defined as a CSS variable at exactly the value derived from the logo; designers and engineers reference the variable, not a hex code. |

The implementation phase produces the exact HSL value via a color-matching step against the logo PNG. Pending that match, this spec uses an interim canonical value (see §6.3).

---

## 6. Color System Doctrine

### 6.1 Architecture

The color system has four classes:

1. **Canvas:** background colors of pages and sections. Light, near-neutral.
2. **Structure:** dark anchors that frame content (header, footer, hero anchor, certain card edges). Near-black, slight cool tint.
3. **Accent:** Raystrat blue. Used for semantic emphasis only — primary CTAs, active states, indicator marks, link affordance, focus rings.
4. **Neutral grayscale:** borders, dividers, muted text, surface tints. Cool-neutral gray ramp from white through near-black.

Color is functional. Decoration uses neutral grayscale or structure, not accent.

### 6.2 Tokens (target)

The implementation phase translates these into `:root` CSS variables. Token names map to the existing semantic tokens (`--background`, `--foreground`, `--card`, `--primary`, etc.) — only the values change.

| Token | Target value (HSL) | Role |
|-------|--------------------|------|
| `--background` | `0 0% 99%` | Page canvas. Near-white but not pure white, to soften glare. |
| `--foreground` | `220 15% 8%` | Body text. Near-black with slight cool tint to harmonize with blue accent. |
| `--card` | `0 0% 100%` | Card surface. Pure white. |
| `--card-foreground` | `220 15% 8%` | Card text. Matches foreground. |
| `--popover` | `0 0% 100%` | Popovers / dialogs. Pure white. |
| `--popover-foreground` | `220 15% 8%` | |
| `--primary` | `222 89% 55%` | **Raystrat blue (interim canonical). Final value derived from logo by implementation phase.** |
| `--primary-foreground` | `0 0% 100%` | White text on blue surfaces. |
| `--secondary` | `220 14% 96%` | Tertiary surfaces (subtle tinted backgrounds). |
| `--secondary-foreground` | `220 15% 8%` | |
| `--muted` | `220 14% 96%` | Muted surfaces. |
| `--muted-foreground` | `220 9% 46%` | Muted text (eyebrow labels, captions, secondary info). |
| `--accent` | `220 14% 96%` | Hover-fill surface. |
| `--accent-foreground` | `222 89% 55%` | Blue on accent surfaces (e.g., outline-hover link tone). |
| `--border` | `220 13% 91%` | Hairline borders. |
| `--input` | `220 13% 91%` | Input borders. |
| `--ring` | `222 89% 55%` | Focus ring. Matches primary. |
| `--structure` | `220 24% 12%` | **New token.** Dark structural anchors (header, footer, hero anchor, dark variant cards). |
| `--structure-foreground` | `0 0% 99%` | |

A "dark" theme is retained (see §7) but its values are subordinate to the light values above.

### 6.3 Blue derivation note

The interim HSL `222 89% 55%` approximates the logo blue from PNG inspection. The implementation phase must:

1. Sample the logo PNG at the exact pixel of the blue wedge.
2. Convert to HSL.
3. Update `--primary` to the sampled value.
4. Update the CalendlyButton URL `primary_color` parameter to the matching hex.
5. Update the favicon/OG image generation to use the matching hex.

Until this match step lands, the interim value is canonical.

### 6.4 Gold elimination

Gold is removed from the system. No surface retains gold. The deprecated token is deleted, not orphaned. The CalendlyButton URL parameter is updated. Documentation states gold was the prior accent and is not to be reintroduced.

### 6.5 Color usage rules

- **Primary blue** appears on no more than ~3% of any visible viewport. It is a surgical signal, not a fill color.
- **Structure dark** appears on architectural elements (header, footer, hero anchor, system-page hero blocks). It is never the page canvas.
- **Neutral grayscale** does the heavy lifting of borders, dividers, body text, and subtle surface variation.
- **Two-color rule:** every visible viewport has at most two non-neutral colors. Usually that means blue + a single restrained gray.
- No additional colors are introduced. No yellow, no green, no purple, no red except for `--destructive` (error states only).

### 6.6 Green-ping status dots

The decorative green-ping dots in the header, footer, and floating surfaces are removed. They signal status that does not exist. If a true status indicator is needed in the future (e.g., system health on the dashboard), it earns its own design specification.

---

## 7. Light/Dark Architecture Decision

### 7.1 Default

**Light-primary canvas is canonical.** The site renders light by default. The hardcoded `dark` class on `<html>` is removed during implementation. The `:root` CSS variables resolve to light values.

### 7.2 Dark anchors within light canvas

Specific surfaces within the light-canvas page may render dark using `--structure` tokens:

- Site header bar (when scrolled, the bar may shift to translucent dark structure or remain light — implementation phase decides via mockup review)
- Site footer bar
- Hero anchor band (an optional dark strip housing the headline; this is a design lever, not a requirement)
- System-detail page heroes (may carry a dark structure block for separation from the index page)
- Trust-signal strips (logo walls, certifications) — may use structure dark for contrast
- Dashboard surfaces (out of scope here; the dashboard is product, not marketing)

Dark anchors are surgical. They never occupy more than one or two zones per page. They are not used to introduce drama.

### 7.3 Dark mode (user toggle)

`ThemeToggle` is **retained but deprioritized**. It is functional for users who explicitly prefer dark. The default theme is light. The dark theme is not the canonical brand expression; it is an accommodation.

Constraints on the dark theme:
- Token values must satisfy WCAG AA contrast.
- Gold is not reintroduced. The dark theme uses the same Raystrat blue.
- The dotted pattern is not reintroduced in either theme.
- The dark theme is verified at the implementation phase but is not the surface that marketing materials, OG images, or the LinkedIn preview reference.

### 7.4 Reason

Operational systems buyers live in light-primary tools (Salesforce, Workday, NetSuite, SAP, Atlassian, Linear, Notion). Their visual baseline expectation is light. A dark marketing surface is a category-mismatch signal: it reads as consumer dev tool, not enterprise infrastructure.

Additionally, the logo is designed for light. Light is brand-derived.

The site is the workshop. The workshop has bright, even lighting. You can see what you are building.

---

## 8. Accent Philosophy

### 8.1 Accent role

The Raystrat blue is **semantic only**. It signals:

- The single primary action ("Book Operational Audit").
- Active navigation state.
- Focus ring on interactive elements.
- The accent character `.` at the end of section headlines (pre-existing pattern, retained).
- Eyebrow labels above section titles ("The Problem", "The First Move").
- Bullet markers (`Check` icon) in feature lists.
- Inline link text.
- The current state in stepped indicators (if any).

### 8.2 Accent never

The blue is never used for:

- Card backgrounds.
- Decorative gradients.
- Glow effects.
- Animation flourishes.
- Multi-element fills that compete for attention.
- Section dividers (those use neutral border tone).
- Body or paragraph text.

### 8.3 Saturation rule

The blue is **one tone**. The system does not ladder it into ten tints. Variations are produced by opacity (`/10`, `/20`) only on icon backgrounds and hover states, and only when contrast remains audit-grade.

---

## 9. Typography Doctrine

### 9.1 Families

- **Body:** Inter, weights 400 (regular) and 500 (medium). Loaded via `next/font/google`.
- **Headline:** Space Grotesk, weights 500 (medium) and 700 (bold). Loaded via `next/font/google`.
- **Numerals / monospace (limited):** A monospace family (e.g., JetBrains Mono or IBM Plex Mono) for use in system identifiers, audit-report numerals, version strings, and metadata captions. Single weight: 400.

No additional families are introduced. The 3-family ceiling is a hard rule.

### 9.2 Scale ladder

| Token | Size | Weight | Family | Usage |
|-------|------|--------|--------|-------|
| Display | `text-5xl md:text-6xl` (48px → 60px) | 700 | Headline | Hero H1 — exactly one per page |
| Title 1 | `text-3xl md:text-4xl` (30px → 36px) | 700 | Headline | Section H2s |
| Title 2 | `text-2xl` (24px) | 600 | Headline | Subsection H2s (within a section) |
| Title 3 | `text-xl` (20px) | 600 | Headline | Card titles, system titles in catalog |
| Lead | `text-lg md:text-xl` (18px → 20px) | 400 | Body | Hero subtitle, section lead paragraphs |
| Body | `text-base` (16px) | 400 | Body | Default paragraphs |
| Caption | `text-sm` (14px) | 400 | Body | Card descriptions, audit deliverable bullets, footer |
| Eyebrow | `text-xs` (12px) | 600, uppercase, tracking-widest | Headline | "The Problem", "The First Move", section labels |
| Numeric / mono | `text-sm` to `text-base` | 400 | Mono | Audit report numerals, system codes (e.g., `INV-001`, `B01`) |

The hero **does not** exceed `text-6xl` at the desktop breakpoint. The pre-existing `text-8xl` is too large; it signals exuberance, not authority.

### 9.3 Weight rules

- 400 (regular) is the default for body and lead.
- 500 / 600 is the working weight for emphasis and titles.
- 700 is reserved for the hero display and section H2s.
- 800 / 900 are not used.
- Italic is removed from production copy. (The current italic CardDescription in services is replaced with the standard subhead.)

### 9.4 Tracking and leading

- Headlines: `tracking-tight` to `tracking-tighter` only on display and title-1 (not on smaller sizes).
- Eyebrows: `tracking-widest uppercase`.
- Body: default tracking; line-height 1.6 (Tailwind `leading-relaxed`) on paragraphs over 3 lines.
- Tight leading (`leading-tight`) on hero display only.

### 9.5 Numeral treatment

Numbers in operational contexts — system codes, audit IDs, byte indices, statistics — use the monospace family. This signals operational specificity: it reads like a system identifier, not a marketing flourish.

### 9.6 Italic, all-caps, and underline rules

- Italic: removed from production use.
- All-caps: reserved for eyebrows. No all-caps headlines.
- Underline: only on inline links, on hover. Body underline is not used as emphasis.

---

## 10. Spacing and Density Doctrine

### 10.1 Density target

The site is **structured-dense**, not minimalist.

Minimalism in this context reads as "we have nothing concrete to say." Density signals "we have engineered specifics; here they are." The buyer should never feel the page has padded itself with whitespace to fill the screen.

Structured density means:
- Multiple content blocks per section.
- Tight cards with real content (not single-line teasers).
- Multi-column layouts where the content supports them.
- Visible hierarchy without large empty gaps.

### 10.2 Spacing scale

The site uses Tailwind's 4px-base scale. Doctrine commits to a restricted set:

- 4px (`space-1`) — micro spacing, icon-to-label.
- 8px (`space-2`) — tight component padding.
- 12px (`space-3`) — list-item separation.
- 16px (`space-4`) — paragraph margins.
- 24px (`space-6`) — card padding, sub-block separation.
- 32px (`space-8`) — block separation.
- 48px (`space-12`) — between section heading and content.
- 64px (`space-16`) — section vertical padding (mobile).
- 96px (`space-24`) — section vertical padding (desktop).

Spacings between these values (5, 7, 10, 14) are not used.

### 10.3 Section padding

`py-16 md:py-24 lg:py-32` is the canonical section padding. The current implementation already uses this; the inconsistencies (`py-16 md:py-24`, `py-20 md:py-32`) are eliminated.

### 10.4 Container widths

- Default container: `max-w-screen-xl` (1280px). Used for most sections.
- Narrow column: `max-w-3xl` (768px). Used for centered prose (Results audit copy, FAQ answers).
- Hero centered column: `max-w-4xl` for the subtitle paragraph. The H1 occupies the page-wide centered block.
- The `max-w-9xl` extreme is **removed**. There is no surface that requires it.

### 10.5 Whitespace philosophy

Whitespace separates content blocks but does not theatrically surround them. The site does not breathe; it works.

A useful test: if you delete the visible content and only the whitespace remains, the page should still feel like the structure is correct (because the spacing is functional, not ornamental).

---

## 11. Layout and Grid Doctrine

### 11.1 Grid

The site uses Tailwind's 12-column responsive grid, accessed via `grid grid-cols-*` utilities.

Canonical layouts:

| Pattern | Mobile | Tablet | Desktop | Use case |
|---------|--------|--------|---------|----------|
| Solo | `grid-cols-1` | `grid-cols-1` | `grid-cols-1` | Centered prose, hero, narrow content |
| Split | `grid-cols-1` | `grid-cols-1` | `grid-cols-2` | FailureThesis, ByteOfTheWeek |
| Triplet | `grid-cols-1` | `grid-cols-2` | `grid-cols-3` | Systems grid, Industries, Governance properties, Audit deliverables |
| Sextet | `grid-cols-1` | `grid-cols-2` | `grid-cols-3` | Governance grid (6 items, 2 rows) |

Asymmetric grids and non-symmetric content offsets are not used. The grid is honest.

### 11.2 Gutters

- Card grids: `gap-6 md:gap-8` (24px / 32px).
- Two-column splits: `gap-12 lg:gap-16` (48px / 64px) — more separation between content blocks than within them.
- Multi-column dense grids (governance): `gap-x-8 gap-y-10`.

### 11.3 Alignment

- Page-level: centered container, content flush-left within (except hero, which centers).
- Eyebrow labels: left-aligned within their column.
- Section H2s: left-aligned on most sections; centered only where the section is a single narrow column (Results, FAQ).
- Card content: left-aligned. No center-aligned card content.

### 11.4 Edge anchors

- The site has a hairline rule at the bottom of the header (visible on scroll).
- The footer has a hairline rule above it.
- Section transitions use vertical padding rhythm, not background color shifts as the only divider. (Background-shift sections are allowed but cannot be the sole transition signal.)

---

## 12. Section Rhythm Doctrine

### 12.1 Macro rhythm

Each section is a self-contained content unit with the structure:

```
[Eyebrow label]              ← optional; signals section role
[Section H2]                 ← always present
[Section lead paragraph]     ← optional; explains scope in one sentence
[Content block]              ← cards, prose, accordion, grid
[Footer prompt / link]       ← optional; the "what to do next" signal
```

The site reads as a sequence of named, self-explanatory sections. A user scrolling stops, reads the eyebrow + H2, and decides whether to dive in. The visual layer makes this scan-decide loop fast.

### 12.2 Background variation

Sections alternate canvas backgrounds to provide subtle rhythm without color noise:

- Canvas-light (default): pure `--background`.
- Canvas-tinted: `--secondary` (very subtle gray tint).
- Structure-dark: `--structure` (used for at most two sections per page; never adjacent).

The current `bg-card/50` pattern (50% opacity card color over the dotted pattern) is replaced. With the dotted pattern gone, tinted sections become solid `--secondary`.

### 12.3 Section-to-section transition

Between sections, the canvas color may shift (light → tinted → light → tinted) but the section padding (`py-24` desktop) keeps the rhythm regular. No section is shorter than the rhythm allows; no section runs over the rhythm without justification.

### 12.4 Hero is structurally different

The hero is anchored at the top of the page and uses a slightly different rhythm: it includes the full viewport-anchored layout but its padding tops at `py-20 md:py-28` rather than the section default. The hero is not a content section in the same sense; it is the entry.

---

## 13. Hero Perception Architecture

### 13.1 Goals

The hero must, within the user's first 50ms of viewing:

1. Establish the operational-systems frame.
2. State the diagnostic thesis ("Operational Breakdown / Is Preventable.").
3. Offer one action.
4. Avoid registering as an AI-startup pitch.

### 13.2 Composition

The hero has exactly these elements, in order:

1. **Eyebrow label** (optional, recon-flagged for inclusion): a small `text-xs` uppercase tracking-widest line, e.g., `OPERATIONAL SYSTEMS ENGINEERING`. This is the spec's recommendation; principal may opt to omit. If included, it sits 24-32px above the H1 and is rendered in `--muted-foreground` (not blue) to preserve blue scarcity.
2. **H1 (display, two lines):** "Operational Breakdown" / "Is Preventable." At `text-5xl md:text-6xl`. Tight leading. Headline font, weight 700. Foreground color (near-black on light canvas).
3. **Lead paragraph:** ~25-35 words. The current copy is appropriate. `text-lg md:text-xl`, body font, regular weight, `--muted-foreground` color.
4. **Primary CTA:** "Book Operational Audit" — a single primary-blue filled button at the canonical primary-CTA treatment (see §15). One CTA. No secondary "Learn more" link. No "See systems" link.

### 13.3 What the hero does not contain

- No background image.
- No animated background.
- No video.
- No gradient mesh.
- No animated headline (no DynamicHeadline, no typewriter effect).
- No stat strip beneath the H1 (those go in a dedicated trust strip).
- No "trusted by" logos in the hero (those go below the hero, see §21).

### 13.4 Vertical proportion

The hero is **not** full-viewport. The current `min-h-[calc(100vh-4rem)]` is replaced with a content-determined height with `py-20 md:py-28` padding. The buyer should see the FailureThesis section beginning to peek at the bottom of their first scroll-without-scrolling view. This signals "there is structured content below, scroll for it."

### 13.5 Alignment

The hero is centered (text-center). All other sections are left-aligned or follow their internal pattern. The hero's centered alignment marks it as the entry; subsequent sections shift to working-document left-alignment.

### 13.6 50ms perception spec

In the first 50ms the user must register:
- Words "Operational Breakdown" / "Preventable" — the diagnostic verb.
- One blue mark (the primary CTA).
- A clean light surface.
- A geometric mark (logo, top-left of header).

Anything else registering in 50ms is noise. The hero is engineered to limit registration.

---

## 14. Card and Surface Doctrine

### 14.1 Surface taxonomy

| Surface | Role | Visual signature |
|---------|------|------------------|
| Canvas | Page background | Light, near-white |
| Section-tinted | Alternating section background | `--secondary` very subtle gray |
| Structure | Dark anchors (header, footer, optional hero anchor) | Near-black, slight cool tint |
| Card | Discrete content unit | White, hairline border, no shadow |
| Card-hover | Card under cursor | Same surface, border shifts to `--primary` (subtle), no scale, no shadow glow |
| Audit-deliverable card | Nested card within Results section | Off-white or `--secondary`, hairline border |
| Trust-strip surface | Logo/cert strip background | `--structure` (optional) or `--secondary` |

### 14.2 Card defaults

Cards use:
- `bg-card` (pure white on light canvas).
- `border` (1px) using `--border` token.
- **No shadow** by default. The current `shadow-sm` baseline is removed. Shadows are decorative; borders are structural. The system uses structural separation, not shadow lifting.
- `rounded-md` (6px) for all standard cards. `rounded-lg` (8px) only for major containers (e.g., audit modal). `rounded-2xl` is **eliminated**.
- Padding: `p-6` (24px) as the default `CardContent` padding.

### 14.3 Card-hover

On hover, cards may indicate interactivity by:
- Border color shift: `--border` → `--primary` (a single, calm tonal change).
- **No** shadow lift. **No** glow. **No** background fill change. **No** icon animation.
- The cursor changes to pointer (already inherited).

Card hover signals "this is a destination," not "look at this animation."

### 14.4 Card content rules

- One title.
- One subhead (no duplicate italic subhead — the current Services card pattern is eliminated).
- Bulleted feature list with `Check` icon in primary blue (small, 16px).
- Optional trailing CTA-link: "View System →" in primary blue, weight 500, no underline by default, underline on hover.

### 14.5 Icon container pattern

When a card has a primary icon (Services, Industries, Governance properties), the icon sits in a small square with `bg-primary/10` (subtle blue tint) at `rounded-md`, sized `w-10 h-10` containing a `w-5 h-5` icon. No outer shadow. No animation.

### 14.6 Special surfaces

- **Audit deliverable cards** (within Results): small, hairline-bordered, no icon, white-on-canvas. Reads like an audit-report bullet.
- **Governance property tiles** (within AgentAdvantage): no card border at all — they sit directly on the section background with a `ArrowRight` micro-marker. The container that wraps them gets the border. This signals "these are properties of one architecture, not six separate things."

---

## 15. Button and CTA Doctrine

### 15.1 The single primary

The system has exactly **one** primary CTA: **"Book Operational Audit"**. It is the audit-first engagement model made visible. Every other action is secondary or tertiary.

Primary treatment (canonical):
- Variant: filled.
- Background: `--primary` (Raystrat blue).
- Text: `--primary-foreground` (white).
- Size: `lg` (44px height, 32px horizontal padding) by default.
- Weight: 500 (medium).
- Radius: `rounded-md`.
- No icon by default. If a chevron is needed for "next," it's `→` arrow, monospace, not a Lucide icon decoration.
- Hover: subtle darken (8-10% on the L channel) — not opacity change.
- Focus: ring with `--ring` (matches primary).
- Disabled: 40% opacity, no hover state.

### 15.2 Secondary

Secondary CTAs are outline:
- Background: transparent (canvas or card color).
- Border: 1px `--foreground` at 80% opacity (so it reads as near-black, not blue).
- Text: `--foreground`.
- Hover: background fills `--secondary` (subtle gray tint).
- Used for: "Explore All Bytes," "View System," "Login."

### 15.3 Tertiary

Tertiary CTAs are link-style:
- Color: `--primary` (blue).
- Underline on hover only.
- Used for: inline links within prose, "View System →" card footers, FAQ source links.

### 15.4 The destructive variant

`destructive` retained for error confirmations. Visually: red filled. Used in dashboard / admin contexts. Not on the marketing site.

### 15.5 Ghost and link variants

`ghost` and `link` are retained as primitives but used only by component-internal logic (dropdown menu items, mobile drawer auxiliary actions). They are not used as primary marketing CTAs.

### 15.6 Hero CTA

The Hero CTA uses the canonical primary treatment. The current Hero override (ghost + primary-color border + `bg-background`) is **eliminated**. The Hero CTA looks identical to the Results CTA. There is one "Book Operational Audit" visual signature across the site.

### 15.7 CalendlyButton

The CalendlyButton wrapper:
- Defaults to primary treatment.
- The Calendly URL parameter `primary_color` is updated to the matching Raystrat blue hex.
- Stylesheet/script loading is preserved.
- The component never silently downgrades to a different variant. If a non-primary use is needed, an explicit `variant` prop is passed.

### 15.8 Button density

A given page surface shows at most **one** primary CTA in view at a time. The hero shows one. The Results section shows one. The system index page shows one (audit CTA at bottom). The /systems/[slug] page sidebar shows one. If a page would show two primaries in view simultaneously, one is downgraded to secondary.

---

## 16. Navigation Doctrine

### 16.1 Header

- Fixed-top, full-width.
- Background: light canvas with hairline bottom border at all scroll positions (the current "transparent until scrolled → translucent" toggle is removed; the header is always present, always opaque).
- Height: `h-16` (64px) at all breakpoints.
- Left: logo mark + wordmark (the actual `raystrat-logo.png` mark, sized to height ~32px, plus the wordmark "Raystrat Systems" in headline-medium at 18px).
- Center (desktop): primary nav links — "Systems", "Bytes". Two links only. The site has two product surfaces beyond the homepage; the nav reflects that, no inflation.
- Right (desktop): one primary CTA "Book Operational Audit" (smaller size `sm`), and a Login icon.
- Right (mobile): hamburger that opens a Sheet drawer.
- The ThemeToggle is moved into a less-prominent location (footer or settings menu); the site's canonical surface is light, and the toggle should not be a top-bar feature.

### 16.2 Mobile drawer

- Opens from the right.
- Width: `sm:max-w-sm`.
- Background: `--background` (light).
- Contents (top to bottom):
  1. Navigation links (Systems, Bytes).
  2. Primary CTA: "Book Operational Audit" (full-width, primary).
  3. Secondary: "Download Playbook" (outline).
  4. Auth state: Login / Signup (if not authenticated) or user menu (if authenticated).
  5. Theme toggle (small, near the bottom).
- No animated decorations.

### 16.3 Active state

When on `/systems/*`, the "Systems" nav link is highlighted by a subtle bottom border in `--primary` and slight weight bump. When on `/bytes/*`, "Bytes" is highlighted analogously. The current site has no active-state indication; the implementation must add it.

### 16.4 Scroll behavior

- Header remains fixed and opaque.
- No hide-on-scroll behavior. The header is a structural element, always present.
- The current `bg-transparent → bg-background/80 backdrop-blur` transition is removed in favor of a single consistent state.

### 16.5 Logo behavior

The logo mark links to `/` on the marketing surface and to `/dashboard` on the app subdomain (existing behavior preserved). On click, no animation.

---

## 17. Floating Advisor Doctrine

### 17.1 Single visual signature

The site has **one** floating advisor visual identity. The two current components (ServiceSuggester on homepage; FloatingAiSuggestor on system pages) converge on the same visual language. Behavior may differ; pixels are unified.

### 17.2 Visual signature

The floating advisor is a **restrained pill**, not a glowing orb:
- Position: `fixed bottom-6 right-6` (preserved).
- Shape: `rounded-full` for the trigger; pill-shape with text label when visible.
- Background: light canvas with subtle `--border` and slight elevation (a 1-2px shadow on the bottom edge only — not a glow).
- Text: `--foreground`, weight 500, `text-sm`.
- Icon: a small geometric mark (a stylized chevron or simple operational glyph). **Not** Sparkles. **Not** a brain icon. **Not** an AI cliché.
- Hover: border darkens, no scale, no rotation, no pulse.

### 17.3 No pulse, no ping

The `animate-pulse` on the FloatingAiSuggestor is removed. The `animate-ping` on the green status dots is removed. The trigger is silent until interacted with.

### 17.4 Auto-open behavior

The ServiceSuggester auto-opens after 30s. **This is eliminated.** Auto-opening overrides user intent. The advisor opens when invoked. Period.

### 17.5 Tooltip behavior

The FloatingAiSuggestor tooltip auto-appears 1.5s after page load. **This is eliminated.** The tooltip appears only on hover.

### 17.6 Label

The visible label on the homepage variant: "Diagnose a Breakdown" (the current spec, already aligned). On system pages, no label — only the icon — because the advisor is contextual and clicking opens the sheet directly.

### 17.7 The advisor is functional

The advisor's job is to route a user with an operational concern to the right system page or to surface the right reading. It is not a chatbot. It is not an "ask me anything" feature. It is a triage tool with a known finite output space.

The label, the icon, and the surface treatment must all signal "triage tool," not "chat."

---

## 18. Motion and Micro-interaction Doctrine

### 18.1 Motion is purposeful

Motion in the system signals **state change**, **interaction confirmation**, or **navigation**. It does not exist for delight, demonstration, or ambiance.

### 18.2 Permitted motion

| Motion | When | Duration |
|--------|------|----------|
| Color/border transition on hover | Hover state on interactive elements | 150ms ease-out |
| Modal / Sheet open / close | Modal triggered | 200ms ease-out |
| Accordion expand / collapse | FAQ accordion interaction | 200ms ease-out |
| Focus ring appearance | Tab key focus | 100ms (existing Tailwind) |
| Page transition | Route change | None (instant) |
| Skeleton loading | Async data load | Standard skeleton shimmer |
| Form submission state | Pending / success / error | Inline only, no global motion |

### 18.3 Forbidden motion

- Pulsing buttons or icons.
- Ping animations on decorative dots.
- Card hover scale, rotate, lift, glow.
- Animated gradient backgrounds.
- Moving grid backgrounds.
- Animated headlines (DynamicHeadline, typewriter, blur-fade).
- Scroll-jacking, scroll-triggered reveals, scroll-locked sections.
- Parallax.
- Marquees (the existing one in `marquee.tsx` is dead code; it stays dead).
- Loading spinners that double as decoration.
- "Bounce" or "shake" attention-grabbing effects.

### 18.4 Micro-interaction precision

When a user hovers a button, the visual response happens in under 150ms. When a user clicks a primary CTA, the modal opens immediately (no faux loading state). When a user submits a form, the button transitions to a pending state with a small inline spinner — no overlay, no toast unless an error occurs.

### 18.5 Animated grid background removal

The `AnimatedGridBackground` component is **deprecated**. The ByteOfTheWeek tile uses a static graphic or a clean numeric mark. The animation does not survive.

### 18.6 Reduced motion

The site respects `prefers-reduced-motion: reduce`. All transitions reduce to instant under this preference. This is checked in implementation.

---

## 19. Visual Hierarchy Rules

### 19.1 The hierarchy ladder

From most prominent to least:

1. Hero H1.
2. Section H2s.
3. Primary CTA (Book Operational Audit).
4. Subsection H2s and card titles.
5. Lead paragraphs.
6. Body paragraphs.
7. Bullets and feature lists.
8. Eyebrow labels.
9. Captions, footnotes, deliverable subtext.
10. Footer text.

### 19.2 Rules of competition

- A given viewport has **one** element competing for primary attention. The hero gives that role to the H1. Each section gives it to the H2. The Results section gives it to the primary CTA.
- Two elements never tie for hierarchy in the same viewport. If two CTAs sit side-by-side, one is primary and one is secondary. If two headlines exist, one is larger and one is the eyebrow.
- Blue and structure-dark are the only colors permitted to claim hierarchy via color. Everything else is hierarchy by size, weight, and position.

### 19.3 White space as a hierarchy tool

The space between a section H2 and the content beneath it is larger than the space between the content blocks within the section. The space between sections is larger than the space between H2 and content. This produces visible nesting without color or border noise.

### 19.4 Number of focal points per page

The homepage has approximately 8 sections. Each section has 1-2 focal points. The total page has ~10 focal points the user encounters in scroll order. The system never produces more than 2 simultaneously visible focal points.

---

## 20. Cognitive Fluency Rules

### 20.1 The fluency principle

The user must understand what they are looking at without rereading. The cognitive cost of comprehension must be minimized so the cognitive cost of decision-making is maximized (which is what we want — they should be deciding whether to book the audit, not deciphering the page).

### 20.2 Rules

- **No unfamiliar terms unintroduced.** Every operational term (choke point, governance layer, audit deliverable) appears either in a context that defines it or is established in an earlier section. No jargon without scaffolding.
- **Predictable patterns.** Cards look the same across sections. Eyebrows look the same. Section H2s use the same scale. Once a user understands one section, they understand all sections.
- **One affordance per element.** A card that links also has an explicit "View System →" link affordance. A button looks like a button. A link looks like a link. No "is this clickable?" moments.
- **Read order matches scan order.** Top-to-bottom, left-to-right. No content discovered only by hover. No content hidden behind tabs without a strong reason.
- **Conform to platform expectations.** B2B buyers expect a top navigation bar, a centered hero, alternating section backgrounds, a footer with brand. The visual system uses these because they are zero-cost cognitively — not because they are creative.

### 20.3 Halo effect engineering

A B2B buyer who reads the hero in 50ms forms an initial impression that colors the next 5 minutes. The halo principle says: anything in the first impression amplifies (positively or negatively) what comes after. Therefore the first impression must be flawless. The visual system invests its highest design effort into the hero, the header, and the first scroll viewport. Subsequent sections trade on the goodwill earned.

### 20.4 50ms target details

The hero in the first 50ms must transmit:
- One legible diagnostic phrase ("Operational Breakdown" / "Is Preventable").
- One mark of the brand (logo top-left).
- One blue mark (the CTA).
- A clean light surface with structural anchors.

Anything else transmitted in 50ms is noise. The system limits the number of register-able items.

---

## 21. Trust Signal Design Rules

### 21.1 Trust signals the site uses

| Signal | Where | Visual treatment |
|--------|-------|-------------------|
| Audit-first engagement | Hero CTA + Results CTA + Floating advisor | "Book Operational Audit" is the most visible action; "The audit is the first engagement. Not a demo. Not a trial." appears as a calm muted sentence beneath the Results CTA |
| Specific industry serving | Industries section | Three named verticals (Fintech, Legal, Healthcare) with governed-workflow specifics, not generic "we serve all industries" |
| Governance properties | AgentAdvantage / "Governance by Design" | Named, specific properties (Audit Trail Architecture, SLA Enforcement, etc.) |
| Operational vocabulary | Throughout copy | Real terms (escalation, SLA, audit trail, continuity) |
| Structural diagnosis frame | FailureThesis | Naming the five choke points and the structural failure mode |
| Founder-led seriousness | Footer / About surfaces | Real founder name / short founder note when added |
| Brand consistency | Logo, blue, type system | The site looks like a single intelligence; trust compounds from consistency |

### 21.2 Trust signals the site does NOT use (and why)

- **Stock photos of professionals.** They read as generic agency. Not used.
- **"As featured in" press logos** without real placements. Empty trust signal. Not used.
- **Customer logo walls without permission.** Risk and noise. Used only with named, permitted partners.
- **Generic certification badges** (PCI, GDPR badges) on the homepage. These belong on a dedicated security/trust page, not the marketing surface. Used only if Raystrat actually holds the certification.
- **Animated counters** ("10,000+ companies served"). Smell test failure. Not used.
- **Testimonials in carousel form.** Carousels reduce attention. Use 1-2 fixed quotes max, displayed statically, attributed to named people at named companies, with role.

### 21.3 The hero trust strip (recommended for implementation phase)

Beneath the hero, before FailureThesis, an optional one-row "trust strip" can be added. It contains:
- 1 line of eyebrow text: `TRUSTED OPERATIONAL GOVERNANCE FOR`
- A row of 4-6 client logos (grayscale, sized consistently)

This is **conditional on having real, permission-cleared client logos.** Until then, the strip does not exist. Empty placeholders are not used.

### 21.4 The "system identifier" trust pattern

The visual system uses operational-style identifiers (e.g., `INV-001`, `B01`, `SYS-` prefixes) sparingly to signal "we are running a system." These are not decorative. They appear:
- On Byte titles (`Byte-01`).
- On Invariant docs (already present in the engineering OS).
- Optionally on system pages as a small subtitle (e.g., `SYS-01 / Demand Acquisition`).

The implementation phase decides whether the SYS- prefix is added.

---

## 22. Systems Diagram / Visual Asset Doctrine

### 22.1 The visual asset library

The site uses **one** kind of bespoke visual: the operational system diagram. It is the visual equivalent of the audit deliverable.

### 22.2 What an operational system diagram looks like

- Black-and-blue line art on light canvas.
- Geometric: rectangles, hexagons, arrows, dashed boundaries.
- Labeled: every node has a short text label in headline font.
- Minimal: no color beyond brand blue + neutral grayscale. No icons that are not part of the diagram's content.
- Schematic: it reads like a network diagram, a process flow, or a system architecture diagram. Not a metaphor.

### 22.3 Where diagrams appear

- Optionally in the Hero (a small subtle "system" mark as a visual signature).
- On `/systems/[slug]` pages, beneath the system's introduction.
- On `/systems` index, optionally as a unifying diagram showing how the six systems compose.
- On the dashboard product surfaces (out of scope here).
- On Byte article hero areas (where the byte is operational systems content).

### 22.4 What the site does NOT use

- Stock photography.
- 3D renders.
- Glowing neural-network visuals.
- Particle effects.
- "Constellation" or "node-and-edge" decorative graphics with no labels.
- Isometric illustrations.
- Hand-drawn / sketchy illustrations.
- AI-generated photos.

### 22.5 Diagram production

Diagrams are produced as SVGs. They:
- Reference the same `--primary` and `--foreground` tokens (via CSS variables passed in or via `currentColor`).
- Have semantic markup (labels are real text, screen-reader accessible).
- Render at all breakpoints without rasterization.
- Are versioned with the spec.

The implementation phase commissions or builds 1-3 reference diagrams. They are not all built at once.

---

## 23. Mobile Perception Rules

### 23.1 Mobile is not "small desktop"

Mobile readers on operational systems content are typically:
- Executives reading on commute or in-between meetings.
- LinkedIn-clicked traffic where the buyer is browsing.
- Time-constrained.

The mobile surface must:
- Load fast.
- Show the hero diagnostic phrase within the first viewport.
- Have a single primary CTA prominent in the first viewport (or one tap away in a sticky CTA bar).
- Read comfortably in portrait.

### 23.2 Mobile-specific rules

- **Hero H1:** drops to `text-4xl` on mobile (currently `text-6xl`).
- **Sections:** retain the `py-16` mobile padding. Do not compress further.
- **Cards:** stack to single column. Card grid `grid-cols-1` on mobile, `grid-cols-2` on tablet (`md`), `grid-cols-3` on desktop (`lg`).
- **Floating advisor:** the floating trigger remains visible on mobile but at a smaller size (icon only, no text label).
- **Mobile drawer:** opens from the right; contains nav + CTA + login. No content hidden in subsequent collapsible groups unless the drawer is excessive.
- **Tap targets:** all interactive elements have a minimum 44x44px tap target. Buttons sized appropriately.
- **Hover behaviors don't apply.** Card hover effects degrade to "no change" on touch. There is no touch-and-hold "preview" pattern.
- **Sticky mobile CTA:** an optional sticky-footer mobile CTA bar with "Book Operational Audit" can be added if scroll engagement testing supports it. Default: no sticky bar (keep visual surface clean).

### 23.3 Mobile motion

Mobile motion is even more restrained than desktop. Hover-derived effects are removed. Tap-feedback uses the native browser tap highlight or a subtle border tone shift.

### 23.4 Mobile typography

- Eyebrow: `text-xs` (12px).
- H1: `text-4xl` (36px).
- H2: `text-2xl md:text-3xl` (24px → 30px).
- Lead: `text-base` (16px).
- Body: `text-base` (16px).
- Line length: typically 30-50 characters per line on mobile, which falls out of `max-w-screen-xl` natural column widths.

---

## 24. Accessibility and Readability Rules

### 24.1 WCAG conformance target

The site meets **WCAG 2.2 AA**. This is binding.

### 24.2 Contrast

| Pairing | Minimum contrast ratio | Spec target |
|---------|------------------------|-------------|
| Body text on canvas | 4.5:1 (AA normal) | Targets 7:1 (AAA) |
| Large text (≥18pt or ≥14pt bold) on canvas | 3:1 (AA large) | Targets 4.5:1 (AA normal) |
| Interactive element text | 4.5:1 | Targets 7:1 |
| Primary CTA (white on Raystrat blue) | Must clear 4.5:1 | The interim blue HSL `222 89% 55%` achieves ~5.6:1 against white text. Final logo-matched value is verified at implementation. |
| Hairline borders on light canvas | 3:1 is not required for non-text; verified visually | Border tone must remain visible without straining |
| Disabled element | 3:1 minimum if conveying state | Verified |

### 24.3 Focus indicators

- All interactive elements have a visible focus ring.
- Focus ring uses `--ring` (matching `--primary`).
- Focus ring width: `ring-2` (2px) with `ring-offset-2` (2px offset).
- Focus ring is not obscured by hover or pressed states. It composes additively.

### 24.4 Keyboard navigation

- All interactive elements reachable by Tab.
- Focus order matches visual order.
- The floating advisor trigger is in the tab order; opening it via keyboard works.
- Modals trap focus. Escape closes them.
- Mobile drawer trap focus when open.

### 24.5 Screen readers

- Every icon has an `aria-label` or `sr-only` label.
- Eyebrow labels are not announced as headings (use a `<p>` not an `<h*>`).
- Skip-to-content link in the header.
- All buttons have accessible names. CalendlyButton has "Book Operational Audit" or the children prop value.

### 24.6 Reading comfort

- Body line height ≥ 1.5 (Tailwind `leading-relaxed` ≈ 1.625, used on prose paragraphs).
- Body line length: 50-75 characters per line within the centered narrow-column sections.
- Background is never pure white (`#FFFFFF`); it is `0 0% 99%` (`#FCFCFC`) to soften glare.
- Body text is never pure black (`#000000`); it is `220 15% 8%` (`#11141A`) to harmonize with the blue accent.

### 24.7 Color independence

No information is conveyed by color alone. The primary CTA is recognizable by shape, position, and text — not only by being blue. The "current" state in stepped indicators is marked by both color and position.

### 24.8 Dynamic content

Loading states, form validation errors, and async updates are announced via ARIA live regions.

---

## 25. Performance and 50ms Halo Rules

### 25.1 The 50ms target

The halo effect operates on the very first impression. The first paint must deliver the engineered first impression. Therefore:

- **Largest Contentful Paint (LCP):** < 1.5s on desktop, < 2.5s on mobile.
- **First Contentful Paint (FCP):** < 0.8s on desktop, < 1.5s on mobile.
- **Cumulative Layout Shift (CLS):** < 0.02.
- **Total Blocking Time (TBT):** < 100ms.
- **Initial bundle (JS):** under 200KB gzipped for the marketing surface.

### 25.2 Implementation implications

- **Fonts:** Inter and Space Grotesk loaded via `next/font/google` (already configured). Use `display: swap` so the system font renders first and the web font swaps in without LCP impact.
- **Hero:** Static text, no images, no animation. First paint shows the H1 within the FCP target.
- **Logo:** Inline SVG preferred over PNG. The current PNG is 512x512px raster. Implementation phase produces an SVG version.
- **Code splitting:** marketing surfaces should not import dashboard / auth modules. The pre-existing `getAuthenticatedUser` import on `page.tsx` should be reviewed — its server-side execution does not affect bundle size, but the deeper firebase-admin import chain has the runtime crash issue documented separately.
- **Images:** All images served via `next/image` with width/height set. No CSS-only image sizing. No background images for content.
- **CSS:** Tailwind purges to under 30KB compiled. No unused tokens shipped.

### 25.3 No motion blocking paint

No animation runs during the first 200ms after FCP. The page renders, then becomes interactive. There is no "intro animation" that delays interaction.

### 25.4 Critical request chain

- HTML (no external blocking).
- Inline critical CSS or `next/font` CSS (minimal).
- Hero text content rendered on the server (it is server-rendered already).
- No external script blocks render. Calendly script loads after first paint via the existing `useEffect`.
- No third-party analytics scripts on the marketing surface unless explicitly approved (none currently observed).

---

## 26. Peak-End Experience Rules

### 26.1 Peak engineering

The peak-end rule: a user's recollection of an experience is dominated by the most intense moment (peak) and the final moment (end). The visual system engineers both.

### 26.2 The peak

The peak of the homepage experience is the **moment of self-recognition** — when the buyer reads "Operational Breakdown / Is Preventable" and the FailureThesis "Five Choke Points" and registers, "These are MY five functions, and they ARE failing."

The visual layer amplifies this peak by:
- Giving the FailureThesis its own section background tint (so it visually marks "this is the diagnostic moment").
- Using the 5-item ordered list with visible numbering, so the user can count.
- Using the right-column prose to confirm the structural framing ("Functions that depend on memory… will fail systematically as the business grows.").
- Placing the FailureThesis as section 2 — first content section after the hero — so the buyer hits the peak early.

### 26.3 The end

The end of the marketing experience is one of:
- The Results section CTA (audit booking).
- The FAQ section (final scroll).
- The Footer.

The visual system engineers the end by:
- Making the Results section the visual climax: bold "Book an Operational Audit" headline, primary CTA, and "The audit is the first engagement. Not a demo. Not a trial." as the closing line.
- Keeping the FAQ visually calm — no peak attempt. It is a service surface, not a sales surface.
- Keeping the footer institutional, brief, and uncluttered.

### 26.4 Other peak candidates

The /systems/[slug] page peak is the moment when the buyer reads the system's specific bullets and realizes "this is the system I need." Visual amplification: clean card layout, governance properties listed prominently, audit-relevant facts highlighted.

The /bytes/[slug] page peak is the moment of insight from the byte content. Visual amplification: prose typography optimized for reading, no sidebar competition, clean attribution at the bottom.

### 26.5 The "calm landing" rule

After a peak, the visual system de-amplifies for ~one section. The user needs to register the peak; subsequent content cannot also try to claim peak attention. After FailureThesis (peak), the Services section is structured-dense but visually calm (cards, list, no animation). After Results (peak), the ByteOfTheWeek and FAQ sections are calm.

---

## 27. Anti-Patterns / Forbidden Directions

The following are explicitly forbidden. Implementation that introduces any of these is non-compliant.

### 27.1 AI-agency anti-patterns

- ❌ Pulsing buttons, pulsing icons, pulsing dots.
- ❌ Sparkle icons, brain icons, magic-wand icons.
- ❌ Gradient mesh backgrounds.
- ❌ Neural-network or "constellation" decorative graphics.
- ❌ "AI-powered" labels or badges anywhere on visible surfaces.
- ❌ Glowing orbs, glow shadows, blue glow effects.
- ❌ Auto-opening chat / advisor surfaces.
- ❌ Chatbot tropes (talking-head avatars, message bubbles in trigger UI, "..." typing indicators in static UI).

### 27.2 Luxury / financial anti-patterns

- ❌ Gold accent.
- ❌ Serif headlines.
- ❌ Heavy use of italics.
- ❌ "Bespoke," "white-glove," "exclusive" copy treatment (visual is in scope here, but color/type/spacing decisions must not invite this framing).
- ❌ Dark-mode-with-gold combinations.

### 27.3 Cybersecurity-cosplay anti-patterns

- ❌ Pure-black backgrounds as primary canvas.
- ❌ Terminal-green text or accents.
- ❌ Monospace headlines.
- ❌ "Hacker" aesthetics.
- ❌ Fake terminal windows.

### 27.4 Generic-SaaS anti-patterns

- ❌ Soft pastel gradients.
- ❌ Friendly cartoon illustrations.
- ❌ Excessive whitespace with single-line content.
- ❌ Centered everything.
- ❌ Single 100vh hero with no content below in first scroll view.
- ❌ Multi-color brand palette (more than blue + neutral).
- ❌ Rounded-3xl + soft shadows + pastel buttons.

### 27.5 Enterprise-consulting anti-patterns

- ❌ Stock photos of professionals at conference tables.
- ❌ "Trusted by" walls populated with grey rectangles.
- ❌ Three-pillar value-prop sections that all say the same thing.
- ❌ "Our process" with five abstract numbered steps.
- ❌ Generic corporate blue with no specificity.

### 27.6 Visual-drama anti-patterns

- ❌ Scroll-jacking.
- ❌ Parallax.
- ❌ Animated reveal-on-scroll for entire sections.
- ❌ Cursor-following effects.
- ❌ Mouse-trail effects.
- ❌ Auto-playing videos in the hero.
- ❌ Full-bleed video backgrounds.
- ❌ Carousels for primary content.

### 27.7 Trendy-portfolio anti-patterns

- ❌ Hand-lettering or display-extreme typography.
- ❌ Asymmetric grids without functional reason.
- ❌ Brutalist treatments (hairline + raw text + no hierarchy).
- ❌ "Year in review" / scroll-stories on the marketing surface.

### 27.8 Decorative-color anti-patterns

- ❌ More than one accent color.
- ❌ Color-coded sections beyond the canvas / tinted / structure trio.
- ❌ Rainbow color encoding for any data display.
- ❌ Multi-color hover states.

### 27.9 Inconsistency anti-patterns

- ❌ Two visual treatments of the same CTA action.
- ❌ Two button radii in the same view.
- ❌ Two card radii in the same view.
- ❌ Two typography stacks.
- ❌ Two background color systems (current dark + new light cannot coexist; implementation transitions cleanly).

---

## 28. Current Site Replacement Map

This is the mapping from the current implementation to the target visual system. The implementation phase consumes this map.

### 28.1 Tokens

| Current | Target |
|---------|--------|
| `--background: 0 0% 0%` (black) | `--background: 0 0% 99%` (near-white) |
| `--foreground: 0 0% 100%` (white) | `--foreground: 220 15% 8%` (near-black, cool) |
| `--card: 0 0% 10%` (near-black) | `--card: 0 0% 100%` (white) |
| `--primary: 43 74% 49%` (gold) | `--primary: 222 89% 55%` (Raystrat blue interim) |
| `--ring: 43 74% 49%` (gold) | `--ring: 222 89% 55%` (Raystrat blue interim) |
| (no `--structure` token) | `--structure: 220 24% 12%` (dark anchor) |

### 28.2 Backgrounds and patterns

| Current | Target |
|---------|--------|
| Page wrapper: `bg-dotted-pattern bg-fixed` | Removed. Plain `bg-background`. |
| Section tinted: `bg-card/50` | `bg-secondary` (solid subtle gray) |
| Section solid: `bg-card text-card-foreground` (Results) | `bg-secondary` or `bg-structure` for occasional dark anchor |
| Hero: `bg-transparent` (showing dots) | `bg-background` (clean light) |
| Header scrolled: `bg-background/80 backdrop-blur-sm` | `bg-background` (opaque, always) |
| ByteOfTheWeek tile: `AnimatedGridBackground` | Static graphic or numeric mark |

### 28.3 Typography

| Current | Target |
|---------|--------|
| Hero H1: `text-6xl sm:text-7xl md:text-8xl` | `text-4xl md:text-5xl lg:text-6xl` |
| Italic CardDescription in services | Removed; standard subhead only |
| `tracking-tighter` on all section H2s | `tracking-tight` on section H2s; `tracking-tighter` reserved for display |
| `text-foreground/80` for body | Reviewed for contrast against light bg; retained where contrast still passes 4.5:1, else `text-foreground` or `text-muted-foreground` |

### 28.4 Cards

| Current | Target |
|---------|--------|
| `rounded-lg border bg-card shadow-sm` | `rounded-md border bg-card` (no shadow) |
| Service hover: border-primary + shadow-primary/20 + icon scale-110 rotate-6 | Border tone shift only; no scale, no rotate, no glow |
| Governance container: `rounded-2xl bg-background/50` | `rounded-md bg-background border` |
| Byte tile: `rounded-2xl` | `rounded-md` |
| Audit deliverables: `rounded-lg border bg-background/50` | `rounded-md border bg-card` |

### 28.5 Buttons

| Current | Target |
|---------|--------|
| Hero CTA: ghost + primary-border + bg-background | Canonical primary (filled blue, white text) |
| Results CTA: default (filled gold) | Canonical primary (filled Raystrat blue) |
| CalendlyButton URL param `primary_color=d4af37` | Match Raystrat blue hex |

### 28.6 Motion

| Current | Target |
|---------|--------|
| Green `animate-ping` dots (header, footer, suggesters) | Removed |
| FloatingAiSuggestor `animate-pulse` trigger | Removed |
| Service card icon `scale-110 -rotate-6` | Removed |
| AnimatedGridBackground (`animate-pulse-slower`, `move-background`) | Component removed |
| `animate-blur-fade-in` keyframe | Removed (dead code) |
| `animate-marquee` keyframe | Removed (associated component is dead code) |

### 28.7 Floating advisor

| Current | Target |
|---------|--------|
| ServiceSuggester: outline pill with green ping, auto-opens at 30s, label "Diagnose a Breakdown" | Outline pill (no ping), no auto-open, label retained |
| FloatingAiSuggestor: filled primary circle with `animate-pulse` + Sparkles icon | Same pill treatment as ServiceSuggester; icon swapped from Sparkles to neutral geometric mark |
| Tooltip auto-appearing 1.5s after load | Tooltip on hover only |

### 28.8 Navigation

| Current | Target |
|---------|--------|
| Header transparent → translucent on scroll | Always opaque, always present |
| Logo: wordmark text only | Logo mark (`raystrat-logo.png` SVGified) + wordmark |
| No active nav state | Active link gets `--primary` underline + weight-500 |
| ThemeToggle prominent in header | ThemeToggle moved to drawer / footer |
| Green status dots (header, footer) | Removed |

### 28.9 Hero structure

| Current | Target |
|---------|--------|
| `min-h-[calc(100vh-4rem)]` full viewport | Content-determined height with `py-20 md:py-28` |
| No eyebrow | Optional eyebrow above H1 (principal-decided) |
| Centered, no anchor | Centered, optional dark anchor band (principal-decided) |

### 28.10 ThemeToggle

| Current | Target |
|---------|--------|
| Hardcoded `<html className='dark'>` | Removed; ThemeProvider controls |
| Default `dark` theme | Default `light` theme |
| Toggle visible in header | Toggle in drawer footer or settings menu |

---

## 29. Implementation Phasing Recommendation

The implementation must not happen as one monolithic PR. It rolls out in three phases, each independently verifiable.

### 29.1 Phase A — Token Swap (low-risk foundation)

Scope:
1. Replace token values in `:root` block of `globals.css` with light-canvas + Raystrat blue values.
2. Remove hardcoded `className='dark'` from `<html>`.
3. Add `--structure` token.
4. Update CalendlyButton URL parameter `primary_color`.
5. Remove `bg-dotted-pattern bg-fixed` from page wrapper.
6. Sample the logo PNG and pin the final `--primary` HSL value.

Verifiable outcome: site renders light with blue accent. No section/component logic changes. The site looks 80% of the way to the target, with some residual issues (motion, hero scale, cards).

Risk: LOW. Tokens are semantic; propagation is automatic.

### 29.2 Phase B — Component Doctrine

Scope:
1. Hero: shrink H1 to canonical scale, remove `min-h` viewport, replace CTA variant.
2. Cards: remove shadows, remove hover scale/rotate, unify radii to `rounded-md`.
3. Services: remove italic CardDescription duplicate.
4. AgentAdvantage: remove `rounded-2xl` on container.
5. Floating advisors: remove pulse, remove auto-open, remove ping dots, swap Sparkles for geometric mark, unify visual treatment.
6. Header: always-opaque, add active-nav state, move ThemeToggle.
7. Footer: remove ping dots.
8. Remove `AnimatedGridBackground`; replace ByteOfTheWeek tile with static treatment.
9. Remove unused keyframes (`animate-blur-fade-in`, `animate-marquee`).

Verifiable outcome: site reads as the target visual system. Cognitive friction points are resolved.

Risk: MEDIUM. Touches many files but each change is localized. Tested per-component.

### 29.3 Phase C — Logo, Diagrams, Trust Assets

Scope:
1. Inline SVG logo derived from `raystrat-logo.png`.
2. Add logo mark to header alongside wordmark.
3. Produce 1-2 systems diagrams as SVG assets.
4. Update favicon/OG image to use Raystrat blue + logo mark.
5. Build trust strip component (conditional on having real client logos to populate).
6. Add active-nav-state styles to nav links.

Verifiable outcome: site has its brand identity fully expressed across logo, favicon, and OG.

Risk: LOW. Mostly additive.

### 29.4 Phase D — Dark mode reconciliation (deferred)

Scope:
1. Review dark-mode token values to match the new light-canvas doctrine (still blue accent, no gold).
2. Verify all components render correctly under `.dark` class.
3. Add reduced-motion media query handling.

Verifiable outcome: dark mode is a clean accommodation, not a contradiction of the brand.

Risk: LOW. Done after Phase A-C ship and stabilize.

### 29.5 Sequence dependencies

- Phase A must ship before Phase B (token foundation).
- Phase B must complete before Phase C (component doctrine before asset additions).
- Phase D can ship in parallel with Phase C or after, never before.

### 29.6 Reversibility

Each phase is independently reversible via git revert. The token swap (Phase A) is the most impactful change but the most reversible (one CSS file).

---

## 30. Verification Criteria

The implementation phase produces a verification script `scripts/verification/007-raystrat-visual-system.sh` (number to be confirmed; current latest is 006). This script enforces:

### 30.1 Token integrity

- `--background` is a light value (lightness ≥ 95%).
- `--foreground` is a dark value (lightness ≤ 15%).
- `--primary` HSL is within ΔE < 5 of the logo blue sample.
- No `--primary: 43 74% 49%` (gold) remains in any CSS file.

### 30.2 Pattern absence

- No `bg-dotted-pattern` references in source.
- No `animate-pulse` on UI triggers (allowed only on legitimate loading indicators).
- No `animate-ping` on decorative dots.
- No `scale-110` or `rotate-` on hover states.
- No `shadow-primary` glows.
- No `AnimatedGridBackground` imports.
- No `rounded-2xl` on cards or buttons.
- No `text-8xl` or `text-7xl` in source (the hero H1 must not exceed `text-6xl`).
- No `primary_color=d4af37` in any URL or string.

### 30.3 Component compliance

- Hero CTA and Results CTA use identical button variant + size.
- All cards use `rounded-md` (`rounded-lg` allowed only on major modal containers).
- ServiceSuggester and FloatingAiSuggestor share a visual primitive or matching styles.
- The header is always-opaque (no `bg-transparent` on header in source).

### 30.4 Accessibility

- Pa11y or axe-core run produces zero WCAG 2.2 AA violations on the homepage and on `/systems`.
- Contrast verified by automated tooling on text-on-canvas, text-on-card, text-on-structure.

### 30.5 Performance

- Lighthouse Performance score ≥ 95 on the homepage (production build, simulated 3G/CPU not used; testing is desktop).
- LCP under 1.5s.
- CLS under 0.02.

### 30.6 Brand consistency

- The site logo file (`raystrat-logo.svg` or generated SVG component) exists and is referenced in the header.
- Favicon resolves to the Raystrat blue.
- OG image references the same blue.

### 30.7 Smoke test

A manual smoke test runs the implementation against this checklist:

1. Open the homepage. Within 50ms of seeing it, the buyer recognizes: light canvas, near-black structural anchors, one blue mark, the diagnostic phrase.
2. Scroll. The FailureThesis appears with the five choke points; the visual layer signals "diagnostic moment."
3. Scroll. Systems grid loads; cards have hairline borders, no shadows, no glow on hover; only the border tone shifts.
4. Scroll. Governance properties section reads as one architecture, not six tiles.
5. Scroll. Industries section: three verticals, each with workflow-framed bullets, no AI cliché icons.
6. Scroll. Results audit CTA: bold headline, single primary blue CTA, "Not a demo. Not a trial." beneath.
7. Tab through the page. Focus ring appears in Raystrat blue. Order matches visual order.
8. Open the floating advisor. It is a calm pill, not a glowing orb. No pulse.
9. Test on mobile: hero compresses, navigation moves into drawer, primary CTA remains accessible.
10. Toggle to dark mode (if retained): site renders correctly, blue retained, no gold anywhere.

If any item in this smoke test fails, the implementation is non-compliant.

---

## 31. GO / NO-GO Conditions

This spec is **DRAFT** until principal ratification. The following conditions gate the transition to ratified and to implementation kickoff.

### 31.1 Spec ratification GO conditions

The spec is **GO** for ratification when:

1. ✅ Recon artifact (`ai/recon/raystrat-visual-system-spec-recon.md`) exists and has been reviewed.
2. ✅ This spec contains all 31 required sections.
3. ✅ Spec decisions are derivational (each traces back to positioning or brand mark).
4. ✅ Spec is decisional (no "consider" hedges in doctrine sections).
5. ✅ Anti-patterns are concrete enough to be verifiable.
6. ⏳ Principal reviews and accepts the strategic decisions in §6 (color), §7 (light/dark), §13 (hero), §15 (CTA), §17 (advisor), §22 (diagrams).
7. ⏳ Principal accepts the canonical blue HSL OR specifies a different value derived from the logo.
8. ⏳ Principal accepts the dark-mode-deprecation posture (kept as accommodation, not canonical).
9. ⏳ Principal accepts the hero scale reduction (8xl → 5xl/6xl).

### 31.2 Implementation kickoff GO conditions

Implementation kickoff is **GO** when:

1. Spec is ratified.
2. Implementation phase plan is generated (a new capability `RAYSTRAT_VISUAL_SYSTEM_IMPLEMENTATION_PHASE_A`).
3. A logo color sample has been taken and the canonical `--primary` value is pinned.
4. The pre-existing build crash (`buffer-equal-constant-time` Node v25) is resolved OR known to be irrelevant to this work (it is — the visual change is local to tokens and components and does not touch the firebase-admin chain).
5. A test environment exists where the implementation can be visually previewed before commit.

### 31.3 NO-GO conditions

This spec is **NO-GO** if any of:

1. ❌ Principal rejects light-primary canvas (would invalidate §7).
2. ❌ Principal retains gold accent (would invalidate §6, §8, §15).
3. ❌ Principal cannot decide on dark-mode posture by end of ratification.
4. ❌ The logo blue sample cannot be obtained (would prevent Phase A from completing).
5. ❌ A new positioning shift is introduced that contradicts the locked positioning in `specs/phases/phase-1.md` (would invalidate §2).

### 31.4 Unresolved questions requiring principal ratification

The following questions were left open in recon §15 and have spec recommendations. Principal must confirm or override:

| Question | Spec recommendation |
|----------|---------------------|
| Move from full dark to light-primary? | YES — light-primary with dark structural anchors. (§7) |
| Replace the dotted background pattern? | YES — remove entirely. No replacement pattern. (§6.1, §28.2) |
| Eliminate gold or retain? | ELIMINATE — no gold anywhere on the marketing surface. (§6.4) |
| Exact blue HSL? | Interim `222 89% 55%`; final pinned by logo sample at implementation kickoff. (§6.3) |
| Retain or deprecate dark mode? | RETAIN as user toggle, but light is canonical. (§7.3) |
| One canonical primary CTA treatment? | YES — filled Raystrat blue, white text, `lg` size, no icon. (§15.1) |
| Card hover behavior? | Border tone shift only. No scale, no rotate, no shadow glow. (§14.3) |
| Unify floating advisor visual? | YES — single restrained pill treatment. (§17.1) |
| Retain green-ping status dots? | REMOVE — they signal nothing real. (§6.6) |
| Maximum hero headline scale? | `text-6xl` at desktop; `text-4xl` at mobile. (§9.2, §13.2) |
| Replace wordmark in header with logo mark? | ADD logo mark alongside the wordmark, both present. (§16.1, §29.3) |
| Introduce systems diagrams? | YES — black-and-blue line art, SVG, brand-consistent. (§22) |

### 31.5 Stop condition for this capability

This capability (`RAYSTRAT_VISUAL_SYSTEM_SPEC`) **completes** when:

1. ✅ `ai/recon/raystrat-visual-system-spec-recon.md` exists.
2. ✅ `specs/phases/phase-visual-system.md` (this document) exists with all 31 sections.
3. ✅ No implementation has been performed.
4. ✅ No code/style files have been changed.
5. ✅ Spec status remains DRAFT until principal ratification.

A subsequent capability `RAYSTRAT_VISUAL_SYSTEM_IMPLEMENTATION_PHASE_A` will be authored after ratification. It will consume this spec and produce code.

---

## End of Spec

This document is doctrine. The implementation phase consumes it. The verification phase enforces it. The positioning phase (`phase-1.md`) anchors it.

Operational systems are governed by specifications. So is the surface that announces them.
