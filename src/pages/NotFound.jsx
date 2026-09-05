import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Page Not Found | Platte River Analytics</title>
        <meta
          name="description"
          content="This page does not exist. Return to Platte River Analytics for GIS consulting, GIS Kickstart, training, and location intelligence."
        />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="Page Not Found | Platte River Analytics" />
        <meta
          property="og:description"
          content="This page does not exist. Explore GIS consulting, Kickstart, and training from Platte River Analytics."
        />
      </Helmet>
      <Navbar />
      <main>
        <section className="py-16 md:py-20 bg-gradient-to-br from-[#203b54] via-[#2a4a6b] to-[#1a2f44] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              }}
            ></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-sm font-semibold tracking-widest uppercase text-white/70 mb-3">404</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Page not found</h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                That URL is not a page on this site. Use the links below to get back to GIS consulting, Kickstart, or training.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center">
              <Link
                to="/"
                className="inline-flex justify-center items-center px-6 py-3 rounded-lg bg-[#203b54] text-white font-semibold hover:bg-[#1a2f44] transition-colors"
              >
                Home
              </Link>
              <Link
                to="/gis-kickstart"
                className="inline-flex justify-center items-center px-6 py-3 rounded-lg border-2 border-[#203b54] text-[#203b54] font-semibold hover:bg-[#f5f7f9] transition-colors"
              >
                GIS Kickstart
              </Link>
              <Link
                to="/training"
                className="inline-flex justify-center items-center px-6 py-3 rounded-lg border-2 border-[#203b54] text-[#203b54] font-semibold hover:bg-[#f5f7f9] transition-colors"
              >
                Training
              </Link>
              <Link
                to="/blog"
                className="inline-flex justify-center items-center px-6 py-3 rounded-lg border-2 border-[#203b54] text-[#203b54] font-semibold hover:bg-[#f5f7f9] transition-colors"
              >
                Insights
              </Link>
              <Link
                to="/#contact"
                className="inline-flex justify-center items-center px-6 py-3 rounded-lg border-2 border-[#203b54] text-[#203b54] font-semibold hover:bg-[#f5f7f9] transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default NotFound
