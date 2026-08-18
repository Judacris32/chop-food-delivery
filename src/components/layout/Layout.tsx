import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from '../ui/CartDrawer'
import BackToTop from '../ui/BackToTop'
import { useThemeStore } from '../../store/useThemeStore'

export default function Layout() {
  const { pathname } = useLocation()
  const isDark = useThemeStore((s) => s.isDark)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  // Apply theme class to html element
  useEffect(() => {
    const html = document.documentElement
    if (isDark) {
      html.classList.add('dark')
      html.classList.remove('light')
    } else {
      html.classList.remove('dark')
      html.classList.add('light')
    }
  }, [isDark])

  return (
    <div style={{ minHeight: '100vh', background: isDark ? '#0f0d0a' : '#faf8f5', color: isDark ? '#f5f0e8' : '#1a1209' }}>
      <Navbar />
      <main><Outlet /></main>
      <Footer />
      <CartDrawer />
      <BackToTop />
    </div>
  )
}
