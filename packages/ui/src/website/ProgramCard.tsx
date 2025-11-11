import React from 'react';

import { cn } from '../lib/utils';

export interface IProgramCardProps {
  image: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  badge?: string;
  stats?: {
    students?: string;
    successRate?: string;
  };
  onLearnMore?: () => void;
  className?: string;
}

export const ProgramCard: React.FC<IProgramCardProps> = ({
  image,
  title,
  description,
  duration,
  level,
  badge,
  stats,
  onLearnMore,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden',
        className,
      )}
    >
      {/* Image Section */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" loading="lazy" />
        {badge && (
          <div className="absolute top-4 right-4 bg-[#e95001] text-white px-3 py-1 rounded-full text-xs font-semibold">
            {badge}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Program Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          {stats && (
            <div className="flex items-center space-x-4 text-xs text-gray-600">
              {stats.students && (
                <span className="flex items-center">
                  <i className="bi bi-people-fill mr-1"></i> {stats.students}
                </span>
              )}
              {stats.successRate && (
                <span className="flex items-center">
                  <i className="bi bi-award-fill mr-1"></i> {stats.successRate}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{description}</p>

        {/* Meta Information */}
        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <i className="bi bi-calendar-check mr-1"></i>
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <i className="bi bi-mortarboard-fill mr-1"></i>
            <span>{level}</span>
          </div>
        </div>

        {/* Action Button */}
        {onLearnMore && (
          <button
            onClick={onLearnMore}
            className="w-full py-3 px-4 bg-[#e95001] text-white rounded-lg font-semibold hover:bg-[#d14801] transition-colors flex items-center justify-center"
          >
            Discover Program
            <i className="bi bi-arrow-right ml-2"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export interface IProgramItemProps {
  image: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  className?: string;
}

export const ProgramItem: React.FC<IProgramItemProps> = ({
  image,
  title,
  description,
  duration,
  level,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center space-x-4',
        className,
      )}
    >
      {/* Icon/Image */}
      <div className="flex-shrink-0">
        <img src={image} alt={title} className="w-20 h-20 object-cover rounded-lg" loading="lazy" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h4 className="text-base font-bold text-gray-900 mb-1">{title}</h4>
        <p className="text-xs text-gray-600 leading-relaxed mb-2">{description}</p>
        <div className="flex items-center space-x-3 text-xs text-gray-500">
          <span>{duration}</span>
          <span>•</span>
          <span>{level}</span>
        </div>
      </div>

      {/* Arrow */}
      <div className="flex-shrink-0">
        <i className="bi bi-arrow-right text-[#e95001] text-xl"></i>
      </div>
    </div>
  );
};
