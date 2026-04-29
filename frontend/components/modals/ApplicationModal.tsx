'use client';

import { useState } from 'react';
import { Input, TextArea, Select, Button } from '@/components';
import apiClient from '@/lib/api';

interface ApplicationModalProps {
  jobId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ApplicationModal({
  jobId,
  isOpen,
  onClose,
  onSuccess
}: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    coverLetter: '',
    expectedSalary: '',
    availabilityDate: '',
    preferredShift: 'flexible'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.coverLetter.trim()) {
        setError('Cover letter is required');
        setIsLoading(false);
        return;
      }

      if (!formData.expectedSalary) {
        setError('Expected salary is required');
        setIsLoading(false);
        return;
      }

      if (!formData.availabilityDate) {
        setError('Availability date is required');
        setIsLoading(false);
        return;
      }

      const response = await apiClient.post('/api/applications', {
        jobId,
        coverLetter: formData.coverLetter,
        expectedSalary: parseInt(formData.expectedSalary),
        availabilityDate: formData.availabilityDate,
        preferredShift: formData.preferredShift
      });

      setSuccess(true);
      setFormData({
        coverLetter: '',
        expectedSalary: '',
        availabilityDate: '',
        preferredShift: 'flexible'
      });

      // Auto close after 2 seconds
      setTimeout(() => {
        onClose();
        onSuccess?.();
      }, 2000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to submit application';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#001F3F]">Apply for Job</h2>
          <button
            onClick={onClose}
            className="text-[#4A4A4A] hover:text-[#001F3F] text-2xl"
            disabled={isLoading}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">Application Submitted!</h3>
              <p className="text-[#4A4A4A]">The employer will review your application soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-semibold text-[#001F3F] mb-2">
                  Cover Letter *
                </label>
                <TextArea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Tell the employer why you're interested in this job and what skills you bring..."
                  rows={5}
                />
                <p className="text-xs text-[#4A4A4A] mt-1">
                  Describe your experience and why you're a good fit for this role
                </p>
              </div>

              {/* Expected Salary */}
              <div>
                <label className="block text-sm font-semibold text-[#001F3F] mb-2">
                  Expected Salary *
                </label>
                <Input
                  type="number"
                  name="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={handleChange}
                  placeholder="Enter your expected salary"
                />
                <p className="text-xs text-[#4A4A4A] mt-1">
                  Provide your expected compensation
                </p>
              </div>

              {/* Availability Date */}
              <div>
                <label className="block text-sm font-semibold text-[#001F3F] mb-2">
                  Availability Date *
                </label>
                <Input
                  type="date"
                  name="availabilityDate"
                  value={formData.availabilityDate}
                  onChange={handleChange}
                />
              </div>

              {/* Preferred Shift */}
              <div>
                <label className="block text-sm font-semibold text-[#001F3F] mb-2">
                  Preferred Shift
                </label>
                <Select
                  value={formData.preferredShift}
                  onChange={handleChange}
                  name="preferredShift"
                  options={[
                    { value: 'morning', label: 'Morning' },
                    { value: 'afternoon', label: 'Afternoon' },
                    { value: 'night', label: 'Night' },
                    { value: 'flexible', label: 'Flexible' }
                  ]}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t border-[#E5E7EB]">
                <Button
                  type="button"
                  variant="secondary"
                  fullWidth
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                  loading={isLoading}
                >
                  {isLoading ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
