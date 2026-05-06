'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar, Input, TextArea, Select, Button } from '@/components';
import { Breadcrumbs } from '@/components';
import Link from 'next/link';
import apiClient from '@/lib/api';

export default function CreateJobPosting() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    jobType: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    description: '',
    skillsRequired: '',
    experience: '',
    numberOfOpenings: '1',
    startDate: '',
  });

  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard/employer' },
    { label: 'My Jobs', href: '/dashboard/employer/jobs' },
    { label: 'Create Job' }
  ];

  const categories = [
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

  const jobTypes = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'temporary', label: 'Temporary' },
  ];

  const experiences = [
    { value: '0', label: 'Entry Level (0-1 years)' },
    { value: '1', label: 'Junior (1-3 years)' },
    { value: '3', label: 'Mid-level (3-5 years)' },
    { value: '5', label: 'Senior (5+ years)' },
  ];

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.title || !formData.category || !formData.jobType || !formData.location) {
      setError('Please fill all required fields');
      return;
    }
    if (!formData.salaryMin || !formData.salaryMax) {
      setError('Please enter salary range');
      return;
    }
    if (Number(formData.salaryMin) <= 0 || Number(formData.salaryMax) <= 0) {
      setError('Salary must be greater than 0');
      return;
    }
    if (Number(formData.salaryMin) > Number(formData.salaryMax)) {
      setError('Minimum salary cannot be greater than maximum salary');
      return;
    }
    if (!formData.description) {
      setError('Please enter job description');
      return;
    }
    if (Number(formData.numberOfOpenings) < 1) {
      setError('Number of positions must be at least 1');
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        title: formData.title,
        category: formData.category,
        jobType: formData.jobType,
        location: formData.location,
        salaryMin: Number(formData.salaryMin),
        salaryMax: Number(formData.salaryMax),
        description: formData.description,
        skillsRequired: formData.skillsRequired
          ? formData.skillsRequired.split('\n').map(s => s.trim()).filter(Boolean)
          : [],
        experience: Number(formData.experience) || 0,
        numberOfOpenings: Number(formData.numberOfOpenings) || 1,
        startDate: formData.startDate || undefined,
      };

      await apiClient.post('/api/jobs', payload);
      router.push('/dashboard/employer/jobs');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create job. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#001F3F] mb-3">Post a New Job</h1>
            <p className="text-[#4A4A4A] text-lg">Fill in the details below to create a new job posting</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="p-8 rounded-xl bg-white border border-[#E5E7EB]">
              <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Basic Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Job Title *</label>
                  <Input
                    placeholder="e.g. Senior Plumber, Electrical Technician"
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Category *</label>
                    <Select
                      options={categories}
                      placeholder="Select category"
                      value={formData.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Job Type *</label>
                    <Select
                      options={jobTypes}
                      placeholder="Select job type"
                      value={formData.jobType}
                      onChange={(e) => handleChange('jobType', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Location *</label>
                  <Input
                    placeholder="e.g. Mumbai, Delhi"
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Minimum Salary (₹/hour) *</label>
                    <Input
                      placeholder="e.g. 500"
                      type="number"
                      value={formData.salaryMin}
                      onChange={(e) => handleChange('salaryMin', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Maximum Salary (₹/hour) *</label>
                    <Input
                      placeholder="e.g. 1000"
                      type="number"
                      value={formData.salaryMax}
                      onChange={(e) => handleChange('salaryMax', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Job Details */}
            <div className="p-8 rounded-xl bg-white border border-[#E5E7EB]">
              <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Job Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Job Description *</label>
                  <TextArea
                    placeholder="Describe the job, responsibilities..."
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Required Skills</label>
                  <TextArea
                    placeholder="One skill per line (e.g. Plumbing, Pipe fitting)"
                    value={formData.skillsRequired}
                    onChange={(e) => handleChange('skillsRequired', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Experience Level</label>
                  <Select
                    options={experiences}
                    placeholder="Select required experience"
                    value={formData.experience}
                    onChange={(e) => handleChange('experience', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Job Duration */}
            <div className="p-8 rounded-xl bg-white border border-[#E5E7EB]">
              <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Job Duration</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Start Date</label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleChange('startDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Number of Positions *</label>
                    <Input
                      placeholder="e.g. 2"
                      type="number"
                      min="1"
                      value={formData.numberOfOpenings}
                      onChange={(e) => handleChange('numberOfOpenings', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-end pb-8">
              <Link href="/dashboard/employer/jobs">
                <Button variant="secondary" type="button">Cancel</Button>
              </Link>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Posting...' : 'Post Job'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
