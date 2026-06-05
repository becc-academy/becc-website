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
}

export const Footer: React.FC<IFooterProps> = ({
  logo,
  contact,
  socialLinks,
  sections,
  copyright,
  credits,
  className = '',
}) => {
  const currentYear = copyright.year ?? new Date().getFullYear();

  return (
    <footer
      id="footer"
      className={cn('border-t', className)}
      style={{
        color: 'var(--default-color)',
        backgroundColor: 'var(--background-color)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* About Section - Takes up 4 columns */}
          <div className="lg:col-span-4">
            {logo && (
              <Link to="/" className="inline-block mb-6">
                <img src={logo.src} alt={logo.alt} className="h-12 w-auto" />
              </Link>
            )}

            <div className="space-y-3 mb-6">
              {contact.location && (
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--default-color)' }} />
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--default-color)' }}>
                    {contact.location}
                  </p>
                </div>
              )}
              {contact.phone && (
                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--default-color)' }} />
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--default-color)' }}>
                    {contact.phone}
                  </p>
                </div>
              )}
              {contact.email && (
                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--default-color)' }} />
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--default-color)' }}>
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
                    className="w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 text-lg hover:shadow-lg"
                    style={{
                      backgroundColor: 'var(--accent-color)',
                      color: 'var(--contrast-color)',
                    }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Vertical Separator */}
          <div className="hidden lg:block lg:col-span-1 relative opacity-20">
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px"
              style={{
                background: `linear-gradient(to bottom, transparent, var(--default-color), transparent)`,
              }}
            />
          </div>

          {/* Footer Sections - Takes up remaining columns */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sections.map((section, index) => (
                <div key={index}>
                  <h4
                    className="text-lg font-bold mb-6 relative inline-block"
                    style={{ color: 'var(--heading-color)' }}
                  >
                    {section.title}
                    <div
                      className="absolute bottom-0 left-0 w-12 h-0.5 -mb-2"
                      style={{ backgroundColor: 'var(--accent-color)' }}
                    />
                  </h4>
                  <ul className="space-y-3 mt-4">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          to={link.href}
                          className="text-sm transition-all duration-200 flex items-center space-x-2 group"
                          style={{ color: 'var(--default-color)' }}
                        >
                          <ChevronRight
                            className="w-3 h-3 transition-transform group-hover:translate-x-1"
                            style={{ color: 'var(--default-color)' }}
                          />
                          <span className="group-hover:pl-2 transition-all duration-200" style={{ color: 'var(--default-color)' }}>
                            {link.label}
                          </span>
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
      <div className="py-6 relative z-10 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm" style={{ color: 'var(--default-color)' }}>
            &copy; {currentYear} <strong>{copyright.text}</strong> All Rights Reserved
          </p>
          {credits && (
            <p className="text-sm mt-2" style={{ color: 'var(--default-color)' }}>
              {credits.link ? (
                <>
                  Designed by{' '}
                  <a href={credits.link} className="hover:underline" style={{ color: 'var(--accent-color)' }}>
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
