import React from 'react';
import { tw } from '../theme';

interface ResourceLink {
  title: string;
  description: string;
  url: string;
  icon?: string | React.ReactNode;
  type?: 'github' | 'external' | 'document' | 'video' | 'other';
}

interface ResourcesProps {
  resources: ResourceLink[];
  title?: string;
  description?: string;
  columns?: 2 | 3 | 4;
  className?: string;
}

const typeIcons = {
  github: '🔗',
  external: '🌐',
  document: '📄',
  video: '🎥',
  other: '🔗',
};

/**
 * Resources section component with resource cards
 * 
 * @example
 * ```tsx
 * <Resources
 *   title="Project Resources"
 *   description="Links to our repositories and documentation"
 *   resources={[
 *     {
 *       title: 'GitHub Repository',
 *       description: 'Source code and documentation',
 *       url: 'https://github.com/...',
 *       type: 'github'
 *     },
 *     {
 *       title: 'NASA Space Apps',
 *       description: 'Challenge submission page',
 *       url: 'https://spaceappschallenge.org/...',
 *       type: 'external'
 *     }
 *   ]}
 * />
 * ```
 */
export function Resources({
  resources,
  title = 'Resources',
  description,
  columns = 3,
  className = '',
}: ResourcesProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section id="resources" className={`py-16 ${className}`}>
      <div className="text-center mb-12">
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${tw.text.primary}`}>
          {title}
        </h2>
        {description && (
          <p className={`text-lg ${tw.text.secondary} max-w-3xl mx-auto`}>
            {description}
          </p>
        )}
      </div>

      <div className={`grid ${gridCols[columns]} gap-6`}>
        {resources.map((resource, index) => (
          <ResourceCard key={index} {...resource} />
        ))}
      </div>
    </section>
  );
}

interface ResourceCardProps extends ResourceLink {}

/**
 * Individual resource card component
 */
export function ResourceCard({
  title,
  description,
  url,
  icon,
  type = 'other',
}: ResourceCardProps) {
  const defaultIcon = icon || typeIcons[type];
  const isExternal = !url.startsWith('/');

  return (
    <a
      href={url}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`
        group
        ${tw.bg.card}
        p-6 rounded-xl
        ${tw.border.medium}
        hover:${tw.border.strong}
        transition-all
        shadow-lg
        hover:shadow-xl
        hover:transform
        hover:scale-105
        block
      `}
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl flex-shrink-0">
          {defaultIcon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-xl font-bold mb-2 ${tw.text.accent} group-hover:${tw.text.primary} transition-colors`}>
            {title}
            {isExternal && (
              <span className="inline-block ml-2 text-sm">↗</span>
            )}
          </h3>
          <p className={`${tw.text.secondary} text-sm leading-relaxed`}>
            {description}
          </p>
        </div>
      </div>
    </a>
  );
}

interface QuickLink {
  label: string;
  url: string;
  icon?: string;
}

interface QuickLinksProps {
  links: QuickLink[];
  title?: string;
  className?: string;
}

/**
 * Compact quick links component for footer or sidebar
 * 
 * @example
 * ```tsx
 * <QuickLinks
 *   title="Quick Links"
 *   links={[
 *     { label: 'GitHub', url: 'https://github.com/...', icon: '💻' },
 *     { label: 'Demo', url: '/demo', icon: '🎮' }
 *   ]}
 * />
 * ```
 */
export function QuickLinks({ links, title, className = '' }: QuickLinksProps) {
  return (
    <div className={className}>
      {title && (
        <h3 className={`text-lg font-bold mb-4 ${tw.text.primary}`}>
          {title}
        </h3>
      )}
      <div className="flex flex-wrap gap-3">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target={!link.url.startsWith('/') ? '_blank' : undefined}
            rel={!link.url.startsWith('/') ? 'noopener noreferrer' : undefined}
            className={`
              inline-flex items-center gap-2
              px-4 py-2
              ${tw.bg.card}
              ${tw.border.subtle}
              hover:${tw.border.medium}
              rounded-lg
              ${tw.text.secondary}
              hover:${tw.text.accent}
              transition-all
              text-sm
              font-medium
            `}
          >
            {link.icon && <span>{link.icon}</span>}
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

