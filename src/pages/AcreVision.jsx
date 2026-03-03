import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const AcreVision = () => {
  const [isVisible, setIsVisible] = useState({})
  const overviewRef = useRef(null)
  const featuresRef = useRef(null)
  const videoRef = useRef(null)
  const videoElRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section-id')
            if (sectionId) setIsVisible((prev) => ({ ...prev, [sectionId]: true }))
            if (sectionId === 'video' && videoElRef.current) {
              videoElRef.current.play().catch(() => {})
            }
          } else {
            const sectionId = entry.target.getAttribute('data-section-id')
            if (sectionId === 'video' && videoElRef.current) {
              videoElRef.current.pause()
            }
          }
        })
      },
      { threshold: 0.25, rootMargin: '0px 0px -50px 0px' }
    )
    ;[overviewRef, featuresRef, videoRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current)
    })
    return () => observer.disconnect()
  }, [])

  const features = [
    { icon: 'fa-road', title: 'Road Analysis', description: 'Automatically factors in road setbacks and access requirements when calculating buildable acreage.' },
    { icon: 'fa-building', title: 'Building Detection', description: 'Identifies existing structures and applies appropriate buffers to determine usable land area.' },
    { icon: 'fa-water', title: 'Floodplain Assessment', description: 'Integrates FEMA floodplain data to exclude high-risk zones from your buildable acreage calculations.' },
    { icon: 'fa-leaf', title: 'Wetland Analysis', description: 'Overlays wetland boundaries to ensure environmental compliance and accurate site assessment.' },
    { icon: 'fa-mountain', title: 'Slope Calculation', description: 'Evaluates terrain slope to identify areas suitable for development based on grade thresholds.' },
    { icon: 'fa-puzzle-piece', title: 'Esri Integration', description: 'Works seamlessly with Esri Experience Builder and all standard out-of-the-box widgets and tools.' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#203b54] via-[#2a4a6b] to-[#1a2f44] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
              <i className="fas fa-bolt mr-2"></i>Product
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">AcreVision</h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 max-w-3xl mx-auto">
              Buildable acreage analysis widget designed specifically for energy companies using Esri's Enterprise Portal or ArcGIS Online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#demo"
                className="inline-block bg-white text-[#203b54] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <i className="fas fa-play-circle mr-2"></i>Watch Demo
              </a>
              <Link
                to="/#contact"
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                Request a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section
        ref={overviewRef}
        data-section-id="overview"
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${isVisible['overview'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Streamline Your Site Selection</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                AcreVision streamlines site selection by analyzing parcels or sets of parcels based on critical factors such as roads, existing buildings, floodplains, wetlands, slope, and more. The tool generates a detailed output, providing a comprehensive buildable acreage analysis that integrates seamlessly into your workflows.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                AcreVision is fully compatible with Esri Experience Builder and works alongside all standard out-of-the-box widgets and tools, enhancing your GIS environment without disruption. Designed for ease of use and flexibility, with the option to request upgrades at any time.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-[#f5f7f9] rounded-full text-sm font-medium text-[#203b54] border border-gray-200">
                  <i className="fas fa-check-circle mr-1 text-green-500"></i>Esri Enterprise Portal
                </span>
                <span className="px-4 py-2 bg-[#f5f7f9] rounded-full text-sm font-medium text-[#203b54] border border-gray-200">
                  <i className="fas fa-check-circle mr-1 text-green-500"></i>ArcGIS Online
                </span>
                <span className="px-4 py-2 bg-[#f5f7f9] rounded-full text-sm font-medium text-[#203b54] border border-gray-200">
                  <i className="fas fa-check-circle mr-1 text-green-500"></i>Experience Builder
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#203b54] to-[#2a4a6b] rounded-2xl p-10 text-center shadow-2xl">
              <i className="fas fa-map text-white text-8xl mb-6 opacity-80"></i>
              <h3 className="text-2xl font-bold text-white mb-3">Comprehensive Analysis</h3>
              <p className="text-white/80 text-lg">Automated buildable acreage calculations with precision and confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        ref={featuresRef}
        data-section-id="features"
        className="py-20 bg-gradient-to-br from-[#f5f7f9] via-white to-[#f0f2f4]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Capabilities</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">AcreVision analyzes multiple constraint layers to deliver accurate buildable acreage reports.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2 ${isVisible['features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-[#203b54] rounded-lg flex items-center justify-center mb-5">
                  <i className={`fas ${feature.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Demo */}
      <section
        id="demo"
        ref={videoRef}
        data-section-id="video"
        className="py-20 bg-white scroll-mt-24"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible['video'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">See AcreVision in Action</h2>
            <p className="text-lg text-gray-600">Watch how AcreVision streamlines buildable acreage analysis within your Esri environment.</p>
          </div>
          <div className={`rounded-2xl overflow-hidden shadow-2xl border border-gray-200 transition-all duration-700 delay-200 ${isVisible['video'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <video
              ref={videoElRef}
              controls
              className="w-full"
              poster=""
              preload="metadata"
              playsInline
              muted
            >
              <source src="/acrevision-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#203b54] to-[#2a4a6b] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started with AcreVision?</h2>
          <p className="text-xl text-white/90 mb-8">
            This tool will be an essential asset for your organization's site selection analysis, helping you make informed decisions with precision and confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/#contact"
              className="bg-white text-[#203b54] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AcreVision
