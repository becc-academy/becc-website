import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

import { fadeInUp, glowHover, hoverScale } from '../lib/animations';
import { cn } from '../lib/utils';

export interface IFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  active?: boolean;
  className?: string;
  delay?: number;
}

export const FeatureCard: React.FC<IFeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  active = false,
  className = '',
  delay = 0,
}) => {
  return (
    <motion.div
      className={cn('p-8 rounded-2xl transition-all duration-300 text-left shadow-lg', className)}
      style={{
        backgroundColor: 'var(--surface-color)',
        color: 'var(--default-color)',
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      transition={{ delay }}
      whileHover={{
        ...hoverScale.hover,
        ...(active ? {} : glowHover.hover),
        y: -5,
      }}
    >
      <motion.div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: 'var(--accent-color)1a' }}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <Icon className="w-8 h-8" style={{ color: 'var(--accent-color)' }} />
      </motion.div>
      <div>
        <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--heading-color)' }}>
          {title}
        </h3>
        <p className="text-base leading-relaxed" style={{ color: 'var(--default-color)' }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};
