import React from 'react';
import { motion } from 'framer-motion';

import { cardHover, fadeInUp, glowHover } from '../lib/animations';

export interface ICardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  glow?: boolean;
  delay?: number;
}

export const Card: React.FC<ICardProps> = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
  glow = false,
  delay = 0,
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-lg ${paddingStyles[padding]} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      transition={{ delay }}
      {...(hover && { initial: 'rest', whileHover: 'hover', variants: cardHover })}
      {...(glow && { whileHover: glowHover.hover })}
    >
      {children}
    </motion.div>
  );
};
