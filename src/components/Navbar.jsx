import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navLinkClass = (path) =>
    `px-3 py-2 text-sm font-medium transition-all duration-300 relative group ${
      isActive(path)
        ? 'text-[#203b54] border-b-2 border-[#203b54]'
        : 'text-gray-700 hover:text-[#203b54]'
    }`

  const mobileLinkClass = (path) =>
    `block px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors font-medium ${
      isActive(path)
        ? 'text-[#203b54] border-l-4 border-[#203b54]'
        : 'text-gray-700 hover:text-[#203b54]'
    }`

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center" style={{ minHeight: '5.625rem', padding: '0.5rem 0' }}>
          <div className="flex items-center">
            <Link
              to="/"
              className="flex-shrink-0 flex items-center"
              onClick={() => {
                if (location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
              aria-label="Platte River Analytics home"
            >
              <img
                src="/platte_river_analytics_logo.jpg"
                alt="Platte River Analytics Logo"
                className="w-auto transition-transform hover:scale-105 duration-300"
                style={{ height: '5.625rem' }}
                width="200"
                height="90"
              />
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/about" className={navLinkClass('/about')}>
                About
                {!isActive('/about') && <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#203b54] transition-all duration-300 group-hover:w-full"></span>}
              </Link>
              <Link to="/acrevision" className={navLinkClass('/acrevision')}>
                AcreVision
                {!isActive('/acrevision') && <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#203b54] transition-all duration-300 group-hover:w-full"></span>}
              </Link>
              <a href={location.pathname === '/' ? '#services' : '/#services'} className="text-gray-700 hover:text-[#203b54] px-3 py-2 text-sm font-medium transition-all duration-300 relative group">
                Services
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#203b54] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href={location.pathname === '/' ? '#industries' : '/#industries'} className="text-gray-700 hover:text-[#203b54] px-3 py-2 text-sm font-medium transition-all duration-300 relative group">
                Industries
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#203b54] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <Link to="/training" className={navLinkClass('/training')}>
                Training
                {!isActive('/training') && <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#203b54] transition-all duration-300 group-hover:w-full"></span>}
              </Link>
              <Link to="/blog" className={navLinkClass('/blog')}>
                Insights
                {!isActive('/blog') && <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#203b54] transition-all duration-300 group-hover:w-full"></span>}
              </Link>
              <Link to="/#contact" className="bg-[#203b54] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#1a2f44] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-[#203b54] focus:outline-none focus:text-[#203b54] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <i className="fas fa-times text-2xl"></i>
              ) : (
                <i className="fas fa-bars text-2xl"></i>
              )}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-[420px] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 pb-6 space-y-2 border-t border-gray-200">
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass('/about')}>
              About
            </Link>
            <Link to="/acrevision" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass('/acrevision')}>
              AcreVision
            </Link>
            <a href="/#services" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-700 hover:text-[#203b54] hover:bg-gray-50 rounded-lg transition-colors font-medium">
              Services
            </a>
            <a href="/#industries" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-700 hover:text-[#203b54] hover:bg-gray-50 rounded-lg transition-colors font-medium">
              Industries
            </a>
            <Link to="/training" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass('/training')}>
              Training
            </Link>
            <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass('/blog')}>
              Insights
            </Link>
            <Link
              to="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 bg-[#203b54] text-white rounded-lg hover:bg-[#1a2f44] transition-colors font-medium text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
