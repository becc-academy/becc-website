import React from 'react';
import { Clock } from 'lucide-react';

import { cn } from '../lib/utils';

export interface IEventBannerProps {
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

export const EventBanner: React.FC<IEventBannerProps> = ({
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
        'bg-gradient-to-r from-[#e95001] to-[#d14801] rounded-2xl p-6 md:p-8 shadow-xl overflow-hidden relative',
        className,
      )}
      data-aos="fade-up"
      data-aos-delay="400"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
      </div>

      <div className="relative flex flex-col gap-6">
        {/* Top Section */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Date Badge */}
          <div className="flex-shrink-0 bg-white rounded-xl p-4 text-center min-w-[80px] shadow-md">
            <div className="text-3xl font-bold text-[#e95001]">{date.day}</div>
            <div className="text-sm font-semibold text-gray-600 uppercase">{date.month}</div>
          </div>

          {/* Event Info */}
          <div className="flex-1 min-w-[250px]">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/90 text-sm md:text-base">{description}</p>
          </div>

          {/* Action Button */}
          <div className="flex-shrink-0">
            <button
              onClick={onButtonClick}
              disabled={buttonDisabled}
              className={cn(
                'px-8 py-4 rounded-lg font-bold text-base transition-all duration-300 transform',
                buttonDisabled
                  ? 'bg-white/20 text-white cursor-not-allowed'
                  : 'bg-white text-[#e95001] hover:bg-yellow-50 shadow-lg hover:shadow-2xl hover:scale-105 animate-pulse',
              )}
            >
              {buttonText}
            </button>
          </div>
        </div>

        {/* Countdown Section - Prominent Display */}
        {countdown && (
          <div className="mt-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-2xl border-4 border-yellow-400 animate-[pulse_2s_ease-in-out_infinite]">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Clock className="w-8 h-8 text-[#e95001] animate-[spin_3s_linear_infinite]" />
                <span className="text-lg md:text-xl font-bold text-[#e95001] uppercase tracking-wider">
                  Event Starts In
                </span>
                <Clock className="w-8 h-8 text-[#e95001] animate-[spin_3s_linear_infinite]" />
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#e95001] via-[#ff6b35] to-[#e95001] animate-[gradient_3s_ease_infinite] drop-shadow-lg">
                  {countdown}
                </div>
                <div className="mt-3 text-sm md:text-base font-semibold text-gray-700 uppercase tracking-wide">
                  ⏰ Don&apos;t Miss Out! Register Now! ⏰
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
