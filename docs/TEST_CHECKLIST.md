# Test Checklist — Shell Runner

## Allgemein
- [ ] Seite lädt
- [ ] Reload funktioniert
- [ ] keine weiße/blaue leere Seite
- [ ] keine JS-Fehler
- [ ] keine 404-Assets
- [ ] Touch/Swipe funktioniert
- [ ] Desktop-Tastatur/Maus funktioniert

## Gameplay
- [ ] Spiel startet
- [ ] links/rechts Spurwahl funktioniert
- [ ] richtige Antwort reagiert korrekt
- [ ] bei richtiger Antwort erscheint ein kleines Feuerwerk mit Gold-/Türkis-/Weiß-Partikeln
- [ ] keine künstlichen Tula-Arm-/Kreis-Overlays sichtbar
- [ ] falsche Antwort reagiert korrekt
- [ ] falsche Antwort zeigt Rückstoß/Shake und dezente Fehlerfragmente
- [ ] Leben sinken korrekt
- [ ] Combo/Punkte funktionieren
- [ ] Pause maximal 2-mal pro Run
- [ ] Pause/Weiter stellt Ablauf korrekt wieder her
- [ ] Boss-Intro erscheint
- [ ] Boss wartet bis „Bosskampf starten“
- [ ] Bossfrage funktioniert
- [ ] Boss-Sieg funktioniert
- [ ] nach Boss-Sieg erscheint „Du hast Captain Shelldon besiegt!“
- [ ] Boss-Sieg zeigt Bonus und kleines Feuerwerk
- [ ] Boss-Sieg läuft erst nach Klick auf „Weiter“ weiter
- [ ] Boss-Niederlage funktioniert ohne normale Leben abzuziehen
- [ ] Boss-Niederlage zeigt positive Nachricht „Ich ziehe dir keine Herzen ab …“
- [ ] Boss-Niederlage läuft erst nach Klick auf „Weiter“ weiter
- [ ] Rückkehr aus Boss in normalen Run funktioniert
- [ ] Pause-Button steht nach Boss-Ergebnis wieder korrekt auf „Pause (x)“
- [ ] Game Over funktioniert
- [ ] Neustart funktioniert
- [ ] Fortschrittsanzeige funktioniert

## Assets
- [ ] Hintergrund sichtbar
- [ ] Tula-Profil sichtbar
- [ ] Tula-Runner sichtbar
- [ ] Captain-Shelldon-Bild im Intro sichtbar
- [ ] Bossbild in Arena sichtbar
- [ ] kritische Assets HTTP 200
- [ ] keine Referenz auf `raw.githubusercontent.com/o-some/tulasisland` in Runtime

## Geräte
- [ ] iPhone Safari / iPhone-Viewport
- [ ] Android Chrome / Android-Viewport
- [ ] Desktop Chrome/Chromium
- [ ] Desktop Safari, wenn verfügbar oder begründet ausstehend

## Freigabe
- [ ] GitHub Actions grün
- [ ] GitHub Pages HTTP 200
- [ ] Live-URL getestet
- [ ] letzte getestete Commit-SHA in `HANDOFF.md` dokumentiert
- [ ] Quell-/Zielbestand verglichen
- [ ] `REMOVE_OLD_COPY = APPROVED`
