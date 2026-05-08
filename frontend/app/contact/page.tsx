import type { Metadata } from 'next';
import { Navbar, Button, Input, TextArea } from '@/components';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us - HireMitra',
  description: 'Get in touch with HireMitra. We are here to help workers and employers connect.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#001F3F] via-[#002a54] to-[#003366] text-white py-16 sm:py-20 px-4 relative overflow-hidden">
          <div className="absolute bottom-[-60px] right-[-40px] w-[200px] h-[200px] rounded-full bg-[#FF7A00]/10 blur-3xl"></div>
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <span>📬</span> Contact Us
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-base sm:text-lg text-[#B0C4DE] max-w-2xl mx-auto">
              Have questions or feedback? We&apos;d love to hear from you. Our team is here to help.
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="py-14 sm:py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
              {[
                { icon: '✉️', title: 'Email', line1: 'support@hiremitra.com', line2: "We'll respond within 24 hours" },
                { icon: '📞', title: 'Phone', line1: '+91 98765 43210', line2: 'Mon-Fri, 9 AM - 6 PM IST' },
                { icon: '📍', title: 'Address', line1: 'Mumbai, Maharashtra', line2: 'India' },
              ].map((item) => (
                <div key={item.title} className="text-center p-6 rounded-2xl bg-[#FAFAFA] border border-[#E5E7EB] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-12 h-12 bg-[#FFF4E5] rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">{item.icon}</div>
                  <h3 className="font-bold text-[#001F3F] mb-2">{item.title}</h3>
                  <p className="text-[#4A4A4A] text-sm">{item.line1}</p>
                  <p className="text-xs text-[#9CA3AF] mt-1">{item.line2}</p>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="bg-gradient-to-br from-[#FFF4E5] to-[#FFFBF5] rounded-2xl p-6 sm:p-10 md:p-12 border border-[#FFE8CC]">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#001F3F] mb-2 text-center">Send us a Message</h2>
              <p className="text-center text-[#6B7280] text-sm mb-8 max-w-xl mx-auto">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>

              <form className="max-w-2xl mx-auto space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-1.5">First Name *</label>
                    <Input placeholder="John" type="text" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-1.5">Last Name *</label>
                    <Input placeholder="Doe" type="text" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-1.5">Email Address *</label>
                  <Input placeholder="you@example.com" type="email" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-1.5">Subject *</label>
                  <Input placeholder="How can we help?" type="text" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-1.5">Message *</label>
                  <TextArea placeholder="Please share your message, feedback, or question in detail..." className="min-h-36" />
                </div>
                <Button fullWidth size="lg" className="shadow-lg shadow-[#FF7A00]/20">Send Message</Button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="py-14 sm:py-20 px-4 bg-[#FAFAFA]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#001F3F] text-center mb-10">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { q: 'How long does it take to receive a response?', a: 'We aim to respond to all inquiries within 24 business hours. During peak times, it may take up to 48 hours.' },
                { q: 'What hours is support available?', a: 'Our support team is available Monday through Friday, 9 AM to 6 PM IST. For urgent issues, please email us anytime.' },
                { q: 'Can I call support directly?', a: 'Yes! You can reach our support team at +91 98765 43210 during business hours.' },
                { q: 'How can I report a security issue?', a: 'Please email security concerns to security@hiremitra.com. Do not post security vulnerabilities publicly.' },
              ].map((faq) => (
                <div key={faq.q} className="p-5 bg-white border border-[#E5E7EB] rounded-2xl hover:shadow-sm transition-shadow">
                  <h3 className="font-bold text-[#001F3F] mb-2 text-sm">{faq.q}</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#001F3F] via-[#002a54] to-[#003366] text-white py-16 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Still have questions?</h2>
            <p className="text-base sm:text-lg text-[#B0C4DE] mb-8 max-w-xl mx-auto">
              Check out our help center or reach out to our support team directly.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/about"><Button size="lg" className="shadow-lg shadow-[#FF7A00]/20">Learn More</Button></Link>
              <Link href="/auth/register"><Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">Get Started</Button></Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#001F3F] text-white py-10 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-[#B0C4DE] text-sm mb-3">&copy; 2024 HireMitra. All rights reserved.</p>
            <div className="flex gap-5 justify-center flex-wrap text-sm">
              <Link href="/privacy"><span className="text-[#B0C4DE] hover:text-[#FF7A00] transition-colors cursor-pointer">Privacy Policy</span></Link>
              <Link href="/terms"><span className="text-[#B0C4DE] hover:text-[#FF7A00] transition-colors cursor-pointer">Terms of Service</span></Link>
              <Link href="/about"><span className="text-[#B0C4DE] hover:text-[#FF7A00] transition-colors cursor-pointer">About Us</span></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
