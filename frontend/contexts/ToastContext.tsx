'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

interface ToastContextType {
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

const typeStyles: Record<ToastType, { bg: string; border: string; text: string; icon: string }> = {
  success: { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-800', icon: '✅' },
  error: { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-800', icon: '❌' },
  warning: { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-800', icon: '⚠️' },
  info: { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-800', icon: 'ℹ️' },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, type: ToastType, duration: number = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type, duration }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const contextValue: ToastContextType = {
    success: (msg, dur) => addToast(msg, 'success', dur),
    error: (msg, dur) => addToast(msg, 'error', dur),
    warning: (msg, dur) => addToast(msg, 'warning', dur),
    info: (msg, dur) => addToast(msg, 'info', dur),
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-3 max-w-sm">
        {toasts.map((toast) => {
          const style = typeStyles[toast.type];
          return (
            <div
              key={toast.id}
              className={`
                px-5 py-4 rounded-xl border shadow-lg
                flex items-start gap-3 animate-slide-up
                ${style.bg} ${style.border} ${style.text}
              `}
            >
              <span className="text-lg flex-shrink-0">{style.icon}</span>
              <p className="flex-1 text-sm font-medium">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-lg leading-none hover:opacity-70 transition flex-shrink-0 ml-2"
              >
                &times;
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
