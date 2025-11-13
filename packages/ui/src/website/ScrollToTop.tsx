import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

import { cn } from '../lib/utils';

export interface IScrollToTopProps {
  threshold?: number;
  className?: string;
}

export const ScrollToTop: React.FC<IScrollToTopProps> = ({
  threshold = 100,
  className = '',
}): JSX.Element => {
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
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-8 right-8 z-50 w-14 h-14 flex items-center justify-center',
        'bg-gradient-to-br from-[#ff6b35] via-[#e95001] to-[#d14801] text-white rounded-full',
        'shadow-[0_8px_16px_rgba(233,80,1,0.3),0_4px_8px_rgba(233,80,1,0.2),inset_0_2px_4px_rgba(255,255,255,0.3)]',
        'hover:shadow-[0_12px_24px_rgba(233,80,1,0.4),0_6px_12px_rgba(233,80,1,0.3),inset_0_2px_4px_rgba(255,255,255,0.4)]',
        'hover:scale-110 active:scale-95',
        'transition-all duration-300 ease-out',
        'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#e95001]',
        'before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none',
        className,
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-8 h-8 relative z-10 drop-shadow-sm" />
    </button>
  );
};
