import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon, Mail, MapPin, Phone } from 'lucide-react';

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
  const navigationLinks = sections[0]?.links ?? [];
  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

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
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-9 py-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="max-w-sm">
            {logo && (
              <Link to="/" onClick={scrollToTop} className="inline-block rounded-lg bg-white p-2">
                <img src={logo.src} alt={logo.alt} className="h-10 w-auto" />
              </Link>
            )}
            <p className="mt-4 text-sm leading-6 text-black/60">
              Practical digital, creative, and entrepreneurial education for learners ready to
              shape what comes next.
            </p>
          </div>

          <div className="lg:justify-self-end">
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      onClick={scrollToTop}
                      className="text-sm font-semibold transition-colors hover:text-becc-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-becc-accent"
                      style={{ color: 'var(--heading-color)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-black/60">
              {contact.location && (
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-becc-accent" />
                  {contact.location}
                </span>
              )}
              {contact.phone && (
                <a className="inline-flex items-center gap-2 hover:text-becc-accent" href="tel:+233201233215">
                  <Phone className="h-4 w-4 text-becc-accent" />
                  {contact.phone}
                </a>
              )}
              {contact.email && (
                <a className="inline-flex items-center gap-2 hover:text-becc-accent" href={`mailto:${contact.email}`}>
                  <Mail className="h-4 w-4 text-becc-accent" />
                  {contact.email}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-5 border-t border-black/10 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-black/50">
            <span>&copy; {currentYear} {copyright.text}. All rights reserved.</span>
            {credits && (
              <span className="ml-1">
                {credits.link ? (
                  <>
                    Designed by{' '}
                    <a href={credits.link} className="hover:text-becc-accent hover:underline">
                      {credits.text}
                    </a>
                  </>
                ) : (
                  `Designed by ${credits.text}`
                )}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-black/60 transition-colors hover:border-becc-accent hover:bg-becc-accent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-becc-accent"
                >
                  <IconComponent className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};
