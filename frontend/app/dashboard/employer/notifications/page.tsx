import { Sidebar, Tabs } from '@/components';

export default function EmployerNotificationsPage() {
  const sidebarLinks = [
    { href: '/dashboard/employer', label: 'Dashboard', icon: '📊' },
    { href: '/dashboard/employer/jobs', label: 'Jobs', icon: '💼' },
    { href: '/dashboard/employer/applications', label: 'Applications', icon: '📋' },
    { href: '/dashboard/employer/workers', label: 'Workers', icon: '👥' },
    { href: '/dashboard/employer/notifications', label: 'Notifications', icon: '🔔' },
  ];

  const notificationTabs = ['All', 'Applications', 'Jobs', 'Messages', 'System'];

  const notifications = [
    {
      id: 1,
      type: 'application',
      title: 'New Application Received',
      message: 'Rajesh Kumar applied for "Electrical Repair Work" job',
      timestamp: '1 hour ago',
      read: false,
      icon: '📝'
    },
    {
      id: 2,
      type: 'job',
      title: 'Job Posted Successfully',
      message: 'Your job "Plumbing Installation" is now live and receiving applications',
      timestamp: '3 hours ago',
      read: false,
      icon: '✅'
    },
    {
      id: 3,
      type: 'application',
      title: 'Worker Accepted Your Offer',
      message: 'Priya Singh has accepted your job offer for "Interior Painting"',
      timestamp: '6 hours ago',
      read: true,
      icon: '🎉'
    },
    {
      id: 4,
      type: 'message',
      title: 'New Message from Vikram Patel',
      message: 'Hi, I have a question about the work location and timing...',
      timestamp: '1 day ago',
      read: true,
      icon: '💬'
    },
    {
      id: 5,
      type: 'job',
      title: 'Job Approaching Deadline',
      message: 'Your job "Carpentry Work" posting expires in 3 days',
      timestamp: '2 days ago',
      read: true,
      icon: '⏰'
    },
    {
      id: 6,
      type: 'system',
      title: 'Payment Received',
      message: 'Payment of $450 has been credited to your account for completed work',
      timestamp: '3 days ago',
      read: true,
      icon: '💰'
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
              <p className="text-[#4A4A4A]">Stay updated with your jobs and applications</p>
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
