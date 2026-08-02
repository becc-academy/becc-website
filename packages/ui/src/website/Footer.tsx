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
  const serviceLinks = sections.find((section) => section.title === 'Our Services')?.links ?? [];
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
        <div className="grid gap-10 py-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-12">
          <div className="max-w-sm lg:col-span-5 lg:border-r lg:border-black/10 lg:pr-12">
            {logo && (
              <Link to="/" onClick={scrollToTop} className="inline-block rounded-lg bg-white p-2">
                <img src={logo.src} alt={logo.alt} className="h-12 w-auto" />
              </Link>
            )}
            <p className="mt-5 text-base leading-7 text-black/60">
              Practical digital, creative, and entrepreneurial education for learners ready to
              shape what comes next.
            </p>
          </div>

          <div className="lg:col-span-4 lg:px-3">
            <div className="mb-6">
              <h3 className="text-xl font-bold" style={{ color: 'var(--heading-color)' }}>
                Our Services
              </h3>
              <span className="mt-2 block h-0.5 w-12 bg-becc-accent" />
            </div>
            <nav aria-label="Services navigation">
              <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      onClick={scrollToTop}
                      className="group inline-flex items-center gap-3 text-sm font-semibold transition-colors hover:text-becc-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-becc-accent"
                      style={{ color: 'var(--heading-color)' }}
                    >
                      <ChevronRight className="h-4 w-4 text-black/55 transition-transform group-hover:translate-x-0.5 group-hover:text-becc-accent" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <div className="mb-6">
              <h3 className="text-xl font-bold" style={{ color: 'var(--heading-color)' }}>
                Reach Us
              </h3>
              <span className="mt-2 block h-0.5 w-12 bg-becc-accent" />
            </div>
            <div className="space-y-4 text-sm text-black/60">
              {contact.location && (
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-becc-accent">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span>{contact.location}</span>
                </span>
              )}
              {contact.phone && (
                <a className="flex items-center gap-3 hover:text-becc-accent" href="tel:+233201233215">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-becc-accent">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span>{contact.phone}</span>
                </a>
              )}
              {contact.email && (
                <a
                  className="flex items-center gap-3 hover:text-becc-accent"
                  href={`mailto:${contact.email}`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-becc-accent">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="break-all">{contact.email}</span>
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
