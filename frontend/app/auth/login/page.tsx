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
    if (!emailValidation.valid) newErrors.email = emailValidation.error;
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.valid) newErrors.password = passwordValidation.error;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name as keyof typeof errors]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (localError) setLocalError(null);
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await login({ email: formData.email, password: formData.password });
      setTimeout(() => {
        router.push(userType === 'employer' ? '/dashboard/employer' : '/dashboard/worker');
      }, 0);
    } catch (err: any) {
      setLocalError(err.message || 'Login failed');
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F3F] via-[#002a54] to-[#003366] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-120px] right-[-80px] w-[300px] h-[300px] rounded-full bg-[#FF7A00]/10 blur-3xl"></div>
        <div className="absolute bottom-[-100px] left-[-60px] w-[250px] h-[250px] rounded-full bg-[#FF7A00]/5 blur-3xl"></div>
        <div className="absolute top-1/3 left-[10%] w-2 h-2 rounded-full bg-[#FF7A00]/30 animate-float"></div>
        <div className="absolute top-1/4 right-[15%] w-3 h-3 rounded-full bg-white/10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 right-[10%] w-2 h-2 rounded-full bg-[#FF7A00]/20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-10 animate-fade-in">
          <Link href="/">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FF7A00] to-[#FF9A40] rounded-2xl text-white text-2xl font-bold mb-4 shadow-lg shadow-[#FF7A00]/25 hover:scale-105 transition-transform cursor-pointer">
              H
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-1">HireMitra</h1>
          <p className="text-[#B0C4DE] text-sm">Blue Collar Jobs Platform</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 animate-scale-in">
          <h2 className="text-2xl font-bold text-[#001F3F] mb-1">Welcome Back</h2>
          <p className="text-[#4A4A4A] text-sm mb-7">Sign in to your account to continue</p>

          {/* Error Message */}
          {displayError && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-slide-up">
              <span className="text-red-500 text-lg">⚠️</span>
              <p className="text-sm text-red-600">{displayError}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-[#001F3F] mb-1.5">Email Address</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-sm">📧</span>
                <Input placeholder="you@example.com" type="email" name="email" value={formData.email} onChange={handleChange} className="pl-10" />
              </div>
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#001F3F] mb-1.5">Password</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-sm">🔒</span>
                <Input placeholder="••••••••" type="password" name="password" value={formData.password} onChange={handleChange} className="pl-10" />
              </div>
              {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} className="w-4 h-4 rounded border-[#E5E7EB] cursor-pointer accent-[#FF7A00]" />
                <label htmlFor="remember" className="text-sm text-[#4A4A4A] cursor-pointer">Remember me</label>
              </div>
              <Link href="/auth/forgot-password">
                <span className="text-sm text-[#FF7A00] hover:text-[#E66A00] font-medium cursor-pointer transition-colors">Forgot password?</span>
              </Link>
            </div>

            <Button type="submit" fullWidth size="lg" className="mt-6 shadow-lg shadow-[#FF7A00]/20" disabled={isLoading} loading={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-7 pt-7 border-t border-[#E5E7EB] text-center">
            <p className="text-[#4A4A4A] text-sm mb-2">Don&apos;t have an account?</p>
            <Link href="/auth/register">
              <span className="inline-flex items-center gap-1.5 text-[#FF7A00] hover:text-[#E66A00] font-semibold cursor-pointer transition-colors">
                Create an account <span className="text-lg">→</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-[#B0C4DE] text-xs animate-fade-in animate-delay-300">
          <p>By signing in, you agree to our</p>
          <div className="flex gap-3 justify-center mt-1.5">
            <Link href="/terms"><span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span></Link>
            <span className="text-[#B0C4DE]/50">•</span>
            <Link href="/privacy"><span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
