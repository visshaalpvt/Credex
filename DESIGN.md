---
name: Cinematic AI Financial Intelligence
colors:
  surface: '#141218'
  surface-dim: '#141218'
  surface-bright: '#3b383e'
  surface-container-lowest: '#0f0d13'
  surface-container-low: '#1d1b20'
  surface-container: '#211f24'
  surface-container-high: '#2b292f'
  surface-container-highest: '#36343a'
  on-surface: '#e6e0e9'
  on-surface-variant: '#cbc4d2'
  inverse-surface: '#e6e0e9'
  inverse-on-surface: '#322f35'
  outline: '#948e9c'
  outline-variant: '#494551'
  surface-tint: '#cfbcff'
  primary: '#cfbcff'
  on-primary: '#381e72'
  primary-container: '#6750a4'
  on-primary-container: '#e0d2ff'
  inverse-primary: '#6750a4'
  secondary: '#cdc0e9'
  on-secondary: '#342b4b'
  secondary-container: '#4d4465'
  on-secondary-container: '#bfb2da'
  tertiary: '#e7c365'
  on-tertiary: '#3e2e00'
  tertiary-container: '#c9a74d'
  on-tertiary-container: '#503d00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#cfbcff'
  on-primary-fixed: '#22005d'
  on-primary-fixed-variant: '#4f378a'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#cdc0e9'
  on-secondary-fixed: '#1f1635'
  on-secondary-fixed-variant: '#4b4263'
  tertiary-fixed: '#ffdf93'
  tertiary-fixed-dim: '#e7c365'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#141218'
  on-background: '#e6e0e9'
  surface-variant: '#36343a'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-md:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 2rem
  gutter: 1.5rem
  section-gap: 4rem
  breakpoint-md: 768px
  breakpoint-lg: 1280px
---

## Brand & Style

This design system is engineered to evoke a sense of high-stakes precision and futuristic intelligence. It positions the user as a mission commander at the helm of a sophisticated financial engine. The brand personality is authoritative yet ethereal, blending the vastness of deep space with the intricate logic of neural networks.

The visual style is a hybrid of **Glassmorphism** and **High-Contrast Dark UI**. Key characteristics include:
- **Depth through Translucency:** Layered frosted glass panels that reveal subtle neural patterns in the background.
- **Luminance as Information:** Glowing neon accents are used to guide the eye toward critical financial insights and AI-driven signals.
- **Cinematic Texture:** A pervasive fine-grain noise overlay prevents "digital flatness," giving the interface a physical, filmic quality.
- **Motion-Driven Realism:** Light reflection sweeps across "holographic" surfaces, responding to user interaction or data refreshes.

## Colors

The palette is anchored in "Deep Space" (#050816), providing a vacuum-like contrast that makes data points pop with cinematic intensity.

- **Primary & Secondary Backgrounds:** Used to establish the "void" and the "structure" of the interface.
- **Accent Cyan (Glow):** Reserved for primary actions, active AI processing states, and high-priority financial data.
- **Accent Purple (Neural):** Represents the AI's "thought process"—used for insights, predictive modeling, and background neural patterns.
- **Semantic Colors:** Success Green and Alert Red are saturated and luminous, ensuring critical market shifts are immediately legible against the dark backdrop.

## Typography

Typography balances technical aggression with utilitarian clarity. 

**Space Grotesk** is used for all display and heading elements. Its geometric, slightly unconventional letterforms mirror the technical "futuristic" nature of the AI. High-level headers should utilize a subtle cyan outer glow text-shadow when used sparingly.

**Inter** handles all data-heavy and narrative content. Its neutral, high-readability profile is essential for complex financial figures and long-form AI reports. 

Use **Label-Caps** for metadata, axis labels on charts, and category tags to maintain the "instrument panel" aesthetic.

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop to mimic a localized terminal or dashboard, transitioning to a **Fluid Grid** on mobile.

- **Desktop (1280px+):** A 12-column grid with a 24px gutter. Content is housed in "modules" that feel like floating HUD elements.
- **Tablet (768px - 1279px):** An 8-column grid with 16px gutters. Panels stack vertically where necessary.
- **Mobile (Below 768px):** A 4-column grid. Glass containers extend to the screen edge with 16px internal padding to maximize screen real estate.

Spacing is based on a 4px baseline, but use larger "voids" (64px+) between major sections to maintain the cinematic, atmospheric feel.

## Elevation & Depth

Depth is not achieved through traditional shadows, but through **Backdrop Filtering** and **Luminous Layering**:

1.  **Level 0 (Floor):** Deep Space (#050816) with a fixed, low-opacity neural network SVG pattern and 5% cinematic grain overlay.
2.  **Level 1 (Sub-surface):** Secondary Background (#0B1120) for grouping related modules.
3.  **Level 2 (Active Panels):** Glassmorphism layers using `backdrop-filter: blur(12px)` and a 1px border gradient (from white/10% to white/0%).
4.  **Level 3 (Popovers/Modals):** High-blur glass with a "holographic sweep" animation—a diagonal white light pass that repeats every 5 seconds at low opacity.

Neon accents provide "functional elevation," where the brightest elements are perceived as being closest to the user.

## Shapes

The design system uses a **Soft (0.25rem)** roundedness approach. This keeps the UI feeling technical and "engineered" rather than friendly or bubbly.

- **Standard Elements:** 4px border radius (Inputs, Small Buttons).
- **Large Containers:** 8px border radius (Cards, Modals).
- **Interactive Triggers:** Harder edges convey precision; avoid pill-shapes except for status indicators (Chips).
- **Line Work:** Use ultra-thin (0.5px to 1px) strokes for borders and neural patterns to maintain a high-fidelity look.

## Components

### Buttons
- **Primary:** Background of Accent Cyan with a 10px outer glow. Text is black for maximum contrast.
- **Ghost:** Transparent background with a 1px Cyan border. On hover, the background fills with a 10% Cyan tint.

### Holographic Cards
Cards must feature a `linear-gradient` border and a subtle internal "noise" texture. The "Light Reflection Sweep" is a CSS animation applied to a pseudo-element (`::after`) that moves a 30-degree slanted white gradient across the card surface.

### Input Fields
Dark backgrounds (#050816) with a bottom-only 1px border in Purple. When focused, the border transitions to Cyan and glows.

### Data Visualization
Charts should use "Glow Lines"—1.5px strokes with a 4px blur shadow of the same color. Background grids should be faint (#FFFFFF at 5% opacity).

### AI Insight Chips
Small, pill-shaped indicators with a Purple background and a pulsing "heartbeat" animation to indicate real-time AI processing.

### Neural List Items
List items should be separated by horizontal lines that fade out at the edges (radial gradient strokes), mimicking a HUD display.