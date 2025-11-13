import React from 'react';
import { LucideIcon } from 'lucide-react';

import { cn } from '../lib/utils';

export interface IFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  active?: boolean;
  className?: string;
}

export const FeatureCard: React.FC<IFeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  active = false,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'p-8 rounded-2xl transition-all duration-300',
        active
          ? 'bg-[#e95001] text-white shadow-xl'
          : 'bg-white text-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-1',
        className,
      )}
    >
      <div
        className={cn(
          'w-16 h-16 rounded-full flex items-center justify-center mb-4',
          active ? 'bg-white/20' : 'bg-[#e95001]/10',
        )}
      >
        <Icon className={cn('w-8 h-8', active ? 'text-white' : 'text-[#e95001]')} />
      </div>
      <div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className={cn('text-sm leading-relaxed', active ? 'text-white/90' : 'text-gray-600')}>
          {description}
        </p>
      </div>
    </div>
  );
};
