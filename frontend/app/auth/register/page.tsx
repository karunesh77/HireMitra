import Link from 'next/link';
import { Button } from '@/components';

export default function RegisterChoicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F3F] via-[#002a54] to-[#003366] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-120px] right-[-80px] w-[350px] h-[350px] rounded-full bg-[#FF7A00]/10 blur-3xl"></div>
        <div className="absolute bottom-[-100px] left-[-60px] w-[280px] h-[280px] rounded-full bg-[#FF7A00]/5 blur-3xl"></div>
        <div className="absolute top-[20%] left-[5%] w-2 h-2 rounded-full bg-[#FF7A00]/30 animate-float"></div>
        <div className="absolute top-[40%] right-[8%] w-3 h-3 rounded-full bg-white/10 animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-12 animate-fade-in">
          <Link href="/">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FF7A00] to-[#FF9A40] rounded-2xl text-white text-2xl font-bold mb-4 shadow-lg shadow-[#FF7A00]/25 hover:scale-105 transition-transform cursor-pointer">
              H
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-1">HireMitra</h1>
          <p className="text-[#B0C4DE] text-sm">Blue Collar Jobs Platform</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 animate-scale-in">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#FFF4E5] text-[#FF7A00] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <span>🚀</span> Get Started Free
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#001F3F] mb-3">Join HireMitra Today</h2>
            <p className="text-[#4A4A4A] max-w-md mx-auto">Are you a skilled worker or looking to hire? Choose your account type to get started.</p>
          </div>

          {/* Choice Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Worker Card */}
            <Link href="/auth/register/worker">
              <div className="p-7 rounded-2xl border-2 border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFF4E5] rounded-bl-[60px] -z-0 group-hover:bg-[#FF7A00]/10 transition-colors"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-[#FFF4E5] rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">👷</div>
                  <h3 className="text-xl font-bold text-[#001F3F] mb-2">I&apos;m a Worker</h3>
                  <p className="text-[#4A4A4A] text-sm mb-5">Find jobs, apply to projects, and grow your career</p>
                  <ul className="space-y-2.5 mb-6">
                    {['Browse job listings', 'Apply to projects', 'Build your profile', 'Get hired by employers'].map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-[#4A4A4A]">
                        <span className="w-5 h-5 bg-[#FF7A00]/10 rounded-full flex items-center justify-center text-[#FF7A00] text-xs flex-shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button fullWidth variant="primary">Register as Worker</Button>
                </div>
              </div>
            </Link>

            {/* Employer Card */}
            <Link href="/auth/register/employer">
              <div className="p-7 rounded-2xl border-2 border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#EBF4FF] rounded-bl-[60px] -z-0 group-hover:bg-[#001F3F]/10 transition-colors"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-[#EBF4FF] rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">🏢</div>
                  <h3 className="text-xl font-bold text-[#001F3F] mb-2">I&apos;m an Employer</h3>
                  <p className="text-[#4A4A4A] text-sm mb-5">Post jobs, find talent, and complete projects</p>
                  <ul className="space-y-2.5 mb-6">
                    {['Post job listings', 'Review applications', 'Hire skilled workers', 'Manage projects'].map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-[#4A4A4A]">
                        <span className="w-5 h-5 bg-[#001F3F]/10 rounded-full flex items-center justify-center text-[#001F3F] text-xs flex-shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button fullWidth variant="primary">Register as Employer</Button>
                </div>
              </div>
            </Link>
          </div>

          {/* Already have account */}
          <div className="text-center pt-7 border-t border-[#E5E7EB]">
            <p className="text-[#4A4A4A] text-sm mb-1.5">Already have an account?</p>
            <Link href="/auth/login">
              <span className="inline-flex items-center gap-1.5 text-[#FF7A00] hover:text-[#E66A00] font-semibold cursor-pointer transition-colors">
                Sign in here <span className="text-lg">→</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-[#B0C4DE] text-xs animate-fade-in animate-delay-300">
          <p>By creating an account, you agree to our</p>
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
