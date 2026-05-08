'use client';

import { useState, useEffect } from 'react';
import { Input, Button } from '@/components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const savedEmail = sessionStorage.getItem('resetEmail');
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !otp || !newPassword || !confirmPassword) {
      setError('Please fill all fields');
      return;
    }
    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await apiClient.post('/api/auth/reset-password', {
        email: email.trim(),
        otp: otp.trim(),
        newPassword,
      });
      setSuccess(true);
      sessionStorage.removeItem('resetEmail');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to reset password');
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
                <span className="text-3xl">✅</span>
              </div>
              <h2 className="text-2xl font-bold text-[#001F3F] mb-2">Password Reset!</h2>
              <p className="text-[#4A4A4A] mb-6">Your password has been changed successfully.</p>
              <Button fullWidth size="lg" onClick={() => router.push('/auth/login')}>
                Go to Login
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-[#001F3F] mb-2">Reset Password</h2>
              <p className="text-[#4A4A4A] mb-6 text-sm">Enter the OTP sent to your email and set a new password.</p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Email Address</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* OTP */}
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Enter 6-Digit OTP</label>
                  <Input
                    type="text"
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setOtp(val);
                    }}
                    className="text-center text-2xl tracking-[12px] font-bold"
                  />
                  <p className="text-xs text-[#4A4A4A] mt-1">Check your email inbox for the OTP</p>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">New Password</label>
                  <Input
                    type="password"
                    placeholder="Minimum 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Confirm Password</label>
                  <Input
                    type="password"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <Button fullWidth size="lg" type="submit" disabled={isLoading} loading={isLoading}>
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </Button>
              </form>

              <div className="text-center mt-6 pt-6 border-t border-[#E5E7EB]">
                <Link href="/auth/forgot-password" className="text-[#FF7A00] hover:underline font-semibold text-sm">
                  Didn't receive OTP? Resend
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
