import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SITE_URL = 'https://www.platte-river.com'

const Training = () => {
  const [isVisible, setIsVisible] = useState({})
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    position: '',
    email: '',
    cityState: '',
    classOption: '',
  })
  const [formErrors, setFormErrors] = useState({})
  const [formTouched, setFormTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const coursesRef = useRef(null)
  const registerRef = useRef(null)
  const formMountTimeRef = useRef(null)

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
    ;[coursesRef, registerRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current)
    })
    return () => observer.disconnect()
  }, [])

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.trim() ? '' : `${name === 'firstName' ? 'First' : 'Last'} name is required`
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Valid email is required'
      case 'company':
        return value.trim() ? '' : 'Company is required'
      case 'classOption':
        return value ? '' : 'Please select a class'
      default:
        return ''
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formTouched[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setFormTouched((prev) => ({ ...prev, [name]: true }))
    setFormErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const botField = (form.elements['bot-field'] && form.elements['bot-field'].value) || ''
    const websiteTrap = (form.elements['website'] && form.elements['website'].value) || ''
    if (botField.trim() !== '' || websiteTrap.trim() !== '') {
      setSubmitStatus('success')
      setFormData({ firstName: '', lastName: '', company: '', position: '', email: '', cityState: '', classOption: '' })
      setFormTouched({})
      return
    }
    if (formMountTimeRef.current != null && Date.now() - formMountTimeRef.current < 2000) {
      setSubmitStatus('success')
      return
    }

    const errors = {}
    Object.keys(formData).forEach((key) => {
      if (['firstName', 'lastName', 'email', 'company', 'classOption'].includes(key)) {
        const err = validateField(key, formData[key])
        if (err) errors[key] = err
      }
    })
    setFormErrors(errors)
    setFormTouched(Object.keys(formData).reduce((acc, k) => ({ ...acc, [k]: true }), {}))
    if (Object.keys(errors).length > 0) return

    setIsSubmitting(true)
    try {
      const formDataToSubmit = new FormData(form)
      const body = new URLSearchParams(formDataToSubmit).toString()
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })
      if (res.ok) {
        setSubmitStatus('success')
        setFormData({ firstName: '', lastName: '', company: '', position: '', email: '', cityState: '', classOption: '' })
        setFormTouched({})
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const courses = [
    {
      title: 'Introduction to ArcGIS Pro',
      duration: '2 day course',
      topics: [
        'Starting a new Pro project',
        'Connecting to Portal and ArcGIS Online data',
        'Maps and layouts',
        'Query and Select',
        'Using Arcade for labeling and tables',
        'Geoprocessing overview',
        'Publishing to Portal and AGOL',
      ],
    },
    {
      title: 'Intermediate ArcGIS Pro',
      duration: '2 day course',
      topics: [
        'Building better maps',
        'ModelBuilder',
        'Analyzing lidar and imagery',
        'Automating workflows',
        'Georeferencing and statistics',
        'AGOL simultaneous editing',
      ],
    },
    {
      title: 'Introduction to ArcGIS Online',
      duration: '1 day course',
      topics: [
        'Maintenance and best practices',
        'Publishing data and hosted feature services',
        'Working with imagery',
        '3D data and scenes',
        'Intro to Experience Builder and Dashboards',
      ],
    },
    {
      title: 'Building Your First Web App',
      duration: '1 day course',
      topics: [
        'Configuring web maps and apps',
        'Experience Builder and instant apps',
        'Dashboards and storytelling',
        'Sharing and embedding',
      ],
    },
  ]

  const classOptions = courses.map((c) => c.title)

  const inputClass = (name) =>
    `w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#203b54] focus:border-transparent ${
      formErrors[name] && formTouched[name]
        ? 'border-red-400 bg-red-50'
        : formTouched[name] && !formErrors[name]
        ? 'border-green-400 bg-green-50'
        : 'border-gray-300 bg-white hover:border-[#97a3b1]'
    }`

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>ArcGIS & GIS Training | Platte River Analytics</title>
        <meta name="description" content="Esri training courses: ArcGIS Pro, ArcGIS Online, Experience Builder. Custom and ready-made classes for petroleum, energy, and GIS professionals." />
        <link rel="canonical" href={SITE_URL + '/training'} />
        <meta property="og:title" content="ArcGIS & GIS Training | Platte River Analytics" />
        <meta property="og:url" content={SITE_URL + '/training'} />
        <meta property="og:description" content="Esri training courses on ArcGIS Pro, ArcGIS Online, and more. Custom and ready-made classes from an Esri Business Partner." />
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Platte River Analytics Training</h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              We offer dozens of coaching and training courses on a variety of Esri applications and software. As an Esri Business Partner, we provide training on multiple platforms including ArcGIS Pro, ArcGIS Online, and Business Analyst.
            </p>
            <a
              href="#register"
              className="inline-block bg-white text-[#203b54] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Register for a Class
            </a>
          </div>
        </div>
      </section>

      {/* Esri Partner Badge */}
      <section className="py-8 bg-gradient-to-r from-[#f5f7f9] to-[#e8ebee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center flex-wrap gap-6">
          <div className="bg-gradient-to-br from-[#203b54] to-[#2a4a6b] rounded-xl px-6 py-4 flex items-center justify-center shadow-md">
            <img src="/awards/esri-partner-network-bronze.png" alt="Esri Partner Network Bronze" className="h-16 w-auto object-contain" width="64" height="64" />
          </div>
          <p className="text-gray-700 text-lg font-medium">Pick a ready-made class below or <Link to="/#contact" className="text-[#203b54] underline font-semibold hover:text-[#1a2f44]">contact us</Link> for custom-built classes.</p>
        </div>
      </section>

      {/* Core Classes */}
      <section
        ref={coursesRef}
        data-section-id="courses"
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Classes</h2>
            <p className="text-lg text-gray-600">Comprehensive Esri training designed for professionals across industries.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 transform hover:-translate-y-2 ${isVisible['courses'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-gradient-to-r from-[#203b54] to-[#2a4a6b] p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{course.title}</h3>
                  <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full">{course.duration}</span>
                </div>
                <div className="p-6">
                  <ul className="space-y-2 mb-6">
                    {course.topics.map((topic, i) => (
                      <li key={i} className="flex items-start space-x-2 text-gray-700">
                        <i className="fas fa-check-circle text-[#203b54] mt-1 flex-shrink-0"></i>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#register"
                    onClick={() => setFormData((prev) => ({ ...prev, classOption: course.title }))}
                    className="inline-flex items-center space-x-2 bg-[#203b54] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#1a2f44] transition-all shadow-md hover:shadow-lg text-sm"
                  >
                    <span>Register</span>
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section
        id="register"
        ref={registerRef}
        data-section-id="register"
        className="py-20 bg-gradient-to-br from-[#f5f7f9] via-white to-[#f0f2f4]"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible['register'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Form</h2>
            <p className="text-lg text-gray-600">Fill out the form below and we'll get back to you with class details and scheduling.</p>
          </div>

          {submitStatus === 'success' ? (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
              <i className="fas fa-check-circle text-5xl text-green-500 mb-4"></i>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Received!</h3>
              <p className="text-gray-600 mb-6">We'll be in touch shortly with class details and scheduling information.</p>
              <button onClick={() => setSubmitStatus(null)} className="text-[#203b54] font-semibold hover:underline">
                Register for another class
              </button>
            </div>
          ) : (
            <form
              name="training-registration"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              onFocus={() => { if (formMountTimeRef.current == null) formMountTimeRef.current = Date.now() }}
              className={`bg-white rounded-xl shadow-lg p-8 border border-gray-100 transition-all duration-700 ${isVisible['register'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <input type="hidden" name="form-name" value="training-registration" />
              <p className="hidden" aria-hidden="true"><label>Don't fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
              <p className="absolute -left-[9999px] top-0 opacity-0 pointer-events-none" aria-hidden="true"><label>Leave empty: <input name="website" type="text" tabIndex={-1} autoComplete="off" /></label></p>

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  Something went wrong. Please try again or email us at support@platte-river.com.
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-[#203b54] mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} onBlur={handleBlur} className={inputClass('firstName')} placeholder="First name" required />
                  {formErrors.firstName && formTouched.firstName && (
                    <p className="mt-1 text-sm text-red-600"><i className="fas fa-info-circle mr-1"></i>{formErrors.firstName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-[#203b54] mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} onBlur={handleBlur} className={inputClass('lastName')} placeholder="Last name" required />
                  {formErrors.lastName && formTouched.lastName && (
                    <p className="mt-1 text-sm text-red-600"><i className="fas fa-info-circle mr-1"></i>{formErrors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-[#203b54] mb-2">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} onBlur={handleBlur} className={inputClass('company')} placeholder="Company" required />
                  {formErrors.company && formTouched.company && (
                    <p className="mt-1 text-sm text-red-600"><i className="fas fa-info-circle mr-1"></i>{formErrors.company}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="position" className="block text-sm font-semibold text-[#203b54] mb-2">Position</label>
                  <input type="text" id="position" name="position" value={formData.position} onChange={handleInputChange} className={inputClass('position')} placeholder="Position" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#203b54] mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} onBlur={handleBlur} className={inputClass('email')} placeholder="Email" required />
                  {formErrors.email && formTouched.email && (
                    <p className="mt-1 text-sm text-red-600"><i className="fas fa-info-circle mr-1"></i>{formErrors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="cityState" className="block text-sm font-semibold text-[#203b54] mb-2">City/State</label>
                  <input type="text" id="cityState" name="cityState" value={formData.cityState} onChange={handleInputChange} className={inputClass('cityState')} placeholder="City/State" />
                </div>
              </div>

              <div className="mb-8">
                <label htmlFor="classOption" className="block text-sm font-semibold text-[#203b54] mb-2">
                  Choose a Class <span className="text-red-500">*</span>
                </label>
                <select
                  id="classOption"
                  name="classOption"
                  value={formData.classOption}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={inputClass('classOption')}
                  required
                >
                  <option value="">Select a class...</option>
                  {classOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
                {formErrors.classOption && formTouched.classOption && (
                  <p className="mt-1 text-sm text-red-600"><i className="fas fa-info-circle mr-1"></i>{formErrors.classOption}</p>
                )}
              </div>

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
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Register</span>
                    <i className="fas fa-paper-plane"></i>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      </main>
      <Footer />
    </div>
  )
}

export default Training
