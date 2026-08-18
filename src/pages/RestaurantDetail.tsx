import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Star, Clock, Plus, Minus, ShoppingBag, CheckCircle, X } from 'lucide-react'
import { restaurants } from '../data/restaurants'
import { useCartStore } from '../store/useCartStore'
import { useThemeStore } from '../store/useThemeStore'
import { formatPrice, formatDeliveryTime } from '../utils/format'
import { MenuItem } from '../types'

export default function RestaurantDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isDark = useThemeStore((s) => s.isDark)
  const { items, addItem, updateQty, openCart } = useCartStore()

  const restaurant = restaurants.find((r) => r.id === id)
  const [activeCategory, setActiveCategory] = useState(restaurant?.menu[0]?.id || '')
  const [toast, setToast] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  if (!restaurant) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 pt-24">
      <p className="font-display text-2xl" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : '#a8a29e' }}>
        Restaurant not found
      </p>
      <button onClick={() => navigate('/restaurants')}
        className="text-sm text-pepper-500 hover:text-pepper-400 underline underline-offset-4">
        Back to restaurants
      </button>
    </div>
  )

  const bg         = isDark ? '#0f0d0a' : '#faf8f5'
  const card       = isDark ? '#1a1714' : '#ffffff'
  const border     = isDark ? 'rgba(255,255,255,0.06)' : '#e8e0d5'
  const textPrimary = isDark ? 'white' : '#1c1917'
  const textMuted  = isDark ? 'rgba(255,255,255,0.4)' : '#78716c'

  const getQty = (itemId: string) => items.find((i) => i.item.id === itemId)?.quantity || 0

  const showToast = (name: string) => {
    setToast(name)
    setTimeout(() => setToast(null), 2500)
  }

  const handleAdd = (item: MenuItem) => {
    addItem(restaurant.id, restaurant.name, item)
    showToast(item.name)
  }

  const cartTotal   = items.filter((i) => i.restaurantId === restaurant.id).reduce((s, i) => s + i.item.price * i.quantity, 0)
  const cartCount   = items.filter((i) => i.restaurantId === restaurant.id).reduce((s, i) => s + i.quantity, 0)

  return (
    <div className="min-h-screen pb-32" style={{ background: bg }}>

      {/* ── Hero image ── */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />

        {/* Back button */}
        <button onClick={() => navigate(-1)}
          className="absolute top-20 left-5 md:left-8 flex items-center gap-2 text-white text-sm group"
          style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', padding: '8px 14px', borderRadius: '999px' }}>
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          Back
        </button>

        {/* Restaurant info overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-5 md:px-8 pb-5">
          <div className="max-w-7xl mx-auto">
            {restaurant.discount && (
              <span className="inline-block bg-pepper-500 text-white text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full mb-2">
                {restaurant.discount}
              </span>
            )}
            <h1 className="font-display text-3xl md:text-4xl text-white font-light mb-1">{restaurant.name}</h1>
            <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.65)' }}>{restaurant.tagline}</p>
            <div className="flex items-center gap-4 text-xs text-white flex-wrap">
              <span className="flex items-center gap-1">
                <Star size={12} style={{ color: '#f0a500', fill: '#f0a500' }} />
                <strong>{restaurant.rating}</strong>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>({restaurant.reviewCount.toLocaleString()} reviews)</span>
              </span>
              <span className="flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <Clock size={12} />{formatDeliveryTime(restaurant.deliveryTime.min, restaurant.deliveryTime.max)}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>{formatPrice(restaurant.deliveryFee)} delivery</span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>Min. {formatPrice(restaurant.minOrder)}</span>
              <span className={restaurant.isOpen ? 'text-green-400' : 'text-red-400'} style={{ fontWeight: 600 }}>
                {restaurant.isOpen ? '● Open now' : '● Closed'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* ── Category tabs ── */}
        <div className="sticky top-16 z-30 -mx-5 md:-mx-8 px-5 md:px-8 py-3"
          style={{ background: isDark ? 'rgba(15,13,10,0.96)' : 'rgba(250,248,245,0.97)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${border}` }}>
          <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto scrollbar-hide">
            {restaurant.menu.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className="px-4 py-2 rounded-full text-sm whitespace-nowrap flex-shrink-0 transition-all duration-200"
                style={{
                  background: activeCategory === cat.id ? '#e8381a' : 'transparent',
                  color: activeCategory === cat.id ? 'white' : textMuted,
                  fontWeight: activeCategory === cat.id ? 600 : 400,
                  border: `1px solid ${activeCategory === cat.id ? '#e8381a' : border}`,
                }}>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* ── Menu items ── */}
        <div className="pt-6 pb-4 space-y-10">
          {restaurant.menu
            .filter((cat) => !activeCategory || cat.id === activeCategory)
            .map((cat) => (
              <div key={cat.id}>
                <h2 className="font-display text-2xl font-light mb-5" style={{ color: textPrimary }}>
                  {cat.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cat.items.map((item, i) => {
                    const qty = getQty(item.id)
                    return (
                      <motion.div key={item.id}
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.05 }}
                        className="flex gap-4 p-4 rounded-2xl transition-all cursor-pointer group"
                        style={{ background: card, border: `1px solid ${border}` }}
                        onClick={() => setSelectedItem(item)}>

                        {/* Food image */}
                        <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0"
                          style={{ background: isDark ? '#2e2820' : '#f0ebe3' }}>
                          <img src={item.image} alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start gap-2 mb-1 flex-wrap">
                              <h3 className="font-display text-base font-light leading-snug" style={{ color: textPrimary }}>
                                {item.name}
                              </h3>
                              {item.isPopular && (
                                <span className="text-[9px] font-bold tracking-wide px-1.5 py-0.5 rounded-full bg-pepper-500/15 text-pepper-500 flex-shrink-0 mt-0.5">
                                  Popular
                                </span>
                              )}
                              {item.isNew && (
                                <span className="text-[9px] font-bold tracking-wide px-1.5 py-0.5 rounded-full flex-shrink-0 mt-0.5"
                                  style={{ background: 'rgba(34,197,94,0.12)', color: '#22c55e' }}>
                                  New
                                </span>
                              )}
                            </div>
                            <p className="text-xs leading-relaxed line-clamp-2 mb-2" style={{ color: textMuted }}>
                              {item.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="font-display text-base" style={{ color: textPrimary }}>
                              {formatPrice(item.price)}
                            </span>

                            {/* Add / qty control */}
                            <div onClick={(e) => e.stopPropagation()}>
                              {qty === 0 ? (
                                <button onClick={() => handleAdd(item)}
                                  className="flex items-center gap-1.5 bg-pepper-500 hover:bg-pepper-400 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors">
                                  <Plus size={13} /> Add
                                </button>
                              ) : (
                                <div className="flex items-center gap-2 rounded-xl overflow-hidden"
                                  style={{ border: `1px solid ${border}` }}>
                                  <button onClick={() => updateQty(item.id, qty - 1)}
                                    className="w-8 h-8 flex items-center justify-center hover:bg-pepper-500 hover:text-white transition-colors"
                                    style={{ color: textMuted }}>
                                    <Minus size={13} />
                                  </button>
                                  <span className="text-sm font-semibold w-5 text-center" style={{ color: textPrimary }}>
                                    {qty}
                                  </span>
                                  <button onClick={() => handleAdd(item)}
                                    className="w-8 h-8 flex items-center justify-center bg-pepper-500 hover:bg-pepper-400 text-white transition-colors">
                                    <Plus size={13} />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* ── Item detail modal ── */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
              onClick={() => setSelectedItem(null)}
            />

            {/* Modal — always centered */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{   opacity: 0, scale: 0.93, y: 20  }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl z-10"
              style={{ background: card }}
            >
              {/* Close button — outside image, always on top */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-pepper-500 hover:text-white"
                style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', color: 'white' }}
              >
                <X size={16} />
              </button>

              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)' }} />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-display text-xl font-light" style={{ color: textPrimary }}>
                    {selectedItem.name}
                  </h3>
                  <span className="font-display text-xl font-light flex-shrink-0" style={{ color: '#e8381a' }}>
                    {formatPrice(selectedItem.price)}
                  </span>
                </div>

                <p className="text-sm leading-relaxed mb-4" style={{ color: textMuted }}>
                  {selectedItem.description}
                </p>

                {selectedItem.tags && selectedItem.tags.length > 0 && (
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {selectedItem.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(232,56,26,0.1)', color: '#e8381a' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="flex-shrink-0 px-5 py-3.5 rounded-2xl text-sm transition-all"
                    style={{ border: `1px solid ${border}`, color: textMuted }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => { handleAdd(selectedItem); setSelectedItem(null) }}
                    className="flex-1 bg-pepper-500 hover:bg-pepper-400 text-white font-semibold py-3.5 rounded-2xl transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Plus size={15} />
                    Add to cart — {formatPrice(selectedItem.price)}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Toast notification ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: 20,  scale: 0.95 }}
            className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl text-sm font-medium text-white whitespace-nowrap"
            style={{ background: '#1a1714', border: '1px solid rgba(255,255,255,0.1)' }}>
            <CheckCircle size={15} className="text-green-400" />
            Added to cart
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sticky cart bar ── */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0,   opacity: 1 }}
            exit={{   y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 24, stiffness: 260 }}
            className="fixed bottom-0 left-0 right-0 z-40 px-5 pb-6 pt-3"
            style={{ background: isDark ? 'linear-gradient(to top, rgba(15,13,10,1) 60%, transparent)' : 'linear-gradient(to top, rgba(250,248,245,1) 60%, transparent)' }}>
            <button onClick={openCart}
              className="w-full max-w-lg mx-auto flex items-center justify-between bg-pepper-500 hover:bg-pepper-400 text-white font-semibold px-5 py-4 rounded-2xl transition-colors shadow-xl">
              <span className="flex items-center gap-2">
                <ShoppingBag size={18} />
                View cart · {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
              <span className="font-display text-lg font-light">{formatPrice(cartTotal)}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
