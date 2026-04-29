import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', hoverable = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        p-6 rounded-xl bg-white border border-[#E5E7EB]
        ${hoverable ? 'hover:border-[#FF7A00] hover:shadow-lg cursor-pointer transition' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
