import React from 'react';

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
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            data-aos="fade-up"
          >
            {title}
          </h2>

          {description && (
            <p
              className="text-lg text-white/90 mb-8 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {description}
            </p>
          )}

          {(primaryButton ?? secondaryButton) && (
            <div
              className="flex flex-wrap justify-center gap-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {primaryButton && (
                <a
                  href={primaryButton.href}
                  onClick={primaryButton.onClick}
                  className="px-8 py-4 bg-white text-[#e95001] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  {primaryButton.label}
                </a>
              )}

              {secondaryButton && (
                <a
                  href={secondaryButton.href}
                  onClick={secondaryButton.onClick}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#e95001] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  {secondaryButton.label}
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
    </section>
  );
};
