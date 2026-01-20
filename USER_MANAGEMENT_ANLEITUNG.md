# Benutzerverwaltung - Anleitung

## 👥 User-Management System

### Übersicht

Das Phönix-System verfügt über ein vollständiges Benutzerverwaltungssystem mit:
- ✅ **3 Rollen** mit unterschiedlichen Rechten
- ✅ **Urlaubs-Funktion** um User temporär zu deaktivieren
- ✅ **Tracking** wer Reservierungen bearbeitet hat
- ✅ **Passwort-Änderung** für alle User
- ✅ **Kürzel-System** zur Identifikation

---

## 🔐 Login

### Standard-Admin-Account

**Bei der ersten Installation existiert:**
- **Benutzername**: `admin`
- **Passwort**: `phoenix2026`
- **Kürzel**: `ADM`
- **Rolle**: Administrator

### Login-Prozess

1. Gehe zu `/admin`
2. Gebe Benutzername ein
3. Gebe Passwort ein
4. Klicke "Anmelden"

**Hinweis**: User, die im Urlaub oder deaktiviert sind, können sich nicht anmelden!

---

## 👤 Rollen & Rechte

### Administrator (admin)

**Alle Rechte:**
- ✅ Events verwalten
- ✅ Reservierungen verwalten
- ✅ Galerie verwalten
- ✅ **Benutzer verwalten**
- ✅ Berichte ansehen
- ✅ **Einstellungen ändern**

**Verwendung**: Inhaber, Geschäftsführung

---

### Manager (manager)

**Erweiterte Rechte:**
- ✅ Events verwalten
- ✅ Reservierungen verwalten
- ✅ Galerie verwalten
- ✅ Berichte ansehen
- ❌ Keine Benutzerverwaltung
- ❌ Keine Einstellungen

**Verwendung**: Stellvertretende Leitung, Bar-Manager

---

### Mitarbeiter (staff)

**Basis-Rechte:**
- ✅ Reservierungen verwalten
- ❌ Keine Events
- ❌ Keine Galerie
- ❌ Keine Benutzerverwaltung
- ❌ Keine Berichte
- ❌ Keine Einstellungen

**Verwendung**: Servicepersonal, Barkeeper

---

## ➕ Neuen Benutzer anlegen

### Schritt-für-Schritt

1. **Im Dashboard** → "Benutzerverwaltung" klicken

2. **"Neuer Benutzer"** klicken (grüner Button oben rechts)

3. **Formular ausfüllen**:

   **Benutzername** (Pflicht)
   - Eindeutiger Login-Name
   - Beispiel: `max.mustermann`
   - Keine Leerzeichen!

   **Passwort** (Pflicht)
   - Mindestens 6 Zeichen
   - Beispiel: `sicher123`
   - ⚠️ Wird im Klartext gespeichert (Demo-Version)

   **Anzeigename** (Pflicht)
   - Voller Name des Users
   - Beispiel: `Max Mustermann`

   **Kürzel** (Pflicht, max. 3 Zeichen)
   - Erscheint bei Reservierungen
   - Beispiel: `MM` für Max Mustermann
   - Muss eindeutig sein!
   - Wird automatisch in GROSSBUCHSTABEN umgewandelt

   **E-Mail** (Optional)
   - Beispiel: `max@phoenixbar.de`

   **Rolle** (Pflicht)
   - Wähle passende Rolle aus Dropdown:
     - **Mitarbeiter**: Nur Reservierungen
     - **Manager**: Events + Reservierungen + Galerie
     - **Administrator**: Alle Rechte

4. **"Erstellen" klicken**

✅ **Fertig!** Der Benutzer kann sich jetzt anmelden!

---

## ✏️ Benutzer bearbeiten

1. **In der Benutzerliste** den gewünschten User finden

2. **Stift-Symbol** (✏️) klicken

3. **Daten ändern**:
   - Benutzername ändern
   - Passwort ändern
   - Name anpassen
   - Kürzel ändern
   - E-Mail aktualisieren
   - **Rolle ändern** (z.B. von Staff zu Manager)

4. **"Aktualisieren" klicken**

✅ Änderungen sind sofort aktiv!

---

## 🏖️ Urlaub setzen

### Warum Urlaub-Funktion?

- User wird **temporär deaktiviert**
- Kann sich **nicht anmelden** während Urlaub
- Wird nach Urlaubs-Ende **automatisch reaktiviert**
- Perfekt für: Urlaub, Krankheit, Abwesenheit

### So setzt du einen User in Urlaub:

1. **In der Benutzerliste** den User finden

2. **Sonnenschirm-Symbol** (🏖️) klicken

3. **Urlaub-Start eingeben**:
   - Format: `YYYY-MM-DD`
   - Beispiel: `2026-07-01`

4. **Urlaub-Ende eingeben**:
   - Format: `YYYY-MM-DD`
   - Beispiel: `2026-07-14`

5. **OK klicken**

