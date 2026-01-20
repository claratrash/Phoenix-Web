import { User, UserPermissions } from '@/types'

// Standard-Rollen mit vorkonfigurierten Rechten
export const rolePermissions: Record<'admin' | 'manager' | 'staff', UserPermissions> = {
  admin: {
    canManageEvents: true,
    canManageReservations: true,
    canManageGallery: true,
    canManageUsers: true,
    canViewReports: true,
    canChangeSettings: true,
  },
  manager: {
    canManageEvents: true,
    canManageReservations: true,
    canManageGallery: true,
    canManageUsers: false,
    canViewReports: true,
    canChangeSettings: false,
  },
  staff: {
    canManageEvents: false,
    canManageReservations: true,
    canManageGallery: false,
    canManageUsers: false,
    canViewReports: false,
    canChangeSettings: false,
  },
}

// Hole alle User aus localStorage
export function getAllUsers(): User[] {
  if (typeof window === 'undefined') return []
  const usersJson = localStorage.getItem('phoenix-users')
  if (!usersJson) return getDefaultUsers()
  return JSON.parse(usersJson)
}

// Speichere alle User
export function saveUsers(users: User[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('phoenix-users', JSON.stringify(users))
}

// Hole aktuell eingeloggten User
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  const currentUserId = localStorage.getItem('current-user-id')
  if (!currentUserId) return null
  
  const users = getAllUsers()
  return users.find(u => u.id === currentUserId) || null
}

// Setze aktuellen User
export function setCurrentUser(userId: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('current-user-id', userId)
}

// Login-Funktion
export function loginUser(username: string, password: string): User | null {
  const users = getAllUsers()
  const user = users.find(u => u.username === username && u.password === password)
  
  if (user) {
    // Check ob User aktiv ist
    if (!user.isActive) {
      return null // User ist deaktiviert
    }
    
    // Check ob User im Urlaub ist
    if (user.onVacation) {
      const now = new Date()
      const vacationEnd = user.vacationUntil ? new Date(user.vacationUntil) : null
      
      if (vacationEnd && now <= vacationEnd) {
        return null // User ist im Urlaub
      } else if (vacationEnd && now > vacationEnd) {
        // Urlaub ist vorbei, automatisch reaktivieren
        user.onVacation = false
        user.vacationFrom = undefined
        user.vacationUntil = undefined
        const updatedUsers = users.map(u => u.id === user.id ? user : u)
        saveUsers(updatedUsers)
      }
    }
    
    // Update last login
    user.lastLogin = new Date().toISOString()
    const updatedUsers = users.map(u => u.id === user.id ? user : u)
    saveUsers(updatedUsers)
    
    setCurrentUser(user.id)
    return user
  }
  
  return null
}

// Logout
export function logoutUser(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('current-user-id')
  localStorage.removeItem('admin-logged-in')
}

// Default-User (Haupt-Admin)
function getDefaultUsers(): User[] {
  const defaultAdmin: User = {
    id: '1',
    username: 'admin',
    password: 'phoenix2026',
    displayName: 'Administrator',
    shortCode: 'ADM',
    email: 'henriette@luenenberger.de',
    role: 'admin',
    permissions: rolePermissions.admin,
    isActive: true,
    onVacation: false,
    createdAt: new Date().toISOString(),
  }
  
  saveUsers([defaultAdmin])
  return [defaultAdmin]
}

// Prüfe ob User Berechtigung hat
export function hasPermission(user: User | null, permission: keyof UserPermissions): boolean {
  if (!user) return false
  if (!user.isActive) return false
  if (user.onVacation) return false
  
  return user.permissions[permission] === true
}

// Generiere Kürzel aus Namen
export function generateShortCode(name: string): string {
  const parts = name.trim().split(' ')
  if (parts.length === 1) {
    return parts[0].substring(0, 3).toUpperCase()
  }
  return parts.map(p => p[0]).join('').toUpperCase().substring(0, 3)
}

// Prüfe ob Kürzel bereits existiert
export function isShortCodeUnique(shortCode: string, excludeUserId?: string): boolean {
  const users = getAllUsers()
  return !users.some(u => u.shortCode === shortCode && u.id !== excludeUserId)
}
