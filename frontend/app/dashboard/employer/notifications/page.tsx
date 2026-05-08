'use client';

import { useState, useEffect } from 'react';
import { Navbar, Button } from '@/components';
import { Breadcrumbs } from '@/components';
import Link from 'next/link';
import apiClient from '@/lib/api';

interface Notification {
  _id: string;
  type: string;
  title: string;
  body: string;
  fromUserName?: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

export default function EmployerNotifications() {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard/employer' },
    { label: 'Notifications' }
  ];

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.get('/api/notifications?limit=50');
      setNotifications(res.data.notifications || []);
      setUnreadCount(res.data.unreadCount || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await apiClient.patch('/api/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch {}
  };

  const handleMarkRead = async (id: string) => {
    try {
      await apiClient.patch(`/api/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch {}
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/api/notifications/${id}`);
      setNotifications(prev => prev.filter(n => n._id !== id));
    } catch {}
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'message': return '💬';
      case 'profile_view': return '👀';
      case 'application_status': return '📋';
      case 'new_application': return '📩';
      case 'job_match': return '🎯';
      default: return '🔔';
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'message': return 'bg-blue-100';
      case 'profile_view': return 'bg-purple-100';
      case 'application_status': return 'bg-green-100';
      case 'new_application': return 'bg-orange-100';
      default: return 'bg-gray-100';
    }
  };

  const formatTime = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-[#001F3F] mb-2">Notifications</h1>
              <p className="text-[#4A4A4A]">
                {unreadCount > 0
                  ? <span><span className="font-bold text-[#FF7A00]">{unreadCount}</span> unread</span>
                  : 'All caught up! ✅'}
              </p>
            </div>
            {unreadCount > 0 && (
              <Button variant="secondary" size="sm" onClick={handleMarkAllRead}>
                ✓ Mark all read
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="p-4 rounded-xl border border-[#E5E7EB] bg-white animate-pulse">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                      <div className="h-3 bg-gray-100 rounded w-2/3" />
                      <div className="h-3 bg-gray-100 rounded w-1/4 mt-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-12 text-center bg-white border border-[#E5E7EB] rounded-xl">
              <p className="text-5xl mb-4">🔔</p>
              <p className="text-lg font-semibold text-[#001F3F]">No notifications yet</p>
              <p className="text-sm text-[#4A4A4A] mt-2">When workers message you or apply to your jobs, you'll see it here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif._id}
                  className={`p-4 rounded-xl border transition ${
                    notif.read
                      ? 'bg-white border-[#E5E7EB]'
                      : 'bg-[#FFF4E5] border-l-4 border-l-[#FF7A00] border-[#FFE0B2]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full ${getIconBg(notif.type)} flex items-center justify-center text-xl flex-shrink-0`}>
                      {getIcon(notif.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className={`text-[#001F3F] ${!notif.read ? 'font-bold' : 'font-semibold'}`}>
                            {notif.title}
                            {!notif.read && (
                              <span className="ml-2 inline-block w-2 h-2 bg-[#FF7A00] rounded-full align-middle"></span>
                            )}
                          </p>
                          <p className="text-sm text-[#4A4A4A] mt-1 leading-relaxed">{notif.body}</p>
                        </div>
                        <span className="text-xs text-[#4A4A4A] whitespace-nowrap flex-shrink-0">
                          {formatTime(notif.createdAt)}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mt-3">
                        {notif.link && (
                          <Link href={notif.link} onClick={() => !notif.read && handleMarkRead(notif._id)}>
                            <Button size="sm" variant="secondary">View →</Button>
                          </Link>
                        )}
                        {!notif.read && (
                          <button
                            onClick={() => handleMarkRead(notif._id)}
                            className="text-xs text-[#FF7A00] hover:underline font-medium"
                          >
                            Mark read
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notif._id)}
                          className="text-xs text-red-400 hover:text-red-600 hover:underline ml-auto"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
