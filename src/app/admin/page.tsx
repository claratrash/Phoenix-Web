'use client'

import { useState } from 'react'
import { FaLock, FaSignInAlt, FaUser } from 'react-icons/fa'
import { loginUser } from '@/lib/userManagement'

export default function AdminLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    const user = loginUser(username, password)
    
    if (user) {
      localStorage.setItem('admin-logged-in', 'true')
      window.location.href = '/admin/dashboard'
    } else {
      setError('Falscher Benutzername/Passwort oder Account inaktiv/im Urlaub')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500/20 rounded-full mb-4">
            <FaLock className="text-3xl text-primary-500" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">
            Admin Login
          </h1>
          <p className="text-neutral-400">
            Melde dich an, um die Website zu verwalten
          </p>
        </div>

        <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-800">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Benutzername
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-neutral-500" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    setError('')
                  }}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                  placeholder="Benutzername eingeben"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                placeholder="Passwort eingeben"
                required
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <FaSignInAlt />
              <span>Anmelden</span>
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-neutral-800">
            <p className="text-sm text-neutral-400 text-center">
              Demo-Login: <code className="text-primary-500">admin</code> / <code className="text-primary-500">phoenix2026</code>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-neutral-400 hover:text-primary-500 transition-colors text-sm">
            ← Zurück zur Startseite
          </a>
        </div>
      </div>
    </div>
  )
}
