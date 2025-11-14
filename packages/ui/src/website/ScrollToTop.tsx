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
            'bg-gradient-to-br from-[#ff6b35] via-[#e95001] to-[#d14801] text-white rounded-full',
            'shadow-[0_8px_16px_rgba(233,80,1,0.3),0_4px_8px_rgba(233,80,1,0.2),inset_0_2px_4px_rgba(255,255,255,0.3)]',
            'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#e95001]',
            'before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-white/20 before:to-transparent',
            className,
          )}
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            boxShadow: [
              '0 8px 16px rgba(233,80,1,0.3), 0 4px 8px rgba(233,80,1,0.2)',
              '0 12px 24px rgba(233,80,1,0.5), 0 6px 12px rgba(233,80,1,0.3)',
              '0 8px 16px rgba(233,80,1,0.3), 0 4px 8px rgba(233,80,1,0.2)',
            ],
          }}
          exit={{ opacity: 0, scale: 0, y: 100 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          whileHover={{
            scale: 1.15,
            boxShadow: '0 16px 32px rgba(233,80,1,0.6), 0 8px 16px rgba(233,80,1,0.4)',
          }}
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
            <ArrowUp className="w-8 h-8 relative z-10 drop-shadow-sm" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
