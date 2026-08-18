import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, MapPin, Phone, CreditCard, Banknote, CheckCircle } from 'lucide-react'
import { useCartStore } from '../store/useCartStore'
import { useThemeStore } from '../store/useThemeStore'
import { formatPrice } from '../utils/format'

type PayMethod = 'card' | 'transfer' | 'cash'
type Step = 'details' | 'payment' | 'confirm'

export default function Checkout() {
  const navigate  = useNavigate()
  const isDark    = useThemeStore((s) => s.isDark)
  const { items, total, clearCart } = useCartStore()

  const [step, setStep]       = useState<Step>('details')
  const [placing, setPlacing] = useState(false)

  const [form, setForm] = useState({
    name: '', phone: '', address: '', landmark: '', note: '',
  })
  const [payMethod, setPayMethod] = useState<PayMethod>('transfer')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const set = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }))
    setErrors((e) => ({ ...e, [k]: '' }))
  }

  const deliveryFee  = 600
  const subtotal     = total()
  const grandTotal   = subtotal + deliveryFee

  const bg          = isDark ? '#0f0d0a' : '#faf8f5'
  const card        = isDark ? '#1a1714' : '#ffffff'
  const border      = isDark ? 'rgba(255,255,255,0.07)' : '#e8e0d5'
  const textPrimary = isDark ? 'white' : '#1c1917'
  const textMuted   = isDark ? 'rgba(255,255,255,0.4)' : '#78716c'
  const inputBg     = isDark ? 'rgba(255,255,255,0.04)' : '#f5f0e8'

  const inputStyle = (err?: string) => ({
    background: inputBg,
    border: `1px solid ${err ? '#e8381a' : border}`,
    color: textPrimary,
    borderRadius: '14px',
    padding: '12px 16px',
    width: '100%',
    outline: 'none',
    fontSize: '14px',
    transition: 'border-color 0.2s',
  })

  const labelStyle = { fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: textMuted, marginBottom: '6px', display: 'block' }

  const validateDetails = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim())    e.name    = 'What should we call you?'
    if (!form.phone.trim())   e.phone   = 'We need a number to reach you'
    if (!form.address.trim()) e.address = 'Where should we deliver to?'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (step === 'details' && validateDetails()) setStep('payment')
    else if (step === 'payment') setStep('confirm')
  }

  const placeOrder = async () => {
    setPlacing(true)
    await new Promise((r) => setTimeout(r, 1800))
    clearCart()
    navigate('/order/ORD-2026-001')
  }

  if (items.length === 0 && step !== 'confirm') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-24 px-5 text-center"
        style={{ background: bg }}>
        <p className="font-display text-2xl font-light" style={{ color: textPrimary }}>Your cart is empty</p>
        <p className="text-sm" style={{ color: textMuted }}>Add some food before you check out.</p>
        <button onClick={() => navigate('/restaurants')}
          className="mt-4 bg-pepper-500 hover:bg-pepper-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
          Browse restaurants
        </button>
      </div>
    )
  }

  const stepLabels: Record<Step, string> = {
    details: 'Delivery details',
    payment: 'Payment',
    confirm: 'Confirm order',
  }

  const steps: Step[] = ['details', 'payment', 'confirm']

  return (
    <div className="min-h-screen pt-20 pb-16" style={{ background: bg }}>
      <div className="max-w-2xl mx-auto px-5 md:px-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8 pt-4">
          <button onClick={() => step === 'details' ? navigate(-1) : setStep(steps[steps.indexOf(step) - 1])}
            className="w-9 h-9 flex items-center justify-center rounded-xl transition-all hover:text-pepper-500"
            style={{ border: `1px solid ${border}`, color: textMuted }}>
            <ArrowLeft size={16} />
          </button>
          <div>
            <p className="text-xs tracking-widest uppercase text-pepper-500 mb-0.5">Checkout</p>
            <h1 className="font-display text-2xl font-light" style={{ color: textPrimary }}>
              {stepLabels[step]}
            </h1>
          </div>
        </div>

        {/* Step progress */}
        <div className="flex items-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1 last:flex-none">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all"
                style={{
                  background: s === step ? '#e8381a' : steps.indexOf(step) > i ? '#e8381a' : isDark ? 'rgba(255,255,255,0.08)' : '#f0ebe3',
                  color: s === step || steps.indexOf(step) > i ? 'white' : textMuted,
                }}>
                {steps.indexOf(step) > i ? <CheckCircle size={14} /> : i + 1}
              </div>
              <span className="text-xs hidden sm:inline" style={{ color: s === step ? textPrimary : textMuted }}>
                {stepLabels[s]}
              </span>
              {i < steps.length - 1 && (
                <div className="flex-1 h-px mx-1" style={{ background: border }} />
              )}
            </div>
          ))}
        </div>

        {/* ── Step 1: Delivery Details ── */}
        <AnimatePresence mode="wait">
          {step === 'details' && (
            <motion.div key="details" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
              className="space-y-5">

              <div>
                <label style={labelStyle}>Your name</label>
                <input value={form.name} onChange={(e) => set('name', e.target.value)}
                  placeholder="Firstname Lastname" style={inputStyle(errors.name)} />
                {errors.name && <p className="text-xs text-pepper-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label style={labelStyle}>Phone number</label>
                <div className="relative">
                  <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: textMuted }} />
                  <input value={form.phone} onChange={(e) => set('phone', e.target.value)}
                    placeholder="+234 800 000 0000" type="tel"
                    style={{ ...inputStyle(errors.phone), paddingLeft: '40px' }} />
                </div>
                {errors.phone && <p className="text-xs text-pepper-500 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label style={labelStyle}>Delivery address</label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-4 top-3.5" style={{ color: textMuted }} />
                  <textarea value={form.address} onChange={(e) => set('address', e.target.value)}
                    placeholder="House number, street name, area..."
                    rows={2}
                    style={{ ...inputStyle(errors.address), paddingLeft: '40px', resize: 'none' }} />
                </div>
                {errors.address && <p className="text-xs text-pepper-500 mt-1">{errors.address}</p>}
              </div>

              <div>
                <label style={labelStyle}>Landmark <span style={{ color: textMuted, fontWeight: 400, letterSpacing: 'normal' }}>(optional)</span></label>
                <input value={form.landmark} onChange={(e) => set('landmark', e.target.value)}
                  placeholder="Close to, opposite, beside..." style={inputStyle()} />
              </div>

              <div>
                <label style={labelStyle}>Note for rider <span style={{ color: textMuted, fontWeight: 400, letterSpacing: 'normal' }}>(optional)</span></label>
                <input value={form.note} onChange={(e) => set('note', e.target.value)}
                  placeholder="Call when you arrive, gate code, etc..." style={inputStyle()} />
              </div>

              {/* Order summary */}
              <div className="rounded-2xl p-4 mt-4" style={{ background: card, border: `1px solid ${border}` }}>
                <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: textMuted }}>Order summary</p>
                <div className="space-y-2">
                  {items.map((i) => (
                    <div key={i.item.id} className="flex justify-between text-sm">
                      <span style={{ color: textMuted }}>{i.item.name} × {i.quantity}</span>
                      <span style={{ color: textPrimary }}>{formatPrice(i.item.price * i.quantity)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm pt-2" style={{ borderTop: `1px solid ${border}`, color: textMuted }}>
                    <span>Delivery</span><span>{formatPrice(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold pt-1">
                    <span style={{ color: textPrimary }}>Total</span>
                    <span style={{ color: textPrimary }}>{formatPrice(grandTotal)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Step 2: Payment ── */}
          {step === 'payment' && (
            <motion.div key="payment" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
              className="space-y-4">

              <p className="text-sm mb-2" style={{ color: textMuted }}>
                Choose how you want to pay for your order of <span style={{ color: textPrimary, fontWeight: 600 }}>{formatPrice(grandTotal)}</span>.
              </p>

              {([
                { id: 'transfer', icon: Banknote, label: 'Bank Transfer', sub: 'Pay directly to our account. Fast and easy.' },
                { id: 'card',     icon: CreditCard, label: 'Debit / Credit Card', sub: 'Visa, Mastercard, Verve — all accepted.' },
                { id: 'cash',     icon: Banknote, label: 'Pay on Delivery', sub: 'Have the exact amount ready for the rider.' },
              ] as { id: PayMethod; icon: typeof Banknote; label: string; sub: string }[]).map(({ id, icon: Icon, label, sub }) => (
                <button key={id} onClick={() => setPayMethod(id)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all"
                  style={{
                    background: payMethod === id ? 'rgba(232,56,26,0.08)' : card,
                    border: `1.5px solid ${payMethod === id ? '#e8381a' : border}`,
                  }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: payMethod === id ? 'rgba(232,56,26,0.15)' : isDark ? 'rgba(255,255,255,0.05)' : '#f0ebe3' }}>
                    <Icon size={18} style={{ color: payMethod === id ? '#e8381a' : textMuted }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: textPrimary }}>{label}</p>
                    <p className="text-xs mt-0.5" style={{ color: textMuted }}>{sub}</p>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: payMethod === id ? '#e8381a' : border }}>
                    {payMethod === id && <div className="w-2.5 h-2.5 rounded-full bg-pepper-500" />}
                  </div>
                </button>
              ))}

              {payMethod === 'transfer' && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl p-4" style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#f5f0e8', border: `1px solid ${border}` }}>
                  <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: textMuted }}>Transfer to</p>
                  <p className="text-base font-semibold mb-1" style={{ color: textPrimary }}>0123456789</p>
                  <p className="text-sm" style={{ color: textMuted }}>GTBank · Chop Deliveries Ltd</p>
                  <p className="text-xs mt-3 leading-relaxed" style={{ color: textMuted }}>
                    Use your order total as the reference. Your order will be confirmed within 2 minutes of payment.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── Step 3: Confirm ── */}
          {step === 'confirm' && (
            <motion.div key="confirm" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
              className="space-y-4">

              {/* Delivery info */}
              <div className="rounded-2xl p-5" style={{ background: card, border: `1px solid ${border}` }}>
                <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: textMuted }}>Delivering to</p>
                <div className="space-y-2">
                  <div className="flex gap-3">
                    <span className="text-xs w-16 flex-shrink-0" style={{ color: textMuted }}>Name</span>
                    <span className="text-sm font-medium" style={{ color: textPrimary }}>{form.name}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-xs w-16 flex-shrink-0" style={{ color: textMuted }}>Phone</span>
                    <span className="text-sm font-medium" style={{ color: textPrimary }}>{form.phone}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-xs w-16 flex-shrink-0" style={{ color: textMuted }}>Address</span>
                    <span className="text-sm font-medium" style={{ color: textPrimary }}>{form.address}</span>
                  </div>
                  {form.landmark && (
                    <div className="flex gap-3">
                      <span className="text-xs w-16 flex-shrink-0" style={{ color: textMuted }}>Landmark</span>
                      <span className="text-sm font-medium" style={{ color: textPrimary }}>{form.landmark}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment method */}
              <div className="rounded-2xl p-5" style={{ background: card, border: `1px solid ${border}` }}>
                <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: textMuted }}>Payment</p>
                <p className="text-sm font-medium" style={{ color: textPrimary }}>
                  {{ card: 'Debit / Credit Card', transfer: 'Bank Transfer', cash: 'Pay on Delivery' }[payMethod]}
                </p>
              </div>

              {/* Final total */}
              <div className="rounded-2xl p-5" style={{ background: card, border: `1px solid ${border}` }}>
                <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: textMuted }}>Order total</p>
                <div className="space-y-2">
                  {items.map((i) => (
                    <div key={i.item.id} className="flex justify-between text-sm">
                      <span style={{ color: textMuted }}>{i.item.name} × {i.quantity}</span>
                      <span style={{ color: textPrimary }}>{formatPrice(i.item.price * i.quantity)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm pt-2" style={{ borderTop: `1px solid ${border}`, color: textMuted }}>
                    <span>Delivery fee</span><span>{formatPrice(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-1">
                    <span style={{ color: textPrimary }}>Total</span>
                    <span style={{ color: '#e8381a' }}>{formatPrice(grandTotal)}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-center leading-relaxed" style={{ color: textMuted }}>
                By placing this order you agree to our delivery terms. Estimated delivery: {items.length > 0 ? '25–45 min' : '—'}.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA button */}
        <div className="mt-8">
          {step === 'confirm' ? (
            <button onClick={placeOrder} disabled={placing}
              className="w-full flex items-center justify-center gap-2 bg-pepper-500 hover:bg-pepper-400 disabled:opacity-60 text-white font-semibold py-4 rounded-2xl transition-colors text-base">
              {placing ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                  Placing your order…
                </>
              ) : (
                <>Place order · {formatPrice(grandTotal)}</>
              )}
            </button>
          ) : (
            <button onClick={handleNext}
              className="w-full bg-pepper-500 hover:bg-pepper-400 text-white font-semibold py-4 rounded-2xl transition-colors text-base">
              {step === 'details' ? 'Continue to payment →' : 'Review order →'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
