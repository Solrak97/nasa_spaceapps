import React from 'react';
import Image from 'next/image';
import { tw } from '../theme';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

/**
 * Card component with Deep Ocean theme
 * 
 * @example
 * ```tsx
 * <Card hover>
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </Card>
 * 
 * <Card gradient>
 *   <div>Gradient background card</div>
 * </Card>
 * ```
 */
export function Card({ children, className = '', hover = false, gradient = false }: CardProps) {
  const baseClasses = `
    p-6 rounded-xl shadow-lg
    ${gradient ? tw.gradient.card : tw.bg.card}
    ${tw.border.medium}
    ${hover ? `hover:${tw.border.strong} transition-all` : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={baseClasses}>
      {children}
    </div>
  );
}

interface FeatureCardProps {
  icon?: string | React.ReactNode;
  image?: string;
  imageAlt?: string;
  title: string;
  description: string;
  className?: string;
}

/**
 * Feature card with icon/image, title, and description
 * 
 * @example
 * ```tsx
 * // With emoji icon
 * <FeatureCard
 *   icon="🌊"
 *   title="VR Ocean Exploration"
 *   description="Immersive virtual reality experience"
 * />
 * 
 * // With image
 * <FeatureCard
 *   image="/game_screenshots/ocean_floor.jpeg"
 *   imageAlt="Ocean floor"
 *   title="Ocean Exploration"
 *   description="Explore the deep ocean"
 * />
 * ```
 */
export function FeatureCard({ icon, image, imageAlt = '', title, description, className = '' }: FeatureCardProps) {
  return (
    <Card hover className={`group ${className}`}>
      {image ? (
        <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden shadow-xl ring-2 ring-[#85c6cf]/30 group-hover:ring-[#85c6cf]/60 transition-all">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06141B]/80 via-transparent to-transparent"></div>
        </div>
      ) : icon ? (
        <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{icon}</div>
      ) : null}
      <h3 className={`text-2xl font-bold mb-3 ${tw.text.accent}`}>{title}</h3>
      <p className={`${tw.text.secondary} text-base leading-relaxed`}>{description}</p>
    </Card>
  );
}

