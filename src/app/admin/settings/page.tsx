'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  FaArrowLeft,
  FaKey,
  FaUser,
  FaSave,
  FaCheck,
} from 'react-icons/fa'
import { getCurrentUser, getAllUsers, saveUsers } from '@/lib/userManagement'
import { User } from '@/types'

export default function AdminSettingsPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [successMessage, setSuccessMessage] = useState('')
  
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [profileForm, setProfileForm] = useState({
    displayName: '',
    email: '',
    shortCode: '',
  })

  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      router.push('/admin')
      return
    }
    
    setCurrentUser(user)
    setProfileForm({
      displayName: user.displayName,
      email: user.email || '',
      shortCode: user.shortCode,
    })
    setIsLoading(false)
  }, [router])

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!currentUser) return
    
    // Validierung
    if (passwordForm.oldPassword !== currentUser.password) {
      alert('Altes Passwort ist falsch!')
      return
    }
    
    if (passwordForm.newPassword.length < 6) {
      alert('Neues Passwort muss mindestens 6 Zeichen lang sein!')
      return
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Neue Passwörter stimmen nicht überein!')
      return
    }
    
    // Update Password
    const users = getAllUsers()
    const updatedUser = { ...currentUser, password: passwordForm.newPassword }
    const updatedUsers = users.map(u => u.id === currentUser.id ? updatedUser : u)
    saveUsers(updatedUsers)
    setCurrentUser(updatedUser)
    
    // Reset form
    setPasswordForm({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    
    setSuccessMessage('Passwort erfolgreich geändert!')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!currentUser) return
    
    // Update Profile
    const users = getAllUsers()
    const updatedUser = {
      ...currentUser,
      displayName: profileForm.displayName,
      email: profileForm.email,
      shortCode: profileForm.shortCode,
    }
    const updatedUsers = users.map(u => u.id === currentUser.id ? updatedUser : u)
    saveUsers(updatedUsers)
    setCurrentUser(updatedUser)
    
    setSuccessMessage('Profil erfolgreich aktualisiert!')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="text-white">Lädt...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <header className="bg-neutral-900 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/dashboard"
                className="text-neutral-400 hover:text-primary-500 transition-colors"
              >
                <FaArrowLeft size={20} />
              </Link>
              <h1 className="font-display text-xl font-bold text-white">
                Einstellungen
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-8 p-4 bg-green-900/30 border border-green-500 rounded-lg flex items-center space-x-3">
            <FaCheck className="text-2xl text-green-500 flex-shrink-0" />
            <p className="text-white font-medium">{successMessage}</p>
          </div>
        )}

        {/* User Info */}
        <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Aktuelle Anmeldung</h2>
          <div className="space-y-2 text-neutral-300">
            <p><span className="font-medium">Benutzername:</span> {currentUser?.username}</p>
            <p><span className="font-medium">Rolle:</span> {currentUser?.role}</p>
            <p><span className="font-medium">Kürzel:</span> <code className="text-primary-500">{currentUser?.shortCode}</code></p>
          </div>
        </div>

        {/* Profile Settings */}
        <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <FaUser className="text-2xl text-primary-500" />
            <h2 className="text-xl font-bold text-white">Profil bearbeiten</h2>
          </div>
          
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Anzeigename
              </label>
              <input
                type="text"
                value={profileForm.displayName}
                onChange={(e) => setProfileForm({ ...profileForm, displayName: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                E-Mail
              </label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Kürzel (max. 3 Zeichen)
              </label>
              <input
                type="text"
                value={profileForm.shortCode}
                onChange={(e) => setProfileForm({ ...profileForm, shortCode: e.target.value.toUpperCase().slice(0, 3) })}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                maxLength={3}
                required
              />
              <p className="text-xs text-neutral-400 mt-1">
                Wird bei Reservierungen angezeigt
              </p>
            </div>

            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
            >
              <FaSave />
              <span>Profil speichern</span>
            </button>
          </form>
        </div>

        {/* Password Change */}
        <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
          <div className="flex items-center space-x-3 mb-6">
            <FaKey className="text-2xl text-gold-500" />
            <h2 className="text-xl font-bold text-white">Passwort ändern</h2>
          </div>
          
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Altes Passwort
              </label>
              <input
                type="password"
                value={passwordForm.oldPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Neues Passwort
              </label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                required
                minLength={6}
              />
              <p className="text-xs text-neutral-400 mt-1">
                Mindestens 6 Zeichen
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Neues Passwort bestätigen
              </label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white rounded-lg font-semibold transition-colors"
            >
              <FaKey />
              <span>Passwort ändern</span>
            </button>
          </form>

          <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
            <p className="text-sm text-neutral-300">
              <span className="font-semibold text-yellow-500">⚠️ Wichtig:</span> Nach dem Ändern des Passworts 
              musst du dich mit dem neuen Passwort erneut anmelden.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
