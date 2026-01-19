import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { FaImages } from 'react-icons/fa'

export default function GaleriePage() {
  // Platzhalter für Galerie-Bilder
  const placeholderImages = Array.from({ length: 12 }, (_, i) => i + 1)

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-20 px-4 bg-neutral-950">
        <div className="max-w-7xl mx-auto py-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">
              Galerie
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-gold-500 mx-auto mb-6"></div>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Impressionen aus der Phönix Cocktailbar - unsere Location, Events und Atmosphäre
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {placeholderImages.map((num) => (
              <div
                key={num}
                className="aspect-square bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg overflow-hidden border border-neutral-700 hover:border-primary-500 transition-colors cursor-pointer group"
              >
                <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaImages className="text-4xl text-neutral-600 group-hover:text-primary-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-800 text-center">
            <FaImages className="text-5xl text-primary-500 mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold text-white mb-4">
              Bilder folgen in Kürze
            </h2>
            <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
              Wir arbeiten gerade an unserer Galerie. In der Zwischenzeit kannst du uns auf 
              Instagram und Facebook besuchen, um aktuelle Bilder von unseren Events und der 
              Location zu sehen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white rounded-lg font-semibold transition-opacity"
              >
                Instagram besuchen
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-lg font-semibold transition-colors"
              >
                Facebook besuchen
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
