'use client';

import { useState } from 'react';
import { Input, Button } from '@/components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await apiClient.post('/api/auth/forgot-password', { email: email.trim() });
      setSuccess(true);
      // Store email for reset page
      sessionStorage.setItem('resetEmail', email.trim());
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F3F] to-[#003366] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <Link href="/">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#FF7A00] rounded-xl text-white text-2xl font-bold mb-3">H</div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">HireMitra</h1>
          <p className="text-[#B0C4DE]">Blue Collar Jobs Platform</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✉️</span>
              </div>
              <h2 className="text-2xl font-bold text-[#001F3F] mb-2">OTP Sent!</h2>
              <p className="text-[#4A4A4A] mb-6">
                We've sent a 6-digit OTP to <strong>{email}</strong>. Check your inbox.
              </p>
              <Button fullWidth size="lg" onClick={() => router.push('/auth/reset-password')}>
                Enter OTP & Reset Password
              </Button>
              <button
                onClick={() => { setSuccess(false); setError(''); }}
                className="mt-4 text-sm text-[#FF7A00] hover:underline"
              >
                Didn't receive? Send again
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-[#001F3F] mb-2">Forgot Password?</h2>
              <p className="text-[#4A4A4A] mb-6 text-sm">Enter your email and we'll send you a 6-digit OTP to reset your password.</p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Email Address</label>
                  <Input
                    placeholder="you@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <Button fullWidth size="lg" type="submit" disabled={isLoading} loading={isLoading}>
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                </Button>
              </form>

              <div className="text-center mt-6 pt-6 border-t border-[#E5E7EB]">
                <p className="text-sm text-[#4A4A4A]">Remember your password?</p>
                <Link href="/auth/login" className="text-[#FF7A00] hover:underline font-semibold text-sm">
                  Sign in here
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
