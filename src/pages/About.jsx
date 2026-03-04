import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SITE_URL = 'https://www.platte-river.com'

const About = () => {
  const [isVisible, setIsVisible] = useState({})
  const aboutRef = useRef(null)
  const missionRef = useRef(null)
  const awardsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section-id')
            if (sectionId) setIsVisible((prev) => ({ ...prev, [sectionId]: true }))
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )
    ;[aboutRef, missionRef, awardsRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>About Us | Esri Partner | Platte River Analytics</title>
        <meta name="description" content="Award-winning Esri Business Partner. Location analytics, spatial business intelligence, and ArcGIS System Ready Specialty for energy and GIS consulting." />
        <link rel="canonical" href={SITE_URL + '/about'} />
        <meta property="og:title" content="About Us | Esri Partner | Platte River Analytics" />
        <meta property="og:url" content={SITE_URL + '/about'} />
        <meta property="og:description" content="Award-winning Esri Business Partner promoting business development through location analytics and spatial business intelligence." />
      </Helmet>
      <Navbar />
      <main>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#203b54] via-[#2a4a6b] to-[#1a2f44] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Platte River Analytics</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Award-winning Esri Business Partner promoting business development through location analytics and spatial business intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section
        ref={aboutRef}
        data-section-id="about"
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${isVisible['about'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Platte River Analytics is an award-winning Esri Business Partner that promotes business development with the utilization of location analytics and spatial business intelligence. We assist energy companies with complex GIS data solutions and help solve important business questions with the aid of interactive mapping and dashboards.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                By deploying location analysis, Platte River assists organizations with analyzing internal data, establishing dynamic mapping and dashboard analysis, and extracting business insights. Platte River has been awarded an ArcGIS System Ready Specialty from Esri, given to Esri Business Partners who offer technical expertise with solutions, services and content using the latest ArcGIS Technology.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#f5f7f9] to-[#e8ebee] rounded-2xl p-8 shadow-lg">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#203b54] rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-map-marked-alt text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Location Intelligence</h3>
                    <p className="text-gray-600">Convert location intelligence into a competitive edge with our spatial analytics expertise.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#203b54] rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-chart-bar text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Interactive Dashboards</h3>
                    <p className="text-gray-600">Dynamic mapping and dashboard analysis for data-driven decision making.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#203b54] rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-cogs text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Complex GIS Solutions</h3>
                    <p className="text-gray-600">Expert solutions for energy, real estate, broadband, and economic development.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section
        ref={missionRef}
        data-section-id="mission"
        className="py-20 bg-gradient-to-br from-[#f5f7f9] via-white to-[#f0f2f4]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center max-w-3xl mx-auto transition-all duration-700 ${isVisible['mission'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              If you are looking to convert your location intelligence into a competitive edge, we are here to help. Our team brings deep expertise across the Esri ecosystem to deliver GIS solutions that transform how organizations understand and leverage spatial data.
            </p>
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#203b54] mb-2">10+</div>
                <div className="text-sm text-gray-600">Years of Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#203b54] mb-2">50+</div>
                <div className="text-sm text-gray-600">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#203b54] mb-2">4</div>
                <div className="text-sm text-gray-600">Industries Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section
        ref={awardsRef}
        data-section-id="awards"
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible['awards'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
            <p className="text-lg text-gray-600">Recognized for excellence in GIS consulting and Esri solutions.</p>
          </div>
          <div className={`grid md:grid-cols-3 gap-8 transition-all duration-700 delay-200 ${isVisible['awards'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {[
              { name: 'Esri Partner Network Bronze', image: '/awards/esri-partner-network-bronze.png', description: 'Recognized as a Bronze Partner in the Esri Partner Network' },
              { name: 'ArcGIS System Ready Specialty', image: '/awards/arcgis-system-ready-specialty.png', description: 'Certified ArcGIS System Ready Specialty partner' },
              { name: 'Esri Partner Conference 2024', image: '/awards/esri-partner-conference-2024.png', description: 'Award winner at the 2024 Esri Partner Conference' },
            ].map((award, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="h-32 flex items-center justify-center mb-4 rounded-lg bg-gradient-to-br from-[#203b54] to-[#2a4a6b] p-4">
                  <img src={award.image} alt={award.name} width="200" height="128" className="max-h-full max-w-full object-contain" />
                </div>
                <h3 className="text-gray-900 font-semibold text-lg mb-2">{award.name}</h3>
                <p className="text-gray-600 text-sm">{award.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#203b54] to-[#2a4a6b] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8">
            Visit our detailed services page for more GIS details and examples, or contact us to discuss your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/#services"
              className="bg-white text-[#203b54] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              View Services
            </Link>
            <Link
              to="/#contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  )
}

export default About
