import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { platteDebug } from '../utils/debugLog'

/**
 * Scrolls to top when pathname changes. Scrolls to hash element when hash is present.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const prevPathnameRef = useRef(pathname)

  useEffect(() => {
    const pathnameChanged = prevPathnameRef.current !== pathname
    prevPathnameRef.current = pathname

    platteDebug('ScrollToTop', 'effect', { pathname, hash, pathnameChanged })

    if (pathnameChanged) {
      window.scrollTo(0, 0)
      platteDebug('ScrollToTop', 'window.scrollTo(0,0) after pathname change')
    }

    if (hash) {
      const id = hash.slice(1)
      const el = document.getElementById(id)
      platteDebug('ScrollToTop', 'hash target', { hash, id, found: !!el })
      if (el) {
        const scroll = () => el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        const t = setTimeout(scroll, pathnameChanged ? 50 : 0)
        return () => clearTimeout(t)
      }
    }
  }, [pathname, hash])

  return null
}
