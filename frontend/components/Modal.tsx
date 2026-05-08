'use client';

import React, { useEffect } from 'react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export default function Modal({
  isOpen, title, children, onClose, onConfirm,
  confirmText = 'Confirm', cancelText = 'Cancel',
  isDangerous = false, size = 'md', loading = false,
}: ModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handleEsc); document.body.style.overflow = ''; };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeStyles = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-2xl' };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4" onClick={onClose}>
      <div
        className={`bg-white rounded-2xl shadow-2xl ${sizeStyles[size]} w-full animate-scale-in`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-[#E5E7EB]">
          <h2 className="text-xl font-bold text-[#001F3F]">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-[#4A4A4A] hover:bg-gray-100 hover:text-[#001F3F] transition-colors text-lg">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 max-h-[60vh] overflow-y-auto">{children}</div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-[#E5E7EB] justify-end">
          <Button variant="ghost" onClick={onClose} size="sm">{cancelText}</Button>
          {onConfirm && (
            <Button variant={isDangerous ? 'danger' : 'primary'} onClick={onConfirm} size="sm" loading={loading} disabled={loading}>
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
