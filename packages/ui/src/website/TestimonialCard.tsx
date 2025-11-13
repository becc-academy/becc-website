import React from 'react';
import { Quote, Star } from 'lucide-react';

import { cn } from '../lib/utils';

export interface ITestimonialCardProps {
  image: string;
  name: string;
  position: string;
  rating: number;
  testimonial: string;
  className?: string;
}

export const TestimonialCard: React.FC<ITestimonialCardProps> = ({
  image,
  name,
  position,
  rating,
  testimonial,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300',
        className,
      )}
    >
      {/* Header with Image and Rating */}
      <div className="flex items-center justify-between mb-6">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
          loading="lazy"
        />
        <div className="flex space-x-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={cn(
                'w-4 h-4',
                index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300',
              )}
            />
          ))}
        </div>
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
        &ldquo;{testimonial}&rdquo;
      </p>

      {/* Footer with Name and Role */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <div>
          <h5 className="font-bold text-gray-900 text-base">{name}</h5>
          <span className="text-sm text-gray-500">{position}</span>
        </div>
        <div className="w-10 h-10 bg-[#e95001]/10 rounded-full flex items-center justify-center">
          <Quote className="w-5 h-5 text-[#e95001]" />
        </div>
      </div>
    </div>
  );
};
