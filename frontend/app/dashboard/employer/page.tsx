import { Navbar, Button } from '@/components';
import Link from 'next/link';

export default function EmployerDashboard() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl font-bold text-[#001F3F] mb-3">Welcome Back, Employer! 🏢</h1>
              <p className="text-[#4A4A4A] text-lg">Manage your job postings and find the perfect workers</p>
            </div>
            <Link href="/dashboard/employer/jobs/create">
              <Button size="lg">+ Post New Job</Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {/* Stat Card 1 */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-[#FFF4E5] to-white border border-[#E5E7EB]">
              <div className="text-3xl mb-2">💼</div>
              <p className="text-[#4A4A4A] text-sm">Active Jobs</p>
              <p className="text-3xl font-bold text-[#FF7A00] mt-2">8</p>
            </div>

            {/* Stat Card 2 */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-[#E5E7EB]">
              <div className="text-3xl mb-2">📋</div>
              <p className="text-[#4A4A4A] text-sm">Total Applications</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">24</p>
            </div>

            {/* Stat Card 3 */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-white border border-[#E5E7EB]">
              <div className="text-3xl mb-2">✓</div>
              <p className="text-[#4A4A4A] text-sm">Hired</p>
              <p className="text-3xl font-bold text-green-600 mt-2">12</p>
            </div>

            {/* Stat Card 4 */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-white border border-[#E5E7EB]">
              <div className="text-3xl mb-2">👥</div>
              <p className="text-[#4A4A4A] text-sm">Saved Workers</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">15</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/dashboard/employer/jobs/create">
                <div className="p-8 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-lg transition cursor-pointer text-center">
                  <div className="text-4xl mb-3">➕</div>
                  <h3 className="text-lg font-bold text-[#001F3F] mb-2">Post New Job</h3>
                  <p className="text-sm text-[#4A4A4A]">Create a new job posting</p>
                </div>
              </Link>

              <Link href="/dashboard/employer/applications">
                <div className="p-8 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-lg transition cursor-pointer text-center">
                  <div className="text-4xl mb-3">📋</div>
                  <h3 className="text-lg font-bold text-[#001F3F] mb-2">Applications</h3>
                  <p className="text-sm text-[#4A4A4A]">Review job applications</p>
                </div>
              </Link>

              <Link href="/dashboard/employer/workers">
                <div className="p-8 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-lg transition cursor-pointer text-center">
                  <div className="text-4xl mb-3">👥</div>
                  <h3 className="text-lg font-bold text-[#001F3F] mb-2">Browse Workers</h3>
                  <p className="text-sm text-[#4A4A4A]">Find talented workers</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Active Jobs */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#001F3F]">Active Job Postings</h2>
              <Link href="/dashboard/employer/jobs">
                <Button variant="ghost" size="sm">View All →</Button>
              </Link>
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] transition">
                  <div className="flex justify-between items-start">
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
                  <p className="text-[#4A4A4A] mt-3 line-clamp-2">
                    Looking for an experienced plumber to handle residential projects...
                  </p>
                  <div className="flex gap-3 mt-4">
                    <Button variant="secondary" size="sm">Edit</Button>
                    <Button variant="secondary" size="sm">View Applications</Button>
                    <Button variant="danger" size="sm">Close</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Applications */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#001F3F]">Recent Applications</h2>
              <Link href="/dashboard/employer/applications">
                <Button variant="ghost" size="sm">View All →</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-6 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF7A00] hover:shadow-lg transition">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#FFF4E5] flex items-center justify-center text-lg flex-shrink-0">
                      👤
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[#001F3F]">John Doe</h4>
                      <p className="text-sm text-[#4A4A4A]">Applied for: Senior Plumber</p>
                      <p className="text-xs text-[#4A4A4A] mt-1">Applied: 2 days ago</p>
                    </div>
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium h-fit">
                      Pending
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="primary" size="sm">Accept</Button>
                    <Button variant="danger" size="sm">Reject</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
