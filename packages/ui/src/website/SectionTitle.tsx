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
          className="inline-block text-becc-accent font-semibold text-sm uppercase tracking-wider mb-2"
          variants={fadeInDown}
          animate={{
            backgroundImage: [
              'linear-gradient(to right, var(--accent-color) 0%, var(--accent-color) 100%)',
              'linear-gradient(to right, var(--accent-color) 0%, var(--accent-color) 50%, var(--accent-color) 100%)',
              'linear-gradient(to right, var(--accent-color) 0%, var(--accent-color) 100%)',
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
        className="text-3xl md:text-4xl font-bold mb-4"
        style={{ color: 'var(--heading-color)' }}
        variants={fadeInUp}
        transition={{ delay: 0.1 }}
      >
        {title}
      </motion.h2>
          {description && (
        <motion.p
          className={cn(
            'leading-relaxed',
            centered ? 'max-w-3xl mx-auto' : 'max-w-2xl',
          )}
          style={{ color: 'var(--default-color)' }}
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};
