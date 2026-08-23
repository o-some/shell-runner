# Projekt
Shell Runner

# Zweck
Mobile-first Sprachlern-Endless-Runner für Tula’s Island.

# Aktuelle Version
v1.3.0-caf-gameplay-expansion

# Framework
Standalone HTML/CSS/JavaScript mit reproduzierbarer Enhancer-Pipeline. `source.html` bleibt unveränderte Migrationsquelle.

# Plattformen
- iOS Safari
- Android Chrome
- Desktop Chrome/Safari soweit verfügbar

# Kernregeln
- Boss nach 3 **richtigen normalen** Wörtern; Fehler zählen nicht zum Bossfortschritt.
- Swipe links/rechts ist primäre Steuerung.
- Pause maximal 2-mal pro Run.
- Boss-Intro stoppt bis „Bosskampf starten“.
- Normale Leben bleiben bei Boss-Niederlage erhalten.
- Tula-/Boss-Sprites, Wörter und Hauptaktionen dürfen sich auf Mobile nicht überdecken.
- Andere Spiele/Repositories bleiben unberührt.

# Gameplay-Erweiterung v1.3
- Combo-Stufen: Muschel-Serie, Tula-Fieber, Goldene Welle, Insel-Legende.
- Tula-Fieber: zeitlich begrenzter x2-Punkte-Modus ab hoher Combo.
- Revanche-Wörter: falsch beantwortete normale Wörter kehren nach kurzer Verzögerung zurück.
- Wortmeisterschaft: Neu → Gesehen → Geübt → Sicher → Gemeistert; lokal auf dem Gerät gespeichert.
- Risiko-/Goldtore mit höherer Belohnung und etwas kürzerem Timing.
- Helferwahl vor dem Run: Lumi, Milo oder Nera.
- 10 einzigartige Bossmechaniken: Fassregen, Tor-Tausch, Schattenkopie, Revancheprüfung, Muscheljagd, Haken-Zug, Seitenwind, Kartenmischen, Schattenphase und Varkos-Mehrphasenfinale.
- Bossobjekte: Gold-, Schutz-, Zeit-, Combo- und Vargas-Muscheln sowie Roll-, Doppel-, Blindgänger- und Königsfässer.
- Nach jedem Boss: Auswahl eines temporären Run-Perks und danach Streckenwahl (ruhig, Abenteuer, Schatz).

# Relevante Dateien
- `index.html` – materialisierte Runtime
- `source.html` – unveränderte Migrationsquelle
- `scripts/apply-meta-gameplay.mjs`
- `scripts/apply-boss-unique-mechanics.mjs`
- `scripts/apply-post-boss-choices.mjs`
- `tests/static.test.mjs`
- `.masterbrain/game-design.yml`
- `.masterbrain/impact-scope.yml`

# CAF-Basis
- Chelonaki App Factory 1.1.0
- MasterBrain 4.6.1
- BigBrain 1.1.0
- Game-Module 96 / Playtest 97 / Release 98

# Rollback
`backup/pre-caf-gameplay-expansion-2026-08-23`

# Deployment
- GitHub Pages: https://o-some.github.io/shell-runner/
- Workflow: `.github/workflows/pages.yml`

# Release-Evidence
Finale Runtime-/Live-SHA wird nach dem CAF-Release-Smoke in `.masterbrain/game-quality.yml` dokumentiert.

# Do-not-touch
- kein Force-Push
- keine Änderungen an anderen Spiele-Repositories
- `o-some/tulasisland` nicht verändern oder alte Kopie entfernen, solange separate Migrationsfreigabe nicht abgeschlossen ist
