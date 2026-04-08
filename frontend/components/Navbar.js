'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export default function Navbar() {
  const { user, isAuth, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container flex justify-between items-center py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          💼 HireMitra
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/jobs" className="text-gray-700 hover:text-blue-600 font-medium">
            Find Jobs
          </Link>

          {isAuth ? (
            <>
              {user?.userType === 'worker' && (
                <Link href="/jobs/nearby" className="text-gray-700 hover:text-blue-600 font-medium">
                  🗺️ Near You
                </Link>
              )}

              {user?.userType === 'employer' && (
                <>
                  <Link href="/jobs/create" className="text-gray-700 hover:text-blue-600 font-medium">
                    Post Job
                  </Link>

                  <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                    Dashboard
                  </Link>
                </>
              )}

              <Link href="/applications" className="text-gray-700 hover:text-blue-600 font-medium">
                Applications
              </Link>

              <Link href="/profile" className="text-gray-700 hover:text-blue-600 font-medium">
                Profile
              </Link>

              <button
                onClick={logout}
                className="btn-primary btn-small"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="btn-secondary btn-small">
                Login
              </Link>
              <Link href="/auth/register" className="btn-primary btn-small">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-100 p-4 space-y-3">
          <Link href="/jobs" className="block text-gray-700 hover:text-blue-600">
            Find Jobs
          </Link>

          {isAuth ? (
            <>
              {user?.userType === 'worker' && (
                <Link href="/jobs/nearby" className="block text-gray-700 hover:text-blue-600">
                  🗺️ Jobs Near You
                </Link>
              )}

              {user?.userType === 'employer' && (
                <>
                  <Link href="/jobs/create" className="block text-gray-700 hover:text-blue-600">
                    Post Job
                  </Link>

                  <Link href="/dashboard" className="block text-gray-700 hover:text-blue-600">
                    Dashboard
                  </Link>
                </>
              )}

              <Link href="/applications" className="block text-gray-700 hover:text-blue-600">
                Applications
              </Link>

              <Link href="/profile" className="block text-gray-700 hover:text-blue-600">
                Profile
              </Link>

              <button
                onClick={logout}
                className="btn-primary btn-small w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="block btn-secondary btn-small text-center">
                Login
              </Link>
              <Link href="/auth/register" className="block btn-primary btn-small text-center">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
