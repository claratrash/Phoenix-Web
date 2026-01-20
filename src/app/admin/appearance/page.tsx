'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  FaArrowLeft,
  FaUpload,
  FaImage,
  FaTrash,
  FaPalette,
  FaSave,
} from 'react-icons/fa'
import { getCurrentUser, hasPermission } from '@/lib/userManagement'

interface AppearanceSettings {
  logo?: string
  heroBackground?: string
  aboutBackground?: string
  eventsBackground?: string
  primaryColor?: string
  accentColor?: string
}

export default function AppearancePage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [settings, setSettings] = useState<AppearanceSettings>({})
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      router.push('/admin')
      return
    }
    
    if (!hasPermission(user, 'canChangeSettings')) {
      router.push('/admin/dashboard')
      return
    }
    
    setCurrentUser(user)
    
    // Lade gespeicherte Einstellungen
    const saved = localStorage.getItem('appearance-settings')
    if (saved) {
      setSettings(JSON.parse(saved))
    }
    
    setIsLoading(false)
  }, [router])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'heroBackground' | 'aboutBackground' | 'eventsBackground') => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string
      const updated = { ...settings, [type]: imageUrl }
      setSettings(updated)
      localStorage.setItem('appearance-settings', JSON.stringify(updated))
      
      setSuccessMessage('Bild erfolgreich hochgeladen!')
      setTimeout(() => setSuccessMessage(''), 3000)
    }
    
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const removeImage = (type: keyof AppearanceSettings) => {
    const updated = { ...settings }
    delete updated[type]
    setSettings(updated)
    localStorage.setItem('appearance-settings', JSON.stringify(updated))
    
    setSuccessMessage('Bild entfernt!')
    setTimeout(() => setSuccessMessage(''), 3000)
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
                Design & Hintergrundbilder
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-8 p-4 bg-green-900/30 border border-green-500 rounded-lg">
            <p className="text-white font-medium">{successMessage}</p>
          </div>
        )}

        {/* Info */}
        <div className="bg-primary-900/20 border border-primary-500/30 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-white mb-2 flex items-center space-x-2">
            <FaPalette className="text-primary-500" />
            <span>Design anpassen</span>
          </h3>
          <p className="text-neutral-300 text-sm">
            Hier kannst du das Logo und Hintergrundbilder für verschiedene Bereiche der Website hochladen. 
            Die Änderungen werden sofort auf der Website sichtbar.
          </p>
        </div>

        <div className="space-y-8">
          {/* Logo */}
          <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <FaImage className="text-primary-500" />
              <span>Logo</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-4">
                  Aktuelles Logo
                </label>
                {settings.logo ? (
                  <div className="relative bg-neutral-800 rounded-lg p-8 border border-neutral-700">
                    <Image
                      src={settings.logo}
                      alt="Logo"
                      width={200}
                      height={200}
                      className="mx-auto"
                    />
                    <button
                      onClick={() => removeImage('logo')}
                      className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ) : (
                  <div className="bg-neutral-800 rounded-lg p-12 border border-neutral-700 border-dashed text-center">
                    <FaImage className="text-6xl text-neutral-600 mx-auto mb-4" />
                    <p className="text-neutral-400">Kein Logo hochgeladen</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-4">
                  Neues Logo hochladen
                </label>
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-neutral-700 border-dashed rounded-lg cursor-pointer bg-neutral-800 hover:bg-neutral-750 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaUpload className="text-4xl text-neutral-500 mb-3" />
                    <p className="mb-2 text-sm text-neutral-400">
                      <span className="font-semibold">Klicken zum Hochladen</span>
                    </p>
                    <p className="text-xs text-neutral-500">PNG, JPG, SVG (max. 2MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'logo')}
                  />
                </label>
                <p className="text-xs text-neutral-400 mt-2">
                  💡 Empfohlen: Transparentes PNG, 200x200px bis 400x400px
                </p>
              </div>
            </div>
          </div>

          {/* Hero Background */}
          <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <FaImage className="text-gold-500" />
              <span>Startseiten-Hintergrund (Hero)</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-4">
                  Aktueller Hintergrund
                </label>
                {settings.heroBackground ? (
                  <div className="relative aspect-video bg-neutral-800 rounded-lg overflow-hidden border border-neutral-700">
                    <Image
                      src={settings.heroBackground}
                      alt="Hero Background"
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => removeImage('heroBackground')}
                      className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ) : (
                  <div className="aspect-video bg-neutral-800 rounded-lg border border-neutral-700 border-dashed flex items-center justify-center">
                    <div className="text-center">
                      <FaImage className="text-6xl text-neutral-600 mx-auto mb-4" />
                      <p className="text-neutral-400">Kein Hintergrund</p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-4">
                  Neuen Hintergrund hochladen
                </label>
                <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-neutral-700 border-dashed rounded-lg cursor-pointer bg-neutral-800 hover:bg-neutral-750 transition-colors">
                  <div className="flex flex-col items-center justify-center">
                    <FaUpload className="text-4xl text-neutral-500 mb-3" />
                    <p className="mb-2 text-sm text-neutral-400">
                      <span className="font-semibold">Klicken zum Hochladen</span>
                    </p>
                    <p className="text-xs text-neutral-500">JPG, PNG (max. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'heroBackground')}
                  />
                </label>
                <p className="text-xs text-neutral-400 mt-2">
                  💡 Empfohlen: 1920x1080px (Full HD) oder 2560x1440px
                </p>
              </div>
            </div>
          </div>

          {/* About Background */}
          <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <FaImage className="text-primary-500" />
              <span>"Über uns"-Section Hintergrund</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                {settings.aboutBackground ? (
                  <div className="relative aspect-video bg-neutral-800 rounded-lg overflow-hidden border border-neutral-700">
                    <Image
                      src={settings.aboutBackground}
                      alt="About Background"
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => removeImage('aboutBackground')}
                      className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ) : (
                  <div className="aspect-video bg-neutral-800 rounded-lg border border-neutral-700 border-dashed flex items-center justify-center">
                    <div className="text-center">
                      <FaImage className="text-6xl text-neutral-600 mx-auto mb-4" />
                      <p className="text-neutral-400">Kein Hintergrund</p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-neutral-700 border-dashed rounded-lg cursor-pointer bg-neutral-800 hover:bg-neutral-750 transition-colors">
                  <div className="flex flex-col items-center justify-center">
                    <FaUpload className="text-4xl text-neutral-500 mb-3" />
                    <p className="mb-2 text-sm text-neutral-400">
                      <span className="font-semibold">Klicken zum Hochladen</span>
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'aboutBackground')}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Events Background */}
          <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <FaImage className="text-gold-500" />
              <span>Events-Section Hintergrund</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                {settings.eventsBackground ? (
                  <div className="relative aspect-video bg-neutral-800 rounded-lg overflow-hidden border border-neutral-700">
                    <Image
                      src={settings.eventsBackground}
                      alt="Events Background"
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => removeImage('eventsBackground')}
                      className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ) : (
                  <div className="aspect-video bg-neutral-800 rounded-lg border border-neutral-700 border-dashed flex items-center justify-center">
                    <div className="text-center">
                      <FaImage className="text-6xl text-neutral-600 mx-auto mb-4" />
                      <p className="text-neutral-400">Kein Hintergrund</p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-neutral-700 border-dashed rounded-lg cursor-pointer bg-neutral-800 hover:bg-neutral-750 transition-colors">
                  <div className="flex flex-col items-center justify-center">
                    <FaUpload className="text-4xl text-neutral-500 mb-3" />
                    <p className="mb-2 text-sm text-neutral-400">
                      <span className="font-semibold">Klicken zum Hochladen</span>
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'eventsBackground')}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Hinweis */}
        <div className="mt-8 bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6">
          <p className="text-sm text-neutral-300">
            <span className="font-semibold text-yellow-500">💡 Tipp:</span> Verwende hochauflösende Bilder 
            für beste Qualität. Die Bilder werden im Browser gespeichert. Für eine permanente Lösung 
            empfehlen wir einen Cloud-Speicher.
          </p>
        </div>
      </main>
    </div>
  )
}
