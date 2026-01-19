# Installation der Phönix Website
## Schritt-für-Schritt Anleitung für Anfänger

Diese Anleitung hilft dir, die Website auf deinem Computer zu installieren.

---

## 📋 Was du brauchst

Bevor du startest, installiere:

1. **Node.js** (Version 18 oder neuer)
   - Download: https://nodejs.org/
   - Wähle die "LTS" Version
   - Installiere mit allen Standard-Einstellungen

2. **Ein Code-Editor** (optional, aber empfohlen)
   - Visual Studio Code: https://code.visualstudio.com/
   - Oder ein anderer Editor deiner Wahl

3. **Git** (optional, für Updates)
   - Download: https://git-scm.com/
   - Installiere mit Standard-Einstellungen

---

## 🚀 Installation

### Windows

1. **Projekt-Ordner öffnen**
   - Öffne den Windows Explorer
   - Navigiere zum Projekt-Ordner "Phoenix-Web"
   - In der Adressleiste: Tippe `cmd` und drücke Enter
   - Ein schwarzes Fenster (Kommandozeile) öffnet sich

2. **Dependencies installieren**
   ```
   npm install
   ```
   - Dieser Befehl lädt alle benötigten Pakete herunter
   - Das kann 2-5 Minuten dauern
   - Warte bis "Installation complete" oder ähnlich erscheint

3. **Website starten**
   ```
   npm run dev
   ```
   - Die Website startet jetzt
   - Du siehst: "ready - started server on ... url: http://localhost:3000"

4. **Website öffnen**
   - Öffne deinen Browser (Chrome, Firefox, Edge)
   - Gehe zu: http://localhost:3000
   - 🎉 Die Website läuft!

### macOS

1. **Terminal öffnen**
   - Drücke `Cmd + Leertaste`
   - Tippe "Terminal" und drücke Enter

2. **Zum Projekt-Ordner navigieren**
   ```
   cd ~/Pfad/zum/Phoenix-Web
   ```
   Tipp: Du kannst den Ordner ins Terminal ziehen!

3. **Dependencies installieren**
   ```
   npm install
   ```

4. **Website starten**
   ```
   npm run dev
   ```

5. **Browser öffnen**
   - Gehe zu: http://localhost:3000

### Linux

1. **Terminal öffnen**
   - Strg + Alt + T

2. **Zum Projekt-Ordner navigieren**
   ```
   cd /pfad/zum/Phoenix-Web
   ```

3. **Dependencies installieren**
   ```
   npm install
   ```

4. **Website starten**
   ```
   npm run dev
   ```

5. **Browser öffnen**
   - Gehe zu: http://localhost:3000

---

## ✅ Test ob es funktioniert

### Startseite testen
- Gehe zu: http://localhost:3000
- Du solltest die Phönix-Startseite sehen

### Admin-Bereich testen
- Gehe zu: http://localhost:3000/admin
- Passwort: `phoenix2026`
- Du solltest das Dashboard sehen

### Reservierung testen
- Gehe zu: http://localhost:3000/reservierung
- Fülle das Formular aus
- Klicke "Absenden"
- Du solltest eine Erfolgs-Meldung sehen

---

## 🛑 Probleme? Hier sind Lösungen!

### Problem: "npm: command not found"
**Lösung**: Node.js ist nicht installiert
- Installiere Node.js von https://nodejs.org/
- Schließe die Kommandozeile und öffne sie neu
- Versuche es nochmal

### Problem: "Port 3000 is already in use"
**Lösung**: Port ist bereits belegt
- Option 1: Schließe andere Programme die Port 3000 nutzen
- Option 2: Nutze einen anderen Port:
  ```
  npm run dev -- -p 3001
  ```
  Dann gehe zu: http://localhost:3001

### Problem: Installation dauert ewig
**Lösung**: Cache leeren
```
npm cache clean --force
npm install
```

### Problem: "Error: Cannot find module..."
**Lösung**: Dependencies neu installieren
```
rm -rf node_modules
npm install
```

Windows:
```
rmdir /s node_modules
npm install
```

### Problem: Website zeigt Fehler
**Lösung**: 
1. Stoppe den Server (Strg+C in der Kommandozeile)
2. Starte neu: `npm run dev`
3. Aktualisiere den Browser (F5)

---

## 📦 Für Fortgeschrittene

### Build für Produktion
```bash
npm run build
npm start
```

### Entwicklermodus mit Debugging
```bash
npm run dev
```

### Linter ausführen
```bash
npm run lint
```

---

## 🌐 Online stellen (Deployment)

### Option 1: Vercel (Einfachste Methode - Kostenlos)

1. **GitHub Account erstellen** (falls noch nicht vorhanden)
   - https://github.com

2. **Projekt auf GitHub hochladen**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/DEIN-USERNAME/phoenix-web.git
   git push -u origin main
   ```

3. **Vercel Account erstellen**
   - https://vercel.com
   - Mit GitHub anmelden

4. **Projekt importieren**
   - "New Project" klicken
   - Dein GitHub Repository auswählen
   - "Deploy" klicken

5. **Fertig!**
   - Nach 2-3 Minuten ist deine Website online
   - Du bekommst eine URL wie: phoenix-web.vercel.app

### Option 2: Netlify (Alternativ - Kostenlos)

1. **Netlify Account erstellen**
   - https://netlify.com

2. **Projekt hochladen**
   - "Add new site" → "Import from Git"
   - GitHub Repository verbinden
   - Deploy

### Option 3: Eigener Server

Benötigt:
- Server mit Node.js
- Domain
- SSL-Zertifikat

Kontaktiere einen Web-Entwickler für diese Option.

---

## 🆘 Support

**Du kommst nicht weiter?**

1. **Lies diese Anleitung nochmal in Ruhe**
2. **Google deinen Fehler**
   - Kopiere die Fehlermeldung
   - Suche bei Google: "[Fehlermeldung] npm fix"
3. **Screenshot machen** und Entwickler fragen

---

## ✨ Fertig!

Du hast es geschafft! Die Website läuft jetzt auf deinem Computer.

**Nächste Schritte:**
- Lies die [ADMIN_ANLEITUNG.md](./ADMIN_ANLEITUNG.md)
- Teste alle Funktionen
- Passe Inhalte an

Viel Erfolg! 🚀
