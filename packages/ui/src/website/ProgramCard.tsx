import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Calendar, GraduationCap, Users } from 'lucide-react';

import { fadeInUp, glowHover, hoverScale } from '../lib/animations';
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
  delay?: number;
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
  delay = 0,
}) => {
  return (
    <motion.div
      className={cn('bg-white rounded-2xl shadow-lg overflow-hidden', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      transition={{ delay }}
      whileHover={{
        ...hoverScale.hover,
        ...glowHover.hover,
        y: -8,
      }}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
          loading="lazy"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        {badge && (
          <motion.div
            className="absolute top-4 right-4 bg-[#e95001] text-white px-3 py-1 rounded-full text-xs font-semibold"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: delay + 0.3, type: 'spring' }}
          >
            {badge}
          </motion.div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 text-left">
        {/* Program Header */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          {stats && (
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              {stats.students && (
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1" /> {stats.students}
                </span>
              )}
              {stats.successRate && (
                <span className="flex items-center">
                  <Award className="w-4 h-4 mr-1" /> {stats.successRate}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-base text-gray-600 leading-relaxed mb-4">{description}</p>

        {/* Meta Information */}
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <GraduationCap className="w-4 h-4 mr-1" />
            <span>{level}</span>
          </div>
        </div>

        {/* Action Button */}
        {onLearnMore && (
          <motion.button
            onClick={onLearnMore}
            className="w-full py-3 px-4 bg-[#e95001] text-white rounded-lg font-semibold hover:bg-[#d14801] transition-colors flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Discover Program
            <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ArrowRight className="w-4 h-4 ml-2" />
            </motion.div>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export interface IProgramItemProps {
  image: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  className?: string;
  delay?: number;
}

export const ProgramItem: React.FC<IProgramItemProps> = ({
  image,
  title,
  description,
  duration,
  level,
  className = '',
  delay = 0,
}) => {
  return (
    <motion.div
      className={cn(
        'bg-white p-4 rounded-xl shadow-md flex items-center space-x-4 text-left',
        className,
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      transition={{ delay }}
      whileHover={{ y: -4, ...glowHover.hover }}
    >
      {/* Icon/Image */}
      <div className="flex-shrink-0">
        <img src={image} alt={title} className="w-20 h-20 object-cover rounded-lg" loading="lazy" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h4 className="text-lg font-bold text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-600 leading-relaxed mb-2">{description}</p>
        <div className="flex items-center space-x-3 text-sm text-gray-500">
          <span>{duration}</span>
          <span>•</span>
          <span>{level}</span>
        </div>
      </div>

      {/* Arrow */}
      <motion.div
        className="flex-shrink-0"
        animate={{ x: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ArrowRight className="w-5 h-5 text-[#e95001]" />
      </motion.div>
    </motion.div>
  );
};
