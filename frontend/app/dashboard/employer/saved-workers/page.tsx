'use client';

import { useState, useEffect } from 'react';
import { Navbar, Button, LoadingSpinner } from '@/components';
import { Breadcrumbs } from '@/components';
import Link from 'next/link';
import apiClient from '@/lib/api';

interface Worker {
  _id: string;
  name: string;
  email: string;
  location?: string;
  skills?: string[];
  experience?: number;
  hourlyRate?: number;
  rating?: number;
  totalReviews?: number;
}

export default function EmployerSavedWorkers() {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard/employer' },
    { label: 'Saved Workers' }
  ];

  const [workers, setWorkers] = useState<Worker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedWorkers = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const savedIds: string[] = JSON.parse(localStorage.getItem('savedWorkers') || '[]');

        if (savedIds.length === 0) {
          setWorkers([]);
          setIsLoading(false);
          return;
        }

        // Fetch each worker's profile
        const results = await Promise.allSettled(
          savedIds.map(id => apiClient.get(`/api/workers/${id}`))
        );

        const fetchedWorkers: Worker[] = [];
        const validIds: string[] = [];

        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            const data = result.value.data;
            const worker = data.worker || data.user || data;
            if (worker._id) {
              fetchedWorkers.push(worker);
              validIds.push(savedIds[index]);
            }
          }
        });

        // Update localStorage to remove invalid IDs
        localStorage.setItem('savedWorkers', JSON.stringify(validIds));
        setWorkers(fetchedWorkers);
      } catch (err: any) {
        setError('Failed to load saved workers');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedWorkers();
  }, []);

  const handleRemove = (workerId: string) => {
    const savedIds: string[] = JSON.parse(localStorage.getItem('savedWorkers') || '[]');
    const updated = savedIds.filter(id => id !== workerId);
    localStorage.setItem('savedWorkers', JSON.stringify(updated));
    setWorkers(prev => prev.filter(w => w._id !== workerId));
  };

  const renderStars = (rating: number = 0) => (
    Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}>⭐</span>
    ))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001F3F] mb-3">Saved Workers</h1>
              <p className="text-[#4A4A4A] text-lg">Workers you've bookmarked for future projects</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#FF7A00]">{workers.length}</p>
              <p className="text-sm text-[#4A4A4A]">Total Saved</p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12"><LoadingSpinner /></div>
          ) : error ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          ) : workers.length === 0 ? (
            <div className="p-12 text-center bg-white border border-[#E5E7EB] rounded-xl">
              <p className="text-5xl mb-4">👥</p>
              <p className="text-lg font-semibold text-[#001F3F] mb-2">No Saved Workers Yet</p>
              <p className="text-sm text-[#4A4A4A] mb-6">Browse workers and save them to contact later</p>
              <Link href="/dashboard/employer/workers">
                <Button size="lg">Browse Workers</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workers.map((worker) => (
                <div key={worker._id} className="p-6 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-lg transition">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-[#FFF4E5] flex items-center justify-center text-2xl flex-shrink-0">
                        👤
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#001F3F]">{worker.name}</h3>
                        {worker.location && (
                          <p className="text-sm text-[#4A4A4A]">📍 {worker.location}</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(worker._id)}
                      className="text-red-400 hover:text-red-600 text-xl transition"
                      title="Remove from saved"
                    >
                      ❤️
                    </button>
                  </div>

                  {/* Rating */}
                  {(worker.rating ?? 0) > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-0.5 text-sm">{renderStars(worker.rating)}</div>
                      <span className="text-sm text-[#4A4A4A]">
                        {(worker.rating || 0).toFixed(1)} ({worker.totalReviews || 0})
                      </span>
                    </div>
                  )}

                  {/* Skills */}
                  {worker.skills && worker.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {worker.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="text-xs bg-[#FFF4E5] text-[#FF7A00] px-2 py-1 rounded-full font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Info */}
                  <div className="py-3 border-t border-[#E5E7EB] flex justify-between items-center mb-4">
                    {worker.hourlyRate ? (
                      <p className="text-sm font-bold text-[#FF7A00]">₹{worker.hourlyRate}/hr</p>
                    ) : (
                      <p className="text-sm text-[#4A4A4A]">Rate not set</p>
                    )}
                    {worker.experience !== undefined && worker.experience > 0 && (
                      <p className="text-sm text-[#4A4A4A]">{worker.experience}+ yrs exp</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link href={`/dashboard/employer/workers/${worker._id}`} className="flex-1">
                      <Button variant="secondary" size="sm" className="w-full">View Profile</Button>
                    </Link>
                    <button
                      onClick={() => handleRemove(worker._id)}
                      className="px-3 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition text-sm font-medium"
                    >
                      Remove
                    </button>
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
