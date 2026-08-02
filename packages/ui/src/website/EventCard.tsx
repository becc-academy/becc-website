import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart, MapPin, Share2, Users } from 'lucide-react';

import { scaleIn } from '../lib/animations';
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
  onDetails?: () => void;
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
  onDetails,
  className = '',
  delay = 0,
}) => {
  const categoryColors = {
    academic: 'bg-blue-500',
    sports: 'bg-green-500',
    arts: 'bg-purple-500',
    community: 'bg-becc-accent',
  };

  return (
    <motion.div
      className={cn(
        'group flex h-full flex-col rounded-[2rem] border border-black/5 p-3 shadow-[0_18px_45px_rgba(20,24,32,0.10)]',
        onDetails && 'cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-becc-accent',
        className,
      )}
      style={{ backgroundColor: 'var(--surface-color)' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={scaleIn}
      transition={{ delay }}
      whileHover={{
        y: -3,
        boxShadow: '0 18px 38px rgba(20, 24, 32, 0.12)',
      }}
      onClick={onDetails}
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden rounded-[1.5rem]">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <span
          className={cn(
            'absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm',
            categoryColors[category.type],
          )}
        >
          {category.label}
        </span>
      </div>

      {/* Content Section */}
      <div className="grid flex-1 grid-cols-[5.25rem_1fr] gap-4 px-3 pb-3 pt-5 text-left">
        <div className="flex flex-col items-center border-r border-black/15 pr-4 text-center">
          <span className="text-lg font-semibold uppercase tracking-wide" style={{ color: 'var(--heading-color)' }}>
            {date.month}
          </span>
          <span className="text-5xl font-bold leading-none" style={{ color: 'var(--accent-color)' }}>
            {date.day}
          </span>
        </div>

        <div className="flex min-w-0 flex-col">
          <div className="mb-1 flex items-center gap-1.5 text-sm" style={{ color: 'var(--default-color)' }}>
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
          <h3 className="mb-1 text-2xl font-bold leading-tight" style={{ color: 'var(--heading-color)' }}>
            {title}
          </h3>
          <p className="mb-3 line-clamp-2 text-sm leading-relaxed" style={{ color: 'var(--default-color)' }}>
            {description}
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-xs" style={{ color: 'var(--default-color)' }}>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {time}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {participants}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            {onRegister ? (
              <motion.button
                onClick={(event) => {
                  event.stopPropagation();
                  onRegister();
                }}
                className="rounded-full px-4 py-2 text-sm font-semibold"
                style={{ backgroundColor: 'var(--accent-color)', color: 'var(--contrast-color)' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Register
              </motion.button>
            ) : (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onDetails?.();
                }}
                className="text-xs font-medium"
                style={{ color: 'var(--accent-color)' }}
              >
                Event details
              </button>
            )}
            <div className="flex gap-1">
            <motion.button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
              style={{ color: 'var(--default-color)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--background-color)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              aria-label="Share event"
              onClick={(event) => event.stopPropagation()}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
            <motion.button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
              style={{ color: 'var(--default-color)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--background-color)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              aria-label="Save event"
              onClick={(event) => event.stopPropagation()}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="w-4 h-4" />
            </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
