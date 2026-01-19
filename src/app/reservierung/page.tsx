'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { timeSlots } from '@/lib/data'
import { FaCheck, FaCalendarAlt, FaClock, FaUsers, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa'

interface ReservationForm {
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  message?: string
}

export default function ReservierungPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ReservationForm>()

  const onSubmit = async (data: ReservationForm) => {
    setIsLoading(true)
    
    // Simuliere API Call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Reservierung:', data)
    
    // In Produktion: API Call zum Speichern
    // await fetch('/api/reservations', { method: 'POST', body: JSON.stringify(data) })
    
    setIsLoading(false)
    setIsSubmitted(true)
    reset()
    
    // Reset nach 5 Sekunden
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  // Minimales Datum ist heute
  const today = new Date().toISOString().split('T')[0]

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-20 px-4 bg-neutral-950">
        <div className="max-w-4xl mx-auto py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">
              Tisch reservieren
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-gold-500 mx-auto mb-6"></div>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Reserviere jetzt deinen Tisch in der Phönix Cocktailbar. Wir freuen uns auf deinen Besuch!
            </p>
          </div>

          {/* Success Message */}
          {isSubmitted && (
            <div className="mb-8 p-6 bg-green-900/30 border border-green-500 rounded-lg flex items-center space-x-3">
              <FaCheck className="text-3xl text-green-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white text-lg">Reservierung erfolgreich!</h3>
                <p className="text-neutral-300">
                  Wir haben deine Reservierung erhalten und werden uns in Kürze per E-Mail oder Telefon bei dir melden.
                </p>
              </div>
            </div>
          )}

          {/* Info Boxes */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800 text-center">
              <FaCalendarAlt className="text-3xl text-primary-500 mx-auto mb-3" />
              <h3 className="font-bold text-white mb-2">Flexible Buchung</h3>
              <p className="text-sm text-neutral-400">
                Wähle deinen Wunschtermin
              </p>
            </div>
            <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800 text-center">
              <FaClock className="text-3xl text-gold-500 mx-auto mb-3" />
              <h3 className="font-bold text-white mb-2">Schnelle Bestätigung</h3>
              <p className="text-sm text-neutral-400">
                Innerhalb von 24 Stunden
              </p>
            </div>
            <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800 text-center">
              <FaUsers className="text-3xl text-primary-500 mx-auto mb-3" />
              <h3 className="font-bold text-white mb-2">Für alle Gruppen</h3>
              <p className="text-sm text-neutral-400">
                Von 1 bis 180 Personen
              </p>
            </div>
          </div>

          {/* Reservierungsformular */}
          <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-800">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    <div className="flex items-center space-x-2">
                      <FaUser className="text-primary-500" />
                      <span>Name *</span>
                    </div>
                  </label>
                  <input
                    {...register('name', { required: 'Name ist erforderlich' })}
                    type="text"
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                    placeholder="Dein vollständiger Name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* E-Mail */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    <div className="flex items-center space-x-2">
                      <FaEnvelope className="text-primary-500" />
                      <span>E-Mail *</span>
                    </div>
                  </label>
                  <input
                    {...register('email', {
                      required: 'E-Mail ist erforderlich',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Ungültige E-Mail-Adresse',
                      },
                    })}
                    type="email"
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                    placeholder="deine@email.de"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Telefon */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    <div className="flex items-center space-x-2">
                      <FaPhone className="text-primary-500" />
                      <span>Telefon *</span>
                    </div>
                  </label>
                  <input
                    {...register('phone', { required: 'Telefonnummer ist erforderlich' })}
                    type="tel"
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                    placeholder="0176 234 73 297"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                {/* Anzahl Gäste */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    <div className="flex items-center space-x-2">
                      <FaUsers className="text-primary-500" />
                      <span>Anzahl Gäste *</span>
                    </div>
                  </label>
                  <input
                    {...register('guests', {
                      required: 'Anzahl der Gäste ist erforderlich',
                      min: { value: 1, message: 'Mindestens 1 Gast' },
                      max: { value: 180, message: 'Maximal 180 Gäste' },
                    })}
                    type="number"
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                    placeholder="2"
                    min="1"
                    max="180"
                  />
                  {errors.guests && (
                    <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>
                  )}
                </div>

                {/* Datum */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    <div className="flex items-center space-x-2">
                      <FaCalendarAlt className="text-primary-500" />
                      <span>Datum *</span>
                    </div>
                  </label>
                  <input
                    {...register('date', { required: 'Datum ist erforderlich' })}
                    type="date"
                    min={today}
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
                  )}
                </div>

                {/* Uhrzeit */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    <div className="flex items-center space-x-2">
                      <FaClock className="text-primary-500" />
                      <span>Uhrzeit *</span>
                    </div>
                  </label>
                  <select
                    {...register('time', { required: 'Uhrzeit ist erforderlich' })}
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                  >
                    <option value="">Bitte wählen</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot} Uhr
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
                  )}
                </div>
              </div>

              {/* Nachricht */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Besondere Wünsche oder Anmerkungen
                </label>
                <textarea
                  {...register('message')}
                  rows={4}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none resize-none"
                  placeholder="z.B. Fensterplatz, Allergie, besonderer Anlass..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-8 py-4 bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
              >
                {isLoading ? 'Wird gesendet...' : 'Reservierung absenden'}
              </button>

              <p className="text-sm text-neutral-400 text-center">
                * Pflichtfelder | Du erhältst eine Bestätigung per E-Mail
              </p>
            </form>
          </div>

          {/* Kontakt Alternative */}
          <div className="mt-12 bg-neutral-900 rounded-lg p-8 border border-neutral-800 text-center">
            <h3 className="font-display text-2xl font-bold text-white mb-4">
              Lieber telefonisch reservieren?
            </h3>
            <p className="text-neutral-300 mb-4">
              Ruf uns an! Wir sind Mo-Fr ab 16:00 Uhr erreichbar.
            </p>
            <a
              href="tel:+4917623473297"
              className="inline-flex items-center space-x-2 text-primary-500 hover:text-primary-400 font-semibold text-lg"
            >
              <FaPhone />
              <span>0176 / 234 73 297</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
