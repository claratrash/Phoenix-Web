'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { sampleEvents } from '@/lib/data'
import { FaCalendarAlt, FaClock, FaEuroSign, FaFilter } from 'react-icons/fa'
import Link from 'next/link'

export default function EventsPage() {
  const [filter, setFilter] = useState<string>('all')

  const categories = [
    { value: 'all', label: 'Alle Events' },
    { value: 'concert', label: 'Konzerte' },
    { value: 'special', label: 'Specials' },
    { value: 'quiz', label: 'Quiz' },
    { value: 'course', label: 'Kurse' },
    { value: 'party', label: 'Partys' },
  ]

  const filteredEvents = filter === 'all' 
    ? sampleEvents 
    : sampleEvents.filter(event => event.category === filter)

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-20 px-4 bg-neutral-950">
        <div className="max-w-7xl mx-auto py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">
              Events & Specials
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-gold-500 mx-auto mb-6"></div>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Entdecke unsere aktuellen Events, Specials und regelmäßigen Veranstaltungen. 
              Von Live-Musik über Quiz-Abende bis hin zu Cocktailkursen.
            </p>
          </div>

          {/* Filter */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <FaFilter className="text-primary-500" />
              <span className="text-neutral-300 font-medium">Filtern nach:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setFilter(cat.value)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    filter === cat.value
                      ? 'bg-primary-500 text-white'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 hover:border-primary-500 transition-all hover:transform hover:scale-105"
                >
                  {/* Event Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                    <FaCalendarAlt className="text-6xl text-white opacity-50" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs px-3 py-1 bg-primary-500/20 text-primary-500 rounded-full font-medium">
                        {categories.find(c => c.value === event.category)?.label}
                      </span>
                      {event.requiresReservation && (
                        <span className="text-xs px-3 py-1 bg-gold-500/20 text-gold-500 rounded-full font-medium">
                          Anmeldung erforderlich
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-xl font-bold text-white mb-3">
                      {event.title}
                    </h3>

                    <p className="text-neutral-400 text-sm mb-4 line-clamp-3">
                      {event.description}
                    </p>

                    <div className="space-y-2 text-sm text-neutral-300 mb-6">
                      <div className="flex items-center space-x-2">
                        <FaCalendarAlt className="text-primary-500" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaClock className="text-primary-500" />
                        <span>{event.time} Uhr</span>
                      </div>
                      {event.price && (
                        <div className="flex items-center space-x-2">
                          <FaEuroSign className="text-gold-500" />
                          <span className="font-semibold text-gold-500">{event.price}</span>
                        </div>
                      )}
                    </div>

                    {event.requiresReservation && (
                      <Link
                        href="/reservierung"
                        className="block w-full text-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
                      >
                        Jetzt anmelden
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-neutral-400 text-lg">
                Keine Events in dieser Kategorie gefunden.
              </p>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-20 bg-neutral-900 rounded-lg p-8 border border-neutral-800 text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-4">
              Dein Event bei uns?
            </h2>
            <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
              Für Firmenevents, Geburtstage, Hochzeiten und Junggesellenabschiede kann 
              die ganze Location oder einzelne Räume angemietet werden. Die individuell 
              buchbaren Cocktailkurse bieten jede Menge Spaß!
            </p>
            <Link
              href="/kontakt"
              className="inline-block px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
            >
              Kontaktiere uns
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
