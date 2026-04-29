'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@/components';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { validateName, validateEmail, validatePhone, validatePassword, validateConfirmPassword, validateCheckbox } from '@/lib/validation';

export default function WorkerRegisterPage() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    updates: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [localError, setLocalError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    if (localError) {
      setLocalError(null);
    }
    if (error) {
      clearError();
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const nameVal = validateName(formData.name, 'Full Name');
    if (!nameVal.valid) {
      newErrors.name = nameVal.error || 'Invalid name';
    }

    const emailVal = validateEmail(formData.email);
    if (!emailVal.valid) {
      newErrors.email = emailVal.error || 'Invalid email';
    }

    const phoneVal = validatePhone(formData.phone);
    if (!phoneVal.valid) {
      newErrors.phone = phoneVal.error || 'Invalid phone';
    }

    const passwordVal = validatePassword(formData.password);
    if (!passwordVal.valid) {
      newErrors.password = passwordVal.error || 'Invalid password';
    }

    const confirmPasswordVal = validateConfirmPassword(formData.password, formData.confirmPassword);
    if (!confirmPasswordVal.valid) {
      newErrors.confirmPassword = confirmPasswordVal.error || 'Passwords don\'t match';
    }

    const termsVal = validateCheckbox(formData.termsAccepted, 'Terms and Conditions');
    if (!termsVal.valid) {
      newErrors.termsAccepted = termsVal.error || 'Accept terms';
    }

    return { valid: Object.keys(newErrors).length === 0, errors: newErrors };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = validateForm();
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location || undefined,
        password: formData.password,
        userType: 'worker',
      });

      // Auto-login successful, redirect to worker dashboard
      router.push('/dashboard/worker');
    } catch (err: any) {
      setLocalError(err.message || 'Registration failed');
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F3F] to-[#003366] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Link href="/auth/register">
            <div className="text-4xl font-bold text-white mb-2 cursor-pointer hover:opacity-80">
              HM
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-1">HireMitra</h1>
          <p className="text-[#B0C4DE] text-sm">Worker Registration</p>
        </div>

        {/* Registration Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-2">Create Your Account</h2>
          <p className="text-[#4A4A4A] mb-8">
            Join thousands of skilled workers finding great opportunities
          </p>

          {/* Error Message */}
          {displayError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{displayError}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <div>
              <h3 className="text-sm font-bold text-[#001F3F] mb-4 uppercase tracking-wide">
                Personal Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">
                    Full Name *
                  </label>
                  <Input
                    placeholder="John Doe"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">
                    Email Address *
                  </label>
                  <Input
                    placeholder="you@example.com"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">
                    Phone Number *
                  </label>
                  <Input
                    placeholder="+1 (555) 123-4567"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">
                    Location
                  </label>
                  <Input
                    placeholder="New York, NY"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Account Security Section */}
            <div className="pt-4 border-t border-[#E5E7EB]">
              <h3 className="text-sm font-bold text-[#001F3F] mb-4 uppercase tracking-wide">
                Account Security
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">
                    Password *
                  </label>
                  <Input
                    placeholder="••••••••"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <p className="text-xs text-[#4A4A4A] mt-1">At least 6 characters</p>
                  {errors.password && (
                    <p className="text-xs text-red-600 mt-1">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">
                    Confirm Password *
                  </label>
                  <Input
                    placeholder="••••••••"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="pt-4 border-t border-[#E5E7EB]">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="w-5 h-5 rounded cursor-pointer accent-[#FF7A00] mt-0.5"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-[#4A4A4A] cursor-pointer"
                  >
                    I agree to the{' '}
                    <Link href="/terms">
                      <span className="text-[#FF7A00] hover:underline">
                        Terms of Service
                      </span>
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy">
                      <span className="text-[#FF7A00] hover:underline">
                        Privacy Policy
                      </span>
                    </Link>
                  </label>
                </div>
                {errors.termsAccepted && (
                  <p className="text-xs text-red-600">{errors.termsAccepted}</p>
                )}

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="updates"
                    name="updates"
                    checked={formData.updates}
                    onChange={handleChange}
                    className="w-5 h-5 rounded cursor-pointer accent-[#FF7A00] mt-0.5"
                  />
                  <label
                    htmlFor="updates"
                    className="text-sm text-[#4A4A4A] cursor-pointer"
                  >
                    I want to receive updates and job recommendations
                  </label>
                </div>
              </div>
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              fullWidth
              size="lg"
              className="mt-8"
              disabled={isLoading}
              loading={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create My Account'}
            </Button>

            {/* Sign In Link */}
            <div className="text-center pt-4 border-t border-[#E5E7EB]">
              <p className="text-[#4A4A4A] text-sm">Already have an account?</p>
              <Link href="/auth/login">
                <span className="text-[#FF7A00] hover:text-[#E66A00] font-semibold cursor-pointer">
                  Sign in here
                </span>
              </Link>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-[#B0C4DE] text-xs">
          <p>
            Complete your profile after registration to increase your chances of
            getting hired
          </p>
        </div>
      </div>
    </div>
  );
}
