# Deep Ocean Components Guide

Reusable themed components for the Deep Ocean project.

## 🎯 Hero Component

The Hero component is perfect for landing pages and major section headers.

### Variants

#### 1. Centered Hero (Default)
Perfect for landing pages with image/icon centered above content.

```tsx
import { Hero } from '@/app/components/Hero';

<Hero
  title="Deep Ocean"
  subtitle="by Chifrijo Cósmico"
  description="Exploring the depths of our oceans"
  image="/deep-ocean.png"
  imageAlt="Logo"
  variant="centered"
  size="lg"
  actions={[
    { label: 'Get Started', href: '/world', variant: 'primary' },
    { label: 'Learn More', href: '#about', variant: 'outline' }
  ]}
/>
```

#### 2. Split Hero
Perfect for feature highlights with image/content side-by-side.

```tsx
<Hero
  title="Explore Our Virtual World"
  subtitle="NASA Data Visualization"
  description="Immerse yourself in ocean environments"
  image="/world-preview.jpg"
  imageAlt="Virtual World Preview"
  variant="split"
  size="md"
  actions={[
    { label: 'Start Exploring', href: '/explore', variant: 'primary' }
  ]}
/>
```

#### 3. Icon Hero
Use icon instead of image for a lighter feel.

```tsx
<Hero
  title="Welcome"
  description="Discover the ocean depths"
  icon="🌊"
  size="sm"
  actions={[
    { label: 'Begin', href: '/start', variant: 'primary' }
  ]}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Main heading text |
| `subtitle` | `string` | - | Secondary heading (e.g., tagline) |
| `description` | `string` | - | Longer description text |
| `image` | `string` | - | Image path (e.g., `/logo.png`) |
| `imageAlt` | `string` | `''` | Alt text for image |
| `icon` | `string \| ReactNode` | - | Icon emoji or component |
| `variant` | `'default' \| 'centered' \| 'split'` | `'centered'` | Layout variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'lg'` | Size of hero section |
| `actions` | `HeroAction[]` | `[]` | Array of call-to-action buttons |

## 📄 PageHeader Component

Simpler header for internal pages.

```tsx
import { PageHeader } from '@/app/components/Hero';

<PageHeader
  title="Our Virtual World"
  description="Explore the ocean depths with VR"
  icon="🌍"
  gradient
/>
```

## 📦 Section Component

Content sections with image/icon and text.

```tsx
import { Section, SectionContainer } from '@/app/components/Section';

<SectionContainer
  id="features"
  title="Amazing Features"
  subtitle="Discover what makes us special"
>
  <Section
    title="VR Experience"
    description="Immersive virtual reality ocean exploration"
    paragraphs={[
      "Additional detail paragraph here",
      "Even more details if needed"
    ]}
    icon="🌊"
    action={{ label: 'Try It', href: '/vr' }}
  />
  
  <Section
    title="NASA Data"
    description="Real scientific data visualization"
    icon="🗺️"
    action={{ label: 'Learn More', href: '/data', variant: 'outline' }}
    reverse  // Image on right side
  />
</SectionContainer>
```

### Section Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Section title |
| `description` | `string` | - | First paragraph |
| `paragraphs` | `string[]` | `[]` | Additional paragraphs |
| `image` | `string` | - | Image path |
| `imageAlt` | `string` | `''` | Image alt text |
| `icon` | `string \| ReactNode` | `'🌊'` | Icon if no image |
| `action` | `object` | - | CTA button config |
| `reverse` | `boolean` | `false` | Swap image/text sides |

## 🎴 Card Components

### FeatureCard

Perfect for feature grids.

```tsx
import { FeatureCard } from '@/app/components/Card';

<div className="grid md:grid-cols-3 gap-8">
  <FeatureCard
    icon="🌊"
    title="VR Exploration"
    description="Immersive ocean experience"
  />
  <FeatureCard
    icon="🗺️"
    title="NASA Data"
    description="Real scientific data"
  />
  <FeatureCard
    icon="🤖"
    title="AI Powered"
    description="Smart interactions"
  />
</div>
```

### Card

Generic themed card for any content.

```tsx
import { Card } from '@/app/components/Card';

<Card hover gradient>
  <h3>Custom Content</h3>
  <p>Anything goes here!</p>
</Card>
```

## 🔘 Button Component

Themed buttons that work as links or actions.

```tsx
import { Button } from '@/app/components/Button';

{/* As link */}
<Button variant="primary" href="/world">
  Get Started
</Button>

{/* As button */}
<Button variant="outline" onClick={() => alert('Hi!')}>
  Click Me
</Button>

{/* External link */}
<Button variant="secondary" href="https://nasa.gov" external>
  NASA Website
</Button>

{/* Different sizes */}
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

{/* Full width */}
<Button fullWidth>Expand</Button>
```

## 🎨 Using the Theme

All components automatically use the theme, but you can access it directly:

```tsx
import { tw } from '@/app/theme';

<div className={`${tw.bg.card} ${tw.text.primary} p-6`}>
  <h2 className={tw.text.accent}>Themed Content</h2>
  <p className={tw.text.secondary}>Description</p>
</div>
```

## 📐 Layout Example

Complete page with hero and sections:

```tsx
import { Hero } from '@/app/components/Hero';
import { Section, SectionContainer } from '@/app/components/Section';
import { FeatureCard } from '@/app/components/Card';
import { tw } from '@/app/theme';

export default function MyPage() {
  return (
    <div className={`min-h-screen ${tw.gradient.background} ${tw.text.primary} pt-16`}>
      {/* Hero */}
      <Hero
        title="Page Title"
        description="Page description"
        icon="🌊"
        actions={[
          { label: 'Start', href: '/start', variant: 'primary' }
        ]}
      />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        
        {/* Features Grid */}
        <section className="py-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${tw.text.primary}`}>
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard icon="🌊" title="Feature 1" description="Description" />
            <FeatureCard icon="🗺️" title="Feature 2" description="Description" />
            <FeatureCard icon="🤖" title="Feature 3" description="Description" />
          </div>
        </section>
        
        {/* Content Sections */}
        <SectionContainer title="More Info">
          <Section
            title="Section 1"
            description="Content here"
            icon="🌍"
            action={{ label: 'Learn More', href: '/more' }}
          />
        </SectionContainer>
        
      </main>
    </div>
  );
}
```

## 🚀 Quick Start Checklist

When creating a new page:

1. ✅ Import components you need
2. ✅ Use `Hero` for page header
3. ✅ Wrap content in theme utilities (`tw.*`)
4. ✅ Use `Button` instead of raw links
5. ✅ Use `FeatureCard` for feature grids
6. ✅ Use `Section` for content blocks
7. ✅ Apply consistent spacing (`py-16`, `mb-12`, etc.)

## 💡 Tips

- **Consistency**: Stick to the themed components
- **Spacing**: Use multiples of 4 (`py-4`, `py-8`, `py-12`, `py-16`, `py-20`)
- **Colors**: Always use `tw.*` utilities, never hardcode colors
- **Responsiveness**: Components are mobile-first and responsive
- **Accessibility**: All components include proper ARIA labels


