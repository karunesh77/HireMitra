import type { Metadata } from 'next';
import { Navbar, Button } from '@/components';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us - HireMitra',
  description: 'Learn about HireMitra, the platform connecting skilled blue-collar workers with employers across India.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#001F3F] via-[#002a54] to-[#003366] text-white py-16 sm:py-20 px-4 relative overflow-hidden">
          <div className="absolute top-[-80px] right-[-60px] w-[200px] h-[200px] rounded-full bg-[#FF7A00]/10 blur-3xl"></div>
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <span>🏢</span> About Us
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">About HireMitra</h1>
            <p className="text-base sm:text-lg text-[#B0C4DE] max-w-2xl mx-auto">
              Connecting skilled blue-collar workers with employers who value their expertise and commitment
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="py-14 sm:py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#001F3F] mb-5">Our Mission</h2>
                <p className="text-[#4A4A4A] mb-4 leading-relaxed">
                  HireMitra is dedicated to revolutionizing the blue-collar job market by creating a transparent, efficient, and fair platform where skilled workers and employers can connect directly.
                </p>
                <p className="text-[#4A4A4A] leading-relaxed">
                  We believe in the value of hard work and skilled labor. Our platform eliminates middlemen, reduces costs, and ensures both parties get fair value for their work.
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#FFF4E5] to-[#FFE8CC] rounded-2xl p-8">
                <div className="text-5xl mb-5">🎯</div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#001F3F] mb-3">Empowering Blue Collar Workers</h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed">
                  We provide tools, resources, and opportunities for workers to showcase their skills and grow their careers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="py-14 sm:py-20 px-4 bg-[#FAFAFA]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#001F3F] text-center mb-10">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { icon: '🤝', title: 'Trust', desc: 'We build trust through transparency, secure transactions, and reliable verification of both workers and employers.' },
                { icon: '⚡', title: 'Efficiency', desc: 'Our platform streamlines the hiring process, saving time and money for both job seekers and employers.' },
                { icon: '💼', title: 'Fairness', desc: 'We ensure fair pricing, clear expectations, and equitable treatment for all parties involved.' },
              ].map((v) => (
                <div key={v.title} className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E7EB] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-12 h-12 bg-[#FFF4E5] rounded-xl flex items-center justify-center text-2xl mb-4">{v.icon}</div>
                  <h3 className="text-xl font-bold text-[#001F3F] mb-2">{v.title}</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose */}
        <div className="py-14 sm:py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#001F3F] text-center mb-10">Why Choose HireMitra?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Direct Connection', desc: 'Workers and employers connect directly without middlemen, ensuring fair pricing.' },
                { title: 'Verified Profiles', desc: 'All profiles are verified to ensure quality and reliability on both sides.' },
                { title: 'Secure Payments', desc: 'Secure payment processing ensures both parties are protected during transactions.' },
                { title: 'Rating System', desc: 'Transparent ratings and reviews build accountability and quality standards.' },
                { title: '24/7 Support', desc: 'Our dedicated support team is available to help resolve any issues quickly.' },
                { title: 'Skill Development', desc: 'Access resources and tools to improve skills and grow professionally.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-3.5 p-4 rounded-xl hover:bg-[#FAFAFA] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#FFF4E5] flex items-center justify-center text-[#FF7A00] text-sm font-bold flex-shrink-0 mt-0.5">&#10003;</div>
                  <div>
                    <h3 className="font-bold text-[#001F3F] mb-1">{item.title}</h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#001F3F] via-[#002a54] to-[#003366] text-white py-16 sm:py-20 px-4 relative overflow-hidden">
          <div className="absolute bottom-[-60px] left-[-40px] w-[180px] h-[180px] rounded-full bg-[#FF7A00]/10 blur-3xl"></div>
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-base sm:text-lg text-[#B0C4DE] mb-8 max-w-2xl mx-auto">
              Join thousands of workers and employers already using HireMitra to connect and grow.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/auth/register"><Button size="lg" className="shadow-lg shadow-[#FF7A00]/20">Create Account</Button></Link>
              <Link href="/auth/login"><Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">Sign In</Button></Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#001F3F] text-white py-10 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-[#B0C4DE] text-sm mb-3">&copy; 2024 HireMitra. All rights reserved.</p>
            <div className="flex gap-5 justify-center flex-wrap text-sm">
              <Link href="/privacy"><span className="text-[#B0C4DE] hover:text-[#FF7A00] transition-colors cursor-pointer">Privacy Policy</span></Link>
              <Link href="/terms"><span className="text-[#B0C4DE] hover:text-[#FF7A00] transition-colors cursor-pointer">Terms of Service</span></Link>
              <Link href="/contact"><span className="text-[#B0C4DE] hover:text-[#FF7A00] transition-colors cursor-pointer">Contact Us</span></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
