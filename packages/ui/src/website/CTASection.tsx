import React from 'react';
import { motion } from 'framer-motion';

import { fadeInUp, glowPulse } from '../lib/animations';
import { cn } from '../lib/utils';

export interface ICTASectionProps {
  title: string;
  description?: string;
  primaryButton?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  secondaryButton?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  backgroundImage?: string;
  className?: string;
}

export const CTASection: React.FC<ICTASectionProps> = ({
  title,
  description,
  primaryButton,
  secondaryButton,
  backgroundImage,
  className = '',
}) => {
  return (
    <section className={cn('relative py-20 overflow-hidden', className)}>
      {/* Background */}
      {backgroundImage ? (
        <div className="absolute inset-0">
          <img src={backgroundImage} alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#e95001]/95 to-[#d14801]/95"></div>
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-[#e95001] to-[#d14801]"></div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            variants={fadeInUp}
          >
            {title}
          </motion.h2>

          {description && (
            <motion.p
              className="text-lg text-white/90 mb-8 leading-relaxed"
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
            >
              {description}
            </motion.p>
          )}

          {(primaryButton ?? secondaryButton) && (
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              {primaryButton && (
                <motion.a
                  href={primaryButton.href}
                  onClick={primaryButton.onClick}
                  className="px-8 py-4 bg-white text-[#e95001] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  {...glowPulse}
                >
                  {primaryButton.label}
                </motion.a>
              )}

              {secondaryButton && (
                <motion.a
                  href={secondaryButton.href}
                  onClick={secondaryButton.onClick}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#e95001] transition-all duration-300 shadow-lg"
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    backgroundColor: 'white',
                    color: '#e95001',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {secondaryButton.label}
                </motion.a>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </section>
  );
};
