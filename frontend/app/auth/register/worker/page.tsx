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
    name: '', email: '', phone: '', location: '',
    password: '', confirmPassword: '', termsAccepted: false, updates: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [localError, setLocalError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
    if (localError) setLocalError(null);
    if (error) clearError();
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const nameVal = validateName(formData.name, 'Full Name');
    if (!nameVal.valid) newErrors.name = nameVal.error || 'Invalid name';
    const emailVal = validateEmail(formData.email);
    if (!emailVal.valid) newErrors.email = emailVal.error || 'Invalid email';
    const phoneVal = validatePhone(formData.phone);
    if (!phoneVal.valid) newErrors.phone = phoneVal.error || 'Invalid phone';
    const passwordVal = validatePassword(formData.password);
    if (!passwordVal.valid) newErrors.password = passwordVal.error || 'Invalid password';
    const confirmPasswordVal = validateConfirmPassword(formData.password, formData.confirmPassword);
    if (!confirmPasswordVal.valid) newErrors.confirmPassword = confirmPasswordVal.error || "Passwords don't match";
    const termsVal = validateCheckbox(formData.termsAccepted, 'Terms and Conditions');
    if (!termsVal.valid) newErrors.termsAccepted = termsVal.error || 'Accept terms';
    return { valid: Object.keys(newErrors).length === 0, errors: newErrors };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateForm();
    if (!validation.valid) { setErrors(validation.errors); return; }
    try {
      await register({ name: formData.name, email: formData.email, phone: formData.phone, location: formData.location || undefined, password: formData.password, userType: 'worker' });
      router.push('/dashboard/worker');
    } catch (err: any) {
      setLocalError(err.message || 'Registration failed');
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F3F] via-[#002a54] to-[#003366] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-120px] right-[-80px] w-[300px] h-[300px] rounded-full bg-[#FF7A00]/10 blur-3xl"></div>
        <div className="absolute bottom-[-100px] left-[-60px] w-[250px] h-[250px] rounded-full bg-[#FF7A00]/5 blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Logo */}
        <div className="text-center mb-6 animate-fade-in">
          <Link href="/auth/register">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#FF7A00] to-[#FF9A40] rounded-2xl text-white text-xl font-bold mb-3 shadow-lg shadow-[#FF7A00]/25 hover:scale-105 transition-transform cursor-pointer">
              H
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-1">HireMitra</h1>
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-medium">
            <span>👷</span> Worker Registration
          </div>
        </div>

        {/* Registration Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 animate-scale-in">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-[#001F3F]">Create Your Account</h2>
          </div>
          <p className="text-[#4A4A4A] text-sm mb-7">Join thousands of skilled workers finding great opportunities</p>

          {displayError && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-slide-up">
              <span className="text-red-500 text-lg">⚠️</span>
              <p className="text-sm text-red-600">{displayError}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-[#FF7A00]/10 rounded-md flex items-center justify-center text-xs text-[#FF7A00] font-bold">1</div>
                <h3 className="text-sm font-bold text-[#001F3F] uppercase tracking-wide">Personal Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-1.5">Full Name *</label>
                  <Input placeholder="John Doe" type="text" name="name" value={formData.name} onChange={handleChange} />
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-1.5">Email Address *</label>
                  <Input placeholder="you@example.com" type="email" name="email" value={formData.email} onChange={handleChange} />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-1.5">Phone Number *</label>
                  <Input placeholder="+91 98765 43210" type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                  {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-1.5">Location</label>
                  <Input placeholder="Mumbai, MH" type="text" name="location" value={formData.location} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="pt-5 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-[#FF7A00]/10 rounded-md flex items-center justify-center text-xs text-[#FF7A00] font-bold">2</div>
                <h3 className="text-sm font-bold text-[#001F3F] uppercase tracking-wide">Account Security</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-1.5">Password *</label>
                  <Input placeholder="••••••••" type="password" name="password" value={formData.password} onChange={handleChange} />
                  <p className="text-xs text-[#9CA3AF] mt-1">At least 6 characters</p>
                  {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-1.5">Confirm Password *</label>
                  <Input placeholder="••••••••" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                  {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="pt-5 border-t border-[#E5E7EB]">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <input type="checkbox" id="terms" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} className="w-4.5 h-4.5 rounded cursor-pointer accent-[#FF7A00] mt-0.5" />
                  <label htmlFor="terms" className="text-sm text-[#4A4A4A] cursor-pointer">
                    I agree to the <Link href="/terms" className="text-[#FF7A00] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#FF7A00] hover:underline">Privacy Policy</Link>
                  </label>
                </div>
                {errors.termsAccepted && <p className="text-xs text-red-600 ml-7">{errors.termsAccepted}</p>}
                <div className="flex items-start gap-3">
                  <input type="checkbox" id="updates" name="updates" checked={formData.updates} onChange={handleChange} className="w-4.5 h-4.5 rounded cursor-pointer accent-[#FF7A00] mt-0.5" />
                  <label htmlFor="updates" className="text-sm text-[#4A4A4A] cursor-pointer">I want to receive job recommendations via email</label>
                </div>
              </div>
            </div>

            <Button type="submit" fullWidth size="lg" className="mt-6 shadow-lg shadow-[#FF7A00]/20" disabled={isLoading} loading={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create My Account'}
            </Button>

            <div className="text-center pt-5 border-t border-[#E5E7EB]">
              <p className="text-[#4A4A4A] text-sm">Already have an account?{' '}
                <Link href="/auth/login" className="text-[#FF7A00] hover:text-[#E66A00] font-semibold transition-colors">Sign in here</Link>
              </p>
            </div>
          </form>
        </div>

        <div className="mt-5 text-center text-[#B0C4DE] text-xs animate-fade-in animate-delay-300">
          <p>Complete your profile after registration to increase your chances of getting hired</p>
        </div>
      </div>
    </div>
  );
}
