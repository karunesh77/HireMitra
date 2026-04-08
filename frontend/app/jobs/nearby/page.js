'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import JobCard from '@/components/JobCard';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function NearbyJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(25);
  const [skills, setSkills] = useState('');

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if ('geolocation' in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          fetchNearbyJobs(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setError('Could not get your location: ' + error.message);
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation not supported in your browser');
      setLoading(false);
    }
  };

  const fetchNearbyJobs = async (lat, lon, radiusKm = radius) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('latitude', lat);
      params.append('longitude', lon);
      params.append('radiusKm', radiusKm);
      if (skills) params.append('skills', skills);

      const response = await api.get(`/jobs/nearby?${params.toString()}`);
      setJobs(response.data.jobs);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch nearby jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (location) {
      fetchNearbyJobs(location.latitude, location.longitude);
    }
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-8">Jobs Near You</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Location Info */}
      {location && (
        <div className="card mb-6 bg-blue-50 border border-blue-200">
          <p className="text-blue-800">
            📍 Current location: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </p>
          <button
            onClick={getLocation}
            className="btn-secondary btn-small mt-2"
          >
            🔄 Refresh Location
          </button>
        </div>
      )}

      {/* Search Filters */}
      <form onSubmit={handleSearch} className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Filters</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="label">Search Radius (km)</label>
            <select
              value={radius}
              onChange={(e) => setRadius(parseInt(e.target.value))}
              className="input"
            >
              <option value={5}>5 km</option>
              <option value={10}>10 km</option>
              <option value={25}>25 km</option>
              <option value={50}>50 km</option>
              <option value={100}>100 km</option>
            </select>
          </div>

          <div>
            <label className="label">Skill (Optional)</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="input"
              placeholder="e.g., plumbing"
            />
          </div>

          <div className="flex items-end">
            <button type="submit" className="btn-primary w-full">
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Loading */}
      {loading && <LoadingSpinner />}

      {/* Jobs Grid */}
      {!loading && (
        <>
          {jobs.length > 0 ? (
            <>
              <p className="text-gray-600 mb-6">
                Found {jobs.length} job{jobs.length !== 1 ? 's' : ''} within {radius} km
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            </>
          ) : (
            <div className="card text-center py-12">
              <p className="text-gray-600 text-lg">
                No jobs found within {radius} km. Try increasing the radius or changing filters.
              </p>
            </div>
          )}
        </>
      )}

      {/* Info Box */}
      <div className="card mt-12 bg-gray-50">
        <h3 className="font-bold mb-2">💡 Tip:</h3>
        <p className="text-gray-700">
          This page uses your device's location to show jobs near you. Make sure your browser has permission to access your location. Jobs are sorted by distance automatically.
        </p>
      </div>
    </div>
  );
}
