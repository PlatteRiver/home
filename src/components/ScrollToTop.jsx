import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls to top when pathname changes. Scrolls to hash element when hash is present.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const prevPathnameRef = useRef(pathname)

  useEffect(() => {
    const pathnameChanged = prevPathnameRef.current !== pathname
    prevPathnameRef.current = pathname

    if (pathnameChanged) {
      window.scrollTo(0, 0)
    }

    if (hash) {
      const id = hash.slice(1)
      const el = document.getElementById(id)
      if (el) {
        const scroll = () => el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        const t = setTimeout(scroll, pathnameChanged ? 50 : 0)
        return () => clearTimeout(t)
      }
    }
  }, [pathname, hash])

  return null
}
