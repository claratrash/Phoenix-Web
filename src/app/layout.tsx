import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Phönix Cocktailbar Magdeburg',
  description: 'Die Cocktailbar im Zentrum von Magdeburg mit großer Auswahl an Cocktails, Events und Tischreservierung',
  keywords: ['Cocktailbar', 'Magdeburg', 'Phönix', 'Bar', 'Events', 'Reservierung'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
