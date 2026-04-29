import { Navbar, Input, Select, Button } from '@/components';
import { Breadcrumbs } from '@/components';
import Link from 'next/link';

export default function EmployerBrowseWorkers() {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard/employer' },
    { label: 'Browse Workers' }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'carpentry', label: 'Carpentry' },
    { value: 'painting', label: 'Painting' },
    { value: 'masonry', label: 'Masonry' }
  ];

  const experiences = [
    { value: 'all', label: 'All Experience Levels' },
    { value: 'entry', label: 'Entry Level (0-1 years)' },
    { value: 'junior', label: 'Junior (1-3 years)' },
    { value: 'mid', label: 'Mid-level (3-5 years)' },
    { value: 'senior', label: 'Senior (5+ years)' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#001F3F] mb-3">Browse Available Workers</h1>
            <p className="text-[#4A4A4A] text-lg">Find and connect with qualified workers for your projects</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Input
                placeholder="Search by name or skill..."
                type="text"
              />
              <Select
                options={categories}
                placeholder="Category/Skill"
              />
              <Select
                options={experiences}
                placeholder="Experience Level"
              />
              <Select
                options={[
                  { value: 'all', label: 'All Locations' },
                  { value: 'ny', label: 'New York' },
                  { value: 'la', label: 'Los Angeles' },
                  { value: 'chicago', label: 'Chicago' },
                  { value: 'boston', label: 'Boston' }
                ]}
                placeholder="Location"
              />
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-[#4A4A4A]">Showing <span className="font-bold">24</span> workers</p>
            <Select
              options={[
                { value: 'rating', label: 'Highest Rated' },
                { value: 'recent', label: 'Recently Joined' },
                { value: 'available', label: 'Most Available' }
              ]}
              placeholder="Sort by"
            />
          </div>

          {/* Workers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="p-6 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-lg transition">
                {/* Worker Avatar and Info */}
                <div className="text-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-[#FFF4E5] flex items-center justify-center text-3xl mx-auto mb-3">
                    👤
                  </div>
                  <h3 className="text-lg font-bold text-[#001F3F]">John Plumber {i}</h3>
                  <p className="text-sm text-[#4A4A4A] mt-1">Senior Plumber</p>
                </div>

                {/* Rating */}
                <div className="text-center mb-4">
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                  <p className="text-sm text-[#4A4A4A]">4.9 rating (28 reviews)</p>
                </div>

                {/* Experience */}
                <div className="py-3 px-3 bg-[#FFF4E5] rounded-lg mb-4">
                  <p className="text-xs text-[#4A4A4A] mb-1">Experience</p>
                  <p className="font-bold text-[#FF7A00]">8+ years</p>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <p className="text-xs text-[#4A4A4A] font-semibold mb-2">Top Skills</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Plumbing</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Repairs</span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Installation</span>
                  </div>
                </div>

                {/* Availability and Rate */}
                <div className="py-3 border-t border-[#E5E7EB]">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                      Available
                    </span>
                    <p className="text-sm font-bold text-[#FF7A00]">₹800/hour</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <Link href={`/dashboard/employer/workers/${i}`} className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full">View Profile</Button>
                  </Link>
                  <Button variant="primary" size="sm" className="flex-1">Save</Button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <button className="px-6 py-3 rounded-lg bg-[#FF7A00] hover:bg-[#E66A00] text-white font-semibold transition shadow-md">
              Load More Workers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
