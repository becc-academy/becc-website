import React, { useState } from 'react';

import { cn } from '../lib/utils';

export interface ISocialLink {
  icon: string;
  href: string;
  label?: string;
}

export interface ITeamCardProps {
  image: string;
  name: string;
  position: string;
  bio?: string;
  socialLinks?: ISocialLink[];
  className?: string;
}

export const TeamCard: React.FC<ITeamCardProps> = ({
  image,
  name,
  position,
  bio,
  socialLinks,
  className = '',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={cn('perspective-1000', className)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={cn(
          'relative w-full h-[400px] transition-transform duration-500 transform-style-3d',
          isFlipped && 'rotate-y-180',
        )}
      >
        {/* Front of Card */}
        <div className="absolute inset-0 backface-hidden">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
            <div className="h-[280px] overflow-hidden">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="p-8 text-left">
              <h4 className="text-2xl font-bold mb-1" style={{ color: 'var(--heading-color)' }}>
                {name}
              </h4>
              <p className="text-base font-medium" style={{ color: 'var(--accent-color)' }}>
                {position}
              </p>
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div
            className="rounded-2xl shadow-lg p-8 h-full flex flex-col justify-center text-left"
            style={{
              background: 'linear-gradient(to bottom right, var(--accent-color), #d14801)',
              color: 'var(--contrast-color)',
            }}
          >
            <h4 className="text-2xl font-bold mb-2">{name}</h4>
            <p className="text-base opacity-90 mb-4">{position}</p>
            {bio && <p className="text-base leading-relaxed mb-6 opacity-90">{bio}</p>}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex justify-center space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label ?? 'Social link'}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
