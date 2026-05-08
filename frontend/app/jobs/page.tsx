'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Button, LoadingSpinner, Card } from '@/components';
import apiClient from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';

interface Job {
  _id: string;
  title: string;
  category: string;
  location: string;
  jobType: string;
  salaryMin: number;
  salaryMax: number;
  description: string;
  skillsRequired?: string[];
  experience?: number;
  views: number;
  createdAt: string;
  companyName: string;
  status: string;
}

function JobsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get('search') || '';
  const { isAuthenticated, userType } = useAuth();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const categories = [
    'plumbing',
    'electrical',
    'carpentry',
    'painting',
    'masonry'
  ];

  const jobTypes = ['full-time', 'part-time', 'contract', 'freelance'];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);
        if (selectedCategory) params.append('category', selectedCategory);
        if (selectedJobType) params.append('jobType', selectedJobType);
        params.append('limit', '10');
        params.append('skip', ((page - 1) * 10).toString());

        const response = await apiClient.get(`/api/jobs?${params.toString()}`);
        const newJobs = response.data.jobs || [];

        if (page === 1) {
          setJobs(newJobs);
        } else {
          setJobs((prev) => [...prev, ...newJobs]);
        }

        setHasMore(newJobs.length === 10);
      } catch (err: any) {
        console.error('Jobs fetch error:', err);
        setError(err.response?.data?.message || 'Failed to load jobs');
      } finally {
        setIsLoading(false);
      }
    };

    const delayTimer = setTimeout(() => {
      fetchJobs();
    }, 300);

    return () => clearTimeout(delayTimer);
  }, [searchQuery, selectedCategory, selectedJobType, page]);

  const handleViewJob = (jobId: string) => {
    if (isAuthenticated && userType === 'worker') {
      router.push(`/dashboard/worker/jobs/${jobId}`);
    } else {
      router.push('/auth/login');
    }
  };

  const calculateDaysAgo = (date: string) => {
    const days = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  if (isLoading && page === 1) {
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
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#001F3F] mb-3">Browse Jobs</h1>
            <p className="text-[#4A4A4A] text-lg">Find your next opportunity</p>
          </div>

          {/* Filters */}
          <div className="mb-8 p-6 rounded-xl bg-white border border-[#E5E7EB]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-semibold text-[#001F3F] mb-2">Search Jobs</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search by title or company..."
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A00] text-[#001F3F]"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-[#001F3F] mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A00] text-[#001F3F]"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Job Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-[#001F3F] mb-2">Job Type</label>
                <select
                  value={selectedJobType}
                  onChange={(e) => {
                    setSelectedJobType(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A00] text-[#001F3F]"
                >
                  <option value="">All Types</option>
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Jobs List */}
          {jobs.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <p className="text-[#4A4A4A] text-lg mb-4">No jobs found matching your criteria</p>
                <p className="text-[#4A4A4A] text-sm">Try adjusting your search filters</p>
              </div>
            </Card>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {jobs.map((job) => (
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
                          <div className="text-xs text-[#4A4A4A]">
                            Posted {calculateDaysAgo(job.createdAt)}
                          </div>
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        <Button
                          size="lg"
                          onClick={() => handleViewJob(job._id)}
                        >
                          {isAuthenticated && userType === 'worker' ? 'View Details' : 'Login to Apply'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mb-12">
                  <Button
                    variant="secondary"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={isLoading}
                    loading={isLoading}
                  >
                    {isLoading ? 'Loading...' : 'Load More Jobs'}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><LoadingSpinner /></div>}>
      <JobsPageContent />
    </Suspense>
  );
}
