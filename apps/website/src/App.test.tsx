import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('should render without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it('should render the router with routes', () => {
    render(<App />);
    // The router should be present in the DOM
    const main = document.querySelector('main');
    expect(main).toBeInTheDocument();
  });

  it('should render HomePage on root route', () => {
    render(<App />);
    // Check for HomePage specific content
    expect(screen.getByText(/BECC Academy/i)).toBeInTheDocument();
  });

  it('should have proper document structure', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
