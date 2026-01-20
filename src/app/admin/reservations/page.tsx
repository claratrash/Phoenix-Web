'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaPhone,
  FaEnvelope,
  FaCheck,
  FaTimes,
  FaFilter,
  FaUserTag,
  FaStickyNote,
} from 'react-icons/fa'
import { Reservation } from '@/types'
import { getCurrentUser } from '@/lib/userManagement'

// Beispiel-Reservierungen
const sampleReservations: Reservation[] = [
  {
    id: '1',
    name: 'Max Mustermann',
    email: 'max@example.com',
    phone: '0176 12345678',
    date: '2026-01-25',
    time: '19:00',
    guests: 4,
    message: 'Fensterplatz wenn möglich',
    status: 'pending',
    createdAt: '2026-01-19T10:30:00',
  },
  {
    id: '2',
    name: 'Anna Schmidt',
    email: 'anna@example.com',
    phone: '0151 98765432',
    date: '2026-01-26',
    time: '20:00',
    guests: 2,
    status: 'confirmed',
    createdAt: '2026-01-18T15:20:00',
  },
  {
    id: '3',
    name: 'Peter Wagner',
    email: 'peter@example.com',
    phone: '0160 55544433',
    date: '2026-01-27',
    time: '18:30',
    guests: 6,
    message: 'Geburtstagsfeier',
    status: 'pending',
    createdAt: '2026-01-19T09:15:00',
  },
]

