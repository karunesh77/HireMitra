import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = ''
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer active:scale-[0.97]';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#FF7A00] to-[#FF9A40] hover:from-[#E66A00] hover:to-[#FF7A00] text-white shadow-md hover:shadow-lg hover:shadow-[#FF7A00]/20',
    secondary: 'bg-[#FFF4E5] hover:bg-[#FFE8CC] text-[#FF7A00] border border-[#FF7A00]/20',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg hover:shadow-red-500/20',
    ghost: 'bg-transparent hover:bg-gray-100 text-[#001F3F]',
    outline: 'bg-transparent border-2 border-[#FF7A00] text-[#FF7A00] hover:bg-[#FF7A00] hover:text-white',
  };

  const sizeStyles = {
    sm: 'px-3.5 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base'
  };

  const disabledStyles = disabled || loading ? 'opacity-50 cursor-not-allowed active:scale-100' : '';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabledStyles}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {loading && (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
}
