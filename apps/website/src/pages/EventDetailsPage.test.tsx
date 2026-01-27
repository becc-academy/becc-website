import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import EventDetailsPage from './EventDetailsPage';

// Mock the required modules
vi.mock('@becc/ui', () => ({
  BeccFooter: () => <div data-testid="becc-footer">Footer</div>,
  Header: () => <div data-testid="header">Header</div>,
  ScrollToTop: () => <div data-testid="scroll-to-top">ScrollToTop</div>,
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ eventId: 'humble-data-workshop' }),
    useNavigate: () => vi.fn(),
  };
});

describe('EventDetailsPage', () => {
  it('renders event details page', () => {
    render(
      <BrowserRouter>
        <EventDetailsPage />
      </BrowserRouter>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('becc-footer')).toBeInTheDocument();
  });

  it('displays event information', () => {
    render(
      <BrowserRouter>
        <EventDetailsPage />
      </BrowserRouter>,
    );

    expect(screen.getByText('Humble Data Workshop')).toBeInTheDocument();
  });

  it('shows register button', () => {
    render(
      <BrowserRouter>
        <EventDetailsPage />
      </BrowserRouter>,
    );

    const registerButtons = screen.getAllByText(/Register Now/i);
    expect(registerButtons.length).toBeGreaterThan(0);
  });

  it('displays event highlights', () => {
    render(
      <BrowserRouter>
        <EventDetailsPage />
      </BrowserRouter>,
    );

    expect(screen.getByText('Event Highlights')).toBeInTheDocument();
  });

  it('displays event requirements', () => {
    render(
      <BrowserRouter>
        <EventDetailsPage />
      </BrowserRouter>,
    );

    expect(screen.getByText('Requirements')).toBeInTheDocument();
  });
});
