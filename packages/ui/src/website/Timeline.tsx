import React from 'react';
import { cn } from '../lib/utils';

export interface TimelineItem {
  year: string;
  title?: string;
  description: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  className = '',
}) => {
  return (
    <div className={cn('space-y-6', className)}>
      {items.map((item, index) => (
        <div key={index} className="flex gap-4 group">
          {/* Timeline Dot */}
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-[#e95001] ring-4 ring-[#e95001]/20 group-hover:ring-[#e95001]/40 transition-all duration-300" />
            {index < items.length - 1 && (
              <div className="w-0.5 h-full bg-gradient-to-b from-[#e95001] to-gray-200 mt-2" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h4 className="text-lg font-bold text-[#e95001] mb-1">{item.year}</h4>
              {item.title && (
                <h5 className="font-semibold text-gray-900 mb-2">{item.title}</h5>
              )}
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
