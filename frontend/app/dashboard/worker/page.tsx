'use client';

import { useState, useEffect } from 'react';
import { Navbar, Button, Card, DashboardSkeleton } from '@/components';
import Link from 'next/link';
import apiClient from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';

interface DashboardStats {
  activeApplications: number;
  acceptedJobs: number;
  unreadMessages: number;
  profileRating: number;
}

interface RecentApplication {
  _id: string;
  jobId: { title: string; location: string };
  status: string;
  appliedAt: string;
}

interface RecommendedJob {
  _id: string;
  title: string;
  category: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  description: string;
  views: number;
  createdAt: string;
}

export default function WorkerDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({ activeApplications: 0, acceptedJobs: 0, unreadMessages: 0, profileRating: 0 });
  const [recentApplications, setRecentApplications] = useState<RecentApplication[]>([]);
  const [recommendedJobs, setRecommendedJobs] = useState<RecommendedJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!isAuthenticated || !user) return;
      try {
        setIsLoading(true);
        setError(null);

        const applicationsRes = await apiClient.get('/api/applications/worker/me');
        const applications = applicationsRes.data.applications || [];
        const pendingCount = applications.filter((app: any) => app.status === 'applied').length;
        const acceptedCount = applications.filter((app: any) => app.status === 'hired').length;

        let unreadMessagesCount = 0;
        try {
          const messagesRes = await apiClient.get('/api/messages/conversations');
          const conversations = messagesRes.data.conversations || [];
          unreadMessagesCount = conversations.reduce((acc: number, conv: any) => acc + (Number(conv.unreadCount) || 0), 0);
        } catch {}

        const profileRes = await apiClient.get('/api/profile');
        const rating = profileRes.data.user?.rating || 0;

        const recentRes = await apiClient.get('/api/applications/worker/me?limit=3');
        const jobsRes = await apiClient.get('/api/jobs?limit=6');

        setStats({ activeApplications: pendingCount, acceptedJobs: acceptedCount, unreadMessages: unreadMessagesCount, profileRating: rating });
        setRecentApplications(recentRes.data.applications || []);
        setRecommendedJobs(jobsRes.data.jobs || []);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, [isAuthenticated, user]);

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { bg: string; text: string; dot: string }> = {
      applied: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
      shortlisted: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
      hired: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
      rejected: { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-500' },
    };
    return configs[status] || { bg: 'bg-gray-50', text: 'text-gray-700', dot: 'bg-gray-500' };
  };

  const timeAgo = (date: string) => {
    const days = Math.floor((Date.now() - new Date(date).getTime()) / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  const statCards = [
    { label: 'Active Applications', value: stats.activeApplications, icon: '📋', gradient: 'from-[#FFF4E5] to-white', color: 'text-[#FF7A00]', link: '/dashboard/worker/applications' },
    { label: 'Accepted Jobs', value: stats.acceptedJobs, icon: '✅', gradient: 'from-emerald-50 to-white', color: 'text-emerald-600', link: '/dashboard/worker/applications' },
    { label: 'Unread Messages', value: stats.unreadMessages, icon: '💬', gradient: 'from-blue-50 to-white', color: 'text-blue-600', link: '/dashboard/worker/messages' },
    { label: 'Profile Rating', value: stats.profileRating.toFixed(1), icon: '⭐', gradient: 'from-amber-50 to-white', color: 'text-amber-600', link: '/dashboard/worker/profile' },
  ];

  const quickActions = [
    { label: 'Browse Jobs', desc: 'Find jobs that match your skills', icon: '🔍', href: '/dashboard/worker/jobs' },
    { label: 'My Applications', desc: 'Track your job applications', icon: '📝', href: '/dashboard/worker/applications' },
    { label: 'Messages', desc: 'Chat with employers', icon: '💬', href: '/dashboard/worker/messages' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#001F3F] mb-1">
              Welcome back, {user?.firstName}! 👋
            </h1>
            <p className="text-[#6B7280]">Here&apos;s what&apos;s happening on your account</p>
          </div>

          {isLoading ? (
            <DashboardSkeleton />
          ) : (
            <>
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-slide-up">
                  <span>⚠️</span>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {statCards.map((card, i) => (
                  <Link key={card.label} href={card.link}>
                    <div className={`p-5 rounded-2xl bg-gradient-to-br ${card.gradient} border border-[#E5E7EB] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer animate-fade-in`} style={{ animationDelay: `${i * 100}ms` }}>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[#6B7280] text-xs font-medium uppercase tracking-wide">{card.label}</p>
                        <span className="text-2xl">{card.icon}</span>
                      </div>
                      <p className={`text-2xl sm:text-3xl font-bold ${card.color}`}>{card.value}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-[#001F3F] mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {quickActions.map((action) => (
                    <Link key={action.label} href={action.href}>
                      <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00]/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group">
                        <div className="w-11 h-11 rounded-xl bg-[#FFF4E5] flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">{action.icon}</div>
                        <h3 className="font-bold text-[#001F3F] group-hover:text-[#FF7A00] transition-colors mb-1">{action.label}</h3>
                        <p className="text-xs text-[#6B7280]">{action.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Recent Applications */}
                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="font-bold text-[#001F3F]">Recent Applications</h2>
                    <Link href="/dashboard/worker/applications"><span className="text-xs text-[#FF7A00] font-semibold hover:underline">View All</span></Link>
                  </div>

                  {recentApplications.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-3">📋</div>
                      <p className="text-[#6B7280] text-sm">No applications yet</p>
                      <Link href="/dashboard/worker/jobs" className="text-[#FF7A00] text-sm font-semibold hover:underline">Browse jobs</Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {recentApplications.map((app) => {
                        const sc = getStatusConfig(app.status);
                        return (
                          <div key={app._id} className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAFAFA] hover:bg-[#FFF4E5]/50 transition-colors">
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-sm text-[#001F3F] truncate">{app.jobId?.title || 'Job'}</h4>
                              <p className="text-xs text-[#9CA3AF] mt-0.5">{app.jobId?.location || 'N/A'} &middot; {timeAgo(app.appliedAt)}</p>
                            </div>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold ${sc.bg} ${sc.text} ml-3 flex-shrink-0`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}></span>
                              <span className="capitalize">{app.status}</span>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Recommended Jobs */}
                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="font-bold text-[#001F3F]">Recommended Jobs</h2>
                    <Link href="/dashboard/worker/jobs"><span className="text-xs text-[#FF7A00] font-semibold hover:underline">View All</span></Link>
                  </div>

                  {recommendedJobs.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-3">💼</div>
                      <p className="text-[#6B7280] text-sm">No jobs available right now</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {recommendedJobs.slice(0, 4).map((job) => (
                        <Link key={job._id} href={`/dashboard/worker/jobs/${job._id}`}>
                          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAFAFA] hover:bg-[#FFF4E5]/50 transition-colors cursor-pointer group">
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-sm text-[#001F3F] group-hover:text-[#FF7A00] transition-colors truncate">{job.title}</h4>
                              <p className="text-xs text-[#9CA3AF] mt-0.5">{job.location} &middot; {job.category}</p>
                            </div>
                            <span className="text-[#FF7A00] font-bold text-sm ml-3 flex-shrink-0 whitespace-nowrap">
                              &#8377;{job.salaryMin.toLocaleString()}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
