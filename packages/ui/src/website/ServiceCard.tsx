import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, LucideIcon } from 'lucide-react';

import { fadeInUp, glowHover, staggerItem } from '../lib/animations';
import { cn } from '../lib/utils';

export interface IServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features?: string[];
  link?: {
    label: string;
    href: string;
  };
  className?: string;
  delay?: number;
}

export const ServiceCard: React.FC<IServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  features,
  link,
  className = '',
  delay = 0,
}) => {
  return (
    <motion.div
      className={cn('p-8 rounded-2xl shadow-lg group text-left', className)}
      style={{ backgroundColor: 'var(--surface-color)' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      transition={{ delay }}
      whileHover={{
        y: -8,
        ...glowHover.hover,
      }}
    >
      {/* Icon */}
      <motion.div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        style={{
          background: `linear-gradient(to bottom right, var(--accent-color), #d14801)`,
        }}
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
      >
        <Icon className="w-8 h-8" style={{ color: 'var(--contrast-color)' }} />
      </motion.div>

      {/* Content */}
      <motion.h3
        className="text-2xl font-bold mb-3"
        style={{ color: 'var(--heading-color)' }}
        variants={staggerItem}
      >
        {title}
      </motion.h3>
      <motion.p
        className="text-base leading-relaxed mb-4"
        style={{ color: 'var(--default-color)' }}
        variants={staggerItem}
      >
        {description}
      </motion.p>

      {/* Features List */}
      {features && features.length > 0 && (
        <motion.ul
          className="space-y-2 mb-6"
          initial="hidden"
          whileInView="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {features.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-start text-base"
              style={{ color: 'var(--default-color)' }}
              variants={staggerItem}
            >
              <CheckCircle
                className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                style={{ color: 'var(--accent-color)' }}
              />
              <span>{feature}</span>
            </motion.li>
          ))}
        </motion.ul>
      )}

      {/* Link */}
      {link && (
        <motion.a
          href={link.href}
          className="inline-flex items-center font-semibold transition-colors group"
          style={{ color: 'var(--accent-color)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#d14801';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--accent-color)';
          }}
          whileHover={{ x: 5 }}
        >
          {link.label}
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </motion.a>
      )}
    </motion.div>
  );
};
