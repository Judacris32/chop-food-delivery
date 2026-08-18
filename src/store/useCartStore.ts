import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, MenuItem } from '../types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (restaurantId: string, restaurantName: string, item: MenuItem) => void
  removeItem: (itemId: string) => void
  updateQty: (itemId: string, qty: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  total: () => number
  totalItems: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (restaurantId, restaurantName, item) => {
        const existing = get().items.find((i) => i.item.id === item.id)
        if (existing) {
          set({ items: get().items.map((i) => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) })
        } else {
          set({ items: [...get().items, { restaurantId, restaurantName, item, quantity: 1 }] })
        }
      },
      removeItem: (itemId) => set({ items: get().items.filter((i) => i.item.id !== itemId) }),
      updateQty: (itemId, qty) => {
        if (qty <= 0) {
          set({ items: get().items.filter((i) => i.item.id !== itemId) })
        } else {
          set({ items: get().items.map((i) => i.item.id === itemId ? { ...i, quantity: qty } : i) })
        }
      },
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      total: () => get().items.reduce((sum, i) => sum + i.item.price * i.quantity, 0),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'chop-cart' }
  )
)
