import { Navbar, Button } from '@/components';
import { Breadcrumbs } from '@/components';
import Link from 'next/link';

export default function WorkerDetails({ params }: { params: { id: string } }) {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard/employer' },
    { label: 'Browse Workers', href: '/dashboard/employer/workers' },
    { label: 'Worker Profile' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Header */}
              <div className="p-8 rounded-xl bg-white border border-[#E5E7EB]">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-32 h-32 rounded-full bg-[#FFF4E5] flex items-center justify-center text-5xl flex-shrink-0">
                    👤
                  </div>
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-[#001F3F] mb-2">John Plumber</h1>
                    <p className="text-xl text-[#4A4A4A] mb-3">Senior Plumber</p>
                    <p className="text-[#4A4A4A] mb-4">New York, NY • Available</p>

                    <div className="flex items-center gap-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-xl">⭐</span>
                        ))}
                      </div>
                      <p className="text-[#4A4A4A]">4.9 rating (28 reviews)</p>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-semibold text-[#4A4A4A] mb-2">Member since January 2024</p>
                      <span className="inline-block text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                        Verified Profile
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-[#E5E7EB]">
                  <div>
                    <p className="text-xs text-[#4A4A4A] mb-1">Hourly Rate</p>
                    <p className="text-2xl font-bold text-[#FF7A00]">₹800/hour</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#4A4A4A] mb-1">Years of Experience</p>
                    <p className="text-2xl font-bold text-[#001F3F]">8+ years</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#4A4A4A] mb-1">Jobs Completed</p>
                    <p className="text-2xl font-bold text-[#001F3F]">143</p>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="p-8 rounded-xl bg-white border border-[#E5E7EB]">
                <h2 className="text-2xl font-bold text-[#001F3F] mb-4">About</h2>
                <p className="text-[#4A4A4A] leading-relaxed">
                  I am a highly skilled and experienced Senior Plumber with 8+ years of professional plumbing experience. I specialize in residential and commercial plumbing projects including installations, repairs, and maintenance. I'm known for my attention to detail, problem-solving abilities, and excellent customer service.
                </p>
              </div>

              {/* Skills Section */}
              <div className="p-8 rounded-xl bg-white border border-[#E5E7EB]">
                <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Skills & Expertise</h2>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-[#001F3F] mb-3">Top Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {['Pipe Installation', 'Leak Repair', 'Maintenance', 'Commercial Plumbing', 'Residential Plumbing', 'System Design'].map((skill, i) => (
                        <span key={i} className="text-sm bg-[#FFF4E5] text-[#FF7A00] px-3 py-2 rounded-lg font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#001F3F] mb-3">Work Types</p>
                    <div className="flex flex-wrap gap-2">
                      {['Full-time', 'Part-time', 'Contract'].map((type, i) => (
                        <span key={i} className="text-sm bg-blue-50 text-blue-700 px-3 py-2 rounded-lg border border-blue-200">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Certifications Section */}
              <div className="p-8 rounded-xl bg-white border border-[#E5E7EB]">
                <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Certifications & Documents</h2>

                <div className="space-y-3">
                  {['Master Plumber License', 'Safety Certification', 'First Aid Certification'].map((cert, i) => (
                    <div key={i} className="p-4 bg-[#FFF4E5] rounded-lg border border-[#FFE0B2] flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-[#001F3F]">{cert}</p>
                        <p className="text-sm text-[#4A4A4A] mt-1">Verified ✓</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                        Valid
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Section */}
              <div className="p-8 rounded-xl bg-white border border-[#E5E7EB]">
                <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Recent Reviews</h2>

                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="pb-6 border-b border-[#E5E7EB] last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-[#001F3F]">Excellent Work!</p>
                          <div className="flex gap-1 mt-1">
                            {[...Array(5)].map((_, j) => (
                              <span key={j} className="text-yellow-400">⭐</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-[#4A4A4A]">{3 - i} months ago</p>
                      </div>
                      <p className="text-[#4A4A4A] text-sm leading-relaxed">
                        John did an excellent job fixing our plumbing issues. He was professional, on time, and the work quality was outstanding. Highly recommended!
                      </p>
                      <p className="text-xs text-[#4A4A4A] mt-2">By ABC Services</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
                <h3 className="text-lg font-bold text-[#001F3F] mb-4">Contact & Hire</h3>

                <div className="space-y-3">
                  <Button fullWidth>Send Message</Button>
                  <Button fullWidth variant="secondary">Invite to Job</Button>
                  <Button fullWidth variant="secondary">Save Worker</Button>
                </div>

                <div className="mt-4 p-4 bg-[#FFF4E5] rounded-lg">
                  <p className="text-sm text-[#4A4A4A] mb-2">
                    <span className="font-semibold">Hourly Rate:</span>
                  </p>
                  <p className="text-2xl font-bold text-[#FF7A00]">₹800/hour</p>
                </div>
              </div>

              {/* Availability */}
              <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
                <h3 className="text-lg font-bold text-[#001F3F] mb-4">Availability</h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[#4A4A4A]">Status</p>
                    <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                      Available
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB]">
                    <p className="text-[#4A4A4A]">Last Active</p>
                    <p className="font-semibold text-[#001F3F]">2 hours ago</p>
                  </div>
                </div>
              </div>

              {/* Ratings Summary */}
              <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
                <h3 className="text-lg font-bold text-[#001F3F] mb-4">Ratings</h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-sm text-[#4A4A4A]">Quality of Work</p>
                      <p className="font-bold text-[#001F3F]">4.9/5</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#FF7A00] h-2 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-sm text-[#4A4A4A]">Communication</p>
                      <p className="font-bold text-[#001F3F]">4.8/5</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#FF7A00] h-2 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-sm text-[#4A4A4A]">Reliability</p>
                      <p className="font-bold text-[#001F3F]">5.0/5</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#FF7A00] h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Portfolio/Work History */}
              <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
                <h3 className="text-lg font-bold text-[#001F3F] mb-4">Stats</h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-[#4A4A4A]">Jobs Completed</p>
                    <p className="font-bold text-[#001F3F]">143</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[#4A4A4A]">Profile Views</p>
                    <p className="font-bold text-[#001F3F]">1,240</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[#4A4A4A]">Member Since</p>
                    <p className="font-bold text-[#001F3F]">Jan 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
