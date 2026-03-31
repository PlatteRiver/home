import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import { platteDebug } from './utils/debugLog'

platteDebug('Boot', 'main.jsx executing', {
  href: typeof window !== 'undefined' ? window.location.href : '',
  origin: typeof window !== 'undefined' ? window.location.origin : '',
  pathname: typeof window !== 'undefined' ? window.location.pathname : '',
  ua: typeof navigator !== 'undefined' ? navigator.userAgent : '',
  ts: new Date().toISOString(),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)

platteDebug('Boot', 'ReactDOM.createRoot().render() returned (StrictMode may double-invoke effects in dev)')

if (typeof window !== 'undefined') {
  window.addEventListener('error', (ev) => {
    platteDebug('Global', 'window error', { message: ev.message, filename: ev.filename, lineno: ev.lineno, colno: ev.colno, error: ev.error?.stack })
  })
  window.addEventListener('unhandledrejection', (ev) => {
    platteDebug('Global', 'unhandledrejection', {
      reason: ev.reason?.message || String(ev.reason),
      stack: ev.reason?.stack,
    })
  })
}

