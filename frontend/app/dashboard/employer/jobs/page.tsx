'use client';

import { useState, useEffect } from 'react';
import { Navbar, Input, Select, Button, LoadingSpinner } from '@/components';
import { Breadcrumbs } from '@/components';
import Link from 'next/link';
import apiClient from '@/lib/api';

interface Job {
  _id: string;
  title: string;
  category: string;
  jobType: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  description: string;
  status: string;
  applicationsCount?: number;
  createdAt: string;
}

export default function EmployerMyJobs() {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard/employer' },
    { label: 'My Jobs' }
  ];

  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [closingJobId, setClosingJobId] = useState<string | null>(null);

  const [stats, setStats] = useState({ total: 0, active: 0, pending: 0, filled: 0 });

  const jobStatuses = [
    { value: '', label: 'All Jobs' },
    { value: 'active', label: 'Active' },
    { value: 'closed', label: 'Closed' },
    { value: 'draft', label: 'Draft' },
    { value: 'expired', label: 'Expired' }
  ];

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'carpentry', label: 'Carpentry' },
    { value: 'painting', label: 'Painting' },
    { value: 'masonry', label: 'Masonry' },
    { value: 'hvac', label: 'HVAC' },
    { value: 'roofing', label: 'Roofing' },
    { value: 'landscaping', label: 'Landscaping' },
    { value: 'welding', label: 'Welding' },
    { value: 'driving', label: 'Driving' },
  ];

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const params: any = {};
      if (statusFilter) params.status = statusFilter;
      if (categoryFilter) params.category = categoryFilter;
      if (search) params.search = search;

      const res = await apiClient.get('/api/jobs/employer/me', { params });
      const jobList: Job[] = res.data.jobs || [];
      setJobs(jobList);

      // Calculate stats
      const allRes = await apiClient.get('/api/jobs/employer/me');
      const all: Job[] = allRes.data.jobs || [];
      setStats({
        total: all.length,
        active: all.filter(j => j.status === 'active').length,
        pending: all.filter(j => j.status === 'draft').length,
        filled: all.filter(j => j.status === 'closed' || j.status === 'expired').length,
      });
    } catch (err: any) {
      setError('Failed to load jobs');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [statusFilter, categoryFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleCloseJob = async (jobId: string) => {
    try {
      setClosingJobId(jobId);
      await apiClient.patch(`/api/jobs/${jobId}`, { status: 'closed' });
      setJobs(prev => prev.map(j => j._id === jobId ? { ...j, status: 'closed' } : j));
    } catch (err) {
      console.error('Close job failed:', err);
    } finally {
      setClosingJobId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'closed': return 'bg-red-100 text-red-700';
      case 'expired': return 'bg-orange-100 text-orange-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001F3F] mb-3">My Job Postings</h1>
              <p className="text-[#4A4A4A] text-lg">Manage and monitor your job postings</p>
            </div>
            <Link href="/dashboard/employer/jobs/create">
              <Button size="lg">+ Post New Job</Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <p className="text-[#4A4A4A] text-sm mb-2">Total Jobs Posted</p>
              <p className="text-3xl font-bold text-[#001F3F]">{stats.total}</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <p className="text-[#4A4A4A] text-sm mb-2">Active Jobs</p>
              <p className="text-3xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <p className="text-[#4A4A4A] text-sm mb-2">Drafts</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <p className="text-[#4A4A4A] text-sm mb-2">Closed / Expired</p>
              <p className="text-3xl font-bold text-blue-600">{stats.filled}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 mb-8">
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Input
                placeholder="Search by job title..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Select
                options={jobStatuses}
                placeholder="Job Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
              <Select
                options={categories}
                placeholder="Category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              />
              <Button type="submit" variant="secondary">Search</Button>
            </form>
          </div>

          {/* Job Listings */}
          {isLoading ? (
            <div className="flex justify-center py-12"><LoadingSpinner /></div>
          ) : error ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="p-12 text-center border border-[#E5E7EB] rounded-xl">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-[#4A4A4A] text-lg font-semibold">No jobs found</p>
              <p className="text-sm text-[#4A4A4A] mt-1">Post your first job to start hiring</p>
              <Link href="/dashboard/employer/jobs/create">
                <Button className="mt-4">+ Post New Job</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job._id} className="p-6 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] transition">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#001F3F]">{job.title}</h3>
                      <p className="text-[#4A4A4A] text-sm mt-1">{job.location} • {job.jobType}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0 ml-4">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${getStatusBadge(job.status)}`}>
                        {job.status}
                      </span>
                      {(job.applicationsCount ?? 0) > 0 && (
                        <span className="text-xs bg-[#FFF4E5] text-[#FF7A00] px-3 py-1 rounded-full font-medium">
                          {job.applicationsCount} applications
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-[#4A4A4A] mb-4 line-clamp-2 text-sm">{job.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-[#E5E7EB]">
                    <div>
                      <p className="text-xs text-[#4A4A4A] mb-1">Salary Range</p>
                      <p className="font-bold text-[#001F3F]">₹{job.salaryMin}-{job.salaryMax}/hr</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#4A4A4A] mb-1">Category</p>
                      <p className="font-bold text-[#001F3F] capitalize">{job.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#4A4A4A] mb-1">Posted</p>
                      <p className="font-bold text-[#001F3F]">{formatDate(job.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Link href={`/dashboard/employer/jobs/${job._id}/applications`}>
                      <Button variant="secondary" size="sm">View Applications</Button>
                    </Link>
                    {job.status === 'active' && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleCloseJob(job._id)}
                        disabled={closingJobId === job._id}
                      >
                        {closingJobId === job._id ? 'Closing...' : 'Close Job'}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
