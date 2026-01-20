import Link from 'next/link'
import { FaCocktail, FaCalendarAlt, FaUsers, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FacebookFeed from '@/components/FacebookFeed'
import { sampleEvents } from '@/lib/data'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
          <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-500 via-gold-500 to-primary-500 bg-clip-text text-transparent">
                Phönix
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-neutral-300 mb-4">
              Die Cocktailbar in Magdeburg
            </p>
            <p className="text-lg text-neutral-400 mb-8 max-w-2xl mx-auto">
              Große Auswahl alkoholischer und alkoholfreier Cocktails im Zentrum von Magdeburg. 
              Mit historischem Gewölbe und großer Terrasse mit Blick auf das Hundertwasserhaus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/reservierung"
                className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Tisch reservieren</span>
                <FaArrowRight />
              </Link>
              <Link
                href="/barkarte"
                className="px-8 py-4 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-semibold transition-colors"
              >
                Zur Barkarte
              </Link>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="text-neutral-400 text-center">
              <p className="text-sm mb-2">Scroll down</p>
              <div className="text-2xl">↓</div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-4 bg-neutral-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">
                Wir stellen uns vor
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-gold-500 mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-neutral-300">
                <p className="text-lg leading-relaxed">
                  Wir sind eine Cocktailbar im Zentrum von Magdeburg mit einer großen Auswahl 
                  alkoholischer und alkoholfreier Cocktails. Vom Fass werden 2 Biere angeboten, 
                  zusätzlich etliche Flaschenbiere und eine gute Weinauswahl.
                </p>
                <p className="text-lg leading-relaxed">
                  Für alle Hungrigen gibt es leckere Snacks, ofenfrische Baguettes und 
                  selbstgemachte Minipizzen.
                </p>
                <p className="text-lg leading-relaxed">
                  Im Innenbereich bietet die Bar, inklusive historischem Gewölbe, Platz für 
                  110 Gäste. Die große Terrasse mit Blick auf das Hundertwasserhaus fasst 
                  weitere 70 Gäste.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-neutral-800 p-6 rounded-lg text-center border border-neutral-700">
                  <FaCocktail className="text-4xl text-primary-500 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-white mb-1">100+</p>
                  <p className="text-neutral-400">Cocktails</p>
                </div>
                <div className="bg-neutral-800 p-6 rounded-lg text-center border border-neutral-700">
                  <FaUsers className="text-4xl text-gold-500 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-white mb-1">180</p>
                  <p className="text-neutral-400">Sitzplätze</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-20 px-4 bg-neutral-950">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">
                Aktuelle Events
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-gold-500 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {sampleEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 hover:border-primary-500 transition-colors"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <FaCalendarAlt className="text-2xl text-primary-500" />
                      <span className="text-xs px-3 py-1 bg-primary-500/20 text-primary-500 rounded-full">
                        {event.category}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-neutral-400 text-sm mb-4 line-clamp-3">
                      {event.description}
                    </p>
                    <div className="space-y-2 text-sm text-neutral-300">
                      <p>📅 {event.date}</p>
                      <p>🕐 {event.time} Uhr</p>
                      {event.price && <p className="font-semibold text-gold-500">{event.price}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/events"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
              >
                <span>Alle Events ansehen</span>
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary-600 to-primary-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white">
              Reserviere jetzt deinen Tisch
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Sichere dir deinen Platz in Magdeburgs beliebtester Cocktailbar
            </p>
            <Link
              href="/reservierung"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white hover:bg-neutral-100 text-primary-600 rounded-lg font-semibold transition-colors"
            >
              <span>Jetzt reservieren</span>
              <FaArrowRight />
            </Link>
          </div>
        </section>

        {/* Facebook Feed & Location Section */}
        <section className="py-20 px-4 bg-neutral-900">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Facebook Feed */}
              <div>
                <h2 className="font-display text-3xl font-bold mb-4 text-white text-center">
                  Neuigkeiten von uns
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-gold-500 mx-auto mb-6"></div>
                <FacebookFeed pageUrl="https://www.facebook.com/phoenixbarmagdeburg" showRealFeed={false} />
              </div>

              {/* Location */}
              <div>
                <h2 className="font-display text-3xl font-bold mb-4 text-white text-center">
                  So findest du uns
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-gold-500 mx-auto mb-6"></div>
                <div className="space-y-4">
                  <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
                    <div className="flex items-center space-x-3 mb-3">
                      <FaMapMarkerAlt className="text-2xl text-primary-500" />
                      <div>
                        <p className="text-white font-semibold">Breiter Weg 202</p>
                        <p className="text-neutral-300">39104 Magdeburg</p>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-400 mb-4">
                      Direkt gegenüber vom Hundertwasserhaus
                    </p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Breiter+Weg+202+39104+Magdeburg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
                    >
                      In Google Maps öffnen
                    </a>
                  </div>
                  
                  <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
                    <h3 className="font-semibold text-white mb-3">Öffnungszeiten</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Mo - Do</span>
                        <span className="text-neutral-300">18:00 - 00:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Fr - Sa</span>
                        <span className="text-neutral-300">18:00 - 01:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Sonntag</span>
                        <span className="text-red-500">Geschlossen</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
