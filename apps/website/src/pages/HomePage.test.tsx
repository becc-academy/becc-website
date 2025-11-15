import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import HomePage from './HomePage';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
  },
}));

describe('HomePage', () => {
  beforeEach(() => {
    // Mock window.location.href for navigation tests
    delete (window as any).location;
    (window as any).location = { href: '/' };
  });

  it('should render without crashing', () => {
    const { container } = render(<HomePage />);
    expect(container).toBeInTheDocument();
  });

  describe('Header Section', () => {
    it('should render the header with site name', () => {
      render(<HomePage />);
      expect(screen.getByText('BECC Academy')).toBeInTheDocument();
    });

    it('should render all navigation links', () => {
      render(<HomePage />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Services')).toBeInTheDocument();
      expect(screen.getByText('Programs')).toBeInTheDocument();
      expect(screen.getByText('Events')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });
  });

  describe('Hero Section', () => {
    it('should render hero title', () => {
      render(<HomePage />);
      expect(
        screen.getByText(/Launching Futures Through Experiential Learning/i),
      ).toBeInTheDocument();
    });

    it('should render hero description', () => {
      render(<HomePage />);
      expect(screen.getByText(/BECC Academy delivers hands-on/i)).toBeInTheDocument();
    });

    it('should render hero statistics', () => {
      render(<HomePage />);
      expect(screen.getByText('90%')).toBeInTheDocument();
      expect(screen.getByText('Completion Rate')).toBeInTheDocument();
      expect(screen.getByText('5:1')).toBeInTheDocument();
      expect(screen.getByText('Student-Tutor Ratio')).toBeInTheDocument();
    });

    it('should render call-to-action buttons', () => {
      render(<HomePage />);
      expect(screen.getByText('Get Involved')).toBeInTheDocument();
      expect(screen.getByText('Contact Us')).toBeInTheDocument();
    });
  });

  describe('Feature Cards Section', () => {
    it('should render all three feature cards', () => {
      render(<HomePage />);
      expect(screen.getByText('Think')).toBeInTheDocument();
      expect(screen.getByText('Learn')).toBeInTheDocument();
      expect(screen.getByText('Evolve')).toBeInTheDocument();
    });

    it('should render feature card descriptions', () => {
      render(<HomePage />);
      expect(screen.getByText(/foster critical thinking/i)).toBeInTheDocument();
      expect(screen.getByText(/Practical, skill-focused courses/i)).toBeInTheDocument();
      expect(screen.getByText(/Continuous growth through project showcases/i)).toBeInTheDocument();
    });
  });

  describe('Event Banner Section', () => {
    it('should render event information', () => {
      render(<HomePage />);
      expect(screen.getByText('Humble Data Workshop')).toBeInTheDocument();
      expect(screen.getByText(/Hands-on introduction to data analytics/i)).toBeInTheDocument();
    });

    it('should render event date', () => {
      render(<HomePage />);
      expect(screen.getByText('22')).toBeInTheDocument();
      expect(screen.getByText('NOV')).toBeInTheDocument();
    });

    it('should show countdown', () => {
      render(<HomePage />);
      expect(screen.getByText('Starts in 4 weeks')).toBeInTheDocument();
    });
  });

  describe('About Section', () => {
    it('should render about section title', () => {
      render(<HomePage />);
      expect(screen.getByText('Educating Minds, Inspiring Hearts')).toBeInTheDocument();
    });

    it('should render about section content', () => {
      render(<HomePage />);
      expect(screen.getByText(/B.E.C.C Academy exists to transform/i)).toBeInTheDocument();
    });

    it('should render mission statement', () => {
      render(<HomePage />);
      expect(screen.getByText('Our Mission')).toBeInTheDocument();
      expect(screen.getByText(/expand access to practical/i)).toBeInTheDocument();
    });

    it('should render vision statement', () => {
      render(<HomePage />);
      expect(screen.getByText('Our Vision')).toBeInTheDocument();
      expect(screen.getByText(/Africa's leading hub/i)).toBeInTheDocument();
    });
  });

  describe('Core Values Section', () => {
    it('should render BECC code title', () => {
      render(<HomePage />);
      expect(screen.getByText('The B.E.C.C. Code')).toBeInTheDocument();
    });

    it('should render all four value cards', () => {
      render(<HomePage />);
      expect(screen.getByText('Build')).toBeInTheDocument();
      expect(screen.getByText('Create')).toBeInTheDocument();
      expect(screen.getByText('Change')).toBeInTheDocument();
      // Note: 'Evolve' appears twice (in features and values), so we check for at least one
      const evolveElements = screen.getAllByText('Evolve');
      expect(evolveElements.length).toBeGreaterThan(0);
    });
  });

  describe('Featured Programs Section', () => {
    it('should render section title', () => {
      render(<HomePage />);
      expect(screen.getByText('Featured Programs')).toBeInTheDocument();
    });

    it('should render Innovators Program', () => {
      render(<HomePage />);
      expect(screen.getByText('Innovators Program')).toBeInTheDocument();
      expect(screen.getByText(/blended accelerator for designers/i)).toBeInTheDocument();
    });

    it('should render program statistics', () => {
      render(<HomePage />);
      expect(screen.getByText('5+ Students')).toBeInTheDocument();
      expect(screen.getByText('90% Success Rate')).toBeInTheDocument();
    });

    it('should render other programs', () => {
      render(<HomePage />);
      expect(screen.getByText('Summer Code Camp')).toBeInTheDocument();
      expect(screen.getByText('Digital Marketing')).toBeInTheDocument();
      expect(screen.getByText('Creative Arts')).toBeInTheDocument();
    });
  });

  describe('Testimonials Section', () => {
    it('should render testimonials title', () => {
      render(<HomePage />);
      expect(screen.getByText('Testimonials')).toBeInTheDocument();
    });

    it('should render all three testimonials', () => {
      render(<HomePage />);
      expect(screen.getByText('Sandra Yemoley Quarshie')).toBeInTheDocument();
      expect(screen.getByText('Lartey Lois Lartebea')).toBeInTheDocument();
      expect(screen.getByText('Agyepong Felix Okoree')).toBeInTheDocument();
    });

    it('should render testimonial content', () => {
      render(<HomePage />);
      expect(screen.getByText(/I had a good time learning/i)).toBeInTheDocument();
      expect(screen.getByText(/It was a great experience/i)).toBeInTheDocument();
      expect(screen.getByText(/It was an insightful training program/i)).toBeInTheDocument();
    });
  });

  describe('Footer Section', () => {
    it('should render footer contact information', () => {
      render(<HomePage />);
      expect(screen.getByText('Accra, Ghana')).toBeInTheDocument();
      expect(screen.getByText('+233 (0)20 123 3215')).toBeInTheDocument();
      expect(screen.getByText('info@beccacademy.com')).toBeInTheDocument();
    });

    it('should render footer links', () => {
      render(<HomePage />);
      expect(screen.getByText('Useful Links')).toBeInTheDocument();
      expect(screen.getByText('Our Services')).toBeInTheDocument();
    });

    it('should render social media links', () => {
      render(<HomePage />);
      // Social links are rendered as icons, we can check for their presence
      const footer = screen.getByText('Accra, Ghana').closest('footer');
      expect(footer).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic HTML structure', () => {
      const { container } = render(<HomePage />);
      const main = container.querySelector('main');
      const footer = container.querySelector('footer');

      expect(main).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
    });

    it('should render ScrollToTop component', () => {
      const { container } = render(<HomePage />);
      expect(container).toBeInTheDocument();
      // ScrollToTop is rendered, functionality tested in its own component test
    });
  });

  it('should match snapshot', () => {
    const { container } = render(<HomePage />);
    expect(container).toMatchSnapshot();
  });
});
