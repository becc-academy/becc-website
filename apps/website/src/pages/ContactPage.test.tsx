import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ContactPage from './ContactPage';

describe('ContactPage', () => {
  it('renders contact page with main sections', () => {
    render(
      <BrowserRouter>
        <ContactPage />
      </BrowserRouter>,
    );

    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders contact form with all required fields', () => {
    render(
      <BrowserRouter>
        <ContactPage />
      </BrowserRouter>,
    );

    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Subject')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Message')).toBeInTheDocument();
  });

  it('renders contact information cards', () => {
    render(
      <BrowserRouter>
        <ContactPage />
      </BrowserRouter>,
    );

    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Call')).toBeInTheDocument();
    expect(screen.getByText('Open Hours')).toBeInTheDocument();
  });

  it('renders embedded Google Maps iframe', () => {
    render(
      <BrowserRouter>
        <ContactPage />
      </BrowserRouter>,
    );

    const iframe = screen.getByTitle('BECC Academy Location');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', expect.stringContaining('google.com/maps'));
  });

  it('renders social media links', () => {
    render(
      <BrowserRouter>
        <ContactPage />
      </BrowserRouter>,
    );

    const socialLinks = screen.getAllByRole('link');
    const socialMediaLinks = socialLinks.filter(
      (link) =>
        link.getAttribute('href')?.includes('twitter') ||
        link.getAttribute('href')?.includes('x.com') ||
        link.getAttribute('href')?.includes('instagram') ||
        link.getAttribute('href')?.includes('linkedin'),
    );

    expect(socialMediaLinks.length).toBeGreaterThan(0);
  });
});
