import React from 'react';
import { cn } from '../lib/utils';

export interface EventCardProps {
  image: string;
  date: {
    day: string;
    month: string;
  };
  category: {
    label: string;
    type: 'academic' | 'sports' | 'arts' | 'community';
  };
  time: string;
  title: string;
  description: string;
  location: string;
  participants: string;
  onRegister?: () => void;
  className?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  image,
  date,
  category,
  time,
  title,
  description,
  location,
  participants,
  onRegister,
  className = '',
}) => {
  const categoryColors = {
    academic: 'bg-blue-500',
    sports: 'bg-green-500',
    arts: 'bg-purple-500',
    community: 'bg-orange-500',
  };

  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group',
        className
      )}
      data-aos="zoom-in"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Date Overlay */}
        <div className="absolute top-4 left-4 bg-white rounded-lg p-3 text-center shadow-lg">
          <div className="text-2xl font-bold text-[#e95001]">{date.day}</div>
          <div className="text-xs font-semibold text-gray-600 uppercase">
            {date.month}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Category and Time */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={cn(
              'px-3 py-1 rounded-full text-white text-xs font-semibold',
              categoryColors[category.type]
            )}
          >
            {category.label}
          </span>
          <span className="text-sm text-gray-600">{time}</span>
        </div>

        {/* Title and Description */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#e95001] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {description}
        </p>

        {/* Event Info */}
        <div className="space-y-2 mb-4 text-sm text-gray-700">
          <div className="flex items-center">
            <i className="bi bi-geo-alt text-[#e95001] mr-2"></i>
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <i className="bi bi-people text-[#e95001] mr-2"></i>
            <span>{participants}</span>
          </div>
        </div>

        {/* Footer with Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          {onRegister && (
            <button
              onClick={onRegister}
              className="px-6 py-2 bg-[#e95001] text-white rounded-lg font-semibold hover:bg-[#d14801] transition-colors text-sm"
            >
              Register Now
            </button>
          )}
          <div className="flex space-x-2">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Share event"
            >
              <i className="bi bi-share text-gray-600"></i>
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Save event"
            >
              <i className="bi bi-heart text-gray-600"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
