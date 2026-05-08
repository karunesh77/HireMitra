'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar, Input, TextArea, Select, Button, LoadingSpinner } from '@/components';
import { Breadcrumbs } from '@/components';
import Link from 'next/link';
import apiClient from '@/lib/api';
import { useToast } from '@/contexts/ToastContext';

export default function EditJobPosting({ params }: { params: Promise<{ id: string }> }) {
  const { id: jobId } = use(params);
  const router = useRouter();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [jobStatus, setJobStatus] = useState('active');
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [createdAt, setCreatedAt] = useState('');

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
    { label: 'Edit Job' }
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

  // Fetch existing job data
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoading(true);
        const res = await apiClient.get(`/api/jobs/${jobId}`);
        const job = res.data.job;

        setJobStatus(job.status || 'active');
        setApplicationsCount(job.applicationsCount || 0);
        setCreatedAt(job.createdAt || '');

        setFormData({
          title: job.title || '',
          category: job.category || '',
          jobType: job.jobType || '',
          location: job.location || '',
          salaryMin: job.salaryMin?.toString() || '',
          salaryMax: job.salaryMax?.toString() || '',
          description: job.description || '',
          skillsRequired: Array.isArray(job.skillsRequired) ? job.skillsRequired.join('\n') : '',
          experience: job.experience?.toString() || '0',
          numberOfOpenings: job.numberOfOpenings?.toString() || '1',
          startDate: job.startDate ? new Date(job.startDate).toISOString().split('T')[0] : '',
        });
      } catch (err: any) {
        setError('Failed to load job details');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.title || !formData.category || !formData.jobType || !formData.location) {
      setError('Please fill all required fields');
      return;
    }
    if (!formData.salaryMin || !formData.salaryMax) {
      setError('Please enter salary range');
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

    try {
      setIsSaving(true);
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

      await apiClient.patch(`/api/jobs/${jobId}`, payload);
      toast.success('Job updated successfully!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.response?.data?.error || 'Failed to update job');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseJob = async () => {
    try {
      await apiClient.patch(`/api/jobs/${jobId}`, { status: 'closed' });
      setJobStatus('closed');
    } catch (err) {
      console.error('Close job failed:', err);
    }
  };

  const handleReopenJob = async () => {
    try {
      await apiClient.patch(`/api/jobs/${jobId}`, { status: 'active' });
      setJobStatus('active');
    } catch (err) {
      console.error('Reopen job failed:', err);
    }
  };

  const formatDaysAgo = (dateStr: string) => {
    if (!dateStr) return '';
    const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-20 flex justify-center items-center h-[60vh]"><LoadingSpinner /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          <div className="mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001F3F] mb-3">Edit Job Posting</h1>
            <p className="text-[#4A4A4A] text-lg">Update the details of your job posting</p>
          </div>

          {/* Status Alert */}
          <div className="p-6 rounded-xl bg-[#FFF4E5] border border-[#FFE0B2] mb-8">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-[#001F3F] mb-1">
                  Job Status: <span className={`capitalize ${jobStatus === 'active' ? 'text-green-600' : 'text-red-600'}`}>{jobStatus}</span>
                </p>
                <p className="text-sm text-[#4A4A4A]">
                  {jobStatus === 'active' ? 'This job is currently active and receiving applications' : 'This job is closed'}
                </p>
              </div>
              <div className="text-right">
                {createdAt && <p className="text-sm text-[#4A4A4A] mb-1">Posted {formatDaysAgo(createdAt)}</p>}
                <p className="font-bold text-[#FF7A00]">{applicationsCount} applications</p>
              </div>
            </div>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">Job updated successfully!</p>
            </div>
          )}
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
                  <Input placeholder="e.g. Senior Plumber" type="text" value={formData.title} onChange={(e) => handleChange('title', e.target.value)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Category *</label>
                    <Select options={categories} placeholder="Select category" value={formData.category} onChange={(e) => handleChange('category', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Job Type *</label>
                    <Select options={jobTypes} placeholder="Select job type" value={formData.jobType} onChange={(e) => handleChange('jobType', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Location *</label>
                  <Input placeholder="e.g. Mumbai, Delhi" type="text" value={formData.location} onChange={(e) => handleChange('location', e.target.value)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Min Salary (₹/hr) *</label>
                    <Input placeholder="500" type="number" value={formData.salaryMin} onChange={(e) => handleChange('salaryMin', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Max Salary (₹/hr) *</label>
                    <Input placeholder="1000" type="number" value={formData.salaryMax} onChange={(e) => handleChange('salaryMax', e.target.value)} />
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
                  <TextArea placeholder="Describe the job, responsibilities..." value={formData.description} onChange={(e) => handleChange('description', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Required Skills</label>
                  <TextArea placeholder="One skill per line" value={formData.skillsRequired} onChange={(e) => handleChange('skillsRequired', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Experience Level</label>
                  <Select options={experiences} placeholder="Select experience" value={formData.experience} onChange={(e) => handleChange('experience', e.target.value)} />
                </div>
              </div>
            </div>

            {/* Job Duration */}
            <div className="p-8 rounded-xl bg-white border border-[#E5E7EB]">
              <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Job Duration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Start Date</label>
                  <Input type="date" value={formData.startDate} onChange={(e) => handleChange('startDate', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Number of Positions *</label>
                  <Input placeholder="2" type="number" min="1" value={formData.numberOfOpenings} onChange={(e) => handleChange('numberOfOpenings', e.target.value)} />
                </div>
              </div>
            </div>

            {/* Job Management */}
            <div className="p-8 rounded-xl bg-white border border-[#E5E7EB]">
              <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Job Management</h2>
              <div className="p-4 bg-[#FFF4E5] rounded-lg border border-[#FFE0B2]">
                <p className="font-semibold text-[#001F3F] mb-2">Status</p>
                <p className="text-[#4A4A4A] mb-3">
                  This job posting is currently <span className={`font-bold ${jobStatus === 'active' ? 'text-green-600' : 'text-red-600'}`}>{jobStatus}</span>
                </p>
                {jobStatus === 'active' ? (
                  <Button variant="danger" size="sm" type="button" onClick={handleCloseJob}>Close This Job</Button>
                ) : (
                  <Button variant="primary" size="sm" type="button" onClick={handleReopenJob}>Reopen This Job</Button>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-end pb-8">
              <Link href="/dashboard/employer/jobs">
                <Button variant="secondary" type="button">Cancel</Button>
              </Link>
              <Button type="submit" disabled={isSaving} loading={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
