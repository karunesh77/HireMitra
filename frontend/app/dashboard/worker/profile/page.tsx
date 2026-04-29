'use client';

import { useState, useEffect } from 'react';
import { Navbar, Input, TextArea, Button, Breadcrumbs, LoadingSpinner, Card } from '@/components';
import apiClient from '@/lib/api';

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  profileImage?: string;
  bio?: string;
  skills?: string[];
  experience?: number;
  hourlyRate?: number;
  certifications?: string[];
  availability?: string;
  rating?: number;
  totalReviews?: number;
  createdAt?: string;
}

export default function WorkerProfile() {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard/worker' },
    { label: 'Profile' }
  ];

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    skills: '',
    experience: '',
    hourlyRate: '',
    certifications: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const categories = [
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'carpentry', label: 'Carpentry' },
    { value: 'painting', label: 'Painting' },
    { value: 'masonry', label: 'Masonry' }
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await apiClient.get('/api/profile');
        const userData = response.data.user;
        setProfile(userData);

        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          location: userData.location || '',
          bio: userData.bio || '',
          skills: Array.isArray(userData.skills) ? userData.skills.join(', ') : '',
          experience: userData.experience?.toString() || '',
          hourlyRate: userData.hourlyRate?.toString() || '',
          certifications: Array.isArray(userData.certifications)
            ? userData.certifications.join(', ')
            : ''
        });
      } catch (err: any) {
        console.error('Profile fetch error:', err);
        setError(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const updateData = {
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio,
        skills: formData.skills
          .split(',')
          .map((s) => s.trim())
          .filter((s) => s),
        experience: formData.experience ? parseInt(formData.experience) : undefined,
        hourlyRate: formData.hourlyRate ? parseInt(formData.hourlyRate) : undefined,
        certifications: formData.certifications
          .split(',')
          .map((c) => c.trim())
          .filter((c) => c)
      };

      await apiClient.patch('/api/profile', updateData);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to save profile';
      setError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center h-[60vh]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  const memberSince = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      })
    : 'Recently';

  const ratingCount = Math.floor(profile?.rating || 0);
  const ratingStars = Array.from({ length: 5 }).map((_, i) =>
    i < ratingCount ? '⭐' : '☆'
  ).join('');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#001F3F] mb-3">My Profile</h1>
            <p className="text-[#4A4A4A] text-lg">Update your professional information and skills</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">✓ Profile updated successfully!</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Profile Overview */}
          <div className="p-8 rounded-xl bg-white border border-[#E5E7EB] mb-8">
            <div className="flex items-start gap-8">
              <div className="w-32 h-32 rounded-full bg-[#FFF4E5] flex items-center justify-center text-5xl flex-shrink-0">
                {profile?.profileImage ? '📷' : '👤'}
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-[#001F3F] mb-2">{profile?.name}</h2>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-xl">{ratingStars}</div>
                  <p className="text-[#4A4A4A]">
                    {(profile?.rating || 0).toFixed(1)} rating ({profile?.totalReviews || 0} reviews)
                  </p>
                </div>
                <p className="text-[#4A4A4A] mt-3">
                  {profile?.location || 'Location not set'} • Member since {memberSince}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div className="p-8 rounded-xl bg-white border border-[#E5E7EB]">
              <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Personal Information</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Full Name *</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Email Address *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    disabled
                    placeholder={formData.email}
                  />
                  <p className="text-xs text-[#4A4A4A] mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Phone Number *</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Location</label>
                  <Input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="New York, NY"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="p-8 rounded-xl bg-white border border-[#E5E7EB]">
              <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Professional Information</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Years of Experience</label>
                  <Input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Hourly Rate (₹)</label>
                  <Input
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    placeholder="800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Professional Bio</label>
                  <TextArea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell employers about yourself, your experience, and what makes you a great fit..."
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">
                    Skills (comma-separated)
                  </label>
                  <TextArea
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Pipe Installation, Leak Repair, Maintenance, Commercial Plumbing..."
                    rows={3}
                  />
                  <p className="text-xs text-[#4A4A4A] mt-1">Separate multiple skills with commas</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">
                    Certifications (comma-separated)
                  </label>
                  <TextArea
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleChange}
                    placeholder="License A, Certification B, Training C..."
                    rows={2}
                  />
                  <p className="text-xs text-[#4A4A4A] mt-1">Separate multiple certifications with commas</p>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="secondary"
                disabled={isSaving}
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                loading={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
