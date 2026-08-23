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
- Swipe links/rechts bleibt primäre Gestensteuerung.
- Zusätzlich kann Tula durch Tippen/Klicken im unteren Spielfeld direkt in die entsprechende Spur bewegt werden.
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
- Gold-/Risikoorunden mit höherer Belohnung, ohne das richtige Tor vorab zu verraten.
- Helferwahl vor dem Run: Lumi, Milo oder Nera.
- Goldener Kompass wirkt als gelegentlicher, verdienter Hinweis.
- 10 einzigartige Bossmechaniken: Fassregen, Tor-Tausch, Schattenkopie, Revancheprüfung, Muscheljagd, Haken-Zug, Seitenwind, Kartenmischen, Schattenphase und Varkos-Mehrphasenfinale.
- Bossobjekte: Gold-, Schutz-, Zeit-, Combo- und Vargas-Muscheln sowie Roll-, Doppel-, Blindgänger- und Königsfässer.
- Bossobjekte bleiben visuell hinter den Worttoren, damit die Lernaufgabe Vorrang behält.
- Boss-Fässer starten später und fallen langsamer; pro Bossfrage schützt ein Lese-/Entscheidungsfenster vor frühen Fass-Treffern.
- Maximal zwei ungelöste Fass-Gefahren dürfen Tula gleichzeitig unter Druck setzen.
- Nach jedem Boss: Auswahl eines temporären Run-Perks und danach Streckenwahl (ruhig, Abenteuer, Schatz).
- Milo schützt einmal vor Herzverlust und zeigt trotzdem die korrekte Lösung.
- Tap-/Click-Steuerung erkennt nur kurze Eingaben im unteren Tula-Bereich; Swipes/Drags bleiben davon getrennt.

# Relevante Dateien
- `index.html` – materialisierte Runtime
- `source.html` – unveränderte Migrationsquelle
- `scripts/apply-meta-gameplay.mjs`
- `scripts/apply-boss-unique-mechanics.mjs`
- `scripts/apply-post-boss-choices.mjs`
- `scripts/apply-release-polish.mjs`
- `scripts/apply-input-fairness.mjs`
- `tests/static.test.mjs`
- `tests/runtime-syntax.test.mjs`
- `tests/release-polish.test.mjs`
- `tests/input-fairness.test.mjs`
- `.masterbrain/game-design.yml`
- `.masterbrain/impact-scope.yml`

# CAF-Basis
- Chelonaki App Factory 1.1.0
- MasterBrain 4.6.1
- BigBrain 1.1.0
- Game-Module 96 / Playtest 97 / Release 98

# Rollback
- `backup/pre-caf-gameplay-expansion-2026-08-23`
- `backup/pre-caf-release-polish-2026-08-23`
- `backup/pre-bomb-tap-control-2026-08-23`

# Deployment
- GitHub Pages: https://o-some.github.io/shell-runner/
- Workflow: `.github/workflows/pages.yml`

# Release-Evidence
Finale Runtime-/Live-SHA wird nach dem Workflow-/Live-Smoke dokumentiert.

# Do-not-touch
- kein Force-Push
- keine Änderungen an anderen Spiele-Repositories
- `o-some/tulasisland` nicht verändern oder alte Kopie entfernen, solange separate Migrationsfreigabe nicht abgeschlossen ist
