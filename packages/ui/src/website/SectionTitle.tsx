import React from 'react';
import { motion } from 'framer-motion';

import { fadeInDown, fadeInUp } from '../lib/animations';
import { cn } from '../lib/utils';

export interface ISectionTitleProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export const SectionTitle: React.FC<ISectionTitleProps> = ({
  title,
  subtitle,
  description,
  centered = true,
  className = '',
}) => {
  return (
    <motion.div
      className={cn('mb-12', centered && 'text-center', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
    >
      {subtitle && (
        <motion.span
          className="inline-block text-[#e95001] font-semibold text-sm uppercase tracking-wider mb-2"
          variants={fadeInDown}
          animate={{
            backgroundImage: [
              'linear-gradient(to right, #e95001 0%, #e95001 100%)',
              'linear-gradient(to right, #e95001 0%, #ff6b1a 50%, #e95001 100%)',
              'linear-gradient(to right, #e95001 0%, #e95001 100%)',
            ],
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        variants={fadeInUp}
        transition={{ delay: 0.1 }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className={cn(
            'text-gray-600 leading-relaxed',
            centered ? 'max-w-3xl mx-auto' : 'max-w-2xl',
          )}
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};
