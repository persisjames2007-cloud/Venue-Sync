# Design System Strategy: The Intelligent Navigator

This document outlines the visual language and implementation guidelines for a high-tech event management and navigation platform. We are moving away from the "standard SaaS" aesthetic to create a signature, editorial experience that feels like a living, breathing command center.

## 1. Overview & Creative North Star: "The Digital Cartographer"

The Creative North Star for this design system is **The Digital Cartographer**. 

The UI must feel like a precision instrument—authoritative, real-time, and sophisticated. We achieve this by rejecting the "boxed" layout. Instead of rigid grids separated by lines, we utilize **Tonal Layering** and **Asymmetric Balance**. This system mimics a high-end physical map or a premium automotive heads-up display (HUD). Elements should appear to float at different altitudes of the Z-axis, with information density managed through deliberate white space and light-source simulation rather than structural borders.

## 2. Colors: Depth and Luminance

Our palette is anchored in deep cosmic blues (`#10141a`) to provide a "void" where vibrant data can shine.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. 
*   **Boundaries** must be defined solely through background color shifts. Use `surface-container-low` for large section backgrounds sitting on the primary `surface` (`#10141a`). 
*   **Containment** is achieved by nesting. A dashboard widget should be a `surface-container-high` card on a `surface-container-low` canvas.

### The "Glass & Gradient" Rule
To evoke a sense of "smart" technology, use Glassmorphism for mobile navigation overlays and floating map markers.
*   **Tokens:** Use `surface-variant` at 60% opacity with a `24px` backdrop-blur.
*   **Gradients:** Primary actions (CTAs) should not be flat. Apply a subtle linear gradient from `primary` (`#b7c4ff`) to `primary_container` (`#0052ff`) at a 135-degree angle. This adds a "jewel" quality to touchpoints.

### Surface Hierarchy
*   **Base:** `surface` (#10141a) - The infinite background.
*   **Level 1:** `surface_container_low` (#181c22) - Sectioning for secondary data.
*   **Level 2:** `surface_container_high` (#262a31) - Interactive cards (Food stalls, event cards).
*   **Level 3:** `surface_bright` (#353940) - Active states or high-priority modals.

## 3. Typography: The Editorial Scale

We pair the technical precision of **Inter** with the architectural strength of **Manrope**.

*   **Display & Headlines (Manrope):** These are our "anchors." Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for hero event titles. The geometric nature of Manrope feels "engineered."
*   **Body & Labels (Inter):** Inter is used for all "live" data and navigation. It provides maximum legibility at small sizes (`body-sm`, `label-md`).
*   **Hierarchy Note:** To achieve the "Editorial" look, use high contrast in scale. Pair a massive `headline-lg` title next to a very small, all-caps `label-md` in `primary_fixed` color to create a sophisticated, intentional imbalance.

## 4. Elevation & Depth

We avoid traditional "shadow-heavy" UI. Depth is environmental.

*   **The Layering Principle:** Stack surfaces like sheets of glass. If a "Food Stall Card" sits on a "Venue Map," the card uses `surface_container_highest` to pop against the lower map base.
*   **Ambient Shadows:** For floating elements (e.g., a "Current Location" FAB), use a large, soft shadow: `0px 24px 48px rgba(0, 0, 0, 0.4)`. The shadow should feel like a soft glow of darkness, not a hard line.
*   **The "Ghost Border" Fallback:** If a divider is mandatory for accessibility, use `outline_variant` at **15% opacity**. It should be felt, not seen.
*   **Tonal Logic:** Always move from **Dark (Bottom)** to **Light (Top)**. As an element gets closer to the user, its background color becomes lighter (e.g., `surface_container_lowest` for the floor, `surface_bright` for the top-level interaction).

## 5. Components

### Cards (Food Stalls & Events)
*   **No Borders:** Use `surface_container_high`.
*   **Spacing:** Aggressive internal padding (minimum `1.5rem`).
*   **Interactions:** On hover/active, transition the background to `surface_bright` and scale the element by 1.02.
*   **Images:** Use `xl` (0.75rem) corner radius for a friendly yet technical feel.

### Status Badges & Chips
*   **Real-time Indicators:** For "Live" or "Open" status, use `tertiary` (#00e475) text on a `tertiary_container` background. 
*   **Shape:** Use the `full` (pill) roundedness.
*   **Animation:** Status indicators for "Live" events should have a 2px "pulse" animation using the `tertiary_fixed` token.

### Data Dashboards (Organizers)
*   **Density:** Use `body-sm` for table data to maximize information density.
*   **Separation:** Use `surface_container_low` bands to separate rows instead of divider lines.
*   **Visual Soul:** Sparklines and charts should use a gradient stroke from `primary` to `secondary`.

### Smart Maps
*   **Map Styling:** Use a custom dark-mode tile set that matches `#10141a`. 
*   **POIs:** Point-of-interest markers should use Glassmorphism—semi-transparent white outlines with a `primary` core.

## 6. Do's and Don'ts

### Do
*   **Do** use vertical white space (from 24px to 64px) to separate content blocks instead of lines.
*   **Do** use `on_surface_variant` for secondary text to maintain a soft visual hierarchy.
*   **Do** treat data as the hero. Use the `tertiary` (green) and `error` (red) sparingly to draw the eye to critical real-time changes.

### Don't
*   **Don't** use pure black (#000000) or pure white (#FFFFFF). Always use the provided surface and "on-surface" tokens.
*   **Don't** use standard "drop shadows" with 20%+ opacity. It breaks the "high-tech" glass aesthetic.
*   **Don't** use 1px dividers. If you feel the need for a line, try adding a 16px gap or a slight color shift instead.