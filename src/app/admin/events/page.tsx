'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  FaArrowLeft,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaClock,
} from 'react-icons/fa'
import { Event } from '@/types'
import { sampleEvents } from '@/lib/data'

export default function AdminEventsPage() {
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>(sampleEvents)
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin-logged-in')
    if (!isLoggedIn) {
      router.push('/admin')
    } else {
      setIsLoading(false)
    }
  }, [router])

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    price: '',
    category: 'special' as Event['category'],
    requiresReservation: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingEvent) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === editingEvent.id 
          ? { ...event, ...formData }
          : event
      ))
    } else {
      // Add new event
      const newEvent: Event = {
        id: Date.now().toString(),
        ...formData,
      }
      setEvents([...events, newEvent])
    }

    // Reset form
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      price: '',
      category: 'special',
      requiresReservation: false,
    })
    setShowForm(false)
    setEditingEvent(null)
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      price: event.price || '',
      category: event.category,
      requiresReservation: event.requiresReservation,
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Event wirklich löschen?')) {
      setEvents(events.filter(event => event.id !== id))
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
                Events verwalten
              </h1>
            </div>
            <button
              onClick={() => {
                setShowForm(!showForm)
                setEditingEvent(null)
                setFormData({
                  title: '',
                  description: '',
                  date: '',
                  time: '',
                  price: '',
                  category: 'special',
                  requiresReservation: false,
                })
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
            >
              <FaPlus />
              <span>Neues Event</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Event Form */}
        {showForm && (
          <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800 mb-8">
            <h2 className="text-xl font-bold text-white mb-6">
              {editingEvent ? 'Event bearbeiten' : 'Neues Event erstellen'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Titel *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Kategorie *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Event['category'] })}
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                  >
                    <option value="special">Special</option>
                    <option value="concert">Konzert</option>
                    <option value="quiz">Quiz</option>
                    <option value="course">Kurs</option>
                    <option value="party">Party</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Datum *
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                    placeholder="z.B. 14.02.2025 oder Jeden Donnerstag"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Uhrzeit *
                  </label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                    placeholder="z.B. 19:00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Preis (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                    placeholder="z.B. 38,00€ p.P."
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.requiresReservation}
                      onChange={(e) => setFormData({ ...formData, requiresReservation: e.target.checked })}
                      className="w-5 h-5 rounded bg-neutral-800 border-neutral-700 text-primary-500 focus:ring-primary-500"
                    />
                    <span className="text-neutral-300">Anmeldung erforderlich</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Beschreibung *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none resize-none"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
                >
                  {editingEvent ? 'Aktualisieren' : 'Erstellen'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingEvent(null)
                  }}
                  className="px-6 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Abbrechen
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Events List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">
            Alle Events ({events.length})
          </h2>
          
          {events.length === 0 ? (
            <div className="bg-neutral-900 rounded-lg p-12 border border-neutral-800 text-center">
              <p className="text-neutral-400">Noch keine Events vorhanden.</p>
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="bg-neutral-900 rounded-lg p-6 border border-neutral-800"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{event.title}</h3>
                      <span className="text-xs px-3 py-1 bg-primary-500/20 text-primary-500 rounded-full">
                        {event.category}
                      </span>
                      {event.requiresReservation && (
                        <span className="text-xs px-3 py-1 bg-gold-500/20 text-gold-500 rounded-full">
                          Anmeldung erforderlich
                        </span>
                      )}
                    </div>
                    <p className="text-neutral-400 text-sm mb-4">{event.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-neutral-300">
                      <div className="flex items-center space-x-2">
                        <FaCalendarAlt className="text-primary-500" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaClock className="text-primary-500" />
                        <span>{event.time}</span>
                      </div>
                      {event.price && (
                        <span className="font-semibold text-gold-500">{event.price}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(event)}
                      className="p-2 text-neutral-400 hover:text-primary-500 transition-colors"
                      title="Bearbeiten"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                      title="Löschen"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
