import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChefHat, Bike, Home as HomeIcon, Phone, Star } from 'lucide-react'
import { useThemeStore } from '../store/useThemeStore'

type TrackingStatus = 'confirmed' | 'preparing' | 'on-the-way' | 'delivered'

const STEPS: { id: TrackingStatus; label: string; sub: string; icon: typeof CheckCircle; duration: number }[] = [
  { id: 'confirmed',   label: 'Order confirmed',    sub: 'Restaurant has received your order.',         icon: CheckCircle, duration: 3000  },
  { id: 'preparing',  label: 'Being prepared',      sub: 'The kitchen is working on your food now.',    icon: ChefHat,     duration: 8000  },
  { id: 'on-the-way', label: 'On the way',          sub: 'Your rider has picked up and is heading over.',icon: Bike,       duration: 12000 },
  { id: 'delivered',  label: 'Delivered',           sub: 'Your order has arrived. Enjoy your food.',    icon: HomeIcon,    duration: 0     },
]

export default function OrderTracking() {
  const { id } = useParams()
  const isDark = useThemeStore((s) => s.isDark)
  const [currentStep, setCurrentStep] = useState(0)
  const [showRating, setShowRating]   = useState(false)
  const [rating, setRating]           = useState(0)
  const [rated, setRated]             = useState(false)

  // Simulate order progression
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    let elapsed = 0
    STEPS.forEach((_step, i) => {
      if (i === 0) return
      elapsed += STEPS[i - 1].duration
      timers.push(setTimeout(() => setCurrentStep(i), elapsed))
    })
    // Show rating after delivery
    const totalTime = STEPS.slice(0, -1).reduce((s, st) => s + st.duration, 0)
    timers.push(setTimeout(() => setShowRating(true), totalTime + 1500))
    return () => timers.forEach(clearTimeout)
  }, [])

  const bg          = isDark ? '#0f0d0a' : '#faf8f5'
  const card        = isDark ? '#1a1714' : '#ffffff'
  const border      = isDark ? 'rgba(255,255,255,0.07)' : '#e8e0d5'
  const textPrimary = isDark ? 'white' : '#1c1917'
  const textMuted   = isDark ? 'rgba(255,255,255,0.4)' : '#78716c'

  const activeStep = STEPS[currentStep]
  const isDelivered = currentStep === STEPS.length - 1

  return (
    <div className="min-h-screen pt-20 pb-16" style={{ background: bg }}>
      <div className="max-w-lg mx-auto px-5 md:px-8">

        {/* Header */}
        <div className="text-center pt-6 mb-10">
          <p className="text-xs tracking-widest uppercase text-pepper-500 mb-2">Order {id}</p>
          <h1 className="font-display text-3xl md:text-4xl font-light mb-2" style={{ color: textPrimary }}>
            {isDelivered ? 'Delivered!' : 'On its way'}
          </h1>
          <p className="text-sm" style={{ color: textMuted }}>
            {isDelivered
              ? 'Your food has arrived. Hope you enjoy every bite.'
              : 'Sit tight — we will keep you updated as things move.'}
          </p>
        </div>

        {/* ── Animated status icon ── */}
        <div className="flex justify-center mb-10">
          <motion.div
            key={currentStep}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1,   opacity: 1 }}
            transition={{ type: 'spring', damping: 14, stiffness: 200 }}
            className="w-28 h-28 rounded-3xl flex items-center justify-center"
            style={{
              background: isDelivered ? 'rgba(34,197,94,0.12)' : 'rgba(232,56,26,0.1)',
              border: `2px solid ${isDelivered ? 'rgba(34,197,94,0.3)' : 'rgba(232,56,26,0.25)'}`,
            }}>
            {(() => {
              const Icon = activeStep.icon
              return <Icon size={48} style={{ color: isDelivered ? '#22c55e' : '#e8381a' }} />
            })()}
          </motion.div>
        </div>

        {/* ── Status message ── */}
        <AnimatePresence mode="wait">
          <motion.div key={currentStep} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="text-center mb-10">
            <h2 className="font-display text-2xl font-light mb-1" style={{ color: textPrimary }}>
              {activeStep.label}
            </h2>
            <p className="text-sm" style={{ color: textMuted }}>{activeStep.sub}</p>
          </motion.div>
        </AnimatePresence>

        {/* ── Timeline ── */}
        <div className="rounded-2xl p-5 mb-6" style={{ background: card, border: `1px solid ${border}` }}>
          {STEPS.map((step, i) => {
            const done    = i < currentStep
            const active  = i === currentStep
            // pending = i > currentStep
            const Icon = step.icon
            return (
              <div key={step.id} className="flex gap-4">
                {/* Icon + line */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500"
                    style={{
                      background: done ? '#e8381a' : active ? 'rgba(232,56,26,0.15)' : isDark ? 'rgba(255,255,255,0.05)' : '#f0ebe3',
                      border: `2px solid ${done ? '#e8381a' : active ? '#e8381a' : border}`,
                    }}>
                    {done
                      ? <CheckCircle size={14} style={{ color: 'white' }} />
                      : <Icon size={14} style={{ color: active ? '#e8381a' : textMuted }} />
                    }
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="w-0.5 flex-1 my-1 min-h-[24px] transition-all duration-700"
                      style={{ background: done ? '#e8381a' : border }} />
                  )}
                </div>

                {/* Text */}
                <div className="pb-5 flex-1">
                  <p className="text-sm font-semibold transition-colors"
                    style={{ color: active ? textPrimary : done ? '#e8381a' : textMuted }}>
                    {step.label}
                  </p>
                  {(done || active) && (
                    <p className="text-xs mt-0.5" style={{ color: textMuted }}>{step.sub}</p>
                  )}
                  {active && !isDelivered && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                      className="flex items-center gap-1.5 mt-2">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((d) => (
                          <motion.div key={d} className="w-1.5 h-1.5 rounded-full bg-pepper-500"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: d * 0.2 }} />
                        ))}
                      </div>
                      <span className="text-xs" style={{ color: textMuted }}>In progress</span>
                    </motion.div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Rider info ── */}
        {(currentStep >= 2) && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-5 mb-6" style={{ background: card, border: `1px solid ${border}` }}>
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: textMuted }}>Your rider</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                style={{ background: isDark ? 'rgba(255,255,255,0.08)' : '#f0ebe3' }}>
                🏍️
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: textPrimary }}>Emeka Okonkwo</p>
                <p className="text-xs mt-0.5" style={{ color: textMuted }}>Keke / Motorcycle · En route to you</p>
              </div>
              <a href="tel:+2348012345678"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-pepper-500 hover:bg-pepper-400 text-white transition-colors">
                <Phone size={16} />
              </a>
            </div>
          </motion.div>
        )}

        {/* ── Rating (after delivery) ── */}
        <AnimatePresence>
          {showRating && !rated && (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-2xl p-5 mb-6 text-center" style={{ background: card, border: `1px solid ${border}` }}>
              <p className="font-display text-lg font-light mb-1" style={{ color: textPrimary }}>How was your order?</p>
              <p className="text-xs mb-4" style={{ color: textMuted }}>Takes two seconds. Helps us a lot.</p>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} onClick={() => setRating(s)}
                    className="text-3xl transition-transform hover:scale-110">
                    <Star size={32} style={{
                      color: s <= rating ? '#f0a500' : isDark ? 'rgba(255,255,255,0.15)' : '#e0d8cc',
                      fill: s <= rating ? '#f0a500' : 'transparent',
                      transition: 'all 0.15s',
                    }} />
                  </button>
                ))}
              </div>
              <button onClick={() => setRated(true)} disabled={rating === 0}
                className="bg-pepper-500 hover:bg-pepper-400 disabled:opacity-40 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm">
                Submit rating
              </button>
            </motion.div>
          )}

          {rated && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl p-5 mb-6 text-center" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <p className="text-2xl mb-2">🙌</p>
              <p className="font-display text-lg font-light mb-1 text-green-500">Thanks for the rating</p>
              <p className="text-xs" style={{ color: textMuted }}>Your feedback helps the restaurant and our team.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Actions ── */}
        <div className="flex flex-col gap-3">
          <Link to="/"
            className="w-full flex items-center justify-center gap-2 bg-pepper-500 hover:bg-pepper-400 text-white font-semibold py-4 rounded-2xl transition-colors">
            <HomeIcon size={16} />
            Back to home
          </Link>
          <Link to="/restaurants"
            className="w-full flex items-center justify-center text-sm transition-colors py-3 rounded-2xl"
            style={{ border: `1px solid ${border}`, color: textMuted }}>
            Order again
          </Link>
        </div>
      </div>
    </div>
  )
}
