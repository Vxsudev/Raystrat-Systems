# Recon: Visual System Phase A — Token Swap
**Date:** 2026-05-21  
**Pass:** RAYSTRAT_VISUAL_SYSTEM_PHASE_A_TOKEN_SWAP  
**Status:** COMPLETE

---

## 1. Logo Sampling

**File:** `public/raystrat-logo.png` (512×512 px, white canvas)

**Findings:**
- Left wedge: pure black (#1a1a1a range)
- Right wedge / "STRAT" wordmark / horizontal rule: Raystrat blue
- Canvas: white — logo is light-canvas native

**Pixel scan results (62 pure blue samples):**

| Sample | RGB | HSL |
|--------|-----|-----|
| Representative A | RGB(0, 83, 199) | HSL(215, 100%, 39%) |
| Representative B | RGB(1, 85, 202) | HSL(215, 99%, 40%) |
| Representative C | RGB(0, 89, 205) | HSL(214, 100%, 40%) |
| **Canonical (avg)** | **RGB(4, 89, 202)** | **HSL(214, 98%, 40%)** |

**Canonical Raystrat Blue:**
- HSL: `214 98% 40%`
- Hex: `#0459ca`
- Character: mid-saturation corporate blue, financial-tech register, NOT navy, NOT electric

---

## 2. Token Replacement — `src/app/globals.css`

### Before (`:root` — pure black canvas, gold primary)
```css
--background: 0 0% 0%;      /* pure black */
--foreground: 0 0% 100%;    /* white */
--card: 0 0% 10%;
--primary: 43 74% 49%;      /* GOLD */
--ring: 43 74% 49%;         /* GOLD */
/* no --structure token */
```

### After (`:root` — light canvas, Raystrat blue primary)
```css
--background: 0 0% 99%;         /* near-white canvas */
--foreground: 220 15% 8%;       /* near-black text */
--card: 0 0% 100%;              /* pure white cards */
--primary: 214 98% 40%;         /* Raystrat blue (sampled) */
--ring: 214 98% 40%;            /* Raystrat blue */
--structure: 220 24% 12%;       /* dark anchors: header, footer, dark bands */
--structure-foreground: 0 0% 99%;  /* light text on structure */
```

### `.dark` token updates (gold → Raystrat blue)
- `--primary`: `43 74% 49%` → `214 90% 58%` (lighter blue for dark bg legibility)
- `--accent-foreground`: `43 74% 49%` → `214 90% 68%`
- `--ring`: `43 74% 49%` → `214 90% 58%`
- Added `--structure: 220 24% 8%`, `--structure-foreground: 0 0% 95%`
- Background shifted from pure black to dark navy: `220 24% 5%`

---

## 3. Layout Changes — `src/app/layout.tsx`

| Change | Before | After |
|--------|--------|-------|
| `<html>` className | `className='dark'` | (removed) |
| ThemeProvider defaultTheme | `"dark"` | `"light"` |

**Effect:** Site boots as light-primary canvas. User can toggle to dark via ThemeToggle.

---

## 4. Page Wrapper — `src/app/page.tsx`

| Change | Before | After |
|--------|--------|-------|
| Outer wrapper div | `<div className="bg-dotted-pattern bg-fixed">` | `<div>` |

**Removed:** `bg-dotted-pattern bg-fixed` — the full-bleed radial dotted lattice overlay.  
**Rationale:** Dotted pattern is a dark-canvas texture; incompatible with light background and adds visual noise.

---

## 5. CalendlyButton — `src/components/ui/calendly-button.tsx`

| Change | Before | After |
|--------|--------|-------|
| `primary_color` param | `d4af37` (gold) | `0459ca` (Raystrat blue) |

**Effect:** Calendly popup widget uses Raystrat blue accent instead of gold.

---

## 6. Scope Compliance

**Phase A ONLY — verified not mutated:**
- Hero scale: unchanged
- Card styles: unchanged
- Hover states: unchanged
- Motion/animations: unchanged
- FloatingAdvisor: unchanged
- Header structure: unchanged
- ThemeToggle position: unchanged
- Content/copy: unchanged
- Systems routes: unchanged
- Positioning language: unchanged

**Invariants maintained:**
- INV-001: Marketing domain isolation — no changes to routing logic
- INV-002: No client-side secrets exposed
- INV-003: Genkit server boundary — no server-side code touched

---

## 7. Files Modified

| File | Change |
|------|--------|
| `src/app/globals.css` | Token swap: `:root`, `.light`, `.dark` — light canvas + Raystrat blue |
| `src/app/layout.tsx` | Remove `className='dark'`; `defaultTheme="dark"` → `"light"` |
| `src/app/page.tsx` | Remove `bg-dotted-pattern bg-fixed` from outer wrapper |
| `src/components/ui/calendly-button.tsx` | `primary_color=d4af37` → `primary_color=0459ca` |

---

## 8. Verification

Run: `bash scripts/verification/007-raystrat-visual-system-phase-a.sh`

All 11 checks should pass.
