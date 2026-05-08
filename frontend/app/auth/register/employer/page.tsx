'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, TextArea, Button } from '@/components';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { validateName, validateEmail, validatePhone, validateCompanyName, validateURL, validatePassword, validateConfirmPassword, validateCheckbox } from '@/lib/validation';

export default function EmployerRegisterPage() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', companyName: '', website: '', description: '',
    password: '', confirmPassword: '', authorizationAccepted: false, updates: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [localError, setLocalError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
    if (localError) setLocalError(null);
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allErrors: Record<string, string> = {};
    const nameVal = validateName(formData.name, 'Full Name');
    if (!nameVal.valid) allErrors.name = nameVal.error || 'Invalid name';
    const emailVal = validateEmail(formData.email);
    if (!emailVal.valid) allErrors.email = emailVal.error || 'Invalid email';
    const phoneVal = validatePhone(formData.phone);
    if (!phoneVal.valid) allErrors.phone = phoneVal.error || 'Invalid phone';
    const companyVal = validateCompanyName(formData.companyName);
    if (!companyVal.valid) allErrors.companyName = companyVal.error || 'Invalid company name';
    if (formData.website && !validateURL(formData.website).valid) allErrors.website = 'Invalid URL';
    const passwordVal = validatePassword(formData.password);
    if (!passwordVal.valid) allErrors.password = passwordVal.error || 'Invalid password';
    const confirmPasswordVal = validateConfirmPassword(formData.password, formData.confirmPassword);
    if (!confirmPasswordVal.valid) allErrors.confirmPassword = confirmPasswordVal.error || "Passwords don't match";
    const authVal = validateCheckbox(formData.authorizationAccepted, 'Authorization');
    if (!authVal.valid) allErrors.authorizationAccepted = authVal.error || 'Accept authorization';

    if (Object.keys(allErrors).length > 0) { setErrors(allErrors); return; }

    try {
      await register({ name: formData.name, email: formData.email, phone: formData.phone, companyName: formData.companyName, website: formData.website || undefined, description: formData.description || undefined, password: formData.password, userType: 'employer' });
      router.push('/dashboard/employer');
    } catch (err: any) {
      setLocalError(err.message || 'Registration failed');
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F3F] via-[#002a54] to-[#003366] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-120px] left-[-80px] w-[300px] h-[300px] rounded-full bg-[#FF7A00]/10 blur-3xl"></div>
        <div className="absolute bottom-[-100px] right-[-60px] w-[250px] h-[250px] rounded-full bg-[#FF7A00]/5 blur-3xl"></div>
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
            <span>🏢</span> Employer Registration
          </div>
        </div>

        {/* Registration Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 animate-scale-in">
          <h2 className="text-2xl font-bold text-[#001F3F] mb-1">Create Your Account</h2>
          <p className="text-[#4A4A4A] text-sm mb-7">Find skilled workers and complete your projects efficiently</p>

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
                  <Input placeholder="you@company.com" type="email" name="email" value={formData.email} onChange={handleChange} />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#001F3F] mb-1.5">Phone Number *</label>
                  <Input placeholder="+91 98765 43210" type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                  {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div className="pt-5 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-[#FF7A00]/10 rounded-md flex items-center justify-center text-xs text-[#FF7A00] font-bold">2</div>
                <h3 className="text-sm font-bold text-[#001F3F] uppercase tracking-wide">Company Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-1.5">Company Name *</label>
                  <Input placeholder="Your Company Name" type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
                  {errors.companyName && <p className="text-xs text-red-600 mt-1">{errors.companyName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-1.5">Company Website</label>
                  <Input placeholder="https://www.yourcompany.com" type="url" name="website" value={formData.website} onChange={handleChange} />
                  {errors.website && <p className="text-xs text-red-600 mt-1">{errors.website}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#001F3F] mb-1.5">Company Description</label>
                  <TextArea placeholder="Tell workers about your company and what kind of work you do..." name="description" value={formData.description} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="pt-5 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-[#FF7A00]/10 rounded-md flex items-center justify-center text-xs text-[#FF7A00] font-bold">3</div>
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
                  <input type="checkbox" id="authorized" name="authorizationAccepted" checked={formData.authorizationAccepted} onChange={handleChange} className="w-4.5 h-4.5 rounded cursor-pointer accent-[#FF7A00] mt-0.5" />
                  <label htmlFor="authorized" className="text-sm text-[#4A4A4A] cursor-pointer">
                    I confirm that I am authorized to represent this company and agree to the <Link href="/terms" className="text-[#FF7A00] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#FF7A00] hover:underline">Privacy Policy</Link>
                  </label>
                </div>
                {errors.authorizationAccepted && <p className="text-xs text-red-600 ml-7">{errors.authorizationAccepted}</p>}
                <div className="flex items-start gap-3">
                  <input type="checkbox" id="updates" name="updates" checked={formData.updates} onChange={handleChange} className="w-4.5 h-4.5 rounded cursor-pointer accent-[#FF7A00] mt-0.5" />
                  <label htmlFor="updates" className="text-sm text-[#4A4A4A] cursor-pointer">I want to receive updates about new features and offers</label>
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
          <p>Complete your profile after registration to start posting jobs and hiring workers</p>
        </div>
      </div>
    </div>
  );
}
