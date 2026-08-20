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
- [ ] bei richtiger Antwort bewegen sich Tulas Arme/Flipper sichtbar jubelnd nach oben/außen
- [ ] falsche Antwort reagiert korrekt
- [ ] bei falscher Antwort sinken/wackeln Tulas Arme/Flipper passend zum Rückstoß
- [ ] Armbewegung bleibt optisch am Körper verankert und erzeugt keine störenden Doppelarme
- [ ] Leben sinken korrekt
- [ ] Combo/Punkte funktionieren
- [ ] Pause maximal 2-mal pro Run
- [ ] Pause/Weiter stellt Ablauf korrekt wieder her
- [ ] Boss-Intro erscheint
- [ ] Boss wartet bis „Bosskampf starten“
- [ ] Bossfrage funktioniert
- [ ] Armreaktionen funktionieren auch bei Bossfragen
- [ ] Boss-Sieg funktioniert
- [ ] Boss-Niederlage funktioniert ohne normale Leben abzuziehen
- [ ] Rückkehr aus Boss in normalen Run funktioniert
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
