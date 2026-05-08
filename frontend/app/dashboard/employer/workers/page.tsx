'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar, Input, Select, Button, LoadingSpinner } from '@/components';
import { Breadcrumbs } from '@/components';
import Link from 'next/link';
import apiClient from '@/lib/api';

interface Worker {
  _id: string;
  name: string;
  email: string;
  location?: string;
  bio?: string;
  skills?: string[];
  experience?: number;
  hourlyRate?: number;
  rating?: number;
  totalReviews?: number;
  availability?: string;
}

function EmployerBrowseWorkersContent() {
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get('search') || '';

  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard/employer' },
    { label: 'Browse Workers' }
  ];

  const [workers, setWorkers] = useState<Worker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState(urlSearch);
  const [skillFilter, setSkillFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const categories = [
    { value: '', label: 'All Skills' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'carpentry', label: 'Carpentry' },
    { value: 'painting', label: 'Painting' },
    { value: 'masonry', label: 'Masonry' },
    { value: 'hvac', label: 'HVAC' },
    { value: 'welding', label: 'Welding' },
    { value: 'driving', label: 'Driving' },
  ];

  const fetchWorkers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const params: any = {};
      if (search) params.search = search;
      if (skillFilter) params.skill = skillFilter;
      if (locationFilter) params.location = locationFilter;

      const res = await apiClient.get('/api/workers', { params });
      setWorkers(res.data.workers || []);
    } catch (err: any) {
      setError('Failed to load workers');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, [skillFilter, urlSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWorkers();
  };

  const renderStars = (rating: number = 0) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}>⭐</span>
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          <div className="mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001F3F] mb-3">Browse Available Workers</h1>
            <p className="text-[#4A4A4A] text-lg">Find and connect with qualified workers for your projects</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-8 mb-8">
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <Input
                placeholder="Search by name or skill..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Select
                options={categories}
                placeholder="Skill / Category"
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
              />
              <Input
                placeholder="Location..."
                type="text"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
              <Button type="submit" variant="secondary">Search</Button>
            </form>
          </div>

          {/* Count */}
          {!isLoading && !error && (
            <p className="text-[#4A4A4A] mb-6">
              Showing <span className="font-bold">{workers.length}</span> workers
            </p>
          )}

          {/* Workers Grid */}
          {isLoading ? (
            <div className="flex justify-center py-12"><LoadingSpinner /></div>
          ) : error ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          ) : workers.length === 0 ? (
            <div className="p-12 text-center border border-[#E5E7EB] rounded-xl">
              <p className="text-4xl mb-3">👷</p>
              <p className="text-[#4A4A4A] text-lg font-semibold">No workers found</p>
              <p className="text-sm text-[#4A4A4A] mt-1">Try adjusting your search filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workers.map((worker) => (
                <div key={worker._id} className="p-6 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-lg transition">
                  {/* Worker Avatar and Info */}
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-[#FFF4E5] flex items-center justify-center text-3xl mx-auto mb-3">
                      👤
                    </div>
                    <h3 className="text-lg font-bold text-[#001F3F]">{worker.name}</h3>
                    {worker.location && (
                      <p className="text-sm text-[#4A4A4A] mt-1">📍 {worker.location}</p>
                    )}
                  </div>

                  {/* Rating */}
                  {(worker.rating ?? 0) > 0 && (
                    <div className="text-center mb-4">
                      <div className="flex justify-center gap-1 mb-1">
                        {renderStars(worker.rating)}
                      </div>
                      <p className="text-sm text-[#4A4A4A]">
                        {(worker.rating || 0).toFixed(1)} ({worker.totalReviews || 0} reviews)
                      </p>
                    </div>
                  )}

                  {/* Experience */}
                  {worker.experience !== undefined && worker.experience > 0 && (
                    <div className="py-3 px-3 bg-[#FFF4E5] rounded-lg mb-4">
                      <p className="text-xs text-[#4A4A4A] mb-1">Experience</p>
                      <p className="font-bold text-[#FF7A00]">{worker.experience}+ years</p>
                    </div>
                  )}

                  {/* Skills */}
                  {worker.skills && worker.skills.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-[#4A4A4A] font-semibold mb-2">Top Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {worker.skills.slice(0, 3).map((skill, i) => (
                          <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Rate */}
                  <div className="py-3 border-t border-[#E5E7EB] flex justify-between items-center">
                    {worker.hourlyRate ? (
                      <p className="text-sm font-bold text-[#FF7A00]">₹{worker.hourlyRate}/hour</p>
                    ) : (
                      <p className="text-sm text-[#4A4A4A]">Rate not set</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <Link href={`/dashboard/employer/workers/${worker._id}`} className="flex-1">
                      <Button variant="secondary" size="sm" className="w-full">View Profile</Button>
                    </Link>
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

export default function EmployerBrowseWorkers() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><LoadingSpinner /></div>}>
      <EmployerBrowseWorkersContent />
    </Suspense>
  );
}
