import { Navbar, Button, Input, TextArea } from '@/components';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#001F3F] to-[#003366] text-white py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-[#B0C4DE] max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Our team is here to help.
            </p>
          </div>
        </div>

        {/* Contact Info and Form Section */}
        <div className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
              {/* Email */}
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FFF4E5] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">✉️</span>
                </div>
                <h3 className="text-xl font-bold text-[#001F3F] mb-3">Email</h3>
                <p className="text-[#4A4A4A]">support@hiremitra.com</p>
                <p className="text-sm text-[#4A4A4A] mt-2">We'll respond within 24 hours</p>
              </div>

              {/* Phone */}
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FFF4E5] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📞</span>
                </div>
                <h3 className="text-xl font-bold text-[#001F3F] mb-3">Phone</h3>
                <p className="text-[#4A4A4A]">+1 (555) 123-4567</p>
                <p className="text-sm text-[#4A4A4A] mt-2">Mon-Fri, 9 AM - 6 PM EST</p>
              </div>

              {/* Address */}
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FFF4E5] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📍</span>
                </div>
                <h3 className="text-xl font-bold text-[#001F3F] mb-3">Address</h3>
                <p className="text-[#4A4A4A]">123 Business Street</p>
                <p className="text-sm text-[#4A4A4A] mt-2">New York, NY 10001</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#FFF4E5] rounded-xl p-12">
              <h2 className="text-4xl font-bold text-[#001F3F] mb-2 text-center">Send us a Message</h2>
              <p className="text-center text-[#4A4A4A] mb-12 max-w-2xl mx-auto">
                Fill out the form below and we'll get back to you as soon as possible. We value your feedback and questions.
              </p>

              <form className="max-w-3xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">First Name *</label>
                    <Input
                      placeholder="John"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Last Name *</label>
                    <Input
                      placeholder="Doe"
                      type="text"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Email Address *</label>
                  <Input
                    placeholder="you@example.com"
                    type="email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Phone Number</label>
                  <Input
                    placeholder="+1 (555) 123-4567"
                    type="tel"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Subject *</label>
                  <Input
                    placeholder="How can we help?"
                    type="text"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#001F3F] mb-2">Message *</label>
                  <TextArea
                    placeholder="Please share your message, feedback, or question in detail..."
                    className="min-h-48"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="subscribe"
                    name="subscribe"
                    className="w-5 h-5 rounded cursor-pointer accent-[#FF7A00] mt-0.5"
                  />
                  <label htmlFor="subscribe" className="text-sm text-[#4A4A4A] cursor-pointer">
                    I'd like to receive updates about HireMitra news and features
                  </label>
                </div>

                <Button fullWidth size="lg" className="mt-8">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-[#001F3F] text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 border border-[#E5E7EB] rounded-lg">
                <h3 className="text-xl font-bold text-[#001F3F] mb-3">How long does it take to receive a response?</h3>
                <p className="text-[#4A4A4A]">
                  We aim to respond to all inquiries within 24 business hours. During peak times, it may take up to 48 hours.
                </p>
              </div>

              <div className="p-6 border border-[#E5E7EB] rounded-lg">
                <h3 className="text-xl font-bold text-[#001F3F] mb-3">What hours is support available?</h3>
                <p className="text-[#4A4A4A]">
                  Our support team is available Monday through Friday, 9 AM to 6 PM EST. For urgent issues, please email us anytime.
                </p>
              </div>

              <div className="p-6 border border-[#E5E7EB] rounded-lg">
                <h3 className="text-xl font-bold text-[#001F3F] mb-3">Can I call support directly?</h3>
                <p className="text-[#4A4A4A]">
                  Yes! You can reach our support team at +1 (555) 123-4567 during business hours, or email us for a callback.
                </p>
              </div>

              <div className="p-6 border border-[#E5E7EB] rounded-lg">
                <h3 className="text-xl font-bold text-[#001F3F] mb-3">How can I report a security issue?</h3>
                <p className="text-[#4A4A4A]">
                  Please email security concerns to security@hiremitra.com. Do not post security vulnerabilities publicly.
                </p>
              </div>

              <div className="p-6 border border-[#E5E7EB] rounded-lg">
                <h3 className="text-xl font-bold text-[#001F3F] mb-3">Where can I find API documentation?</h3>
                <p className="text-[#4A4A4A]">
                  API documentation is available at docs.hiremitra.com. Contact us if you need developer support.
                </p>
              </div>

              <div className="p-6 border border-[#E5E7EB] rounded-lg">
                <h3 className="text-xl font-bold text-[#001F3F] mb-3">How do I submit feedback?</h3>
                <p className="text-[#4A4A4A]">
                  We'd love your feedback! Use the contact form above or email feedback@hiremitra.com directly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#001F3F] to-[#003366] text-white py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Still have questions?</h2>
            <p className="text-xl text-[#B0C4DE] mb-8 max-w-2xl mx-auto">
              Check out our help center or reach out to our support team directly.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg">Visit Help Center</Button>
              <Button size="lg" variant="secondary">Start a Live Chat</Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#001F3F] text-white py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-[#B0C4DE] mb-4">© 2024 HireMitra. All rights reserved.</p>
            <div className="flex gap-6 justify-center flex-wrap text-sm">
              <a href="/privacy" className="hover:text-[#FF7A00] cursor-pointer">Privacy Policy</a>
              <a href="/terms" className="hover:text-[#FF7A00] cursor-pointer">Terms of Service</a>
              <a href="/about" className="hover:text-[#FF7A00] cursor-pointer">About Us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
