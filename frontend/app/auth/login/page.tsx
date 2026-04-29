'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@/components';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { validateEmail, validatePassword } from '@/lib/validation';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError, userType } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [localError, setLocalError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.valid) {
      newErrors.email = emailValidation.error;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error for this field
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    if (localError) {
      setLocalError(null);
    }
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login({
        email: formData.email,
        password: formData.password,
      });

      // Redirect based on userType - will be updated in context after login
      setTimeout(() => {
        if (userType === 'employer') {
          router.push('/dashboard/employer');
        } else {
          router.push('/dashboard/worker');
        }
      }, 0);
    } catch (err: any) {
      setLocalError(err.message || 'Login failed');
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F3F] to-[#003366] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="text-5xl font-bold text-white mb-2">HM</div>
          <h1 className="text-3xl font-bold text-white mb-2">HireMitra</h1>
          <p className="text-[#B0C4DE]">Blue Collar Jobs Platform</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-2">Welcome Back</h2>
          <p className="text-[#4A4A4A] mb-8">Sign in to your account to continue</p>

          {/* Error Message */}
          {displayError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{displayError}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-[#001F3F] mb-2">
                Email Address
              </label>
              <Input
                placeholder="you@example.com"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-[#001F3F] mb-2">
                Password
              </label>
              <Input
                placeholder="••••••••"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-xs text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-[#E5E7EB] cursor-pointer accent-[#FF7A00]"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-[#4A4A4A] cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <Link href="/auth/forgot-password">
                <span className="text-sm text-[#FF7A00] hover:text-[#E66A00] font-medium cursor-pointer">
                  Forgot password?
                </span>
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              fullWidth
              size="lg"
              className="mt-8"
              disabled={isLoading}
              loading={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 pt-8 border-t border-[#E5E7EB] text-center">
            <p className="text-[#4A4A4A] mb-2">Don't have an account?</p>
            <Link href="/auth/register">
              <span className="text-[#FF7A00] hover:text-[#E66A00] font-semibold cursor-pointer">
                Create an account
              </span>
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-[#B0C4DE] text-sm">
          <p>By signing in, you agree to our</p>
          <div className="flex gap-4 justify-center mt-2">
            <Link href="/terms">
              <span className="hover:text-white cursor-pointer">
                Terms of Service
              </span>
            </Link>
            <span>•</span>
            <Link href="/privacy">
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
