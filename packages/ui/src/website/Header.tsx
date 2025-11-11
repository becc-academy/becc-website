import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { cn } from '../lib/utils';

export interface INavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface IHeaderProps {
  logo?: {
    src: string;
    alt: string;
  };
  siteName: string;
  navLinks: INavLink[];
  className?: string;
}

export const Header: React.FC<IHeaderProps> = ({ logo, siteName, navLinks, className = '' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      id="header"
      className={cn('sticky top-0 z-50 bg-white shadow-sm transition-all duration-300', className)}
    >
      <div className="container mx-auto px-4 xl:px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            {logo && <img src={logo.src} alt={logo.alt} className="h-10 w-auto" />}
            <h1 className="text-xl font-bold text-gray-900">{siteName}</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className={cn(
                  'text-base font-medium transition-colors hover:text-[#e95001]',
                  link.active ? 'text-[#e95001]' : 'text-gray-700',
                )}
              >
                {link.label}
              </Link>
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
                  <Link
                    to={link.href}
                    className={cn(
                      'block py-2 px-4 rounded-lg transition-colors',
                      link.active ? 'bg-[#e95001] text-white' : 'text-gray-700 hover:bg-gray-100',
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};
