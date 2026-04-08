// Auth utility functions

/**
 * Store token and user in localStorage
 */
export const setAuth = (token, user) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
};

/**
 * Get stored user
 */
export const getUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

/**
 * Get stored token
 */
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('token');
  }
  return false;
};

/**
 * Check if user is a worker
 */
export const isWorker = () => {
  const user = getUser();
  return user?.userType === 'worker';
};

/**
 * Check if user is an employer
 */
export const isEmployer = () => {
  const user = getUser();
  return user?.userType === 'employer';
};

/**
 * Clear auth data (logout)
 */
export const clearAuth = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
