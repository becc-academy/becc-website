import React, { useEffect, useState } from 'react';
import { cn } from '../lib/utils';

export interface PreloaderProps {
  duration?: number;
  className?: string;
}

export const Preloader: React.FC<PreloaderProps> = ({
  duration = 1000,
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isLoading) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] bg-white flex items-center justify-center',
        className
      )}
    >
      <div className="relative">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-gray-200 border-t-[#e95001] rounded-full animate-spin"></div>
        
        {/* Optional Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-[#e95001]/10 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