export default function AdminReservationsPage() {
  const router = useRouter()
  const [reservations, setReservations] = useState<Reservation[]>(sampleReservations)
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all')
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin-logged-in')
    if (!isLoggedIn) {
      router.push('/admin')
    } else {
      const user = getCurrentUser()
      setCurrentUser(user)
      setIsLoading(false)
    }
  }, [router])

  const updateStatus = (id: string, status: Reservation['status']) => {
    const updatedReservation = reservations.find(res => res.id === id)
    if (updatedReservation && currentUser) {
      const updated = {
        ...updatedReservation,
        status,
        processedBy: currentUser.shortCode,
        processedAt: new Date().toISOString()
      }
      setReservations(reservations.map(res => 
        res.id === id ? updated : res
      ))
    }
  }

  const addNote = (id: string) => {
    const note = prompt('Interne Notiz hinzufügen:')
    if (note) {
      setReservations(reservations.map(res =>
        res.id === id ? { ...res, notes: note } : res
      ))
    }
  }

  const deleteReservation = (id: string) => {
    if (confirm('Reservierung wirklich löschen?')) {
      setReservations(reservations.filter(res => res.id !== id))
    }
  }

  const filteredReservations = filter === 'all' 
    ? reservations 
    : reservations.filter(res => res.status === filter)

  const sortedReservations = [...filteredReservations].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-500',
    confirmed: 'bg-green-500/20 text-green-500',
    cancelled: 'bg-red-500/20 text-red-500',
  }

  const statusLabels = {
    pending: 'Ausstehend',
    confirmed: 'Bestätigt',
    cancelled: 'Abgesagt',
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
                Reservierungen
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-neutral-900 rounded-lg p-4 border border-neutral-800">
            <p className="text-neutral-400 text-sm mb-1">Gesamt</p>
            <p className="text-2xl font-bold text-white">{reservations.length}</p>
          </div>
          <div className="bg-neutral-900 rounded-lg p-4 border border-neutral-800">
            <p className="text-neutral-400 text-sm mb-1">Ausstehend</p>
            <p className="text-2xl font-bold text-yellow-500">
              {reservations.filter(r => r.status === 'pending').length}
            </p>
          </div>
          <div className="bg-neutral-900 rounded-lg p-4 border border-neutral-800">
            <p className="text-neutral-400 text-sm mb-1">Bestätigt</p>
            <p className="text-2xl font-bold text-green-500">
              {reservations.filter(r => r.status === 'confirmed').length}
            </p>
          </div>
          <div className="bg-neutral-900 rounded-lg p-4 border border-neutral-800">
            <p className="text-neutral-400 text-sm mb-1">Abgesagt</p>
            <p className="text-2xl font-bold text-red-500">
              {reservations.filter(r => r.status === 'cancelled').length}
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <FaFilter className="text-primary-500" />
            <span className="text-neutral-300 font-medium">Filter:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['all', 'pending', 'confirmed', 'cancelled'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === status
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {status === 'all' ? 'Alle' : statusLabels[status]}
              </button>
            ))}
          </div>
        </div>

        {/* Reservations List */}
        <div className="space-y-4">
          {sortedReservations.length === 0 ? (
            <div className="bg-neutral-900 rounded-lg p-12 border border-neutral-800 text-center">
              <p className="text-neutral-400">Keine Reservierungen gefunden.</p>
            </div>
          ) : (
            sortedReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-neutral-900 rounded-lg p-6 border border-neutral-800"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-bold text-white">{reservation.name}</h3>
                    <span className={`text-xs px-3 py-1 rounded-full ${statusColors[reservation.status]}`}>
                      {statusLabels[reservation.status]}
                    </span>
                  </div>
                  <div className="text-sm text-neutral-400">
                    Eingegangen: {new Date(reservation.createdAt).toLocaleDateString('de-DE')}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-neutral-300">
                      <FaCalendarAlt className="text-primary-500" />
                      <span>{new Date(reservation.date).toLocaleDateString('de-DE')}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-neutral-300">
                      <FaClock className="text-primary-500" />
                      <span>{reservation.time} Uhr</span>
                    </div>
                    <div className="flex items-center space-x-2 text-neutral-300">
                      <FaUsers className="text-primary-500" />
                      <span>{reservation.guests} {reservation.guests === 1 ? 'Person' : 'Personen'}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-neutral-300">
                      <FaPhone className="text-gold-500" />
                      <a href={`tel:${reservation.phone}`} className="hover:text-primary-500 transition-colors">
                        {reservation.phone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2 text-neutral-300">
                      <FaEnvelope className="text-gold-500" />
                      <a href={`mailto:${reservation.email}`} className="hover:text-primary-500 transition-colors break-all">
                        {reservation.email}
                      </a>
                    </div>
                  </div>
                </div>

                {reservation.message && (
                  <div className="bg-neutral-800 rounded-lg p-3 mb-4">
                    <p className="text-sm text-neutral-300">
                      <span className="font-medium">Nachricht:</span> {reservation.message}
                    </p>
                  </div>
                )}

                {reservation.notes && (
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3 mb-4">
                    <div className="flex items-start space-x-2">
                      <FaStickyNote className="text-blue-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-blue-400 font-medium mb-1">Interne Notiz:</p>
                        <p className="text-sm text-neutral-300">{reservation.notes}</p>
                      </div>
                    </div>
                  </div>
                )}

                {reservation.processedBy && (
                  <div className="bg-neutral-800 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-neutral-300">
                      <FaUserTag className="text-gold-500" />
                      <span>
                        Bearbeitet von: <span className="font-mono text-gold-500">{reservation.processedBy}</span>
                        {reservation.processedAt && (
                          <span className="text-neutral-400 ml-2">
                            am {new Date(reservation.processedAt).toLocaleString('de-DE')}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2 pt-4 border-t border-neutral-800">
                  {reservation.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(reservation.id, 'confirmed')}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold transition-colors"
                      >
                        <FaCheck />
                        <span>Bestätigen</span>
                      </button>
                      <button
                        onClick={() => updateStatus(reservation.id, 'cancelled')}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors"
                      >
                        <FaTimes />
                        <span>Absagen</span>
                      </button>
                    </>
                  )}
                  {reservation.status === 'confirmed' && (
                    <button
                      onClick={() => updateStatus(reservation.id, 'cancelled')}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                      <FaTimes />
                      <span>Doch absagen</span>
                    </button>
                  )}
                  {reservation.status === 'cancelled' && (
                    <button
                      onClick={() => updateStatus(reservation.id, 'pending')}
                      className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                      <span>Auf ausstehend setzen</span>
                    </button>
                  )}
                  <button
                    onClick={() => addNote(reservation.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors"
                  >
                    <FaStickyNote />
                    <span>Notiz</span>
                  </button>
                  <button
                    onClick={() => deleteReservation(reservation.id)}
                    className="ml-auto px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg text-sm font-semibold transition-colors"
                  >
                    Löschen
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
