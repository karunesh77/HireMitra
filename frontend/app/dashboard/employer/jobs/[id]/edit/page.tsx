import { Navbar, Input, TextArea, Select, Checkbox, Button } from '@/components';
import { Breadcrumbs } from '@/components';
import Link from 'next/link';

export default function EditJobPosting({ params }: { params: { id: string } }) {
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
    { value: 'roofing', label: 'Roofing' }
  ];

  const jobTypes = [
    { value: 'fulltime', label: 'Full-time' },
    { value: 'parttime', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'temporary', label: 'Temporary' }
  ];

  const experiences = [
    { value: 'entry', label: 'Entry Level (0-1 years)' },
    { value: 'junior', label: 'Junior (1-3 years)' },
    { value: 'mid', label: 'Mid-level (3-5 years)' },
    { value: 'senior', label: 'Senior (5+ years)' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#001F3F] mb-3">Edit Job Posting</h1>
            <p className="text-[#4A4A4A] text-lg">Update the details of your job posting</p>
          </div>

          {/* Current Status Alert */}
          <div className="p-6 rounded-xl bg-[#FFF4E5] border border-[#FFE0B2] mb-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-[#001F3F] mb-1">Job Status: Open</p>
                <p className="text-sm text-[#4A4A4A]">This job posting is currently active and receiving applications</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#4A4A4A] mb-1">Posted 5 days ago</p>
                <p className="font-bold text-[#FF7A00]">8 applications</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-8">
            {/* Basic Information Section */}
            <div className="p-8 rounded-xl bg-white border border-[#E5E7EB]">
              <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Basic Information</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Job Title *</label>
                  <Input
                    placeholder="e.g. Senior Plumber, Electrical Technician"
                    type="text"
                  />
                  <p className="text-xs text-[#4A4A4A] mt-2">Changing the title will reset your job views</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Category *</label>
                    <Select
                      options={categories}
                      placeholder="Select category"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Job Type *</label>
                    <Select
                      options={jobTypes}
                      placeholder="Select job type"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Location *</label>
                  <Input
                    placeholder="e.g. New York, NY"
                    type="text"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Minimum Salary (₹/hour) *</label>
                    <Input
                      placeholder="e.g. 500"
                      type="number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Maximum Salary (₹/hour) *</label>
                    <Input
                      placeholder="e.g. 1000"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Job Details Section */}
            <div className="p-8 rounded-xl bg-white border border-[#E5E7EB]">
              <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Job Details</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Job Description *</label>
                  <TextArea
                    placeholder="Describe the job, responsibilities, and what the worker will be doing..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Required Skills *</label>
                  <TextArea
                    placeholder="List required skills, one per line (e.g., Plumbing, Pipe Installation, etc.)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Experience Level *</label>
                  <Select
                    options={experiences}
                    placeholder="Select required experience level"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Additional Requirements</label>
                  <TextArea
                    placeholder="Any additional requirements, qualifications, or certifications (optional)"
                  />
                </div>
              </div>
            </div>

            {/* Job Duration Section */}
            <div className="p-8 rounded-xl bg-white border border-[#E5E7EB]">
              <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Job Duration</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Start Date *</label>
                    <Input
                      type="date"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">End Date (if applicable)</label>
                    <Input
                      type="date"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Number of Positions *</label>
                  <Input
                    placeholder="e.g. 5"
                    type="number"
                  />
                </div>
              </div>
            </div>

            {/* Additional Settings Section */}
            <div className="p-8 rounded-xl bg-white border border-[#E5E7EB]">
              <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Additional Settings</h2>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Checkbox />
                  <label className="ml-3 text-[#4A4A4A]">Show salary range to applicants</label>
                </div>
                <div className="flex items-center">
                  <Checkbox />
                  <label className="ml-3 text-[#4A4A4A]">Accept remote workers</label>
                </div>
                <div className="flex items-center">
                  <Checkbox />
                  <label className="ml-3 text-[#4A4A4A]">Require background check</label>
                </div>
              </div>
            </div>

            {/* Job Management Section */}
            <div className="p-8 rounded-xl bg-white border border-[#E5E7EB]">
              <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Job Management</h2>

              <div className="space-y-4">
                <div className="p-4 bg-[#FFF4E5] rounded-lg border border-[#FFE0B2]">
                  <p className="font-semibold text-[#001F3F] mb-2">Status</p>
                  <p className="text-[#4A4A4A] mb-3">This job posting is currently <span className="font-bold">Open</span></p>
                  <Button variant="danger" size="sm">Close This Job Posting</Button>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-[#E5E7EB]">
                  <p className="font-semibold text-[#001F3F] mb-2">Visibility</p>
                  <p className="text-sm text-[#4A4A4A] mb-3">This job is currently visible to all workers in the HireMitra platform</p>
                  <div className="flex items-center gap-2">
                    <input type="radio" id="visible" name="visibility" defaultChecked />
                    <label htmlFor="visible" className="text-[#4A4A4A]">Show this job publicly</label>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input type="radio" id="hidden" name="visibility" />
                    <label htmlFor="hidden" className="text-[#4A4A4A]">Hide from public view</label>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 justify-end">
              <Link href="/dashboard/employer/jobs">
                <Button variant="secondary">Cancel</Button>
              </Link>
              <Button>Save Changes</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
