import React from 'react';
import Image from 'next/image';
import { Button } from './Button';
import { tw } from '../theme';

interface HeroAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
}

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  actions?: HeroAction[];
  image?: string;
  imageAlt?: string;
  icon?: string | React.ReactNode;
  backgroundImage?: string;
  variant?: 'default' | 'centered' | 'split';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Hero Banner Component with Deep Ocean theme
 * 
 * @example
 * ```tsx
 * <Hero
 *   title="Deep Ocean"
 *   subtitle="by Chifrijo Cósmico"
 *   description="Exploring the depths of our oceans"
 *   image="/deep-ocean.png"
 *   actions={[
 *     { label: 'Get Started', href: '/world', variant: 'primary' },
 *     { label: 'Learn More', href: '#about', variant: 'outline' }
 *   ]}
 * />
 * ```
 */
export function Hero({
  title,
  subtitle,
  description,
  actions = [],
  image,
  imageAlt = '',
  icon,
  backgroundImage,
  variant = 'centered',
  size = 'lg',
  className = '',
}: HeroProps) {
  const sizeClasses = {
    sm: 'py-12 min-h-[40vh]',
    md: 'py-16 min-h-[60vh]',
    lg: 'py-20 min-h-[80vh]',
  };

  const titleSizes = {
    sm: 'text-4xl md:text-5xl',
    md: 'text-5xl md:text-6xl',
    lg: 'text-5xl md:text-7xl',
  };

  if (variant === 'split' && image) {
    return (
      <section className={`${sizeClasses[size]} ${className}`}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="order-2 lg:order-1">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-[#85c6cf]/30">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Content Side */}
            <div className="order-1 lg:order-2">
              {subtitle && (
                <p className={`text-xl md:text-2xl ${tw.text.accent} mb-4 font-semibold`}>
                  {subtitle}
                </p>
              )}
              <h1 className={`${titleSizes[size]} font-bold mb-6 bg-clip-text text-transparent ${tw.gradient.text}`}>
                {title}
              </h1>
              {description && (
                <p className={`text-lg md:text-xl ${tw.text.secondary} mb-8 leading-relaxed`}>
                  {description}
                </p>
              )}
              {actions.length > 0 && (
                <div className="flex gap-4 flex-wrap">
                  {actions.map((action, index) => (
                    <Button
                      key={index}
                      variant={action.variant || 'primary'}
                      href={action.href}
                      onClick={action.onClick}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${sizeClasses[size]} ${className} relative overflow-hidden hero-ocean-bg`}>
      {/* Layered Ocean Background */}
      {backgroundImage ? (
        <>
          <div className="absolute inset-0">
            <Image
              src={backgroundImage}
              alt="Background"
              fill
              className="object-cover scale-110 blur-sm"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#001117]/90 via-[#012d3a]/85 to-[#001117]/95"></div>
        </>
      ) : (
        <>
          {/* Deep ocean gradient layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#001117] via-[#012d3a] to-[#001117]"></div>
          <div className="absolute inset-0 bg-gradient-radial-ocean opacity-40"></div>
          
          {/* Animated waves */}
          <div className="ocean-wave ocean-wave-1"></div>
          <div className="ocean-wave ocean-wave-2"></div>
          <div className="ocean-wave ocean-wave-3"></div>
          
          {/* Subtle bubbles pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjMwIiByPSIzIiBmaWxsPSIjODVjNmNmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjxjaXJjbGUgY3g9IjcwIiBjeT0iNjAiIHI9IjIiIGZpbGw9IiM4NWM2Y2YiIGZpbGwtb3BhY2l0eT0iMC4wOCIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iMjAiIHI9IjEuNSIgZmlsbD0iIzg1YzZjZiIgZmlsbC1vcGFjaXR5PSIwLjEyIi8+PGNpcmNsZSBjeD0iMzAiIGN5PSI3MCIgcj0iMiIgZmlsbD0iIzg1YzZjZiIgZmlsbC1vcGFjaXR5PSIwLjA5Ii8+PC9zdmc+')] opacity-50"></div>
        </>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`flex flex-col items-center justify-center ${variant === 'centered' ? 'text-center' : ''} max-w-5xl mx-auto`}>
          {/* Small Logo Badge - Only show if there's an image and background */}
          {image && backgroundImage && (
            <div className="mb-6 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#85c6cf] to-[#e8f3f2] rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-2xl border-3 border-[#85c6cf]/40 group-hover:border-[#85c6cf]/70 transition-all transform group-hover:scale-110 bg-[#001117]/60 backdrop-blur-sm p-1">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>
            </div>
          )}
          {/* Large centered image - Only show if no background */}
          {image && !backgroundImage && (
            <div className="mb-8 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#85c6cf] to-[#e8f3f2] rounded-2xl blur-3xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#85c6cf]/40 group-hover:border-[#85c6cf]/70 transition-all transform group-hover:scale-105 bg-[#012d3a]/80 backdrop-blur-sm p-4">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  className="object-contain p-4"
                  priority
                />
              </div>
            </div>
          )}
          {!image && icon && (
            <div className="mb-8 text-8xl animate-pulse">
              {icon}
            </div>
          )}

          {/* Text Content */}
          {subtitle && (
            <p className={`text-lg md:text-xl ${tw.text.accent} mb-3 font-semibold tracking-wider uppercase opacity-90`}>
              {subtitle}
            </p>
          )}
          <h1 className={`${titleSizes[size]} font-extrabold mb-6 leading-tight`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#85c6cf] via-[#e8f3f2] to-[#85c6cf] animate-gradient">
              {title}
            </span>
          </h1>
          {description && (
            <p className={`text-lg md:text-xl ${tw.text.secondary} mb-10 leading-relaxed ${variant === 'centered' ? 'max-w-3xl' : ''} opacity-90`}>
              {description}
            </p>
          )}

          {/* Actions */}
          {actions.length > 0 && (
            <div className="flex gap-6 flex-wrap justify-center">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || 'primary'}
                  href={action.href}
                  onClick={action.onClick}
                  size="lg"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom Wave Decoration - SVG Wave */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                fill="#001117" fillOpacity="0.3"></path>
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                fill="#001117" fillOpacity="0.5"></path>
        </svg>
      </div>
    </section>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: string | React.ReactNode;
  gradient?: boolean;
  className?: string;
}

/**
 * Simple page header component for internal pages
 * 
 * @example
 * ```tsx
 * <PageHeader
 *   title="Our Virtual World"
 *   description="Explore the ocean depths"
 *   icon="🌍"
 *   gradient
 * />
 * ```
 */
export function PageHeader({
  title,
  description,
  icon,
  gradient = true,
  className = '',
}: PageHeaderProps) {
  return (
    <div className={`mb-12 text-center ${className}`}>
      {icon && (
        <div className="mb-6 text-7xl animate-pulse">
          {icon}
        </div>
      )}
      <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${gradient ? `bg-clip-text text-transparent ${tw.gradient.text}` : tw.text.primary}`}>
        {title}
      </h1>
      {description && (
        <p className={`text-lg md:text-xl ${tw.text.secondary} max-w-3xl mx-auto leading-relaxed`}>
          {description}
        </p>
      )}
    </div>
  );
}

interface HeroImageBoxProps {
  icon: string | React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  gradient?: boolean;
  className?: string;
}

/**
 * Decorative hero image box with icon
 * 
 * @example
 * ```tsx
 * <HeroImageBox icon="🌊" size="lg" gradient />
 * ```
 */
export function HeroImageBox({
  icon,
  size = 'md',
  gradient = true,
  className = '',
}: HeroImageBoxProps) {
  const sizeClasses = {
    sm: 'h-64',
    md: 'h-96',
    lg: 'h-96 md:h-[500px]',
  };

  const iconSizes = {
    sm: 'text-6xl',
    md: 'text-8xl',
    lg: 'text-9xl',
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${gradient ? tw.gradient.card : tw.bg.card}
        rounded-2xl shadow-2xl
        flex items-center justify-center
        relative overflow-hidden
        ${tw.border.medium}
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className={`${iconSizes[size]} z-10`}>
        {icon}
      </div>
    </div>
  );
}


