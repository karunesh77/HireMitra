import { Navbar, Input, Select, Button } from '@/components';
import { Breadcrumbs } from '@/components';
import Link from 'next/link';

export default function EmployerMyJobs() {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard/employer' },
    { label: 'My Jobs' }
  ];

  const jobStatuses = [
    { value: 'all', label: 'All Jobs' },
    { value: 'open', label: 'Open' },
    { value: 'closed', label: 'Closed' },
    { value: 'filled', label: 'Filled' }
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
              <h1 className="text-4xl font-bold text-[#001F3F] mb-3">My Job Postings</h1>
              <p className="text-[#4A4A4A] text-lg">Manage and monitor your job postings</p>
            </div>
            <Link href="/dashboard/employer/jobs/create">
              <Button size="lg">+ Post New Job</Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <p className="text-[#4A4A4A] text-sm mb-2">Total Jobs Posted</p>
              <p className="text-3xl font-bold text-[#001F3F]">12</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <p className="text-[#4A4A4A] text-sm mb-2">Active Jobs</p>
              <p className="text-3xl font-bold text-green-600">8</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <p className="text-[#4A4A4A] text-sm mb-2">Pending Applications</p>
              <p className="text-3xl font-bold text-yellow-600">15</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <p className="text-[#4A4A4A] text-sm mb-2">Positions Filled</p>
              <p className="text-3xl font-bold text-blue-600">4</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                placeholder="Search by job title..."
                type="text"
              />
              <Select
                options={jobStatuses}
                placeholder="Job Status"
              />
              <Select
                options={[
                  { value: 'all', label: 'All Categories' },
                  { value: 'plumbing', label: 'Plumbing' },
                  { value: 'electrical', label: 'Electrical' },
                  { value: 'carpentry', label: 'Carpentry' },
                  { value: 'painting', label: 'Painting' }
                ]}
                placeholder="Category"
              />
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-6 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] transition">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#001F3F]">Senior Plumber</h3>
                    <p className="text-[#4A4A4A] text-sm mt-1">New York • Full-time</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                      Open
                    </span>
                    <span className="text-xs bg-[#FFF4E5] text-[#FF7A00] px-3 py-1 rounded-full font-medium">
                      8 applications
                    </span>
                  </div>
                </div>

                <p className="text-[#4A4A4A] mb-4 line-clamp-2">
                  Looking for an experienced plumber to handle residential and commercial plumbing projects. Must have 5+ years experience.
                </p>

                <div className="grid grid-cols-4 gap-4 py-4 border-y border-[#E5E7EB]">
                  <div>
                    <p className="text-xs text-[#4A4A4A] mb-1">Salary Range</p>
                    <p className="font-bold text-[#001F3F]">₹500-1000/hr</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#4A4A4A] mb-1">Posted Date</p>
                    <p className="font-bold text-[#001F3F]">5 days ago</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#4A4A4A] mb-1">Total Views</p>
                    <p className="font-bold text-[#001F3F]">248</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#4A4A4A] mb-1">Total Applications</p>
                    <p className="font-bold text-[#001F3F]">12</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Link href={`/dashboard/employer/jobs/${i}/edit`}>
                    <Button variant="secondary" size="sm">Edit</Button>
                  </Link>
                  <Link href={`/dashboard/employer/jobs/${i}/applications`}>
                    <Button variant="secondary" size="sm">View Applications</Button>
                  </Link>
                  <Button variant="danger" size="sm">Close Job</Button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <button className="px-6 py-3 rounded-lg bg-[#FF7A00] hover:bg-[#E66A00] text-white font-semibold transition shadow-md">
              Load More Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
