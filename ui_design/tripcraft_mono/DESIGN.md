---
name: TripCraft Mono
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4c4546'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e1dfdf'
  on-secondary-container: '#626262'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1c'
  on-tertiary-container: '#838484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e4e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e3e2e2'
  tertiary-fixed-dim: '#c7c6c6'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#464747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  border-subtle: '#EBEBEB'
  border-muted: '#D1D1D1'
  text-main: '#1A1A1A'
  text-secondary: '#5F5E5B'
  bg-canvas: '#FFFFFF'
  status-success: '#1976D2'
  hover-fill: '#EFEFEF'
typography:
  display:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  code:
    fontFamily: Courier Prime
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  gap-xs: 4px
  gap-sm: 8px
  gap-md: 16px
  gap-lg: 24px
  margin-page: 48px
  margin-mobile: 16px
  max-width-content: 900px
---

## Brand & Style

The design system is a **Minimalist Productivity** framework, heavily inspired by the utilitarian elegance of Notion and high-end engineering tools. It prioritizes content clarity and spatial logic over decorative elements, creating a "blank canvas" feel that allows complex travel itineraries to feel manageable and light.

The target audience is the organized traveler—someone who values efficiency, precision, and a professional-grade interface. The UI should evoke a sense of **calm control** and **sophisticated utility**.

### Design Principles:
- **Strict Monochromatism:** Using a strictly white background (`#FFFFFF`) with a palette of refined grays to establish hierarchy.
- **High-Quality Whitespace:** Generous margins and structural padding to prevent data density from becoming overwhelming.
- **Functional Precision:** Hairline borders (0.5px to 1px) and subtle hover states replace heavy shadows or vibrant colors.
- **Information Architecture First:** Content is organized through typographic scale and indentation rather than containers and cards.

## Colors

The color strategy is **strictly monochromatic**. Chromatic color is intentionally absent, reserved only for functional status indicators (like a destination pin or a success state) or user-generated content (companion avatars).

- **Background:** Always `#FFFFFF`. Avoid off-whites for the main canvas to maintain a "paper" feel.
- **Grays:** Used systematically for depth. `#F7F7F7` is used for sidebars or subtle "callout" sections.
- **Borders:** Use `#EBEBEB` for standard separators. This creates a structure that is felt rather than seen.
- **Typography:** Use `#1A1A1A` for primary legibility and `#5F5E5B` for secondary metadata or descriptions.

## Typography

The system uses **Inter** for all UI elements to ensure a neutral, systematic appearance. It relies on weight and size transitions rather than font switching to establish hierarchy.

### Rules:
- **Optical Sizing:** Large headlines use tighter letter spacing (-0.01em to -0.02em) to feel cohesive.
- **Line Height:** Maintain generous line heights (1.5x) for body text to support long-form travel notes.
- **Labeling:** Use medium weights for labels and small buttons to maintain legibility against the white background.
- **Fallback:** In specific technical contexts (like budget math or coordinates), a monospaced font like **Courier Prime** can be used sparingly for a "logbook" aesthetic.

## Layout & Spacing

This design system utilizes a **Fixed-Fluid Hybrid** model. For complex editing (the itinerary builder), the content is centered with a max-width of 900px to maintain readability.

### Layout Model:
- **Grid:** A 12-column grid is used for high-level page structure, but internal components (like the budget list) use a flexible flexbox/stack approach.
- **Rhythm:** An 8px linear scale (4, 8, 16, 24, 32, 48, 64) is the primary spacing unit.
- **Mobile Adaptation:** On mobile, page margins shrink to 16px. Vertical stacks are preferred over horizontal grids. The sidebar transforms into a bottom-sheet or a full-screen overlay to maximize the workspace.

## Elevation & Depth

To maintain a minimalist aesthetic, avoid traditional drop shadows. Depth is achieved through **Tonal Layers** and **Subtle Outlines**.

- **Level 0 (Canvas):** Pure `#FFFFFF`.
- **Level 1 (Hover/Secondary):** Surfaces like hover-states for list items use `#F7F7F7`.
- **Level 2 (Modals/Popovers):** Use a 1px solid border of `#EBEBEB` and a very diffused, low-opacity shadow (e.g., `0 4px 12px rgba(0,0,0,0.05)`).
- **Interactive States:** Instead of elevation, use subtle shifts in background color (from White to `#EFEFEF`) to indicate interactivity.

## Shapes

The shape language is **Soft yet Structured**. It uses small corner radii to feel modern and approachable without losing its "professional tool" edge.

- **Standard Elements:** (Inputs, Buttons, Cards) Use a `0.25rem` (4px) radius.
- **Large Containers:** Use `0.5rem` (8px) radius for modals or large grouped sections.
- **Interactive Feedback:** Hover states on list items should have the same `0.25rem` radius to feel cohesive.

## Components

### Buttons
- **Primary:** Black background with white text. No border.
- **Secondary:** White background with a `#D1D1D1` border and black text.
- **Ghost:** No background or border. Text color is `#5F5E5B`. Turns `#F7F7F7` on hover.

### Input Fields
- **Default:** A simple 1px border (`#EBEBEB`). On focus, the border turns black (`#000000`). No "glow" or shadow.
- **Inline:** For titles, inputs should have no border by default, appearing as static text until hovered or focused.

### Cards & Lists
- **Itinerary Items:** Should not be in heavy boxes. Use a vertical line on the left (2px width, `#EBEBEB`) to indicate a sequence of checkpoints. 
- **Checkboxes:** Small, square with a 2px radius. When checked, use a black fill with a white checkmark.

### Chips/Badges
- Use a light gray background (`#F1F1F1`) and small text (`label-md`). These are used for categories like "Stay," "Food," or "Transport" in the budget view.

### Navigation
- **Sidebar:** A consistent `#F7F7F7` background on the left with a thin vertical border on the right. Links use `#5F5E5B` text and turn black on active/hover states.