import React from 'react';
import { cn } from '../lib/utils';

export interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  logo?: {
    src: string;
    alt: string;
  };
  contact: {
    location?: string;
    phone?: string;
    email?: string;
  };
  socialLinks: SocialLink[];
  sections: FooterSection[];
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

export const Footer: React.FC<FooterProps> = ({
  logo,
  contact,
  socialLinks,
  sections,
  copyright,
  credits,
  className = '',
}) => {
  const currentYear = copyright.year || new Date().getFullYear();

  return (
    <footer
      id="footer"
      className={cn('bg-gray-50 border-t border-gray-200', className)}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            {logo && (
              <a href="/" className="inline-block mb-4">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 w-auto"
                />
              </a>
            )}
            
            <div className="space-y-2 text-sm text-gray-600">
              {contact.location && <p>{contact.location}</p>}
              {contact.phone && (
                <p>
                  <strong>Phone:</strong> {contact.phone}
                </p>
              )}
              {contact.email && (
                <p>
                  <strong>Email:</strong> {contact.email}
                </p>
              )}
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 mt-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#e95001] text-white hover:bg-[#d14801] transition-colors"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {sections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-[#e95001] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            © {currentYear} <strong>{copyright.text}</strong> All Rights Reserved
          </p>
          {credits && (
            <p className="text-sm text-gray-500 mt-2">
              {credits.link ? (
                <>
                  Designed by{' '}
                  <a
                    href={credits.link}
                    className="text-[#e95001] hover:underline"
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
