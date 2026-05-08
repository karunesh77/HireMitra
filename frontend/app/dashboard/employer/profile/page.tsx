'use client';

import { useState, useEffect } from 'react';
import { Navbar, Input, Button, LoadingSpinner } from '@/components';
import { Breadcrumbs } from '@/components';
import apiClient from '@/lib/api';
import { useToast } from '@/contexts/ToastContext';

export default function EmployerProfile() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

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
        setProfileImage(data.profileImage || null);
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

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError('Photo must be less than 5MB');
      return;
    }
    try {
      setIsUploading(true);
      setError(null);
      const fd = new FormData();
      fd.append('photo', file);
      const response = await apiClient.post('/api/profile/photo', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProfileImage(response.data.photoUrl);
      toast.success('Photo updated!');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to upload photo');
    } finally {
      setIsUploading(false);
    }
  };

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
      toast.success('Profile updated successfully!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
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

              {/* Profile Photo */}
              <div className="p-8 bg-white rounded-xl border border-[#E5E7EB]">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative flex-shrink-0">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-[#FFF4E5]" />
                    ) : (
                      <div className="w-28 h-28 rounded-full bg-[#FFF4E5] flex items-center justify-center text-4xl">🏢</div>
                    )}
                    <label className="absolute bottom-0 right-0 w-9 h-9 bg-[#FF7A00] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e56e00] transition shadow-lg">
                      <span className="text-white text-sm">{isUploading ? '⏳' : '📷'}</span>
                      <input type="file" accept="image/jpeg,image/png,image/gif,image/webp" onChange={handlePhotoUpload} className="hidden" disabled={isUploading} />
                    </label>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-bold text-[#001F3F]">{formData.name || 'Your Name'}</h3>
                    <p className="text-[#4A4A4A] text-sm">{formData.companyName || 'Company Name'}</p>
                    <p className="text-xs text-[#4A4A4A] mt-2">Click 📷 to change photo (max 5MB)</p>
                  </div>
                </div>
              </div>

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
