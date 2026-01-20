'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  FaArrowLeft,
  FaPlus,
  FaEdit,
  FaTrash,
  FaUserSlash,
  FaUserCheck,
  FaUmbrellaBeach,
  FaShieldAlt,
  FaUserTie,
  FaUser,
} from 'react-icons/fa'
import { User } from '@/types'
import { getAllUsers, saveUsers, getCurrentUser, hasPermission, rolePermissions } from '@/lib/userManagement'

export default function AdminUsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [currentUser, setCurrentUserState] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      router.push('/admin')
      return
    }
    
    if (!hasPermission(user, 'canManageUsers')) {
      router.push('/admin/dashboard')
      return
    }
    
    setCurrentUserState(user)
    setUsers(getAllUsers())
    setIsLoading(false)
  }, [router])

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    displayName: '',
    shortCode: '',
    email: '',
    role: 'staff' as User['role'],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validierung
    if (!formData.username || !formData.password || !formData.displayName || !formData.shortCode) {
      alert('Bitte alle Pflichtfelder ausfüllen!')
      return
    }
    
    // Prüfe ob Username bereits existiert
    if (!editingUser && users.some(u => u.username === formData.username)) {
      alert('Username existiert bereits!')
      return
    }
    
    // Prüfe ob Kürzel bereits existiert
    const shortCodeExists = users.some(u => 
      u.shortCode === formData.shortCode && u.id !== editingUser?.id
    )
    if (shortCodeExists) {
      alert('Kürzel existiert bereits!')
      return
    }
    
    if (editingUser) {
      // Update existing user
      const updatedUser: User = {
        ...editingUser,
        username: formData.username,
        password: formData.password,
        displayName: formData.displayName,
        shortCode: formData.shortCode,
        email: formData.email,
        role: formData.role,
        permissions: rolePermissions[formData.role],
      }
      
      const updatedUsers = users.map(u => u.id === editingUser.id ? updatedUser : u)
      setUsers(updatedUsers)
      saveUsers(updatedUsers)
    } else {
      // Add new user
      const newUser: User = {
        id: Date.now().toString(),
        username: formData.username,
        password: formData.password,
        displayName: formData.displayName,
        shortCode: formData.shortCode,
        email: formData.email,
        role: formData.role,
        permissions: rolePermissions[formData.role],
        isActive: true,
        onVacation: false,
        createdAt: new Date().toISOString(),
        createdBy: currentUser?.shortCode,
      }
      
      const updatedUsers = [...users, newUser]
      setUsers(updatedUsers)
      saveUsers(updatedUsers)
    }

    // Reset form
    setFormData({
      username: '',
      password: '',
      displayName: '',
      shortCode: '',
      email: '',
      role: 'staff',
    })
    setShowForm(false)
    setEditingUser(null)
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormData({
      username: user.username,
      password: user.password,
      displayName: user.displayName,
      shortCode: user.shortCode,
      email: user.email,
      role: user.role,
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    // Verhindere Löschen des eigenen Accounts
    if (currentUser?.id === id) {
      alert('Du kannst deinen eigenen Account nicht löschen!')
      return
    }
    
    if (confirm('Benutzer wirklich löschen?')) {
      const updatedUsers = users.filter(u => u.id !== id)
      setUsers(updatedUsers)
      saveUsers(updatedUsers)
    }
  }

  const toggleActive = (user: User) => {
    // Verhindere Deaktivierung des eigenen Accounts
    if (currentUser?.id === user.id) {
      alert('Du kannst deinen eigenen Account nicht deaktivieren!')
      return
    }
    
    const updatedUser = { ...user, isActive: !user.isActive }
    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u)
    setUsers(updatedUsers)
    saveUsers(updatedUsers)
  }

  const setVacation = (user: User) => {
    // Verhindere eigenen Urlaub zu setzen
    if (currentUser?.id === user.id) {
      alert('Du kannst dich nicht selbst in den Urlaub setzen!')
      return
    }
    
    const from = prompt('Urlaub von (YYYY-MM-DD):')
    if (!from) return
    
    const until = prompt('Urlaub bis (YYYY-MM-DD):')
    if (!until) return
    
    const updatedUser: User = {
      ...user,
      onVacation: true,
      vacationFrom: from,
      vacationUntil: until,
    }
    
    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u)
    setUsers(updatedUsers)
    saveUsers(updatedUsers)
  }

  const removeVacation = (user: User) => {
    const updatedUser: User = {
      ...user,
      onVacation: false,
      vacationFrom: undefined,
      vacationUntil: undefined,
    }
    
    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u)
    setUsers(updatedUsers)
    saveUsers(updatedUsers)
  }

  const getRoleIcon = (role: User['role']) => {
    switch (role) {
      case 'admin': return <FaShieldAlt className="text-red-500" />
      case 'manager': return <FaUserTie className="text-gold-500" />
      case 'staff': return <FaUser className="text-blue-500" />
    }
  }

  const getRoleLabel = (role: User['role']) => {
    switch (role) {
      case 'admin': return 'Administrator'
      case 'manager': return 'Manager'
      case 'staff': return 'Mitarbeiter'
    }
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
                Benutzerverwaltung
              </h1>
            </div>
            <button
              onClick={() => {
                setShowForm(!showForm)
                setEditingUser(null)
                setFormData({
                  username: '',
                  password: '',
                  displayName: '',
                  shortCode: '',
                  email: '',
                  role: 'staff',
                })
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
            >
              <FaPlus />
              <span>Neuer Benutzer</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Form */}
        {showForm && (
          <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800 mb-8">
            <h2 className="text-xl font-bold text-white mb-6">
              {editingUser ? 'Benutzer bearbeiten' : 'Neuer Benutzer'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Benutzername *
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Passwort *
                  </label>
                  <input
                    type="text"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                    required
                  />
                  <p className="text-xs text-neutral-400 mt-1">
                    Passwort wird im Klartext angezeigt (Demo-Version)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Anzeigename *
                  </label>
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                    placeholder="z.B. Max Mustermann"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Kürzel * (max. 3 Zeichen)
                  </label>
                  <input
                    type="text"
                    value={formData.shortCode}
                    onChange={(e) => setFormData({ ...formData, shortCode: e.target.value.toUpperCase().slice(0, 3) })}
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                    placeholder="z.B. MM"
                    maxLength={3}
                    required
                  />
                  <p className="text-xs text-neutral-400 mt-1">
                    Wird bei Reservierungen angezeigt
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Rolle *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as User['role'] })}
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                  >
                    <option value="staff">Mitarbeiter (nur Reservierungen)</option>
                    <option value="manager">Manager (Events + Reservierungen + Galerie)</option>
                    <option value="admin">Administrator (alle Rechte)</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
                >
                  {editingUser ? 'Aktualisieren' : 'Erstellen'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingUser(null)
                  }}
                  className="px-6 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Abbrechen
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Users List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">
            Alle Benutzer ({users.length})
          </h2>
          
          {users.map((user) => (
            <div
              key={user.id}
              className={`bg-neutral-900 rounded-lg p-6 border ${
                !user.isActive ? 'border-red-800 opacity-60' : 
                user.onVacation ? 'border-blue-800' : 
                'border-neutral-800'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    {getRoleIcon(user.role)}
                    <h3 className="text-lg font-bold text-white">{user.displayName}</h3>
                    <span className="px-3 py-1 bg-neutral-800 text-primary-500 rounded-full text-sm font-mono">
                      {user.shortCode}
                    </span>
                    <span className="text-xs px-3 py-1 bg-neutral-800 text-neutral-400 rounded-full">
                      {getRoleLabel(user.role)}
                    </span>
                    {!user.isActive && (
                      <span className="text-xs px-3 py-1 bg-red-500/20 text-red-500 rounded-full">
                        Inaktiv
                      </span>
                    )}
                    {user.onVacation && (
                      <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-500 rounded-full flex items-center space-x-1">
                        <FaUmbrellaBeach />
                        <span>Im Urlaub</span>
                      </span>
                    )}
                    {currentUser?.id === user.id && (
                      <span className="text-xs px-3 py-1 bg-gold-500/20 text-gold-500 rounded-full">
                        Du
                      </span>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-neutral-400">
                        <span className="font-medium">Benutzername:</span> {user.username}
                      </p>
                      <p className="text-neutral-400">
                        <span className="font-medium">E-Mail:</span> {user.email || 'Nicht angegeben'}
                      </p>
                      {user.lastLogin && (
                        <p className="text-neutral-400">
                          <span className="font-medium">Letzter Login:</span>{' '}
                          {new Date(user.lastLogin).toLocaleString('de-DE')}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      {user.onVacation && (
                        <>
                          <p className="text-neutral-400">
                            <span className="font-medium">Urlaub von:</span>{' '}
                            {user.vacationFrom ? new Date(user.vacationFrom).toLocaleDateString('de-DE') : '-'}
                          </p>
                          <p className="text-neutral-400">
                            <span className="font-medium">Urlaub bis:</span>{' '}
                            {user.vacationUntil ? new Date(user.vacationUntil).toLocaleDateString('de-DE') : '-'}
                          </p>
                        </>
                      )}
                      <p className="text-neutral-400">
                        <span className="font-medium">Erstellt:</span>{' '}
                        {new Date(user.createdAt).toLocaleDateString('de-DE')}
                        {user.createdBy && ` von ${user.createdBy}`}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(user)}
                    className="p-2 text-neutral-400 hover:text-primary-500 transition-colors"
                    title="Bearbeiten"
                  >
                    <FaEdit size={18} />
                  </button>
                  
                  {user.id !== currentUser?.id && (
                    <>
                      <button
                        onClick={() => toggleActive(user)}
                        className={`p-2 transition-colors ${
                          user.isActive
                            ? 'text-neutral-400 hover:text-red-500'
                            : 'text-neutral-400 hover:text-green-500'
                        }`}
                        title={user.isActive ? 'Deaktivieren' : 'Aktivieren'}
                      >
                        {user.isActive ? <FaUserSlash size={18} /> : <FaUserCheck size={18} />}
                      </button>
                      
                      <button
                        onClick={() => user.onVacation ? removeVacation(user) : setVacation(user)}
                        className={`p-2 transition-colors ${
                          user.onVacation
                            ? 'text-blue-500 hover:text-blue-400'
                            : 'text-neutral-400 hover:text-blue-500'
                        }`}
                        title={user.onVacation ? 'Urlaub beenden' : 'In Urlaub setzen'}
                      >
                        <FaUmbrellaBeach size={18} />
                      </button>
                      
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                        title="Löschen"
                      >
                        <FaTrash size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
