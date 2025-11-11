import React from 'react';
import { cn } from '../lib/utils';

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  description,
  centered = true,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'mb-12',
        centered && 'text-center',
        className
      )}
      data-aos="fade-up"
    >
      {subtitle && (
        <span className="inline-block text-[#e95001] font-semibold text-sm uppercase tracking-wider mb-2">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      {description && (
        <p className={cn(
          'text-gray-600 leading-relaxed',
          centered ? 'max-w-3xl mx-auto' : 'max-w-2xl'
        )}>
          {description}
        </p>
      )}
    </div>
  );
};
