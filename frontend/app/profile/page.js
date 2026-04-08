'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, isAuth, isLoading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isLoading) return;

    if (!isAuth) {
      router.push('/auth/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await api.get(`/users/${user.id}`);
        setProfile(response.data.user);
        setFormData(response.data.user);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuth, isLoading, user, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await api.put(`/users/${user.id}`, formData);
      setProfile(response.data.user);
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update profile');
    }
  };

  if (isLoading || loading) return <LoadingSpinner fullScreen />;

  if (!profile) {
    return (
      <div className="container py-12">
        <div className="card text-center">
          <p className="text-gray-600">Profile not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left - Basic Info */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Profile Information</h2>
              <button
                onClick={() => (editing ? handleSave() : setEditing(true))}
                className={editing ? 'btn-primary' : 'btn-secondary'}
              >
                {editing ? 'Save' : 'Edit'}
              </button>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="label">Name</label>
                {editing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    className="input"
                  />
                ) : (
                  <p className="text-gray-700 font-medium">{profile.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="label">Email</label>
                <p className="text-gray-700">{profile.email}</p>
              </div>

              {/* Phone */}
              <div>
                <label className="label">Phone</label>
                <p className="text-gray-700">{profile.phone}</p>
              </div>

              {/* Bio */}
              <div>
                <label className="label">Bio</label>
                {editing ? (
                  <textarea
                    name="bio"
                    value={formData.bio || ''}
                    onChange={handleChange}
                    className="input"
                    rows="4"
                  />
                ) : (
                  <p className="text-gray-700">{profile.bio || 'No bio added'}</p>
                )}
              </div>

              {/* Worker-specific fields */}
              {profile.userType === 'worker' && (
                <>
                  <div>
                    <label className="label">Hourly Rate</label>
                    {editing ? (
                      <input
                        type="number"
                        name="hourlyRate"
                        value={formData.hourlyRate || ''}
                        onChange={handleChange}
                        className="input"
                      />
                    ) : (
                      <p className="text-gray-700">${profile.hourlyRate || 'Not set'}</p>
                    )}
                  </div>

                  <div>
                    <label className="label">Skills</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profile.skills?.map((skill) => (
                        <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
                          {skill}
                        </span>
                      )) || <p className="text-gray-500">No skills added</p>}
                    </div>
                  </div>
                </>
              )}

              {/* Employer-specific fields */}
              {profile.userType === 'employer' && (
                <div>
                  <label className="label">Company Name</label>
                  {editing ? (
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName || ''}
                      onChange={handleChange}
                      className="input"
                    />
                  ) : (
                    <p className="text-gray-700">{profile.companyName || 'No company name'}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right - Stats */}
        <div>
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Stats</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 text-sm">Rating</p>
                <p className="text-2xl font-bold">
                  ⭐ {profile.rating?.average?.toFixed(1) || 'No rating'}
                </p>
                <p className="text-gray-500 text-xs">({profile.rating?.count || 0} reviews)</p>
              </div>

              <div>
                <p className="text-gray-600 text-sm">Account Type</p>
                <p className="font-bold capitalize">{profile.userType}</p>
              </div>

              <div>
                <p className="text-gray-600 text-sm">Member Since</p>
                <p className="font-bold">{new Date(profile.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
