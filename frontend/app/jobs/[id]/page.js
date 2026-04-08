'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function JobDetailPage() {
  const params = useParams();
  const { user, isAuth } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applicationMessage, setApplicationMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get(`/jobs/${params.id}`);
        setJob(response.data.job);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch job');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [params.id]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!isAuth) {
      window.location.href = '/auth/login';
      return;
    }

    try {
      setSubmitting(true);
      await api.post('/applications', {
        jobId: params.id,
        message: applicationMessage
      });
      alert('Application submitted successfully!');
      setApplicationMessage('');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;

  if (error) {
    return (
      <div className="container py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container py-12">
        <div className="card text-center">
          <p className="text-gray-600">Job not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="card">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
              <p className="text-gray-600 text-lg">
                Posted by {job.postedBy?.companyName || job.postedBy?.name}
              </p>
            </div>

            {/* Job Details */}
            <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b">
              <div>
                <p className="text-gray-600 text-sm">Salary</p>
                <p className="text-2xl font-bold">${job.salary}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Location</p>
                <p className="font-medium">{job.location?.city}, {job.location?.state}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Payment Type</p>
                <p className="font-medium capitalize">{job.paymentType}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Duration</p>
                <p className="font-medium capitalize">{job.duration}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3">About This Job</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
            </div>

            {/* Required Skills */}
            <div>
              <h2 className="text-xl font-bold mb-3">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills?.map((skill) => (
                  <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Employer Info */}
          <div className="card mt-6">
            <h2 className="text-xl font-bold mb-4">About the Employer</h2>
            <div className="flex items-center gap-4">
              <div>
                <p className="font-bold text-lg">{job.postedBy?.companyName || job.postedBy?.name}</p>
                <p className="text-gray-600">⭐ {job.postedBy?.rating?.average || 'No ratings yet'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Apply Form */}
        <div>
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Apply Now</h2>

            {isAuth && user?.userType === 'employer' ? (
              <p className="text-gray-600 text-center">Employers cannot apply to jobs</p>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label className="label">Message (Optional)</label>
                  <textarea
                    value={applicationMessage}
                    onChange={(e) => setApplicationMessage(e.target.value)}
                    className="input"
                    rows="4"
                    placeholder="Tell the employer why you're a great fit..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : isAuth ? 'Apply Now' : 'Login to Apply'}
                </button>
              </form>
            )}

            {!isAuth && (
              <p className="text-sm text-gray-600 text-center mt-4">
                <a href="/auth/login" className="text-blue-600 hover:underline">
                  Login
                </a>
                {' '}or{' '}
                <a href="/auth/register" className="text-blue-600 hover:underline">
                  register
                </a>
                {' '}to apply
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
