import React from 'react';
import { cn } from '../lib/utils';

export interface AboutSectionProps {
  eyebrow?: string;
  title: string;
  description: string | string[];
  image?: string;
  mission?: {
    title: string;
    description: string;
  };
  vision?: {
    title: string;
    description: string;
  };
  className?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  eyebrow,
  title,
  description,
  image,
  mission,
  vision,
  className = '',
}) => {
  const descriptions = Array.isArray(description) ? description : [description];

  return (
    <section className={cn('py-16 bg-white', className)}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6" data-aos="fade-up" data-aos-delay="200">
            {eyebrow && (
              <h3 className="text-[#e95001] font-semibold text-lg">{eyebrow}</h3>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {title}
            </h2>
            <div className="space-y-4">
              {descriptions.map((desc, index) => (
                <p key={index} className="text-gray-600 leading-relaxed">
                  {desc}
                </p>
              ))}
            </div>
          </div>

          {/* Image and Mission/Vision */}
          <div className="space-y-6" data-aos="zoom-in" data-aos-delay="300">
            {image && (
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            )}

            {(mission || vision) && (
              <div className="space-y-4" data-aos="fade-up" data-aos-delay="400">
                {mission && (
                  <div className="bg-gradient-to-br from-[#e95001]/5 to-[#e95001]/10 p-6 rounded-xl border border-[#e95001]/20">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {mission.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {mission.description}
                    </p>
                  </div>
                )}

                {vision && (
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {vision.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {vision.description}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
