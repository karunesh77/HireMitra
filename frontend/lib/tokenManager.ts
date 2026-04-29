import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'authToken';
const USER_TYPE_KEY = 'userType';

export interface DecodedToken {
  userId: string;
  email: string;
  userType: 'worker' | 'employer';
  iat: number;
  exp: number;
}

/**
 * Save token to localStorage
 */
export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Get token from localStorage
 */
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Remove token from localStorage
 */
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_TYPE_KEY);
};

/**
 * Save user type
 */
export const saveUserType = (userType: 'worker' | 'employer'): void => {
  localStorage.setItem(USER_TYPE_KEY, userType);
};

/**
 * Get user type
 */
export const getUserType = (): 'worker' | 'employer' | null => {
  return localStorage.getItem(USER_TYPE_KEY) as 'worker' | 'employer' | null;
};

/**
 * Check if token is valid (not expired)
 */
export const isTokenValid = (): boolean => {
  const token = getToken();

  if (!token) {
    return false;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    // Check if token is expired
    return decoded.exp > currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
};

/**
 * Decode token and get user data
 */
export const getTokenData = (): DecodedToken | null => {
  const token = getToken();

  if (!token) {
    return null;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Clear all auth data
 */
export const clearAuthData = (): void => {
  removeToken();
};
