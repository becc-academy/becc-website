import { ImgHTMLAttributes, useEffect, useRef, useState } from 'react';

export interface ILazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  threshold?: number;
  className?: string;
}

/**
 * Lazy Loading Image Component using Intersection Observer
 * 
 * Features:
 * - Only loads when in viewport
 * - Blur placeholder
 * - Smooth fade-in transition
 * - Configurable intersection threshold
 * 
 * @example
 * <LazyImage
 *   src="/images/photo.jpg"
 *   alt="Photo description"
 *   placeholder="/images/placeholder-blur.jpg"
 *   threshold={0.1}
 * />
 */
export const LazyImage = ({
  src,
  alt,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YwZjBmMCIvPjwvc3ZnPg==',
  threshold = 0.1,
  className = '',
  ...props
}: ILazyImageProps): JSX.Element => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, threshold]);

  const handleLoad = (): void => {
    setIsLoaded(true);
  };

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      onLoad={handleLoad}
      className={`${className} transition-all duration-500 ${
        isLoaded ? 'opacity-100 blur-0' : 'opacity-50 blur-sm'
      }`}
      {...props}
    />
  );
};

export default LazyImage;
