import React from 'react';

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  name?: string;
  id?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
}

export default function Input({
  label, type = 'text', placeholder, value, onChange, error,
  disabled = false, required = false, className = '', name, id, min, max, step,
}: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-semibold text-[#001F3F]">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id || name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className={`
          w-full px-4 py-2.5 rounded-xl bg-white
          border border-[#E5E7EB]
          text-[#001F3F] placeholder-[#9CA3AF]
          focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/30 focus:border-[#FF7A00]
          disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-[#9CA3AF]
          hover:border-[#d1d5db]
          transition-all duration-200
          ${error ? 'border-red-400 focus:ring-red-500/30 focus:border-red-500' : ''}
          ${className}
        `}
      />
      {error && (
        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
          <span>!</span> {error}
        </p>
      )}
    </div>
  );
}
