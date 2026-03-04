import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Footer from '../components/Footer'

const SITE_URL = 'https://www.platte-river.com'

const Home = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState({})
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [formTouched, setFormTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const formMountTimeRef = useRef(null)
  const contactStatusRef = useRef(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const industriesRef = useRef(null)
  const expertiseRef = useRef(null)
  const awardsRef = useRef(null)
  const partnersRef = useRef(null)
  const customersRef = useRef(null)
  const insightsRef = useRef(null)

  // Scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (window.scrollY / windowHeight) * 100
      setScrollProgress(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section-id')
          if (sectionId) {
            setIsVisible(prev => ({ ...prev, [sectionId]: true }))
          }
        }
      })
    }, observerOptions)

    const refs = [
      { ref: heroRef, id: 'hero' },
      { ref: servicesRef, id: 'services' },
      { ref: industriesRef, id: 'industries' },
      { ref: expertiseRef, id: 'expertise' },
      { ref: awardsRef, id: 'awards' },
      { ref: partnersRef, id: 'partners' },
      { ref: customersRef, id: 'customers' },
      { ref: insightsRef, id: 'insights' }
    ]
    
    refs.forEach(({ ref, id }) => {
      if (ref.current) {
        ref.current.setAttribute('data-section-id', id)
        observer.observe(ref.current)
      }
    })

    return () => observer.disconnect()
  }, [])

  // Scroll to success/error message after submit
  useEffect(() => {
    if (submitStatus === 'success' || submitStatus === 'error') {
      contactStatusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [submitStatus])

  // Smooth scroll for anchor links (event delegation so child elements like spans are handled)
  useEffect(() => {
    const handleHashClick = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const href = link.getAttribute('href')
      if (href === '#') return
      e.preventDefault()
      const targetId = href.slice(1)
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.history.replaceState(null, '', '#' + targetId)
      }
    }
    document.addEventListener('click', handleHashClick, true)
    return () => document.removeEventListener('click', handleHashClick, true)
  }, [])

  // Form validation
  const validateField = (name, value) => {
    let error = ''
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          error = 'This field is required'
        } else if (value.trim().length < 2) {
          error = 'Must be at least 2 characters'
        }
        break
      case 'email':
        if (!value.trim()) {
          error = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address'
        }
        break
      case 'company':
        if (!value.trim()) {
          error = 'Company name is required'
        }
        break
      case 'message':
        if (!value.trim()) {
          error = 'Please leave us a message'
        } else if (value.trim().length < 10) {
          error = 'Message must be at least 10 characters'
        }
        break
      default:
        break
    }
    return error
  }

  // Handle input change with auto-formatting
  const handleInputChange = (e) => {
    const { name, value } = e.target
    let formattedValue = value

    // Auto-formatting for names (capitalize first letter)
    if (name === 'firstName' || name === 'lastName') {
      formattedValue = value.charAt(0).toUpperCase() + value.slice(1)
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }))
    
    // Real-time validation
    if (formTouched[name]) {
      const error = validateField(name, formattedValue)
      setFormErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  // Handle blur for validation
  const handleBlur = (e) => {
    const { name, value } = e.target
    setFormTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setFormErrors(prev => ({ ...prev, [name]: error }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const log = (msg, data) => {
      if (data !== undefined) console.log('[ContactForm]', msg, data)
      else console.log('[ContactForm]', msg)
    }

    log('Submit started')

    // Honeypot: reject if bot-field or website (hidden trap) was filled
    const botField = (form.elements['bot-field'] && form.elements['bot-field'].value) || ''
    const websiteTrap = (form.elements['website'] && form.elements['website'].value) || ''
    log('Honeypot check', { botFieldLength: botField.length, botFieldFilled: botField.trim() !== '', websiteTrapLength: websiteTrap.length, websiteTrapFilled: websiteTrap.trim() !== '' })
    if (botField.trim() !== '' || websiteTrap.trim() !== '') {
      log('BLOCKED: Honeypot filled (silent reject)')
      setSubmitStatus('success') // silent reject: show success to bot
      return
    }
    // Time-based: reject if form submitted in under 2 seconds (likely bot)
    const now = Date.now()
    const mountTime = formMountTimeRef.current
    const elapsed = mountTime != null ? now - mountTime : null
    log('Time check', { formMountTime: mountTime, elapsedMs: elapsed, rejected: elapsed != null && elapsed < 2000 })
    if (mountTime != null && now - mountTime < 2000) {
      log('BLOCKED: Submitted too fast (silent reject)')
      setSubmitStatus('success')
      return
    }

    // Mark all fields as touched
    const touched = Object.keys(formData).reduce((acc, key) => {
      if (!['bot-field', 'website'].includes(key)) acc[key] = true
      return acc
    }, {})
    setFormTouched(touched)

    // Validate all fields (exclude honeypots)
    const errors = {}
    Object.keys(formData).forEach(key => {
      if (['bot-field', 'website'].includes(key)) return
      const error = validateField(key, formData[key])
      if (error) errors[key] = error
    })
    setFormErrors(errors)
    log('Validation', { errorCount: Object.keys(errors).length, errors: Object.keys(errors).length ? errors : null })

    // If no errors, submit
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true)
      setSubmitStatus(null)

      const formDataToSubmit = new FormData(form)
      const bodyString = new URLSearchParams(formDataToSubmit).toString()
      const bodyKeys = [...formDataToSubmit.keys()]
      log('Submitting to Netlify', { bodyKeys, bodyLength: bodyString.length, formName: form.getAttribute('name') })
      if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        log('NOTE: You are on localhost. Netlify forms only work when deployed to Netlify or when using "netlify dev".')
      }

      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: bodyString,
          mode: 'same-origin'
        })

        log('Response received', { ok: response.ok, status: response.status, statusText: response.statusText, url: response.url, type: response.type })

        if (response.ok) {
          log('SUCCESS')
          setSubmitStatus('success')
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            company: '',
            message: ''
          })
          setFormTouched({})
          setFormErrors({})
          form.reset()
        } else {
          const responseText = await response.text()
          log('FAIL: Non-OK response', { status: response.status, statusText: response.statusText, bodyPreview: responseText.slice(0, 500), bodyLength: responseText.length })
          if (responseText.length > 500) log('FAIL: Response body (rest)', responseText.slice(500, 1500))
          setSubmitStatus('error')
        }
      } catch (error) {
        console.error('[ContactForm] FAIL: Network or other error', error)
        log('FAIL: Exception', { name: error?.name, message: error?.message, stack: error?.stack })
        setSubmitStatus('error')
      } finally {
        setIsSubmitting(false)
      }
    } else {
      log('Submit aborted: validation errors')
      const firstError = Object.keys(errors)[0]
      if (firstError && typeof document !== 'undefined') {
        const el = document.getElementById(firstError)
        if (el) el.focus()
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Platte River Analytics | Enterprise GIS Consulting & Location Intelligence</title>
        <meta name="description" content="Platte River Analytics delivers Fortune 500–grade GIS consulting, Esri platform implementation, and location intelligence. Site selection, interactive mapping, dashboards, and geospatial strategy for energy, broadband, and real estate." />
        <link rel="canonical" href={SITE_URL + '/'} />
        <meta property="og:title" content="Platte River Analytics | Enterprise GIS Consulting & Location Intelligence" />
        <meta property="og:url" content={SITE_URL + '/'} />
        <meta property="og:description" content="Expert GIS consulting, Esri implementation, and location intelligence for energy, broadband, and real estate. Site selection, dashboards, and geospatial strategy." />
      </Helmet>
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#203b54] to-[#97a3b1] z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center" style={{ minHeight: '5.625rem', padding: '0.5rem 0' }}>
            <div className="flex items-center">
              <Link
                to="/"
                className="flex-shrink-0 flex items-center"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link to="/about" className="text-gray-700 hover:text-[#203b54] px-3 py-2 text-sm font-medium transition-all duration-300 relative group">
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#203b54] transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/acrevision" className="text-gray-700 hover:text-[#203b54] px-3 py-2 text-sm font-medium transition-all duration-300 relative group">
                  AcreVision
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#203b54] transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <a href="#services" className="text-gray-700 hover:text-[#203b54] px-3 py-2 text-sm font-medium transition-all duration-300 relative group">
                  Services
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#203b54] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#industries" className="text-gray-700 hover:text-[#203b54] px-3 py-2 text-sm font-medium transition-all duration-300 relative group">
                  Industries
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#203b54] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <Link to="/training" className="text-gray-700 hover:text-[#203b54] px-3 py-2 text-sm font-medium transition-all duration-300 relative group">
                  Training
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#203b54] transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/blog" className="text-gray-700 hover:text-[#203b54] px-3 py-2 text-sm font-medium transition-all duration-300 relative group">
                  Insights
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#203b54] transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <a href="#contact" className="bg-[#203b54] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#1a2f44] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  Contact Us
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
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

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="py-4 space-y-2 border-t border-gray-200">
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:text-[#203b54] hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                About
              </Link>
              <Link
                to="/acrevision"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:text-[#203b54] hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                AcreVision
              </Link>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:text-[#203b54] hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                Services
              </a>
              <a
                href="#industries"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:text-[#203b54] hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                Industries
              </a>
              <Link
                to="/training"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:text-[#203b54] hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                Training
              </Link>
              <Link
                to="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:text-[#203b54] hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                Insights
              </Link>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 bg-[#203b54] text-white rounded-lg hover:bg-[#1a2f44] transition-colors font-medium text-center"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main>
      {/* Hero Section with Animated Company Name */}
      <section 
        ref={heroRef}
        className="relative bg-gradient-to-br from-[#f5f7f9] via-white to-[#f0f2f4] py-8 lg:py-10 overflow-hidden flex items-center"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23203b54' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'mapPattern 20s linear infinite'
          }}></div>
        </div>

        {/* Animated Company Name - Sweeping in like PLA letters did */}
        <div className={`absolute top-4 left-4 md:left-6 lg:left-8 pointer-events-none z-0 flex justify-start items-center ${isVisible['hero'] ? 'hero-section-visible' : ''}`} style={{ overflow: 'visible', maxWidth: '50%' }}>
          <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4 hero-company-words-row">
            {/* Word: Platte */}
            <div className="hero-company-word hero-company-word-platte">
              <span className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-black text-[#203b54] select-none hero-company-word-text" style={{ fontFamily: "'Inter', sans-serif" }}>
                Platte
              </span>
            </div>
            {/* Word: River */}
            <div className="hero-company-word hero-company-word-river">
              <span className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-black text-[#97a3b1] select-none hero-company-word-text" style={{ fontFamily: "'Inter', sans-serif" }}>
                River
              </span>
            </div>
            {/* Word: Analytics */}
            <div className="hero-company-word hero-company-word-analytics">
              <span className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-black text-[#203b54] select-none hero-company-word-text" style={{ fontFamily: "'Inter', sans-serif" }}>
                Analytics
              </span>
            </div>
          </div>
        </div>

        {/* Floating particles/geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#203b54] rounded-full opacity-20 animate-float"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-10 items-center">
            {/* Left Column - Text Content */}
            <div className={`relative ${isVisible['hero'] ? 'hero-section-visible' : ''}`}>
              {/* Animated underline effect */}
              <div className="absolute -top-4 left-0 w-1 h-1 bg-gradient-to-r from-[#203b54] to-[#97a3b1] hero-underline"></div>
              
              <div className={`hero-content ${isVisible['hero'] ? 'hero-visible' : ''}`}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight hero-title mt-20 md:mt-24 lg:mt-28">
                  <span className="inline-block hero-word-1">Location</span>
                  <br />
                  <span className="inline-block hero-word-2">Intelligence</span>
                  <br />
                  <span className="inline-block hero-word-3 bg-gradient-to-r from-[#203b54] to-[#97a3b1] bg-clip-text text-transparent">
                    & GIS Consulting
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed hero-description">
                  Transform spatial data into strategic decisions. Expert GIS consulting, interactive mapping, and Esri-based solutions for organizations that need location intelligence.
                </p>
                <p className="text-sm font-semibold text-[#203b54] mb-6">
                  Esri Business Partner specializing in energy and broadband.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 hero-buttons">
                  <a href="#contact" className="bg-[#203b54] text-white px-7 py-3.5 rounded-lg text-base font-semibold hover:bg-[#1a2f44] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 duration-300 group relative overflow-hidden">
                    <span className="relative z-10 flex items-center">
                      Request a Consultation
                      <i className="fas fa-arrow-right ml-2 inline-block transform group-hover:translate-x-1 transition-transform"></i>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#97a3b1] to-[#203b54] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                  <a href="#services" className="bg-white text-[#203b54] border-2 border-[#203b54] px-7 py-3.5 rounded-lg text-base font-semibold hover:bg-[#f5f7f9] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 hover:border-[#97a3b1]">
                    Explore Services
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Interactive Map */}
            <div className={`relative hero-map ${isVisible['hero'] ? 'hero-map-visible' : ''}`}>
              {/* Interactive Map Preview with Glassmorphism */}
              <div className="relative group">
                {/* Animated glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#203b54] via-[#97a3b1] to-[#203b54] rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-[#203b54] to-[#97a3b1] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-white/30 transform group-hover:scale-[1.02] transition-transform duration-500">
                  {/* ArcGIS Dashboard Container */}
                  <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#e8ebee] to-[#dde1e5] h-72 md:h-96 shadow-inner">
                    <iframe
                      src="https://platte-river.maps.arcgis.com/apps/dashboards/2fe350aaef24434c9a78bc998a355269"
                      className="w-full h-full border-0"
                      title="ArcGIS Dashboard - Platte River Analytics"
                      allow="geolocation"
                      loading="lazy"
                    ></iframe>
                    {/* Overlay with glassmorphism */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#203b54]/20 via-transparent to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-lg p-4 shadow-xl border border-white/40 transform group-hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                        <span className="text-sm font-bold text-[#203b54]">Live ArcGIS Dashboard</span>
                      </div>
                    </div>
                    {/* Animated scan line effect */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#97a3b1] to-transparent opacity-50 animate-scan"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        id="services" 
        ref={servicesRef}
        className="py-20 bg-white relative scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible['services'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive GIS solutions tailored to your organization's unique needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Cards with Glassmorphism and Enhanced Hover */}
            {[
              { icon: 'fa-map-marked-alt', title: 'GIS Consulting & Training', desc: 'Expert guidance on Esri products, GIS workflows, and technical skill development tailored to your organizational needs.', color: '#203b54' },
              { icon: 'fa-globe', title: 'Interactive Mapping & Dashboards', desc: 'Web-based maps and dashboards that combine spatial and tabular data to answer business questions and support data-driven decisions.', color: '#203b54' },
              { icon: 'fa-mobile-alt', title: 'Data Collection Solutions', desc: 'Implementation of field data collection tools, custom surveys, offline workflows, and photo capture integrated into enterprise systems.', color: '#97a3b1' },
              { icon: 'fa-search-location', title: 'Site Selection & Market Analysis', desc: 'Location-based analysis using demographics, traffic, and spatial datasets to identify optimal sites for broadband, solar, wind, and real estate projects.', color: '#203b54' },
              { icon: 'fa-cogs', title: 'Esri Platform Enhancement', desc: 'Custom application development, enterprise GIS configuration, workflow automation, and staff training to extend Esri platform capabilities.', color: '#97a3b1' },
              { icon: 'fa-chart-line', title: 'Industry-Focused Location Analytics', desc: 'Specialized GIS analytics for sectors like broadband deployment, renewable energy, real estate, and economic development.', color: '#203b54' }
            ].map((service, index) => (
              <div 
                key={index}
                className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 hover:border-[#97a3b1] group transform hover:-translate-y-2 hover:scale-[1.02] ${isVisible['services'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-[#e8ebee] w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <i className={`fas ${service.icon} text-3xl`} style={{ color: service.color }}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#203b54] transition-colors">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>

          {/* Geospatial Strategy – featured */}
          <div
            className={`mt-16 rounded-2xl overflow-hidden border-2 border-[#203b54] bg-gradient-to-br from-[#f5f7f9] to-white shadow-xl transition-all duration-1000 ${isVisible['services'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '600ms' }}
          >
            <div className="p-8 md:p-12 lg:flex lg:items-start lg:gap-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#203b54] w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-route text-white text-2xl"></i>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Geospatial Strategy</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  A geospatial strategy is used to detail how a company or organization is going to utilize GIS in the future. The strategy includes important items like company vision, hardware, software, training and value propositions.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  An important aspect of any geospatial strategy is the <strong>geospatial roadmap</strong>. This roadmap details how a company is going to utilize GIS in the next 1–3 years and includes themes on data, software and training.
                </p>
                <p className="text-gray-600 font-semibold mb-3">Other important questions a geospatial strategy can help answer:</p>
                <ul className="space-y-2 text-gray-700 mb-8">
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-[#203b54] mt-1.5 flex-shrink-0"></i>
                    <span>How will geospatial technology benefit our stakeholders?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-[#203b54] mt-1.5 flex-shrink-0"></i>
                    <span>What is the scope of our GIS aspirations?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-[#203b54] mt-1.5 flex-shrink-0"></i>
                    <span>What is our strategy for data collaboration and sharing?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-[#203b54] mt-1.5 flex-shrink-0"></i>
                    <span>What type of GIS training would benefit everyone at the company?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-[#203b54] mt-1.5 flex-shrink-0"></i>
                    <span>What is our desired software and hardware improvements?</span>
                  </li>
                </ul>
              </div>
              <div className="lg:w-80 flex-shrink-0">
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md">
                  <p className="text-sm font-semibold text-[#203b54] mb-2">Free resource</p>
                  <p className="text-gray-600 text-sm mb-4">
                    Get our geospatial strategy form to start planning your organization’s GIS future.
                  </p>
                  <a
                    href="/Geospatial%20Strategy%20updated.avif"
                    download="Geospatial-Strategy-Form.avif"
                    className="inline-flex items-center justify-center gap-2 w-full bg-[#203b54] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1a2f44] transition-all shadow-md hover:shadow-lg"
                  >
                    <i className="fas fa-file-download" aria-hidden="true"></i>
                    <span>Download the Geospatial Strategy Form</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section 
        id="industries" 
        ref={industriesRef}
        className="py-20 bg-gray-50 relative scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible['industries'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Delivering location intelligence solutions across diverse sectors
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'fa-satellite-dish', title: 'Broadband', desc: 'Deployment planning and network optimization', color: '#203b54' },
              { icon: 'fa-bolt', title: 'Energy', desc: 'Renewable energy site selection and analysis', color: '#97a3b1' },
              { icon: 'fa-building', title: 'Real Estate', desc: 'Market analysis and property intelligence', color: '#203b54' },
              { icon: 'fa-city', title: 'Economic Development', desc: 'Strategic planning and growth analysis', color: '#97a3b1' }
            ].map((industry, index) => (
              <div 
                key={index}
                className={`bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center group transform hover:-translate-y-1 ${isVisible['industries'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <i className={`fas ${industry.icon} text-4xl`} style={{ color: industry.color }}></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{industry.title}</h3>
                <p className="text-gray-600 text-sm">{industry.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section 
        id="expertise" 
        ref={expertiseRef}
        className="py-20 bg-white relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${isVisible['expertise'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose Platte River Analytics?</h2>
              <div className="space-y-6">
                {[
                  { icon: 'fa-check-circle', title: 'Esri Expertise', desc: 'Deep knowledge of Esri ArcGIS platform and ecosystem', color: '#203b54' },
                  { icon: 'fa-check-circle', title: 'Custom Solutions', desc: 'Tailored approaches that fit your specific business needs', color: '#97a3b1' },
                  { icon: 'fa-check-circle', title: 'Proven Results', desc: 'Data-driven outcomes that support strategic decision-making', color: '#203b54' },
                  { icon: 'fa-check-circle', title: 'Comprehensive Support', desc: 'From consultation to implementation and training', color: '#97a3b1' }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start group"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex-shrink-0">
                      <div className="bg-[#e8ebee] rounded-full p-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <i className={`fas ${item.icon} text-xl`} style={{ color: item.color }}></i>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible['expertise'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="bg-gradient-to-br from-gray-50 to-[#f5f7f9] rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop" 
                  alt="Data analytics dashboard" 
                  className="rounded-xl w-full h-auto"
                  width="800"
                  height="600"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section 
        id="awards" 
        ref={awardsRef}
        className="py-20 bg-gradient-to-br from-[#f5f7f9] to-white relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible['awards'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Recognized for excellence in GIS solutions and Esri platform expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Esri Partner Network Bronze', 
                image: '/awards/esri-partner-network-bronze.png',
                description: 'Recognized as a Bronze Partner in the Esri Partner Network',
                darkBg: true
              },
              { 
                name: 'ArcGIS System Ready Specialty', 
                image: '/awards/arcgis-system-ready-specialty.png',
                description: 'Certified ArcGIS System Ready Specialty partner',
                darkBg: true
              },
              { 
                name: 'Esri Partner Conference 2024 Award Winner', 
                image: '/awards/esri-partner-conference-2024.png',
                description: 'Award winner at the 2024 Esri Partner Conference',
                darkBg: true
              }
            ].map((award, index) => (
              <div 
                key={index}
                className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 hover:border-[#97a3b1] group transform hover:-translate-y-2 text-center ${isVisible['awards'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`mb-6 flex items-center justify-center h-32 rounded-lg p-4 ${award.darkBg ? 'bg-gradient-to-br from-[#203b54] to-[#2a4a6b]' : 'bg-gray-50'}`}>
                  <img 
                    src={award.image} 
                    alt={award.name}
                    width="200"
                    height="128"
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className={`hidden items-center justify-center w-full h-full rounded-lg ${award.darkBg ? 'bg-[#203b54]' : 'bg-[#e8ebee]'}`}>
                    <i className={`fas fa-trophy text-5xl ${award.darkBg ? 'text-white' : 'text-[#97a3b1]'}`}></i>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#203b54] transition-colors">
                  {award.name}
                </h3>
                <p className="text-gray-600 text-sm">{award.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section 
        id="partners" 
        ref={partnersRef}
        className="py-20 bg-white relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible['partners'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted partnerships with industry leaders in GIS and location intelligence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center max-w-4xl mx-auto">
            {/* Partner logos */}
            {[
              { name: 'CivicLens', image: '/partners/civiclens.png' },
              { name: 'Argis', image: '/partners/argis.png' }
            ].map((partner, index) => (
              <div 
                key={index}
                className={`bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center h-32 border border-gray-100 hover:border-[#97a3b1] group transform hover:-translate-y-1 ${isVisible['partners'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img 
                  src={partner.image} 
                  alt={partner.name}
                  width="200"
                  height="128"
                  className="max-h-full max-w-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="hidden items-center justify-center w-full h-full">
                  <span className="text-gray-400 text-sm font-medium">{partner.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customers Section */}
      <section 
        id="customers" 
        ref={customersRef}
        className="py-20 bg-gray-50 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible['customers'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted By Industry Leaders</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Organizations across industries rely on our GIS expertise and location intelligence solutions
            </p>
          </div>
          
          {/* Customer Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center mb-16">
            {/* Customer logos */}
            {[
              { name: 'Urban Solution Group', image: '/customers/urban-solution-group.png', darkBg: false, url: 'https://www.urbansolutiongroup.com/' },
              { name: 'Union Rock', image: '/customers/customer2.png', darkBg: false, url: 'https://unionrock.com/' },
              { name: 'Young Land', image: '/customers/young-land.png', darkBg: false, url: 'https://youngland.com/' },
              { name: 'Bayswater', image: '/customers/bayswater.png', darkBg: false, url: 'https://bayswater.com/' },
              { name: 'CA', image: '/customers/ca-logo-white.png', darkBg: true, url: null },
              { name: 'Customer 6', image: '/customers/customer6.png', darkBg: false, url: null },
              { name: 'TI', image: '/customers/ti.png', darkBg: false, url: null },
              { name: 'Intersect Power', image: '/customers/intersect-power.png', darkBg: false, url: 'https://intersectpower.com/' },
              { name: 'Customer 9', image: '/customers/customer9.png', darkBg: false, url: null, scale: 3 },
              { name: 'CA Horizontal', image: '/customers/ca-horizontal.png', darkBg: false, url: null },
              { name: 'Sitio', image: '/customers/sitio-logo.png', darkBg: true, url: 'https://sitio.com/' },
              { name: 'Reid Consulting', image: '/customers/reid-consulting.png', darkBg: false, url: 'https://reidconsulting.com/' },
              { name: 'Customer 13', image: '/customers/customer13.png', darkBg: false, url: null },
              { name: 'Kimmeridge', image: '/customers/kimmeridge.png', darkBg: false, url: 'https://kimmeridge.com/' },
              { name: 'Syrcuit', image: '/customers/syrcuit.png', darkBg: true, url: 'https://syrcuit.com/' }
            ].map((customer, index) => {
              const LogoContent = (
                <div 
                  className={`bg-white rounded-lg p-6 shadow-md hover:shadow-2xl transition-all duration-300 flex items-center justify-center h-28 border-2 ${customer.darkBg ? 'border-[#203b54] bg-gradient-to-br from-[#203b54] to-[#2a4a6b]' : 'border-gray-200 hover:border-[#203b54]'} group transform hover:-translate-y-2 hover:scale-110 ${isVisible['customers'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${customer.url ? 'cursor-pointer' : ''}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <img 
                    src={customer.image} 
                    alt={customer.name}
                    width="200"
                    height="112"
                    style={customer.scale ? { transform: `scale(${customer.scale})` } : undefined}
                    className={`max-h-full max-w-full object-contain transition-all duration-300 ${customer.darkBg ? 'brightness-0 invert opacity-90 group-hover:opacity-100 group-hover:scale-110' : 'opacity-90 group-hover:opacity-100 group-hover:scale-110 filter group-hover:brightness-110'}`}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className="hidden items-center justify-center w-full h-full">
                    <span className="text-gray-400 text-sm font-medium">{customer.name}</span>
                  </div>
                </div>
              )

              return customer.url ? (
                <a
                  key={index}
                  href={customer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label={`Visit ${customer.name} website`}
                >
                  {LogoContent}
                </a>
              ) : (
                <div key={index}>
                  {LogoContent}
                </div>
              )
            })}
          </div>

          {/* Customer Testimonials */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                quote: 'Platte River Analytics transformed our GIS capabilities with their expert consulting and custom solutions.',
                author: 'John Smith',
                company: 'Tech Corporation',
                role: 'GIS Director'
              },
              {
                quote: 'Their interactive mapping dashboards have been instrumental in our decision-making process.',
                author: 'Sarah Johnson',
                company: 'Energy Solutions Inc.',
                role: 'Operations Manager'
              },
              {
                quote: 'Outstanding support and training. The team truly understands our business needs.',
                author: 'Michael Chen',
                company: 'Real Estate Group',
                role: 'Analytics Lead'
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 p-8 border border-gray-100 hover:border-[#97a3b1] group ${isVisible['customers'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${(index + 6) * 100}ms` }}
              >
                <div className="mb-4">
                  <i className="fas fa-quote-left text-3xl text-[#97a3b1] opacity-50"></i>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights/Blog Preview Section */}
      <section 
        id="insights" 
        ref={insightsRef}
        className="py-20 bg-white relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible['insights'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">GIS Insights & Resources</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Educational content, GIS tips, and spatial analysis examples
            </p>
          </div>
          
          {/* Featured Blog Post Preview */}
          <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible['insights'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <article className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group">
              {/* Blog Post Header */}
              <div className="bg-gradient-to-r from-[#203b54] to-[#2a4a6b] p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                    Solar Energy
                  </span>
                  <span className="px-2 py-1 bg-white/10 text-white text-xs rounded-full">Solar</span>
                  <span className="px-2 py-1 bg-white/10 text-white text-xs rounded-full">Site Selection</span>
                  <span className="px-2 py-1 bg-white/10 text-white text-xs rounded-full">GIS Analysis</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  Why GIS is Critical for Solar Energy Site Selection
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-user-circle"></i>
                    <span className="font-medium">Platte River Analytics</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-calendar"></i>
                    <span>December 31, 2025</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-clock"></i>
                    <span>4 min read</span>
                  </div>
                </div>
              </div>

              {/* Blog Post Preview Content */}
              <div className="p-6 md:p-8">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Selecting the optimal location for a solar energy project is one of the most critical decisions in renewable energy development. GIS technology transforms this complex process from guesswork into data-driven precision.
                </p>
                <Link
                  to="/blog"
                  className="inline-flex items-center space-x-2 bg-[#203b54] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1a2f44] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
                >
                  <span>Read Full Article</span>
                  <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                </Link>
              </div>
            </article>

            {/* View All Posts Link */}
            <div className="text-center mt-8">
              <Link
                to="/blog"
                className="inline-flex items-center space-x-2 text-[#203b54] font-semibold hover:text-[#1a2f44] transition-colors group"
              >
                <span>View All Insights & Blog Posts</span>
                <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-[#203b54] to-[#2a4a6b] relative overflow-hidden scroll-mt-24">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#97a3b1] rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#203b54] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-[#97a3b1] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Spatial Data into Strategic Decisions?
            </h2>
            <p className="text-lg text-[#d1d6dc] mb-4 leading-relaxed">
              Whether you're exploring location intelligence solutions, need expert GIS consulting, or have questions about Esri platform implementation, our team is here to help.
            </p>
            <p className="text-base text-[#b8c2d0] font-medium">
              Complete the form below and we'll respond within one business day to discuss how we can support your GIS initiatives.
            </p>
          </div>

          <form 
            name="contact" 
            method="POST" 
            data-netlify="true" 
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            onFocus={() => { if (formMountTimeRef.current == null) formMountTimeRef.current = Date.now() }}
            className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-10 border border-white/20"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden" aria-hidden="true">
              <label>Don't fill this out if you're human: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
            </p>
            <p className="absolute -left-[9999px] top-0 opacity-0 pointer-events-none" aria-hidden="true">
              <label>Leave empty: <input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
            </p>

            {/* Success/Error Messages */}
            <div ref={contactStatusRef} aria-live="polite">
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg flex items-center space-x-3 animate-fadeIn">
                  <i className="fas fa-check-circle text-green-600 text-xl" aria-hidden="true"></i>
                  <p className="text-green-800 font-medium">Thank you! Your message has been sent successfully. We&apos;ll be in touch shortly.</p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-center space-x-3 animate-fadeIn">
                  <i className="fas fa-exclamation-circle text-red-600 text-xl" aria-hidden="true"></i>
                  <p className="text-red-800 font-medium">Oops! Something went wrong. Please try again or contact us directly at support@platte-river.com.</p>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* First Name */}
              <div className="form-group">
                <label htmlFor="firstName" className="block text-sm font-semibold text-[#203b54] mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#203b54] focus:border-transparent ${
                      formErrors.firstName && formTouched.firstName
                        ? 'border-red-400 bg-red-50'
                        : formTouched.firstName && !formErrors.firstName
                        ? 'border-green-400 bg-green-50'
                        : 'border-gray-300 bg-white hover:border-[#97a3b1]'
                    }`}
                    placeholder="First Name"
                    required
                  />
                  {formTouched.firstName && !formErrors.firstName && (
                    <i className="fas fa-check-circle absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"></i>
                  )}
                  {formErrors.firstName && formTouched.firstName && (
                    <i className="fas fa-exclamation-circle absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"></i>
                  )}
                </div>
                {formErrors.firstName && formTouched.firstName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <i className="fas fa-info-circle mr-1"></i>
                    {formErrors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="form-group">
                <label htmlFor="lastName" className="block text-sm font-semibold text-[#203b54] mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#203b54] focus:border-transparent ${
                      formErrors.lastName && formTouched.lastName
                        ? 'border-red-400 bg-red-50'
                        : formTouched.lastName && !formErrors.lastName
                        ? 'border-green-400 bg-green-50'
                        : 'border-gray-300 bg-white hover:border-[#97a3b1]'
                    }`}
                    placeholder="Last Name"
                    required
                  />
                  {formTouched.lastName && !formErrors.lastName && (
                    <i className="fas fa-check-circle absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"></i>
                  )}
                  {formErrors.lastName && formTouched.lastName && (
                    <i className="fas fa-exclamation-circle absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"></i>
                  )}
                </div>
                {formErrors.lastName && formTouched.lastName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <i className="fas fa-info-circle mr-1"></i>
                    {formErrors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Email */}
              <div className="form-group">
                <label htmlFor="email" className="block text-sm font-semibold text-[#203b54] mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#203b54] focus:border-transparent ${
                      formErrors.email && formTouched.email
                        ? 'border-red-400 bg-red-50'
                        : formTouched.email && !formErrors.email
                        ? 'border-green-400 bg-green-50'
                        : 'border-gray-300 bg-white hover:border-[#97a3b1]'
                    }`}
                    placeholder="Email"
                    required
                  />
                  {formTouched.email && !formErrors.email && (
                    <i className="fas fa-check-circle absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"></i>
                  )}
                  {formErrors.email && formTouched.email && (
                    <i className="fas fa-exclamation-circle absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"></i>
                  )}
                </div>
                {formErrors.email && formTouched.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <i className="fas fa-info-circle mr-1"></i>
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* Company */}
              <div className="form-group">
                <label htmlFor="company" className="block text-sm font-semibold text-[#203b54] mb-2">
                  Company <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#203b54] focus:border-transparent ${
                      formErrors.company && formTouched.company
                        ? 'border-red-400 bg-red-50'
                        : formTouched.company && !formErrors.company
                        ? 'border-green-400 bg-green-50'
                        : 'border-gray-300 bg-white hover:border-[#97a3b1]'
                    }`}
                    placeholder="Company"
                    required
                  />
                  {formTouched.company && !formErrors.company && (
                    <i className="fas fa-check-circle absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"></i>
                  )}
                  {formErrors.company && formTouched.company && (
                    <i className="fas fa-exclamation-circle absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"></i>
                  )}
                </div>
                {formErrors.company && formTouched.company && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <i className="fas fa-info-circle mr-1"></i>
                    {formErrors.company}
                  </p>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="form-group mb-6">
              <label htmlFor="message" className="block text-sm font-semibold text-[#203b54] mb-2">
                Leave us a message... <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  rows="5"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#203b54] focus:border-transparent resize-none ${
                    formErrors.message && formTouched.message
                      ? 'border-red-400 bg-red-50'
                      : formTouched.message && !formErrors.message
                      ? 'border-green-400 bg-green-50'
                      : 'border-gray-300 bg-white hover:border-[#97a3b1]'
                  }`}
                  placeholder="Add a message"
                  required
                ></textarea>
                {formTouched.message && !formErrors.message && (
                  <i className="fas fa-check-circle absolute right-3 top-3 text-green-500"></i>
                )}
                {formErrors.message && formTouched.message && (
                  <i className="fas fa-exclamation-circle absolute right-3 top-3 text-red-500"></i>
                )}
              </div>
              {formErrors.message && formTouched.message && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <i className="fas fa-info-circle mr-1"></i>
                  {formErrors.message}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                {formData.message.length} characters {formData.message.length >= 10 ? '✓' : ''}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#203b54] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.02] duration-300 flex items-center justify-center space-x-2 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#1a2f44]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Contact Us</span>
                  <i className="fas fa-paper-plane"></i>
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Floating Action Button */}
      <a 
        href="#contact"
        className="fixed bottom-8 right-8 bg-[#203b54] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#1a2f44] transition-all duration-300 transform hover:scale-110 hover:rotate-12 z-40 group"
        aria-label="Contact Us"
      >
        <i className="fas fa-comments text-xl group-hover:scale-110 transition-transform"></i>
      </a>

      </main>

      <Footer />

      <style>{`
        @keyframes mapPattern {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        /* Company word sweep animations - Like PLA letters did */
        @keyframes sweepPlatte {
          0% {
            transform: translateX(-200%) scale(0.3) rotate(-90deg);
            opacity: 0;
          }
          50% {
            opacity: 0.25;
          }
          100% {
            transform: translateX(0) scale(1) rotate(0deg);
            opacity: 0.2;
          }
        }
        
        @keyframes sweepRiver {
          0% {
            transform: translateY(200%) scale(0.3) rotate(90deg);
            opacity: 0;
          }
          50% {
            opacity: 0.25;
          }
          100% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 0.2;
          }
        }
        
        @keyframes sweepAnalytics {
          0% {
            transform: translateX(200%) scale(0.3) rotate(90deg);
            opacity: 0;
          }
          50% {
            opacity: 0.25;
          }
          100% {
            transform: translateX(0) scale(1) rotate(0deg);
            opacity: 0.2;
          }
        }
        
        .hero-letter-text {
          display: block;
          line-height: 1;
          opacity: 1 !important;
        }
        
        .hero-letter {
          opacity: 1;
        }
        
        /* Text reveal animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        /* Floating particles */
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
            opacity: 0.3;
          }
          75% {
            transform: translateY(-20px) translateX(5px);
            opacity: 0.4;
          }
        }
        
        /* Scan line effect */
        @keyframes scan {
          0% {
            transform: translateY(0);
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(100%);
            opacity: 0.3;
          }
        }
        
        /* Pulse slow */
        @keyframes pulseSlow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        /* Underline animation */
        @keyframes underlineGrow {
          from {
            width: 0;
          }
          to {
            width: 100px;
          }
        }
        
        /* Company words positioning and animation - Horizontal row */
        .hero-company-words-row {
          opacity: 1;
        }
        
        .hero-section-visible .hero-company-words-row {
          opacity: 1;
        }
        
        .hero-company-word {
          position: relative;
          pointer-events: none;
          z-index: 1;
          will-change: transform, opacity;
        }
        
        .hero-company-word-platte {
          animation: sweepPlatte 1.5s ease-out 0.3s forwards;
        }
        
        .hero-company-word-river {
          animation: sweepRiver 1.5s ease-out 0.5s forwards;
        }
        
        .hero-company-word-analytics {
          animation: sweepAnalytics 1.5s ease-out 0.7s forwards;
        }
        
        .hero-company-word-text {
          display: block;
          line-height: 1;
          opacity: 1 !important;
        }
        
        /* Hero content animations */
        .hero-content {
          opacity: 0;
        }
        
        .hero-content.hero-visible {
          animation: fadeInUp 1s ease-out 0.8s forwards;
        }
        
        .hero-word-1 {
          animation: slideInLeft 0.8s ease-out 1.2s both;
        }
        
        .hero-word-2 {
          animation: slideInLeft 0.8s ease-out 1.4s both;
        }
        
        .hero-word-3 {
          animation: slideInRight 0.8s ease-out 1.6s both;
        }
        
        .hero-description {
          opacity: 0;
        }
        
        .hero-content.hero-visible .hero-description {
          animation: fadeInUp 0.8s ease-out 1.8s forwards;
        }
        
        .hero-buttons {
          opacity: 0;
        }
        
        .hero-content.hero-visible .hero-buttons {
          animation: fadeInUp 0.8s ease-out 2s forwards;
        }
        
        .hero-underline {
          opacity: 0;
          width: 0;
        }
        
        .hero-section-visible .hero-underline {
          animation: underlineGrow 1s ease-out 1s forwards;
          opacity: 1;
        }
        
        /* Hero map animation */
        .hero-map {
          opacity: 0;
          transform: translateX(50px) scale(0.9);
        }
        
        .hero-map.hero-map-visible {
          animation: slideInRight 1.2s ease-out 1s forwards, scaleIn 1s ease-out 1.5s forwards;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default Home
