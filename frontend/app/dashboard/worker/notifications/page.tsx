import { Sidebar, Tabs } from '@/components';

export default function WorkerNotificationsPage() {
  const sidebarLinks = [
    { href: '/dashboard/worker', label: 'Dashboard', icon: '📊' },
    { href: '/dashboard/worker/jobs', label: 'Browse Jobs', icon: '💼' },
    { href: '/dashboard/worker/applications', label: 'Applications', icon: '📋' },
    { href: '/dashboard/worker/saved-jobs', label: 'Saved Jobs', icon: '⭐' },
    { href: '/dashboard/worker/notifications', label: 'Notifications', icon: '🔔' },
  ];

  const notificationTabs = ['All', 'Applications', 'Messages', 'Jobs', 'System'];

  const notifications = [
    {
      id: 1,
      type: 'application',
      title: 'Application Accepted!',
      message: 'Your application for "Electrical Repair" has been accepted by Ace Construction',
      timestamp: '2 hours ago',
      read: false,
      icon: '✅'
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message from John Doe',
      message: 'Hi, I wanted to ask about your availability for the weekend job...',
      timestamp: '4 hours ago',
      read: false,
      icon: '💬'
    },
    {
      id: 3,
      type: 'job',
      title: 'New Job Match: Plumbing Work',
      message: 'A new job that matches your skills has been posted nearby',
      timestamp: '6 hours ago',
      read: true,
      icon: '🔧'
    },
    {
      id: 4,
      type: 'application',
      title: 'Application Rejected',
      message: 'Your application for "Carpentry Work" was not selected at this time',
      timestamp: '1 day ago',
      read: true,
      icon: '❌'
    },
    {
      id: 5,
      type: 'system',
      title: 'Profile Verification Complete',
      message: 'Your profile has been verified and is now fully active',
      timestamp: '2 days ago',
      read: true,
      icon: '📋'
    },
    {
      id: 6,
      type: 'job',
      title: 'Job Expiring Soon',
      message: 'The "Electrical Installation" job posting will expire in 2 days',
      timestamp: '3 days ago',
      read: true,
      icon: '⏰'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex gap-4">
        {/* Sidebar */}
        <Sidebar links={sidebarLinks} title="Dashboard" />

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-[#001F3F] mb-2">Notifications</h1>
              <p className="text-[#4A4A4A]">Stay updated with your applications and messages</p>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b border-[#E5E7EB]">
              <div className="flex gap-8">
                {notificationTabs.map((tab) => (
                  <button
                    key={tab}
                    className={`pb-3 font-medium transition ${
                      tab === 'All'
                        ? 'border-b-2 border-[#FF7A00] text-[#FF7A00]'
                        : 'text-[#4A4A4A] hover:text-[#001F3F]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 rounded-lg border transition ${
                    notification.read
                      ? 'bg-white border-[#E5E7EB]'
                      : 'bg-[#FFF4E5] border-[#FFE0B2]'
                  } hover:shadow-md cursor-pointer`}
                >
                  <div className="flex gap-4 items-start">
                    <div className="text-3xl flex-shrink-0">{notification.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex gap-2 items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-[#001F3F] mb-1">
                            {notification.title}
                          </h3>
                          <p className="text-[#4A4A4A] text-sm">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-3 h-3 bg-[#FF7A00] rounded-full flex-shrink-0 mt-1"></div>
                        )}
                      </div>
                      <p className="text-xs text-[#4A4A4A] mt-2">{notification.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {notifications.length === 0 && (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🔔</div>
                <h3 className="text-xl font-semibold text-[#001F3F] mb-2">
                  No Notifications
                </h3>
                <p className="text-[#4A4A4A]">
                  You're all caught up! Check back later for updates
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
