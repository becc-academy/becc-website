# Brand Color Implementation Guide

## Overview

This document outlines the brand color system implementation for the BECC Academy website. All brand colors are defined as CSS custom properties (variables) in the UI package and should be used consistently across all components.

## CSS Variables Location

**File**: `packages/ui/src/styles.css`

The brand colors are defined in the `:root` selector and are automatically available throughout the application when components from `@becc/ui` are imported.

## Brand Color Variables

### Primary Colors

- `--background-color: #f1f5f7` - Main background color
- `--default-color: #010608` - Default text color
- `--heading-color: #6a3136` - Heading text color
- `--accent-color: #e95001` - Primary accent/orange color
- `--surface-color: #ffffff` - Surface/card background color
- `--contrast-color: #ffffff` - Contrast text color (for dark backgrounds)

### Navigation Colors

- `--nav-color: #04415f` - Navigation link default color
- `--nav-hover-color: #6a3136` - Navigation link hover color
- `--nav-mobile-background-color: #ffffff` - Mobile menu background

## Background Variants

### Light Background

Apply the `.light-background` class to elements that need a lighter background:

```css
.light-background {
  --background-color: #e6edf0;
  --surface-color: #ffffff;
}
```

### Dark Background

Apply the `.dark-background` class to elements that need a dark background:

```css
.dark-background {
  --background-color: #060606;
  --default-color: #ffffff;
  --heading-color: #ffffff;
  --surface-color: #252525;
  --contrast-color: #ffffff;
}
```

## Usage Guidelines

### In CSS/SCSS Files

```css
.my-component {
  background-color: var(--background-color);
  color: var(--default-color);
}

.my-heading {
  color: var(--heading-color);
}

.my-button {
  background-color: var(--accent-color);
  color: var(--contrast-color);
}
```

### In React Components (Inline Styles)

```tsx
<div style={{ backgroundColor: 'var(--background-color)', color: 'var(--default-color)' }}>
  Content
</div>
```

### In Tailwind Classes

The Tailwind config has been extended with brand color utilities:

- `bg-becc-background` - Background color
- `text-becc-default` - Default text color
- `text-becc-heading` - Heading color
- `bg-becc-accent` - Accent background
- `text-becc-accent` - Accent text color
- `bg-becc-surface` - Surface background
- `text-becc-nav` - Navigation text color
- `text-becc-nav-hover` - Navigation hover color

Example:

```tsx
<div className="bg-becc-background text-becc-default">
  <h1 className="text-becc-heading">Title</h1>
  <button className="bg-becc-accent text-becc-contrast">Click Me</button>
</div>
```

## Components Updated

### ✅ Completed

1. **Global Styles** (`packages/ui/src/styles.css`)
   - Added all brand color CSS variables
   - Added light and dark background variants
   - Updated body styles to use variables

2. **Tailwind Config** (`packages/ui/tailwind.config.js`)
   - Extended color palette with brand color utilities

3. **Footer Component** (`packages/ui/src/website/Footer.tsx`)
   - Updated to use `var(--default-color)` and `var(--background-color)`

4. **Header Component** (`packages/ui/src/website/Header.tsx`)
   - Navigation links use `var(--nav-color)` and `var(--nav-hover-color)`
   - Active links use `var(--accent-color)`
   - Mobile menu uses `var(--nav-mobile-background-color)`
   - Header background uses `var(--surface-color)`

5. **Website App Styles** (`apps/website/src/styles/index.css`)
   - Removed conflicting color definitions
   - Body now inherits colors from UI package

## Components That Need Updates

The following components still use hardcoded colors and should be updated to use CSS variables:

### High Priority

1. **Hero Component** - Buttons, text colors
2. **Button Components** - Background and text colors
3. **ProgramCard** - Accent colors, badges
4. **FeatureCard** - Border colors, icons
5. **ValueCard** - Icon colors
6. **SectionTitle** - Heading colors

### Medium Priority

7. **EventCard** - Accent colors
8. **ServiceCard** - Colors
9. **TestimonialCard** - Accent colors
10. **ContactForm** - Input borders, buttons
11. **PageTitle** - Text colors
12. **EventBanner** - Background and text colors

### Low Priority

13. All other components with hardcoded `#e95001`, `#6a3136`, `#04415f`, or gray colors

## Search Pattern for Finding Hardcoded Colors

To find components that need updates, search for:

- `#e95001` (accent color)
- `#6a3136` (heading/nav hover color)
- `#04415f` (nav color)
- `bg-gray-` (should use `var(--background-color)` or `var(--surface-color)`)
- `text-gray-` (should use `var(--default-color)` or `var(--nav-color)`)

## Footer Implementation

The Footer component now uses:

```tsx
style={{
  color: 'var(--default-color)',
  backgroundColor: 'var(--background-color)',
}}
```

When using the glasmorphism variant, it maintains its gradient background but respects the color variables for text.

## Testing Checklist

- [ ] Verify footer uses correct background and text colors
- [ ] Check header navigation colors match brand
- [ ] Ensure buttons use accent color
- [ ] Verify headings use heading color
- [ ] Test light and dark background variants
- [ ] Check mobile menu colors
- [ ] Verify all interactive elements have proper hover states

## Migration Strategy

1. **Phase 1** (Completed): Set up CSS variables and global styles
2. **Phase 2** (In Progress): Update core components (Header, Footer)
3. **Phase 3**: Update high-priority components (Hero, Buttons, Cards)
4. **Phase 4**: Update remaining components
5. **Phase 5**: Remove all hardcoded color values

## Notes

- The CSS variables are scoped to `:root`, so they're available globally
- Components can override variables using the `.light-background` or `.dark-background` classes
- Tailwind utilities are available but inline styles with `var()` are also acceptable
- Always use CSS variables instead of hardcoded hex colors for brand colors
