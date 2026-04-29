import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  required?: boolean;
}

export default function Radio({
  name,
  options,
  value,
  onChange,
  disabled = false,
  className = '',
  label,
  required = false
}: RadioProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-[#001F3F] mb-3">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-3">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              disabled={disabled}
              required={required}
              className="w-4 h-4 cursor-pointer accent-[#FF7A00] disabled:cursor-not-allowed"
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="text-sm text-[#4A4A4A] cursor-pointer hover:text-[#001F3F]"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
