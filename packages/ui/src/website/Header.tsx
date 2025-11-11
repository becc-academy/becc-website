import React, { useState } from 'react';
import { cn } from '../lib/utils';

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface HeaderProps {
  logo?: {
    src: string;
    alt: string;
  };
  siteName: string;
  navLinks: NavLink[];
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  logo,
  siteName,
  navLinks,
  className = '',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      id="header"
      className={cn(
        'sticky top-0 z-50 bg-white shadow-sm transition-all duration-300',
        className
      )}
    >
      <div className="container mx-auto px-4 xl:px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            {logo && (
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-10 w-auto"
              />
            )}
            <h1 className="text-xl font-bold text-gray-900">{siteName}</h1>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={cn(
                  'text-base font-medium transition-colors hover:text-[#e95001]',
                  link.active
                    ? 'text-[#e95001]'
                    : 'text-gray-700'
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="xl:hidden text-2xl text-gray-700 hover:text-[#e95001] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <i className={`bi ${mobileMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="xl:hidden py-4 border-t border-gray-200">
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className={cn(
                      'block py-2 px-4 rounded-lg transition-colors',
                      link.active
                        ? 'bg-[#e95001] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};
