'use client';

import { useState, useEffect } from 'react';
import { Navbar, Button, Breadcrumbs, LoadingSpinner, Card } from '@/components';
import apiClient from '@/lib/api';
import { useToast } from '@/contexts/ToastContext';
import Link from 'next/link';

interface Job {
  _id: string;
  title: string;
  category: string;
  location: string;
  jobType: string;
  salaryMin: number;
  salaryMax: number;
  description: string;
  views: number;
  createdAt: string;
  companyName: string;
}

export default function WorkerSavedJobsPage() {
  const toast = useToast();
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard/worker' },
    { label: 'Saved Jobs' }
  ];

  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSavedJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Load saved job IDs from localStorage
        const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        setSavedJobIds(saved);

        if (saved.length === 0) {
          setSavedJobs([]);
          setIsLoading(false);
          return;
        }

        // Fetch all jobs in parallel
        const results = await Promise.allSettled(
          saved.map((id: string) => apiClient.get(`/api/jobs/${id}`))
        );

        const jobsData: Job[] = [];
        const validIds: string[] = [];

        results.forEach((result, index) => {
          if (result.status === 'fulfilled' && result.value.data.job) {
            jobsData.push(result.value.data.job);
            validIds.push(saved[index]);
          }
        });

        // Clean up invalid IDs
        localStorage.setItem('savedJobs', JSON.stringify(validIds));
        setSavedJobIds(validIds);
        setSavedJobs(jobsData);
      } catch (err: any) {
        console.error('Error loading saved jobs:', err);
        setError('Failed to load saved jobs');
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedJobs();
  }, []);

  const handleRemove = (jobId: string) => {
    const updated = savedJobIds.filter((id) => id !== jobId);
    localStorage.setItem('savedJobs', JSON.stringify(updated));
    setSavedJobIds(updated);
    setSavedJobs(savedJobs.filter((job) => job._id !== jobId));
    toast.success('Job removed from saved');
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          {/* Header */}
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[#001F3F] mb-2">Saved Jobs</h1>
              <p className="text-[#4A4A4A]">Jobs you've bookmarked for later</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#FF7A00]">{savedJobs.length}</p>
              <p className="text-sm text-[#4A4A4A]">Total Saved</p>
            </div>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Saved Jobs List */}
          {savedJobs.length > 0 ? (
            <div className="space-y-4">
              {savedJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-lg border border-[#E5E7EB] p-6 hover:shadow-md transition"
                >
                  <div className="flex gap-6 items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-[#001F3F] mb-1">{job.title}</h3>
                        <p className="text-[#4A4A4A] mb-3">{job.companyName}</p>
                      </div>

                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-1 text-sm text-[#4A4A4A]">
                          📍 {job.location}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-[#4A4A4A]">
                          💰 ₹{job.salaryMin.toLocaleString()}-₹{job.salaryMax.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-[#4A4A4A]">
                          🏷️ {job.category}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-[#4A4A4A]">
                          ⏱️ {job.jobType}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400">👁️</span>
                          <span className="text-sm text-[#4A4A4A]">{job.views} views</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <Link href={`/dashboard/worker/jobs/${job._id}`}>
                        <Button size="lg">View Details</Button>
                      </Link>
                      <button
                        onClick={() => handleRemove(job._id)}
                        className="px-6 py-2 rounded-lg border-2 border-[#E5E7EB] text-[#4A4A4A] hover:bg-red-50 hover:border-red-200 transition font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card>
              <div className="text-center py-16">
                <div className="text-5xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-[#001F3F] mb-2">No Saved Jobs Yet</h3>
                <p className="text-[#4A4A4A] mb-6">Start saving jobs to apply to them later</p>
                <Link href="/dashboard/worker/jobs">
                  <Button size="lg">Browse Jobs</Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
