'use client';

import { useState, useEffect } from 'react';
import { getUser, isAuthenticated, clearAuth } from '@/lib/auth';

/**
 * Hook to manage authentication state
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Check auth on mount
    const authStatus = isAuthenticated();
    const userData = getUser();

    setIsAuth(authStatus);
    setUser(userData);
    setIsLoading(false);
  }, []);

  const logout = () => {
    clearAuth();
    setUser(null);
    setIsAuth(false);
    // Redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  };

  return {
    user,
    isAuth,
    isLoading,
    logout
  };
};
