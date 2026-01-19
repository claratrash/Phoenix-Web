import Link from 'next/link'
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { barInfo } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kontakt */}
          <div>
            <h3 className="font-display text-xl font-bold text-primary-500 mb-4">
              Kontakt
            </h3>
            <div className="space-y-3 text-neutral-300">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <p>{barInfo.address}</p>
                  <p>{barInfo.zip} {barInfo.city}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-primary-500 flex-shrink-0" />
                <a href={`tel:${barInfo.phone.replace(/\s/g, '')}`} className="hover:text-primary-500 transition-colors">
                  {barInfo.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-primary-500 flex-shrink-0" />
                <a href={`mailto:${barInfo.email}`} className="hover:text-primary-500 transition-colors break-all">
                  {barInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Öffnungszeiten */}
          <div>
            <h3 className="font-display text-xl font-bold text-primary-500 mb-4">
              Öffnungszeiten
            </h3>
            <div className="space-y-2 text-neutral-300">
              {barInfo.openingHours.map((day) => (
                <div key={day.day} className="flex justify-between">
                  <span className="font-medium">{day.day}</span>
                  <span>
                    {day.closed ? 'Geschlossen' : `${day.open} - ${day.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media & Links */}
          <div>
            <h3 className="font-display text-xl font-bold text-primary-500 mb-4">
              Folge uns
            </h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-primary-500 transition-colors"
              >
                <FaFacebook size={28} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-primary-500 transition-colors"
              >
                <FaInstagram size={28} />
              </a>
            </div>
            <div className="space-y-2">
              <Link href="/admin" className="block text-neutral-400 hover:text-primary-500 transition-colors text-sm">
                Admin Login
              </Link>
              <Link href="/impressum" className="block text-neutral-400 hover:text-primary-500 transition-colors text-sm">
                Impressum
              </Link>
              <Link href="/datenschutz" className="block text-neutral-400 hover:text-primary-500 transition-colors text-sm">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-neutral-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Phönix Cocktailbar. Alle Rechte vorbehalten.</p>
          <p className="mt-2">Gefördert durch das Land Sachsen-Anhalt & den Europäischen Sozialfonds</p>
        </div>
      </div>
    </footer>
  )
}
