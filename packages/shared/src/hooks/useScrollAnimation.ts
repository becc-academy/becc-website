import { useEffect } from 'react';

export interface ScrollAnimationOptions {
  duration?: number;
  delay?: number;
  offset?: number;
  once?: boolean;
}

/**
 * Hook to trigger animations on scroll
 */
export const useScrollAnimation = (options: ScrollAnimationOptions = {}): void => {
  const { duration = 1000, delay = 0, offset = 100, once = true } = options;

  useEffect(() => {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const animationDelay = element.getAttribute('data-aos-delay') || delay.toString();
            
            setTimeout(() => {
              element.classList.add('aos-animate');
            }, parseInt(animationDelay));

            if (once) {
              observer.unobserve(element);
            }
          } else if (!once) {
            entry.target.classList.remove('aos-animate');
          }
        });
      },
      {
        rootMargin: `0px 0px -${offset}px 0px`,
        threshold: 0.1,
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [duration, delay, offset, once]);
};
