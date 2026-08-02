import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

import { cn } from '../lib/utils';

export interface IScrollToTopProps {
  threshold?: number;
  className?: string;
}

export const ScrollToTop: React.FC<IScrollToTopProps> = ({ threshold = 100, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect((): (() => void) => {
    const toggleVisibility = (): void => {
      if (window.pageYOffset > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return (): void => window.removeEventListener('scroll', toggleVisibility);
  }, [threshold]);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className={cn(
            'fixed bottom-8 right-8 z-50 w-14 h-14 flex items-center justify-center',
            'bg-becc-accent text-white rounded-full',
            'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-becc-accent',
            className,
          )}
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{ opacity: 0, scale: 0, y: 100 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <motion.div
            animate={{
              y: [-2, 2, -2],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ArrowUp className="h-8 w-8" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