✅ User ist jetzt im Urlaub!

### User-Status im Urlaub:

- 🏖️ **Kennzeichnung**: "Im Urlaub" Badge
- 🚫 **Login gesperrt**: Kann sich nicht anmelden
- 📅 **Sichtbare Daten**: Von/Bis Datum wird angezeigt
- ♻️ **Auto-Reaktivierung**: Nach Urlaubs-Ende automatisch wieder aktiv

### Urlaub vorzeitig beenden:

1. User in Liste finden
2. Sonnenschirm-Symbol klicken (ist blau/aktiv)
3. User ist sofort wieder aktiv

---

## 🔴 Benutzer deaktivieren

### Temporär deaktivieren

**Unterschied zum Urlaub:**
- Urlaub = Zeitlich begrenzt + automatische Reaktivierung
- Deaktivieren = Unbegrenzt + manuelle Reaktivierung

**So deaktivierst du einen User:**

1. In der Benutzerliste den User finden
2. **Durchgestrichenes User-Symbol** (🚫) klicken
3. User ist sofort deaktiviert

**Status:**
- ❌ "Inaktiv" Badge
- 🚫 Kann sich nicht anmelden
- ⏸️ Bleibt deaktiviert bis manuell reaktiviert

**Reaktivieren:**
1. User finden
2. User-Check-Symbol (✅) klicken
3. Sofort wieder aktiv

---

## 🗑️ Benutzer löschen

⚠️ **Achtung**: Endgültig!

1. In der Benutzerliste den User finden
2. **Papierkorb-Symbol** (🗑️) klicken
3. Bestätigen mit "OK"

✅ User ist unwiderruflich gelöscht!

**Hinweise:**
- Du kannst **deinen eigenen Account nicht löschen**
- Bereits von diesem User bearbeitete Reservierungen bleiben erhalten
- Kürzel wird weiter bei alten Reservierungen angezeigt

---

## 📊 Tracking bei Reservierungen

### Was wird getrackt?

Wenn ein User eine Reservierung **bestätigt** oder **absagt**, wird automatisch gespeichert:

- **Wer**: Kürzel des Users (z.B. "MM")
- **Wann**: Datum & Uhrzeit der Bearbeitung
- **Was**: Status (Bestätigt/Abgesagt)

### Wo sehe ich das Tracking?

**In der Reservierungs-Übersicht:**

Unter jeder bearbeiteten Reservierung erscheint:

```
Bearbeitet von: MM am 19.01.2026 um 14:30 Uhr
```

**Vorteile:**
- ✅ Nachvollziehbarkeit wer was gemacht hat
- ✅ Verantwortlichkeit klar
- ✅ Bei Problemen: Ansprechpartner identifizieren
- ✅ Transparenz im Team

---

## 🔑 Passwort ändern

### Eigenes Passwort ändern:

1. **Im Dashboard** → "Einstellungen" klicken

2. **Scroll zu "Passwort ändern"**

3. **Formular ausfüllen**:
   - **Altes Passwort**: Dein aktuelles Passwort
   - **Neues Passwort**: Mindestens 6 Zeichen
   - **Bestätigen**: Neues Passwort nochmal

4. **"Passwort ändern" klicken**

⚠️ **Nach dem Ändern musst du dich mit dem neuen Passwort neu anmelden!**

### Passwort eines anderen Users ändern:

**Nur als Admin möglich:**

1. Gehe zu "Benutzerverwaltung"
2. User bearbeiten (Stift-Symbol)
3. Neues Passwort eingeben
4. "Aktualisieren" klicken

Der User kann sich dann mit dem neuen Passwort anmelden.

---

## 📝 Interne Notizen bei Reservierungen

### Notizen hinzufügen:

1. In der Reservierungs-Übersicht Reservierung öffnen
2. **"Notiz" Button** klicken (blau)
3. Text eingeben
4. OK klicken

**Notizen sind:**
- 📝 Nur für das Team sichtbar
- 💡 Perfekt für wichtige Hinweise
- 🔒 Nicht für Gäste sichtbar

**Beispiele für Notizen:**
- "Stammgast, mag Fensterplatz"
- "Allergiker: Keine Nüsse"
- "VIP - besonders freundlich behandeln"
- "Hat letzte Woche abgesagt, diesmal bestätigt"

---

## 🎯 Best Practices

### DO's ✅

**Bei User-Verwaltung:**
- Vergebe **sinnvolle Benutzernamen** (z.B. Vorname.Nachname)
- Wähle **eindeutige Kürzel** (Initialen des Namens)
- Setze **passende Rollen** (nicht alle als Admin!)
- Nutze **Urlaubs-Funktion** statt Löschen
- **Deaktiviere** statt löschen wenn unsicher

**Bei Passwörtern:**
- **Mindestens 8 Zeichen** empfohlen
- **Kombination** aus Buchstaben & Zahlen
- **Regelmäßig ändern** (alle 3-6 Monate)
- **Nicht teilen** mit anderen

