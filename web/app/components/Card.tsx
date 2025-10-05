import React from 'react';
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
  icon: string | React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

/**
 * Feature card with icon, title, and description
 * 
 * @example
 * ```tsx
 * <FeatureCard
 *   icon="🌊"
 *   title="VR Ocean Exploration"
 *   description="Immersive virtual reality experience"
 * />
 * ```
 */
export function FeatureCard({ icon, title, description, className = '' }: FeatureCardProps) {
  return (
    <Card hover className={className}>
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className={`text-xl font-semibold mb-2 ${tw.text.accent}`}>{title}</h3>
      <p className={tw.text.secondary}>{description}</p>
    </Card>
  );
}

