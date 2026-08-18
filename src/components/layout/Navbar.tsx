import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, MapPin, Menu, X, Sun, Moon } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import { useThemeStore } from '../../store/useThemeStore'

const links = [
  { to: '/restaurants',              label: 'All Restaurants' },
  { to: '/restaurants?cat=Nigerian', label: 'Nigerian'        },
  { to: '/restaurants?cat=Suya',     label: 'Suya & Grills'  },
  { to: '/restaurants?cat=FastFood', label: 'Fast Food'       },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { isDark, toggle } = useThemeStore()
  const totalItems = useCartStore((s) => s.totalItems)
  const openCart   = useCartStore((s) => s.openCart)
  const location   = useLocation()
  const isHome     = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  const transparent = isHome && !scrolled

  // Nav link color — on transparent hero always white, else theme-aware
  const linkColor = transparent
    ? 'rgba(255,255,255,0.85)'
    : isDark ? 'rgba(255,255,255,0.7)' : '#57534e'

  const linkHoverColor = transparent
    ? 'white'
    : isDark ? 'white' : '#1c1917'

  const iconBtnStyle = {
    border: `1px solid ${transparent ? 'rgba(255,255,255,0.2)' : isDark ? 'rgba(255,255,255,0.12)' : '#d6d3d1'}`,
    color: transparent ? 'rgba(255,255,255,0.7)' : isDark ? 'rgba(255,255,255,0.5)' : '#78716c',
    background: 'transparent',
  }

  return (
    <>
      <header
        style={transparent
          ? { background: 'transparent' }
          : isDark
            ? { background: 'rgba(15,13,10,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }
            : { background: 'rgba(250,248,245,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #e8e0d5' }
        }
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 bg-pepper-500 rounded-xl flex items-center justify-center font-display font-bold text-white text-lg leading-none select-none">
              C
            </div>
            <span style={{ color: transparent ? 'white' : isDark ? 'white' : '#1c1917' }}
              className="font-display text-xl font-medium">
              Chop
            </span>
          </Link>

          {/* Nav links — desktop */}
          <nav className="hidden md:flex items-center gap-7 flex-1 justify-center">
            {links.map(({ to, label }) => (
              <Link key={label} to={to}
                style={{ color: linkColor }}
                onMouseEnter={(e) => (e.currentTarget.style.color = linkHoverColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
                className="text-sm transition-colors relative group whitespace-nowrap">
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-pepper-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 flex-shrink-0">

            {/* Theme toggle */}
            <button onClick={toggle} title={isDark ? 'Light mode' : 'Dark mode'}
              style={iconBtnStyle}
              className="w-9 h-9 flex items-center justify-center rounded-xl transition-all hover:opacity-100">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={isDark ? 'moon' : 'sun'}
                  initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0,   scale: 1   }}
                  exit={{   opacity: 0, rotate:  20,  scale: 0.8 }}
                  transition={{ duration: 0.15 }}>
                  {isDark ? <Moon size={15} /> : <Sun size={15} />}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Cart */}
            <button onClick={openCart}
              className="relative flex items-center gap-2 bg-pepper-500 hover:bg-pepper-400 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
              <ShoppingBag size={16} />
              <span className="hidden sm:inline">Cart</span>
              <AnimatePresence>
                {totalItems() > 0 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white text-pepper-500 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems()}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Hamburger — mobile */}
            <button onClick={() => setMenuOpen(true)}
              style={{ color: transparent ? 'white' : isDark ? 'white' : '#1c1917' }}
              className="md:hidden w-9 h-9 flex items-center justify-center">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40" style={{ background: 'rgba(0,0,0,0.5)' }}
              onClick={() => setMenuOpen(false)} />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              style={{ background: isDark ? '#0f0d0a' : '#faf8f5' }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-xs z-50 flex flex-col shadow-2xl">

              <div style={{ borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e8e0d5' }}
                className="flex items-center justify-between px-5 py-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-pepper-500 rounded-xl flex items-center justify-center font-display font-bold text-white">C</div>
                  <span style={{ color: isDark ? 'white' : '#1c1917' }} className="font-display text-lg">Chop</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={toggle} style={iconBtnStyle}
                    className="w-8 h-8 flex items-center justify-center rounded-xl border transition-all">
                    {isDark ? <Moon size={14} /> : <Sun size={14} />}
                  </button>
                  <button onClick={() => setMenuOpen(false)}
                    style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#78716c' }}>
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div style={{ borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e8e0d5' }}
                className="px-5 py-3.5">
                <p style={{ color: isDark ? 'rgba(255,255,255,0.4)' : '#78716c' }}
                  className="flex items-center gap-2 text-sm">
                  <MapPin size={13} className="text-pepper-500" />
                  Delivering to <span style={{ color: isDark ? 'white' : '#1c1917' }} className="font-medium ml-1">Lagos Island</span>
                </p>
              </div>

              <nav className="flex flex-col px-5 py-4 flex-1 overflow-y-auto">
                {links.map(({ to, label }, i) => (
                  <motion.div key={label} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}>
                    <Link to={to} onClick={() => setMenuOpen(false)}
                      style={{
                        borderBottom: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #f0ebe3',
                        color: isDark ? 'rgba(255,255,255,0.8)' : '#292524',
                      }}
                      className="block font-display text-xl py-3.5 transition-colors">
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="px-5 pb-8 pt-4">
                <button onClick={() => { openCart(); setMenuOpen(false) }}
                  className="w-full flex items-center justify-center gap-2 bg-pepper-500 hover:bg-pepper-400 text-white font-semibold py-3.5 rounded-2xl transition-colors">
                  <ShoppingBag size={18} />
                  View Cart {totalItems() > 0 && `(${totalItems()})`}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
