import { Navbar, Button } from '@/components';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#001F3F] to-[#003366] text-white py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About HireMitra</h1>
            <p className="text-xl text-[#B0C4DE] max-w-2xl mx-auto">
              Connecting skilled blue-collar workers with employers who value their expertise and commitment
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-[#001F3F] mb-6">Our Mission</h2>
                <p className="text-lg text-[#4A4A4A] mb-6">
                  HireMitra is dedicated to revolutionizing the blue-collar job market by creating a transparent,
                  efficient, and fair platform where skilled workers and employers can connect directly.
                </p>
                <p className="text-lg text-[#4A4A4A]">
                  We believe in the value of hard work and skilled labor. Our platform eliminates middlemen,
                  reduces costs, and ensures both parties get fair value for their work.
                </p>
              </div>
              <div className="bg-[#FFF4E5] rounded-xl p-8">
                <div className="text-6xl mb-6">🎯</div>
                <h3 className="text-2xl font-bold text-[#001F3F] mb-4">Empowering Blue Collar Workers</h3>
                <p className="text-[#4A4A4A]">
                  We provide tools, resources, and opportunities for workers to showcase their skills and grow their careers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-20 px-4 bg-[#FFF4E5]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-[#001F3F] text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 border border-[#FFE0B2]">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-2xl font-bold text-[#001F3F] mb-3">Trust</h3>
                <p className="text-[#4A4A4A]">
                  We build trust through transparency, secure transactions, and reliable verification of both workers and employers.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 border border-[#FFE0B2]">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold text-[#001F3F] mb-3">Efficiency</h3>
                <p className="text-[#4A4A4A]">
                  Our platform streamlines the hiring process, saving time and money for both job seekers and employers.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 border border-[#FFE0B2]">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-2xl font-bold text-[#001F3F] mb-3">Fairness</h3>
                <p className="text-[#4A4A4A]">
                  We ensure fair pricing, clear expectations, and equitable treatment for all parties involved.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-[#001F3F] text-center mb-12">Why Choose HireMitra?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="text-3xl text-[#FF7A00]">✓</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#001F3F] mb-2">Direct Connection</h3>
                  <p className="text-[#4A4A4A]">Workers and employers connect directly without middlemen, ensuring fair pricing.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="text-3xl text-[#FF7A00]">✓</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#001F3F] mb-2">Verified Profiles</h3>
                  <p className="text-[#4A4A4A]">All profiles are verified to ensure quality and reliability on both sides.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="text-3xl text-[#FF7A00]">✓</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#001F3F] mb-2">Secure Payments</h3>
                  <p className="text-[#4A4A4A]">Secure payment processing ensures both parties are protected during transactions.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="text-3xl text-[#FF7A00]">✓</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#001F3F] mb-2">Rating System</h3>
                  <p className="text-[#4A4A4A]">Transparent ratings and reviews build accountability and quality standards.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="text-3xl text-[#FF7A00]">✓</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#001F3F] mb-2">24/7 Support</h3>
                  <p className="text-[#4A4A4A]">Our dedicated support team is available to help resolve any issues quickly.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="text-3xl text-[#FF7A00]">✓</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#001F3F] mb-2">Skill Development</h3>
                  <p className="text-[#4A4A4A]">Access resources and tools to improve skills and grow professionally.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#001F3F] to-[#003366] text-white py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-[#B0C4DE] mb-8 max-w-2xl mx-auto">
              Join thousands of workers and employers already using HireMitra to connect and grow.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/auth/register">
                <Button size="lg">Create Account</Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" variant="secondary">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#001F3F] text-white py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-[#B0C4DE] mb-4">© 2024 HireMitra. All rights reserved.</p>
            <div className="flex gap-6 justify-center flex-wrap text-sm">
              <Link href="/privacy">
                <span className="hover:text-[#FF7A00] cursor-pointer">Privacy Policy</span>
              </Link>
              <Link href="/terms">
                <span className="hover:text-[#FF7A00] cursor-pointer">Terms of Service</span>
              </Link>
              <Link href="/contact">
                <span className="hover:text-[#FF7A00] cursor-pointer">Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
