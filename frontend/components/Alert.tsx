import React from 'react';

type AlertType = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  type?: AlertType;
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

export default function Alert({
  type = 'info',
  title,
  message,
  onClose,
  className = ''
}: AlertProps) {
  const typeStyles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      title: 'text-blue-900',
      icon: 'ℹ'
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      title: 'text-green-900',
      icon: '✓'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-700',
      title: 'text-yellow-900',
      icon: '⚠'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      title: 'text-red-900',
      icon: '✕'
    }
  };

  const style = typeStyles[type];

  return (
    <div
      className={`
        p-4 rounded-lg border
        ${style.bg} ${style.border} ${style.text}
        flex items-start gap-3
        ${className}
      `}
    >
      <span className="text-xl font-bold flex-shrink-0">{style.icon}</span>
      <div className="flex-1">
        {title && (
          <h4 className={`font-semibold mb-1 ${style.title}`}>{title}</h4>
        )}
        <p className="text-sm">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-xl leading-none hover:opacity-70 transition flex-shrink-0"
        >
          ✕
        </button>
      )}
    </div>
  );
}
