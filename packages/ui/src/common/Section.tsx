import React from 'react';

export interface ISectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'default' | 'light' | 'dark';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Section: React.FC<ISectionProps> = ({
  children,
  className = '',
  background = 'default',
  padding = 'md',
}) => {
  const backgroundStyles: Record<string, string> = {
    default: '',
    light: '',
    dark: '',
  };

  const backgroundColors: Record<string, React.CSSProperties> = {
    default: { backgroundColor: 'var(--background-color)' },
    light: { backgroundColor: 'var(--background-color)' },
    dark: { backgroundColor: 'var(--background-color)', color: 'var(--contrast-color)' },
  };

  const paddingStyles = {
    none: '',
    sm: 'py-10',
    md: 'py-16',
    lg: 'py-24',
  };

  return (
    <section
      className={`${backgroundStyles[background]} ${paddingStyles[padding]} ${className}${background === 'light' ? ' light-background' : ''}${background === 'dark' ? ' dark-background' : ''}`}
      style={backgroundColors[background]}>
      {children}
    </section>
  );
};
