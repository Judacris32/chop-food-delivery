import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../../store/useCartStore'
import { useThemeStore } from '../../store/useThemeStore'
import { formatPrice } from '../../utils/format'
import { restaurants } from '../../data/restaurants'

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, total, totalItems } = useCartStore()
  const isDark = useThemeStore((s) => s.isDark)

  const bg     = isDark ? '#1a1714' : '#ffffff'
  const border = isDark ? 'rgba(255,255,255,0.06)' : '#e8e0d5'
  const textPrimary = isDark ? 'white' : '#1c1917'
  const textMuted   = isDark ? 'rgba(255,255,255,0.4)' : '#78716c'

  const deliveryFee = items.length > 0 ? 600 : 0
  const grandTotal  = total() + deliveryFee

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
            onClick={closeCart} />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 h-full z-50 flex flex-col shadow-2xl"
            style={{ width: 'min(420px, 92vw)', background: bg, borderLeft: `1px solid ${border}` }}>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-5"
              style={{ borderBottom: `1px solid ${border}` }}>
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} style={{ color: '#e8381a' }} />
                <span className="font-display text-lg font-light" style={{ color: textPrimary }}>
                  Your order
                </span>
                {totalItems() > 0 && (
                  <span className="w-5 h-5 bg-pepper-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems()}
                  </span>
                )}
              </div>
              <button onClick={closeCart}
                className="w-8 h-8 flex items-center justify-center rounded-xl transition-colors hover:bg-pepper-500 hover:text-white"
                style={{ color: textMuted, border: `1px solid ${border}` }}>
                <X size={15} />
              </button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: isDark ? 'rgba(255,255,255,0.05)' : '#f5f0e8' }}>
                  🛒
                </div>
                <div>
                  <p className="font-display text-xl font-light mb-1" style={{ color: textPrimary }}>
                    Nothing here yet
                  </p>
                  <p className="text-sm" style={{ color: textMuted }}>
                    Pick something good and it'll show up here.
                  </p>
                </div>
                <button onClick={closeCart}
                  className="mt-2 text-sm text-pepper-500 hover:text-pepper-400 underline underline-offset-4 transition-colors">
                  Browse restaurants
                </button>
              </div>
            ) : (
              <>
                {/* Restaurant name */}
                {items[0] && (
                  <div className="px-5 py-3" style={{ borderBottom: `1px solid ${border}` }}>
                    <p className="text-xs" style={{ color: textMuted }}>
                      Ordering from <span style={{ color: textPrimary, fontWeight: 600 }}>{items[0].restaurantName}</span>
                    </p>
                  </div>
                )}

                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                  {items.map((cartItem) => (
                    <motion.div key={cartItem.item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-3 items-center p-3 rounded-2xl"
                      style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#f5f0e8', border: `1px solid ${border}` }}>

                      {/* Image */}
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={cartItem.item.image} alt={cartItem.item.name}
                          className="w-full h-full object-cover" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-snug truncate" style={{ color: textPrimary }}>
                          {cartItem.item.name}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: textMuted }}>
                          {formatPrice(cartItem.item.price)} each
                        </p>
                      </div>

                      {/* Qty controls */}
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button onClick={() => updateQty(cartItem.item.id, cartItem.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors hover:bg-pepper-500 hover:text-white"
                          style={{ border: `1px solid ${border}`, color: textMuted }}>
                          {cartItem.quantity === 1 ? <Trash2 size={11} /> : <Minus size={11} />}
                        </button>
                        <span className="text-sm font-semibold w-5 text-center" style={{ color: textPrimary }}>
                          {cartItem.quantity}
                        </span>
                        <button onClick={() => updateQty(cartItem.item.id, cartItem.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-pepper-500 hover:bg-pepper-400 text-white transition-colors">
                          <Plus size={11} />
                        </button>
                      </div>

                      {/* Line total */}
                      <p className="text-sm font-semibold flex-shrink-0 w-16 text-right" style={{ color: textPrimary }}>
                        {formatPrice(cartItem.item.price * cartItem.quantity)}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Summary */}
                <div className="px-5 pt-4 pb-2 space-y-2.5"
                  style={{ borderTop: `1px solid ${border}` }}>
                  <div className="flex justify-between text-sm" style={{ color: textMuted }}>
                    <span>Subtotal</span>
                    <span>{formatPrice(total())}</span>
                  </div>
                  <div className="flex justify-between text-sm" style={{ color: textMuted }}>
                    <span>Delivery fee</span>
                    <span>{formatPrice(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold pt-2"
                    style={{ borderTop: `1px solid ${border}`, color: textPrimary }}>
                    <span>Total</span>
                    <span>{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <div className="px-5 pb-6 pt-3">
                  <Link to="/checkout" onClick={closeCart}
                    className="w-full flex items-center justify-between bg-pepper-500 hover:bg-pepper-400 text-white font-semibold px-5 py-4 rounded-2xl transition-colors">
                    <span className="flex items-center gap-2">
                      <ShoppingBag size={16} />
                      Checkout
                    </span>
                    <span className="flex items-center gap-1">
                      {formatPrice(grandTotal)}
                      <ArrowRight size={15} />
                    </span>
                  </Link>
                  <p className="text-center text-xs mt-3" style={{ color: textMuted }}>
                    Min. order {formatPrice(items[0] ? (restaurants.find(r => r.id === items[0].restaurantId)?.minOrder || 0) : 0)}
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
