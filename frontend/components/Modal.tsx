'use client';

import React from 'react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean; // Red confirm button for delete actions
  size?: 'sm' | 'md' | 'lg';
}

export default function Modal({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDangerous = false,
  size = 'md'
}: ModalProps) {
  if (!isOpen) return null;

  const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg'
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-xl shadow-2xl ${sizeStyles[size]} w-full mx-4`}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#E5E7EB]">
          <h2 className="text-2xl font-bold text-[#001F3F]">{title}</h2>
          <button
            onClick={onClose}
            className="text-[#4A4A4A] hover:text-[#001F3F] transition text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-[#E5E7EB] justify-end">
          <Button
            variant="ghost"
            onClick={onClose}
          >
            {cancelText}
          </Button>
          {onConfirm && (
            <Button
              variant={isDangerous ? 'danger' : 'primary'}
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
