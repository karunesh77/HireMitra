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
    if (!email.trim()) { setError('Please enter your email'); return; }
    setIsLoading(true);
    setError('');
    try {
      await apiClient.post('/api/auth/forgot-password', { email: email.trim() });
      setSuccess(true);
      sessionStorage.setItem('resetEmail', email.trim());
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F3F] via-[#002a54] to-[#003366] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-120px] right-[-80px] w-[300px] h-[300px] rounded-full bg-[#FF7A00]/10 blur-3xl"></div>
        <div className="absolute bottom-[-100px] left-[-60px] w-[250px] h-[250px] rounded-full bg-[#FF7A00]/5 blur-3xl"></div>
        <div className="absolute top-1/3 left-[8%] w-2 h-2 rounded-full bg-[#FF7A00]/30 animate-float"></div>
        <div className="absolute bottom-1/4 right-[12%] w-3 h-3 rounded-full bg-white/10 animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-10 animate-fade-in">
          <Link href="/">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FF7A00] to-[#FF9A40] rounded-2xl text-white text-2xl font-bold mb-4 shadow-lg shadow-[#FF7A00]/25 hover:scale-105 transition-transform cursor-pointer">
              H
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-1">HireMitra</h1>
          <p className="text-[#B0C4DE] text-sm">Blue Collar Jobs Platform</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 animate-scale-in">
          {success ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <span className="text-3xl">✉️</span>
              </div>
              <h2 className="text-2xl font-bold text-[#001F3F] mb-2">OTP Sent!</h2>
              <p className="text-[#4A4A4A] text-sm mb-6">
                We&apos;ve sent a 6-digit OTP to <strong className="text-[#001F3F]">{email}</strong>. Check your inbox.
              </p>
              <Button fullWidth size="lg" className="shadow-lg shadow-[#FF7A00]/20" onClick={() => router.push('/auth/reset-password')}>
                Enter OTP & Reset Password
              </Button>
              <button onClick={() => { setSuccess(false); setError(''); }} className="mt-4 text-sm text-[#FF7A00] hover:underline font-medium transition-colors">
                Didn&apos;t receive? Send again
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="w-12 h-12 bg-[#FFF4E5] rounded-xl flex items-center justify-center text-2xl mb-4">🔑</div>
                <h2 className="text-2xl font-bold text-[#001F3F] mb-1">Forgot Password?</h2>
                <p className="text-[#4A4A4A] text-sm">No worries! Enter your email and we&apos;ll send you a 6-digit OTP to reset it.</p>
              </div>

              {error && (
                <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-slide-up">
                  <span className="text-red-500 text-lg">⚠️</span>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-1.5">Email Address</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-sm">📧</span>
                    <Input placeholder="you@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" />
                  </div>
                </div>
                <Button fullWidth size="lg" type="submit" disabled={isLoading} loading={isLoading} className="shadow-lg shadow-[#FF7A00]/20">
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                </Button>
              </form>

              <div className="text-center mt-7 pt-7 border-t border-[#E5E7EB]">
                <p className="text-sm text-[#4A4A4A]">Remember your password?</p>
                <Link href="/auth/login" className="inline-flex items-center gap-1.5 text-[#FF7A00] hover:text-[#E66A00] font-semibold text-sm transition-colors mt-1">
                  ← Back to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
