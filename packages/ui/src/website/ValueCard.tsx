import React from 'react';

import { cn } from '../lib/utils';

export interface IValueCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

export const ValueCard: React.FC<IValueCardProps> = ({
  icon,
  title,
  description,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2',
        className,
      )}
    >
      <div className="w-14 h-14 bg-[#e95001]/10 rounded-full flex items-center justify-center mb-4">
        <i className={cn('text-2xl text-[#e95001]', icon)}></i>
      </div>
      <h4 className="text-lg font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};
