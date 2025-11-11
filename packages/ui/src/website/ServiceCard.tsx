import React from 'react';

import { cn } from '../lib/utils';

export interface IServiceCardProps {
  icon: string;
  title: string;
  description: string;
  features?: string[];
  link?: {
    label: string;
    href: string;
  };
  className?: string;
}

export const ServiceCard: React.FC<IServiceCardProps> = ({
  icon,
  title,
  description,
  features,
  link,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group',
        className,
      )}
    >
      {/* Icon */}
      <div className="w-16 h-16 bg-gradient-to-br from-[#e95001] to-[#d14801] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <i className={cn('text-3xl text-white', icon)}></i>
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-4">{description}</p>

      {/* Features List */}
      {features && features.length > 0 && (
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm text-gray-700">
              <i className="bi bi-check-circle-fill text-[#e95001] mr-2 mt-0.5 flex-shrink-0"></i>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Link */}
      {link && (
        <a
          href={link.href}
          className="inline-flex items-center text-[#e95001] font-semibold hover:text-[#d14801] transition-colors group"
        >
          {link.label}
          <i className="bi bi-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
        </a>
      )}
    </div>
  );
};
