import React from 'react';

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  className?: string;
  name?: string;
  id?: string;
}

export default function TextArea({
  label, placeholder, value, onChange, error,
  disabled = false, required = false, rows = 4,
  className = '', name, id
}: TextAreaProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-semibold text-[#001F3F]">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={id || name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        className={`
          w-full px-4 py-2.5 rounded-xl bg-white
          border border-[#E5E7EB]
          text-[#001F3F] placeholder-[#9CA3AF]
          focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/30 focus:border-[#FF7A00]
          disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-[#9CA3AF]
          hover:border-[#d1d5db]
          resize-none transition-all duration-200
          ${error ? 'border-red-400 focus:ring-red-500/30 focus:border-red-500' : ''}
          ${className}
        `}
      />
      {error && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><span>!</span> {error}</p>}
    </div>
  );
}
