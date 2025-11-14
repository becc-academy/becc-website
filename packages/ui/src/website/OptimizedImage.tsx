import { ImgHTMLAttributes, useState } from 'react';

export interface IOptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fallback?: string;
}

/**
 * Optimized Image Component with lazy loading and blur placeholder
 *
 * Features:
 * - Lazy loading by default
 * - Blur placeholder while loading
 * - WebP support with fallback
 * - Responsive sizing
 * - Error handling
 *
 * @example
 * <OptimizedImage
 *   src="/images/hero.jpg"
 *   alt="Hero image"
 *   width={1920}
 *   height={1080}
 *   priority={true}
 * />
 */
export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  fallback = '/images/placeholder.png',
  ...props
}: IOptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = (): void => {
    setIsLoaded(true);
  };

  const handleError = (): void => {
    setHasError(true);
  };

  // Generate WebP source if original is not WebP
  const isWebP = src.endsWith('.webp');
  const webpSrc = !isWebP ? src.replace(/\.(jpg|jpeg|png)$/i, '.webp') : src;

  return (
    <picture className={className}>
      {/* WebP source for browsers that support it */}
      {!isWebP && <source srcSet={webpSrc} type="image/webp" />}

      {/* Original format fallback */}
      <img
        src={hasError ? fallback : src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          aspectRatio: width && height ? `${width} / ${height}` : undefined,
        }}
        {...props}
      />
    </picture>
  );
};

export default OptimizedImage;
