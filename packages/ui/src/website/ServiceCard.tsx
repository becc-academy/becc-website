import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, LucideIcon } from 'lucide-react';

import { fadeInUp, staggerItem } from '../lib/animations';
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
      className={cn('group flex h-full flex-col rounded-2xl p-7 text-left shadow-lg', className)}
      style={{ backgroundColor: 'var(--surface-color)' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      transition={{ delay }}
      whileHover={{
        y: -4,
        boxShadow: '0 14px 30px rgba(20, 24, 32, 0.10)',
      }}
    >
      {/* Icon */}
      <motion.div
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
        style={{
          background: 'var(--accent-color)',
        }}
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
      >
        <Icon className="w-8 h-8" style={{ color: 'var(--contrast-color)' }} />
      </motion.div>

      {/* Content */}
      <motion.h3
        className="mb-2 text-2xl font-bold"
        style={{ color: 'var(--heading-color)' }}
        variants={staggerItem}
      >
        {title}
      </motion.h3>
      <motion.p
        className="mb-3 text-base leading-relaxed"
        style={{ color: 'var(--default-color)' }}
        variants={staggerItem}
      >
        {description}
      </motion.p>

      {/* Features List */}
      {features && features.length > 0 && (
        <motion.ul
          className="mb-4 space-y-2"
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
          className="group mt-auto inline-flex items-center self-start pt-2 font-semibold transition-colors"
          style={{ color: 'var(--accent-color)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--accent-color)';
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
