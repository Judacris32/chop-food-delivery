import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Star, Zap } from 'lucide-react'
import { restaurants, cuisineCategories } from '../data/restaurants'
import { formatPrice, formatDeliveryTime } from '../utils/format'
import { useThemeStore } from '../store/useThemeStore'
import { cn } from '../utils/cn'

const featured = restaurants.filter((r) => r.isFeatured)
const popular  = restaurants.filter((r) => r.isPopular)

// Hero: party jollof platter | suya on skewers | cheesy shawarma
const heroImages = [
  { src: '/foods/rice-meat-6.jpg',  label: 'Party Jollof Rice & Grilled Chicken' },
  { src: '/foods/suya-1.jpg',       label: 'Suya on Skewers with Tomato & Onion' },
  { src: '/foods/shawama-3.jpg',    label: 'Cheesy Chicken Shawarma'              },
]

export default function Home() {
  const isDark = useThemeStore((s) => s.isDark)

  return (
    <div className="pb-20">

      {/* ── Hero ── */}
      <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 flex">
          {heroImages.map(({ src, label }, i) => (
            <motion.div key={i} className="flex-1 overflow-hidden"
              initial={{ scale: 1.08, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              transition={{ duration: 1.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}>
              <img src={src} alt={label} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.8) 28%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.15) 100%)' }} />

        <div className="relative z-10 w-full max-w-3xl mx-auto px-5 md:px-8 pb-16 md:pb-28 pt-32 text-center flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display leading-[0.95] mb-6"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)', color: 'white', fontWeight: 300, letterSpacing: '-0.02em' }}>
            Jollof. Suya.<br />
            <em style={{ color: '#e8381a', fontStyle: 'italic', fontWeight: 400 }}>Delivered.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-xl max-w-lg mb-3 font-display"
            style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 300 }}>
            The real thing. Not a watered-down version.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm md:text-base max-w-md mb-9 leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            Party jollof with the smoky bottom, suya with the right amount of yaji, shawarma that actually has filling — from Lagos and Abuja's best spots.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/restaurants"
              className="inline-flex items-center justify-center gap-2 bg-pepper-500 hover:bg-pepper-400 text-white font-semibold px-8 py-4 rounded-2xl transition-colors text-base group">
              Order now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/restaurants?cat=Nigerian"
              className="inline-flex items-center justify-center gap-2 text-white font-medium px-8 py-4 rounded-2xl transition-all duration-200 text-base"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(255,255,255,0.22)'
                el.style.borderColor = 'rgba(255,255,255,0.4)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(255,255,255,0.1)'
                el.style.borderColor = 'rgba(255,255,255,0.2)'
              }}>
              Browse Nigerian food
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-6 mt-10 flex-wrap">
            {[
              { icon: Zap,   text: '15 min average delivery'  },
              { icon: Star,  text: '4.7 avg restaurant rating' },
              { icon: Clock, text: 'Open until midnight'       },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>
                <Icon size={13} className="text-pepper-500 flex-shrink-0" />{text}
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="text-xs mt-10 tracking-widest uppercase"
            style={{ color: 'rgba(255,255,255,0.2)' }}>
            Scroll to see what's on ↓
          </motion.p>
        </div>
      </section>

      {/* ── Cuisine categories ── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-14">
        <p className={cn('text-sm mb-5', isDark ? 'text-white/40' : 'text-stone-400')}>
          What are you feeling today?
        </p>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {cuisineCategories.map((cat, i) => (
            <motion.div key={cat.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}>
              <Link to={cat.id === 'all' ? '/restaurants' : `/restaurants?cat=${cat.id}`}
                className="flex flex-col items-center gap-2 flex-shrink-0 group">
                <div className={cn(
                  'w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all duration-200 group-hover:scale-105 border',
                  isDark
                    ? 'bg-chop-800 border-white/5 group-hover:border-pepper-500/40 group-hover:bg-pepper-500/10'
                    : 'bg-stone-100 border-stone-200 group-hover:border-pepper-500/30 group-hover:bg-pepper-500/5'
                )}>
                  {cat.emoji}
                </div>
                <span className={cn('text-xs whitespace-nowrap transition-colors group-hover:text-pepper-500',
                  isDark ? 'text-white/40' : 'text-stone-500')}>
                  {cat.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Featured restaurants ── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-14 md:pt-20">
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="text-pepper-500 text-xs tracking-[0.3em] uppercase mb-3">Handpicked</p>
          <h2 className="font-display text-3xl md:text-4xl font-light mb-3" style={{ color: isDark ? 'white' : '#1c1917' }}>
            Worth the wait
          </h2>
          <p className="text-sm leading-relaxed mb-5" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : '#78716c' }}>
            Restaurants our team has actually eaten at.<br className="hidden md:block" />
            We don't list what we haven't tasted.
          </p>
          <Link to="/restaurants"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-pepper-500 hover:text-pepper-400 transition-colors group">
            See all restaurants
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map((r, i) => (
            <motion.div key={r.id}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}>
              <Link to={`/restaurant/${r.id}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-3.5"
                  style={{ background: isDark ? '#2e2820' : '#e8e0d5' }}>
                  <motion.img src={r.image} alt={r.name} className="w-full h-full object-cover"
                    whileHover={{ scale: 1.06 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} />
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)' }} />
                  {r.discount && (
                    <div className="absolute top-3 left-3 bg-pepper-500 text-white text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full">
                      {r.discount}
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <h3 className="font-display text-xl text-white leading-tight">{r.name}</h3>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>{r.tagline}</p>
                    </div>
                    <div className="flex items-center gap-1 rounded-full px-2.5 py-1 flex-shrink-0"
                      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
                      <Star size={11} style={{ color: '#f0a500', fill: '#f0a500' }} />
                      <span className="text-white text-xs font-semibold">{r.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className={cn('flex items-center gap-1', isDark ? 'text-white/40' : 'text-stone-400')}>
                    <Clock size={12} />{formatDeliveryTime(r.deliveryTime.min, r.deliveryTime.max)}
                  </span>
                  <span className={isDark ? 'text-white/40' : 'text-stone-400'}>{formatPrice(r.deliveryFee)} delivery</span>
                  <span className={cn('ml-auto font-medium', r.isOpen ? 'text-green-500' : 'text-red-400')}>
                    {r.isOpen ? 'Open' : 'Closed'}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Editorial break ── */}
      <section className="my-16 md:my-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="relative min-h-[380px] md:min-h-[420px] flex items-center">

          {/* Full bleed suya image */}
          <div className="absolute inset-0">
            <img
              src="/foods/suya-1.jpg"
              alt="Suya at midnight"
              className="w-full h-full object-cover"
            />
            {/* Dark overlay — heavier on left so text reads, lighter right so image shows */}
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 100%)' }} />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
          </div>

          {/* Content always white — sits on top of dark image */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-16">

              <div className="max-w-lg">
                {/* Eyebrow */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-pepper-500 animate-pulse" />
                  <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Open past midnight
                  </span>
                </div>

                <p className="font-display font-light leading-[1.05] mb-4"
                  style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: 'white' }}>
                  Suya at midnight.<br />
                  <em style={{ color: '#e8381a' }}>We don&apos;t judge.</em>
                </p>

                <p className="text-sm md:text-base leading-relaxed mb-7 max-w-sm"
                  style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Late night hunger is real and it deserves better than whatever is left in the fridge. We stay open so you always have a proper option.
                </p>

                {/* Stats row */}
                <div className="flex items-center gap-6 mb-8">
                  {[
                    { value: '11pm', label: 'Last order' },
                    { value: '18 min', label: 'Avg delivery' },
                    { value: '6+', label: 'Suya spots' },
                  ].map(({ value, label }) => (
                    <div key={label}>
                      <p className="font-display text-xl md:text-2xl font-light" style={{ color: 'white' }}>{value}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
                    </div>
                  ))}
                </div>

                <Link to="/restaurants?cat=Suya"
                  className="inline-flex items-center gap-2 bg-pepper-500 hover:bg-pepper-400 text-white font-semibold px-7 py-4 rounded-2xl transition-colors text-sm group">
                  Find suya near you
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Right — floating food tag */}
              <div className="hidden md:flex flex-col gap-3 flex-shrink-0">
                {[
                  { name: 'Beef Suya (500g)', price: '₦4,500', tag: '🔥 Bestseller' },
                  { name: 'Chicken Suya',    price: '₦3,500', tag: '⭐ Rated 4.8' },
                  { name: 'Mixed Platter',   price: '₦6,000', tag: '👥 For sharing' },
                ].map((item) => (
                  <Link to="/restaurants?cat=Suya" key={item.name}
                    className="flex items-center justify-between gap-8 px-5 py-3.5 rounded-2xl transition-all hover:scale-[1.02]"
                    style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'white' }}>{item.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{item.tag}</p>
                    </div>
                    <p className="text-sm font-semibold flex-shrink-0" style={{ color: '#e8381a' }}>{item.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Popular now ── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="text-pepper-500 text-xs tracking-[0.3em] uppercase mb-3">Moving fast</p>
          <h2 className="font-display text-3xl md:text-4xl font-light mb-3" style={{ color: isDark ? 'white' : '#1c1917' }}>
            Popular right now
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : '#78716c' }}>
            These are the places people keep coming back to.<br className="hidden md:block" />
            Not sponsored just genuinely good.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {popular.map((r, i) => (
            <motion.div key={r.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}>
              <Link to={`/restaurant/${r.id}`}
                className={cn('group flex items-center gap-4 rounded-2xl p-4 transition-all duration-200 border',
                  isDark
                    ? 'bg-chop-900 hover:bg-chop-800 border-white/5 hover:border-white/10'
                    : 'bg-stone-50 hover:bg-stone-100 border-stone-200 hover:border-stone-300')}>
                <div className={cn('w-20 h-20 rounded-xl overflow-hidden flex-shrink-0',
                  isDark ? 'bg-chop-700' : 'bg-stone-200')}>
                  <img src={r.image} alt={r.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={cn('font-display text-lg leading-tight truncate',
                    isDark ? 'text-white' : 'text-stone-900')}>{r.name}</h3>
                  <p className={cn('text-xs mt-0.5 truncate', isDark ? 'text-white/40' : 'text-stone-400')}>
                    {r.cuisine.join(' · ')}
                  </p>
                  <div className={cn('flex items-center gap-3 mt-2 text-xs', isDark ? 'text-white/40' : 'text-stone-400')}>
                    <span className="flex items-center gap-1">
                      <Star size={10} style={{ color: '#f0a500', fill: '#f0a500' }} />{r.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />{formatDeliveryTime(r.deliveryTime.min, r.deliveryTime.max)}
                    </span>
                    <span>{formatPrice(r.deliveryFee)} delivery</span>
                  </div>
                </div>
                <ArrowRight size={16} className={cn('flex-shrink-0 group-hover:translate-x-1 transition-all',
                  isDark ? 'text-white/20 group-hover:text-white' : 'text-stone-300 group-hover:text-stone-700')} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
