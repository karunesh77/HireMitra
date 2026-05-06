'use client';

import { useState, useEffect } from 'react';
import { Navbar, Input, Button, LoadingSpinner } from '@/components';
import { Breadcrumbs } from '@/components';
import apiClient from '@/lib/api';

export default function EmployerProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    companyLocation: '',
    companyWebsite: '',
    bio: '',
  });

  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard/employer' },
    { label: 'Profile' }
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get('/api/profile');
        const data = response.data.user || response.data;
        setFormData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          companyName: data.companyName || '',
          companyLocation: data.companyLocation || data.location || '',
          companyWebsite: data.companyWebsite || '',
          bio: data.bio || '',
        });
      } catch (err) {
        console.error('Profile fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      setIsSaving(true);
      await apiClient.patch('/api/profile', formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#001F3F] mb-2">Company Profile</h1>
            <p className="text-[#4A4A4A]">Update your company information</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20"><LoadingSpinner /></div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {success && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-medium">✅ Profile updated successfully!</p>
                </div>
              )}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {/* Personal Info */}
              <div className="p-8 bg-white rounded-xl border border-[#E5E7EB]">
                <h2 className="text-xl font-bold text-[#001F3F] mb-6">Personal Information</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Full Name</label>
                    <Input value={formData.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Email</label>
                    <Input value={formData.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="Email address" type="email" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Phone</label>
                    <Input value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="Phone number" />
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="p-8 bg-white rounded-xl border border-[#E5E7EB]">
                <h2 className="text-xl font-bold text-[#001F3F] mb-6">Company Information</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Company Name</label>
                    <Input value={formData.companyName} onChange={(e) => handleChange('companyName', e.target.value)} placeholder="Your company name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Location</label>
                    <Input value={formData.companyLocation} onChange={(e) => handleChange('companyLocation', e.target.value)} placeholder="City, State" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Website</label>
                    <Input value={formData.companyWebsite} onChange={(e) => handleChange('companyWebsite', e.target.value)} placeholder="https://yourcompany.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">About Company</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => handleChange('bio', e.target.value)}
                      placeholder="Brief description about your company..."
                      rows={4}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg text-[#001F3F] focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pb-8">
                <Button type="submit" disabled={isSaving} size="lg">
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
