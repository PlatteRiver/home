import React from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SITE_URL = 'https://www.platte-river.com'

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Privacy Policy | Platte River Analytics</title>
        <meta name="description" content="Privacy policy for Platte River Analytics. How we collect, use, and protect your information when you use our website and contact forms." />
        <link rel="canonical" href={SITE_URL + '/privacy'} />
        <meta property="og:title" content="Privacy Policy | Platte River Analytics" />
        <meta property="og:url" content={SITE_URL + '/privacy'} />
        <meta property="og:description" content="How we collect, use, and protect your information when you use our website and contact forms." />
      </Helmet>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-[#203b54] via-[#2a4a6b] to-[#1a2f44] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)' }}></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                How we collect, use, and protect your information.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-gray-700 leading-relaxed space-y-8">
              <p className="text-sm text-gray-500 border-b border-gray-200 pb-4 mb-6">
                <strong>Last updated:</strong> March 2026
              </p>
              <p className="text-sm text-gray-500">
                This policy may be updated from time to time; we will post the current version on this page.
              </p>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Who We Are</h2>
                <p>
                  Platte River Analytics (“we,” “us,” or “our”) is a GIS consulting and location intelligence company. For privacy-related questions, contact us at{' '}
                  <a href="mailto:support@platte-river.com" className="text-[#203b54] underline hover:text-[#1a2f44]">support@platte-river.com</a>
                  {' '}or at our address: Monticello, IL 61856.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Data We Collect</h2>
                <p className="mb-3">
                  We collect information you provide when you:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Submit our contact form (e.g., name, email, company, message)</li>
                  <li>Register for training (e.g., name, email, company, position, city/state, class selection)</li>
                </ul>
                <p className="mt-3">
                  We may also collect general usage data (such as IP address or browser type) in connection with operating our website; we may use analytics or similar tools in the future, and will describe them in this policy.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">How We Use Your Information</h2>
                <p>
                  We use the information you provide to respond to your inquiries, provide requested services, send information you have asked for, and improve our services. We do not sell your personal data.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Legal Basis</h2>
                <p>
                  We process your data based on your consent when you submit a form, and where applicable on our legitimate interests in operating our business and communicating with you.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Sharing of Data</h2>
                <p>
                  Form submissions are processed by Netlify (our form hosting provider). We do not sell or rent your personal data. We may share data with third parties only as required by law, with your consent, or with service providers who assist us under strict confidentiality obligations.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Retention</h2>
                <p>
                  We retain your data for as long as needed to fulfill the purposes described in this policy or as required by applicable law. You may request deletion of your data by contacting us.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Cookies</h2>
                <p>
                  We use cookies and similar technologies that are essential for the operation of our website. We may use analytics or other cookies in the future; we will update this policy and, where required, obtain consent as applicable.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Your Rights</h2>
                <p className="mb-3">
                  Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data, or to object to or restrict certain processing. To exercise these rights, contact us at{' '}
                  <a href="mailto:support@platte-river.com" className="text-[#203b54] underline hover:text-[#1a2f44]">support@platte-river.com</a>.
                </p>
                <p>
                  If you are in a jurisdiction that provides a right to lodge a complaint with a supervisory authority, you may do so in accordance with local law.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Security</h2>
                <p>
                  We take reasonable measures to protect your personal data against unauthorized access, loss, or misuse. No method of transmission or storage is completely secure; we encourage you to use caution when submitting sensitive information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">International Transfer</h2>
                <p>
                  Your data may be processed in the United States. If you are located elsewhere, you consent to such transfer by using our site and providing your information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page will reflect the most recent version. Your continued use of our website after changes are posted constitutes your acceptance of the updated policy.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Contact</h2>
                <p>
                  For any privacy-related questions or requests, contact us at{' '}
                  <a href="mailto:support@platte-river.com" className="text-[#203b54] underline hover:text-[#1a2f44]">support@platte-river.com</a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Privacy
