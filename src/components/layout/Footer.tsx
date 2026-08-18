import { Link } from 'react-router-dom'
import { useThemeStore } from '../../store/useThemeStore'

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)
const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
)
const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
)

const reviews = [
  {
    id: 1,
    name: 'Taiwo Adeyemi',
    location: 'Lekki, Lagos',
    avatar: '/foods/reviewer-female.jpg',
    rating: 5,
    text: "Ordered party jollof from Nkoyo at 8pm, it arrived before 9. The smoky bottom was still intact. I didn't even know delivery could maintain that. My family thought I cooked it myself.",
    dish: 'Party Jollof + Grilled Chicken',
    restaurant: 'Nkoyo',
  },
  {
    id: 2,
    name: 'Chidi Okonkwo',
    location: 'Victoria Island, Lagos',
    avatar: '/foods/reviewer-male.jpg',
    rating: 5,
    text: "The suya was properly wrapped with the yaji still on it, not the kind that arrives dry with all the spice wiped off in the bag. Yellow Chilli knows what they're doing.",
    dish: 'Beef Suya (500g)',
    restaurant: 'Yellow Chilli',
  },
  {
    id: 3,
    name: 'Amaka Nwosu',
    location: 'Yaba, Lagos',
    avatar: '/foods/reviewer-female.jpg',
    rating: 5,
    text: "I ordered the shawarma at 11:30pm expecting disappointment. It came fully loaded, the cheese was still melted. I have ordered four times since then and it has not let me down once.",
    dish: 'Chicken Shawarma (Cheesy)',
    restaurant: 'Wrap & Roll',
  },
  {
    id: 4,
    name: 'Biodun Fashola',
    location: 'Gbagada, Lagos',
    avatar: '/foods/reviewer-male.jpg',
    rating: 5,
    text: "My wife is the picky one. She grew up eating amala in Ibadan and she does not accept anything that is not right. She ordered from Bukka Hut and said nothing. Then she ordered again the next day. That is the review.",
    dish: 'Amala + Gbegiri + Ewedu',
    restaurant: 'Bukka Hut',
  },
  {
    id: 5,
    name: 'Ngozi Eze',
    location: 'Surulere, Lagos',
    avatar: '/foods/reviewer-female.jpg',
    rating: 5,
    text: "The fried rice from The Place actually tastes like it was made by someone who cares. Not the watery kind. Proper Nigerian fried rice with liver and everything. My colleagues are now ordering through me.",
    dish: 'Fried Rice + Chicken',
    restaurant: 'The Place',
  },
  {
    id: 6,
    name: 'Emeka Okafor',
    location: 'Ajah, Lagos',
    avatar: '/foods/reviewer-male.jpg',
    rating: 5,
    text: "I am not someone who leaves reviews but this app genuinely saved my life at midnight. Ordered noodles, it came in 18 minutes. That is faster than my neighbour replied my text.",
    dish: 'Indomie + Sausage + Egg',
    restaurant: 'Noodles Tonight',
  },
]

