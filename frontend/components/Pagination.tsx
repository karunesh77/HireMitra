import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export default function Pagination({ currentPage, totalPages, onPageChange, maxVisiblePages = 5 }: PaginationProps) {
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= maxVisiblePages) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);
    if (currentPage <= half) end = maxVisiblePages;
    else if (currentPage > totalPages - half) start = totalPages - maxVisiblePages + 1;
    if (start > 1) pages.push(1);
    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push('...');
    if (end < totalPages) pages.push(totalPages);
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1.5">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${currentPage === 1 ? 'text-[#D1D5DB] cursor-not-allowed' : 'text-[#4A4A4A] hover:bg-[#FFF4E5] hover:text-[#FF7A00]'}`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>

      {getVisiblePages().map((page, idx) => {
        if (page === '...') return <span key={`e-${idx}`} className="px-1 text-[#9CA3AF] text-sm">...</span>;
        const p = page as number;
        return (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${p === currentPage ? 'bg-gradient-to-r from-[#FF7A00] to-[#FF9A40] text-white shadow-md shadow-[#FF7A00]/20' : 'text-[#4A4A4A] hover:bg-[#FFF4E5] hover:text-[#FF7A00]'}`}
          >
            {p}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${currentPage === totalPages ? 'text-[#D1D5DB] cursor-not-allowed' : 'text-[#4A4A4A] hover:bg-[#FFF4E5] hover:text-[#FF7A00]'}`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}
