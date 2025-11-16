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
    : 'border-gray-300 focus:ring-[#e95001] focus:border-[#e95001]';

  return (
    <div className={widthStyle}>
      {label && <label className="block text-sm font-semibold text-[#010608] mb-2">{label}</label>}
      <input
        className={`block px-4 py-3 rounded-lg border-2 ${errorStyle} focus:outline-none focus:ring-2 transition-colors ${widthStyle} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helperText && !error && <p className="mt-1 text-sm text-gray-600">{helperText}</p>}
    </div>
  );
};
