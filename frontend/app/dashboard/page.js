'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuth, isLoading } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    acceptedApplications: 0
  });

  useEffect(() => {
    if (isLoading) return;

    if (!isAuth || user?.userType !== 'employer') {
      router.push('/auth/login');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const response = await api.get(`/jobs/employer/${user.id}`);
        setJobs(response.data.jobs);

        // Calculate stats
        const active = response.data.jobs.filter((j) => j.status === 'open').length;
        const totalApps = response.data.jobs.reduce((sum, j) => sum + j.applicantsCount, 0);
        const acceptedApps = response.data.jobs.reduce((sum, j) => sum + j.acceptedApplicants, 0);

        setStats({
          totalJobs: response.data.jobs.length,
          activeJobs: active,
          totalApplications: totalApps,
          acceptedApplications: acceptedApps
        });
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuth, isLoading, user, router]);

  if (isLoading || loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Employer Dashboard</h1>
        <Link href="/jobs/create" className="btn-primary">
          ➕ Post New Job
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card text-center">
          <p className="text-gray-600 text-sm">Total Jobs</p>
          <p className="text-3xl font-bold text-blue-600">{stats.totalJobs}</p>
        </div>

        <div className="card text-center">
          <p className="text-gray-600 text-sm">Active Jobs</p>
          <p className="text-3xl font-bold text-green-600">{stats.activeJobs}</p>
        </div>

        <div className="card text-center">
          <p className="text-gray-600 text-sm">Total Applications</p>
          <p className="text-3xl font-bold text-purple-600">{stats.totalApplications}</p>
        </div>

        <div className="card text-center">
          <p className="text-gray-600 text-sm">Accepted</p>
          <p className="text-3xl font-bold text-orange-600">{stats.acceptedApplications}</p>
        </div>
      </div>

      {/* Jobs List */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Your Jobs</h2>

        {jobs.length === 0 ? (
          <p className="text-gray-600 text-center py-8">
            No jobs posted yet.{' '}
            <Link href="/jobs/create" className="text-blue-600 hover:underline">
              Create your first job
            </Link>
          </p>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{job.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {job.location?.city}, {job.location?.state} • ${job.salary}/{job.paymentType}
                    </p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${
                        job.status === 'open'
                          ? 'bg-green-100 text-green-800'
                          : job.status === 'closed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-600">Applications</p>
                    <p className="font-bold text-lg">{job.applicantsCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Accepted</p>
                    <p className="font-bold text-lg">{job.acceptedApplicants}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Posted</p>
                    <p className="text-sm">{new Date(job.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/jobs/${job._id}`}
                    className="btn-secondary btn-small"
                  >
                    View
                  </Link>
                  <Link
                    href={`/applications/job/${job._id}`}
                    className="btn-primary btn-small"
                  >
                    View Applications ({job.applicantsCount})
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
