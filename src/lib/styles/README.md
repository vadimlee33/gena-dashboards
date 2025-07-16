# Design System Documentation

This directory contains the design system for the Gena Dashboards application, providing consistent styling and component patterns across the entire application.

## Overview

The design system is built on top of Tailwind CSS and provides:
- **Design Tokens**: Colors, spacing, typography, and other design constants
- **Component Styles**: Pre-defined style classes for UI components
- **Utility Functions**: Helper functions for combining and managing styles

## File Structure

```
src/lib/styles/
├── design-system.ts      # Design tokens and configuration
├── component-styles.ts   # Component-specific style classes
└── README.md            # This documentation
```

## Design Tokens

### Colors

The design system uses a comprehensive color palette with semantic naming:

```typescript
// Primary colors (Blue)
primary: {
  50: '#eff6ff',
  100: '#dbeafe',
  // ... up to 900
}

// Secondary colors (Gray)
secondary: {
  50: '#f8fafc',
  100: '#f1f5f9',
  // ... up to 900
}

// Semantic colors
success: { /* Green variants */ }
warning: { /* Yellow variants */ }
danger: { /* Red variants */ }
```

### Spacing

Consistent spacing scale based on 4px grid:

```typescript
spacing: {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
}
```

### Typography

Font families and sizes:

```typescript
typography: {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
  }
}
```

## Component Styles

### Button Styles

```typescript
buttonStyles: {
  base: 'inline-flex items-center justify-center font-medium transition-all duration-200...',
  variants: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white...',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900...',
    success: 'bg-green-600 hover:bg-green-700 text-white...',
    danger: 'bg-red-600 hover:bg-red-700 text-white...',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700...',
    outline: 'bg-transparent border border-gray-300 text-gray-700...',
  },
  sizes: {
    xs: 'px-2 py-1 text-xs rounded',
    sm: 'px-3 py-1.5 text-sm rounded',
    md: 'px-4 py-2 text-sm rounded-md',
    lg: 'px-6 py-3 text-base rounded-lg',
    xl: 'px-8 py-4 text-lg rounded-lg',
  }
}
```

### Input Styles

```typescript
inputStyles: {
  base: 'w-full transition-all duration-200 focus:outline-none...',
  variants: {
    default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500...',
    error: 'border-red-300 focus:border-red-500 focus:ring-red-500...',
    success: 'border-green-300 focus:border-green-500 focus:ring-green-500...',
  },
  sizes: {
    sm: 'px-2 py-1 text-xs rounded',
    md: 'px-3 py-2 text-sm rounded-md',
    lg: 'px-4 py-3 text-base rounded-lg',
  }
}
```

### Card Styles

```typescript
cardStyles: {
  base: 'rounded-lg border transition-all duration-200',
  variants: {
    default: 'bg-white border-gray-200 shadow-sm hover:shadow-md',
    elevated: 'bg-white border-gray-200 shadow-md hover:shadow-lg',
    outline: 'bg-transparent border-gray-300',
    ghost: 'bg-gray-50 border-transparent',
    interactive: 'bg-white border-gray-200 shadow-sm hover:shadow-md cursor-pointer...',
  },
  padding: {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  }
}
```

## Usage Examples

### Using Button Component

```tsx
import Button from '@/components/ui/button';

// Primary button
<Button variant="primary" size="md">
  Create Dashboard
</Button>

// Secondary button with icon
<Button variant="secondary" size="sm" icon={<PlusIcon />}>
  Add Chart
</Button>

// Loading state
<Button variant="primary" loading>
  Saving...
</Button>
```

### Using Input Component

```tsx
import Input from '@/components/ui/input';

// Basic input
<Input 
  placeholder="Enter dashboard name..."
  label="Dashboard Name"
  helpText="Choose a descriptive name"
/>

// Input with error
<Input 
  value={value}
  onChange={handleChange}
  label="Email"
  error="Please enter a valid email address"
  variant="error"
/>
```

### Using Card Component

```tsx
import Card from '@/components/ui/card';

// Default card
<Card>
  <h3>Dashboard Title</h3>
  <p>Dashboard content...</p>
</Card>

// Interactive card
<Card variant="interactive" onClick={handleClick}>
  <h3>Clickable Card</h3>
</Card>

// Elevated card with custom padding
<Card variant="elevated" padding="lg">
  <h3>Elevated Card</h3>
</Card>
```

## Utility Functions

### combineClasses

Combines multiple class names, filtering out falsy values:

```typescript
import { combineClasses } from '@/lib/styles/component-styles';

const classes = combineClasses(
  'base-class',
  condition && 'conditional-class',
  'another-class'
);
```

### createVariantClasses

Creates variant-based class combinations:

```typescript
import { createVariantClasses } from '@/lib/styles/component-styles';

const buttonClasses = createVariantClasses(
  buttonStyles.base,
  buttonStyles.variants,
  'primary'
);
```

## Best Practices

### 1. Consistent Spacing

Always use the predefined spacing tokens:

```tsx
// ✅ Good
<div className="p-4">Content</div>
<div className="space-y-4">Items</div>

// ❌ Avoid
<div className="p-16">Content</div>
<div style={{ padding: '20px' }}>Content</div>
```

### 2. Semantic Colors

Use semantic color variants for better accessibility and consistency:

```tsx
// ✅ Good
<Button variant="success">Save</Button>
<Badge variant="danger">Error</Badge>

// ❌ Avoid
<Button className="bg-green-500">Save</Button>
```

### 3. Responsive Design

Use responsive prefixes for different screen sizes:

```tsx
// ✅ Good
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Content */}
</div>

// ❌ Avoid
<div className="grid grid-cols-3">
  {/* Content */}
</div>
```

### 4. Component Composition

Prefer composition over complex prop combinations:

```tsx
// ✅ Good
<Card variant="elevated" padding="lg">
  <Button variant="primary">Action</Button>
</Card>

// ❌ Avoid
<div className="bg-white border border-gray-200 shadow-md p-6 rounded-lg">
  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
    Action
  </button>
</div>
```

## Accessibility

The design system includes accessibility features:

- **Focus States**: All interactive elements have visible focus indicators
- **Color Contrast**: Colors meet WCAG AA contrast requirements
- **Semantic HTML**: Components use appropriate HTML elements
- **ARIA Labels**: Interactive elements include proper ARIA attributes

## Performance

- **Utility Classes**: Uses Tailwind's utility-first approach for optimal CSS
- **Tree Shaking**: Unused styles are automatically removed
- **Minimal Bundle**: Only includes styles that are actually used

## Customization

To customize the design system:

1. **Colors**: Modify the `colors` object in `design-system.ts`
2. **Spacing**: Adjust the `spacing` values
3. **Typography**: Update font families and sizes
4. **Components**: Add new variants to component style objects

## Migration Guide

When updating existing components to use the new design system:

1. Replace hardcoded classes with design system utilities
2. Use semantic color variants instead of specific colors
3. Implement consistent spacing using the spacing scale
4. Add proper loading and error states
5. Include accessibility attributes

## Contributing

When adding new components or styles:

1. Follow the existing naming conventions
2. Include proper TypeScript types
3. Add comprehensive documentation
4. Test with different screen sizes
5. Ensure accessibility compliance 