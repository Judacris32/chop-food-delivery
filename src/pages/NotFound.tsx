import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useThemeStore } from '../store/useThemeStore'

export default function NotFound() {
  const isDark = useThemeStore((s) => s.isDark)
  const textPrimary = isDark ? 'white' : '#1c1917'
  const textMuted   = isDark ? 'rgba(255,255,255,0.35)' : '#78716c'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center pt-20"
      style={{ background: isDark ? '#0f0d0a' : '#faf8f5' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="font-display leading-none select-none mb-0"
          style={{ fontSize: 'clamp(6rem, 20vw, 12rem)', color: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)', fontWeight: 300 }}>
          404
        </p>
        <p className="text-pepper-500 text-xs tracking-[0.3em] uppercase mb-3 -mt-6">Page not found</p>
        <h1 className="font-display text-3xl md:text-4xl font-light mb-3" style={{ color: textPrimary }}>
          This page doesn't exist
        </h1>
        <p className="text-sm max-w-sm mx-auto leading-relaxed mb-8" style={{ color: textMuted }}>
          Looks like you took a wrong turn. The good news — the food is still available.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/"
            className="inline-flex items-center justify-center bg-pepper-500 hover:bg-pepper-400 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm">
            Go home
          </Link>
          <Link to="/restaurants"
            className="inline-flex items-center justify-center text-sm transition-colors px-7 py-3.5 rounded-xl"
            style={{ border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e8e0d5'}`, color: textMuted }}>
            Browse restaurants
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
