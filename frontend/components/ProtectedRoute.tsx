'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'worker' | 'employer';
}

export default function ProtectedRoute({
  children,
  requiredUserType,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, userType, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      // Not authenticated
      if (!isAuthenticated) {
        router.replace('/auth/login');
        return;
      }

      // Check if user type matches required type
      if (requiredUserType && userType !== requiredUserType) {
        router.replace('/');
        return;
      }
    }
  }, [isAuthenticated, userType, requiredUserType, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7A00]"></div>
          <p className="mt-4 text-[#4A4A4A]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
