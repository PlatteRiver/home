import React, { useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SITE_URL = 'https://www.platte-river.com'
const API_URL = import.meta.env.VITE_TICKETS_API || 'https://app.platte-river.com/api/public/tickets'
const TICKETS_EMAIL = 'requests@platte-river.com'

const REQUEST_TYPES = [
  'New map',
  'Data update',
  'Spatial analysis',
  'Data cleanup',
  'Web map / dashboard support',
  'Other',
]
const PRIORITIES = ['Low', 'Medium', 'High', 'Urgent']
const MAX_FILES = 5
const MAX_FILE_BYTES = 25 * 1024 * 1024
const DETAILS_MAX = 1000
const ALLOWED_EXT = [
  'jpg', 'jpeg', 'png', 'gif', 'webp', 'heic', 'heif', 'tif', 'tiff',
  'pdf', 'zip', 'csv', 'txt', 'xlsx', 'xls', 'docx', 'doc', 'pptx',
  'kml', 'kmz', 'geojson', 'json', 'gpkg',
]

const EMPTY = {
  name: '',
  email: '',
  company: '',
  requestType: '',
  otherDetail: '',
  dueDate: '',
  priority: '',
  details: '',
}

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function fileProblem(file) {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  if (!ALLOWED_EXT.includes(ext)) return `${file.name} is not a supported file type`
  if (file.size > MAX_FILE_BYTES) return `${file.name} is over 25 MB`
  if (file.size === 0) return `${file.name} is empty`
  return ''
}

function validate(data) {
  const errors = {}
  if (!data.name.trim()) errors.name = 'Name is required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) errors.email = 'Valid email is required'
  if (!data.requestType) errors.requestType = 'Choose a request type'
  if (data.requestType === 'Other' && !data.otherDetail.trim()) errors.otherDetail = 'Describe the request'
  if (!data.priority) errors.priority = 'Choose a priority'
  return errors
}

async function readError(res, fallback) {
  try {
    const body = await res.json()
    return body.error || fallback
  } catch {
    return fallback
  }
}

const RequestTicket = () => {
  const [formData, setFormData] = useState(EMPTY)
  const [files, setFiles] = useState([])
  const [fileError, setFileError] = useState('')
  const [dragging, setDragging] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [formTouched, setFormTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [progress, setProgress] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [reference, setReference] = useState('')
  const fileInputRef = useRef(null)
  const firstFocusRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const next = { ...formData, [name]: name === 'details' ? value.slice(0, DETAILS_MAX) : value }
    setFormData(next)
    if (formTouched[name]) setFormErrors(validate(next))
  }

  const handleBlur = (e) => {
    setFormTouched((prev) => ({ ...prev, [e.target.name]: true }))
    setFormErrors(validate(formData))
  }

  const addFiles = (list) => {
    const incoming = Array.from(list || [])
    if (incoming.length === 0) return
    const problems = incoming.map(fileProblem).filter(Boolean)
    const good = incoming.filter((file) => !fileProblem(file))
    const merged = [...files]
    for (const file of good) {
      if (!merged.some((f) => f.name === file.name && f.size === file.size)) merged.push(file)
    }
    if (merged.length > MAX_FILES) problems.push(`Attach up to ${MAX_FILES} files`)
    setFiles(merged.slice(0, MAX_FILES))
    setFileError(problems.join('. '))
  }

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setFileError('')
  }

  const uploadFiles = async () => {
    if (files.length === 0) return ''
    setProgress('Preparing upload...')
    const res = await fetch(`${API_URL}/upload-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ files: files.map((f) => ({ name: f.name, size: f.size })) }),
    })
    if (!res.ok) throw new Error(await readError(res, 'Could not prepare the upload'))
    const { uploadId, slots } = await res.json()
    for (const [index, slot] of slots.entries()) {
      setProgress(`Uploading ${index + 1} of ${slots.length}...`)
      const put = await fetch(slot.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': slot.contentType },
        body: files[index],
      })
      if (!put.ok) throw new Error(`Could not upload ${slot.name}`)
    }
    return uploadId
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const website = (form.elements['website'] && form.elements['website'].value) || ''
    if (website.trim() !== '') {
      setReference('received')
      return
    }
    if (firstFocusRef.current != null && Date.now() - firstFocusRef.current < 2000) {
      setReference('received')
      return
    }

    const errors = validate(formData)
    setFormErrors(errors)
    setFormTouched(Object.keys(EMPTY).reduce((acc, k) => ({ ...acc, [k]: true }), {}))
    if (Object.keys(errors).length > 0) return

    setIsSubmitting(true)
    setSubmitError('')
    try {
      const uploadId = await uploadFiles()
      setProgress('Submitting request...')
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, uploadId, website }),
      })
      if (!res.ok) throw new Error(await readError(res, 'Could not submit your request'))
      const body = await res.json()
      setReference(body.reference || 'received')
      setFormData(EMPTY)
      setFiles([])
      setFormTouched({})
    } catch (err) {
      setSubmitError(err?.message || 'Something went wrong')
    } finally {
      setIsSubmitting(false)
      setProgress('')
    }
  }

  const inputClass = (name) =>
    `w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#203b54] focus:border-transparent ${
      formErrors[name] && formTouched[name]
        ? 'border-red-400 bg-red-50'
        : 'border-gray-300 bg-white hover:border-[#97a3b1]'
    }`

  const fieldError = (name) =>
    formErrors[name] && formTouched[name] ? (
      <p className="mt-1 text-sm text-red-600"><i className="fas fa-info-circle mr-1"></i>{formErrors[name]}</p>
    ) : null

  const label = (htmlFor, text, required) => (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-[#203b54] mb-2">
      {text} {required && <span className="text-red-500">*</span>}
    </label>
  )

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Submit a GIS Request | Platte River Analytics</title>
        <meta name="description" content="Submit a GIS request to Platte River Analytics: new maps, data updates, spatial analysis, data cleanup, and web map or dashboard support." />
        <link rel="canonical" href={SITE_URL + '/request'} />
        <meta property="og:title" content="Submit a GIS Request | Platte River Analytics" />
        <meta property="og:url" content={SITE_URL + '/request'} />
        <meta property="og:description" content="Send a GIS request to the Platte River Analytics team. We'll confirm by email and follow up." />
      </Helmet>
      <Navbar />
      <main>
        <section className="py-16 bg-gradient-to-br from-[#203b54] via-[#2a4a6b] to-[#1a2f44] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)' }}></div>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-5">Submit a GIS Request</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Tell us what you need and we'll confirm by email. Prefer email? Send it to{' '}
              <a href={`mailto:${TICKETS_EMAIL}`} className="underline font-semibold hover:text-white">{TICKETS_EMAIL}</a>.
            </p>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-[#f5f7f9] via-white to-[#f0f2f4]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            {reference ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
                <i className="fas fa-check-circle text-5xl text-green-500 mb-4"></i>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Request received</h2>
                {reference !== 'received' && reference !== 'PRA-RECEIVED' && (
                  <p className="text-gray-700 mb-2">Reference <span className="font-semibold">{reference}</span></p>
                )}
                <p className="text-gray-600 mb-6">
                  We sent a confirmation to your email and someone on our team will follow up soon. To add anything, write{' '}
                  <a href={`mailto:${TICKETS_EMAIL}`} className="text-[#203b54] font-semibold underline">{TICKETS_EMAIL}</a>.
                </p>
                <button onClick={() => setReference('')} className="text-[#203b54] font-semibold hover:underline">
                  Submit another request
                </button>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={handleSubmit}
                onFocus={() => {
                  if (firstFocusRef.current == null) firstFocusRef.current = Date.now()
                }}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
              >
                <p className="absolute -left-[9999px] top-0 opacity-0 pointer-events-none" aria-hidden="true">
                  <label>Leave empty: <input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
                </p>

                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    <i className="fas fa-exclamation-triangle mr-2"></i>
                    {submitError}. You can also email <a href={`mailto:${TICKETS_EMAIL}`} className="underline font-semibold">{TICKETS_EMAIL}</a>.
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    {label('name', 'Name', true)}
                    <input type="text" id="name" name="name" autoComplete="name" value={formData.name} onChange={handleInputChange} onBlur={handleBlur} className={inputClass('name')} placeholder="Your name" />
                    {fieldError('name')}
                  </div>
                  <div>
                    {label('email', 'Email', true)}
                    <input type="email" id="email" name="email" autoComplete="email" value={formData.email} onChange={handleInputChange} onBlur={handleBlur} className={inputClass('email')} placeholder="you@company.com" />
                    {fieldError('email')}
                  </div>
                </div>

                <div className="mb-6">
                  {label('company', 'Company', false)}
                  <input type="text" id="company" name="company" autoComplete="organization" value={formData.company} onChange={handleInputChange} className={inputClass('company')} placeholder="Company" />
                </div>

                <fieldset className="mb-6">
                  <legend className="block text-sm font-semibold text-[#203b54] mb-2">
                    Request type <span className="text-red-500">*</span>
                  </legend>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {REQUEST_TYPES.map((type) => (
                      <label
                        key={type}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 cursor-pointer transition-colors ${
                          formData.requestType === type ? 'border-[#203b54] bg-[#f0f4f8]' : 'border-gray-200 hover:border-[#97a3b1]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="requestType"
                          value={type}
                          checked={formData.requestType === type}
                          onChange={(e) => {
                            handleInputChange(e)
                            setFormTouched((prev) => ({ ...prev, requestType: true }))
                          }}
                          className="accent-[#203b54]"
                        />
                        <span className="text-gray-800">{type}</span>
                      </label>
                    ))}
                  </div>
                  {fieldError('requestType')}
                </fieldset>

                {formData.requestType === 'Other' && (
                  <div className="mb-6">
                    {label('otherDetail', 'Describe the request', true)}
                    <input type="text" id="otherDetail" name="otherDetail" maxLength={200} value={formData.otherDetail} onChange={handleInputChange} onBlur={handleBlur} className={inputClass('otherDetail')} placeholder="What kind of help do you need?" />
                    {fieldError('otherDetail')}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    {label('dueDate', 'Due date', false)}
                    <input type="date" id="dueDate" name="dueDate" value={formData.dueDate} onChange={handleInputChange} className={inputClass('dueDate')} />
                  </div>
                  <div>
                    {label('priority', 'Priority', true)}
                    <select id="priority" name="priority" value={formData.priority} onChange={handleInputChange} onBlur={handleBlur} className={inputClass('priority')}>
                      <option value="">Select a priority...</option>
                      {PRIORITIES.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    {fieldError('priority')}
                  </div>
                </div>

                <div className="mb-6">
                  {label('details', 'Additional details', false)}
                  <textarea id="details" name="details" rows={5} value={formData.details} onChange={handleInputChange} className={inputClass('details')} placeholder="Project area, data sources, deliverable format, anything else that helps." />
                  <p className="mt-1 text-xs text-gray-500 text-right">{formData.details.length} / {DETAILS_MAX}</p>
                </div>

                <div className="mb-8">
                  <span className="block text-sm font-semibold text-[#203b54] mb-2">Files</span>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        fileInputRef.current?.click()
                      }
                    }}
                    onDragOver={(e) => {
                      e.preventDefault()
                      setDragging(true)
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault()
                      setDragging(false)
                      addFiles(e.dataTransfer.files)
                    }}
                    className={`rounded-lg border-2 border-dashed px-6 py-8 text-center cursor-pointer transition-colors ${
                      dragging ? 'border-[#203b54] bg-[#f0f4f8]' : 'border-gray-300 hover:border-[#97a3b1]'
                    }`}
                  >
                    <i className="fas fa-cloud-upload-alt text-3xl text-[#203b54] mb-2"></i>
                    <p className="text-gray-700 font-medium">Drag files here or click to browse</p>
                    <p className="text-xs text-gray-500 mt-1">Up to {MAX_FILES} files, 25 MB each. Images, PDF, Office, CSV, KML/KMZ, GeoJSON, GeoPackage, ZIP.</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    accept={ALLOWED_EXT.map((ext) => `.${ext}`).join(',')}
                    onChange={(e) => {
                      addFiles(e.target.files)
                      e.target.value = ''
                    }}
                  />
                  {fileError && <p className="mt-2 text-sm text-red-600"><i className="fas fa-info-circle mr-1"></i>{fileError}</p>}
                  {files.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {files.map((file, index) => (
                        <li key={`${file.name}-${file.size}`} className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm">
                          <span className="truncate text-gray-800"><i className="fas fa-paperclip mr-2 text-gray-500"></i>{file.name}</span>
                          <span className="flex items-center gap-3 flex-shrink-0">
                            <span className="text-gray-500">{formatBytes(file.size)}</span>
                            <button type="button" onClick={() => removeFile(index)} className="text-gray-500 hover:text-red-600" aria-label={`Remove ${file.name}`}>
                              <i className="fas fa-times"></i>
                            </button>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-[#203b54] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-xl duration-300 flex items-center justify-center space-x-2 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#1a2f44]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      <span>{progress || 'Submitting...'}</span>
                    </>
                  ) : (
                    <>
                      <span>Submit request</span>
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

export default RequestTicket
