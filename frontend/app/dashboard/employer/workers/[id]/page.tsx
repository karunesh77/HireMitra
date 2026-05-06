'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar, Button, LoadingSpinner } from '@/components';
import { Breadcrumbs } from '@/components';
import Link from 'next/link';
import apiClient from '@/lib/api';

interface Worker {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  experience?: number;
  hourlyRate?: number;
  certifications?: string[];
  rating?: number;
  totalReviews?: number;
  availability?: string;
  createdAt?: string;
}

export default function WorkerDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const router = useRouter();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isStartingChat, setIsStartingChat] = useState(false);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard/employer' },
    { label: 'Browse Workers', href: '/dashboard/employer/workers' },
    { label: 'Worker Profile' }
  ];

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        setIsLoading(true);
        const res = await apiClient.get(`/api/workers/${id}`);
        setWorker(res.data.worker || res.data.user || res.data);
      } catch (err: any) {
        setError('Failed to load worker profile');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorker();
  }, [id]);

  const handleSendMessage = async () => {
    if (!worker) return;
    try {
      setIsStartingChat(true);
      const res = await apiClient.post('/api/messages/conversations', {
        recipientId: worker._id,
      });
      const convId = res.data.conversation?._id;
      router.push(`/dashboard/employer/messages?conv=${convId}`);
    } catch (err) {
      console.error('Start conversation error:', err);
    } finally {
      setIsStartingChat(false);
    }
  };

  const memberSince = worker?.createdAt
    ? new Date(worker.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : 'Recently';

  const renderStars = (rating: number = 0) => (
    Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < Math.round(rating) ? 'text-yellow-400 text-xl' : 'text-gray-300 text-xl'}>⭐</span>
    ))
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-20 flex justify-center items-center h-[60vh]"><LoadingSpinner /></div>
      </div>
    );
  }

  if (error || !worker) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-20 px-4 max-w-6xl mx-auto">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg mt-6">
            <p className="text-red-600">{error || 'Worker not found'}</p>
          </div>
          <Link href="/dashboard/employer/workers">
            <Button variant="secondary" className="mt-4">← Back to Workers</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Header */}
              <div className="p-8 rounded-xl bg-white border border-[#E5E7EB]">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-32 h-32 rounded-full bg-[#FFF4E5] flex items-center justify-center text-5xl flex-shrink-0">
                    👤
                  </div>
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-[#001F3F] mb-2">{worker.name}</h1>
                    {worker.location && (
                      <p className="text-[#4A4A4A] mb-4">📍 {worker.location}</p>
                    )}

                    {(worker.rating ?? 0) > 0 && (
                      <div className="flex items-center gap-4">
                        <div className="flex gap-1">{renderStars(worker.rating)}</div>
                        <p className="text-[#4A4A4A]">
                          {(worker.rating || 0).toFixed(1)} rating ({worker.totalReviews || 0} reviews)
                        </p>
                      </div>
                    )}

                    <div className="mt-4">
                      <p className="text-sm font-semibold text-[#4A4A4A]">Member since {memberSince}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-6 border-t border-b border-[#E5E7EB]">
                  {worker.hourlyRate && (
                    <div>
                      <p className="text-xs text-[#4A4A4A] mb-1">Hourly Rate</p>
                      <p className="text-2xl font-bold text-[#FF7A00]">₹{worker.hourlyRate}/hr</p>
                    </div>
                  )}
                  {worker.experience !== undefined && (
                    <div>
                      <p className="text-xs text-[#4A4A4A] mb-1">Experience</p>
                      <p className="text-2xl font-bold text-[#001F3F]">{worker.experience}+ yrs</p>
                    </div>
                  )}
                  {worker.phone && (
                    <div>
                      <p className="text-xs text-[#4A4A4A] mb-1">Phone</p>
                      <p className="text-lg font-bold text-[#001F3F]">{worker.phone}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* About Section */}
              {worker.bio && (
                <div className="p-8 rounded-xl bg-white border border-[#E5E7EB]">
                  <h2 className="text-2xl font-bold text-[#001F3F] mb-4">About</h2>
                  <p className="text-[#4A4A4A] leading-relaxed">{worker.bio}</p>
                </div>
              )}

              {/* Skills Section */}
              {worker.skills && worker.skills.length > 0 && (
                <div className="p-8 rounded-xl bg-white border border-[#E5E7EB]">
                  <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Skills & Expertise</h2>
                  <div className="flex flex-wrap gap-2">
                    {worker.skills.map((skill, i) => (
                      <span key={i} className="text-sm bg-[#FFF4E5] text-[#FF7A00] px-3 py-2 rounded-lg font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {worker.certifications && worker.certifications.length > 0 && (
                <div className="p-8 rounded-xl bg-white border border-[#E5E7EB]">
                  <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Certifications</h2>
                  <div className="space-y-3">
                    {worker.certifications.map((cert, i) => (
                      <div key={i} className="p-4 bg-[#FFF4E5] rounded-lg border border-[#FFE0B2] flex items-center justify-between">
                        <p className="font-semibold text-[#001F3F]">{cert}</p>
                        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Verified</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
                <h3 className="text-lg font-bold text-[#001F3F] mb-4">Contact & Hire</h3>
                <div className="space-y-3">
                  <Button fullWidth onClick={handleSendMessage} disabled={isStartingChat}>
                    {isStartingChat ? 'Opening chat...' : '💬 Send Message'}
                  </Button>
                </div>
                {worker.hourlyRate && (
                  <div className="mt-4 p-4 bg-[#FFF4E5] rounded-lg">
                    <p className="text-sm text-[#4A4A4A] mb-1">Hourly Rate</p>
                    <p className="text-2xl font-bold text-[#FF7A00]">₹{worker.hourlyRate}/hr</p>
                  </div>
                )}
              </div>

              {/* Rating Summary */}
              {(worker.rating ?? 0) > 0 && (
                <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
                  <h3 className="text-lg font-bold text-[#001F3F] mb-4">Rating</h3>
                  <div className="flex items-center gap-3">
                    <p className="text-4xl font-bold text-[#FF7A00]">{(worker.rating || 0).toFixed(1)}</p>
                    <div>
                      <div className="flex gap-1">{renderStars(worker.rating)}</div>
                      <p className="text-sm text-[#4A4A4A] mt-1">{worker.totalReviews || 0} reviews</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
                <h3 className="text-lg font-bold text-[#001F3F] mb-4">Profile Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-[#4A4A4A]">Member Since</p>
                    <p className="font-semibold text-[#001F3F]">{memberSince}</p>
                  </div>
                  {worker.email && (
                    <div className="flex justify-between items-center pt-2 border-t border-[#E5E7EB]">
                      <p className="text-[#4A4A4A]">Email</p>
                      <p className="font-semibold text-[#001F3F] text-sm truncate ml-2">{worker.email}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