**Bei Reservierungen:**
- **Notizen nutzen** für wichtige Infos
- **Zeitnah bearbeiten** (täglich checken)
- **Status immer setzen** (Bestätigt/Abgesagt)

### DON'Ts ❌

- ❌ **Nicht alle als Admin** anlegen (Sicherheit!)
- ❌ **Keine gleichen Kürzel** vergeben
- ❌ **Nicht eigenen Account löschen**
- ❌ **Keine zu kurzen Passwörter** (<6 Zeichen)
- ❌ **User nicht unnötig löschen** (besser deaktivieren)

---

## 🔍 Übersicht der Funktionen

### Benutzerverwaltung (`/admin/users`)

| Funktion | Symbol | Aktion |
|----------|--------|--------|
| Neuer User | ➕ | Erstellt neuen Benutzer |
| Bearbeiten | ✏️ | Ändert User-Daten |
| Deaktivieren | 🚫 | Sperrt User temporär |
| Aktivieren | ✅ | Reaktiviert User |
| Urlaub | 🏖️ | Setzt in Urlaub |
| Löschen | 🗑️ | Entfernt User endgültig |

### Reservierungen (`/admin/reservations`)

| Funktion | Symbol | Aktion |
|----------|--------|--------|
| Bestätigen | ✅ | Reservierung zusagen |
| Absagen | ❌ | Reservierung ablehnen |
| Notiz | 📝 | Interne Notiz hinzufügen |
| Löschen | 🗑️ | Reservierung entfernen |

### Einstellungen (`/admin/settings`)

| Bereich | Funktion |
|---------|----------|
| Profil | Name, E-Mail, Kürzel ändern |
| Passwort | Eigenes Passwort ändern |

---

## 🆘 Häufige Fragen

### Kann ich mich nicht anmelden?

**Mögliche Gründe:**
1. ❌ **Falsches Passwort** → Prüfe Schreibweise
2. 🏖️ **Im Urlaub** → Admin muss Urlaub beenden
3. 🚫 **Deaktiviert** → Admin muss dich aktivieren
4. 👤 **Falscher Benutzername** → Prüfe Groß-/Kleinschreibung

### Wie viele User kann ich anlegen?

**Unbegrenzt!** Es gibt keine Limits.

**Empfehlung:**
- Kleines Team (1-3 Personen): 2-3 User
- Mittleres Team (4-10 Personen): 5-8 User
- Großes Team (10+ Personen): 10-15 User

### Was passiert mit Reservierungen von gelöschten Usern?

Die Reservierungen **bleiben erhalten**!

Das **Kürzel** des gelöschten Users wird **weiter angezeigt**.

Beispiel:
- User "Max" (MM) hat 5 Reservierungen bestätigt
- Max wird gelöscht
- Die 5 Reservierungen zeigen weiter "Bearbeitet von: MM"

### Kann ein Staff-User zum Manager werden?

✅ **Ja!** Einfach:
1. User bearbeiten
2. Rolle auf "Manager" ändern
3. Speichern

Sofort hat er mehr Rechte!

### Was ist besser: Deaktivieren oder Urlaub?

**Urlaub** wenn:
- ✅ Zeitlich begrenzt (Urlaub, Krankheit)
- ✅ Automatische Reaktivierung gewünscht
- ✅ Datum bekannt

**Deaktivieren** wenn:
- ✅ Unbestimmte Dauer
- ✅ Manuelle Kontrolle gewünscht
- ✅ User soll vielleicht gar nicht mehr zurück

---

## 🔐 Sicherheits-Tipps

### Für Administratoren:

1. **Admin-Passwort sofort ändern**
   - Standard-Passwort ist unsicher!
   - Gehe zu Einstellungen → Passwort ändern

2. **Nicht alle als Admin**
   - Nur Inhaber/Geschäftsführung als Admin
   - Andere als Manager oder Staff

3. **Regelmäßig überprüfen**
   - Checke alle 1-2 Monate die User-Liste
   - Lösche/Deaktiviere nicht mehr benötigte User

4. **Passwörter nicht teilen**
   - Jeder User eigenes Passwort
   - Nicht mehrere Personen mit gleichem Login

### Für alle User:

1. **Passwort sicher halten**
   - Nicht aufschreiben
   - Nicht weitergeben
   - Regelmäßig ändern

2. **Nach Arbeit abmelden**
   - Logout nicht vergessen!
   - Besonders an gemeinsam genutzten PCs

3. **Verdächtige Aktivitäten melden**
   - Admin informieren bei Problemen

---

## 📞 Support

**Bei Problemen:**

1. Lies diese Anleitung nochmal
2. Prüfe ob User aktiv/nicht im Urlaub ist
3. Prüfe ob richtige Rolle gesetzt ist
4. Screenshot machen
5. Admin/Entwickler kontaktieren

---

**Viel Erfolg mit der Benutzerverwaltung! 👥**
