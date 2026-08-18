export type Cuisine =
  | 'Nigerian' | 'Suya & Grills' | 'Rice Dishes'
  | 'Soups & Stews' | 'Fast Food' | 'Shawarma' | 'Pastries'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  isPopular?: boolean
  isNew?: boolean
  tags?: string[]
}

export interface MenuCategory {
  id: string
  name: string
  items: MenuItem[]
}

export interface Restaurant {
  id: string
  name: string
  tagline: string
  image: string
  cuisine: Cuisine[]
  rating: number
  reviewCount: number
  deliveryTime: { min: number; max: number }
  deliveryFee: number
  minOrder: number
  address: string
  isOpen: boolean
  isFeatured: boolean
  isPopular: boolean
  discount?: string
  menu: MenuCategory[]
}

export interface CartItem {
  restaurantId: string
  restaurantName: string
  item: MenuItem
  quantity: number
}
