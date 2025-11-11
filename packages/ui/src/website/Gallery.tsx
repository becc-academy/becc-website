import React from 'react';
import { cn } from '../lib/utils';

export interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
  size?: 'small' | 'large';
}

export interface GalleryProps {
  images: GalleryImage[];
  className?: string;
}

export const Gallery: React.FC<GalleryProps> = ({
  images,
  className = '',
}) => {
  return (
    <div className={cn('grid grid-cols-2 gap-4', className)}>
      {images.map((image, index) => (
        <div
          key={index}
          className={cn(
            'relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer',
            image.size === 'large' && 'col-span-2 row-span-2'
          )}
          data-aos="zoom-in"
          data-aos-delay={index * 100}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          
          {/* Overlay */}
          {image.title && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h5 className="text-white font-bold text-lg">{image.title}</h5>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
