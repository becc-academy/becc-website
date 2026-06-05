import React from 'react';

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<IInputProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const widthStyle = fullWidth ? 'w-full' : '';
  const errorStyle = error
    ? 'border-red-500 focus:ring-red-500'
    : '';

  return (
    <div className={widthStyle}>
      {label && <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--default-color)' }}>{label}</label>}
      <input
        className={`block px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-becc-accent focus:border-becc-accent transition-colors ${widthStyle} ${className}`}
        style={{ borderColor: error ? 'rgb(239 68 68)' : 'var(--border-color)' }}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helperText && !error && <p className="mt-1 text-sm" style={{ color: 'var(--default-color)' }}>{helperText}</p>}
    </div>
  );
};
