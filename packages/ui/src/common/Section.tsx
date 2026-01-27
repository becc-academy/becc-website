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
  const backgroundStyles = {
    default: 'bg-[#f1f5f7]',
    light: 'bg-[#e6edf0]',
    dark: 'bg-[#060606] text-white',
  };

  const paddingStyles = {
    none: '',
    sm: 'py-10',
    md: 'py-16',
    lg: 'py-24',
  };

  return (
    <section className={`${backgroundStyles[background]} ${paddingStyles[padding]} ${className}`}>
      {children}
    </section>
  );
};
