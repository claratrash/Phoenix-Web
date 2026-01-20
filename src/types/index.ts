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
  processedBy?: string  // User-Kürzel wer die Reservierung bearbeitet hat
  processedAt?: string  // Wann wurde sie bearbeitet
  notes?: string        // Interne Notizen
}

export interface User {
  id: string
  username: string
  password: string
  displayName: string
  shortCode: string     // Kürzel (z.B. "HL" für Henriette Lünenberger)
  email: string
  role: 'admin' | 'manager' | 'staff'
  permissions: UserPermissions
  isActive: boolean     // Für Urlaubs-Funktion
  onVacation: boolean
  vacationFrom?: string
  vacationUntil?: string
  createdAt: string
  lastLogin?: string
  createdBy?: string    // Wer hat diesen User erstellt
}

export interface UserPermissions {
  canManageEvents: boolean
  canManageReservations: boolean
  canManageGallery: boolean
  canManageUsers: boolean
  canViewReports: boolean
  canChangeSettings: boolean
}

export interface AuditLog {
  id: string
  userId: string
  userShortCode: string
  action: string
  details: string
  timestamp: string
  ipAddress?: string
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
