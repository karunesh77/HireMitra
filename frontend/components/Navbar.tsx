'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import apiClient from '@/lib/api';

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, user, logout, userType, isLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Poll for unread notifications every 30 seconds
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchUnread = async () => {
      try {
        const res = await apiClient.get('/api/notifications?limit=1');
        setUnreadCount(res.data.unreadCount || 0);
      } catch {}
    };

    fetchUnread();
    const interval = setInterval(fetchUnread, 5000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    router.push('/');
  };

  const getDashboardLink = () => {
    if (!isAuthenticated || !userType) return '/dashboard/worker';
    return userType === 'employer' ? '/dashboard/employer' : '/dashboard/worker';
  };

  const getNotifLink = () =>
    userType === 'employer'
      ? '/dashboard/employer/notifications'
      : '/dashboard/worker/notifications';

  return (
    <nav className="fixed top-0 w-full bg-[#001F3F] border-b border-[#E5E7EB] z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#FF7A00] rounded-lg flex items-center justify-center font-bold text-white text-sm sm:text-base">
              H
            </div>
            <span className="hidden sm:inline text-lg sm:text-xl font-bold text-white group-hover:text-[#FF7A00] transition">
              HireMitra
            </span>
            <span className="sm:hidden text-lg font-bold text-white group-hover:text-[#FF7A00] transition">
              HM
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs, skills..."
                className="w-full px-4 py-2 rounded-lg bg-white text-[#001F3F] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#FF7A00] text-sm"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-[#4A4A4A] hover:text-[#FF7A00] transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href={isAuthenticated && userType === 'worker' ? '/dashboard/worker/jobs' : isAuthenticated && userType === 'employer' ? '/dashboard/employer' : '/jobs'}
              className="text-white hover:text-[#FF7A00] transition font-medium text-sm"
            >
              Jobs
            </Link>
            <Link
              href={isAuthenticated && userType === 'employer' ? '/dashboard/employer/workers' : isAuthenticated && userType === 'worker' ? '/dashboard/worker' : '/workers'}
              className="text-white hover:text-[#FF7A00] transition font-medium text-sm"
            >
              Workers
            </Link>
            <Link href="/about" className="text-white hover:text-[#FF7A00] transition font-medium text-sm">About</Link>
            <Link href="/contact" className="text-white hover:text-[#FF7A00] transition font-medium text-sm">Contact</Link>
          </div>

          {/* Hamburger Menu Button (mobile only) — right side */}
          <button
            className="lg:hidden p-2 text-white hover:text-[#FF7A00] transition flex-shrink-0"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle menu"
          >
            {showMobileMenu ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Auth Section */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 relative">
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-white/20"></div>
            ) : isAuthenticated && user ? (
              <>
                {/* Notification Bell */}
                <Link href={getNotifLink()} className="relative p-2 text-white hover:text-[#FF7A00] transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full font-bold leading-none">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </Link>

                {/* User Menu Button */}
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-white hover:bg-white/10 transition font-medium text-sm sm:text-base"
                >
                  <div className="w-6 h-6 rounded-full bg-[#FF7A00] flex items-center justify-center text-xs font-bold">
                    {user.firstName?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline text-sm">{user.firstName}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                {showUserMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                    <Link href={getDashboardLink()} onClick={() => setShowUserMenu(false)}>
                      <button className="w-full text-left px-4 py-2 text-[#001F3F] hover:bg-gray-50 transition text-sm font-medium">Dashboard</button>
                    </Link>
                    <Link href={`${getDashboardLink()}/profile`} onClick={() => setShowUserMenu(false)}>
                      <button className="w-full text-left px-4 py-2 text-[#001F3F] hover:bg-gray-50 transition text-sm">Profile</button>
                    </Link>
                    <Link href={getNotifLink()} onClick={() => setShowUserMenu(false)}>
                      <button className="w-full text-left px-4 py-2 text-[#001F3F] hover:bg-gray-50 transition text-sm flex items-center justify-between">
                        <span>Notifications</span>
                        {unreadCount > 0 && (
                          <span className="w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full font-bold">
                            {unreadCount > 9 ? '9+' : unreadCount}
                          </span>
                        )}
                      </button>
                    </Link>
                    <Link href={`${getDashboardLink()}/settings`} onClick={() => setShowUserMenu(false)}>
                      <button className="w-full text-left px-4 py-2 text-[#001F3F] hover:bg-gray-50 transition text-sm">Settings</button>
                    </Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 transition text-sm font-medium"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="hidden lg:flex items-center gap-3">
                <Link href="/auth/login" className="px-4 py-2 text-white hover:text-[#FF7A00] transition font-medium text-sm">Login</Link>
                <Link href="/auth/register" className="px-4 py-2 rounded-lg bg-[#FF7A00] hover:bg-[#E66A00] text-white transition font-medium text-sm shadow-md">Register</Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {showMobileMenu && (
          <div className="lg:hidden border-t border-white/10 py-3 space-y-1">
            <Link
              href={isAuthenticated && userType === 'worker' ? '/dashboard/worker/jobs' : isAuthenticated && userType === 'employer' ? '/dashboard/employer' : '/jobs'}
              onClick={() => setShowMobileMenu(false)}
              className="block px-4 py-2 text-white hover:text-[#FF7A00] hover:bg-white/10 rounded-lg transition font-medium"
            >
              Jobs
            </Link>
            <Link
              href={isAuthenticated && userType === 'employer' ? '/dashboard/employer/workers' : isAuthenticated && userType === 'worker' ? '/dashboard/worker' : '/workers'}
              onClick={() => setShowMobileMenu(false)}
              className="block px-4 py-2 text-white hover:text-[#FF7A00] hover:bg-white/10 rounded-lg transition font-medium"
            >
              Workers
            </Link>
            <Link href="/about" onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 text-white hover:text-[#FF7A00] hover:bg-white/10 rounded-lg transition font-medium">About</Link>
            <Link href="/contact" onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 text-white hover:text-[#FF7A00] hover:bg-white/10 rounded-lg transition font-medium">Contact</Link>
            {isAuthenticated ? (
              <>
                <div className="border-t border-white/10 my-1"></div>
                <Link href={getDashboardLink()} onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 text-white hover:text-[#FF7A00] hover:bg-white/10 rounded-lg transition font-medium">Dashboard</Link>
                <Link href={`${getDashboardLink()}/profile`} onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 text-white hover:text-[#FF7A00] hover:bg-white/10 rounded-lg transition font-medium">Profile</Link>
                <Link href={getNotifLink()} onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 text-white hover:text-[#FF7A00] hover:bg-white/10 rounded-lg transition font-medium">Notifications</Link>
                <Link href={`${getDashboardLink()}/settings`} onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 text-white hover:text-[#FF7A00] hover:bg-white/10 rounded-lg transition font-medium">Settings</Link>
              </>
            ) : (
              <>
                <div className="border-t border-white/10 my-1"></div>
                <Link href="/auth/login" onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 text-white hover:text-[#FF7A00] hover:bg-white/10 rounded-lg transition font-medium">Login</Link>
                <Link href="/auth/register" onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 text-[#FF7A00] font-semibold hover:bg-white/10 rounded-lg transition">Register</Link>
              </>
            )}
          </div>
        )}

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="sm:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full px-3 py-2 rounded-lg bg-white text-[#001F3F] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#FF7A00] text-sm"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-[#4A4A4A] hover:text-[#FF7A00] transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
}
