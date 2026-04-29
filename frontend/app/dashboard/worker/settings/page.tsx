'use client';

import { useState } from 'react';
import { Sidebar, Input, TextArea, Button } from '@/components';

export default function WorkerSettingsPage() {
  const sidebarLinks = [
    { href: '/dashboard/worker', label: 'Dashboard', icon: '📊' },
    { href: '/dashboard/worker/jobs', label: 'Browse Jobs', icon: '💼' },
    { href: '/dashboard/worker/applications', label: 'Applications', icon: '📋' },
    { href: '/dashboard/worker/saved-jobs', label: 'Saved Jobs', icon: '⭐' },
    { href: '/dashboard/worker/settings', label: 'Settings', icon: '⚙️' },
  ];

  const [settings, setSettings] = useState({
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: true,
    jobRecommendations: true,
    marketingUpdates: false,
    smsNotifications: false,
    profileVisibility: true,
    showPhoneNumber: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Add API call to save settings
    console.log('Settings to save:', settings);
    setIsLoading(false);
  };

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
              <p className="text-[#4A4A4A]">Manage your account and preferences</p>
            </div>

            {/* Settings Sections */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Account Settings */}
              <div className="bg-white rounded-lg p-8 border border-[#E5E7EB]">
                <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#001F3F] mb-2">Email Address</label>
                      <Input
                        placeholder="you@example.com"
                        type="email"
                        name="email"
                        value={settings.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#001F3F] mb-2">Phone Number</label>
                      <Input
                        placeholder="+1 (555) 123-4567"
                        type="tel"
                        name="phone"
                        value={settings.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#001F3F] mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#001F3F] mb-2">Current Password</label>
                        <Input
                          placeholder="••••••••"
                          type="password"
                          name="currentPassword"
                          value={settings.currentPassword}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-[#001F3F] mb-2">New Password</label>
                          <Input
                            placeholder="••••••••"
                            type="password"
                            name="newPassword"
                            value={settings.newPassword}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#001F3F] mb-2">Confirm Password</label>
                          <Input
                            placeholder="••••••••"
                            type="password"
                            name="confirmPassword"
                            value={settings.confirmPassword}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
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
                      name="emailNotifications"
                      checked={settings.emailNotifications}
                      onChange={handleChange}
                      className="w-5 h-5 accent-[#FF7A00] rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#001F3F]">Job Recommendations</h3>
                      <p className="text-sm text-[#4A4A4A]">Get notified about jobs matching your skills</p>
                    </div>
                    <input
                      type="checkbox"
                      name="jobRecommendations"
                      checked={settings.jobRecommendations}
                      onChange={handleChange}
                      className="w-5 h-5 accent-[#FF7A00] rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#001F3F]">Marketing Updates</h3>
                      <p className="text-sm text-[#4A4A4A]">Receive news about new features and promotions</p>
                    </div>
                    <input
                      type="checkbox"
                      name="marketingUpdates"
                      checked={settings.marketingUpdates}
                      onChange={handleChange}
                      className="w-5 h-5 accent-[#FF7A00] rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#001F3F]">SMS Notifications</h3>
                      <p className="text-sm text-[#4A4A4A]">Receive text messages for urgent updates</p>
                    </div>
                    <input
                      type="checkbox"
                      name="smsNotifications"
                      checked={settings.smsNotifications}
                      onChange={handleChange}
                      className="w-5 h-5 accent-[#FF7A00] rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="bg-white rounded-lg p-8 border border-[#E5E7EB]">
                <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Privacy Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#001F3F]">Profile Visibility</h3>
                      <p className="text-sm text-[#4A4A4A]">Show profile to employers</p>
                    </div>
                    <input
                      type="checkbox"
                      name="profileVisibility"
                      checked={settings.profileVisibility}
                      onChange={handleChange}
                      className="w-5 h-5 accent-[#FF7A00] rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#001F3F]">Show Phone Number</h3>
                      <p className="text-sm text-[#4A4A4A]">Allow employers to see your phone number</p>
                    </div>
                    <input
                      type="checkbox"
                      name="showPhoneNumber"
                      checked={settings.showPhoneNumber}
                      onChange={handleChange}
                      className="w-5 h-5 accent-[#FF7A00] rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-red-50 rounded-lg p-8 border border-red-200">
                <h2 className="text-2xl font-bold text-red-600 mb-6">Danger Zone</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-red-200">
                    <div>
                      <h3 className="font-semibold text-[#001F3F]">Deactivate Account</h3>
                      <p className="text-sm text-[#4A4A4A]">Temporarily deactivate your account</p>
                    </div>
                    <button className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition font-medium">
                      Deactivate
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
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  loading={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
                <button
                  type="button"
                  className="px-8 py-3 rounded-lg border-2 border-[#E5E7EB] text-[#4A4A4A] hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
