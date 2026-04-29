import { Sidebar, Button } from '@/components';
import Link from 'next/link';

export default function EmployerSavedWorkersPage() {
  const sidebarLinks = [
    { href: '/dashboard/employer', label: 'Dashboard', icon: '📊' },
    { href: '/dashboard/employer/jobs', label: 'Jobs', icon: '💼' },
    { href: '/dashboard/employer/applications', label: 'Applications', icon: '📋' },
    { href: '/dashboard/employer/workers', label: 'Workers', icon: '👥' },
    { href: '/dashboard/employer/saved-workers', label: 'Saved Workers', icon: '⭐' },
  ];

  const savedWorkers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      skill: 'Electrician',
      location: 'New York, NY',
      rating: 4.8,
      reviews: 45,
      hourlyRate: '$45/hour',
      availability: 'Available Now',
      savedDate: '3 days ago',
      image: '👨‍🔧'
    },
    {
      id: 2,
      name: 'Priya Singh',
      skill: 'Plumber',
      location: 'Brooklyn, NY',
      rating: 4.9,
      reviews: 67,
      hourlyRate: '$50/hour',
      availability: 'Available Now',
      savedDate: '1 week ago',
      image: '👩‍🔧'
    },
    {
      id: 3,
      name: 'Vikram Patel',
      skill: 'Painter',
      location: 'Queens, NY',
      rating: 4.6,
      reviews: 32,
      hourlyRate: '$40/hour',
      availability: 'Available in 2 days',
      savedDate: '2 weeks ago',
      image: '👨‍🎨'
    },
    {
      id: 4,
      name: 'Anjali Verma',
      skill: 'Carpenter',
      location: 'Manhattan, NY',
      rating: 4.7,
      reviews: 54,
      hourlyRate: '$55/hour',
      availability: 'Available Now',
      savedDate: '3 weeks ago',
      image: '👩‍🔨'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex gap-4">
        {/* Sidebar */}
        <Sidebar links={sidebarLinks} title="Dashboard" />

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-[#001F3F] mb-2">Saved Workers</h1>
                <p className="text-[#4A4A4A]">Workers you've bookmarked for future jobs</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#FF7A00]">{savedWorkers.length}</p>
                <p className="text-sm text-[#4A4A4A]">Total Saved</p>
              </div>
            </div>

            {/* Saved Workers Grid */}
            {savedWorkers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedWorkers.map((worker) => (
                  <div key={worker.id} className="bg-white rounded-lg border border-[#E5E7EB] p-6 hover:shadow-md transition">
                    <div className="flex gap-4 items-start justify-between mb-4">
                      <div className="flex gap-4 items-start">
                        <div className="text-5xl">{worker.image}</div>
                        <div>
                          <h3 className="text-lg font-bold text-[#001F3F]">{worker.name}</h3>
                          <p className="text-sm text-[#4A4A4A] mb-2">{worker.skill}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-400">⭐</span>
                            <span className="font-semibold text-[#001F3F]">{worker.rating}</span>
                            <span className="text-xs text-[#4A4A4A]">({worker.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                      <button className="text-2xl hover:text-red-500 transition">❤️</button>
                    </div>

                    <div className="space-y-2 mb-4 pb-4 border-b border-[#E5E7EB]">
                      <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                        📍 {worker.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                        💰 {worker.hourlyRate}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-green-600">✓</span>
                        <span className="text-green-600">{worker.availability}</span>
                      </div>
                      <div className="text-xs text-[#4A4A4A]">Saved {worker.savedDate}</div>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/dashboard/employer/workers/${worker.id}`} className="flex-1">
                        <Button fullWidth size="lg">View Profile</Button>
                      </Link>
                      <button className="px-4 py-2 rounded-lg border-2 border-[#E5E7EB] text-[#4A4A4A] hover:bg-gray-50 transition font-medium">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">👥</div>
                <h3 className="text-xl font-semibold text-[#001F3F] mb-2">No Saved Workers Yet</h3>
                <p className="text-[#4A4A4A] mb-6">Start saving workers to contact them for future jobs</p>
                <Link href="/dashboard/employer/workers">
                  <Button size="lg">Browse Workers</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
