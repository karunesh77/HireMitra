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
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4'
  };

  const spinner = (
    <div
      className={`
        rounded-full border-b-[#FF7A00]
        animate-spin
        ${sizeStyles[size]}
        ${className}
      `}
      style={{ borderColor: '#E5E7EB' }}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 flex flex-col items-center justify-center z-50">
        {spinner}
        {message && (
          <p className="text-[#4A4A4A] mt-4 text-center">{message}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {spinner}
      {message && (
        <p className="text-[#4A4A4A] mt-4 text-center">{message}</p>
      )}
    </div>
  );
}
