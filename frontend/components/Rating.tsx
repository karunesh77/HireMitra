'use client';

import React, { useState } from 'react';

interface RatingProps {
  value?: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  maxRating?: number;
  showLabel?: boolean;
}

export default function Rating({
  value = 0,
  onChange,
  readOnly = false,
  size = 'md',
  maxRating = 5,
  showLabel = true
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState(0);

  const sizeStyles = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  const displayValue = hoverValue || value;

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {Array.from({ length: maxRating }).map((_, index) => {
          const rating = index + 1;
          return (
            <button
              key={rating}
              onClick={() => !readOnly && onChange?.(rating)}
              onMouseEnter={() => !readOnly && setHoverValue(rating)}
              onMouseLeave={() => setHoverValue(0)}
              disabled={readOnly}
              className={`
                ${sizeStyles[size]}
                transition cursor-pointer
                ${readOnly ? 'cursor-default' : 'hover:scale-110'}
              `}
            >
              {rating <= displayValue ? '⭐' : '☆'}
            </button>
          );
        })}
      </div>
      {showLabel && (
        <span className="text-sm text-[#4A4A4A] font-medium">
          {displayValue.toFixed(1)}
        </span>
      )}
    </div>
  );
}
