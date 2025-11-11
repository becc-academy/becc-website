import React from 'react';
import { cn } from '../lib/utils';

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroProps {
  title: string;
  description: string;
  stats?: HeroStat[];
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

export const Hero: React.FC<HeroProps> = ({
  title,
  description,
  stats,
  primaryButton,
  secondaryButton,
  images,
  className = '',
}) => {
  return (
    <section className={cn('py-20 bg-gradient-to-br from-gray-50 to-white', className)}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8" data-aos="fade-right" data-aos-delay="100">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {title}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {description}
            </p>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="flex flex-wrap gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-[#e95001]">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            {(primaryButton || secondaryButton) && (
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

          {/* Image Grid */}
          {images && images.length > 0 && (
            <div className="grid grid-cols-2 gap-4" data-aos="zoom-in" data-aos-delay="200">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={image}
                    alt={`Hero image ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading={index < 2 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
