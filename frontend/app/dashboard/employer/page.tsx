'use client';

import { useState, useEffect } from 'react';
import { Navbar, Button, DashboardSkeleton } from '@/components';
import Link from 'next/link';
import apiClient from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';

interface Job {
  _id: string;
  title: string;
  location: string;
  jobType: string;
  status: string;
  applicationsCount: number;
  createdAt: string;
}

interface Application {
  _id: string;
  workerId: { name: string; email: string } | null;
  jobId: { title: string } | null;
  status: string;
  createdAt: string;
}

interface Stats {
  activeJobs: number;
  totalApplications: number;
  hired: number;
}

export default function EmployerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({ activeJobs: 0, totalApplications: 0, hired: 0 });
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [recentApplications, setRecentApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const [jobsRes, applicationsRes, hiredRes] = await Promise.all([
          apiClient.get('/api/jobs/employer/me?limit=3'),
          apiClient.get('/api/applications/employer/me?limit=4'),
          apiClient.get('/api/applications/employer/me?status=hired'),
        ]);

        const jobs = jobsRes.data.jobs || [];
        const applications = applicationsRes.data.applications || [];
        const hired = hiredRes.data.applications || [];

        setRecentJobs(jobs);
        setRecentApplications(applications);
        setStats({
          activeJobs: jobsRes.data.total || jobs.length,
          totalApplications: applicationsRes.data.total || applications.length,
          hired: hired.length,
        });
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { bg: string; text: string; dot: string }> = {
      pending: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
      hired: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
      rejected: { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-500' },
    };
    return configs[status] || { bg: 'bg-gray-50', text: 'text-gray-700', dot: 'bg-gray-500' };
  };

  const handleApplicationAction = async (applicationId: string, status: 'hired' | 'rejected') => {
    try {
      await apiClient.patch(`/api/applications/${applicationId}/status`, { status });
      setRecentApplications(prev => prev.map(app => app._id === applicationId ? { ...app, status } : app));
      if (status === 'hired') setStats(prev => ({ ...prev, hired: prev.hired + 1 }));
    } catch (err) {
      console.error('Action failed:', err);
    }
  };

  const timeAgo = (date: string) => {
    const days = Math.floor((Date.now() - new Date(date).getTime()) / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  const statCards = [
    { label: 'Active Jobs', value: stats.activeJobs, icon: '💼', gradient: 'from-[#FFF4E5] to-white', color: 'text-[#FF7A00]', link: '/dashboard/employer/jobs' },
    { label: 'Total Applications', value: stats.totalApplications, icon: '📋', gradient: 'from-blue-50 to-white', color: 'text-blue-600', link: '/dashboard/employer/applications' },
    { label: 'Workers Hired', value: stats.hired, icon: '✅', gradient: 'from-emerald-50 to-white', color: 'text-emerald-600', link: '/dashboard/employer/applications' },
  ];

  const quickActions = [
    { label: 'Post New Job', desc: 'Create a new job posting', icon: '➕', href: '/dashboard/employer/jobs/create' },
    { label: 'Applications', desc: 'Review job applications', icon: '📋', href: '/dashboard/employer/applications' },
    { label: 'Browse Workers', desc: 'Find talented workers', icon: '👥', href: '/dashboard/employer/workers' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 animate-fade-in">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#001F3F] mb-1">Welcome back{user?.firstName ? `, ${user.firstName}` : ''}! 🏢</h1>
              <p className="text-[#6B7280]">Manage your job postings and find the perfect workers</p>
            </div>
            <Link href="/dashboard/employer/jobs/create">
              <Button className="shadow-lg shadow-[#FF7A00]/20">
                <span>+</span> Post New Job
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <DashboardSkeleton />
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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

              {/* Two Column */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Active Jobs */}
                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="font-bold text-[#001F3F]">Active Job Postings</h2>
                    <Link href="/dashboard/employer/jobs"><span className="text-xs text-[#FF7A00] font-semibold hover:underline">View All</span></Link>
                  </div>

                  {recentJobs.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-3">💼</div>
                      <p className="text-[#6B7280] text-sm mb-3">No jobs posted yet</p>
                      <Link href="/dashboard/employer/jobs/create"><Button size="sm">Post Your First Job</Button></Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {recentJobs.map((job) => (
                        <div key={job._id} className="p-3.5 rounded-xl bg-[#FAFAFA] hover:bg-[#FFF4E5]/50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm text-[#001F3F] truncate flex-1">{job.title}</h4>
                            <span className="text-[10px] bg-[#FFF4E5] text-[#FF7A00] px-2 py-0.5 rounded-lg font-semibold ml-2">{job.applicationsCount || 0} apps</span>
                          </div>
                          <p className="text-xs text-[#9CA3AF] mb-2">{job.location} &middot; {job.jobType}</p>
                          <div className="flex gap-2">
                            <Link href={`/dashboard/employer/jobs/${job._id}/edit`}>
                              <button className="text-xs text-[#FF7A00] font-medium hover:underline">Edit</button>
                            </Link>
                            <span className="text-[#E5E7EB]">|</span>
                            <Link href={`/dashboard/employer/jobs/${job._id}/applications`}>
                              <button className="text-xs text-[#FF7A00] font-medium hover:underline">View Apps</button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Applications */}
                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="font-bold text-[#001F3F]">Recent Applications</h2>
                    <Link href="/dashboard/employer/applications"><span className="text-xs text-[#FF7A00] font-semibold hover:underline">View All</span></Link>
                  </div>

                  {recentApplications.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-3">📋</div>
                      <p className="text-[#6B7280] text-sm">No applications yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {recentApplications.map((app) => {
                        const sc = getStatusConfig(app.status);
                        return (
                          <div key={app._id} className="p-3.5 rounded-xl bg-[#FAFAFA] hover:bg-[#FFF4E5]/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFF4E5] to-[#FFE8CC] flex items-center justify-center text-sm font-bold text-[#FF7A00] flex-shrink-0">
                                {(app.workerId?.name || 'W').charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm text-[#001F3F] truncate">{app.workerId?.name || 'Worker'}</h4>
                                <p className="text-xs text-[#9CA3AF] truncate">For: {app.jobId?.title || 'Job'} &middot; {timeAgo(app.createdAt)}</p>
                              </div>
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold ${sc.bg} ${sc.text} flex-shrink-0`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}></span>
                                <span className="capitalize">{app.status}</span>
                              </span>
                            </div>
                            {app.status === 'pending' && (
                              <div className="flex gap-2 mt-2.5 ml-12">
                                <button onClick={() => handleApplicationAction(app._id, 'hired')} className="text-xs text-emerald-600 font-semibold hover:underline">Accept</button>
                                <span className="text-[#E5E7EB]">|</span>
                                <button onClick={() => handleApplicationAction(app._id, 'rejected')} className="text-xs text-red-500 font-semibold hover:underline">Reject</button>
                              </div>
                            )}
                          </div>
                        );
                      })}
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
