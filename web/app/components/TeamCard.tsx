import React from 'react';
import { tw } from '../theme';

export interface TeamMember {
  name: string;
  role: string;
  icon: string | React.ReactNode;
  responsibilities: string[];
}

interface TeamCardProps extends TeamMember {
  className?: string;
}

/**
 * Team member card component
 * 
 * @example
 * ```tsx
 * <TeamCard
 *   name="Oscar Quesada Webb"
 *   role="Team Lead"
 *   icon="👨‍💻"
 *   responsibilities={['Project direction', 'VR development']}
 * />
 * ```
 */
export function TeamCard({
  name,
  role,
  icon,
  responsibilities,
  className = '',
}: TeamCardProps) {
  return (
    <div className={`
      ${tw.bg.card}
      p-6 rounded-xl
      ${tw.border.medium}
      hover:${tw.border.strong}
      transition-all
      shadow-lg
      hover:shadow-xl
      hover:transform
      hover:scale-105
      ${className}
    `}>
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className={`text-xl font-bold mb-2 ${tw.text.accent}`}>
        {name}
      </h3>
      <p className={`text-sm ${tw.text.primary} mb-3 font-semibold`}>
        {role}
      </p>
      <ul className={`${tw.text.secondary} text-sm space-y-1`}>
        {responsibilities.map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

interface TeamGridProps {
  members: TeamMember[];
  columns?: 2 | 3 | 4;
  className?: string;
}

/**
 * Grid of team member cards
 */
export function TeamGrid({ members, columns = 3, className = '' }: TeamGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-8 ${className}`}>
      {members.map((member, index) => (
        <TeamCard key={index} {...member} />
      ))}
    </div>
  );
}

