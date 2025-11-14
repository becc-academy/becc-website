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
    primary:
      'bg-[#e95001] text-white hover:bg-[#d14801] shadow-md hover:shadow-lg hover:-translate-y-1',
    secondary:
      'bg-white text-[#010608] hover:text-[#6a3136] shadow-md hover:shadow-lg hover:-translate-y-1',
    outline: 'border-2 border-[#e95001] text-[#e95001] hover:bg-[#e95001] hover:text-white',
    ghost: 'text-[#e95001] hover:bg-[#e95001]/10',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      whileTap={buttonTap.tap}
      {...(glow && { whileHover: glowHover.hover })}
      {...props}
    >
      {children}
    </motion.button>
  );
};
