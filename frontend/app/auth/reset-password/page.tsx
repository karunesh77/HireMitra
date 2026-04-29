import { Input, Button } from '@/components';
import Link from 'next/link';

export default function ResetPasswordPage() {
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

        {/* Reset Password Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-6">
            <span className="text-2xl">✓</span>
          </div>

          <h2 className="text-3xl font-bold text-[#001F3F] mb-2">Create New Password</h2>
          <p className="text-[#4A4A4A] mb-8">Enter your new password below. Make sure it's secure and different from your previous password.</p>

          <form className="space-y-6">
            {/* New Password Input */}
            <div>
              <label className="block text-sm font-semibold text-[#001F3F] mb-2">New Password</label>
              <Input
                placeholder="••••••••"
                type="password"
              />
              <p className="text-xs text-[#4A4A4A] mt-2">At least 8 characters with uppercase, lowercase, and numbers</p>
            </div>

            {/* Password Strength Indicator */}
            <div>
              <div className="flex gap-2">
                <div className="flex-1 h-2 bg-[#FF7A00] rounded-full"></div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
              </div>
              <p className="text-xs text-[#4A4A4A] mt-2">Password strength: Strong</p>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-semibold text-[#001F3F] mb-2">Confirm Password</label>
              <Input
                placeholder="••••••••"
                type="password"
              />
            </div>

            {/* Password Requirements */}
            <div className="p-4 bg-[#FFF4E5] rounded-lg border border-[#FFE0B2]">
              <p className="text-sm font-semibold text-[#001F3F] mb-3">Password must contain:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-[#4A4A4A]">
                  <span className="text-green-600">✓</span> At least 8 characters
                </li>
                <li className="flex items-center gap-2 text-[#4A4A4A]">
                  <span className="text-green-600">✓</span> Uppercase letter (A-Z)
                </li>
                <li className="flex items-center gap-2 text-[#4A4A4A]">
                  <span className="text-green-600">✓</span> Lowercase letter (a-z)
                </li>
                <li className="flex items-center gap-2 text-[#4A4A4A]">
                  <span className="text-green-600">✓</span> Number (0-9)
                </li>
              </ul>
            </div>

            {/* Reset Button */}
            <Button fullWidth size="lg" className="mt-8">
              Reset Password
            </Button>

            {/* Back to Login */}
            <div className="text-center pt-6 border-t border-[#E5E7EB]">
              <p className="text-[#4A4A4A] mb-2 text-sm">Remembered your password?</p>
              <Link href="/auth/login">
                <span className="text-[#FF7A00] hover:text-[#E66A00] font-semibold cursor-pointer">
                  Sign in here
                </span>
              </Link>
            </div>
          </form>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-[#B0C4DE] text-sm">
          <p>Need help? Contact our support team</p>
        </div>
      </div>
    </div>
  );
}
