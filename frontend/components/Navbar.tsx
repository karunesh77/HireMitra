'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import apiClient from '@/lib/api';

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, user, logout, userType, isLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setShowUserMenu(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Poll for unread notifications
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
      const basePath = isAuthenticated && userType === 'employer'
        ? '/dashboard/employer/workers'
        : isAuthenticated && userType === 'worker'
        ? '/dashboard/worker/jobs'
        : '/jobs';
      router.push(`${basePath}?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowMobileMenu(false);
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
    userType === 'employer' ? '/dashboard/employer/notifications' : '/dashboard/worker/notifications';

  const navLinks = [
    { label: 'Jobs', href: isAuthenticated && userType === 'worker' ? '/dashboard/worker/jobs' : isAuthenticated && userType === 'employer' ? '/dashboard/employer' : '/jobs' },
    { label: 'Workers', href: isAuthenticated && userType === 'employer' ? '/dashboard/employer/workers' : isAuthenticated && userType === 'worker' ? '/dashboard/worker' : '/workers' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-[#001F3F]/95 backdrop-blur-md border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-[#FF7A00] to-[#FF9A40] rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-md shadow-[#FF7A00]/20">
              H
            </div>
            <span className="hidden sm:inline text-lg font-bold text-white group-hover:text-[#FF7A00] transition-colors">
              HireMitra
            </span>
            <span className="sm:hidden text-lg font-bold text-white">HM</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs, skills..."
                className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/50 focus:bg-white/15 transition-all text-sm"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#FF7A00] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all text-sm font-medium">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all flex-shrink-0 ml-auto"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle menu"
          >
            {showMobileMenu ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>

          {/* Auth Section */}
          <div className="flex items-center gap-2 flex-shrink-0 relative" ref={menuRef}>
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse"></div>
            ) : isAuthenticated && user ? (
              <>
                {/* Notification Bell */}
                <Link href={getNotifLink()} className="relative p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold animate-pulse-glow">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </Link>

                {/* User Menu */}
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-white hover:bg-white/10 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF9A40] flex items-center justify-center text-xs font-bold text-white shadow-sm">
                    {user.firstName?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">{user.firstName}</span>
                  <svg className={`w-3.5 h-3.5 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                {showUserMenu && (
                  <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-[#E5E7EB] py-1.5 z-50 animate-scale-in origin-top-right">
                    <div className="px-4 py-2.5 border-b border-[#E5E7EB]">
                      <p className="text-sm font-semibold text-[#001F3F]">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-[#9CA3AF] capitalize">{userType}</p>
                    </div>
                    {[
                      { label: 'Dashboard', href: getDashboardLink(), icon: '📊' },
                      { label: 'Profile', href: `${getDashboardLink()}/profile`, icon: '👤' },
                      { label: 'Notifications', href: getNotifLink(), icon: '🔔', badge: unreadCount },
                      { label: 'Settings', href: `${getDashboardLink()}/settings`, icon: '⚙️' },
                    ].map((item) => (
                      <Link key={item.label} href={item.href} onClick={() => setShowUserMenu(false)}>
                        <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition-colors text-sm text-[#001F3F]">
                          <span className="flex items-center gap-2.5">
                            <span className="text-sm">{item.icon}</span> {item.label}
                          </span>
                          {item.badge ? (
                            <span className="w-5 h-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                              {item.badge > 9 ? '9+' : item.badge}
                            </span>
                          ) : null}
                        </div>
                      </Link>
                    ))}
                    <div className="border-t border-[#E5E7EB] mt-1.5 pt-1.5">
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors text-sm font-medium flex items-center gap-2.5">
                        <span>🚪</span> Logout
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Link href="/auth/login" className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium text-sm">Login</Link>
                <Link href="/auth/register" className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9A40] hover:from-[#E66A00] hover:to-[#FF7A00] text-white transition-all font-medium text-sm shadow-md shadow-[#FF7A00]/20">Register</Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Nav */}
        {showMobileMenu && (
          <div className="lg:hidden border-t border-white/10 py-3 space-y-1 animate-slide-up">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setShowMobileMenu(false)}
                className="block px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium">
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <div className="border-t border-white/10 my-2"></div>
                <Link href={getDashboardLink()} onClick={() => setShowMobileMenu(false)} className="block px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium">Dashboard</Link>
                <Link href={`${getDashboardLink()}/profile`} onClick={() => setShowMobileMenu(false)} className="block px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium">Profile</Link>
                <Link href={getNotifLink()} onClick={() => setShowMobileMenu(false)} className="block px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium">Notifications</Link>
                <Link href={`${getDashboardLink()}/settings`} onClick={() => setShowMobileMenu(false)} className="block px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium">Settings</Link>
              </>
            ) : (
              <>
                <div className="border-t border-white/10 my-2"></div>
                <Link href="/auth/login" onClick={() => setShowMobileMenu(false)} className="block px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium">Login</Link>
                <Link href="/auth/register" onClick={() => setShowMobileMenu(false)} className="block px-4 py-2.5 text-[#FF7A00] font-semibold hover:bg-white/10 rounded-lg transition-all">Register</Link>
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
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/50 text-sm"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#FF7A00] transition-colors">
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
