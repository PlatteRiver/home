import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SITE_URL = 'https://www.platte-river.com'

const GisKickstart = () => {
  const [isVisible, setIsVisible] = useState({})
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    position: '',
    email: '',
    phone: '',
    deliveryFormat: '',
    teamSize: '',
    currentPlatform: '',
    supportPackage: '',
    message: '',
  })
  const [formErrors, setFormErrors] = useState({})
  const [formTouched, setFormTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const journeyRef = useRef(null)
  const whyRef = useRef(null)
  const includedRef = useRef(null)
  const outlineRef = useRef(null)
  const supportRef = useRef(null)
  const inquireRef = useRef(null)
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
    ;[journeyRef, whyRef, includedRef, outlineRef, supportRef, inquireRef].forEach((ref) => {
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
      case 'deliveryFormat':
        return value ? '' : 'Please select a delivery format'
      case 'message':
        if (!value.trim()) return 'Please tell us about your goals and timeline'
        if (value.trim().length < 20) return 'Message must be at least 20 characters'
        return ''
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
      setFormData({
        firstName: '', lastName: '', company: '', position: '', email: '', phone: '',
        deliveryFormat: '', teamSize: '', currentPlatform: '', supportPackage: '', message: '',
      })
      setFormTouched({})
      return
    }
    if (formMountTimeRef.current != null && Date.now() - formMountTimeRef.current < 2000) {
      setSubmitStatus('success')
      return
    }

    const errors = {}
    ;['firstName', 'lastName', 'email', 'company', 'deliveryFormat', 'message'].forEach((key) => {
      const err = validateField(key, formData[key])
      if (err) errors[key] = err
    })
    setFormErrors(errors)
    setFormTouched(
      ['firstName', 'lastName', 'email', 'company', 'deliveryFormat', 'message'].reduce(
        (acc, k) => ({ ...acc, [k]: true }),
        {}
      )
    )
    if (Object.keys(errors).length > 0) return

    setIsSubmitting(true)
    try {
      const body = new URLSearchParams(new FormData(form)).toString()
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body,
        mode: 'same-origin',
      })
      if (res.ok) {
        setSubmitStatus('success')
        setFormData({
          firstName: '', lastName: '', company: '', position: '', email: '', phone: '',
          deliveryFormat: '', teamSize: '', currentPlatform: '', supportPackage: '', message: '',
        })
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

  const inputClass = (name) =>
    `w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#203b54] focus:border-transparent ${
      formErrors[name] && formTouched[name]
        ? 'border-red-400 bg-red-50'
        : formTouched[name] && !formErrors[name]
        ? 'border-green-400 bg-green-50'
        : 'border-gray-300 bg-white hover:border-[#97a3b1]'
    }`

  const whyCards = [
    {
      icon: 'fa-rocket',
      title: 'Get Started Quickly',
      desc: 'In just three days of focused configuration and knowledge transfer, your team gains a working ArcGIS Online foundation and the confidence to use it.',
    },
    {
      icon: 'fa-user-friends',
      title: 'Expert-Led Delivery',
      desc: 'Learn from a Platte River Analytics Esri specialist—virtually or on-site—walking your team through setup, best practices, and real workflows.',
    },
    {
      icon: 'fa-graduation-cap',
      title: 'Essential Hands-On Learning',
      desc: 'Manage your system, publish and secure content, build web maps and apps, and incorporate GIS into day-to-day work—not just a one-time install.',
    },
  ]

  const deliverables = [
    { icon: 'fa-database', title: 'Data Publishing', desc: 'Assess existing data, publish layers and services, and establish a clean content structure in ArcGIS Online or Enterprise.' },
    { icon: 'fa-table', title: 'Schemas & Data Rules', desc: 'Configure field schemas, domains, and editing rules so your data stays consistent and trustworthy.' },
    { icon: 'fa-users', title: 'Users & Groups', desc: 'Provision accounts, organize teams into groups, and set permissions that match how your organization works.' },
    { icon: 'fa-map', title: 'Web Maps', desc: 'Build authoritative web maps tailored to your workflows, with symbology, pop-ups, and bookmarks your team can use immediately.' },
    { icon: 'fa-th-large', title: 'Apps & Dashboards', desc: 'Create customized Experience Builder apps, dashboards, and field tools that put location intelligence in front of decision-makers.' },
    { icon: 'fa-shield-alt', title: 'Security Basics', desc: 'Apply sharing, group, and item-level security so the right people see the right content.' },
    { icon: 'fa-chalkboard-teacher', title: 'User Training', desc: 'Hands-on training for administrators and end users so adoption sticks after we leave.' },
  ]

  const dayOutline = [
    {
      day: 'Day 1',
      title: 'Foundation & Data',
      items: [
        'Resource and data assessment',
        'Organization settings, users, and groups',
        'Publish and organize content',
        'Schemas, domains, and data rules',
      ],
    },
    {
      day: 'Day 2',
      title: 'Maps & Applications',
      items: [
        'Author web maps and layers',
        'Configure apps and dashboards',
        'Sharing and security review',
        'Workflow integration planning',
      ],
    },
    {
      day: 'Day 3',
      title: 'Training & Handoff',
      items: [
        'Administrator and user training',
        'Documentation and admin guide',
        'Q&A and refinement',
        'Optional support package planning',
      ],
    },
  ]

  const supportPackages = [
    {
      hours: '10',
      title: 'Essentials Support',
      desc: 'Monthly coaching, quick questions, and light configuration help to keep your team moving after launch.',
    },
    {
      hours: '20',
      title: 'Growth Support',
      desc: 'Deeper coaching, additional training sessions, app enhancements, and workflow troubleshooting each month.',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>GIS Kickstart | 3-Day ArcGIS Online Setup | Platte River Analytics</title>
        <meta
          name="description"
          content="GIS Kickstart: a 3-day virtual or on-site ArcGIS Online implementation package. Data publishing, schemas, users, web maps, apps, dashboards, training, and optional monthly support from Platte River Analytics."
        />
        <link rel="canonical" href={SITE_URL + '/gis-kickstart'} />
        <meta property="og:title" content="GIS Kickstart | 3-Day ArcGIS Online Setup | Platte River Analytics" />
        <meta property="og:url" content={SITE_URL + '/gis-kickstart'} />
        <meta
          property="og:description"
          content="Get your team up and running on ArcGIS Online in three days with expert virtual or on-site support, customized apps, and hands-on training."
        />
      </Helmet>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-[#203b54] via-[#2a4a6b] to-[#1a2f44] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              }}
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
                <i className="fas fa-box-open mr-2"></i>Service Package
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">GIS Kickstart</h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
                Get your team up and running on ArcGIS Online in just three days—with dedicated virtual or on-site support from Platte River Analytics.
              </p>
              <a
                href="#inquire"
                className="inline-block bg-white text-[#203b54] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <i className="fas fa-calendar-check mr-2"></i>Schedule Your Kickstart
              </a>
            </div>
          </div>
        </section>

        {/* Journey */}
        <section
          ref={journeyRef}
          data-section-id="journey"
          className="py-20 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${
                isVisible['journey'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Your GIS journey starts here</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  A Platte River Analytics specialist begins with a resource assessment of your available data, content, and current GIS environment. We then design your Kickstart plan around your team&apos;s experience level and business priorities.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Whether you are new to ArcGIS Online or ready to mature an existing deployment, GIS Kickstart gives you a structured path from setup to adoption—not a generic checklist.
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#f5f7f9] to-[#e8ebee] rounded-2xl p-8 border border-gray-100 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-[#203b54] w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-clipboard-list text-white text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Tailored to your organization</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-[#203b54] mt-1 flex-shrink-0"></i>
                    <span>Virtual or on-site delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-[#203b54] mt-1 flex-shrink-0"></i>
                    <span>Aligned to ArcGIS Online or Enterprise Portal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-[#203b54] mt-1 flex-shrink-0"></i>
                    <span>Administrator and end-user training included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-[#203b54] mt-1 flex-shrink-0"></i>
                    <span>Optional monthly support after handoff</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why */}
        <section ref={whyRef} data-section-id="why" className="py-20 bg-gradient-to-br from-[#f5f7f9] to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why GIS Kickstart?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A focused implementation package—not open-ended consulting—so your team can start using GIS with confidence.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {whyCards.map((card, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 p-8 border border-gray-100 transform hover:-translate-y-2 ${
                    isVisible['why'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="bg-[#e8ebee] w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                    <i className={`fas ${card.icon} text-2xl text-[#203b54]`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Included */}
        <section ref={includedRef} data-section-id="included" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What&apos;s included</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Three days of hands-on configuration, knowledge transfer, and training across the essentials your team needs to operate ArcGIS Online.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {deliverables.map((item, index) => (
                <div
                  key={index}
                  className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 hover:border-[#97a3b1] group transform hover:-translate-y-2 ${
                    isVisible['included'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="bg-[#e8ebee] w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <i className={`fas ${item.icon} text-2xl text-[#203b54]`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3-day outline */}
        <section ref={outlineRef} data-section-id="outline" className="py-20 bg-gradient-to-br from-[#f5f7f9] to-[#e8ebee]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Three-day outline</h2>
              <p className="text-lg text-gray-600">A typical Kickstart schedule—adjusted to fit your data, users, and goals.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {dayOutline.map((block, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-500 ${
                    isVisible['outline'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <div className="bg-gradient-to-r from-[#203b54] to-[#2a4a6b] p-6">
                    <span className="text-white/80 text-sm font-semibold uppercase tracking-wide">{block.day}</span>
                    <h3 className="text-xl font-bold text-white mt-1">{block.title}</h3>
                  </div>
                  <ul className="p-6 space-y-3">
                    {block.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <i className="fas fa-check text-[#203b54] mt-1 flex-shrink-0 text-sm"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Post-handoff support */}
        <section ref={supportRef} data-section-id="support" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Support after handoff</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Keep momentum with an optional monthly support package for coaching, extra training, configuration help, and answers as your GIS program grows.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {supportPackages.map((pkg, index) => (
                <div
                  key={index}
                  className={`rounded-2xl border-2 border-[#203b54] bg-gradient-to-br from-[#f5f7f9] to-white p-8 shadow-lg transition-all duration-700 ${
                    isVisible['support'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="text-4xl font-bold text-[#203b54] mb-1">{pkg.hours}</div>
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">hours per month</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{pkg.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{pkg.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 text-sm mt-8 max-w-2xl mx-auto">
              Support packages are optional and scoped during your Kickstart. No long-term commitment required to get started.
            </p>
          </div>
        </section>

        {/* Esri partner */}
        <section className="py-8 bg-gradient-to-r from-[#f5f7f9] to-[#e8ebee]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center flex-wrap gap-6">
            <div className="bg-gradient-to-br from-[#203b54] to-[#2a4a6b] rounded-xl px-6 py-4 flex items-center justify-center shadow-md">
              <img src="/awards/esri-partner-network-bronze.png" alt="Esri Partner Network Bronze" className="h-16 w-auto object-contain" width="64" height="64" />
            </div>
            <p className="text-gray-700 text-lg font-medium text-center max-w-xl">
              Delivered by an Esri Business Partner. Also exploring classes? See our{' '}
              <Link to="/training" className="text-[#203b54] underline font-semibold hover:text-[#1a2f44]">training courses</Link>.
            </p>
          </div>
        </section>

        {/* Inquiry form */}
        <section
          id="inquire"
          ref={inquireRef}
          data-section-id="inquire"
          className="py-20 bg-gradient-to-br from-[#f5f7f9] via-white to-[#f0f2f4] scroll-mt-24"
        >
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`text-center mb-12 transition-all duration-700 ${
                isVisible['inquire'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Schedule Your GIS Kickstart</h2>
              <p className="text-lg text-gray-600">
                Tell us about your organization and goals. We&apos;ll confirm whether GIS Kickstart is the right fit and start planning your service.
              </p>
            </div>

            {submitStatus === 'success' ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
                <i className="fas fa-check-circle text-5xl text-green-500 mb-4"></i>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Inquiry Received!</h3>
                <p className="text-gray-600 mb-6">We&apos;ll be in touch shortly to discuss your GIS Kickstart and next steps.</p>
                <button onClick={() => setSubmitStatus(null)} className="text-[#203b54] font-semibold hover:underline">
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form
                name="gis-kickstart-form"
                method="POST"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                onFocus={() => {
                  if (formMountTimeRef.current == null) formMountTimeRef.current = Date.now()
                }}
                className={`bg-white rounded-xl shadow-lg p-8 border border-gray-100 transition-all duration-700 ${
                  isVisible['inquire'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <input type="hidden" name="form-name" value="gis-kickstart-inquiry" />
                <input type="hidden" name="subject" value="GIS Kickstart inquiry" />
                <p className="hidden" aria-hidden="true">
                  <label>Don&apos;t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
                </p>
                <p className="absolute -left-[9999px] top-0 opacity-0 pointer-events-none" aria-hidden="true">
                  <label>Leave empty: <input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
                </p>

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
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} onBlur={handleBlur} className={inputClass('firstName')} required />
                    {formErrors.firstName && formTouched.firstName && (
                      <p className="mt-1 text-sm text-red-600"><i className="fas fa-info-circle mr-1"></i>{formErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-[#203b54] mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} onBlur={handleBlur} className={inputClass('lastName')} required />
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
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} onBlur={handleBlur} className={inputClass('company')} required />
                    {formErrors.company && formTouched.company && (
                      <p className="mt-1 text-sm text-red-600"><i className="fas fa-info-circle mr-1"></i>{formErrors.company}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="position" className="block text-sm font-semibold text-[#203b54] mb-2">Position</label>
                    <input type="text" id="position" name="position" value={formData.position} onChange={handleInputChange} className={inputClass('position')} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#203b54] mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} onBlur={handleBlur} className={inputClass('email')} required />
                    {formErrors.email && formTouched.email && (
                      <p className="mt-1 text-sm text-red-600"><i className="fas fa-info-circle mr-1"></i>{formErrors.email}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-[#203b54] mb-2">Phone</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className={inputClass('phone')} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="deliveryFormat" className="block text-sm font-semibold text-[#203b54] mb-2">
                      Delivery Format <span className="text-red-500">*</span>
                    </label>
                    <select id="deliveryFormat" name="deliveryFormat" value={formData.deliveryFormat} onChange={handleInputChange} onBlur={handleBlur} className={inputClass('deliveryFormat')} required>
                      <option value="">Select format...</option>
                      <option value="Virtual">Virtual</option>
                      <option value="On-site">On-site</option>
                      <option value="Either">Either / not sure yet</option>
                    </select>
                    {formErrors.deliveryFormat && formTouched.deliveryFormat && (
                      <p className="mt-1 text-sm text-red-600"><i className="fas fa-info-circle mr-1"></i>{formErrors.deliveryFormat}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="teamSize" className="block text-sm font-semibold text-[#203b54] mb-2">Approx. Team Size</label>
                    <select id="teamSize" name="teamSize" value={formData.teamSize} onChange={handleInputChange} className={inputClass('teamSize')}>
                      <option value="">Select...</option>
                      <option value="1-5 users">1–5 users</option>
                      <option value="6-15 users">6–15 users</option>
                      <option value="16+ users">16+ users</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="currentPlatform" className="block text-sm font-semibold text-[#203b54] mb-2">Current Platform</label>
                    <select id="currentPlatform" name="currentPlatform" value={formData.currentPlatform} onChange={handleInputChange} className={inputClass('currentPlatform')}>
                      <option value="">Select...</option>
                      <option value="New to GIS">New to GIS</option>
                      <option value="ArcGIS Online">ArcGIS Online</option>
                      <option value="ArcGIS Enterprise">ArcGIS Enterprise</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="supportPackage" className="block text-sm font-semibold text-[#203b54] mb-2">Post-Handoff Support Interest</label>
                    <select id="supportPackage" name="supportPackage" value={formData.supportPackage} onChange={handleInputChange} className={inputClass('supportPackage')}>
                      <option value="">Select...</option>
                      <option value="None">None at this time</option>
                      <option value="10 hrs per month">10 hrs per month</option>
                      <option value="20 hrs per month">20 hrs per month</option>
                      <option value="Not sure">Not sure yet</option>
                    </select>
                  </div>
                </div>

                <div className="mb-8">
                  <label htmlFor="message" className="block text-sm font-semibold text-[#203b54] mb-2">
                    Goals &amp; Timeline <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    rows="5"
                    className={`${inputClass('message')} resize-none`}
                    placeholder="Tell us what you want to accomplish, your target start date, and any data or apps you already have in mind."
                    required
                  />
                  {formErrors.message && formTouched.message && (
                    <p className="mt-1 text-sm text-red-600"><i className="fas fa-info-circle mr-1"></i>{formErrors.message}</p>
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
                      <span>Request GIS Kickstart</span>
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

export default GisKickstart
