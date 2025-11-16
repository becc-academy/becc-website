import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import AboutPage from './AboutPage';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('AboutPage', () => {
  it('renders without crashing', () => {
    renderWithRouter(<AboutPage />);
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });

  it('displays Our Story section', () => {
    renderWithRouter(<AboutPage />);
    expect(screen.getByText(/Educating Minds, Inspiring Hearts/i)).toBeInTheDocument();
  });

  it('displays mission and vision cards', () => {
    renderWithRouter(<AboutPage />);
    expect(screen.getByText(/Our Mission/i)).toBeInTheDocument();
    expect(screen.getByText(/Our Vision/i)).toBeInTheDocument();
  });

  it('displays core values', () => {
    renderWithRouter(<AboutPage />);
    expect(screen.getByText(/Excellence/i)).toBeInTheDocument();
    expect(screen.getByText(/Innovation/i)).toBeInTheDocument();
    expect(screen.getByText(/Inclusivity/i)).toBeInTheDocument();
    expect(screen.getByText(/Collaboration/i)).toBeInTheDocument();
    expect(screen.getByText(/Impact/i)).toBeInTheDocument();
    expect(screen.getByText(/Integrity/i)).toBeInTheDocument();
  });

  it('displays leadership team section', () => {
    renderWithRouter(<AboutPage />);
    expect(screen.getByText(/Meet Our Distinguished Leadership/i)).toBeInTheDocument();
    expect(screen.getByText(/Edmund N. O. Akogeram/i)).toBeInTheDocument();
    expect(screen.getByText(/Barbara O. Asiamah/i)).toBeInTheDocument();
    expect(screen.getByText(/Clifford O. Yeboah/i)).toBeInTheDocument();
    expect(screen.getByText(/Clifford N. Sarpong/i)).toBeInTheDocument();
  });
});
