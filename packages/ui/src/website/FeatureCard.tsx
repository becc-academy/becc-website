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
      className={cn(
        'p-8 rounded-2xl transition-all duration-300',
        active ? 'bg-[#e95001] text-white shadow-xl' : 'bg-white text-gray-800 shadow-lg',
        className,
      )}
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
        className={cn(
          'w-16 h-16 rounded-full flex items-center justify-center mb-4',
          active ? 'bg-white/20' : 'bg-[#e95001]/10',
        )}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <Icon className={cn('w-8 h-8', active ? 'text-white' : 'text-[#e95001]')} />
      </motion.div>
      <div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className={cn('text-sm leading-relaxed', active ? 'text-white/90' : 'text-gray-600')}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};
