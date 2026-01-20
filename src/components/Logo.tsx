'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaCocktail } from 'react-icons/fa'

export default function Logo({ className = '' }: { className?: string }) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null)

  useEffect(() => {
    // Lade Logo aus localStorage
    const settings = localStorage.getItem('appearance-settings')
    if (settings) {
      const parsed = JSON.parse(settings)
      if (parsed.logo) {
        setLogoUrl(parsed.logo)
      }
    }
  }, [])

  if (logoUrl) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="relative w-10 h-10 group-hover:scale-110 transition-transform">
          <Image
            src={logoUrl}
            alt="Phönix Logo"
            fill
            className="object-contain"
          />
        </div>
        <span className="font-display text-2xl font-bold bg-gradient-to-r from-primary-500 to-gold-500 bg-clip-text text-transparent">
          Phönix
        </span>
      </div>
    )
  }

  // Fallback: Standard-Logo
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <FaCocktail className="text-3xl text-primary-500 group-hover:rotate-12 transition-transform" />
      <span className="font-display text-2xl font-bold bg-gradient-to-r from-primary-500 to-gold-500 bg-clip-text text-transparent">
        Phönix
      </span>
    </div>
  )
}
