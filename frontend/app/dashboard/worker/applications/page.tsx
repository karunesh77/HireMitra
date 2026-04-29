'use client';

import { useState, useEffect } from 'react';
import { Navbar, Tabs, ApplicationCard, LoadingSpinner, Card, Breadcrumbs } from '@/components';
import apiClient from '@/lib/api';

interface Application {
  _id: string;
  jobId: {
    _id: string;
    title: string;
    location: string;
    salaryMin: number;
    salaryMax: number;
    companyName: string;
  };
  status: string;
  appliedAt: string;
  coverLetter: string;
}

export default function WorkerApplications() {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard/worker' },
    { label: 'Applications' }
  ];

  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState('all');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await apiClient.get('/api/applications/worker/me');
        setApplications(response.data.applications || []);
      } catch (err: any) {
        console.error('Applications fetch error:', err);
        setError(err.response?.data?.message || 'Failed to load applications');
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const mapApiStatusToCardStatus = (apiStatus: string): 'pending' | 'accepted' | 'rejected' => {
    switch (apiStatus) {
      case 'applied':
      case 'shortlisted':
        return 'pending';
      case 'hired':
        return 'accepted';
      case 'rejected':
        return 'rejected';
      default:
        return 'pending';
    }
  };

  const getFilteredApplications = (status: string | null) => {
    if (status === null || status === 'all') {
      return applications;
    }
    return applications.filter((app) => app.status === status);
  };

  const allApps = applications;
  const pendingApps = getFilteredApplications('applied');
  const acceptedApps = getFilteredApplications('hired');
  const rejectedApps = getFilteredApplications('rejected');

  const tabs = [
    {
      id: 'all',
      label: `All Applications (${allApps.length})`,
      content: allApps.length === 0 ? (
        <Card>
          <p className="text-center text-[#4A4A4A] py-8">
            No applications yet. <a href="/dashboard/worker/jobs" className="text-[#FF7A00] font-semibold">Browse jobs</a> to apply!
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {allApps.map((app) => (
            <ApplicationCard
              key={app._id}
              id={app._id}
              jobTitle={app.jobId?.title || 'Job'}
              companyName={app.jobId?.companyName || 'Company'}
              location={app.jobId?.location || 'Location'}
              salary={{ min: app.jobId?.salaryMin || 0, max: app.jobId?.salaryMax || 0 }}
              status={mapApiStatusToCardStatus(app.status)}
              appliedAt={app.appliedAt}
              message={app.coverLetter}
            />
          ))}
        </div>
      )
    },
    {
      id: 'pending',
      label: `Pending (${pendingApps.length})`,
      content: pendingApps.length === 0 ? (
        <Card>
          <p className="text-center text-[#4A4A4A] py-8">No pending applications</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {pendingApps.map((app) => (
            <ApplicationCard
              key={app._id}
              id={app._id}
              jobTitle={app.jobId?.title || 'Job'}
              companyName={app.jobId?.companyName || 'Company'}
              location={app.jobId?.location || 'Location'}
              salary={{ min: app.jobId?.salaryMin || 0, max: app.jobId?.salaryMax || 0 }}
              status={mapApiStatusToCardStatus(app.status)}
              appliedAt={app.appliedAt}
              message={app.coverLetter}
            />
          ))}
        </div>
      )
    },
    {
      id: 'accepted',
      label: `Accepted (${acceptedApps.length})`,
      content: acceptedApps.length === 0 ? (
        <Card>
          <p className="text-center text-[#4A4A4A] py-8">No accepted applications yet</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {acceptedApps.map((app) => (
            <ApplicationCard
              key={app._id}
              id={app._id}
              jobTitle={app.jobId?.title || 'Job'}
              companyName={app.jobId?.companyName || 'Company'}
              location={app.jobId?.location || 'Location'}
              salary={{ min: app.jobId?.salaryMin || 0, max: app.jobId?.salaryMax || 0 }}
              status={mapApiStatusToCardStatus(app.status)}
              appliedAt={app.appliedAt}
              message={app.coverLetter}
            />
          ))}
        </div>
      )
    },
    {
      id: 'rejected',
      label: `Rejected (${rejectedApps.length})`,
      content: rejectedApps.length === 0 ? (
        <Card>
          <p className="text-center text-[#4A4A4A] py-8">No rejected applications</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {rejectedApps.map((app) => (
            <ApplicationCard
              key={app._id}
              id={app._id}
              jobTitle={app.jobId?.title || 'Job'}
              companyName={app.jobId?.companyName || 'Company'}
              location={app.jobId?.location || 'Location'}
              salary={{ min: app.jobId?.salaryMin || 0, max: app.jobId?.salaryMax || 0 }}
              status={mapApiStatusToCardStatus(app.status)}
              appliedAt={app.appliedAt}
              message={app.coverLetter}
            />
          ))}
        </div>
      )
    }
  ];

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#001F3F] mb-3">My Applications</h1>
            <p className="text-[#4A4A4A] text-lg">Track all your job applications</p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <p className="text-[#4A4A4A] text-sm mb-2">Total Applications</p>
              <p className="text-3xl font-bold text-[#001F3F]">{allApps.length}</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <p className="text-[#4A4A4A] text-sm mb-2">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">{pendingApps.length}</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <p className="text-[#4A4A4A] text-sm mb-2">Accepted</p>
              <p className="text-3xl font-bold text-green-600">{acceptedApps.length}</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <p className="text-[#4A4A4A] text-sm mb-2">Rejected</p>
              <p className="text-3xl font-bold text-red-600">{rejectedApps.length}</p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs tabs={tabs} defaultTab="all" />
        </div>
      </div>
    </div>
  );
}
