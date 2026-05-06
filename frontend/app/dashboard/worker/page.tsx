'use client';

import { useState, useEffect } from 'react';
import { Navbar, Button, LoadingSpinner, Card } from '@/components';
import Link from 'next/link';
import apiClient from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';

interface ApplicationStats {
  pending: number;
  accepted: number;
  rejected: number;
  total: number;
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

interface DashboardStats {
  activeApplications: number;
  acceptedJobs: number;
  unreadMessages: number;
  profileRating: number;
}

export default function WorkerDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    activeApplications: 0,
    acceptedJobs: 0,
    unreadMessages: 0,
    profileRating: 0,
  });
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

        // Fetch application stats
        const applicationsRes = await apiClient.get('/api/applications/worker/me');
        const applications = applicationsRes.data.applications || [];
        const pendingCount = applications.filter((app: any) => app.status === 'applied').length;
        const acceptedCount = applications.filter((app: any) => app.status === 'hired').length;

        // Fetch unread messages count
        let unreadMessagesCount = 0;
        try {
          const messagesRes = await apiClient.get('/api/messages/conversations');
          const conversations = messagesRes.data.conversations || [];
          unreadMessagesCount = conversations.reduce((acc: number, conv: any) => {
            return acc + (conv.unreadCount || 0);
          }, 0);
        } catch (err) {
          console.log('Messages fetch failed, continuing...');
        }

        // Fetch user profile for rating
        const profileRes = await apiClient.get('/api/profile');
        const rating = profileRes.data.user?.rating || 0;

        // Fetch recent applications (limit 3)
        const recentRes = await apiClient.get('/api/applications/worker/me?limit=3');
        const recent = recentRes.data.applications || [];

        // Fetch recommended jobs (limit 6)
        const jobsRes = await apiClient.get('/api/jobs?limit=6');
        const jobs = jobsRes.data.jobs || [];

        setStats({
          activeApplications: pendingCount,
          acceptedJobs: acceptedCount,
          unreadMessages: unreadMessagesCount,
          profileRating: rating,
        });

        setRecentApplications(recent);
        setRecommendedJobs(jobs);
      } catch (err: any) {
        console.error('Dashboard data fetch error:', err);
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuthenticated, user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied':
        return 'bg-yellow-100 text-yellow-700';
      case 'shortlisted':
        return 'bg-blue-100 text-blue-700';
      case 'hired':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center h-[60vh]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001F3F] mb-3">
              Welcome Back, {user?.firstName}! 👷
            </h1>
            <p className="text-[#4A4A4A] text-lg">Here's what's happening on your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {/* Stat Card 1 */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-[#FFF4E5] to-white border border-[#E5E7EB]">
              <div className="text-3xl mb-2">📋</div>
              <p className="text-[#4A4A4A] text-sm">Active Applications</p>
              <p className="text-3xl font-bold text-[#FF7A00] mt-2">{stats.activeApplications}</p>
            </div>

            {/* Stat Card 2 */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-white border border-[#E5E7EB]">
              <div className="text-3xl mb-2">✓</div>
              <p className="text-[#4A4A4A] text-sm">Accepted Jobs</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.acceptedJobs}</p>
            </div>

            {/* Stat Card 3 */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-[#E5E7EB]">
              <div className="text-3xl mb-2">💬</div>
              <p className="text-[#4A4A4A] text-sm">Unread Messages</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{stats.unreadMessages}</p>
            </div>

            {/* Stat Card 4 */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-yellow-50 to-white border border-[#E5E7EB]">
              <div className="text-3xl mb-2">⭐</div>
              <p className="text-[#4A4A4A] text-sm">Profile Rating</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.profileRating.toFixed(1)}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/dashboard/worker/jobs">
                <div className="p-8 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-lg transition cursor-pointer text-center">
                  <div className="text-4xl mb-3">🔍</div>
                  <h3 className="text-lg font-bold text-[#001F3F] mb-2">Browse Jobs</h3>
                  <p className="text-sm text-[#4A4A4A]">Find jobs that match your skills</p>
                </div>
              </Link>

              <Link href="/dashboard/worker/applications">
                <div className="p-8 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-lg transition cursor-pointer text-center">
                  <div className="text-4xl mb-3">📝</div>
                  <h3 className="text-lg font-bold text-[#001F3F] mb-2">My Applications</h3>
                  <p className="text-sm text-[#4A4A4A]">Track your job applications</p>
                </div>
              </Link>

              <Link href="/dashboard/worker/messages">
                <div className="p-8 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-lg transition cursor-pointer text-center">
                  <div className="text-4xl mb-3">💬</div>
                  <h3 className="text-lg font-bold text-[#001F3F] mb-2">Messages</h3>
                  <p className="text-sm text-[#4A4A4A]">Chat with employers</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Applications */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#001F3F]">Recent Applications</h2>
              <Link href="/dashboard/worker/applications">
                <Button variant="ghost" size="sm">View All →</Button>
              </Link>
            </div>

            {recentApplications.length === 0 ? (
              <Card>
                <p className="text-center text-[#4A4A4A] py-8">
                  No applications yet. <Link href="/dashboard/worker/jobs" className="text-[#FF7A00] font-semibold">Browse jobs</Link> to get started!
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app._id} className="p-6 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] transition">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[#001F3F]">{app.jobId?.title || 'Job'}</h3>
                        <p className="text-[#4A4A4A] text-sm mt-1">
                          {app.jobId?.location || 'Location not available'}
                        </p>
                      </div>
                      <span className={`px-3 py-1 ${getStatusColor(app.status)} rounded-full text-sm font-medium capitalize`}>
                        {app.status}
                      </span>
                    </div>
                    <p className="text-[#4A4A4A] text-xs mt-3">
                      Applied on {new Date(app.appliedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recommended Jobs */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#001F3F]">Recommended Jobs</h2>
              <Link href="/dashboard/worker/jobs">
                <Button variant="ghost" size="sm">View All →</Button>
              </Link>
            </div>

            {recommendedJobs.length === 0 ? (
              <Card>
                <p className="text-center text-[#4A4A4A] py-8">No jobs available at the moment.</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedJobs.slice(0, 6).map((job) => (
                  <Link key={job._id} href={`/dashboard/worker/jobs/${job._id}`}>
                    <div className="p-6 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-lg transition cursor-pointer h-full">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold text-[#001F3F] flex-1">{job.title}</h3>
                        <span className="px-2 py-1 bg-[#FFF4E5] text-[#FF7A00] rounded text-xs font-semibold">
                          {job.category}
                        </span>
                      </div>
                      <p className="text-[#4A4A4A] text-sm mb-2">📍 {job.location}</p>
                      <p className="text-[#FF7A00] font-bold mb-3">
                        ₹{job.salaryMin.toLocaleString()} - ₹{job.salaryMax.toLocaleString()}
                      </p>
                      <p className="text-[#4A4A4A] text-sm line-clamp-2 mb-3">{job.description}</p>
                      <div className="text-xs text-[#4A4A4A]">
                        👁️ {job.views} views
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
