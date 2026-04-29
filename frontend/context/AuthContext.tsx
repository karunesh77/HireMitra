'use client';

import React, { createContext, useState, useCallback, useEffect } from 'react';
import apiClient from '@/lib/api';
import {
  saveToken,
  getToken,
  removeToken,
  saveUserType,
  getUserType,
  isTokenValid,
  getTokenData,
} from '@/lib/tokenManager';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'worker' | 'employer';
  phone?: string;
  location?: string;
  companyName?: string;
  website?: string;
  description?: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  userType: 'worker' | 'employer';
  location?: string;
  companyName?: string;
  website?: string;
  description?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  userType: 'worker' | 'employer' | null;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  checkAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userType, setUserType] = useState<'worker' | 'employer' | null>(null);

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = getToken();
      const storedUserType = getUserType();

      if (storedToken && isTokenValid()) {
        setToken(storedToken);
        setUserType(storedUserType);

        // Try to fetch user data
        try {
          const response = await apiClient.get('/api/auth/me');
          setUser(response.data.user);
        } catch (err) {
          console.error('Error fetching user:', err);
          removeToken();
          setToken(null);
          setUser(null);
        }
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(
    async (payload: LoginPayload) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.post('/api/auth/login', payload);

        const { token: newToken, user: userData } = response.data;

        // Save token and user data
        saveToken(newToken);
        saveUserType(userData.userType);

        setToken(newToken);
        setUser(userData);
        setUserType(userData.userType);
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || 'Login failed / Login fail गया';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.post('/api/auth/register', payload);

        const { token: newToken, user: userData } = response.data;

        // Save token and user data (auto-login after registration)
        saveToken(newToken);
        saveUserType(userData.userType);

        setToken(newToken);
        setUser(userData);
        setUserType(userData.userType);
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || 'Registration failed / Registration fail गया';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    removeToken();
    setToken(null);
    setUser(null);
    setUserType(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const checkAuth = useCallback(async () => {
    const storedToken = getToken();

    if (!storedToken || !isTokenValid()) {
      logout();
      return;
    }

    try {
      const response = await apiClient.get('/api/auth/me');
      setUser(response.data.user);
    } catch (err) {
      logout();
    }
  }, [logout]);

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    error,
    isAuthenticated: !!token && isTokenValid(),
    userType,
    login,
    register,
    logout,
    clearError,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
