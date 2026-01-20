'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  FaArrowLeft,
  FaPlus,
  FaTrash,
  FaUpload,
  FaImage,
} from 'react-icons/fa'
import { GalleryImage } from '@/types'

export default function AdminGalleryPage() {
  const router = useRouter()
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin-logged-in')
    if (!isLoggedIn) {
      router.push('/admin')
    } else {
      // Lade gespeicherte Bilder aus localStorage
      const savedImages = localStorage.getItem('gallery-images')
      if (savedImages) {
        setImages(JSON.parse(savedImages))
      }
      setIsLoading(false)
    }
  }, [router])

  const categories = [
    { value: 'all', label: 'Alle Bilder' },
    { value: 'bar', label: 'Bar & Location' },
    { value: 'cocktails', label: 'Cocktails' },
    { value: 'events', label: 'Events' },
    { value: 'team', label: 'Team' },
    { value: 'food', label: 'Essen & Snacks' },
  ]

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    // Verarbeite jedes Bild
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      
      // Erstelle eine Data URL für das Bild
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        
        const newImage: GalleryImage = {
          id: Date.now().toString() + i,
          url: imageUrl,
          alt: file.name.replace(/\.[^/.]+$/, ''),
          category: 'bar',
        }

        setImages(prev => {
          const updated = [...prev, newImage]
          // Speichere in localStorage
          localStorage.setItem('gallery-images', JSON.stringify(updated))
          return updated
        })
      }
      
      reader.readAsDataURL(file)
    }

    setUploading(false)
    // Reset input
    e.target.value = ''
  }

  const handleDelete = (id: string) => {
    if (confirm('Bild wirklich löschen?')) {
      const updated = images.filter(img => img.id !== id)
      setImages(updated)
      localStorage.setItem('gallery-images', JSON.stringify(updated))
    }
  }

  const updateImageCategory = (id: string, category: string) => {
    const updated = images.map(img => 
      img.id === id ? { ...img, category } : img
    )
    setImages(updated)
    localStorage.setItem('gallery-images', JSON.stringify(updated))
  }

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory)

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
                Galerie verwalten
              </h1>
            </div>
            <label className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors cursor-pointer">
              <FaUpload />
              <span>Bilder hochladen</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Info */}
        <div className="bg-primary-900/20 border border-primary-500/30 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-white mb-2 flex items-center space-x-2">
            <FaImage className="text-primary-500" />
            <span>Bilder hochladen</span>
          </h3>
          <p className="text-neutral-300 text-sm mb-2">
            Klicke auf "Bilder hochladen" um mehrere Bilder gleichzeitig auszuwählen.
          </p>
          <p className="text-neutral-400 text-xs">
            💡 Tipp: Du kannst JPG, PNG, GIF und WebP Dateien hochladen. Die Bilder werden 
            lokal im Browser gespeichert. Für eine permanente Speicherung empfehlen wir später 
            ein Backend (z.B. mit Cloud-Speicher).
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-neutral-900 rounded-lg p-4 border border-neutral-800">
            <p className="text-neutral-400 text-sm mb-1">Gesamt</p>
            <p className="text-2xl font-bold text-white">{images.length}</p>
          </div>
          {categories.slice(1).map((cat) => (
            <div key={cat.value} className="bg-neutral-900 rounded-lg p-4 border border-neutral-800">
              <p className="text-neutral-400 text-sm mb-1">{cat.label}</p>
              <p className="text-2xl font-bold text-primary-500">
                {images.filter(img => img.category === cat.value).length}
              </p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
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

        {/* Images Grid */}
        {uploading && (
          <div className="bg-neutral-900 rounded-lg p-12 border border-neutral-800 text-center mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-neutral-400">Bilder werden hochgeladen...</p>
          </div>
        )}

        {filteredImages.length === 0 ? (
          <div className="bg-neutral-900 rounded-lg p-12 border border-neutral-800 text-center">
            <FaImage className="text-6xl text-neutral-600 mx-auto mb-4" />
            <p className="text-neutral-400 mb-4">
              {images.length === 0 
                ? 'Noch keine Bilder hochgeladen.'
                : 'Keine Bilder in dieser Kategorie.'}
            </p>
            <label className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors cursor-pointer">
              <FaPlus />
              <span>Erstes Bild hochladen</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 group"
              >
                <div className="aspect-square relative">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                      title="Löschen"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <select
                    value={image.category}
                    onChange={(e) => updateImageCategory(image.id, e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-white text-sm focus:border-primary-500 focus:outline-none"
                  >
                    {categories.slice(1).map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-neutral-400 mt-2 truncate" title={image.alt}>
                    {image.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
