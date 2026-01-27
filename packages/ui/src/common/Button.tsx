import React from 'react';
import { motion } from 'framer-motion';

import { buttonTap, glowHover } from '../lib/animations';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
  glow?: boolean;
}

export const Button: React.FC<IButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  glow = false,
  ...props
}) => {
  const baseStyles =
    'font-semibold rounded-lg transition-all duration-300 inline-flex items-center justify-center';

  const variantStyles = {
    primary: 'shadow-md hover:shadow-lg hover:-translate-y-1',
    secondary: 'shadow-md hover:shadow-lg hover:-translate-y-1',
    outline: 'border-2',
    ghost: '',
  };

  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--accent-color)',
          color: 'var(--contrast-color)',
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--surface-color)',
          color: 'var(--default-color)',
        };
      case 'outline':
        return {
          borderColor: 'var(--accent-color)',
          color: 'var(--accent-color)',
        };
      case 'ghost':
        return {
          color: 'var(--accent-color)',
        };
      default:
        return {};
    }
  };

  const getHoverStyles = (variant: string) => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: '#d14801' };
      case 'secondary':
        return { color: 'var(--nav-hover-color)' };
      case 'outline':
        return { backgroundColor: 'var(--accent-color)', color: 'var(--contrast-color)' };
      case 'ghost':
        return { backgroundColor: 'var(--accent-color)1a' };
      default:
        return {};
    }
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  const variantStyle = getVariantStyles(variant);
  const hoverStyle = getHoverStyles(variant);

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      style={variantStyle}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, hoverStyle);
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, variantStyle);
      }}
      whileTap={buttonTap.tap}
      {...(glow && { whileHover: glowHover.hover })}
      {...props}
    >
      {children}
    </motion.button>
  );
};
