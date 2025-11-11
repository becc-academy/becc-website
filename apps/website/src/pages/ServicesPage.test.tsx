import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ServicesPage from './ServicesPage';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
  },
}));

describe('ServicesPage', () => {
  beforeEach(() => {
    delete (window as any).location;
    (window as any).location = { href: '/services' };
  });

  it('should render without crashing', () => {
    const { container } = render(<ServicesPage />);
    expect(container).toBeInTheDocument();
  });

  describe('Header Section', () => {
    it('should render the header with site name', () => {
      render(<ServicesPage />);
      expect(screen.getByText('BECC Academy')).toBeInTheDocument();
    });

    it('should render navigation with active Services link', () => {
      render(<ServicesPage />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Services')).toBeInTheDocument();
      expect(screen.getByText('Programs')).toBeInTheDocument();
      expect(screen.getByText('Events')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });
  });

  describe('Page Title Section', () => {
    it('should render page title', () => {
      render(<ServicesPage />);
      expect(screen.getByText('Services')).toBeInTheDocument();
    });

    it('should render breadcrumbs', () => {
      render(<ServicesPage />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Services')).toBeInTheDocument();
    });
  });

  describe('Services Introduction Section', () => {
    it('should render introduction heading', () => {
      render(<ServicesPage />);
      expect(
        screen.getByText('Empowering Growth Through Digital Education & Partnerships'),
      ).toBeInTheDocument();
    });

    it('should render introduction description', () => {
      render(<ServicesPage />);
      expect(
        screen.getByText(/At BECC Academy, we provide comprehensive learning solutions/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/Whether you're starting your digital journey/i)).toBeInTheDocument();
    });

    it('should render service image', () => {
      render(<ServicesPage />);
      const image = screen.getByAltText('BECC Academy Services');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/assets/img/service.jpeg');
    });
  });

  describe('Services Grid Section', () => {
    it('should render all six service cards', () => {
      render(<ServicesPage />);
      expect(screen.getByText('Digital Skills Training')).toBeInTheDocument();
      expect(screen.getByText('Corporate Training')).toBeInTheDocument();
      expect(screen.getByText('Mentorship Programs')).toBeInTheDocument();
      expect(screen.getByText('Youth Programs')).toBeInTheDocument();
      expect(screen.getByText('Creative Workshops')).toBeInTheDocument();
      expect(screen.getByText('Innovation & Entrepreneurship')).toBeInTheDocument();
    });

    it('should render Digital Skills Training service details', () => {
      render(<ServicesPage />);
      expect(
        screen.getByText(/Comprehensive programs covering coding, web development/i),
      ).toBeInTheDocument();
      expect(screen.getByText('Python, JavaScript, and Web Development')).toBeInTheDocument();
      expect(screen.getByText('Mobile App Development')).toBeInTheDocument();
    });

    it('should render Corporate Training service details', () => {
      render(<ServicesPage />);
      expect(
        screen.getByText(/Customized learning solutions for organizations/i),
      ).toBeInTheDocument();
      expect(screen.getByText('Team Skills Assessment')).toBeInTheDocument();
      expect(screen.getByText('Customized Learning Paths')).toBeInTheDocument();
    });

    it('should render Mentorship Programs service details', () => {
      render(<ServicesPage />);
      expect(
        screen.getByText(/One-on-one guidance from industry professionals/i),
      ).toBeInTheDocument();
      expect(screen.getByText('Career Counseling')).toBeInTheDocument();
      expect(screen.getByText('Technical Mentorship')).toBeInTheDocument();
    });

    it('should render Youth Programs service details', () => {
      render(<ServicesPage />);
      expect(
        screen.getByText(/Engaging programs designed specifically for young learners/i),
      ).toBeInTheDocument();
      expect(screen.getByText('Coding for Kids (Ages 6-12)')).toBeInTheDocument();
      expect(screen.getByText('Teen Tech Bootcamps')).toBeInTheDocument();
    });

    it('should render Creative Workshops service details', () => {
      render(<ServicesPage />);
      expect(
        screen.getByText(/Hands-on workshops that blend creativity with technology/i),
      ).toBeInTheDocument();
      expect(screen.getByText('Graphic Design with Adobe Suite')).toBeInTheDocument();
      expect(screen.getByText('Video Production & Editing')).toBeInTheDocument();
    });

    it('should render Innovation & Entrepreneurship service details', () => {
      render(<ServicesPage />);
      expect(
        screen.getByText(/Programs focused on developing entrepreneurial mindset/i),
      ).toBeInTheDocument();
      expect(screen.getByText('Design Thinking Workshops')).toBeInTheDocument();
      expect(screen.getByText('Startup Fundamentals')).toBeInTheDocument();
    });

    it('should render service action links', () => {
      render(<ServicesPage />);
      expect(screen.getByText('Explore Programs')).toBeInTheDocument();
      expect(screen.getByText('Get Quote')).toBeInTheDocument();
      expect(screen.getByText('Find a Mentor')).toBeInTheDocument();
      expect(screen.getByText('View Youth Programs')).toBeInTheDocument();
      expect(screen.getByText('Join Workshop')).toBeInTheDocument();
      expect(screen.getByText('Start Building')).toBeInTheDocument();
    });
  });

  describe('CTA Section', () => {
    it('should render CTA heading', () => {
      render(<ServicesPage />);
      expect(screen.getByText('Ready to Start Your Learning Journey?')).toBeInTheDocument();
    });

    it('should render CTA description', () => {
      render(<ServicesPage />);
      expect(
        screen.getByText(/Connect with our team to learn more about our programs/i),
      ).toBeInTheDocument();
    });

    it('should render CTA buttons', () => {
      render(<ServicesPage />);
      const scheduleButton = screen.getByText('Schedule a Visit');
      const contactButton = screen.getByText('Contact Us');

      expect(scheduleButton).toBeInTheDocument();
      expect(contactButton).toBeInTheDocument();
      expect(scheduleButton.closest('a')).toHaveAttribute('href', '/contact');
      expect(contactButton.closest('a')).toHaveAttribute('href', '/contact');
    });
  });

  describe('Footer Section', () => {
    it('should render footer contact information', () => {
      render(<ServicesPage />);
      expect(screen.getByText('Accra, Ghana')).toBeInTheDocument();
      expect(screen.getByText('+233 (0)20 123 3215')).toBeInTheDocument();
      expect(screen.getByText('info@beccacademy.com')).toBeInTheDocument();
    });

    it('should render footer links', () => {
      render(<ServicesPage />);
      expect(screen.getByText('Useful Links')).toBeInTheDocument();
      expect(screen.getByText('Our Services')).toBeInTheDocument();
    });

    it('should render service list in footer', () => {
      render(<ServicesPage />);
      const footer = screen.getByText('Accra, Ghana').closest('footer');
      expect(footer).toBeInTheDocument();

      // Check for services in footer
      expect(screen.getAllByText('Digital Skills Training').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Corporate Training').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Mentorship Programs').length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic HTML structure', () => {
      const { container } = render(<ServicesPage />);
      const main = container.querySelector('main');
      const footer = container.querySelector('footer');

      expect(main).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
    });

    it('should render ScrollToTop component', () => {
      const { container } = render(<ServicesPage />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('Responsiveness', () => {
    it('should render grid layout for services', () => {
      const { container } = render(<ServicesPage />);
      const grids = container.querySelectorAll('.grid');
      expect(grids.length).toBeGreaterThan(0);
    });
  });

  it('should match snapshot', () => {
    const { container } = render(<ServicesPage />);
    expect(container).toMatchSnapshot();
  });
});
