'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (user.userType === 'worker') {
        router.push('/dashboard/worker');
      } else if (user.userType === 'employer') {
        router.push('/dashboard/employer');
      }
    }
  }, [isAuthenticated, user, isLoading, router]);

  if (isLoading || (isAuthenticated && user)) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
      </div>
    );
  }

  const categories = [
    { icon: '🔧', name: 'Plumbing', jobs: '500+' },
    { icon: '⚡', name: 'Electrical', jobs: '400+' },
    { icon: '🪚', name: 'Carpentry', jobs: '350+' },
    { icon: '🎨', name: 'Painting', jobs: '300+' },
    { icon: '🔩', name: 'Welding', jobs: '250+' },
    { icon: '🚗', name: 'Driving', jobs: '600+' },
    { icon: '❄️', name: 'HVAC', jobs: '200+' },
    { icon: '🏗️', name: 'Masonry', jobs: '150+' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#001F3F] via-[#002d5c] to-[#003d7a]" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #FF7A00 0%, transparent 50%), radial-gradient(circle at 80% 20%, #FF7A00 0%, transparent 50%)' }} />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-slide-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/90 text-sm font-medium">1000+ workers hired this month</span>
              </div>

              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Find Your Perfect
                  <span className="block gradient-text mt-2">Job Match</span>
                </h1>
                <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-lg">
                  India's leading platform connecting skilled blue-collar workers with top employers. Your next opportunity is just a click away.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/auth/register/worker"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FF7A00] hover:bg-[#e56e00] text-white font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/25 text-lg animate-pulse-glow"
                >
                  I'm Looking for Work →
                </Link>
                <Link
                  href="/auth/register/employer"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white/30 text-white hover:bg-white/10 font-semibold transition-all duration-300 backdrop-blur-sm"
                >
                  I'm Hiring Workers
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                <div className="animate-fade-in animate-delay-200">
                  <p className="text-3xl sm:text-4xl font-bold text-[#FF7A00]">10K+</p>
                  <p className="text-white/60 text-sm mt-1">Active Workers</p>
                </div>
                <div className="animate-fade-in animate-delay-400">
                  <p className="text-3xl sm:text-4xl font-bold text-[#FF7A00]">5K+</p>
                  <p className="text-white/60 text-sm mt-1">Jobs Posted</p>
                </div>
                <div className="animate-fade-in animate-delay-600">
                  <p className="text-3xl sm:text-4xl font-bold text-[#FF7A00]">95%</p>
                  <p className="text-white/60 text-sm mt-1">Success Rate</p>
                </div>
              </div>
            </div>

            {/* Right - Illustration */}
            <div className="hidden lg:flex justify-center animate-slide-right">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-[#FF7A00]/20 to-[#FF7A00]/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <div className="w-64 h-64 bg-gradient-to-br from-[#FF7A00]/30 to-[#FF7A00]/10 rounded-full flex items-center justify-center">
                    <div className="text-center animate-float">
                      <p className="text-8xl mb-2">👷</p>
                      <p className="text-white font-bold text-lg">Skilled Workers</p>
                      <p className="text-white/60 text-sm">Ready to work</p>
                    </div>
                  </div>
                </div>
                {/* Floating badges */}
                <div className="absolute top-4 -left-4 bg-white rounded-xl px-4 py-3 shadow-xl animate-float" style={{ animationDelay: '0.5s' }}>
                  <p className="text-sm font-bold text-[#001F3F]">⚡ Instant Hire</p>
                </div>
                <div className="absolute bottom-8 -right-4 bg-white rounded-xl px-4 py-3 shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                  <p className="text-sm font-bold text-[#001F3F]">💰 Fair Pay</p>
                </div>
                <div className="absolute top-1/2 -right-8 bg-[#FF7A00] rounded-xl px-4 py-3 shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
                  <p className="text-sm font-bold text-white">✅ Verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L60 70C120 60 240 40 360 33.3C480 27 600 33 720 40C840 47 960 53 1080 50C1200 47 1320 33 1380 27L1440 20V80H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ===== CATEGORIES SECTION ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#001F3F] mb-3">Popular Categories</h2>
            <p className="text-[#4A4A4A] text-lg">Explore opportunities across various trades</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.name}
                href={`/jobs?category=${cat.name.toLowerCase()}`}
                className={`group p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] card-hover text-center animate-fade-in animate-delay-${(i + 1) * 100}`}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
                <h3 className="font-bold text-[#001F3F] mb-1">{cat.name}</h3>
                <p className="text-sm text-[#FF7A00] font-medium">{cat.jobs} jobs</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#FFF4E5] text-[#FF7A00] rounded-full text-sm font-semibold mb-4">WHY HIREMITRA?</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#001F3F] mb-4">Everything You Need to Succeed</h2>
            <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">Built for blue-collar professionals and the employers who hire them</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'Smart Matching', desc: 'AI-powered job recommendations based on your skills, experience, and location preferences.' },
              { icon: '💬', title: 'Direct Chat', desc: 'Message employers directly. No middlemen, no delays — just straight communication.' },
              { icon: '⭐', title: 'Build Reputation', desc: 'Earn ratings and reviews to stand out. Your work speaks for itself on HireMitra.' },
              { icon: '💼', title: 'Easy Job Posting', desc: 'Employers can post jobs in under 2 minutes and start receiving applications instantly.' },
              { icon: '🛡️', title: 'Verified Profiles', desc: 'Every profile is verified for authenticity. Work with confidence and trust.' },
              { icon: '📱', title: 'Mobile Friendly', desc: 'Apply for jobs, chat with employers, and manage everything from your phone.' },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className="group p-8 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] card-hover"
              >
                <div className="w-14 h-14 bg-[#FFF4E5] rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:bg-[#FF7A00] group-hover:scale-110 transition-all duration-300">
                  <span className="group-hover:grayscale group-hover:brightness-200">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-[#001F3F] mb-3">{feature.title}</h3>
                <p className="text-[#4A4A4A] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#FFF4E5] text-[#FF7A00] rounded-full text-sm font-semibold mb-4">HOW IT WORKS</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#001F3F] mb-4">Get Started in 3 Steps</h2>
            <p className="text-lg text-[#4A4A4A]">Simple, fast, and effective</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-[#FF7A00] via-[#FF7A00] to-[#FF7A00] opacity-20" />

            {[
              { step: '01', title: 'Create Account', desc: 'Sign up as a worker or employer. Add your skills, experience, and preferences.', icon: '📝' },
              { step: '02', title: 'Find Opportunities', desc: 'Browse jobs or post requirements. Use filters to find the perfect match.', icon: '🔍' },
              { step: '03', title: 'Connect & Work', desc: 'Chat, agree on terms, and start working. Build lasting relationships.', icon: '🤝' },
            ].map((item) => (
              <div key={item.step} className="text-center relative">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#FF7A00] to-[#e56e00] rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-orange-500/20 rotate-3 hover:rotate-0 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-[#001F3F] text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#001F3F] mb-3">{item.title}</h3>
                <p className="text-[#4A4A4A] max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FFF4E5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-white text-[#FF7A00] rounded-full text-sm font-semibold mb-4">TESTIMONIALS</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#001F3F] mb-4">What Our Users Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Rajesh Kumar', role: 'Electrician', text: 'Found 3 jobs in my first week! The platform is easy to use and employers respond quickly.', rating: 5 },
              { name: 'Priya Singh', role: 'Employer', text: 'Hiring skilled workers used to take weeks. With HireMitra, I find qualified candidates in days.', rating: 5 },
              { name: 'Vikram Patel', role: 'Plumber', text: 'My income increased by 40% after joining HireMitra. The rating system helps me get better jobs.', rating: 5 },
            ].map((t) => (
              <div key={t.name} className="p-8 rounded-2xl bg-white shadow-sm card-hover">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-[#4A4A4A] mb-6 leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#E5E7EB]">
                  <div className="w-10 h-10 bg-[#FF7A00] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-[#001F3F] text-sm">{t.name}</p>
                    <p className="text-xs text-[#4A4A4A]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-[#001F3F] via-[#002d5c] to-[#003d7a] rounded-3xl p-12 sm:p-16 text-center overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF7A00]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FF7A00]/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                Join thousands of workers and employers already using HireMitra to build better futures.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center px-10 py-4 rounded-xl bg-[#FF7A00] hover:bg-[#e56e00] text-white font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/25 text-lg"
                >
                  Create Free Account
                </Link>
                <Link
                  href="/jobs"
                  className="inline-flex items-center justify-center px-10 py-4 rounded-xl border-2 border-white/30 text-white hover:bg-white/10 font-semibold transition-all duration-300"
                >
                  Browse Jobs First
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#001F3F] text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#FF7A00] rounded-xl flex items-center justify-center font-bold text-lg">
                  H
                </div>
                <span className="text-xl font-bold">HireMitra</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                India's leading platform for blue-collar job seekers and employers.
              </p>
              <div className="flex gap-3">
                <span className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#FF7A00] transition cursor-pointer text-sm">in</span>
                <span className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#FF7A00] transition cursor-pointer text-sm">tw</span>
                <span className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#FF7A00] transition cursor-pointer text-sm">ig</span>
              </div>
            </div>

            {/* For Workers */}
            <div>
              <h4 className="font-semibold mb-4 text-white/90">For Workers</h4>
              <ul className="space-y-3 text-white/60 text-sm">
                <li><a href="/jobs" className="hover:text-[#FF7A00] transition">Browse Jobs</a></li>
                <li><a href="/dashboard/worker/applications" className="hover:text-[#FF7A00] transition">My Applications</a></li>
                <li><a href="/dashboard/worker/profile" className="hover:text-[#FF7A00] transition">My Profile</a></li>
              </ul>
            </div>

            {/* For Employers */}
            <div>
              <h4 className="font-semibold mb-4 text-white/90">For Employers</h4>
              <ul className="space-y-3 text-white/60 text-sm">
                <li><a href="/dashboard/employer/jobs/create" className="hover:text-[#FF7A00] transition">Post a Job</a></li>
                <li><a href="/dashboard/employer/workers" className="hover:text-[#FF7A00] transition">Find Workers</a></li>
                <li><a href="/dashboard/employer/jobs" className="hover:text-[#FF7A00] transition">Manage Jobs</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4 text-white/90">Company</h4>
              <ul className="space-y-3 text-white/60 text-sm">
                <li><a href="/about" className="hover:text-[#FF7A00] transition">About Us</a></li>
                <li><a href="/contact" className="hover:text-[#FF7A00] transition">Contact</a></li>
                <li><a href="/privacy" className="hover:text-[#FF7A00] transition">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-[#FF7A00] transition">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">&copy; 2026 HireMitra. All rights reserved.</p>
            <p className="text-white/40 text-xs">Made with ❤️ in India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
