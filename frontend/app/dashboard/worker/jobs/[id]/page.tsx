'use client';

import { useState, useEffect } from 'react';
import { Navbar, Button, Breadcrumbs, LoadingSpinner } from '@/components';
import ApplicationModal from '@/components/modals/ApplicationModal';
import apiClient from '@/lib/api';
import Link from 'next/link';

interface JobDetailsType {
  _id: string;
  title: string;
  category: string;
  location: string;
  jobType: string;
  salaryMin: number;
  salaryMax: number;
  description: string;
  skillsRequired: string[];
  experience: number;
  numberOfOpenings: number;
  workTiming: string;
  benefits: string[];
  companyName: string;
  createdAt: string;
  views: number;
  applicationsCount: number;
  status: string;
  employerId: any;
}

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const jobId = params.id;
  const [job, setJob] = useState<JobDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard/worker' },
    { label: 'Jobs', href: '/dashboard/worker/jobs' },
    { label: 'Job Details' }
  ];

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await apiClient.get(`/api/jobs/${jobId}`);
        setJob(response.data.job);

        // Load saved jobs from localStorage
        const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        setSavedJobs(saved);
      } catch (err: any) {
        console.error('Job details fetch error:', err);
        setError(err.response?.data?.message || 'Failed to load job details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleSaveJob = () => {
    let saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');

    if (saved.includes(jobId)) {
      saved = saved.filter((id: string) => id !== jobId);
    } else {
      saved.push(jobId);
    }

    localStorage.setItem('savedJobs', JSON.stringify(saved));
    setSavedJobs(saved);
  };

  const handleApplicationSuccess = () => {
    setIsModalOpen(false);
    // Optionally refresh job details or show a success message
  };

  const calculateDaysAgo = (date: string) => {
    const days = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
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

  if (error || !job) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="p-8 bg-red-50 border border-red-200 rounded-lg text-center">
              <p className="text-red-600 text-lg">{error || 'Job not found'}</p>
              <Link href="/dashboard/worker/jobs">
                <Button className="mt-4">Back to Jobs</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isSaved = savedJobs.includes(jobId);
  const statusColor = job.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header Section */}
              <div className="p-8 rounded-xl bg-white border border-[#E5E7EB]">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-4xl font-bold text-[#001F3F] mb-3">{job.title}</h1>
                    <p className="text-[#4A4A4A] text-lg">
                      {job.location} • {job.jobType}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block text-xs px-3 py-1 rounded-full font-medium capitalize ${statusColor}`}>
                      {job.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#E5E7EB]">
                  <div>
                    <p className="text-xs text-[#4A4A4A] mb-1">Salary Range</p>
                    <p className="font-bold text-[#FF7A00]">
                      ₹{job.salaryMin.toLocaleString()}-₹{job.salaryMax.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#4A4A4A] mb-1">Job Type</p>
                    <p className="font-bold text-[#001F3F] capitalize">{job.jobType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#4A4A4A] mb-1">Posted</p>
                    <p className="font-bold text-[#001F3F]">{calculateDaysAgo(job.createdAt)}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-xs text-[#4A4A4A] font-semibold mb-2">Category</p>
                  <p className="text-lg font-bold text-[#FF7A00] capitalize">{job.category}</p>
                </div>
              </div>

              {/* About the Job Section */}
              <div className="p-8 rounded-xl bg-white border border-[#E5E7EB]">
                <h2 className="text-2xl font-bold text-[#001F3F] mb-6">About the Job</h2>

                <div className="space-y-6 text-[#4A4A4A]">
                  <div>
                    <h3 className="font-bold text-[#001F3F] mb-3">Job Description</h3>
                    <p>{job.description}</p>
                  </div>

                  {job.skillsRequired.length > 0 && (
                    <div>
                      <h3 className="font-bold text-[#001F3F] mb-3">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {job.skillsRequired.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-[#FFF4E5] text-[#FF7A00] rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {job.experience > 0 && (
                    <div>
                      <h3 className="font-bold text-[#001F3F] mb-3">Experience Level</h3>
                      <p>{job.experience}+ years of experience required</p>
                    </div>
                  )}

                  {job.benefits.length > 0 && (
                    <div>
                      <h3 className="font-bold text-[#001F3F] mb-3">Benefits</h3>
                      <ul className="list-disc list-inside space-y-2">
                        {job.benefits.map((benefit, idx) => (
                          <li key={idx}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h3 className="font-bold text-[#001F3F] mb-3">Job Details</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-semibold">Openings:</span> {job.numberOfOpenings}
                      </p>
                      <p>
                        <span className="font-semibold">Work Timing:</span> {job.workTiming}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Company Section */}
              <div className="p-8 rounded-xl bg-white border border-[#E5E7EB]">
                <h2 className="text-2xl font-bold text-[#001F3F] mb-6">About the Company</h2>

                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-[#FFF4E5] flex items-center justify-center text-2xl flex-shrink-0">
                    🏢
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#001F3F]">{job.companyName}</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="p-6 rounded-xl bg-[#FFF4E5] border border-[#FFE0B2]">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-[#4A4A4A] mb-1">Total Applicants</p>
                    <p className="text-2xl font-bold text-[#FF7A00]">{job.applicationsCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#4A4A4A] mb-1">Profile Views</p>
                    <p className="text-2xl font-bold text-[#FF7A00]">{job.views}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#4A4A4A] mb-1">Openings</p>
                    <p className="text-2xl font-bold text-[#FF7A00]">{job.numberOfOpenings}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 rounded-xl bg-white border border-[#E5E7EB] space-y-4">
                <Button
                  fullWidth
                  size="lg"
                  onClick={() => setIsModalOpen(true)}
                  disabled={job.status !== 'active'}
                >
                  {job.status === 'active' ? 'Apply for Job' : 'Job Closed'}
                </Button>
                <Button
                  variant={isSaved ? 'primary' : 'secondary'}
                  fullWidth
                  size="lg"
                  onClick={handleSaveJob}
                >
                  {isSaved ? '✓ Saved' : 'Save Job'}
                </Button>
              </div>

              {/* Job Info Card */}
              <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
                <h3 className="text-lg font-bold text-[#001F3F] mb-4">Job Info</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs text-[#4A4A4A] font-semibold">Category</p>
                    <p className="capitalize">{job.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#4A4A4A] font-semibold">Location</p>
                    <p>{job.location}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#4A4A4A] font-semibold">Job Type</p>
                    <p className="capitalize">{job.jobType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#4A4A4A] font-semibold">Experience</p>
                    <p>{job.experience}+ years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <ApplicationModal
        jobId={jobId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleApplicationSuccess}
      />
    </div>
  );
}
