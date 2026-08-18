import { useState, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X, Star, Clock, ChevronDown, Search } from 'lucide-react'
import { restaurants, cuisineCategories } from '../data/restaurants'
import { formatPrice, formatDeliveryTime } from '../utils/format'
import { useThemeStore } from '../store/useThemeStore'
import { cn } from '../utils/cn'

const SORT_OPTIONS = [
  { value: 'default',      label: 'Recommended'        },
  { value: 'rating',       label: 'Highest rated'      },
  { value: 'delivery-asc', label: 'Fastest delivery'   },
  { value: 'fee-asc',      label: 'Lowest delivery fee'},
]

export default function Restaurants() {
  const [searchParams] = useSearchParams()
  const isDark = useThemeStore((s) => s.isDark)

  const [query,      setQuery]      = useState(searchParams.get('q') || '')
  const [activecat,  setActivecat]  = useState(searchParams.get('cat') || 'all')
  const [sortBy,     setSortBy]     = useState('default')
  const [sortOpen,   setSortOpen]   = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [maxFee,     setMaxFee]     = useState(1500)
  const [onlyOpen,   setOnlyOpen]   = useState(false)

  const activeFilters = [
    onlyOpen ? 1 : 0,
    maxFee < 1500 ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

  const filtered = useMemo(() => {
    let list = [...restaurants]

    if (query) {
      const q = query.toLowerCase()
      list = list.filter((r) =>
        r.name.toLowerCase().includes(q) ||
        r.tagline.toLowerCase().includes(q) ||
        r.cuisine.some((c) => c.toLowerCase().includes(q))
      )
    }

    const catMap: Record<string, string> = { Nigerian: 'Nigerian', Suya: 'Suya & Grills', Rice: 'Rice Dishes', Soups: 'Soups & Stews', FastFood: 'Fast Food', Shawarma: 'Shawarma', Noodles: 'Noodles' }
    if (activecat !== 'all') {
      const target = (catMap[activecat] || activecat).toLowerCase()
      list = list.filter((r) =>
        r.cuisine.some((c) => c.toLowerCase().includes(target) || target.includes(c.toLowerCase()))
      )
    }

    if (onlyOpen)       list = list.filter((r) => r.isOpen)
    if (maxFee < 1500)  list = list.filter((r) => r.deliveryFee <= maxFee)

    switch (sortBy) {
      case 'rating':       return list.sort((a, b) => b.rating - a.rating)
      case 'delivery-asc': return list.sort((a, b) => a.deliveryTime.min - b.deliveryTime.min)
      case 'fee-asc':      return list.sort((a, b) => a.deliveryFee - b.deliveryFee)
      default:             return list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    }
  }, [query, activecat, sortBy, onlyOpen, maxFee])

  const clearFilters = () => { setOnlyOpen(false); setMaxFee(1500) }

  const bg     = isDark ? '#0f0d0a' : '#faf8f5'
  const card   = isDark ? '#1a1714' : '#ffffff'
  const border = isDark ? 'rgba(255,255,255,0.06)' : '#e8e0d5'
  const muted  = isDark ? 'rgba(255,255,255,0.35)' : '#8a7560'
  const textPrimary = isDark ? 'white' : '#1a1209'

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ background: bg }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* ── Page header ── */}
        <div className="mb-8">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-pepper-500 text-xs tracking-[0.3em] uppercase mb-1.5">
            {filtered.length} {filtered.length === 1 ? 'restaurant' : 'restaurants'}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display text-3xl md:text-4xl font-light"
            style={{ color: textPrimary }}>
            {activecat === 'all' ? 'All restaurants' : cuisineCategories.find(c => c.id === activecat)?.label ?? activecat}
          </motion.h1>
        </div>

        {/* ── Search bar ── */}
        <div className="relative mb-6">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: muted }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search restaurants or dishes..."
            className="w-full pl-10 pr-4 py-3.5 rounded-2xl text-sm outline-none transition-all"
            style={{
              background: card,
              border: `1px solid ${border}`,
              color: textPrimary,
            }}
          />
          {query && (
            <button onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: muted }}>
              <X size={15} />
            </button>
          )}
        </div>

        {/* ── Category tabs ── */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-6">
          {cuisineCategories.map((cat) => (
            <button key={cat.id} onClick={() => setActivecat(cat.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm whitespace-nowrap flex-shrink-0 transition-all duration-200"
              style={{
                background: activecat === cat.id ? '#e8381a' : card,
                color: activecat === cat.id ? 'white' : muted,
                border: `1px solid ${activecat === cat.id ? '#e8381a' : border}`,
                fontWeight: activecat === cat.id ? 600 : 400,
              }}>
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Toolbar ── */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">

          {/* Filter button */}
          <button onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all"
            style={{
              background: activeFilters > 0 ? 'rgba(232,56,26,0.12)' : card,
              border: `1px solid ${activeFilters > 0 ? '#e8381a' : border}`,
              color: activeFilters > 0 ? '#e8381a' : muted,
            }}>
            <SlidersHorizontal size={15} />
            Filters
            {activeFilters > 0 && (
              <span className="w-5 h-5 bg-pepper-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {activeFilters}
              </span>
            )}
          </button>

          {/* Open now chip */}
          <button onClick={() => setOnlyOpen(!onlyOpen)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all"
            style={{
              background: onlyOpen ? 'rgba(34,197,94,0.12)' : card,
              border: `1px solid ${onlyOpen ? '#22c55e' : border}`,
              color: onlyOpen ? '#22c55e' : muted,
            }}>
            <span className={cn('w-2 h-2 rounded-full', onlyOpen ? 'bg-green-500' : 'bg-gray-400')} />
            Open now
          </button>

          {/* Sort */}
          <div className="relative ml-auto">
            <button onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all"
              style={{ background: card, border: `1px solid ${border}`, color: muted }}>
              {SORT_OPTIONS.find(o => o.value === sortBy)?.label}
              <ChevronDown size={13} className={cn('transition-transform', sortOpen && 'rotate-180')} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0,  scale: 1    }}
                  exit={{   opacity: 0, y: -6, scale: 0.97  }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-52 rounded-2xl overflow-hidden z-20 shadow-2xl"
                  style={{ background: card, border: `1px solid ${border}` }}>
                  {SORT_OPTIONS.map((opt) => (
                    <button key={opt.value}
                      onClick={() => { setSortBy(opt.value); setSortOpen(false) }}
                      className="w-full text-left px-4 py-3 text-sm transition-colors"
                      style={{
                        color: sortBy === opt.value ? '#e8381a' : muted,
                        background: sortBy === opt.value ? 'rgba(232,56,26,0.08)' : 'transparent',
                      }}>
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Restaurant grid ── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="font-display text-2xl font-light mb-2" style={{ color: textPrimary }}>
              Nothing matches that.
            </p>
            <p className="text-sm mb-6" style={{ color: muted }}>
              Try a different search or clear your filters.
            </p>
            <button onClick={() => { setQuery(''); setActivecat('all'); clearFilters() }}
              className="text-xs text-pepper-500 hover:text-pepper-400 underline underline-offset-4 transition-colors">
              Clear everything
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filtered.map((r, i) => (
              <motion.div key={r.id}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}>
                <Link to={`/restaurant/${r.id}`} className="group block">

                  {/* Image */}
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-3.5"
                    style={{ background: isDark ? '#2e2820' : '#e8e0d5' }}>
                    <motion.img src={r.image} alt={r.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} />
                    <div className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 55%)' }} />

                    {/* Closed overlay */}
                    {!r.isOpen && (
                      <div className="absolute inset-0 flex items-center justify-center"
                        style={{ background: 'rgba(0,0,0,0.55)' }}>
                        <span className="text-white text-sm font-semibold tracking-widest uppercase px-4 py-2 rounded-full"
                          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
                          Closed
                        </span>
                      </div>
                    )}

                    {/* Discount badge */}
                    {r.discount && (
                      <div className="absolute top-3 left-3 bg-pepper-500 text-white text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full">
                        {r.discount}
                      </div>
                    )}

                    {/* Featured badge */}
                    {r.isFeatured && (
                      <div className="absolute top-3 right-3 text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: 'white' }}>
                        ✦ Featured
                      </div>
                    )}

                    {/* Info overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div className="flex-1 min-w-0 mr-2">
                        <h3 className="font-display text-xl text-white leading-tight truncate">{r.name}</h3>
                        <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.55)' }}>{r.tagline}</p>
                      </div>
                      <div className="flex items-center gap-1 rounded-full px-2.5 py-1 flex-shrink-0"
                        style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
                        <Star size={11} style={{ color: '#f0a500', fill: '#f0a500' }} />
                        <span className="text-white text-xs font-semibold">{r.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Meta row */}
                  <div className="flex items-center gap-3 text-xs flex-wrap">
                    <span className="flex items-center gap-1" style={{ color: muted }}>
                      <Clock size={12} />{formatDeliveryTime(r.deliveryTime.min, r.deliveryTime.max)}
                    </span>
                    <span style={{ color: muted }}>{formatPrice(r.deliveryFee)} delivery</span>
                    <span style={{ color: muted }}>Min. {formatPrice(r.minOrder)}</span>
                    <span className="flex flex-wrap gap-1 ml-auto">
                      {r.cuisine.slice(0, 2).map((c) => (
                        <span key={c} className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{ background: isDark ? 'rgba(255,255,255,0.07)' : '#f0ebe3', color: muted }}>
                          {c}
                        </span>
                      ))}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ── Filter drawer ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40" style={{ background: 'rgba(0,0,0,0.5)' }}
              onClick={() => setDrawerOpen(false)} />

            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 left-0 h-full w-[85vw] max-w-xs z-50 flex flex-col shadow-2xl"
              style={{ background: isDark ? '#1a1714' : '#ffffff', borderRight: `1px solid ${border}` }}>

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-5"
                style={{ borderBottom: `1px solid ${border}` }}>
                <span className="font-semibold text-sm tracking-widest uppercase" style={{ color: textPrimary }}>
                  Filters
                </span>
                <button onClick={() => setDrawerOpen(false)} style={{ color: muted }}><X size={18} /></button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8">

                {/* Open now */}
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: muted }}>
                    Availability
                  </p>
                  <button onClick={() => setOnlyOpen(!onlyOpen)}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all"
                    style={{
                      background: onlyOpen ? 'rgba(34,197,94,0.1)' : isDark ? 'rgba(255,255,255,0.04)' : '#f5f0e8',
                      border: `1px solid ${onlyOpen ? '#22c55e' : border}`,
                    }}>
                    <span className="text-sm" style={{ color: onlyOpen ? '#22c55e' : textPrimary }}>Open now only</span>
                    <div className="w-11 h-6 rounded-full transition-colors relative"
                      style={{ background: onlyOpen ? '#22c55e' : isDark ? 'rgba(255,255,255,0.1)' : '#e0d8cc' }}>
                      <div className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
                        style={{ left: onlyOpen ? 'calc(100% - 20px)' : '4px' }} />
                    </div>
                  </button>
                </div>

                {/* Max delivery fee */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: muted }}>
                      Max delivery fee
                    </p>
                    <span className="text-xs font-semibold text-pepper-500">{formatPrice(maxFee)}</span>
                  </div>
                  <input type="range" min={200} max={1500} step={100}
                    value={maxFee}
                    onChange={(e) => setMaxFee(Number(e.target.value))}
                    className="w-full accent-pepper-500 cursor-pointer" />
                  <div className="flex justify-between text-[10px] mt-1" style={{ color: muted }}>
                    <span>₦200</span><span>₦1,500</span>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="px-5 py-4 flex gap-3" style={{ borderTop: `1px solid ${border}` }}>
                <button onClick={clearFilters}
                  className="flex-1 py-3 rounded-xl text-xs tracking-widest uppercase transition-all"
                  style={{ border: `1px solid ${border}`, color: muted }}>
                  Clear
                </button>
                <button onClick={() => setDrawerOpen(false)}
                  className="flex-1 py-3 rounded-xl text-xs tracking-widest uppercase font-bold text-white transition-colors bg-pepper-500 hover:bg-pepper-400">
                  Show {filtered.length}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
