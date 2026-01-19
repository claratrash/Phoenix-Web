import { Event, OpeningHours, BarInfo } from '@/types'

export const barInfo: BarInfo = {
  name: 'Phönix Cocktailbar',
  address: 'Breiter Weg 202',
  city: 'Magdeburg',
  zip: '39104',
  phone: '0176 / 234 73 297',
  email: 'henriette@luenenberger.de',
  openingHours: [
    { day: 'Montag', open: '18:00', close: '00:00', closed: false },
    { day: 'Dienstag', open: '18:00', close: '00:00', closed: false },
    { day: 'Mittwoch', open: '18:00', close: '00:00', closed: false },
    { day: 'Donnerstag', open: '18:00', close: '00:00', closed: false },
    { day: 'Freitag', open: '18:00', close: '01:00', closed: false },
    { day: 'Samstag', open: '18:00', close: '01:00', closed: false },
    { day: 'Sonntag', open: '', close: '', closed: true },
  ],
}

export const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Getränkebörse',
    description: 'Jeden Donnerstag ab 19.00 Uhr! Die Nachfrage bestimmt den Preis. Mit etwas Glück sinkt euer Lieblingsdrink zum richtigen Zeitpunkt.',
    date: 'Jeden Donnerstag',
    time: '19:00',
    requiresReservation: false,
    category: 'special',
  },
  {
    id: '2',
    title: 'Quiz - dich durch die Nacht',
    description: 'Jeden 2. Sonntag im Monat wird das Phönix um 18.30 Uhr zur Quizarena. Bitte meldet euch vorher an.',
    date: 'Jeden 2. Sonntag im Monat',
    time: '18:30',
    requiresReservation: true,
    category: 'quiz',
  },
  {
    id: '3',
    title: 'Valentinstag - 3-Gänge-Cocktail-Menü',
    description: 'Zum Valentinstag verwöhnen wir euch mit einem 3-Gänge-Cocktail-Menü mit dazu korrespondierenden Snacks. Drei verschiedene Menüs zur Auswahl.',
    date: '14.02.2025',
    time: '18:00',
    price: 'ab 38,00€ p.P.',
    requiresReservation: true,
    category: 'special',
  },
]

// Time slots für Reservierungen
export const timeSlots = [
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', 
  '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
]
