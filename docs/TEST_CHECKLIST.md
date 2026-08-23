# Test Checklist — Shell Runner v1.3 CAF Gameplay Expansion

## Allgemein
- [ ] Seite lädt / Reload funktioniert
- [ ] keine JS-Fehler
- [ ] keine 404-Assets
- [ ] Touch/Swipe funktioniert
- [ ] Desktop-Tastatur funktioniert
- [ ] `source.html` unverändert

## Normaler Run
- [ ] Spiel startet mit Helferwahl (Lumi/Milo/Nera)
- [ ] richtige/falsche Antwort funktionieren
- [ ] offizielle Tula-Reaktionssprites sichtbar
- [ ] Combo-Stufen wechseln korrekt
- [ ] Tula-Fieber startet ab hoher Combo und endet wieder
- [ ] Gold-/Risiko-Tor ist klar markiert und belohnt korrekt
- [ ] falsches normales Wort kehrt als Revanche-Wort zurück
- [ ] Wortmeisterschaft steigt/fällt korrekt und blockiert den Run nicht
- [ ] Fortschritt zählt nur richtige normale Wörter
- [ ] nach 3 richtigen normalen Wörtern erscheint der Boss
- [ ] Pause maximal 2-mal pro Run

## Helfer
- [ ] Lumi gibt gelegentlich einen dezenten Hinweis
- [ ] Milo blockiert genau einmal einen normalen Herzverlust
- [ ] Nera erhöht Muschelgewinn

## Boss allgemein
- [ ] Boss-Intro wartet auf „Bosskampf starten“
- [ ] korrekter Boss-Sprite für Level sichtbar
- [ ] Boss reagiert auf richtige/falsche Antwort
- [ ] Boss-Niederlage zieht keine normalen Herzen ab
- [ ] Boss-Sieg/-Niederlage verlangt „Weiter“
- [ ] Boss-Resultat überlagert keine Grafik/Texte

## Einzigartige Bossmechaniken
- [ ] Level 1 Pirat Kai — Fassregen
- [ ] Level 2 Kapitän Brax — Tor-Tausch
- [ ] Level 3 Blackfinn — Schattenkopie
- [ ] Level 4 Alt-Kapitän Roderick — Revancheprüfung
- [ ] Level 5 Piratenbaron Vargas — Muscheljagd
- [ ] Level 6 Kapitän Ironhook — Haken-Zug
- [ ] Level 7 Admiral Thorne — Seitenwind
- [ ] Level 8 Kartenmeister Corvin — Kartenmischen
- [ ] Level 9 Schattenfürst Azrak — Schattenphase
- [ ] Level 10 Piratenkönig Varkos — Mehrphasenfinale

## Bossobjekte
- [ ] normale / Gold- / Schutz- / Zeit- / Combo-Muschel
- [ ] Vargas-Muschel
- [ ] normales / Roll- / Doppel- / Blindgänger- / Königsfass
- [ ] gute Objekte goldenes Glühen
- [ ] gefährliche Objekte rotes Glühen
- [ ] Lunte/Wackeln/Explosion funktionieren
- [ ] Schutzmuschel/Schutzschild blockiert korrekt

## Nach dem Boss
- [ ] Schatzwahl zeigt drei Run-Perks
- [ ] gewählter Perk wirkt im weiteren Run
- [ ] danach Streckenwahl erscheint
- [ ] Ruhiger Pfad: langsamer
- [ ] Abenteuerpfad: mehr Punkte / schneller
- [ ] Schatzpfad: mehr Beute / mehr Goldtore
- [ ] Pause kann Auswahlmodal nicht umgehen
- [ ] erst danach startet der nächste Abschnitt

## Geräte / Visual QA
- [ ] 375×667
- [ ] 390×844
- [ ] 430×932
- [ ] Desktop
- [ ] keine Überlagerung von HUD, Wörtern, Tula, Boss, Objekten oder Modals
- [ ] keine unnötige vertikale Scrollpflicht im aktiven Spiel

## Release
- [ ] `npm run sync-runtime`
- [ ] `npm test`
- [ ] `npm run build`
- [ ] GitHub Pages Deploy erfolgreich
- [ ] Live-URL HTTP 200
- [ ] Live Start + richtige/falsche Antwort geprüft
- [ ] Live Boss erreichbar und Bossmechanik sichtbar
- [ ] fehlende reale Geräteprüfung ehrlich markiert
