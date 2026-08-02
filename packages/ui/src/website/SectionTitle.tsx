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
  descriptionClassName?: string;
}

export const SectionTitle: React.FC<ISectionTitleProps> = ({
  title,
  subtitle,
  description,
  centered = true,
  className = '',
  descriptionClassName = '',
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
          className="mb-1 inline-block text-sm font-semibold uppercase tracking-wider text-becc-accent"
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
        className={cn('mt-0 text-3xl font-bold md:text-4xl', description ? 'mb-4' : 'mb-0')}
        style={{ color: 'var(--heading-color)', marginTop: 0 }}
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
            descriptionClassName,
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
