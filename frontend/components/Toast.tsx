'use client';

import React, { useEffect, useState } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number; // in milliseconds
  onClose?: () => void;
}

export default function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: {
      bg: 'bg-green-100',
      border: 'border-green-200',
      text: 'text-green-700',
      icon: '✓'
    },
    error: {
      bg: 'bg-red-100',
      border: 'border-red-200',
      text: 'text-red-700',
      icon: '✕'
    },
    warning: {
      bg: 'bg-yellow-100',
      border: 'border-yellow-200',
      text: 'text-yellow-700',
      icon: '⚠'
    },
    info: {
      bg: 'bg-blue-100',
      border: 'border-blue-200',
      text: 'text-blue-700',
      icon: 'ℹ'
    }
  };

  const style = typeStyles[type];

  return (
    <div
      className={`
        fixed bottom-4 right-4 z-50 max-w-md
        px-6 py-4 rounded-lg border
        flex items-start gap-3
        animate-in fade-in slide-in-from-bottom-4 duration-300
        ${style.bg} ${style.border} ${style.text}
      `}
    >
      <span className="text-xl font-bold flex-shrink-0">{style.icon}</span>
      <p className="flex-1 text-sm">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        className="text-xl leading-none hover:opacity-70 transition flex-shrink-0"
      >
        ✕
      </button>
    </div>
  );
}

// Toast Manager Hook
export function useToast() {
  const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([]);

  const addToast = (message: string, type: ToastType = 'info', duration = 3000) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return {
    toasts,
    addToast,
    removeToast,
    success: (message: string, duration?: number) => addToast(message, 'success', duration),
    error: (message: string, duration?: number) => addToast(message, 'error', duration),
    warning: (message: string, duration?: number) => addToast(message, 'warning', duration),
    info: (message: string, duration?: number) => addToast(message, 'info', duration)
  };
}
