import React from 'react';
import { tw } from '../theme';

interface StatCardProps {
  value: string;
  label: string;
  sublabel?: string;
  icon?: string | React.ReactNode;
  gradient?: boolean;
  className?: string;
}

/**
 * Statistic card component for displaying metrics
 * 
 * @example
 * ```tsx
 * <StatCard
 *   value="71%"
 *   label="Of Earth's Surface"
 *   sublabel="Covered by oceans"
 *   gradient
 * />
 * ```
 */
export function StatCard({
  value,
  label,
  sublabel,
  icon,
  gradient = true,
  className = '',
}: StatCardProps) {
  return (
    <div className={`
      ${gradient ? tw.gradient.card : tw.bg.card}
      p-6 rounded-xl
      ${tw.border.medium}
      text-center
      shadow-lg
      hover:shadow-xl
      transition-all
      ${className}
    `}>
      {icon && (
        <div className="text-3xl mb-2">{icon}</div>
      )}
      <div className={`text-3xl md:text-4xl font-bold mb-2 ${tw.text.accent}`}>
        {value}
      </div>
      <div className={`${tw.text.primary} text-sm md:text-base font-medium`}>
        {label}
      </div>
      {sublabel && (
        <div className={`${tw.text.secondary} text-xs mt-1`}>
          {sublabel}
        </div>
      )}
    </div>
  );
}

interface StatsGridProps {
  stats: Omit<StatCardProps, 'className'>[];
  columns?: 2 | 3 | 4;
  className?: string;
}

/**
 * Grid of statistic cards
 */
export function StatsGrid({ stats, columns = 4, className = '' }: StatsGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}

