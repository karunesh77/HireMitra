'use client';

import { useState } from 'react';

export default function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  success,
  placeholder,
  required = false,
  maxLength,
  rows,
  options, // For select inputs
}) {
  const [isFocused, setIsFocused] = useState(false);

  const isTextarea = type === 'textarea';
  const isSelect = type === 'select';

  const baseClass = 'input';
  const focusClass = isFocused ? 'ring-2 ring-blue-500 shadow-md' : '';
  const errorClass = error ? 'border-red-500 focus:ring-red-500' : '';
  const successClass = success && !error ? 'border-green-500 focus:ring-green-500' : '';

  return (
    <div className="form-group">
      <label className="label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {isTextarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          rows={rows || 4}
          maxLength={maxLength}
          className={`${baseClass} ${focusClass} ${errorClass} ${successClass}`}
        />
      ) : isSelect ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`${baseClass} ${focusClass} ${errorClass} ${successClass}`}
          required={required}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          maxLength={maxLength}
          required={required}
          className={`${baseClass} ${focusClass} ${errorClass} ${successClass}`}
        />
      )}

      {/* Character Counter */}
      {maxLength && (
        <p className="text-xs text-gray-500 mt-1">
          {value?.length || 0} / {maxLength}
        </p>
      )}

      {/* Feedback Messages */}
      {error && <p className="text-error">❌ {error}</p>}
      {success && !error && <p className="text-success">✓ {success}</p>}
    </div>
  );
}
