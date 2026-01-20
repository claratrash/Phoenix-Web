'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { FaImages, FaFilter } from 'react-icons/fa'
import { GalleryImage } from '@/types'

export default function GaleriePage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  useEffect(() => {
    // Lade Bilder aus localStorage
    const savedImages = localStorage.getItem('gallery-images')
    if (savedImages) {
      setImages(JSON.parse(savedImages))
    }
  }, [])

  const categories = [
    { value: 'all', label: 'Alle' },
    { value: 'bar', label: 'Bar & Location' },
    { value: 'cocktails', label: 'Cocktails' },
    { value: 'events', label: 'Events' },
    { value: 'team', label: 'Team' },
    { value: 'food', label: 'Essen & Snacks' },
  ]

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory)

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

          {images.length > 0 ? (
            <>
              {/* Filter */}
              <div className="mb-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <FaFilter className="text-primary-500" />
                  <span className="text-neutral-300 font-medium">Kategorie:</span>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`px-6 py-2 rounded-full font-medium transition-colors ${
                        selectedCategory === cat.value
                          ? 'bg-primary-500 text-white'
                          : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Grid */}
              {filteredImages.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                  {filteredImages.map((image) => (
                    <div
                      key={image.id}
                      onClick={() => setSelectedImage(image)}
                      className="aspect-square rounded-lg overflow-hidden border border-neutral-700 hover:border-primary-500 transition-colors cursor-pointer group relative"
                    >
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-neutral-900 rounded-lg p-12 border border-neutral-800 text-center mb-12">
                  <p className="text-neutral-400">Keine Bilder in dieser Kategorie.</p>
                </div>
              )}
            </>
          ) : (
            /* Info Box */
            <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-800 text-center mb-12">
              <FaImages className="text-5xl text-primary-500 mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold text-white mb-4">
                Bilder folgen in Kürze
              </h2>
              <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
                Wir arbeiten gerade an unserer Galerie. In der Zwischenzeit kannst du uns auf 
                Instagram und Facebook besuchen, um aktuelle Bilder von unseren Events und der 
                Location zu sehen.
              </p>
            </div>
          )}

          {/* Social Media Links */}
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
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full max-h-[90vh]">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-4xl hover:text-primary-500 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
