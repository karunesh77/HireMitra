'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/LoadingSpinner';

const SKILLS = [
  'plumbing',
  'electrical',
  'carpentry',
  'hvac',
  'roofing',
  'painting',
  'landscaping',
  'heavy_equipment',
  'welding',
  'driving',
  'other'
];

export default function CreateJobPage() {
  const router = useRouter();
  const { user, isAuth, isLoading } = useAuth();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    paymentType: 'hourly',
    salary: '',
    startDate: '',
    duration: 'one-time',
    positions: 1,
    yearsOfExperience: 0,
    isUrgent: false,
    location: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      latitude: '',
      longitude: ''
    }
  });

  useEffect(() => {
    if (isLoading) return;

    if (!isAuth || user?.userType !== 'employer') {
      router.push('/auth/login');
    }
  }, [isAuth, isLoading, user, router]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      location: { ...prev.location, [name]: value }
    }));
  };

  const handleSkillToggle = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const getGeolocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData((prev) => ({
          ...prev,
          location: {
            ...prev.location,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          }
        }));
        alert('Location set to your current position');
      }, (error) => {
        alert('Could not get location: ' + error.message);
      });
    } else {
      alert('Geolocation not supported in your browser');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.title || !formData.description || !selectedSkills.length) {
      setError('Title, description, and at least one skill are required');
      return;
    }

    if (!formData.location.city || !formData.location.state) {
      setError('City and state are required');
      return;
    }

    if (!formData.location.latitude || !formData.location.longitude) {
      setError('Please set your location (get current location or enter coordinates)');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...formData,
        requiredSkills: selectedSkills,
        salary: parseInt(formData.salary),
        yearsOfExperience: parseInt(formData.yearsOfExperience),
        positions: parseInt(formData.positions),
        location: {
          ...formData.location,
          latitude: parseFloat(formData.location.latitude),
          longitude: parseFloat(formData.location.longitude)
        }
      };

      const response = await api.post('/jobs', payload);
      alert('Job posted successfully!');
      router.push(`/jobs/${response.data.job._id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner fullScreen />;

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Post a New Job</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card max-w-2xl">
        {/* Basic Info */}
        <fieldset className="mb-8 pb-8 border-b">
          <h2 className="text-xl font-bold mb-4">Job Details</h2>

          <div className="mb-4">
            <label className="label">Job Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input"
              placeholder="e.g., Emergency Plumbing Repair"
              required
            />
          </div>

          <div className="mb-4">
            <label className="label">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input"
              rows="6"
              placeholder="Detailed description of the job..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label">Payment Type *</label>
              <select
                name="paymentType"
                value={formData.paymentType}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="hourly">Hourly Rate</option>
                <option value="fixed">Fixed Price</option>
                <option value="daily">Daily Rate</option>
              </select>
            </div>

            <div>
              <label className="label">Salary/Rate ($) *</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="input"
                min="0"
                step="0.01"
                placeholder="0.00"
                required
              />
            </div>
          </div>
        </fieldset>

        {/* Location */}
        <fieldset className="mb-8 pb-8 border-b">
          <h2 className="text-xl font-bold mb-4">Location</h2>

          <button
            type="button"
            onClick={getGeolocation}
            className="btn-secondary btn-small mb-4"
          >
            📍 Use Current Location
          </button>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label">Address</label>
              <input
                type="text"
                name="address"
                value={formData.location.address}
                onChange={handleLocationChange}
                className="input"
                placeholder="123 Main St"
              />
            </div>

            <div>
              <label className="label">City *</label>
              <input
                type="text"
                name="city"
                value={formData.location.city}
                onChange={handleLocationChange}
                className="input"
                placeholder="New York"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label">State *</label>
              <input
                type="text"
                name="state"
                value={formData.location.state}
                onChange={handleLocationChange}
                className="input"
                placeholder="NY"
                required
              />
            </div>

            <div>
              <label className="label">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.location.zipCode}
                onChange={handleLocationChange}
                className="input"
                placeholder="10001"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label">Latitude *</label>
              <input
                type="number"
                name="latitude"
                value={formData.location.latitude}
                onChange={handleLocationChange}
                className="input"
                step="0.0001"
                placeholder="40.7128"
                required
              />
            </div>

            <div>
              <label className="label">Longitude *</label>
              <input
                type="number"
                name="longitude"
                value={formData.location.longitude}
                onChange={handleLocationChange}
                className="input"
                step="0.0001"
                placeholder="-74.0060"
                required
              />
            </div>
          </div>
        </fieldset>

        {/* Requirements */}
        <fieldset className="mb-8 pb-8 border-b">
          <h2 className="text-xl font-bold mb-4">Requirements</h2>

          <div className="mb-4">
            <label className="label">Required Skills * (Select at least 1)</label>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleSkillToggle(skill)}
                  className={`text-sm px-3 py-1 rounded font-medium transition-colors ${
                    selectedSkills.includes(skill)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {skill.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label">Years of Experience Required</label>
            <input
              type="number"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              className="input"
              min="0"
              placeholder="0"
            />
          </div>
        </fieldset>

        {/* Job Details */}
        <fieldset className="mb-8 pb-8 border-b">
          <h2 className="text-xl font-bold mb-4">Job Details</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label">Duration</label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="input"
              >
                <option value="one-time">One-Time</option>
                <option value="temporary">Temporary</option>
                <option value="permanent">Permanent</option>
              </select>
            </div>

            <div>
              <label className="label">Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label">Number of Positions</label>
              <input
                type="number"
                name="positions"
                value={formData.positions}
                onChange={handleChange}
                className="input"
                min="1"
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isUrgent"
                  checked={formData.isUrgent}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="font-medium">Mark as Urgent</span>
              </label>
            </div>
          </div>
        </fieldset>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex-1 disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post Job'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
