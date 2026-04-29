'use client';

import { useState, useEffect, useCallback } from 'react';
import { Navbar, Input, Select, JobCard, Breadcrumbs, LoadingSpinner, Button, Card } from '@/components';
import apiClient from '@/lib/api';

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
}

const DEBOUNCE_DELAY = 300;

export default function WorkerBrowseJobs() {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard/worker' },
    { label: 'Jobs' }
  ];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'carpentry', label: 'Carpentry' },
    { value: 'painting', label: 'Painting' },
    { value: 'hvac', label: 'HVAC' },
    { value: 'roofing', label: 'Roofing' },
    { value: 'landscaping', label: 'Landscaping' },
    { value: 'welding', label: 'Welding' },
    { value: 'driving', label: 'Driving' }
  ];

  const jobTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'temporary', label: 'Temporary' }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  const [locations, setLocations] = useState<{ value: string; label: string }[]>([]);

  // Fetch jobs with current filters
  const fetchJobs = useCallback(async (newSkip: number = 0) => {
    try {
      setIsLoading(true);
      setError(null);

      const params: Record<string, any> = {
        limit: 10,
        skip: newSkip
      };

      if (searchQuery.trim()) params.search = searchQuery;
      if (selectedCategory) params.category = selectedCategory;
      if (selectedJobType) params.jobType = selectedJobType;
      if (selectedLocation) params.location = selectedLocation;

      const response = await apiClient.get('/api/jobs', { params });
      const newJobs = response.data.jobs || [];

      if (newSkip === 0) {
        setJobs(newJobs);
      } else {
        setJobs((prev) => [...prev, ...newJobs]);
      }

      setHasMore(newJobs.length === 10);
      setSkip(newSkip);
    } catch (err: any) {
      console.error('Jobs fetch error:', err);
      setError(err.response?.data?.message || 'Failed to load jobs');
      if (newSkip === 0) setJobs([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedCategory, selectedJobType, selectedLocation]);

  // Debounced search handler
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      setSkip(0);
    }, DEBOUNCE_DELAY);

    setDebounceTimer(timer);
  };

  // Filter change handlers
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setSkip(0);
  };

  const handleJobTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedJobType(e.target.value);
    setSkip(0);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(e.target.value);
    setSkip(0);
  };

  // Fetch jobs when filters change
  useEffect(() => {
    fetchJobs(0);
  }, [searchQuery, selectedCategory, selectedJobType, selectedLocation]);

  // Extract unique locations from fetched jobs for filter dropdown
  useEffect(() => {
    if (jobs.length > 0) {
      const uniqueLocations = [...new Set(jobs.map(job => job.location))];
      const locationOptions = [
        { value: '', label: 'All Locations' },
        ...uniqueLocations.map(loc => ({ value: loc, label: loc }))
      ];
      setLocations(locationOptions);
    }
  }, [jobs]);

  const handleLoadMore = () => {
    fetchJobs(skip + 10);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#001F3F] mb-3">Browse Jobs</h1>
            <p className="text-[#4A4A4A] text-lg">Find jobs that match your skills and experience</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Filters */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Input
                placeholder="Search jobs..."
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <Select
                options={categoryOptions}
                placeholder="Category"
                value={selectedCategory}
                onChange={handleCategoryChange}
              />
              <Select
                options={jobTypeOptions}
                placeholder="Job Type"
                value={selectedJobType}
                onChange={handleJobTypeChange}
              />
              <Select
                options={locations.length > 0 ? locations : [{ value: '', label: 'All Locations' }]}
                placeholder="Location"
                value={selectedLocation}
                onChange={handleLocationChange}
              />
            </div>
          </div>

          {/* Job Listings */}
          {isLoading && skip === 0 ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : jobs.length === 0 ? (
            <Card>
              <p className="text-center text-[#4A4A4A] py-12">
                No jobs found matching your criteria. Try adjusting your filters.
              </p>
            </Card>
          ) : (
            <div className="space-y-6">
              {jobs.map((job) => (
                <JobCard
                  key={job._id}
                  id={job._id}
                  title={job.title}
                  category={job.category}
                  location={job.location}
                  jobType={job.jobType}
                  salary={{ min: job.salaryMin, max: job.salaryMax }}
                  description={job.description}
                  views={job.views}
                  createdAt={job.createdAt}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {hasMore && jobs.length > 0 && (
            <div className="mt-12 flex justify-center">
              <Button
                onClick={handleLoadMore}
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? 'Loading...' : 'Load More Jobs'}
              </Button>
            </div>
          )}

          {jobs.length > 0 && !hasMore && (
            <div className="mt-12 text-center">
              <p className="text-[#4A4A4A]">No more jobs to load</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
