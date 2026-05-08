import React from 'react';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  dot?: boolean;
}

export default function Badge({ children, variant = 'default', size = 'md', className = '', dot = false }: BadgeProps) {
  const variantStyles = {
    default: 'bg-gray-50 text-[#4A4A4A] border-[#E5E7EB]',
    primary: 'bg-[#FFF4E5] text-[#FF7A00] border-[#FF7A00]/20',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-red-50 text-red-600 border-red-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200'
  };

  const dotColors = {
    default: 'bg-gray-400',
    primary: 'bg-[#FF7A00]',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500'
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`}></span>}
      {children}
    </span>
  );
}
