import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Share2, Users } from 'lucide-react';

import { glowHover, scaleIn } from '../lib/animations';
import { cn } from '../lib/utils';

export interface IEventCardProps {
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
  registrationUrl?: string;
  className?: string;
  delay?: number;
}

export const EventCard: React.FC<IEventCardProps> = ({
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
  delay = 0,
}) => {
  const categoryColors = {
    academic: 'bg-blue-500',
    sports: 'bg-green-500',
    arts: 'bg-purple-500',
    community: 'bg-orange-500',
  };

  return (
    <motion.div
      className={cn('rounded-2xl shadow-lg overflow-hidden group', className)}
      style={{ backgroundColor: 'var(--surface-color)' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={scaleIn}
      transition={{ delay }}
      whileHover={{
        y: -8,
        ...glowHover.hover,
      }}
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
        <motion.div
          className="absolute top-4 left-4 bg-white rounded-lg p-3 text-center shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: delay + 0.3, type: 'spring', stiffness: 200 }}
        >
          <div className="text-2xl font-bold" style={{ color: 'var(--accent-color)' }}>
            {date.day}
          </div>
          <div
            className="text-xs font-semibold uppercase"
            style={{ color: 'var(--default-color)' }}
          >
            {date.month}
          </div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="p-6 text-left">
        {/* Category and Time */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={cn(
              'px-3 py-1 rounded-full text-white text-sm font-semibold',
              categoryColors[category.type],
            )}
          >
            {category.label}
          </span>
          <span className="text-base" style={{ color: 'var(--default-color)' }}>
            {time}
          </span>
        </div>

        {/* Title and Description */}
        <h3
          className="text-2xl font-bold mb-2 transition-colors"
          style={{ color: 'var(--heading-color)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--accent-color)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--heading-color)';
          }}
        >
          {title}
        </h3>
        <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--default-color)' }}>
          {description}
        </p>

        {/* Event Info */}
        <div className="space-y-2 mb-4 text-base" style={{ color: 'var(--default-color)' }}>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" style={{ color: 'var(--accent-color)' }} />
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2" style={{ color: 'var(--accent-color)' }} />
            <span>{participants}</span>
          </div>
        </div>

        {/* Footer with Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          {onRegister && (
            <motion.button
              onClick={onRegister}
              className="px-6 py-2 rounded-lg font-semibold transition-colors text-base"
              style={{
                backgroundColor: 'var(--accent-color)',
                color: 'var(--contrast-color)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d14801';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-color)';
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(233, 80, 1, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Register Now
            </motion.button>
          )}
          <div className="flex space-x-2">
            <motion.button
              className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
              style={{ color: 'var(--default-color)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--background-color)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              aria-label="Share event"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
            <motion.button
              className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
              style={{ color: 'var(--default-color)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--background-color)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              aria-label="Save event"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
