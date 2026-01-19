'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  FaCalendarAlt,
  FaClipboardList,
  FaImages,
  FaCog,
  FaSignOutAlt,
  FaChartLine,
  FaUsers,
  FaCocktail,
} from 'react-icons/fa'

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin-logged-in')
    if (!isLoggedIn) {
      router.push('/admin')
    } else {
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('admin-logged-in')
    router.push('/admin')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="text-white">Lädt...</div>
      </div>
    )
  }

  const menuItems = [
    {
      title: 'Events verwalten',
      description: 'Events erstellen, bearbeiten und löschen',
      icon: FaCalendarAlt,
      href: '/admin/events',
      color: 'primary',
    },
    {
      title: 'Reservierungen',
      description: 'Tischreservierungen ansehen und verwalten',
      icon: FaClipboardList,
      href: '/admin/reservations',
      color: 'gold',
    },
    {
      title: 'Barkarte',
      description: 'Getränke und Speisen bearbeiten',
      icon: FaCocktail,
      href: '/admin/menu',
      color: 'primary',
    },
    {
      title: 'Galerie',
      description: 'Bilder hochladen und verwalten',
      icon: FaImages,
      href: '/admin/gallery',
      color: 'gold',
    },
    {
      title: 'Einstellungen',
      description: 'Öffnungszeiten, Kontaktdaten, etc.',
      icon: FaCog,
      href: '/admin/settings',
      color: 'primary',
    },
  ]

  const stats = [
    { label: 'Aktive Events', value: '3', icon: FaCalendarAlt },
    { label: 'Offene Reservierungen', value: '12', icon: FaUsers },
    { label: 'Besucher (Monat)', value: '1.2k', icon: FaChartLine },
  ]

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <header className="bg-neutral-900 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <FaCocktail className="text-2xl text-primary-500" />
              <h1 className="font-display text-xl font-bold text-white">
                Phönix Admin
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-neutral-300 hover:text-primary-500 transition-colors"
            >
              <FaSignOutAlt />
              <span>Abmelden</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Willkommen zurück! 👋
          </h2>
          <p className="text-neutral-400">
            Verwalte deine Phönix Cocktailbar Website
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="bg-neutral-900 rounded-lg p-6 border border-neutral-800"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                  <Icon className="text-4xl text-primary-500" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Schnellzugriff</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="bg-neutral-900 rounded-lg p-6 border border-neutral-800 hover:border-primary-500 transition-all group"
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-lg ${
                        item.color === 'primary'
                          ? 'bg-primary-500/20'
                          : 'bg-gold-500/20'
                      }`}
                    >
                      <Icon
                        className={`text-2xl ${
                          item.color === 'primary'
                            ? 'text-primary-500'
                            : 'text-gold-500'
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white mb-1 group-hover:text-primary-500 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-neutral-400">{item.description}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-primary-900/20 border border-primary-500/30 rounded-lg p-6">
          <h3 className="font-bold text-white mb-2 flex items-center space-x-2">
            <span>💡</span>
            <span>Hinweis</span>
          </h3>
          <p className="text-neutral-300 text-sm">
            Diese Admin-Oberfläche ist benutzerfreundlich gestaltet und benötigt keine 
            technischen Kenntnisse. Alle Änderungen werden sofort auf der Website sichtbar. 
            Bei Fragen steht dir die Hilfe-Funktion zur Verfügung.
          </p>
        </div>
      </main>
    </div>
  )
}
