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
  label, placeholder, options, value, onChange, error,
  disabled = false, required = false, className = '', name, id
}: SelectProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-semibold text-[#001F3F]">
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
          w-full px-4 py-2.5 rounded-xl bg-white
          border border-[#E5E7EB]
          text-[#001F3F]
          focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/30 focus:border-[#FF7A00]
          disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-[#9CA3AF]
          hover:border-[#d1d5db]
          transition-all duration-200 appearance-none
          bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3d%22http%3a//www.w3.org/2000/svg%22%20viewBox%3d%220%200%2024%2024%22%20fill%3d%22none%22%20stroke%3d%22%239CA3AF%22%20stroke-width%3d%222%22%20stroke-linecap%3d%22round%22%20stroke-linejoin%3d%22round%22%3e%3cpath%20d%3d%22m6%209%206%206%206-6%22/%3e%3c/svg%3e')]
          bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10
          ${error ? 'border-red-400 focus:ring-red-500/30 focus:border-red-500' : ''}
          ${className}
        `}
      >
        {placeholder && <option value="" className="text-[#9CA3AF]">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><span>!</span> {error}</p>}
    </div>
  );
}
