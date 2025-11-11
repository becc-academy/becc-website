import React from 'react';
import { motion } from 'framer-motion';

import { cn } from '../lib/utils';

export interface IHeroStat {
  value: string;
  label: string;
}

export interface IHeroProps {
  title: string;
  description: string;
  stats?: IHeroStat[];
  primaryButton?: {
    label: string;
    href: string;
  };
  secondaryButton?: {
    label: string;
    href: string;
  };
  images?: string[];
  className?: string;
}

export const Hero: React.FC<IHeroProps> = ({
  title,
  description,
  stats,
  primaryButton,
  secondaryButton,
  images,
  className = '',
}): JSX.Element => {
  return (
    <section className={cn('py-20 bg-gradient-to-br from-gray-50 to-white', className)}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <style>{`
            @keyframes circular-motion-1 {
              0%, 100% { transform: translate(0, 0) scale(1); }
              25% { transform: translate(5px, -5px) scale(1.05); }
              50% { transform: translate(10px, 0) scale(1.1); }
              75% { transform: translate(5px, 5px) scale(1.05); }
            }
            
            @keyframes circular-motion-2 {
              0%, 100% { transform: translate(0, 0) scale(1); }
              25% { transform: translate(-5px, 5px) scale(1.05); }
              50% { transform: translate(-10px, 0) scale(1.1); }
              75% { transform: translate(-5px, -5px) scale(1.05); }
            }
            
            @keyframes circular-motion-3 {
              0%, 100% { transform: translate(0, 0) scale(1); }
              25% { transform: translate(5px, 5px) scale(1.05); }
              50% { transform: translate(0, 10px) scale(1.1); }
              75% { transform: translate(-5px, 5px) scale(1.05); }
            }
            
            @keyframes circular-motion-4 {
              0%, 100% { transform: translate(0, 0) scale(1); }
              25% { transform: translate(-5px, -5px) scale(1.05); }
              50% { transform: translate(0, -10px) scale(1.1); }
              75% { transform: translate(5px, -5px) scale(1.05); }
            }
            
            .animate-circular-1 { animation: circular-motion-1 8s ease-in-out infinite; }
            .animate-circular-2 { animation: circular-motion-2 8s ease-in-out infinite 2s; }
            .animate-circular-3 { animation: circular-motion-3 8s ease-in-out infinite 4s; }
            .animate-circular-4 { animation: circular-motion-4 8s ease-in-out infinite 6s; }
          `}</style>
          {/* Content */}
          <div className="space-y-8" data-aos="fade-right" data-aos-delay="100">
            {}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {title}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">{description}</p>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="flex flex-wrap gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-[#e95001]">{stat.value}</div>
                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            {(primaryButton ?? secondaryButton) && (
              <div className="flex flex-wrap gap-4">
                {primaryButton && (
                  <a
                    href={primaryButton.href}
                    className="px-8 py-4 bg-[#e95001] text-white rounded-lg font-semibold hover:bg-[#d14801] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                  >
                    {primaryButton.label}
                  </a>
                )}
                {secondaryButton && (
                  <a
                    href={secondaryButton.href}
                    className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                  >
                    {secondaryButton.label}
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Image Grid with Animations */}
          {images && images.length > 0 && (
            <div className="grid grid-cols-2 gap-6" data-aos="zoom-in" data-aos-delay="200">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={cn(
                    'rounded-2xl overflow-hidden shadow-xl relative group',
                    `animate-circular-${index + 1}`,
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#e95001]/20 to-[#d14801]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <img
                    src={image}
                    alt={`BECC Academy student learning ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading={index < 2 ? 'eager' : 'lazy'}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
