import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '../lib/utils';

export interface ISlideItem {
  id: string | number;
  title: string;
  description?: string;
  image?: string;
  cta?: {
    label: string;
    href: string;
  };
}

export interface ISliderProps {
  slides: ISlideItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showNavigation?: boolean;
  className?: string;
}

export const Slider: React.FC<ISliderProps> = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  showIndicators = true,
  showNavigation = true,
  className = '',
}): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play functionality
  useEffect((): (() => void) | undefined => {
    if (!autoPlay || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return (): void => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, slides.length]);

  const goToSlide = (index: number): void => {
    setCurrentIndex(index);
  };

  const goToPrevious = (): void => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = (): void => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  return (
    <div className={cn('relative w-full overflow-hidden rounded-2xl group', className)}>
      {/* Static gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e95001] via-[#d14801] to-[#b83d01]" />

      {/* Slides */}
      <div className="relative min-h-[400px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center p-8 md:p-12"
          >
            <div className="container mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Content */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-white"
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                    {currentSlide.title}
                  </h2>
                  {currentSlide.description && (
                    <p className="text-lg md:text-xl mb-6 text-white/90 drop-shadow">
                      {currentSlide.description}
                    </p>
                  )}
                  {currentSlide.cta && (
                    <a
                      href={currentSlide.cta.href}
                      className="inline-block px-8 py-4 bg-white text-[#e95001] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      {currentSlide.cta.label}
                    </a>
                  )}
                </motion.div>

                {/* Image */}
                {currentSlide.image && (
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="relative"
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                      <img
                        src={currentSlide.image}
                        alt={currentSlide.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Glasmorphism overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {showNavigation && slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-300',
                index === currentIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75',
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
