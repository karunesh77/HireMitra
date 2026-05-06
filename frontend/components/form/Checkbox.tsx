import React from 'react';

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
  required?: boolean;
}

export default function Checkbox({
  label,
  checked = false,
  onChange,
  disabled = false,
  className = '',
  name,
  id,
  required = false
}: CheckboxProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <input
        type="checkbox"
        id={id || name}
        name={name}
        checked={checked}
        onChange={onChange || (() => {})}
        readOnly={!onChange}
        disabled={disabled}
        required={required}
        className="w-5 h-5 rounded cursor-pointer accent-[#FF7A00] disabled:cursor-not-allowed"
      />
      {label && (
        <label htmlFor={id || name} className="text-sm text-[#4A4A4A] cursor-pointer hover:text-[#001F3F]">
          {label}
        </label>
      )}
    </div>
  );
}
