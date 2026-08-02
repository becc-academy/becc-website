import type { JSX } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';

import { BeccFooter, Header, ScrollToTop } from '@becc/ui';

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Programs', href: '/programs' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
];

const WebsiteLayout = (): JSX.Element => {
  const { pathname } = useLocation();

  const navLinks = navigation.map((link) => ({
    ...link,
    active: link.href === '/' ? pathname === '/' : pathname.startsWith(link.href),
  }));

  return (
    <>
      <Header
        logo={{ src: '/assets/img/logo.png', alt: 'BECC Academy' }}
        siteName="BECC Academy"
        navLinks={navLinks}
      />
      <Outlet />
      <BeccFooter />
      <ScrollToTop />
      <Toaster position="top-right" richColors closeButton />
    </>
  );
};

export default WebsiteLayout;
