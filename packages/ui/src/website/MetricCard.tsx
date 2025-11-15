import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

import { fadeInUp, glowPulse } from '../lib/animations';
import { cn } from '../lib/utils';

export interface IMetricCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  description?: string;
  suffix?: string;
  prefix?: string;
  animated?: boolean;
  className?: string;
  delay?: number;
}

export const MetricCard: React.FC<IMetricCardProps> = ({
  icon: Icon,
  value,
  label,
  description,
  suffix = '',
  prefix = '',
  animated = true,
  className = '',
  delay = 0,
}) => {
  const [count, setCount] = useState(0);
  const numericValue =
    typeof value === 'number' ? value : parseInt(value.toString().replace(/\D/g, ''), 10) || 0;

  useEffect(() => {
    if (animated && numericValue > 0) {
      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    } else {
      setCount(numericValue);
      return undefined;
    }
  }, [animated, numericValue]);

  return (
    <motion.div
      className={cn('bg-white p-6 rounded-2xl shadow-lg', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      transition={{ delay }}
      whileHover={{
        y: -8,
        boxShadow: '0 20px 40px rgba(233, 80, 1, 0.2)',
      }}
      {...(animated && glowPulse)}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <motion.div
          className="w-14 h-14 bg-[#e95001]/10 rounded-full flex items-center justify-center"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="w-6 h-6 text-[#e95001]" />
        </motion.div>
        <div className="text-right">
          <motion.div
            className="text-3xl font-bold text-gray-900"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.3, type: 'spring' }}
          >
            {prefix}
            {animated && numericValue > 0 ? count : value}
            {suffix}
          </motion.div>
        </div>
      </div>

      {/* Info Section */}
      <div>
        <motion.h4
          className="text-lg font-bold text-gray-900 mb-1"
          variants={fadeInUp}
          transition={{ delay: delay + 0.1 }}
        >
          {label}
        </motion.h4>
        {description && (
          <motion.p
            className="text-sm text-gray-600 leading-relaxed"
            variants={fadeInUp}
            transition={{ delay: delay + 0.2 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};
