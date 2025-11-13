import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, LucideIcon, Mail, MapPin, Phone } from 'lucide-react';

import { cn } from '../lib/utils';

export interface ISocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

export interface IFooterLink {
  label: string;
  href: string;
}

export interface IFooterSection {
  title: string;
  links: IFooterLink[];
}

export interface IFooterProps {
  logo?: {
    src: string;
    alt: string;
  };
  contact: {
    location?: string;
    phone?: string;
    email?: string;
  };
  socialLinks: ISocialLink[];
  sections: IFooterSection[];
  copyright: {
    text: string;
    year?: number;
  };
  credits?: {
    text: string;
    link?: string;
  };
  className?: string;
  withGlasmorphism?: boolean;
}

export const Footer: React.FC<IFooterProps> = ({
  logo,
  contact,
  socialLinks,
  sections,
  copyright,
  credits,
  className = '',
  withGlasmorphism = false,
}) => {
  const currentYear = copyright.year ?? new Date().getFullYear();

  const footerBgClass = withGlasmorphism
    ? 'bg-gradient-to-br from-[#e95001] via-[#d14801] to-[#b83d01] text-white relative overflow-hidden'
    : 'bg-gray-50 border-t border-gray-200';

  return (
    <footer id="footer" className={cn(footerBgClass, className)}>
      {/* Glasmorphism overlay for scroll button area */}
      {withGlasmorphism && (
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 backdrop-blur-lg rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      )}

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* About Section - Takes up 4 columns */}
          <div className="lg:col-span-4">
            {logo && (
              <Link to="/" className="inline-block mb-6">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 w-auto brightness-0 invert"
                  style={{ filter: withGlasmorphism ? 'brightness(0) invert(1)' : 'none' }}
                />
              </Link>
            )}

            <div className="space-y-3 mb-6">
              {contact.location && (
                <div className="flex items-start space-x-3">
                  <MapPin
                    className={cn(
                      'w-4 h-4 mt-0.5 flex-shrink-0',
                      withGlasmorphism ? 'text-white/80' : 'text-gray-600',
                    )}
                  />
                  <p
                    className={cn(
                      'text-sm leading-relaxed',
                      withGlasmorphism ? 'text-white/90' : 'text-gray-600',
                    )}
                  >
                    {contact.location}
                  </p>
                </div>
              )}
              {contact.phone && (
                <div className="flex items-start space-x-3">
                  <Phone
                    className={cn(
                      'w-4 h-4 mt-0.5 flex-shrink-0',
                      withGlasmorphism ? 'text-white/80' : 'text-gray-600',
                    )}
                  />
                  <p
                    className={cn(
                      'text-sm leading-relaxed',
                      withGlasmorphism ? 'text-white/90' : 'text-gray-600',
                    )}
                  >
                    {contact.phone}
                  </p>
                </div>
              )}
              {contact.email && (
                <div className="flex items-start space-x-3">
                  <Mail
                    className={cn(
                      'w-4 h-4 mt-0.5 flex-shrink-0',
                      withGlasmorphism ? 'text-white/80' : 'text-gray-600',
                    )}
                  />
                  <p
                    className={cn(
                      'text-sm leading-relaxed',
                      withGlasmorphism ? 'text-white/90' : 'text-gray-600',
                    )}
                  >
                    {contact.email}
                  </p>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={cn(
                      'w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 text-lg',
                      withGlasmorphism
                        ? 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 hover:scale-110 hover:shadow-lg'
                        : 'bg-[#e95001] text-white hover:bg-[#d14801] hover:shadow-lg',
                    )}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Vertical Separator */}
          <div
            className={cn(
              'hidden lg:block lg:col-span-1 relative',
              withGlasmorphism ? 'opacity-30' : 'opacity-20',
            )}
          >
            <div
              className={cn(
                'absolute left-1/2 top-0 bottom-0 w-px',
                withGlasmorphism
                  ? 'bg-gradient-to-b from-transparent via-white to-transparent'
                  : 'bg-gradient-to-b from-transparent via-gray-400 to-transparent',
              )}
            />
          </div>

          {/* Footer Sections - Takes up remaining columns */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sections.map((section, index) => (
                <div key={index}>
                  <h4
                    className={cn(
                      'text-lg font-bold mb-6 relative inline-block',
                      withGlasmorphism ? 'text-white' : 'text-gray-900',
                    )}
                  >
                    {section.title}
                    <div
                      className={cn(
                        'absolute bottom-0 left-0 w-12 h-0.5 -mb-2',
                        withGlasmorphism ? 'bg-white/50' : 'bg-[#e95001]',
                      )}
                    />
                  </h4>
                  <ul className="space-y-3 mt-4">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          to={link.href}
                          className={cn(
                            'text-sm transition-all duration-200 flex items-center space-x-2 group',
                            withGlasmorphism
                              ? 'text-white/80 hover:text-white hover:pl-2'
                              : 'text-gray-600 hover:text-[#e95001] hover:pl-2',
                          )}
                        >
                          <ChevronRight
                            className={cn(
                              'w-3 h-3 transition-transform group-hover:translate-x-1',
                              withGlasmorphism ? 'text-white/60' : 'text-gray-400',
                            )}
                          />
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        className={cn(
          'py-6 relative z-10',
          withGlasmorphism ? 'border-t border-white/20' : 'border-t border-gray-200',
        )}
      >
        <div className="container mx-auto px-4 text-center">
          <p className={cn('text-sm', withGlasmorphism ? 'text-white/90' : 'text-gray-600')}>
            © {currentYear} <strong>{copyright.text}</strong> All Rights Reserved
          </p>
          {credits && (
            <p className={cn('text-sm mt-2', withGlasmorphism ? 'text-white/70' : 'text-gray-500')}>
              {credits.link ? (
                <>
                  Designed by{' '}
                  <a
                    href={credits.link}
                    className={cn(
                      'hover:underline',
                      withGlasmorphism ? 'text-white' : 'text-[#e95001]',
                    )}
                  >
                    {credits.text}
                  </a>
                </>
              ) : (
                `Designed by ${credits.text}`
              )}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};
