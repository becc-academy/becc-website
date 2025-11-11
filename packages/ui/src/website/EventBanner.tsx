import React from 'react';
import { cn } from '../lib/utils';

export interface EventBannerProps {
  date: {
    day: string;
    month: string;
  };
  title: string;
  description: string;
  buttonText: string;
  buttonDisabled?: boolean;
  countdown?: string;
  onButtonClick?: () => void;
  className?: string;
}

export const EventBanner: React.FC<EventBannerProps> = ({
  date,
  title,
  description,
  buttonText,
  buttonDisabled = false,
  countdown,
  onButtonClick,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'bg-gradient-to-r from-[#e95001] to-[#d14801] rounded-2xl p-8 shadow-xl',
        className
      )}
      data-aos="fade-up"
      data-aos-delay="400"
    >
      <div className="flex flex-wrap items-center justify-between gap-6">
        {/* Date Badge */}
        <div className="flex-shrink-0 bg-white rounded-xl p-4 text-center min-w-[80px] shadow-md">
          <div className="text-3xl font-bold text-[#e95001]">{date.day}</div>
          <div className="text-sm font-semibold text-gray-600 uppercase">
            {date.month}
          </div>
        </div>

        {/* Event Info */}
        <div className="flex-1 min-w-[250px]">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/90 text-sm">{description}</p>
        </div>

        {/* Action */}
        <div className="flex-shrink-0 text-center">
          <button
            onClick={onButtonClick}
            disabled={buttonDisabled}
            className={cn(
              'px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300',
              buttonDisabled
                ? 'bg-white/20 text-white cursor-not-allowed'
                : 'bg-white text-[#e95001] hover:bg-gray-100 shadow-md hover:shadow-lg hover:-translate-y-1'
            )}
          >
            {buttonText}
          </button>
          {countdown && (
            <p className="text-white/80 text-xs mt-2">{countdown}</p>
          )}
        </div>
      </div>
    </div>
  );
};
