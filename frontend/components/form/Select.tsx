import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  name?: string;
  id?: string;
}

export default function Select({
  label,
  placeholder,
  options,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  className = '',
  name,
  id
}: SelectProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-[#001F3F]">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full px-4 py-3 rounded-lg bg-white
          border border-[#E5E7EB]
          text-[#001F3F]
          focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          transition
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
