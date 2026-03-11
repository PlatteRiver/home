import React from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SITE_URL = 'https://www.platte-river.com'

const Terms = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Terms and Conditions | Platte River Analytics</title>
        <meta name="description" content="Terms and conditions for use of the Platte River Analytics website. GIS consulting and location intelligence services." />
        <link rel="canonical" href={SITE_URL + '/terms'} />
        <meta property="og:title" content="Terms and Conditions | Platte River Analytics" />
        <meta property="og:url" content={SITE_URL + '/terms'} />
        <meta property="og:description" content="Terms and conditions for use of the Platte River Analytics website." />
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms and Conditions</h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Terms of use for the Platte River Analytics website.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-gray-700 leading-relaxed space-y-8">
              <p className="text-sm text-gray-500 border-b border-gray-200 pb-4 mb-6">
                <strong>Last updated:</strong> March 2025
              </p>
              <p className="text-sm text-gray-500">
                These terms may be updated from time to time; the current version will be posted on this page.
              </p>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Acceptance of Terms</h2>
                <p>
                  By accessing or using the Platte River Analytics website, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use this website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Services</h2>
                <p>
                  Platte River Analytics provides GIS consulting, location intelligence, interactive mapping, site selection, geospatial strategy, and related services. The content on this website is for general information only. Specific engagements are governed by separate agreements between you and Platte River Analytics.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Use of Website</h2>
                <p className="mb-3">
                  You agree to use this website only for lawful purposes. You may not:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the site in any way that violates applicable laws or regulations</li>
                  <li>Attempt to gain unauthorized access to our systems, other users’ accounts, or any data</li>
                  <li>Use automated means (e.g., scraping, bots) to collect or use site content without our prior written consent</li>
                  <li>Copy, reproduce, or distribute site content in a manner that infringes our or others’ intellectual property rights</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Intellectual Property</h2>
                <p>
                  All content on this website, including text, graphics, logos, and materials, is owned by or licensed to Platte River Analytics and is protected by copyright, trademark, and other intellectual property laws. You may view and use the site for personal, non-commercial purposes only. You may not copy, modify, distribute, or create derivative works without our prior written permission.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Disclaimers</h2>
                <p>
                  The information on this website is provided for general informational purposes only. It does not constitute professional, legal, financial, or other advice. For advice specific to your situation, please engage Platte River Analytics or another qualified provider. GIS, mapping, and other technical information on the site are provided “as is” without warranty of any kind. We do not guarantee the accuracy, completeness, or suitability of any content for any particular purpose.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by applicable law, Platte River Analytics and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or data, arising out of or in connection with your use of this website or any content thereon. Our total liability for any claims arising from your use of the site shall not exceed the amount you paid to us, if any, in the twelve months preceding the claim, or one hundred U.S. dollars, whichever is greater.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Indemnification</h2>
                <p>
                  You agree to indemnify, defend, and hold harmless Platte River Analytics and its officers, directors, employees, and agents from and against any claims, damages, losses, liabilities, and expenses (including reasonable attorneys’ fees) arising out of or related to your use of the website, your violation of these terms, or your violation of any third-party rights.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Governing Law and Venue</h2>
                <p>
                  These Terms and Conditions shall be governed by and construed in accordance with the laws of the State of Illinois, United States, without regard to its conflict of law provisions. Any dispute arising from these terms or your use of the website shall be brought exclusively in the state or federal courts located in Illinois, and you consent to the personal jurisdiction of such courts.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Changes</h2>
                <p>
                  We may update these Terms and Conditions from time to time. The “Last updated” date at the top of this page will reflect the most recent version. Your continued use of the website after changes are posted constitutes your acceptance of the updated terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Contact</h2>
                <p>
                  For questions about these Terms and Conditions, contact us at{' '}
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

export default Terms
