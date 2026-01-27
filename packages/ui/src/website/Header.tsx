import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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
      className={cn('sticky top-0 z-50 shadow-sm transition-all duration-300', className)}
      style={{ backgroundColor: 'var(--surface-color)' }}
    >
      <div className="container mx-auto px-4 xl:px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            {logo && <img src={logo.src} alt={logo.alt} className="h-10 w-auto" />}
            <h1 className="text-xl font-bold" style={{ color: 'var(--heading-color)' }}>
              {siteName}
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="text-base font-medium transition-colors"
                style={{
                  color: link.active ? 'var(--accent-color)' : 'var(--nav-color)',
                }}
                onMouseEnter={(e) => {
                  if (!link.active) {
                    e.currentTarget.style.color = 'var(--nav-hover-color)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!link.active) {
                    e.currentTarget.style.color = 'var(--nav-color)';
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="xl:hidden text-2xl transition-colors"
            style={{ color: 'var(--nav-color)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--accent-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--nav-color)';
            }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav
            className="xl:hidden py-4 border-t"
            style={{
              backgroundColor: 'var(--nav-mobile-background-color)',
              borderColor: 'var(--border)',
            }}
          >
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="block py-2 px-4 rounded-lg transition-colors"
                    style={{
                      backgroundColor: link.active ? 'var(--accent-color)' : 'transparent',
                      color: link.active ? 'var(--contrast-color)' : 'var(--nav-color)',
                    }}
                    onMouseEnter={(e) => {
                      if (!link.active) {
                        e.currentTarget.style.backgroundColor = 'var(--background-color)';
                        e.currentTarget.style.color = 'var(--nav-hover-color)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!link.active) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--nav-color)';
                      }
                    }}
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
