'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import JobCard from '@/components/JobCard';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    city: '',
    skills: '',
    minSalary: '',
    maxSalary: ''
  });
  const [page, setPage] = useState(1);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (filters.city) params.append('city', filters.city);
      if (filters.skills) params.append('skills', filters.skills);
      if (filters.minSalary) params.append('minSalary', filters.minSalary);
      if (filters.maxSalary) params.append('maxSalary', filters.maxSalary);
      params.append('page', page);
      params.append('limit', 12);

      const response = await api.get(`/jobs?${params.toString()}`);
      setJobs(response.data.jobs);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-8">Available Jobs</h1>

      {/* Filters */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="label">City</label>
            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              className="input"
              placeholder="e.g., NYC"
            />
          </div>

          <div>
            <label className="label">Skill</label>
            <input
              type="text"
              name="skills"
              value={filters.skills}
              onChange={handleFilterChange}
              className="input"
              placeholder="e.g., plumbing"
            />
          </div>

          <div>
            <label className="label">Min Salary</label>
            <input
              type="number"
              name="minSalary"
              value={filters.minSalary}
              onChange={handleFilterChange}
              className="input"
              placeholder="$0"
            />
          </div>

          <div>
            <label className="label">Max Salary</label>
            <input
              type="number"
              name="maxSalary"
              value={filters.maxSalary}
              onChange={handleFilterChange}
              className="input"
              placeholder="$1000"
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && <LoadingSpinner />}

      {/* Jobs Grid */}
      {!loading && (
        <>
          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <p className="text-gray-600 text-lg">No jobs found. Try adjusting your filters.</p>
            </div>
          )}

          {/* Pagination */}
          {jobs.length > 0 && (
            <div className="flex justify-center gap-4 mt-12">
              <button
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
                className="btn-secondary disabled:opacity-50"
              >
                Previous
              </button>
              <p className="flex items-center px-4">Page {page}</p>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="btn-primary"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
