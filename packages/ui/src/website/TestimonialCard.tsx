import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

import { fadeInUp, scaleIn } from '../lib/animations';
import { cn } from '../lib/utils';

export interface ITestimonialCardProps {
  image: string;
  name: string;
  position: string;
  rating: number;
  testimonial: string;
  className?: string;
  delay?: number;
}

export const TestimonialCard: React.FC<ITestimonialCardProps> = ({
  image,
  name,
  position,
  rating,
  testimonial,
  className = '',
  delay = 0,
}) => {
  return (
    <motion.div
      className={cn('p-8 rounded-2xl shadow-lg text-left', className)}
      style={{ backgroundColor: 'var(--surface-color)' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={scaleIn}
      transition={{ delay }}
      whileHover={{
        y: -8,
        boxShadow: '0 20px 40px rgba(233, 80, 1, 0.2)',
      }}
    >
      {/* Header with Image and Rating */}
      <div className="flex items-center justify-between mb-6">
        <motion.img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover border-2"
          style={{ borderColor: 'var(--accent-color)33' }}
          loading="lazy"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
        <motion.div
          className="flex space-x-1"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2 }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.3 + index * 0.1, type: 'spring' }}
            >
              <Star
                className={cn(
                  'w-4 h-4',
                  index < rating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300 fill-gray-300',
                )}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Testimonial Text */}
      <motion.p
        className="text-base leading-relaxed mb-6 italic"
        style={{ color: 'var(--default-color)' }}
        variants={fadeInUp}
        transition={{ delay: delay + 0.3 }}
      >
        &ldquo;{testimonial}&rdquo;
      </motion.p>

      {/* Footer with Name and Role */}
      <motion.div
        className="flex items-center justify-between border-t border-gray-200 pt-4"
        variants={fadeInUp}
        transition={{ delay: delay + 0.4 }}
      >
        <div>
          <h5 className="font-bold text-base" style={{ color: 'var(--heading-color)' }}>
            {name}
          </h5>
          <span className="text-sm" style={{ color: 'var(--default-color)' }}>
            {position}
          </span>
        </div>
        <motion.div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--accent-color)1a' }}
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Quote className="w-5 h-5" style={{ color: 'var(--accent-color)' }} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
