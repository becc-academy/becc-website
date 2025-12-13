import React from 'react';
import { LucideIcon } from 'lucide-react';

import { cn } from '../lib/utils';

export interface IValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export const ValueCard: React.FC<IValueCardProps> = ({
  icon: Icon,
  title,
  description,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-left',
        className,
      )}
      style={{ backgroundColor: 'var(--surface-color)' }}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: 'var(--accent-color)1a' }}
      >
        <Icon className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
      </div>
      <h4 className="text-xl font-bold mb-2" style={{ color: 'var(--heading-color)' }}>
        {title}
      </h4>
      <p className="text-base leading-relaxed" style={{ color: 'var(--default-color)' }}>
        {description}
      </p>
    </div>
  );
};
