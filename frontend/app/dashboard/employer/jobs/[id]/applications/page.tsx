import { Navbar, Select, Button } from '@/components';
import { Breadcrumbs } from '@/components';
import Link from 'next/link';

export default function JobApplications({ params }: { params: { id: string } }) {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard/employer' },
    { label: 'My Jobs', href: '/dashboard/employer/jobs' },
    { label: 'Applications' }
  ];

  const statuses = [
    { value: 'all', label: 'All Applications' },
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'rejected', label: 'Rejected' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl font-bold text-[#001F3F] mb-3">Job Applications</h1>
              <p className="text-[#4A4A4A] text-lg">Senior Plumber • New York, NY</p>
            </div>
            <Link href="/dashboard/employer/jobs">
              <Button variant="ghost">← Back to Jobs</Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <p className="text-[#4A4A4A] text-sm mb-2">Total Applications</p>
              <p className="text-3xl font-bold text-[#001F3F]">12</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <p className="text-[#4A4A4A] text-sm mb-2">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-600">5</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <p className="text-[#4A4A4A] text-sm mb-2">Accepted</p>
              <p className="text-3xl font-bold text-green-600">5</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <p className="text-[#4A4A4A] text-sm mb-2">Rejected</p>
              <p className="text-3xl font-bold text-red-600">2</p>
            </div>
          </div>

          {/* Filter */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 mb-8">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-[#001F3F] mb-2">Filter Applications</label>
                <Select
                  options={statuses}
                  placeholder="All Applications"
                />
              </div>
              <Button variant="secondary">Sort by Date</Button>
            </div>
          </div>

          {/* Applications List */}
          <div className="space-y-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="p-6 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] transition">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                  {/* Applicant Info */}
                  <div className="md:col-span-2">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-full bg-[#FFF4E5] flex items-center justify-center text-2xl flex-shrink-0">
                        👤
                      </div>
                      <div className="flex-1">
                        <Link href={`/dashboard/employer/workers/${i}`}>
                          <h3 className="text-lg font-bold text-[#001F3F] hover:text-[#FF7A00] cursor-pointer">John Doe {i}</h3>
                        </Link>
                        <p className="text-sm text-[#4A4A4A] mt-1">Plumber • 8 years experience</p>
                        <p className="text-xs text-[#4A4A4A] mt-1">⭐ 4.8 rating (24 reviews)</p>
                      </div>
                    </div>
                  </div>

                  {/* Application Details */}
                  <div>
                    <p className="text-xs text-[#4A4A4A] mb-1">Applied on</p>
                    <p className="font-semibold text-[#001F3F]">{(i * 2) % 30 + 1} days ago</p>
                  </div>

                  {/* Hourly Rate */}
                  <div>
                    <p className="text-xs text-[#4A4A4A] mb-1">Expected Rate</p>
                    <p className="font-semibold text-[#FF7A00]">₹{600 + i * 100}/hr</p>
                  </div>

                  {/* Status */}
                  <div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium inline-block ${
                      i % 3 === 0 ? 'bg-yellow-100 text-yellow-700' :
                      i % 3 === 1 ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {i % 3 === 0 ? 'Pending' : i % 3 === 1 ? 'Accepted' : 'Rejected'}
                    </span>
                  </div>
                </div>

                {/* Application Message */}
                <div className="mt-4 p-4 bg-[#FFF4E5] rounded-lg border border-[#FFE0B2]">
                  <p className="text-sm text-[#4A4A4A]">
                    <span className="font-semibold text-[#FF7A00]">Message: </span>
                    "I have extensive experience in residential and commercial plumbing. I'm very interested in this opportunity and confident I can deliver excellent results. Available to start immediately."
                  </p>
                </div>

                {/* Action Buttons - Show different buttons based on status */}
                {i % 3 === 0 ? (
                  // Pending status
                  <div className="flex gap-3 mt-4">
                    <Button variant="primary" size="sm">Accept</Button>
                    <Button variant="secondary" size="sm">Message</Button>
                    <Button variant="danger" size="sm">Reject</Button>
                    <Link href={`/dashboard/employer/workers/${i}`} className="flex-1">
                      <Button variant="ghost" size="sm" className="w-full">View Full Profile</Button>
                    </Link>
                  </div>
                ) : i % 3 === 1 ? (
                  // Accepted status
                  <div className="flex gap-3 mt-4">
                    <div className="flex-1 flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="font-semibold text-green-700">✓ Application Accepted</p>
                    </div>
                    <Button variant="secondary" size="sm">Message</Button>
                    <Link href={`/dashboard/employer/workers/${i}`} className="flex-1">
                      <Button variant="ghost" size="sm" className="w-full">View Profile</Button>
                    </Link>
                  </div>
                ) : (
                  // Rejected status
                  <div className="flex gap-3 mt-4">
                    <div className="flex-1 flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                      <p className="font-semibold text-red-700">✗ Application Rejected</p>
                    </div>
                    <Button variant="secondary" size="sm">Reconsider</Button>
                    <Link href={`/dashboard/employer/workers/${i}`} className="flex-1">
                      <Button variant="ghost" size="sm" className="w-full">View Profile</Button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <button className="px-6 py-3 rounded-lg bg-[#FF7A00] hover:bg-[#E66A00] text-white font-semibold transition shadow-md">
              Load More Applications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
