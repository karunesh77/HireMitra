'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useRouter } from 'next/navigation';

export default function ApplicationsPage() {
  const { user, isAuth, isLoading } = useAuth();
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoading) return;

    if (!isAuth) {
      router.push('/auth/login');
      return;
    }

    const fetchApplications = async () => {
      try {
        const endpoint = user?.userType === 'employer'
          ? `/applications/job/${user.id}`
          : '/applications/worker';

        const response = await api.get(endpoint);
        setApplications(response.data.applications || []);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [isAuth, isLoading, user, router]);

  if (isLoading || loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">
        {user?.userType === 'employer' ? 'Job Applications' : 'My Applications'}
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {applications.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-600 text-lg">
            {user?.userType === 'employer'
              ? 'No applications yet for your jobs'
              : 'You haven\'t applied to any jobs yet'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app._id} className="card">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold">
                    {app.job?.title || 'Job Deleted'}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {user?.userType === 'employer'
                      ? app.applicant?.name
                      : `Posted ${new Date(app.createdAt).toLocaleDateString()}`}
                  </p>
                  {app.message && (
                    <p className="text-gray-700 mt-2">{app.message}</p>
                  )}
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    app.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : app.status === 'accepted'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
