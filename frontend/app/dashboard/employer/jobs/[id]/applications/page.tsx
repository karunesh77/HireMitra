'use client';

import { useState, useEffect, use } from 'react';
import { Navbar, Select, Button, LoadingSpinner } from '@/components';
import { Breadcrumbs } from '@/components';
import Link from 'next/link';
import apiClient from '@/lib/api';

interface Application {
  _id: string;
  workerId: { _id: string; name: string; email: string; skills?: string[]; experience?: number } | null;
  jobId: { _id: string; title: string; location: string } | null;
  status: string;
  coverLetter: string;
  expectedSalary: number;
  createdAt: string;
}

interface Stats {
  total: number;
  pending: number;
  hired: number;
  rejected: number;
}

export default function JobApplications({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [applications, setApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, hired: 0, rejected: 0 });
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobTitle, setJobTitle] = useState('');

  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard/employer' },
    { label: 'My Jobs', href: '/dashboard/employer/jobs' },
    { label: 'Applications' }
  ];

  const statuses = [
    { value: '', label: 'All Applications' },
    { value: 'pending', label: 'Pending' },
    { value: 'hired', label: 'Accepted' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const fetchApplications = async (status: string = '') => {
    try {
      setIsLoading(true);
      setError(null);
      const params: any = {};
      if (status) params.status = status;

      const response = await apiClient.get(`/api/applications/employer/jobs/${id}`, { params });
      const apps = response.data.applications || [];
      setApplications(apps);

      if (apps.length > 0 && apps[0].jobId) {
        setJobTitle(apps[0].jobId.title);
      }

      // Calculate stats
      const allRes = await apiClient.get(`/api/applications/employer/jobs/${id}`);
      const allApps = allRes.data.applications || [];
      setStats({
        total: allApps.length,
        pending: allApps.filter((a: Application) => a.status === 'pending').length,
        hired: allApps.filter((a: Application) => a.status === 'hired').length,
        rejected: allApps.filter((a: Application) => a.status === 'rejected').length,
      });
    } catch (err: any) {
      setError('Failed to load applications');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(selectedStatus);
  }, [id, selectedStatus]);

  const handleStatusChange = async (applicationId: string, newStatus: 'hired' | 'rejected' | 'pending') => {
    try {
      await apiClient.patch(`/api/applications/${applicationId}/status`, { status: newStatus });
      setApplications(prev =>
        prev.map(app => app._id === applicationId ? { ...app, status: newStatus } : app)
      );
      // Refresh stats
      fetchApplications(selectedStatus);
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'hired': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'hired': return 'Accepted';
      case 'pending': return 'Pending';
      case 'rejected': return 'Rejected';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl font-bold text-[#001F3F] mb-3">Job Applications</h1>
              {jobTitle && <p className="text-[#4A4A4A] text-lg">{jobTitle}</p>}
            </div>
            <Link href="/dashboard/employer/jobs">
              <Button variant="ghost">← Back to Jobs</Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <p className="text-[#4A4A4A] text-sm mb-2">Total</p>
              <p className="text-3xl font-bold text-[#001F3F]">{stats.total}</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <p className="text-[#4A4A4A] text-sm mb-2">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <p className="text-[#4A4A4A] text-sm mb-2">Accepted</p>
              <p className="text-3xl font-bold text-green-600">{stats.hired}</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <p className="text-[#4A4A4A] text-sm mb-2">Rejected</p>
              <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
            </div>
          </div>

          {/* Filter */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 mb-8">
            <div className="flex gap-4 items-end">
              <div className="w-64">
                <label className="block text-sm font-semibold text-[#001F3F] mb-2">Filter by Status</label>
                <Select
                  options={statuses}
                  placeholder="All Applications"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Applications List */}
          {isLoading ? (
            <div className="flex justify-center py-12"><LoadingSpinner /></div>
          ) : error ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="p-12 text-center border border-[#E5E7EB] rounded-xl">
              <p className="text-[#4A4A4A] text-lg">No applications found.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {applications.map((app) => (
                <div key={app._id} className="p-6 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] transition">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Worker Info */}
                    <div className="flex gap-4 flex-1">
                      <div className="w-14 h-14 rounded-full bg-[#FFF4E5] flex items-center justify-center text-2xl flex-shrink-0">👤</div>
                      <div>
                        <h3 className="text-lg font-bold text-[#001F3F]">{app.workerId?.name || 'Worker'}</h3>
                        <p className="text-sm text-[#4A4A4A]">{app.workerId?.email}</p>
                        {app.workerId?.skills && app.workerId.skills.length > 0 && (
                          <div className="flex gap-2 mt-2 flex-wrap">
                            {app.workerId.skills.slice(0, 3).map((skill, i) => (
                              <span key={i} className="text-xs bg-[#FFF4E5] text-[#FF7A00] px-2 py-1 rounded-full">{skill}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex gap-6 items-start">
                      <div>
                        <p className="text-xs text-[#4A4A4A] mb-1">Expected Salary</p>
                        <p className="font-bold text-[#FF7A00]">₹{app.expectedSalary || 'N/A'}/hr</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A4A4A] mb-1">Applied</p>
                        <p className="font-semibold text-[#001F3F]">{new Date(app.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusBadge(app.status)}`}>
                        {getStatusLabel(app.status)}
                      </span>
                    </div>
                  </div>

                  {/* Cover Letter */}
                  {app.coverLetter && (
                    <div className="mt-4 p-4 bg-[#FFF4E5] rounded-lg border border-[#FFE0B2]">
                      <p className="text-sm text-[#4A4A4A]">
                        <span className="font-semibold text-[#FF7A00]">Cover Letter: </span>
                        {app.coverLetter}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 mt-4">
                    {app.status === 'pending' && (
                      <>
                        <Button variant="primary" size="sm" onClick={() => handleStatusChange(app._id, 'hired')}>✓ Accept</Button>
                        <Button variant="danger" size="sm" onClick={() => handleStatusChange(app._id, 'rejected')}>✗ Reject</Button>
                      </>
                    )}
                    {app.status === 'hired' && (
                      <div className="flex items-center gap-3">
                        <span className="text-green-700 font-semibold text-sm">✓ Accepted</span>
                        <Button variant="secondary" size="sm" onClick={() => handleStatusChange(app._id, 'rejected')}>Reconsider</Button>
                      </div>
                    )}
                    {app.status === 'rejected' && (
                      <div className="flex items-center gap-3">
                        <span className="text-red-700 font-semibold text-sm">✗ Rejected</span>
                        <Button variant="secondary" size="sm" onClick={() => handleStatusChange(app._id, 'pending')}>Reconsider</Button>
                      </div>
                    )}
                    {app.workerId?._id && (
                      <Link href={`/dashboard/employer/workers/${app.workerId._id}`}>
                        <Button variant="ghost" size="sm">View Profile</Button>
                      </Link>
                    )}
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
