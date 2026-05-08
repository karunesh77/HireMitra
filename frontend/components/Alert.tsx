import React from 'react';

type AlertType = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  type?: AlertType;
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

export default function Alert({ type = 'info', title, message, onClose, className = '' }: AlertProps) {
  const config = {
    info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', titleColor: 'text-blue-900', icon: '💡' },
    success: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', titleColor: 'text-emerald-900', icon: '✅' },
    warning: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', titleColor: 'text-amber-900', icon: '⚠️' },
    error: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', titleColor: 'text-red-900', icon: '❌' },
  };

  const s = config[type];

  return (
    <div className={`p-4 rounded-xl border ${s.bg} ${s.border} ${s.text} flex items-start gap-3 animate-slide-up ${className}`}>
      <span className="text-base flex-shrink-0 mt-0.5">{s.icon}</span>
      <div className="flex-1 min-w-0">
        {title && <h4 className={`font-semibold text-sm mb-0.5 ${s.titleColor}`}>{title}</h4>}
        <p className="text-sm leading-relaxed">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-sm hover:opacity-70 transition flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center hover:bg-black/5">
          ✕
        </button>
      )}
    </div>
  );
}
