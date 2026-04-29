'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Redirect if already logged in
    if (!isLoading && isAuthenticated && user) {
      if (user.userType === 'worker') {
        router.push('/dashboard/worker');
      } else if (user.userType === 'employer') {
        router.push('/dashboard/employer');
      }
    }
  }, [isAuthenticated, user, isLoading, router]);

  // If already logged in or loading, don't show landing page
  if (isLoading || (isAuthenticated && user)) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#FFF4E5]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-[#001F3F] leading-tight mb-4">
                  Find Your Perfect Job Match
                </h1>
                <p className="text-xl text-[#4A4A4A] leading-relaxed">
                  Connect with skilled workers and employers. Find jobs that match your skills, showcase your experience, and grow your career.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/register?type=worker"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[#FF7A00] hover:bg-[#E66A00] text-white font-semibold transition transform hover:scale-105 shadow-lg"
                >
                  I'm Looking for Work
                </a>
                <a
                  href="/register?type=employer"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-[#FF7A00] text-[#FF7A00] hover:bg-[#FFF4E5] font-semibold transition"
                >
                  I'm Hiring
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#E5E7EB]">
                <div>
                  <p className="text-3xl font-bold text-[#FF7A00]">10K+</p>
                  <p className="text-[#4A4A4A] text-sm mt-1">Workers Active</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#FF7A00]">5K+</p>
                  <p className="text-[#4A4A4A] text-sm mt-1">Jobs Posted</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#FF7A00]">95%</p>
                  <p className="text-[#4A4A4A] text-sm mt-1">Success Rate</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden lg:block">
              <div className="bg-gradient-to-br from-[#FF7A00] to-[#FFF4E5] rounded-2xl h-96 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl mb-4">👷‍♂️</p>
                  <p className="text-[#001F3F] font-semibold">Blue Collar Workers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#001F3F] mb-4">Why Choose HireMitra?</h2>
            <p className="text-xl text-[#4A4A4A]">Everything you need to succeed in your career</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-lg transition">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-[#001F3F] mb-3">Smart Matching</h3>
              <p className="text-[#4A4A4A]">Get matched with jobs that align perfectly with your skills and experience level.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-lg transition">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-2xl font-bold text-[#001F3F] mb-3">Direct Communication</h3>
              <p className="text-[#4A4A4A]">Chat directly with employers and get instant responses to your questions.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-lg transition">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold text-[#001F3F] mb-3">Build Reputation</h3>
              <p className="text-[#4A4A4A]">Earn ratings and build a professional portfolio to showcase your expertise.</p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-lg transition">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-2xl font-bold text-[#001F3F] mb-3">Easy Job Posting</h3>
              <p className="text-[#4A4A4A]">Post jobs in minutes and start receiving applications from qualified candidates.</p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-lg transition">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold text-[#001F3F] mb-3">Secure & Safe</h3>
              <p className="text-[#4A4A4A]">Verified profiles and secure transactions ensure a safe experience for everyone.</p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-lg transition">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-[#001F3F] mb-3">Grow Your Skills</h3>
              <p className="text-[#4A4A4A]">Access opportunities to work on diverse projects and expand your skillset.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FFF4E5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#001F3F] mb-4">How It Works</h2>
            <p className="text-xl text-[#4A4A4A]">Get started in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold text-[#001F3F] mb-3">Create Account</h3>
              <p className="text-[#4A4A4A]">Sign up as a worker or employer in just 2 minutes.</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold text-[#001F3F] mb-3">Find or Post</h3>
              <p className="text-[#4A4A4A]">Browse jobs or post your job requirements to find the right match.</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold text-[#001F3F] mb-3">Connect & Work</h3>
              <p className="text-[#4A4A4A]">Chat, agree on terms, and start working together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-[#001F3F] to-[#003d5c] rounded-2xl p-12">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-white/90 mb-8">
            Join thousands of workers and employers already using HireMitra
          </p>
          <a
            href="/register"
            className="inline-flex items-center justify-center px-10 py-4 rounded-lg bg-[#FF7A00] hover:bg-[#E66A00] text-white font-semibold transition transform hover:scale-105 shadow-lg text-lg"
          >
            Get Started Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#001F3F] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#FF7A00] rounded-lg flex items-center justify-center font-bold">
                  H
                </div>
                <span className="text-lg font-bold">HireMitra</span>
              </div>
              <p className="text-white/70 text-sm">Connecting skilled workers with opportunities.</p>
            </div>

            {/* For Workers */}
            <div>
              <h4 className="font-semibold mb-4">For Workers</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#" className="hover:text-[#FF7A00] transition">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-[#FF7A00] transition">My Applications</a></li>
                <li><a href="#" className="hover:text-[#FF7A00] transition">My Profile</a></li>
              </ul>
            </div>

            {/* For Employers */}
            <div>
              <h4 className="font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#" className="hover:text-[#FF7A00] transition">Post a Job</a></li>
                <li><a href="#" className="hover:text-[#FF7A00] transition">Find Workers</a></li>
                <li><a href="#" className="hover:text-[#FF7A00] transition">Manage Jobs</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#" className="hover:text-[#FF7A00] transition">About Us</a></li>
                <li><a href="#" className="hover:text-[#FF7A00] transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#FF7A00] transition">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-white/70 text-sm">
            <p>&copy; 2026 HireMitra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
