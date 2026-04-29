import { Input, Button } from '@/components';
import Link from 'next/link';

export default function VerifyEmailPage() {
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

        {/* Verification Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#FFF4E5] mx-auto mb-6">
            <span className="text-4xl">✉️</span>
          </div>

          <h2 className="text-3xl font-bold text-[#001F3F] mb-2 text-center">Verify Your Email</h2>
          <p className="text-[#4A4A4A] mb-8 text-center">We've sent a verification code to your email address. Enter it below to verify your account.</p>

          <form className="space-y-6">
            {/* Email Address Display */}
            <div className="p-4 bg-[#FFF4E5] rounded-lg border border-[#FFE0B2]">
              <p className="text-sm text-[#4A4A4A]">Verification code sent to:</p>
              <p className="font-semibold text-[#001F3F] mt-1">john@example.com</p>
            </div>

            {/* Verification Code Inputs */}
            <div>
              <label className="block text-sm font-semibold text-[#001F3F] mb-4">Verification Code</label>
              <div className="flex gap-3 justify-between mb-4">
                <input
                  type="text"
                  maxLength={1}
                  placeholder="0"
                  className="w-full h-14 text-center text-2xl font-bold border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FFF4E5]"
                />
                <input
                  type="text"
                  maxLength={1}
                  placeholder="0"
                  className="w-full h-14 text-center text-2xl font-bold border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FFF4E5]"
                />
                <input
                  type="text"
                  maxLength={1}
                  placeholder="0"
                  className="w-full h-14 text-center text-2xl font-bold border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FFF4E5]"
                />
                <input
                  type="text"
                  maxLength={1}
                  placeholder="0"
                  className="w-full h-14 text-center text-2xl font-bold border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FFF4E5]"
                />
                <input
                  type="text"
                  maxLength={1}
                  placeholder="0"
                  className="w-full h-14 text-center text-2xl font-bold border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FFF4E5]"
                />
                <input
                  type="text"
                  maxLength={1}
                  placeholder="0"
                  className="w-full h-14 text-center text-2xl font-bold border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FFF4E5]"
                />
              </div>
              <p className="text-xs text-[#4A4A4A]">Check your email (including spam folder) for the 6-digit code</p>
            </div>

            {/* Or Enter Code */}
            <div>
              <label className="block text-sm font-semibold text-[#001F3F] mb-2">Or enter code here:</label>
              <Input
                placeholder="000000"
                type="text"
              />
            </div>

            {/* Verify Button */}
            <Button fullWidth size="lg" className="mt-8">
              Verify Email
            </Button>

            {/* Resend Code */}
            <div className="text-center pt-6 border-t border-[#E5E7EB]">
              <p className="text-[#4A4A4A] text-sm mb-2">Didn't receive the code?</p>
              <button className="text-[#FF7A00] hover:text-[#E66A00] font-semibold text-sm">
                Resend verification code
              </button>
              <p className="text-xs text-[#4A4A4A] mt-2">Resend available in 30 seconds</p>
            </div>
          </form>

          {/* Support Link */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Having trouble?</span> <br />
              <button className="text-blue-700 hover:text-blue-900 font-medium">Contact support</button> or try a different email address
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-[#B0C4DE] text-sm">
          <p>We're protecting your account by verifying your email address</p>
        </div>
      </div>
    </div>
  );
}
