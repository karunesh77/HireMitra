'use client';

import React, { useRef, useState } from 'react';

interface FileUploadProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  onChange?: (files: FileList | null) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  name?: string;
  id?: string;
  maxSize?: number; // in MB
}

export default function FileUpload({
  label,
  accept = 'image/*',
  multiple = false,
  onChange,
  error,
  disabled = false,
  required = false,
  className = '',
  name,
  id,
  maxSize = 5 // 5MB default
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      // Check file size
      let totalSize = 0;
      Array.from(files).forEach(file => {
        totalSize += file.size;
      });

      if (totalSize > maxSize * 1024 * 1024) {
        alert(`File size should not exceed ${maxSize}MB`);
        return;
      }

      // Set file name
      if (multiple) {
        setFileName(`${files.length} file(s) selected`);
      } else {
        setFileName(files[0].name);
      }

      // Create preview for images
      if (accept.includes('image')) {
        const previews: string[] = [];
        Array.from(files).forEach(file => {
          const reader = new FileReader();
          reader.onload = () => {
            previews.push(reader.result as string);
            if (previews.length === files.length) {
              setPreview(previews);
            }
          };
          reader.readAsDataURL(file);
        });
      }

      onChange?.(files);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[#001F3F]">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        ref={fileInputRef}
        type="file"
        id={id || name}
        name={name}
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        disabled={disabled}
        required={required}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
        className={`
          w-full px-4 py-8 rounded-lg border-2 border-dashed border-[#E5E7EB]
          bg-[#FFF4E5] hover:bg-[#FFE8CC]
          text-center transition
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500' : ''}
        `}
      >
        <div className="space-y-2">
          <div className="text-2xl">📁</div>
          {fileName ? (
            <p className="text-sm font-medium text-[#001F3F]">{fileName}</p>
          ) : (
            <>
              <p className="text-sm font-medium text-[#001F3F]">Click to upload</p>
              <p className="text-xs text-[#4A4A4A]">or drag and drop</p>
              <p className="text-xs text-[#4A4A4A]">Max {maxSize}MB</p>
            </>
          )}
        </div>
      </button>

      {/* Image Preview */}
      {preview.length > 0 && accept.includes('image') && (
        <div className="grid grid-cols-3 gap-2 mt-4">
          {preview.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Preview ${idx + 1}`}
              className="w-full h-20 object-cover rounded-lg border border-[#E5E7EB]"
            />
          ))}
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
