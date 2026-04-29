'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Button, LoadingSpinner, Card } from '@/components';
import apiClient from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';

interface Worker {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
  bio?: string;
  skills?: string[];
  experience?: number;
  hourlyRate?: number;
  rating?: number;
  totalReviews?: number;
  location?: string;
  category?: string;
}

export default function WorkersPage() {
  const router = useRouter();
  const { isAuthenticated, userType } = useAuth();

  const [workers, setWorkers] = useState<Worker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const categories = [
    'plumbing',
    'electrical',
    'carpentry',
    'painting',
    'masonry'
  ];

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);
        if (selectedCategory) params.append('category', selectedCategory);
        params.append('limit', '12');
        params.append('skip', ((page - 1) * 12).toString());

        const response = await apiClient.get(`/api/workers?${params.toString()}`);
        const newWorkers = response.data.workers || [];

        if (page === 1) {
          setWorkers(newWorkers);
        } else {
          setWorkers((prev) => [...prev, ...newWorkers]);
        }

        setHasMore(newWorkers.length === 12);
      } catch (err: any) {
        console.error('Workers fetch error:', err);
        setError(err.response?.data?.message || 'Failed to load workers');
      } finally {
        setIsLoading(false);
      }
    };

    const delayTimer = setTimeout(() => {
      fetchWorkers();
    }, 300);

    return () => clearTimeout(delayTimer);
  }, [searchQuery, selectedCategory, page]);

  const handleViewProfile = (workerId: string) => {
    if (isAuthenticated && userType === 'employer') {
      router.push(`/dashboard/employer/workers/${workerId}`);
    } else {
      router.push('/auth/login');
    }
  };

  const renderRating = (rating: number = 0) => {
    const ratingCount = Math.floor(rating);
    return Array.from({ length: 5 })
      .map((_, i) => (i < ratingCount ? '⭐' : '☆'))
      .join('');
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
            <h1 className="text-4xl font-bold text-[#001F3F] mb-3">Find Skilled Workers</h1>
            <p className="text-[#4A4A4A] text-lg">Browse and connect with talented professionals</p>
          </div>

          {/* Filters */}
          <div className="mb-8 p-6 rounded-xl bg-white border border-[#E5E7EB]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-semibold text-[#001F3F] mb-2">Search Workers</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search by name or skills..."
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
            </div>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Workers Grid */}
          {workers.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <p className="text-[#4A4A4A] text-lg mb-4">No workers found matching your criteria</p>
                <p className="text-[#4A4A4A] text-sm">Try adjusting your search filters</p>
              </div>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {workers.map((worker) => (
                  <div
                    key={worker._id}
                    className="bg-white rounded-xl border border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-lg transition overflow-hidden"
                  >
                    {/* Profile Header */}
                    <div className="p-6 bg-gradient-to-r from-[#FFF4E5] to-white">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-[#FF7A00] flex items-center justify-center text-2xl flex-shrink-0">
                          {worker.profileImage ? '📷' : '👤'}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-[#001F3F]">{worker.name}</h3>
                          {worker.category && (
                            <p className="text-xs text-[#FF7A00] font-semibold capitalize mt-1">
                              {worker.category}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">{renderRating(worker.rating)}</span>
                        <span className="text-xs text-[#4A4A4A]">
                          {(worker.rating || 0).toFixed(1)} ({worker.totalReviews || 0} reviews)
                        </span>
                      </div>

                      {/* Location */}
                      {worker.location && (
                        <p className="text-xs text-[#4A4A4A]">📍 {worker.location}</p>
                      )}
                    </div>

                    {/* Profile Body */}
                    <div className="p-6">
                      {/* Bio */}
                      {worker.bio && (
                        <p className="text-sm text-[#4A4A4A] mb-4 line-clamp-2">{worker.bio}</p>
                      )}

                      {/* Experience & Rate */}
                      <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-y border-[#E5E7EB]">
                        <div>
                          <p className="text-xs text-[#4A4A4A] font-semibold">Experience</p>
                          <p className="text-lg font-bold text-[#001F3F]">
                            {worker.experience || 0}+ yrs
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#4A4A4A] font-semibold">Hourly Rate</p>
                          <p className="text-lg font-bold text-[#FF7A00]">
                            ₹{worker.hourlyRate || 0}/hr
                          </p>
                        </div>
                      </div>

                      {/* Skills */}
                      {worker.skills && worker.skills.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-[#001F3F] mb-2">Skills</p>
                          <div className="flex flex-wrap gap-1">
                            {worker.skills.slice(0, 3).map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-[#FFF4E5] text-[#FF7A00] rounded-full text-xs font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                            {worker.skills.length > 3 && (
                              <span className="px-2 py-1 bg-[#FFF4E5] text-[#FF7A00] rounded-full text-xs font-medium">
                                +{worker.skills.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Action Button */}
                      <Button
                        fullWidth
                        onClick={() => handleViewProfile(worker._id)}
                        size="sm"
                      >
                        {isAuthenticated && userType === 'employer' ? 'View Profile' : 'Login to Connect'}
                      </Button>
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
                    {isLoading ? 'Loading...' : 'Load More Workers'}
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
