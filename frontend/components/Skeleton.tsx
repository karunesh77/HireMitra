import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className = '', variant = 'rectangular', width, height }: SkeletonProps) {
  const variantStyles = {
    text: 'rounded-lg',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  };

  return (
    <div
      className={`skeleton ${variantStyles[variant]} ${className}`}
      style={{ width: width, height: height }}
    />
  );
}

// Pre-built skeleton layouts
export function JobCardSkeleton() {
  return (
    <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <Skeleton height={22} width="70%" className="mb-2" />
          <Skeleton height={16} width="40%" />
        </div>
        <Skeleton height={26} width={80} className="rounded-lg ml-3" />
      </div>
      <Skeleton height={16} width="100%" className="mb-1.5" />
      <Skeleton height={16} width="60%" className="mb-4" />
      <div className="flex justify-between items-center pt-3 border-t border-[#F3F4F6]">
        <Skeleton height={20} width={120} />
        <Skeleton height={14} width={60} />
      </div>
    </div>
  );
}

export function WorkerCardSkeleton() {
  return (
    <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm">
      <div className="flex items-center gap-3.5 mb-4">
        <Skeleton variant="rectangular" width={56} height={56} className="rounded-xl flex-shrink-0" />
        <div className="flex-1">
          <Skeleton height={18} width="60%" className="mb-1.5" />
          <Skeleton height={14} width="40%" className="mb-1" />
          <Skeleton height={12} width="30%" />
        </div>
      </div>
      <Skeleton height={14} width="50%" className="mb-3" />
      <Skeleton height={14} width="100%" className="mb-1.5" />
      <Skeleton height={14} width="80%" className="mb-3" />
      <div className="flex gap-1.5 mb-4">
        <Skeleton height={22} width={60} className="rounded-lg" />
        <Skeleton height={22} width={70} className="rounded-lg" />
        <Skeleton height={22} width={50} className="rounded-lg" />
      </div>
      <div className="flex gap-2 pt-3 border-t border-[#F3F4F6]">
        <Skeleton height={36} className="flex-1 rounded-xl" />
        <Skeleton height={36} className="flex-1 rounded-xl" />
      </div>
    </div>
  );
}

export function ApplicationCardSkeleton() {
  return (
    <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <Skeleton height={22} width="65%" className="mb-2" />
          <Skeleton height={16} width="40%" />
        </div>
        <Skeleton height={26} width={80} className="rounded-lg ml-3" />
      </div>
      <div className="flex justify-between items-center pt-3 border-t border-[#F3F4F6]">
        <Skeleton height={18} width={130} />
        <Skeleton height={14} width={80} />
      </div>
    </div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <Skeleton height={14} width="50%" />
        <Skeleton variant="rectangular" width={40} height={40} className="rounded-xl" />
      </div>
      <Skeleton height={28} width="40%" className="mb-1" />
      <Skeleton height={12} width="60%" />
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm">
      <div className="flex items-center gap-4 mb-6">
        <Skeleton variant="circular" width={80} height={80} />
        <div className="flex-1">
          <Skeleton height={22} width="40%" className="mb-2" />
          <Skeleton height={16} width="30%" className="mb-1" />
          <Skeleton height={14} width="25%" />
        </div>
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <Skeleton height={14} width="20%" className="mb-1.5" />
            <Skeleton height={40} width="100%" className="rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function MessageListSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3.5">
          <Skeleton variant="rectangular" width={44} height={44} className="rounded-xl flex-shrink-0" />
          <div className="flex-1">
            <Skeleton height={16} width="40%" className="mb-1.5" />
            <Skeleton height={12} width="70%" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => <StatsCardSkeleton key={i} />)}
      </div>
      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB]">
          <Skeleton height={20} width="40%" className="mb-4" />
          <div className="space-y-3">{[1, 2, 3].map((i) => <Skeleton key={i} height={60} />)}</div>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB]">
          <Skeleton height={20} width="40%" className="mb-4" />
          <div className="space-y-3">{[1, 2, 3].map((i) => <Skeleton key={i} height={60} />)}</div>
        </div>
      </div>
    </div>
  );
}
