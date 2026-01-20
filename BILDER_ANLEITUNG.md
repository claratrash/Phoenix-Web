# Bilder-Verwaltung - Anleitung

## 📸 Bilder von der alten Website übernehmen

### Schritt 1: Bilder von der alten Website herunterladen

1. **Öffne die alte Website**: http://www.xn--phnixbar-o4a.de/
2. **Rechtsklick auf jedes Bild** → "Bild speichern unter..."
3. **Speichere alle Bilder** in einen Ordner auf deinem Computer
4. **Benenne sie sinnvoll**, z.B.:
   - `bar-innenraum.jpg`
   - `cocktail-mojito.jpg`
   - `event-valentinstag.jpg`
   - `team-henriette.jpg`

### Schritt 2: Bilder im Admin-Panel hochladen

1. **Gehe zu**: http://localhost:3000/admin
2. **Melde dich an** mit Passwort: `phoenix2026`
3. **Klicke auf**: "Galerie" (im Dashboard)
4. **Klicke auf**: "Bilder hochladen" (grüner Button)
5. **Wähle mehrere Bilder** gleichzeitig aus (Strg+Klick oder Shift+Klick)
6. **Warte** bis alle Bilder hochgeladen sind
7. **Ordne jedem Bild eine Kategorie zu**:
   - Bar & Location
   - Cocktails
   - Events
   - Team
   - Essen & Snacks

✅ **Fertig!** Die Bilder erscheinen automatisch in der Galerie!

---

## 🖼️ Bilderverwaltung im Admin

### Neue Bilder hochladen

**Option 1: Einzelne Bilder**
1. Im Admin → Galerie
2. "Bilder hochladen" klicken
3. Bild auswählen
4. Kategorie zuweisen

**Option 2: Mehrere Bilder gleichzeitig**
1. Im Admin → Galerie
2. "Bilder hochladen" klicken
3. Mehrere Bilder markieren (Strg+A für alle)
4. Alle Bilder auf einmal hochladen
5. Kategorien einzeln zuweisen

### Bilder kategorisieren

Jedes Bild kann einer Kategorie zugewiesen werden:

- **Bar & Location**: Innenraum, Terrasse, Gewölbe, Außenansicht
- **Cocktails**: Einzelne Cocktails, Drinks, Getränke
- **Events**: Konzerte, Partys, Specials, Veranstaltungen
- **Team**: Mitarbeiter, Inhaber, Team-Fotos
- **Essen & Snacks**: Baguettes, Minipizzen, Snacks

**Kategorie ändern:**
1. Im Admin → Galerie
2. Unter jedem Bild: Dropdown-Menü
3. Neue Kategorie wählen
4. ✅ Wird automatisch gespeichert

### Bilder löschen

1. Im Admin → Galerie
2. Mit der Maus über ein Bild fahren
3. Papierkorb-Symbol erscheint
4. Klicken → Bestätigen
5. ✅ Bild ist gelöscht

---

## 📱 Galerie auf der Website

### Besucher-Ansicht

- **URL**: http://localhost:3000/galerie
- Besucher sehen alle hochgeladenen Bilder
- Filter nach Kategorien möglich
- Bilder können groß angezeigt werden (Klick drauf)
- Responsive für Handy & Tablet

### Features für Besucher

✅ **Filter**: Nach Kategorien filtern
✅ **Lightbox**: Bilder groß anzeigen
✅ **Responsive**: Optimiert für alle Geräte
✅ **Social Links**: Facebook & Instagram Integration

---

## 🎯 Empfohlene Bilder

### Priorität 1 (Wichtigste Bilder)

1. **Bar Innenraum** (3-5 Bilder)
   - Hauptraum mit Bar
   - Historisches Gewölbe
   - Sitzgelegenheiten
   
2. **Terrasse** (2-3 Bilder)
   - Außenbereich
   - Blick auf Hundertwasserhaus
   
3. **Cocktails** (10-15 Bilder)
   - Beliebte Cocktails
   - Optisch ansprechend fotografiert
   - Verschiedene Farben & Stile

### Priorität 2 (Nice to have)

4. **Events** (5-10 Bilder)
   - Live-Musik
   - Quiz-Abende
   - Besondere Veranstaltungen
   
5. **Team** (2-3 Bilder)
   - Inhaberin Henriette
   - Team bei der Arbeit
   
6. **Essen** (3-5 Bilder)
   - Baguettes
   - Minipizzen
   - Snacks

### Priorität 3 (Optional)

7. **Atmosphäre** (5-8 Bilder)
   - Details der Bar
   - Dekoration
   - Stimmungsbilder

---

## 📐 Bild-Tipps für beste Qualität

