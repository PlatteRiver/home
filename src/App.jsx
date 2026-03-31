import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Blog from './pages/Blog'
import About from './pages/About'
import Training from './pages/Training'
import AcreVision from './pages/AcreVision'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import { platteDebug } from './utils/debugLog'

function RouteDebug() {
  const loc = useLocation()
  useEffect(() => {
    platteDebug('Router', 'navigation', {
      pathname: loc.pathname,
      search: loc.search,
      hash: loc.hash,
      key: loc.key,
      fullHref: typeof window !== 'undefined' ? window.location.href : '',
    })
  }, [loc.pathname, loc.search, loc.hash, loc.key])
  return null
}

function App() {
  return (
    <Router>
      <RouteDebug />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/training" element={<Training />} />
        <Route path="/acrevision" element={<AcreVision />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </Router>
  )
}

export default App
