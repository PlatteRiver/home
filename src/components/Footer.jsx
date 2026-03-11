import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <img
              src="/platte_river_analytics_logo.jpg"
              alt="Platte River Analytics Logo"
              className="h-8 w-auto mb-4"
              width="200"
              height="90"
            />
            <p className="text-gray-400 text-sm mb-4">
              Location intelligence and GIS consulting for better business decisions.
            </p>
            <div className="text-gray-400 text-sm space-y-1">
              <p><i className="fas fa-envelope mr-2"></i><a href="mailto:support@platte-river.com" className="hover:text-white transition-colors">support@platte-river.com</a></p>
              <p><i className="fas fa-map-marker-alt mr-2"></i>Monticello, IL 61856</p>
            </div>
          </div>

          <div>
            <h2 className="text-white font-semibold mb-4 text-base">Services</h2>
            <ul className="space-y-2 text-sm">
              <li><Link to="/#services" className="hover:text-white transition-colors">GIS Consulting</Link></li>
              <li><Link to="/#services" className="hover:text-white transition-colors">Interactive Mapping</Link></li>
              <li><Link to="/#services" className="hover:text-white transition-colors">Data Collection</Link></li>
              <li><Link to="/#services" className="hover:text-white transition-colors">Site Selection</Link></li>
              <li><Link to="/#services" className="hover:text-white transition-colors">Geospatial Strategy</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold mb-4 text-base">Industries</h2>
            <ul className="space-y-2 text-sm">
              <li><Link to="/#industries" className="hover:text-white transition-colors">Broadband</Link></li>
              <li><Link to="/#industries" className="hover:text-white transition-colors">Energy</Link></li>
              <li><Link to="/#industries" className="hover:text-white transition-colors">Real Estate</Link></li>
              <li><Link to="/#industries" className="hover:text-white transition-colors">Economic Development</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold mb-4 text-base">Connect</h2>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/acrevision" className="hover:text-white transition-colors">AcreVision</Link></li>
              <li><Link to="/training" className="hover:text-white transition-colors">Training</Link></li>
              <li><Link to="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.linkedin.com/company/platte-river-analytics/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors transform hover:scale-125 duration-300">
                <i className="fab fa-linkedin text-xl" aria-hidden="true"></i>
                <span className="sr-only">Platte River Analytics on LinkedIn</span>
              </a>
              <a href="https://www.instagram.com/platteriveranalytics/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors transform hover:scale-125 duration-300">
                <i className="fab fa-instagram text-xl" aria-hidden="true"></i>
                <span className="sr-only">Platte River Analytics on Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <span>&copy; {new Date().getFullYear()} Platte River Analytics. All rights reserved.</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <Link to="/privacy" className="inline-block py-2 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <Link to="/terms" className="inline-block py-2 hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