export default function Footer() {
  const isDark = useThemeStore((s) => s.isDark)
  const border      = isDark ? 'rgba(255,255,255,0.06)' : '#e8e0d5'
  const textPrimary = isDark ? 'white' : '#1c1917'
  const textMuted   = isDark ? 'rgba(255,255,255,0.35)' : '#78716c'
  const bg          = isDark ? '#0f0d0a' : '#faf8f5'
  const cardBg      = isDark ? '#1a1714' : '#ffffff'

  return (
    <footer style={{ background: bg }}>

      {/* ── Customer Reviews ── */}
      <section style={{ borderTop: `1px solid ${border}` }} className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="mb-10 text-center">
            <p className="text-pepper-500 text-xs tracking-[0.3em] uppercase mb-3">These are actual customers who ordered, waited, and ate.<br></br> We didn't write these, we just delivered the food.</p>
          </div>

          {/* Scrollable review cards */}
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
            {reviews.map((r) => (
              <div key={r.id} className="flex-shrink-0 w-72 md:w-80 rounded-2xl p-5 flex flex-col gap-4"
                style={{ background: cardBg, border: `1px solid ${border}` }}>

                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(r.rating)].map((_, i) => (
                    <span key={i} style={{ color: '#f0a500', fontSize: '14px' }}>★</span>
                  ))}
                </div>

                {/* Review text */}
                <p className="text-sm leading-relaxed flex-1" style={{ color: textMuted }}>
                  &ldquo;{r.text}&rdquo;
                </p>

                {/* Dish tag */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] px-2.5 py-1 rounded-full font-medium"
                    style={{ background: 'rgba(232,56,26,0.1)', color: '#e8381a' }}>
                    {r.dish}
                  </span>
                  <span className="text-[10px] px-2.5 py-1 rounded-full"
                    style={{ background: isDark ? 'rgba(255,255,255,0.06)' : '#f5f0e8', color: textMuted }}>
                    {r.restaurant}
                  </span>
                </div>

                {/* Reviewer */}
                <div className="flex items-center gap-3 pt-2" style={{ borderTop: `1px solid ${border}` }}>
                  <img src={r.avatar} alt={r.name}
                    className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                    style={{ border: `2px solid ${border}` }} />
                  <div>
                    <p className="text-sm font-semibold leading-none" style={{ color: textPrimary }}>{r.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: textMuted }}>{r.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main footer ── */}
      <div style={{ borderTop: `1px solid ${border}` }} className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">

            {/* Brand + social */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 bg-pepper-500 rounded-xl flex items-center justify-center font-display font-bold text-white text-base">C</div>
                <span className="font-display text-lg font-medium" style={{ color: textPrimary }}>Chop</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs mb-5" style={{ color: textMuted }}>
                Real Nigerian food from the restaurants you love — delivered fast across Lagos and Abuja.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-2">
                {[
                  { href: 'https://instagram.com', icon: <InstagramIcon />, label: 'Instagram' },
                  { href: 'https://x.com',         icon: <TwitterIcon />,   label: 'X / Twitter' },
                  { href: 'https://tiktok.com',    icon: <TikTokIcon />,    label: 'TikTok'      },
                  { href: 'https://wa.me',         icon: <WhatsAppIcon />,  label: 'WhatsApp'    },
                ].map(({ href, icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 flex items-center justify-center rounded-xl transition-all hover:text-white hover:bg-pepper-500"
                    style={{ border: `1px solid ${border}`, color: textMuted }}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Explore */}
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: textPrimary }}>Explore</h3>
              <ul className="space-y-2.5">
                {[
                  { to: '/restaurants',               label: 'All Restaurants' },
                  { to: '/restaurants?cat=Nigerian',  label: 'Nigerian Food'   },
                  { to: '/restaurants?cat=Suya',      label: 'Suya & Grills'  },
                  { to: '/restaurants?cat=FastFood',  label: 'Fast Food'       },
                  { to: '/restaurants?cat=Shawarma',  label: 'Shawarma'        },
                ].map(({ to, label }) => (
                  <li key={label}>
                    <Link to={to} className="text-sm transition-colors hover:text-pepper-500"
                      style={{ color: textMuted }}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cities */}
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: textPrimary }}>Cities</h3>
              <ul className="space-y-2.5">
                {['Lagos Island', 'Lekki', 'Victoria Island', 'Yaba', 'Abuja'].map((city) => (
                  <li key={city}>
                    <span className="text-sm" style={{ color: textMuted }}>{city}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: textPrimary }}>Company</h3>
              <ul className="space-y-2.5">
                {['About', 'Careers', 'Contact', 'Partner with us', 'List your restaurant'].map((l) => (
                  <li key={l}>
                    <Link to="/" className="text-sm transition-colors hover:text-pepper-500"
                      style={{ color: textMuted }}>{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: `1px solid ${border}` }} className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs" style={{ color: textMuted }}>© 2026 Chop. Built for Nigeria. 🇳🇬</p>
            <div className="flex items-center gap-5">
              {['Privacy', 'Terms', 'Help'].map((l) => (
                <Link key={l} to="/" className="text-xs transition-colors hover:text-pepper-500"
                  style={{ color: textMuted }}>{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
