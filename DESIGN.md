---
name: Alpine Expedition
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#42474f'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#727780'
  outline-variant: '#c2c7d1'
  surface-tint: '#2d6197'
  primary: '#00355f'
  on-primary: '#ffffff'
  primary-container: '#0f4c81'
  on-primary-container: '#8ebdf9'
  inverse-primary: '#a0c9ff'
  secondary: '#2c694e'
  on-secondary: '#ffffff'
  secondary-container: '#aeeecb'
  on-secondary-container: '#316e52'
  tertiary: '#592300'
  on-tertiary: '#ffffff'
  tertiary-container: '#7d3400'
  on-tertiary-container: '#ffa372'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e4ff'
  primary-fixed-dim: '#a0c9ff'
  on-primary-fixed: '#001c37'
  on-primary-fixed-variant: '#07497d'
  secondary-fixed: '#b1f0ce'
  secondary-fixed-dim: '#95d4b3'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#0e5138'
  tertiary-fixed: '#ffdbca'
  tertiary-fixed-dim: '#ffb690'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#783200'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
  everest-white: '#F8FAFC'
  himalayan-blue: '#0F4C81'
  forest-green: '#2D6A4F'
  sunset-orange: '#F97316'
  sky-tint: '#E2E8F0'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

This design system is built for a premium car rental platform that bridges the gap between rugged Himalayan adventure and world-class hospitality. The aesthetic follows a **Modern SaaS** approach, characterized by high-clarity layouts, generous whitespace, and sophisticated interactive elements reminiscent of top-tier travel platforms like Airbnb.

The visual style leverages **Glassmorphism** for navigational overlays and floating cards to maintain a connection with breathtaking mountain photography. The emotional goal is to evoke a sense of reliability, safety, and the "premium breath of fresh air" one feels when viewing the Everest range. The interface uses high-quality imagery as a structural element, ensuring that the technology feels like a gateway to the destination rather than a barrier.

## Colors

The palette is anchored by **Himalayan Blue**, a deep, dependable navy that signals professional authority and safety. **Everest White** serves as the primary background color, providing a crisp, airy canvas that prevents the UI from feeling cluttered.

**Sunset Orange** is reserved exclusively for high-priority calls to action (CTAs) and critical booking buttons, ensuring they vibrate against the cooler blue and white tones. **Forest Green** is utilized for success states, sustainability badges (e.g., for electric vehicles), and "Nature-ready" status indicators. Neutral tones are derived from slate and cool greys to maintain a cohesive "chilly" mountain temperature throughout the interface.

## Typography

The typography system pairs **Manrope** for headlines with **Inter** for functional text. Manrope provides a modern, geometric refinement that feels more premium than standard system fonts, while Inter ensures maximum legibility for technical car specifications and booking details.

Headlines use a tighter letter-spacing and heavier weights to command attention, especially when overlaid on photography. Body text maintains generous line-heights to ensure readability for international travelers who may be scanning for key logistical information.

## Layout & Spacing

The layout utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. A strict 8px spacing scale governs all internal padding and margins to maintain mathematical harmony.

Content is housed in wide containers with significant outer margins to mimic the "open space" of the Nepalese landscape. Components like car search cards should utilize "floating" logic, often breaking the vertical flow to sit partially over hero images. Mobile layouts prioritize vertical stacking with full-width cards and 16px safe-area margins.

## Elevation & Depth

This design system uses a combination of **Tonal Layers** and **Ambient Shadows** to create a sophisticated hierarchy. 

1.  **The Base:** Everest White (#F8FAFC) background.
2.  **Surface Level:** Pure white (#FFFFFF) cards with 1px Sky-tint borders.
3.  **Elevation (Floating):** Search bars and primary booking cards use a deep, diffused shadow (0px 20px 40px rgba(15, 76, 129, 0.08)) to appear as if they are floating above the map or photography.
4.  **Glassmorphism:** Navigation bars and filter overlays use a 12px backdrop blur with a 70% white opacity to maintain context of the background image while ensuring text legibility.

## Shapes

The shape language is defined by **Large Rounded Corners**, moving away from the sharp corporate look towards a more approachable, modern travel aesthetic. 

Standard components (inputs, small buttons) use a `0.5rem` radius. Primary containers, car image cards, and search modules use a significantly larger radius (`1rem` to `1.5rem`) to create a "soft-tech" feel. Icons should follow a "Lineal Rounded" style to match the UI's curvature.

## Components

### Buttons
- **Primary:** Sunset Orange background, white text, 8px radius. High-saturation hover state.
- **Secondary:** Himalayan Blue outline, blue text, 8px radius.
- **Ghost:** Backdrop-blur background for use over photography.

### Input Fields
- Soft grey backgrounds (#F1F5F9) with no borders in resting state. On focus, a 2px Himalayan Blue border appears.

### Cards (Car Listings)
- Use `rounded-xl` (1.5rem) corners. The image should occupy the top half with a subtle gradient overlay at the bottom for white text labels (price, car model).

### Chips
- Used for car features (4x4, AC, Automatic). Rounded-pill shape with Forest Green tints for "High-Performance" features.

### Date/Location Picker
- A unified "Command Center" component that sits at the top of the search results, utilizing Glassmorphism and a heavy ambient shadow to denote its priority.