import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

import { Footer, IFooterProps } from './Footer';

/**
 * BECC Academy branded footer with default content
 * Use this component for consistent footer across all pages
 */
export const BeccFooter: React.FC<Partial<IFooterProps>> = (props) => {
  const defaultProps: IFooterProps = {
    logo: { src: '/assets/img/logo.png', alt: 'BECC Academy' },
    contact: {
      location: 'Accra, Ghana',
      phone: '+233 (0)20 123 3215',
      email: 'info@beccacademy.com',
    },
    socialLinks: [
      {
        icon: Twitter,
        href: 'https://x.com/BECCAcademy',
        label: 'Twitter',
      },
      {
        icon: Facebook,
        href: '#',
        label: 'Facebook',
      },
      {
        icon: Instagram,
        href: 'https://www.instagram.com/beccacademy/',
        label: 'Instagram',
      },
      {
        icon: Linkedin,
        href: 'https://www.linkedin.com/company/beccacademy/',
        label: 'LinkedIn',
      },
    ],
    sections: [
      {
        title: 'Useful Links',
        links: [
          { label: 'Home', href: '/' },
          { label: 'About us', href: '/about' },
          { label: 'Services', href: '/services' },
          { label: 'Programs', href: '/programs' },
          { label: 'Events', href: '/events' },
          { label: 'Contact', href: '/contact' },
        ],
      },
      {
        title: 'Our Services',
        links: [
          { label: 'Digital Skills Training', href: '/services' },
          { label: 'Corporate Training', href: '/services' },
          { label: 'Mentorship Programs', href: '/services' },
          { label: 'Youth Programs', href: '/services' },
          { label: 'Creative Workshops', href: '/services' },
        ],
      },
    ],
    copyright: {
      text: 'BECC Academy',
      year: new Date().getFullYear(),
    },
  };

  // Merge provided props with defaults
  const mergedProps: IFooterProps = {
    ...defaultProps,
    ...props,
    contact: {
      ...defaultProps.contact,
      ...props.contact,
    },
    copyright: {
      ...defaultProps.copyright,
      ...props.copyright,
    },
  };

  return <Footer {...mergedProps} withGlasmorphism />;
};
