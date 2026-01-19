export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  image?: string
  price?: string
  requiresReservation: boolean
  category: 'concert' | 'special' | 'quiz' | 'course' | 'party'
}

export interface Reservation {
  id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  message?: string
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: string
}

export interface OpeningHours {
  day: string
  open: string
  close: string
  closed: boolean
}

export interface BarInfo {
  name: string
  address: string
  city: string
  zip: string
  phone: string
  email: string
  openingHours: OpeningHours[]
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: 'cocktail' | 'beer' | 'wine' | 'snack' | 'food'
  alcoholFree?: boolean
  image?: string
}

export interface GalleryImage {
  id: string
  url: string
  alt: string
  category: string
}
