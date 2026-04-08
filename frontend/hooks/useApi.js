'use client';

import { useState, useCallback } from 'react';
import api from '@/lib/api';

/**
 * Hook for making API calls with error handling
 */
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (method, url, data = null) => {
    setLoading(true);
    setError(null);

    try {
      const config = { method, url };
      if (data) config.data = data;

      const response = await api(config);
      setLoading(false);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  }, []);

  const get = useCallback((url) => request('GET', url), [request]);
  const post = useCallback((url, data) => request('POST', url, data), [request]);
  const put = useCallback((url, data) => request('PUT', url, data), [request]);
  const patch = useCallback((url, data) => request('PATCH', url, data), [request]);
  const remove = useCallback((url) => request('DELETE', url), [request]);

  return { loading, error, get, post, put, patch, delete: remove };
};
