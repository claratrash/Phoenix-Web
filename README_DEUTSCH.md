# Phönix Cocktailbar Website

Eine moderne, responsive Website für die Phönix Cocktailbar in Magdeburg mit integriertem Content Management System und Tischreservierungssystem.

## ✨ Features

- **🎨 Modernes Design**: Elegant und benutzerfreundlich mit Tailwind CSS
- **📱 Vollständig Responsive**: Optimiert für Desktop, Tablet und Mobile
- **📅 Event-Management**: Einfaches Erstellen und Verwalten von Events
- **🎫 Tischreservierung**: Integriertes Reservierungssystem mit Status-Management
- **👨‍💼 Admin-Panel**: Benutzerfreundliche Verwaltungsoberfläche für Laien
- **⚡ Schnell**: Next.js 14 mit App Router für beste Performance
- **🔒 Sicher**: Passwortgeschützte Admin-Bereiche

## 🚀 Installation

### Voraussetzungen

- Node.js 18.x oder höher
- npm oder yarn

### Schritt-für-Schritt Anleitung

1. **Dependencies installieren**
   ```bash
   npm install
   ```

2. **Entwicklungsserver starten**
   ```bash
   npm run dev
   ```

3. **Browser öffnen**
   - Öffne [http://localhost:3000](http://localhost:3000)
   - Die Website ist nun lokal erreichbar

4. **Für Produktion bauen**
   ```bash
   npm run build
   npm start
   ```

## 📂 Projekt-Struktur

```
Phoenix-Web/
├── src/
│   ├── app/                    # Next.js App Router Pages
│   │   ├── admin/             # Admin-Bereich
│   │   │   ├── dashboard/     # Admin Dashboard
│   │   │   ├── events/        # Event-Verwaltung
│   │   │   ├── reservations/  # Reservierungs-Verwaltung
│   │   │   ├── gallery/       # Galerie-Verwaltung
│   │   │   ├── users/         # Benutzerverwaltung
│   │   │   └── settings/      # Einstellungen & Passwort
│   │   ├── barkarte/          # Barkarten-Seite
│   │   ├── events/            # Events-Seite
│   │   ├── galerie/           # Galerie-Seite
│   │   ├── kontakt/           # Kontakt-Seite
│   │   ├── reservierung/      # Reservierungs-Formular
│   │   ├── layout.tsx         # Root Layout
│   │   ├── page.tsx           # Startseite
│   │   └── globals.css        # Globale Styles
│   ├── components/            # React Komponenten
│   │   ├── Navbar.tsx         # Navigation
│   │   └── Footer.tsx         # Footer
│   ├── lib/                   # Utilities & Daten
│   │   ├── data.ts           # Datenstrukturen
│   │   ├── utils.ts          # Utility Functions
│   │   └── userManagement.ts # User-Management Logik
│   └── types/                 # TypeScript Typen
│       └── index.ts          # Type Definitions
├── public/                    # Statische Dateien
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript Config
├── tailwind.config.js        # Tailwind CSS Config
└── next.config.js            # Next.js Config
```

## 🎯 Verwendung

### Admin-Bereich

1. **Anmelden**
   - Gehe zu `/admin`
   - Standard-Passwort: `phoenix2026`
   - ⚠️ **Wichtig**: Passwort in Produktion ändern!

2. **Events verwalten**
   - Klicke auf "Events verwalten" im Dashboard
   - Erstelle neue Events mit Titel, Beschreibung, Datum, Zeit, Preis
   - Bearbeite oder lösche bestehende Events
   - Keine technischen Kenntnisse erforderlich!

3. **Reservierungen verwalten**
   - Zeige alle Reservierungen an
   - Filtere nach Status (Ausstehend, Bestätigt, Abgesagt)
   - Bestätige oder sage Reservierungen ab
   - Kontaktiere Gäste direkt per Telefon oder E-Mail

4. **Galerie verwalten**
   - Lade Bilder hoch (einzeln oder mehrere gleichzeitig)
   - Ordne Bilder Kategorien zu (Bar, Cocktails, Events, Team, Food)
   - Lösche oder bearbeite Bilder
   - Bilder erscheinen automatisch auf der Galerie-Seite
   - Siehe **[BILDER_ANLEITUNG.md](./BILDER_ANLEITUNG.md)** für Details

5. **Benutzerverwaltung** (Nur für Admins)
   - Lege neue Benutzer an (Staff, Manager, Admin)
   - Verwalte Rechte und Rollen
   - Setze User in Urlaub (temporäre Deaktivierung)
   - Tracking: Sieh wer Reservierungen bearbeitet hat
   - Siehe **[USER_MANAGEMENT_ANLEITUNG.md](./USER_MANAGEMENT_ANLEITUNG.md)** für Details

6. **Eigene Einstellungen**
   - Ändere dein Passwort
   - Aktualisiere dein Profil (Name, E-Mail, Kürzel)
   - Passe deine persönlichen Daten an

### Für Besucher

- **Startseite**: Überblick über die Bar und aktuelle Events
- **Barkarte**: Übersicht über Getränke und Speisen
- **Events**: Alle aktuellen und kommenden Events
- **Reservierung**: Einfaches Formular zur Tischreservierung
- **Galerie**: Bilder von der Bar und Events
- **Kontakt**: Kontaktinformationen und Öffnungszeiten

## 🛠️ Anpassungen

### Inhalte ändern

Die meisten Inhalte können über das Admin-Panel geändert werden. Für grundlegende Informationen:

1. **Bar-Informationen** (`src/lib/data.ts`)
   - Öffnungszeiten
   - Adresse
   - Telefonnummer
   - E-Mail

2. **Farben anpassen** (`tailwind.config.js`)
   - Primary-Farbe (aktuell: Rot)
   - Gold-Farbe (aktuell: Gold)
   - Weitere Theme-Anpassungen

3. **Logo & Favicon** (`public/` Ordner)
   - Füge eigene Bilder hinzu

### API-Integration (Optional)

Aktuell verwendet die Website lokalen State. Für eine Produktion-Umgebung:

1. Erstelle ein Backend (z.B. mit Strapi, Sanity, oder eigenem Node.js Server)
2. Ersetze `localStorage` durch API-Calls
3. Füge Authentifizierung hinzu (z.B. mit NextAuth.js)

## 📱 Deployment

### Vercel (Empfohlen)

1. Pushe den Code zu GitHub
2. Verbinde Repository mit [Vercel](https://vercel.com)
3. Deploy automatisch bei jedem Push

### Andere Hosting-Anbieter

- Netlify
- AWS Amplify
- Digitale Ocean
- Eigener Server mit Node.js

## 🔐 Sicherheitshinweise

⚠️ **Wichtig für Produktion:**

1. **Admin-Passwort ändern**
   - Implementiere sichere Authentifizierung
   - Nutze Environment Variables für Secrets

2. **API-Endpunkte sichern**
   - Füge Backend-Validierung hinzu
   - Implementiere Rate-Limiting

3. **HTTPS verwenden**
   - Für Produktionsumgebung zwingend erforderlich

## 💡 Tipps für Administratoren (ohne Tech-Kenntnisse)

### Events hinzufügen:

1. Gehe zu `/admin` und melde dich an
2. Klicke auf "Events verwalten"
3. Klicke auf "Neues Event"
4. Fülle alle Felder aus:
   - **Titel**: z.B. "Valentinstag Special"
   - **Kategorie**: Wähle passende Kategorie
   - **Datum**: z.B. "14.02.2025"
   - **Uhrzeit**: z.B. "19:00"
   - **Preis**: Optional, z.B. "38,00€ p.P."
   - **Beschreibung**: Detaillierte Beschreibung des Events
   - **Anmeldung erforderlich**: Aktivieren wenn Reservierung nötig
5. Klicke auf "Erstellen"

### Reservierungen bearbeiten:

1. Gehe zu "Reservierungen" im Admin-Bereich
2. Siehe alle eingegangenen Reservierungen
3. Klicke auf "Bestätigen" um zu bestätigen
4. Kontaktiere Gäste per Telefon oder E-Mail
5. Setze Status auf "Bestätigt" oder "Abgesagt"

## 🆘 Support

Bei Fragen oder Problemen:

1. Schaue in diese README-Datei
2. Kontaktiere deinen Web-Entwickler
3. GitHub Issues für technische Probleme

## 📄 Lizenz

Dieses Projekt wurde speziell für die Phönix Cocktailbar Magdeburg entwickelt.

## 🎉 Features für die Zukunft

Mögliche Erweiterungen:

- [ ] Bildergalerie mit Upload-Funktion
- [ ] Newsletter-Integration
- [ ] Online-Bezahlung für Events
- [ ] Kunden-Bewertungen
- [ ] Mehrsprachigkeit (Englisch)
- [ ] Cocktail-Konfigurator
- [ ] Live-Verfügbarkeit von Tischen
- [ ] Social Media Integration
- [ ] Blog-Funktion für News

---

Entwickelt mit ❤️ für die Phönix Cocktailbar Magdeburg
