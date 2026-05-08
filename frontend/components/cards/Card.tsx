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
        p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm
        ${hoverable ? 'hover:border-[#FF7A00]/40 hover:shadow-md hover:-translate-y-0.5 cursor-pointer transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