### Optimale Bildgröße
- **Mindestens**: 800 x 800 Pixel
- **Empfohlen**: 1200 x 1200 Pixel
- **Maximum**: 3000 x 3000 Pixel

### Dateiformate
✅ **JPG** - Für Fotos (empfohlen)
✅ **PNG** - Für Grafiken mit Transparenz
✅ **WebP** - Moderne, komprimierte Bilder
✅ **GIF** - Für Animationen

### Dateigröße
- **Pro Bild**: Maximal 5 MB
- **Tipp**: Große Bilder vor dem Upload komprimieren
  - Online-Tool: https://tinypng.com/
  - Oder: Windows Foto-App → "Speichern unter" → Qualität reduzieren

### Bildqualität
✅ **Gute Beleuchtung**: Helle, klare Bilder
✅ **Scharf**: Nicht verwackelt
✅ **Guter Ausschnitt**: Hauptmotiv zentriert
❌ **Vermeiden**: Dunkle, unscharfe, verwackelte Bilder

---

## 🔄 Facebook-Feed Integration

### Facebook-Seite verknüpfen

**Aktuell im Code:**
```
https://facebook.com/phoenixbar
```

**Anpassen:**
1. Öffne: `src/components/FacebookFeed.tsx`
2. Suche Zeile mit: `pageUrl = 'https://www.facebook.com/phoenixbar'`
3. Ersetze durch deine echte Facebook-URL
4. Speichern & Website neu starten

**Oder frage deinen Entwickler** die korrekte Facebook-Page-URL einzutragen.

### Was zeigt der Facebook-Feed?

- ✅ Neueste Posts von deiner Facebook-Seite
- ✅ Automatisch aktualisiert
- ✅ Besucher können direkt interagieren
- ✅ "Gefällt mir" klicken möglich

### Facebook-Feed auf der Startseite

Der Feed ist bereits auf der Startseite integriert!
- Scroll nach unten zur Section "Folge uns auf Facebook"
- Besucher sehen deine aktuellen Posts
- Link zur Facebook-Seite inklusive

---

## 💾 Datenspeicherung

### Wo werden die Bilder gespeichert?

**Aktuell**: Im Browser (localStorage)
- ✅ Funktioniert sofort
- ✅ Kein Backend nötig
- ⚠️ Nur auf diesem Computer/Browser
- ⚠️ Bei Browser-Cache-Leerung verloren

### Für Produktion empfohlen:

**Cloud-Speicher** (z.B. Cloudinary, AWS S3)
- ✅ Permanent gespeichert
- ✅ Von überall erreichbar
- ✅ Automatische Optimierung
- ✅ Backup inklusive

**Dein Entwickler kann das einrichten!**

---

## 🆘 Probleme & Lösungen

### Problem: Bilder werden nicht angezeigt

**Lösung 1**: Browser-Cache leeren
- Strg+F5 (Windows) oder Cmd+Shift+R (Mac)

**Lösung 2**: Anderer Browser
- Teste in Chrome, Firefox oder Edge

**Lösung 3**: Console checken
- F12 drücken → "Console" Tab
- Fehlermeldungen kopieren und an Entwickler senden

### Problem: Bild-Upload funktioniert nicht

**Lösung 1**: Dateigröße prüfen
- Maximal 5 MB pro Bild
- Bei größeren Bildern: Komprimieren

**Lösung 2**: Dateiformat prüfen
- Nur JPG, PNG, GIF, WebP erlaubt
- Keine PDFs, Videos, etc.

**Lösung 3**: Browser neu starten
- Komplett schließen und neu öffnen

### Problem: Bilder verschwinden nach Neustart

**Das ist normal bei localStorage!**
- Bilder sind nur im Browser gespeichert
- Für permanente Speicherung: Backend nötig
- Kontaktiere deinen Entwickler für Cloud-Lösung

---

## ✨ Best Practices

### DO's ✅

- **Hochwertige Bilder** verwenden
- **Regelmäßig neue Bilder** hinzufügen
- **Kategorien korrekt** zuweisen
- **Unscharfe Bilder** vorher aussortieren
- **Bilder komprimieren** vor Upload

### DON'Ts ❌

- **Keine fremden Bilder** (Urheberrecht!)
- **Keine zu dunklen** Bilder
- **Keine extrem großen** Dateien (>5 MB)
- **Nicht zu viele Bilder** auf einmal (max. 20)
- **Keine privaten Fotos** von Gästen ohne Erlaubnis

---

## 📞 Support

**Bei Fragen:**

1. Lies diese Anleitung nochmal
2. Probiere es in einem anderen Browser
3. Screenshot vom Problem machen
4. Entwickler kontaktieren

---

**Viel Erfolg beim Bilder hochladen! 📸**
