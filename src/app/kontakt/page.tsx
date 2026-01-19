import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram } from 'react-icons/fa'
import { barInfo } from '@/lib/data'

export default function KontaktPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-20 px-4 bg-neutral-950">
        <div className="max-w-6xl mx-auto py-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">
              Kontakt & Infos
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-gold-500 mx-auto mb-6"></div>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Besuche uns oder kontaktiere uns für Reservierungen und Fragen
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Kontaktinformationen */}
            <div className="space-y-6">
              <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
                <h2 className="font-display text-2xl font-bold text-white mb-6">
                  Kontaktinformationen
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <FaMapMarkerAlt className="text-2xl text-primary-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white mb-1">Adresse</h3>
                      <p className="text-neutral-300">{barInfo.address}</p>
                      <p className="text-neutral-300">{barInfo.zip} {barInfo.city}</p>
                      <p className="text-sm text-neutral-400 mt-1">
                        Direkt gegenüber vom Hundertwasserhaus
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <FaPhone className="text-2xl text-primary-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white mb-1">Telefon</h3>
                      <a 
                        href={`tel:${barInfo.phone.replace(/\s/g, '')}`}
                        className="text-neutral-300 hover:text-primary-500 transition-colors"
                      >
                        {barInfo.phone}
                      </a>
                      <p className="text-sm text-neutral-400 mt-1">
                        Reservierungen Mo-Fr ab 16:00 Uhr
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <FaEnvelope className="text-2xl text-primary-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white mb-1">E-Mail</h3>
                      <a 
                        href={`mailto:${barInfo.email}`}
                        className="text-neutral-300 hover:text-primary-500 transition-colors break-all"
                      >
                        {barInfo.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
                <h2 className="font-display text-2xl font-bold text-white mb-6">
                  Social Media
                </h2>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-6 py-3 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-lg transition-colors"
                  >
                    <FaFacebook size={24} />
                    <span>Facebook</span>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white rounded-lg transition-opacity"
                  >
                    <FaInstagram size={24} />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Öffnungszeiten */}
            <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
              <div className="flex items-center space-x-3 mb-6">
                <FaClock className="text-2xl text-primary-500" />
                <h2 className="font-display text-2xl font-bold text-white">
                  Öffnungszeiten
                </h2>
              </div>
              
              <div className="space-y-3">
                {barInfo.openingHours.map((day) => (
                  <div 
                    key={day.day} 
                    className="flex justify-between items-center py-2 border-b border-neutral-800 last:border-b-0"
                  >
                    <span className="font-medium text-white">{day.day}</span>
                    <span className={day.closed ? 'text-neutral-500' : 'text-neutral-300'}>
                      {day.closed ? 'Geschlossen' : `${day.open} - ${day.close} Uhr`}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-primary-500/20 border border-primary-500/30 rounded-lg">
                <p className="text-sm text-neutral-300">
                  <span className="font-semibold text-primary-500">Hinweis:</span> An vollen Tagen 
                  sind wir gern länger für euch da!
                </p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800">
            <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 h-96 flex items-center justify-center">
              <div className="text-center">
                <FaMapMarkerAlt className="text-6xl text-primary-500 mx-auto mb-4" />
                <p className="text-neutral-300 mb-4">Standort: Breiter Weg 202, 39104 Magdeburg</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Breiter+Weg+202+39104+Magdeburg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
                >
                  In Google Maps öffnen
                </a>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg p-8 text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-4">
              Bereit für einen großartigen Abend?
            </h2>
            <p className="text-primary-100 mb-6">
              Reserviere jetzt deinen Tisch oder komm einfach vorbei!
            </p>
            <a
              href="/reservierung"
              className="inline-block px-8 py-3 bg-white hover:bg-neutral-100 text-primary-600 rounded-lg font-semibold transition-colors"
            >
              Jetzt reservieren
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
