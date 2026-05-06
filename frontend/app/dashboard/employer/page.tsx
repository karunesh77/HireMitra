'use client';

import { useState, useEffect } from 'react';
import { Navbar, Button, LoadingSpinner } from '@/components';
import Link from 'next/link';
import apiClient from '@/lib/api';

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
  const [stats, setStats] = useState<Stats>({ activeJobs: 0, totalApplications: 0, hired: 0 });
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [recentApplications, setRecentApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        // Fetch all data in parallel
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'hired': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleApplicationAction = async (applicationId: string, status: 'hired' | 'rejected') => {
    try {
      await apiClient.patch(`/api/applications/${applicationId}/status`, { status });
      setRecentApplications(prev =>
        prev.map(app => app._id === applicationId ? { ...app, status } : app)
      );
      if (status === 'hired') {
        setStats(prev => ({ ...prev, hired: prev.hired + 1 }));
      }
    } catch (err) {
      console.error('Action failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl font-bold text-[#001F3F] mb-3">Welcome Back! 🏢</h1>
              <p className="text-[#4A4A4A] text-lg">Manage your job postings and find the perfect workers</p>
            </div>
            <Link href="/dashboard/employer/jobs/create">
              <Button size="lg">+ Post New Job</Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20"><LoadingSpinner /></div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="p-6 rounded-xl bg-gradient-to-br from-[#FFF4E5] to-white border border-[#E5E7EB]">
                  <div className="text-3xl mb-2">💼</div>
                  <p className="text-[#4A4A4A] text-sm">Active Jobs</p>
                  <p className="text-3xl font-bold text-[#FF7A00] mt-2">{stats.activeJobs}</p>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-[#E5E7EB]">
                  <div className="text-3xl mb-2">📋</div>
                  <p className="text-[#4A4A4A] text-sm">Total Applications</p>
                  <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalApplications}</p>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-white border border-[#E5E7EB]">
                  <div className="text-3xl mb-2">✅</div>
                  <p className="text-[#4A4A4A] text-sm">Hired</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">{stats.hired}</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Link href="/dashboard/employer/jobs/create">
                    <div className="p-8 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-lg transition cursor-pointer text-center">
                      <div className="text-4xl mb-3">➕</div>
                      <h3 className="text-lg font-bold text-[#001F3F] mb-2">Post New Job</h3>
                      <p className="text-sm text-[#4A4A4A]">Create a new job posting</p>
                    </div>
                  </Link>
                  <Link href="/dashboard/employer/applications">
                    <div className="p-8 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-lg transition cursor-pointer text-center">
                      <div className="text-4xl mb-3">📋</div>
                      <h3 className="text-lg font-bold text-[#001F3F] mb-2">Applications</h3>
                      <p className="text-sm text-[#4A4A4A]">Review job applications</p>
                    </div>
                  </Link>
                  <Link href="/dashboard/employer/workers">
                    <div className="p-8 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-lg transition cursor-pointer text-center">
                      <div className="text-4xl mb-3">👥</div>
                      <h3 className="text-lg font-bold text-[#001F3F] mb-2">Browse Workers</h3>
                      <p className="text-sm text-[#4A4A4A]">Find talented workers</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Active Jobs */}
              <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#001F3F]">Active Job Postings</h2>
                  <Link href="/dashboard/employer/jobs">
                    <Button variant="ghost" size="sm">View All →</Button>
                  </Link>
                </div>

                {recentJobs.length === 0 ? (
                  <div className="p-8 text-center border border-[#E5E7EB] rounded-xl">
                    <p className="text-[#4A4A4A]">No jobs posted yet.</p>
                    <Link href="/dashboard/employer/jobs/create">
                      <Button className="mt-4">Post Your First Job</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentJobs.map((job) => (
                      <div key={job._id} className="p-6 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] transition">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-[#001F3F]">{job.title}</h3>
                            <p className="text-[#4A4A4A] text-sm mt-1">{job.location} • {job.jobType}</p>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Open</span>
                            <span className="text-xs bg-[#FFF4E5] text-[#FF7A00] px-3 py-1 rounded-full font-medium">
                              {job.applicationsCount || 0} applications
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-3 mt-4">
                          <Link href={`/dashboard/employer/jobs/${job._id}/edit`}>
                            <Button variant="secondary" size="sm">Edit</Button>
                          </Link>
                          <Link href={`/dashboard/employer/jobs/${job._id}/applications`}>
                            <Button variant="secondary" size="sm">View Applications</Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Applications */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#001F3F]">Recent Applications</h2>
                  <Link href="/dashboard/employer/applications">
                    <Button variant="ghost" size="sm">View All →</Button>
                  </Link>
                </div>

                {recentApplications.length === 0 ? (
                  <div className="p-8 text-center border border-[#E5E7EB] rounded-xl">
                    <p className="text-[#4A4A4A]">No applications yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recentApplications.map((app) => (
                      <div key={app._id} className="p-6 rounded-xl bg-white border border-[#E5E7EB] hover:shadow-lg transition">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-full bg-[#FFF4E5] flex items-center justify-center text-lg flex-shrink-0">👤</div>
                          <div className="flex-1">
                            <h4 className="font-bold text-[#001F3F]">{app.workerId?.name || 'Worker'}</h4>
                            <p className="text-sm text-[#4A4A4A]">Applied for: {app.jobId?.title || 'Job'}</p>
                            <p className="text-xs text-[#4A4A4A] mt-1">
                              {new Date(app.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium h-fit ${getStatusColor(app.status)}`}>
                            {app.status}
                          </span>
                        </div>
                        {app.status === 'pending' && (
                          <div className="flex gap-2 mt-4">
                            <Button variant="primary" size="sm" onClick={() => handleApplicationAction(app._id, 'hired')}>Accept</Button>
                            <Button variant="danger" size="sm" onClick={() => handleApplicationAction(app._id, 'rejected')}>Reject</Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
