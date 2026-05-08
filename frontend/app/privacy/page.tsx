import type { Metadata } from 'next';
import { Navbar } from '@/components';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - HireMitra',
  description: 'Read HireMitra privacy policy. Learn how we protect your data and personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#001F3F] to-[#003366] text-white py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-[#B0C4DE] max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-[#B0C4DE] mt-6">Last updated: April 2024</p>
          </div>
        </div>

        {/* Privacy Content */}
        <div className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            {/* Overview */}
            <div className="bg-[#FFF4E5] rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-[#001F3F] mb-4">Privacy Overview</h2>
              <p className="text-[#4A4A4A] leading-relaxed">
                HireMitra ("we", "us", "our", or "Company") operates the HireMitra platform. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service and the choices you have associated with that data.
              </p>
            </div>

            {/* Table of Contents */}
            <div className="bg-[#FFF4E5] rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Table of Contents</h2>
              <ul className="space-y-3">
                <li><a href="#information-collection" className="text-[#FF7A00] hover:underline">1. Information We Collect</a></li>
                <li><a href="#use-of-data" className="text-[#FF7A00] hover:underline">2. Use of Data</a></li>
                <li><a href="#security-data" className="text-[#FF7A00] hover:underline">3. Security of Data</a></li>
                <li><a href="#children-privacy" className="text-[#FF7A00] hover:underline">4. Children's Privacy</a></li>
                <li><a href="#cookies" className="text-[#FF7A00] hover:underline">5. Cookies</a></li>
                <li><a href="#third-parties" className="text-[#FF7A00] hover:underline">6. Third-Party Services</a></li>
                <li><a href="#data-retention" className="text-[#FF7A00] hover:underline">7. Data Retention</a></li>
                <li><a href="#user-rights" className="text-[#FF7A00] hover:underline">8. Your Rights</a></li>
                <li><a href="#contact-us" className="text-[#FF7A00] hover:underline">9. Contact Us</a></li>
              </ul>
            </div>

            {/* Privacy Sections */}
            <div className="space-y-12">
              <section id="information-collection">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-4">1. Information We Collect</h3>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-[#001F3F] mb-3">Personal Information You Provide</h4>
                  <p className="text-[#4A4A4A] leading-relaxed mb-3">
                    When you create an account or use our services, we collect:
                  </p>
                  <ul className="list-disc list-inside text-[#4A4A4A] space-y-2 ml-4">
                    <li>Name, email address, and phone number</li>
                    <li>Profile information (skills, experience, certifications for workers)</li>
                    <li>Company information (name, location, description for employers)</li>
                    <li>Payment and billing information</li>
                    <li>Messages and communication history</li>
                    <li>Photo, resume, and other uploaded documents</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-[#001F3F] mb-3">Information Automatically Collected</h4>
                  <p className="text-[#4A4A4A] leading-relaxed mb-3">
                    When you use our platform, we automatically collect:
                  </p>
                  <ul className="list-disc list-inside text-[#4A4A4A] space-y-2 ml-4">
                    <li>IP address and browser information</li>
                    <li>Device information and operating system</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Search queries and filters used</li>
                    <li>Interactions with jobs and worker profiles</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </section>

              <section id="use-of-data">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-4">2. Use of Data</h3>
                <p className="text-[#4A4A4A] leading-relaxed mb-4">
                  HireMitra uses the collected data for various purposes:
                </p>
                <ul className="list-disc list-inside text-[#4A4A4A] space-y-2 ml-4">
                  <li>Providing and maintaining our service</li>
                  <li>Notifying you about changes to our service</li>
                  <li>Allowing you to participate in interactive features</li>
                  <li>Providing customer support and responding to inquiries</li>
                  <li>Gathering analysis or valuable information for service improvement</li>
                  <li>Monitoring the usage of our service</li>
                  <li>Detecting, preventing, and addressing fraud and technical issues</li>
                  <li>Sending marketing and promotional communications (with your consent)</li>
                </ul>
              </section>

              <section id="security-data">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-4">3. Security of Data</h3>
                <p className="text-[#4A4A4A] leading-relaxed">
                  The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security. We employ industry-standard encryption, secure servers, and access controls to protect your data from unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section id="children-privacy">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-4">4. Children's Privacy</h3>
                <p className="text-[#4A4A4A] leading-relaxed">
                  Our service is not intended for children under 18 years of age. We do not knowingly collect personally identifiable information from children under 18. If we become aware that we have collected personal data from a child, we will take steps to delete such information and terminate the child's account immediately.
                </p>
              </section>

              <section id="cookies">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-4">5. Cookies</h3>
                <p className="text-[#4A4A4A] leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to alert you when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
                </p>
                <p className="text-[#4A4A4A] leading-relaxed">
                  Types of cookies we use:
                </p>
                <ul className="list-disc list-inside text-[#4A4A4A] space-y-2 ml-4 mt-2">
                  <li><strong>Session Cookies:</strong> Expire when you close your browser</li>
                  <li><strong>Persistent Cookies:</strong> Remain until you delete them</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our service</li>
                  <li><strong>Marketing Cookies:</strong> Track your interests for personalized content</li>
                </ul>
              </section>

              <section id="third-parties">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-4">6. Third-Party Services</h3>
                <p className="text-[#4A4A4A] leading-relaxed mb-4">
                  Our service may contain links to third-party websites and services that are not operated by HireMitra. This Privacy Policy does not apply to third-party websites, and we are not responsible for their privacy practices. We encourage you to review the privacy policy of any third-party service before providing your information.
                </p>
                <p className="text-[#4A4A4A] leading-relaxed">
                  We may share your information with third-party service providers for:
                </p>
                <ul className="list-disc list-inside text-[#4A4A4A] space-y-2 ml-4 mt-2">
                  <li>Payment processing</li>
                  <li>Background check verification</li>
                  <li>Analytics and reporting</li>
                  <li>Customer support</li>
                  <li>Marketing and communications</li>
                </ul>
              </section>

              <section id="data-retention">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-4">7. Data Retention</h3>
                <p className="text-[#4A4A4A] leading-relaxed">
                  HireMitra will retain your personal data only for as long as necessary for the purposes set out in this Privacy Policy. We will retain and use your personal data to the extent necessary to comply with our legal obligations (e.g., if we are required to retain your data to comply with applicable laws). Generally, we retain personal data for 7 years after account closure, unless a longer retention period is required by law.
                </p>
              </section>

              <section id="user-rights">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-4">8. Your Rights</h3>
                <p className="text-[#4A4A4A] leading-relaxed mb-4">
                  You have the following rights regarding your personal data:
                </p>
                <ul className="list-disc list-inside text-[#4A4A4A] space-y-2 ml-4">
                  <li><strong>Access:</strong> You can request a copy of your personal data</li>
                  <li><strong>Correction:</strong> You can correct inaccurate or incomplete data</li>
                  <li><strong>Deletion:</strong> You can request deletion of your data (right to be forgotten)</li>
                  <li><strong>Portability:</strong> You can request your data in a portable format</li>
                  <li><strong>Opt-out:</strong> You can opt-out of marketing communications</li>
                  <li><strong>Object:</strong> You can object to certain data processing activities</li>
                </ul>
                <p className="text-[#4A4A4A] leading-relaxed mt-4">
                  To exercise any of these rights, please contact us using the information in the Contact Us section.
                </p>
              </section>

              {/* Contact Section */}
              <section id="contact-us" className="mt-12 p-8 bg-[#FFF4E5] rounded-lg">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-4">9. Contact Us</h3>
                <p className="text-[#4A4A4A] leading-relaxed mb-6">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
                </p>
                <div className="space-y-3 text-[#4A4A4A]">
                  <p><strong>Email:</strong> privacy@hiremitra.com</p>
                  <p><strong>Mailing Address:</strong> 123 Business Street, New York, NY 10001</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#001F3F] text-white py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-[#B0C4DE] mb-4">© 2024 HireMitra. All rights reserved.</p>
            <div className="flex gap-6 justify-center flex-wrap text-sm">
              <Link href="/terms">
                <span className="hover:text-[#FF7A00] cursor-pointer">Terms of Service</span>
              </Link>
              <Link href="/about">
                <span className="hover:text-[#FF7A00] cursor-pointer">About Us</span>
              </Link>
              <Link href="/contact">
                <span className="hover:text-[#FF7A00] cursor-pointer">Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
