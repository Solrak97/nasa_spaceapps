import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './Button';
import { HeroImageBox } from './Hero';
import { tw } from '../theme';

interface SectionProps {
  title: string;
  description?: string;
  paragraphs?: string[];
  image?: string;
  imageAlt?: string;
  icon?: string | React.ReactNode;
  action?: {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  reverse?: boolean;
  className?: string;
}

/**
 * Content section with image/icon and text
 * Perfect for feature descriptions and content blocks
 * 
 * @example
 * ```tsx
 * <Section
 *   title="Explore Our Virtual World"
 *   description="Immerse yourself in a virtual ocean environment"
 *   icon="🌍"
 *   action={{ label: 'Explore World', href: '/world' }}
 * />
 * ```
 */
export function Section({
  title,
  description,
  paragraphs = [],
  image,
  imageAlt = '',
  icon = '🌊',
  action,
  reverse = false,
  className = '',
}: SectionProps) {
  const allParagraphs = description ? [description, ...paragraphs] : paragraphs;

  return (
    <div className={`mb-20 ${className}`}>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Visual Side */}
        <div className={reverse ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}>
          {image ? (
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-[#85c6cf]/30">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <HeroImageBox icon={icon} size="lg" gradient />
          )}
        </div>

        {/* Content Side */}
        <div className={reverse ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}>
          <h3 className={`text-3xl md:text-4xl font-bold mb-6 ${tw.text.accent}`}>
            {title}
          </h3>
          
          {allParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`text-lg ${
                index === 0 ? tw.text.primary : tw.text.secondary
              } mb-6 leading-relaxed`}
            >
              {paragraph}
            </p>
          ))}

          {action && (
            <Button
              variant={action.variant || 'primary'}
              href={action.href}
            >
              {action.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

interface SectionContainerProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Container for multiple sections with optional title
 * 
 * @example
 * ```tsx
 * <SectionContainer
 *   id="virtual-spaces"
 *   title="Virtual Spaces"
 *   subtitle="Explore our immersive environments"
 * >
 *   <Section ... />
 *   <Section ... />
 * </SectionContainer>
 * ```
 */
export function SectionContainer({
  id,
  title,
  subtitle,
  children,
  className = '',
}: SectionContainerProps) {
  return (
    <section id={id} className={`py-20 ${className}`}>
      {(title || subtitle) && (
        <div className="text-center mb-16">
          {title && (
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent ${tw.gradient.text}`}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className={`text-xl ${tw.text.secondary} max-w-3xl mx-auto`}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}


