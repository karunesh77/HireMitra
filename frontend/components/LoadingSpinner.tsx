import React from 'react';

type SpinnerSize = 'sm' | 'md' | 'lg';

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  fullScreen?: boolean;
  message?: string;
  className?: string;
}

export default function LoadingSpinner({
  size = 'md',
  fullScreen = false,
  message,
  className = ''
}: LoadingSpinnerProps) {
  const sizeStyles = {
    sm: 'w-5 h-5',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  const spinner = (
    <div className={`relative ${sizeStyles[size]} ${className}`}>
      <div className={`absolute inset-0 rounded-full border-2 border-[#E5E7EB]`}></div>
      <div className={`absolute inset-0 rounded-full border-2 border-transparent border-t-[#FF7A00] animate-spin`}></div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-50 animate-fade-in">
        {spinner}
        {message && (
          <p className="text-[#4A4A4A] mt-4 text-sm text-center">{message}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {spinner}
      {message && (
        <p className="text-[#4A4A4A] mt-3 text-sm text-center">{message}</p>
      )}
    </div>
  );
}
