import React from 'react';

import { cn } from '../lib/utils';

export interface IMetricCardProps {
  icon: string;
  value: string | number;
  label: string;
  description?: string;
  suffix?: string;
  prefix?: string;
  animated?: boolean;
  className?: string;
}

export const MetricCard: React.FC<IMetricCardProps> = ({
  icon,
  value,
  label,
  description,
  suffix = '',
  prefix = '',
  animated = false,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1',
        className,
      )}
      data-aos={animated ? 'flip-left' : undefined}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-14 h-14 bg-[#e95001]/10 rounded-full flex items-center justify-center">
          <i className={cn('text-2xl text-[#e95001]', icon)}></i>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">
            {prefix}
            {animated ? (
              <span
                data-purecounter-start="0"
                data-purecounter-end={value}
                data-purecounter-duration="1"
                className="purecounter"
              >
                {value}
              </span>
            ) : (
              value
            )}
            {suffix}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div>
        <h4 className="text-lg font-bold text-gray-900 mb-1">{label}</h4>
        {description && <p className="text-sm text-gray-600 leading-relaxed">{description}</p>}
      </div>
    </div>
  );
};
