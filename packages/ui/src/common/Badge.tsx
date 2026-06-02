import React from 'react';

export interface IBadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<IBadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center font-semibold rounded-full';

  const variantStyles: Record<string, string> = {
    primary: 'bg-becc-accent text-white',
    secondary: '',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500',
    info: 'bg-becc-nav text-white',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      style={variant === 'secondary' ? { backgroundColor: 'var(--heading-color)', color: 'var(--contrast-color)' } : variant === 'warning' ? { color: 'var(--default-color)' } : undefined}
    >
      {children}
    </span>
  );
};
