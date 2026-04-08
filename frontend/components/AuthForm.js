'use client';

import { useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { setAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';

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

export default function AuthForm({ type = 'login' }) {
  const router = useRouter();
  const { post, loading, error } = useApi();
  const [formError, setFormError] = useState('');
  const [userType, setUserType] = useState('worker');
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    companyName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillToggle = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    try {
      let url, payload;

      if (type === 'login') {
        url = '/auth/login';
        payload = {
          email: formData.email,
          password: formData.password,
        };
      } else {
        // Register
        if (!formData.name || !formData.email || !formData.phone || !formData.password) {
          setFormError('All fields are required');
          return;
        }

        url = '/auth/register';
        payload = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          userType,
          ...(userType === 'worker' && { skills: selectedSkills }),
          ...(userType === 'employer' && { companyName: formData.companyName }),
        };
      }

      const response = await post(url, payload);

      // Save auth data
      setAuth(response.token, response.user);

      // Redirect based on user type
      const redirectUrl = response.user.userType === 'employer' ? '/dashboard' : '/jobs';
      router.push(redirectUrl);
    } catch (err) {
      setFormError(error || 'An error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {type === 'login' ? 'Login' : 'Register'}
      </h2>

      {formError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'register' && (
          <>
            {/* User Type Selection */}
            <div>
              <label className="label">Account Type</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="worker"
                    checked={userType === 'worker'}
                    onChange={(e) => setUserType(e.target.value)}
                    className="mr-2"
                  />
                  Worker
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="employer"
                    checked={userType === 'employer'}
                    onChange={(e) => setUserType(e.target.value)}
                    className="mr-2"
                  />
                  Employer
                </label>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            {/* Company Name (for employers) */}
            {userType === 'employer' && (
              <div>
                <label className="label">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="input"
                />
              </div>
            )}

            {/* Skills (for workers) */}
            {userType === 'worker' && (
              <div>
                <label className="label">Skills</label>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleSkillToggle(skill)}
                      className={`text-xs px-3 py-1 rounded font-medium transition-colors ${
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
            )}
          </>
        )}

        {/* Email */}
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        {/* Phone */}
        {type === 'register' && (
          <div>
            <label className="label">Phone (10 digits)</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input"
              maxLength="10"
              required
            />
          </div>
        )}

        {/* Password */}
        <div>
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            required
          />
          {type === 'register' && (
            <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading...' : type === 'login' ? 'Login' : 'Register'}
        </button>
      </form>

      {/* Link to other form */}
      <p className="text-center text-gray-600 mt-4 text-sm">
        {type === 'login' ? (
          <>
            Don't have an account?{' '}
            <a href="/auth/register" className="text-blue-600 hover:underline font-medium">
              Register here
            </a>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <a href="/auth/login" className="text-blue-600 hover:underline font-medium">
              Login here
            </a>
          </>
        )}
      </p>
    </div>
  );
}
