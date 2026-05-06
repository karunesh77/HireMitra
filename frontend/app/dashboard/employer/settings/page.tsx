import { Sidebar, Input, TextArea, Button } from '@/components';

export default function EmployerSettingsPage() {
  const sidebarLinks = [
    { href: '/dashboard/employer', label: 'Dashboard', icon: '📊' },
    { href: '/dashboard/employer/jobs', label: 'Jobs', icon: '💼' },
    { href: '/dashboard/employer/applications', label: 'Applications', icon: '📋' },
    { href: '/dashboard/employer/workers', label: 'Workers', icon: '👥' },
    { href: '/dashboard/employer/settings', label: 'Settings', icon: '⚙️' },
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
              <h1 className="text-4xl font-bold text-[#001F3F] mb-2">Settings</h1>
              <p className="text-[#4A4A4A]">Manage your account and company settings</p>
            </div>

            {/* Settings Sections */}
            <div className="space-y-8">
              {/* Account Settings */}
              <div className="bg-white rounded-lg p-8 border border-[#E5E7EB]">
                <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#001F3F] mb-2">Email Address</label>
                      <Input
                        placeholder="company@example.com"
                        type="email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#001F3F] mb-2">Phone Number</label>
                      <Input
                        placeholder="+1 (555) 123-4567"
                        type="tel"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#001F3F] mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#001F3F] mb-2">Current Password</label>
                        <Input placeholder="••••••••" type="password" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-[#001F3F] mb-2">New Password</label>
                          <Input placeholder="••••••••" type="password" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#001F3F] mb-2">Confirm Password</label>
                          <Input placeholder="••••••••" type="password" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Settings */}
              <div className="bg-white rounded-lg p-8 border border-[#E5E7EB]">
                <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Company Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Company Name</label>
                    <Input
                      placeholder="Your Company Name"
                      type="text"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Company Website</label>
                    <Input
                      placeholder="https://www.yourcompany.com"
                      type="url"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Company Description</label>
                    <TextArea
                      placeholder="Tell workers about your company..."
                      className="min-h-32"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#001F3F] mb-2">Location</label>
                      <Input
                        placeholder="City, State"
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#001F3F] mb-2">Industry</label>
                      <select className="w-full px-4 py-2 rounded-lg border border-[#E5E7EB] text-[#001F3F] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]">
                        <option>Select Industry</option>
                        <option>Construction</option>
                        <option>Manufacturing</option>
                        <option>Logistics</option>
                        <option>Maintenance</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="bg-white rounded-lg p-8 border border-[#E5E7EB]">
                <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#001F3F]">Email Notifications</h3>
                      <p className="text-sm text-[#4A4A4A]">Receive emails about applications and messages</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 accent-[#FF7A00] rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#001F3F]">New Applications</h3>
                      <p className="text-sm text-[#4A4A4A]">Get notified when workers apply to your jobs</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 accent-[#FF7A00] rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#001F3F]">Payment Notifications</h3>
                      <p className="text-sm text-[#4A4A4A]">Get notified about payment updates</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 accent-[#FF7A00] rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#001F3F]">Marketing Updates</h3>
                      <p className="text-sm text-[#4A4A4A]">Receive news about new features and promotions</p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-[#FF7A00] rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Billing & Payment */}
              <div className="bg-white rounded-lg p-8 border border-[#E5E7EB]">
                <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Billing & Payment</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#001F3F]">Payment Method</h3>
                      <p className="text-sm text-[#4A4A4A]">Visa ending in 4242</p>
                    </div>
                    <button className="px-4 py-2 text-[#FF7A00] border border-[#FF7A00] rounded-lg hover:bg-[#FFF4E5] transition font-medium">
                      Update
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#001F3F]">Billing Address</h3>
                      <p className="text-sm text-[#4A4A4A]">123 Business St, New York, NY 10001</p>
                    </div>
                    <button className="px-4 py-2 text-[#FF7A00] border border-[#FF7A00] rounded-lg hover:bg-[#FFF4E5] transition font-medium">
                      Update
                    </button>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-red-50 rounded-lg p-8 border border-red-200">
                <h2 className="text-2xl font-bold text-red-600 mb-6">Danger Zone</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-red-200">
                    <div>
                      <h3 className="font-semibold text-[#001F3F]">Suspend Account</h3>
                      <p className="text-sm text-[#4A4A4A]">Temporarily suspend your account</p>
                    </div>
                    <button className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition font-medium">
                      Suspend
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-red-200">
                    <div>
                      <h3 className="font-semibold text-[#001F3F]">Delete Account</h3>
                      <p className="text-sm text-[#4A4A4A]">Permanently delete your account and all data</p>
                    </div>
                    <button className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition font-medium">
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex gap-4">
                <Button size="lg">Save Changes</Button>
                <button className="px-8 py-3 rounded-lg border-2 border-[#E5E7EB] text-[#4A4A4A] hover:bg-gray-50 transition font-medium">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
