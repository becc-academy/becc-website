import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Target } from 'lucide-react';

import { cn } from '../lib/utils';

import { ITab, TabbedCard } from './TabbedCard';

export interface IAboutSectionProps {
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

export const AboutSection: React.FC<IAboutSectionProps> = ({
  eyebrow,
  title,
  description,
  image,
  mission,
  vision,
  className = '',
}) => {
  const descriptions = Array.isArray(description) ? description : [description];

  // Prepare tabs for mission and vision
  const tabs: ITab[] = [];
  if (mission) {
    tabs.push({
      id: 'mission',
      label: 'Mission',
      icon: Target,
      title: mission.title,
      description: mission.description,
    });
  }
  if (vision) {
    tabs.push({
      id: 'vision',
      label: 'Vision',
      icon: Eye,
      title: vision.title,
      description: vision.description,
    });
  }

  return (
    <section className={cn('py-20 bg-gradient-to-b from-white to-gray-50', className)}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {eyebrow && (
              <div className="inline-block">
                <span className="px-4 py-2 bg-gradient-to-r from-[#e95001] to-[#d14801] text-white text-sm font-semibold rounded-full shadow-lg">
                  {eyebrow}
                </span>
              </div>
            )}

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">{title}</h2>

            <div className="space-y-6">
              {descriptions.map((desc, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-gray-700 text-lg leading-relaxed relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-gradient-to-br before:from-[#e95001] before:to-[#d14801] before:rounded-full"
                >
                  {desc}
                </motion.p>
              ))}
            </div>

            {/* Decorative line */}
            <div className="flex items-center space-x-3">
              <div className="h-1 w-16 bg-gradient-to-r from-[#e95001] to-[#d14801] rounded-full" />
              <div className="h-1 w-8 bg-gradient-to-r from-[#d14801] to-transparent rounded-full" />
              <div className="h-1 w-4 bg-gradient-to-r from-[#d14801] to-transparent rounded-full opacity-50" />
            </div>
          </motion.div>

          {/* Image and Mission/Vision Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {image && (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#e95001]/20 to-[#d14801]/20 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            )}

            {tabs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <TabbedCard tabs={tabs} />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
