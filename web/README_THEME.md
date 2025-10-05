# Deep Ocean Theme System

A centralized theme system for the Deep Ocean project that provides consistent colors, styles, and components across the entire application.

## 📁 Files

- **`app/theme.ts`** - Core theme configuration with colors, gradients, and Tailwind utilities
- **`app/components/ThemeProvider.tsx`** - React Context provider for theme access
- **`app/components/Button.tsx`** - Themed button component
- **`app/components/Card.tsx`** - Themed card components

## 🎨 Color Palette

```typescript
// Base Colors
richBlack: '#001117'      // Deep backgrounds
platinum: '#e8f3f2'       // Primary text
nonPhotoBlue: '#85c6cf'   // Accent/highlights
gunmetal: '#012d3a'       // Secondary backgrounds
battleshipGray: '#c5d0cd' // Secondary text
```

## 🚀 Usage

### 1. Using Tailwind Utilities (Recommended)

```tsx
import { tw } from '@/app/theme';

function MyComponent() {
  return (
    <div className={`${tw.bg.card} ${tw.text.primary} p-6 rounded-lg`}>
      <h2 className={tw.text.accent}>Title</h2>
      <p className={tw.text.secondary}>Description</p>
    </div>
  );
}
```

### 2. Using Theme Hook

```tsx
'use client';
import { useTheme } from '@/app/components/ThemeProvider';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <div style={{ 
      backgroundColor: theme.colors.background.card,
      color: theme.colors.text.primary 
    }}>
      Content
    </div>
  );
}
```

### 3. Using Themed Components

```tsx
import { Button } from '@/app/components/Button';
import { Card, FeatureCard } from '@/app/components/Card';

function MyPage() {
  return (
    <div>
      <Card hover>
        <h3>My Card</h3>
      </Card>
      
      <FeatureCard
        icon="🌊"
        title="Feature Title"
        description="Feature description"
      />
      
      <Button variant="primary" href="/next-page">
        Get Started
      </Button>
      
      <Button variant="outline" onClick={() => alert('Clicked!')}>
        Learn More
      </Button>
    </div>
  );
}
```

## 🎯 Available Utilities

### Background Classes
- `tw.bg.primary` - Rich black (#001117)
- `tw.bg.secondary` - Gunmetal (#012d3a)
- `tw.bg.card` - Card background
- `tw.bg.elevated` - Hover state background

### Text Classes
- `tw.text.primary` - Platinum (#e8f3f2)
- `tw.text.secondary` - Battleship gray (#c5d0cd)
- `tw.text.accent` - Non-photo blue (#85c6cf)

### Border Classes
- `tw.border.default` - Solid border
- `tw.border.subtle` - 20% opacity
- `tw.border.medium` - 30% opacity
- `tw.border.strong` - 50% opacity

### Gradient Classes
- `tw.gradient.background` - Page background gradient
- `tw.gradient.text` - Text gradient
- `tw.gradient.card` - Card gradient

### Button Classes
- `tw.button.primary` - Primary button styling
- `tw.button.secondary` - Secondary button styling
- `tw.button.outline` - Outline button styling

## 🔧 Customization

To modify the theme, edit `app/theme.ts`:

```typescript
export const theme = {
  colors: {
    // Add or modify colors here
    customColor: '#123456',
    
    text: {
      primary: '#e8f3f2',
      // Add more text variants
    },
  },
};

// Add to Tailwind utilities
export const tw = {
  text: {
    custom: 'text-[#123456]',
  },
};
```

## 📦 Components

### Button Component

```tsx
<Button variant="primary" size="lg" href="/page">
  Click Me
</Button>

<Button variant="outline" onClick={handleClick}>
  Action
</Button>

<Button variant="secondary" href="https://example.com" external>
  External Link
</Button>
```

Props:
- `variant`: 'primary' | 'secondary' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `href`: For link buttons
- `onClick`: For action buttons
- `external`: Open in new tab
- `fullWidth`: Expand to full width
- `disabled`: Disable button

### Card Components

```tsx
<Card hover gradient>
  Content
</Card>

<FeatureCard
  icon="🌊"
  title="Feature"
  description="Description"
/>
```

## 🎨 Best Practices

1. **Always use theme utilities** instead of hardcoded colors
2. **Use semantic names** from the theme (e.g., `text.primary` instead of direct colors)
3. **Prefer Tailwind utilities** (`tw.*`) for better performance
4. **Use themed components** for consistency
5. **Test color contrast** for accessibility

## 🔄 Migration Guide

To update existing components:

**Before:**
```tsx
<div className="bg-[#012d3a] text-[#e8f3f2] border-[#85c6cf]/30">
  Content
</div>
```

**After:**
```tsx
import { tw } from '@/app/theme';

<div className={`${tw.bg.card} ${tw.text.primary} ${tw.border.medium}`}>
  Content
</div>
```

## 📝 Notes

- Theme is type-safe with TypeScript
- All components are server-compatible (except when using `useTheme` hook)
- Colors are derived from the NASA-inspired ocean palette
- Supports future theme switching capabilities

