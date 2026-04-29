import { Navbar } from '@/components';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#001F3F] to-[#003366] text-white py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-[#B0C4DE] max-w-2xl mx-auto">
              Please read these terms carefully before using HireMitra
            </p>
            <p className="text-sm text-[#B0C4DE] mt-6">Last updated: April 2024</p>
          </div>
        </div>

        {/* Terms Content */}
        <div className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            {/* Table of Contents */}
            <div className="bg-[#FFF4E5] rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Table of Contents</h2>
              <ul className="space-y-3">
                <li><a href="#agreement" className="text-[#FF7A00] hover:underline">1. Agreement to Terms</a></li>
                <li><a href="#eligibility" className="text-[#FF7A00] hover:underline">2. Eligibility</a></li>
                <li><a href="#user-accounts" className="text-[#FF7A00] hover:underline">3. User Accounts</a></li>
                <li><a href="#acceptable-use" className="text-[#FF7A00] hover:underline">4. Acceptable Use Policy</a></li>
                <li><a href="#intellectual-property" className="text-[#FF7A00] hover:underline">5. Intellectual Property Rights</a></li>
                <li><a href="#limitation-liability" className="text-[#FF7A00] hover:underline">6. Limitation of Liability</a></li>
                <li><a href="#user-content" className="text-[#FF7A00] hover:underline">7. User Content</a></li>
                <li><a href="#dispute-resolution" className="text-[#FF7A00] hover:underline">8. Dispute Resolution</a></li>
                <li><a href="#termination" className="text-[#FF7A00] hover:underline">9. Termination</a></li>
                <li><a href="#changes" className="text-[#FF7A00] hover:underline">10. Changes to Terms</a></li>
              </ul>
            </div>

            {/* Terms Sections */}
            <div className="space-y-12">
              <section id="agreement">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-4">1. Agreement to Terms</h3>
                <p className="text-[#4A4A4A] leading-relaxed">
                  By accessing and using HireMitra, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service. HireMitra reserves the right to make changes to these terms at any time. Your continued use of HireMitra following the posting of revised Terms means that you accept and agree to the changes.
                </p>
              </section>

              <section id="eligibility">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-4">2. Eligibility</h3>
                <p className="text-[#4A4A4A] leading-relaxed mb-4">
                  To use HireMitra, you must:
                </p>
                <ul className="list-disc list-inside text-[#4A4A4A] space-y-2 ml-4">
                  <li>Be at least 18 years of age</li>
                  <li>Have the legal capacity to enter into a binding contract</li>
                  <li>Not be prohibited by law from using the platform</li>
                  <li>Provide accurate and truthful information during registration</li>
                  <li>Maintain current contact information</li>
                </ul>
              </section>

              <section id="user-accounts">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-4">3. User Accounts</h3>
                <p className="text-[#4A4A4A] leading-relaxed mb-4">
                  When you create an account on HireMitra, you agree to:
                </p>
                <ul className="list-disc list-inside text-[#4A4A4A] space-y-2 ml-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain the confidentiality of your password</li>
                  <li>Accept responsibility for all activities that occur under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Not share your account with others</li>
                </ul>
                <p className="text-[#4A4A4A] leading-relaxed mt-4">
                  HireMitra reserves the right to refuse service, terminate accounts, and remove or edit content at any time without notice for any reason.
                </p>
              </section>

              <section id="acceptable-use">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-4">4. Acceptable Use Policy</h3>
                <p className="text-[#4A4A4A] leading-relaxed mb-4">
                  You agree not to use HireMitra for any of the following:
                </p>
                <ul className="list-disc list-inside text-[#4A4A4A] space-y-2 ml-4">
                  <li>Posting false, misleading, or fraudulent information</li>
                  <li>Harassing, threatening, or abusing other users</li>
                  <li>Engaging in illegal activities or violating any laws</li>
                  <li>Infringing on intellectual property rights</li>
                  <li>Spamming, phishing, or hacking</li>
                  <li>Attempting to gain unauthorized access to the platform</li>
                  <li>Using automated tools to scrape or collect data</li>
                  <li>Impersonating another person or entity</li>
                </ul>
              </section>

              <section id="intellectual-property">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-4">5. Intellectual Property Rights</h3>
                <p className="text-[#4A4A4A] leading-relaxed">
                  All content on HireMitra, including text, graphics, logos, images, and software, is the property of HireMitra or its content suppliers and is protected by international copyright laws. You are granted a limited, non-exclusive right to use this content solely for personal, non-commercial purposes. You may not reproduce, distribute, transmit, or display content without permission.
                </p>
              </section>

              <section id="limitation-liability">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-4">6. Limitation of Liability</h3>
                <p className="text-[#4A4A4A] leading-relaxed mb-4">
                  HireMitra is provided "as is" without warranties of any kind. To the fullest extent permitted by law:
                </p>
                <ul className="list-disc list-inside text-[#4A4A4A] space-y-2 ml-4">
                  <li>We disclaim all warranties, express or implied</li>
                  <li>We are not liable for any indirect, incidental, or consequential damages</li>
                  <li>Our liability is limited to the amount you paid for the service</li>
                  <li>We are not responsible for user-generated content</li>
                  <li>We are not liable for service interruptions or data loss</li>
                </ul>
              </section>

              <section id="user-content">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-4">7. User Content</h3>
                <p className="text-[#4A4A4A] leading-relaxed mb-4">
                  You retain ownership of all content you post on HireMitra. By posting content, you grant HireMitra a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content on the platform.
                </p>
                <p className="text-[#4A4A4A] leading-relaxed">
                  You represent and warrant that:
                </p>
                <ul className="list-disc list-inside text-[#4A4A4A] space-y-2 ml-4 mt-2">
                  <li>You own or have the right to use all content you post</li>
                  <li>Your content does not violate any laws or third-party rights</li>
                  <li>Your content is accurate and not misleading</li>
                </ul>
              </section>

              <section id="dispute-resolution">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-4">8. Dispute Resolution</h3>
                <p className="text-[#4A4A4A] leading-relaxed mb-4">
                  Any disputes arising from your use of HireMitra shall be resolved through:
                </p>
                <ul className="list-disc list-inside text-[#4A4A4A] space-y-2 ml-4">
                  <li>Good faith negotiation between the parties</li>
                  <li>Mediation, if negotiation fails</li>
                  <li>Binding arbitration, if mediation fails</li>
                </ul>
                <p className="text-[#4A4A4A] leading-relaxed mt-4">
                  Both parties waive the right to a jury trial and class action lawsuit.
                </p>
              </section>

              <section id="termination">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-4">9. Termination</h3>
                <p className="text-[#4A4A4A] leading-relaxed">
                  HireMitra may terminate your account and access to the platform at any time, with or without notice, for any reason including breach of these terms. Upon termination, your right to use the platform ceases immediately, and you remain responsible for any outstanding obligations.
                </p>
              </section>

              <section id="changes">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-4">10. Changes to Terms</h3>
                <p className="text-[#4A4A4A] leading-relaxed">
                  HireMitra reserves the right to update these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the platform following changes constitutes your acceptance of the new terms. It is your responsibility to review these terms periodically for updates.
                </p>
              </section>

              {/* Contact Section */}
              <section className="mt-12 p-8 bg-[#FFF4E5] rounded-lg">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-4">Questions About These Terms?</h3>
                <p className="text-[#4A4A4A] leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="space-y-2 text-[#4A4A4A]">
                  <p><strong>Email:</strong> legal@hiremitra.com</p>
                  <p><strong>Address:</strong> 123 Business Street, New York, NY 10001</p>
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
              <Link href="/privacy">
                <span className="hover:text-[#FF7A00] cursor-pointer">Privacy Policy</span>
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
