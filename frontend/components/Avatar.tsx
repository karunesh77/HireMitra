import React from 'react';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: AvatarSize;
  fallback?: string; // Initials or emoji
  className?: string;
}

export default function Avatar({
  src,
  alt,
  size = 'md',
  fallback = '👤',
  className = ''
}: AvatarProps) {
  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-20 h-20 text-2xl'
  };

  return (
    <div
      className={`
        rounded-full flex items-center justify-center
        border-2 border-[#FF7A00] bg-[#FFF4E5]
        overflow-hidden flex-shrink-0
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="font-semibold text-[#FF7A00]">{fallback}</span>
      )}
    </div>
  );
}
