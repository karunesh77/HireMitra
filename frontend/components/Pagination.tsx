import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5
}: PaginationProps) {
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage <= half) {
      end = maxVisiblePages;
    } else if (currentPage > totalPages - half) {
      start = totalPages - maxVisiblePages + 1;
    }

    if (start > 1) pages.push(1);
    if (start > 2) pages.push('...');

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push('...');
    if (end < totalPages) pages.push(totalPages);

    return pages;
  };

  const pages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`
          px-3 py-2 rounded-lg border border-[#E5E7EB]
          font-medium transition
          ${
            currentPage === 1
              ? 'text-[#4A4A4A] cursor-not-allowed opacity-50'
              : 'text-[#001F3F] hover:border-[#FF7A00] hover:text-[#FF7A00]'
          }
        `}
      >
        ← Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page, idx) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${idx}`} className="px-2 py-2 text-[#4A4A4A]">
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`
                w-10 h-10 rounded-lg font-medium transition
                ${
                  isActive
                    ? 'bg-[#FF7A00] text-white shadow-md'
                    : 'border border-[#E5E7EB] text-[#001F3F] hover:border-[#FF7A00] hover:text-[#FF7A00]'
                }
              `}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`
          px-3 py-2 rounded-lg border border-[#E5E7EB]
          font-medium transition
          ${
            currentPage === totalPages
              ? 'text-[#4A4A4A] cursor-not-allowed opacity-50'
              : 'text-[#001F3F] hover:border-[#FF7A00] hover:text-[#FF7A00]'
          }
        `}
      >
        Next →
      </button>
    </div>
  );
}
