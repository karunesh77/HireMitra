import Link from 'next/link';
import { Button } from '@/components';

export default function RegisterChoicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F3F] to-[#003366] flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        {/* Logo Section */}
        <div className="text-center mb-16">
          <div className="text-5xl font-bold text-white mb-2">HM</div>
          <h1 className="text-3xl font-bold text-white mb-2">HireMitra</h1>
          <p className="text-[#B0C4DE]">Blue Collar Jobs Platform</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#001F3F] mb-3">Join HireMitra Today</h2>
            <p className="text-lg text-[#4A4A4A]">Are you a skilled worker or looking to hire? Choose your account type</p>
          </div>

          {/* Choice Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Worker Card */}
            <Link href="/auth/register/worker">
              <div className="p-8 rounded-xl border-2 border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-lg transition cursor-pointer group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition">👷</div>
                <h3 className="text-2xl font-bold text-[#001F3F] mb-2">I'm a Worker</h3>
                <p className="text-[#4A4A4A] mb-6">
                  Find job opportunities, apply to projects, and grow your skills
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-[#4A4A4A]">
                    <span className="text-[#FF7A00]">✓</span> Browse job listings
                  </li>
                  <li className="flex items-center gap-2 text-[#4A4A4A]">
                    <span className="text-[#FF7A00]">✓</span> Apply to projects
                  </li>
                  <li className="flex items-center gap-2 text-[#4A4A4A]">
                    <span className="text-[#FF7A00]">✓</span> Build your profile
                  </li>
                  <li className="flex items-center gap-2 text-[#4A4A4A]">
                    <span className="text-[#FF7A00]">✓</span> Get hired by employers
                  </li>
                </ul>
                <Button fullWidth variant="primary">
                  Register as Worker
                </Button>
              </div>
            </Link>

            {/* Employer Card */}
            <Link href="/auth/register/employer">
              <div className="p-8 rounded-xl border-2 border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-lg transition cursor-pointer group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition">🏢</div>
                <h3 className="text-2xl font-bold text-[#001F3F] mb-2">I'm an Employer</h3>
                <p className="text-[#4A4A4A] mb-6">
                  Post jobs, find talented workers, and complete your projects
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-[#4A4A4A]">
                    <span className="text-[#FF7A00]">✓</span> Post job listings
                  </li>
                  <li className="flex items-center gap-2 text-[#4A4A4A]">
                    <span className="text-[#FF7A00]">✓</span> Review applications
                  </li>
                  <li className="flex items-center gap-2 text-[#4A4A4A]">
                    <span className="text-[#FF7A00]">✓</span> Hire skilled workers
                  </li>
                  <li className="flex items-center gap-2 text-[#4A4A4A]">
                    <span className="text-[#FF7A00]">✓</span> Manage projects
                  </li>
                </ul>
                <Button fullWidth variant="primary">
                  Register as Employer
                </Button>
              </div>
            </Link>
          </div>

          {/* Already have account */}
          <div className="text-center pt-8 border-t border-[#E5E7EB]">
            <p className="text-[#4A4A4A] mb-2">Already have an account?</p>
            <Link href="/auth/login">
              <span className="text-[#FF7A00] hover:text-[#E66A00] font-semibold cursor-pointer">
                Sign in here
              </span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-[#B0C4DE] text-sm">
          <p>By creating an account, you agree to our</p>
          <div className="flex gap-4 justify-center mt-2">
            <Link href="/terms">
              <span className="hover:text-white cursor-pointer">Terms of Service</span>
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
