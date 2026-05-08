'use client';

import { useState, useEffect } from 'react';
import { Navbar, Input, Button, LoadingSpinner } from '@/components';
import { Breadcrumbs } from '@/components';
import apiClient from '@/lib/api';

export default function EmployerSettingsPage() {
  const [profile, setProfile] = useState({ email: '', phone: '', companyName: '', website: '', companyDescription: '', location: '', industry: '' });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    messageAlerts: true,
    applicationUpdates: true,
    jobRecommendations: true,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [savingNotifications, setSavingNotifications] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard/employer' },
    { label: 'Settings' },
  ];

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const res = await apiClient.get('/api/profile');
        const user = res.data.user || {};
        setProfile({
          email: user.email || '',
          phone: user.phone || '',
          companyName: user.companyName || '',
          website: user.website || '',
          companyDescription: user.companyDescription || '',
          location: user.location || '',
          industry: user.industry || '',
        });
        if (user.notificationPreferences) {
          setNotifications({
            emailNotifications: user.notificationPreferences.emailNotifications ?? true,
            messageAlerts: user.notificationPreferences.messageAlerts ?? true,
            applicationUpdates: user.notificationPreferences.applicationUpdates ?? true,
            jobRecommendations: user.notificationPreferences.jobRecommendations ?? true,
          });
        }
      } catch (err) {
        console.error('Fetch settings error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    try {
      const { email, ...updateData } = profile;
      await apiClient.patch('/api/profile', updateData);
      showMessage('success', 'Company settings updated successfully');
    } catch (err: any) {
      showMessage('error', err.response?.data?.error || 'Failed to update settings');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    if (!passwords.currentPassword || !passwords.newPassword) {
      showMessage('error', 'Please fill all password fields');
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      showMessage('error', 'New passwords do not match');
      return;
    }
    if (passwords.newPassword.length < 6) {
      showMessage('error', 'Password must be at least 6 characters');
      return;
    }

    setSavingPassword(true);
    try {
      await apiClient.patch('/api/auth/change-password', {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      showMessage('success', 'Password changed successfully');
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      showMessage('error', err.response?.data?.error || 'Failed to change password');
    } finally {
      setSavingPassword(false);
    }
  };

  const handleSaveNotifications = async () => {
    setSavingNotifications(true);
    try {
      await apiClient.patch('/api/profile', { notificationPreferences: notifications });
      showMessage('success', 'Notification preferences saved');
    } catch (err: any) {
      showMessage('error', err.response?.data?.error || 'Failed to save preferences');
    } finally {
      setSavingNotifications(false);
    }
  };

  const handleNotifChange = (key: string) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-20 flex justify-center items-center h-[60vh]"><LoadingSpinner /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001F3F] mb-2">Settings</h1>
            <p className="text-[#4A4A4A]">Manage your account and company settings</p>
          </div>

          {/* Message Banner */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${
              message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          <div className="space-y-8 pb-12">

            {/* Account Settings */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E5E7EB]">
              <h2 className="text-xl font-bold text-[#001F3F] mb-6">Account Settings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Email Address</label>
                  <Input type="email" value={profile.email} disabled placeholder="Email" />
                  <p className="text-xs text-[#4A4A4A] mt-1">Email cannot be changed</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Phone Number</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    placeholder="Phone number"
                  />
                </div>
              </div>
            </div>

            {/* Company Settings */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E5E7EB]">
              <h2 className="text-xl font-bold text-[#001F3F] mb-6">Company Settings</h2>
              <div className="space-y-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Company Name</label>
                  <Input type="text" name="companyName" value={profile.companyName} onChange={handleProfileChange} placeholder="Your Company Name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Company Website</label>
                  <Input type="url" name="website" value={profile.website} onChange={handleProfileChange} placeholder="https://www.yourcompany.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Company Description</label>
                  <textarea
                    name="companyDescription"
                    value={profile.companyDescription}
                    onChange={handleProfileChange}
                    placeholder="Tell workers about your company..."
                    className="w-full px-4 py-3 rounded-lg bg-white border border-[#E5E7EB] text-[#001F3F] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent min-h-[120px]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Location</label>
                    <Input type="text" name="location" value={profile.location} onChange={handleProfileChange} placeholder="City, State" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Industry</label>
                    <select
                      name="industry"
                      value={profile.industry}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-[#001F3F] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]"
                    >
                      <option value="">Select Industry</option>
                      <option value="construction">Construction</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="logistics">Logistics</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="hospitality">Hospitality</option>
                      <option value="retail">Retail</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              <Button size="sm" onClick={handleSaveProfile} disabled={savingProfile}>
                {savingProfile ? 'Saving...' : 'Save Company Settings'}
              </Button>
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E5E7EB]">
              <h2 className="text-xl font-bold text-[#001F3F] mb-6">Change Password</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Current Password</label>
                  <Input
                    type="password"
                    placeholder="Enter current password"
                    value={passwords.currentPassword}
                    onChange={(e) => setPasswords(prev => ({ ...prev, currentPassword: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">New Password</label>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      value={passwords.newPassword}
                      onChange={(e) => setPasswords(prev => ({ ...prev, newPassword: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Confirm Password</label>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      value={passwords.confirmPassword}
                      onChange={(e) => setPasswords(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
              <Button size="sm" onClick={handleChangePassword} disabled={savingPassword}>
                {savingPassword ? 'Changing...' : 'Change Password'}
              </Button>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E5E7EB]">
              <h2 className="text-xl font-bold text-[#001F3F] mb-6">Notification Preferences</h2>
              <div className="space-y-3 mb-6">
                {[
                  { key: 'emailNotifications', title: 'Email Notifications', desc: 'Receive emails about applications and messages' },
                  { key: 'messageAlerts', title: 'Message Alerts', desc: 'Get notified when workers send messages' },
                  { key: 'applicationUpdates', title: 'New Applications', desc: 'Get notified when workers apply to your jobs' },
                  { key: 'jobRecommendations', title: 'Worker Recommendations', desc: 'Get notified about new workers matching your needs' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#001F3F] text-sm sm:text-base">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-[#4A4A4A]">{item.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications[item.key as keyof typeof notifications]}
                      onChange={() => handleNotifChange(item.key)}
                      className="w-5 h-5 accent-[#FF7A00] rounded cursor-pointer flex-shrink-0 ml-4"
                    />
                  </div>
                ))}
              </div>
              <Button size="sm" onClick={handleSaveNotifications} disabled={savingNotifications}>
                {savingNotifications ? 'Saving...' : 'Save Preferences'}
              </Button>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 rounded-xl p-6 sm:p-8 border border-red-200">
              <h2 className="text-xl font-bold text-red-600 mb-6">Danger Zone</h2>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg border border-red-200 gap-3">
                  <div>
                    <h3 className="font-semibold text-[#001F3F]">Suspend Account</h3>
                    <p className="text-sm text-[#4A4A4A]">Temporarily suspend your account</p>
                  </div>
                  <button className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition font-medium text-sm whitespace-nowrap">
                    Suspend
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg border border-red-200 gap-3">
                  <div>
                    <h3 className="font-semibold text-[#001F3F]">Delete Account</h3>
                    <p className="text-sm text-[#4A4A4A]">Permanently delete your account and all data</p>
                  </div>
                  <button className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition font-medium text-sm whitespace-nowrap">
                    Delete
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
