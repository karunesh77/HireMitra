import { Input, Button } from '@/components';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F3F] to-[#003366] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <Link href="/">
            <div className="text-5xl font-bold text-white mb-2 cursor-pointer hover:opacity-80">HM</div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">HireMitra</h1>
          <p className="text-[#B0C4DE]">Blue Collar Jobs Platform</p>
        </div>

        {/* Recovery Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-2">Reset Your Password</h2>
          <p className="text-[#4A4A4A] mb-8">Enter your email address and we'll send you a link to reset your password</p>

          <form className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-[#001F3F] mb-2">Email Address</label>
              <Input
                placeholder="you@example.com"
                type="email"
              />
              <p className="text-xs text-[#4A4A4A] mt-2">We'll send you a password reset link within 5 minutes</p>
            </div>

            {/* Submit Button */}
            <Button fullWidth size="lg" className="mt-8">
              Send Reset Link
            </Button>

            {/* Back to Login */}
            <div className="text-center pt-6 border-t border-[#E5E7EB]">
              <p className="text-[#4A4A4A] mb-2 text-sm">Remember your password?</p>
              <Link href="/auth/login">
                <span className="text-[#FF7A00] hover:text-[#E66A00] font-semibold cursor-pointer">
                  Sign in here
                </span>
              </Link>
            </div>
          </form>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Need help?</span> Contact our support team if you don't receive an email within 5 minutes.
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-[#B0C4DE] text-sm">
          <p>Don't have an account?</p>
          <Link href="/auth/register">
            <span className="text-[#FF7A00] hover:text-white cursor-pointer">Create one now</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
