# Projekt
Shell Runner

# Zweck
Mobile-first Sprachlern-Endless-Runner für Tula’s Island.

# Aktuelle Version
v1.4.0-caf-boss-progression

# Framework
Standalone HTML/CSS/JavaScript mit reproduzierbarer Enhancer-Pipeline. `source.html` bleibt unveränderte Migrationsquelle.

# Plattformen
- iOS Safari
- Android Chrome
- Desktop Chrome/Safari soweit verfügbar

# Kernregeln
- Boss nach 10 **richtigen normalen** Wörtern; Fehler zählen nicht zum Bossfortschritt.
- Jeder Boss startet mit 10 HP; jedes richtige Boss-Wort zieht genau 1 HP ab.
- Boss-Sieg bei 0 HP. Nach 3 Boss-Fehlern endet der Encounter weiterhin ohne Verlust normaler Herzen.
- Swipe links/rechts bleibt primäre Gestensteuerung.
- Zusätzlich kann Tula durch Tippen/Klicken im unteren Spielfeld direkt in die entsprechende Spur bewegt werden.
- Pause maximal 2-mal pro Run; Pause liegt als gut erreichbarer Button oben rechts.
- Boss-Intro stoppt bis „Bosskampf starten“ und zeigt Fähigkeit + verständliche Erklärung vor dem Kampf.
- Die Bossleiste unten zeigt alle 10 Bosse, markiert aktuellen und nächsten Boss und ist nur informativ; sie verändert keinen Fortschritt.
- Tula-/Boss-Sprites, Wörter und Hauptaktionen dürfen sich auf Mobile nicht überdecken.
- Andere Spiele/Repositories bleiben unberührt.

# Gameplay-Erweiterung v1.4
- Normalabschnitt: 10 richtige Wörter bis zum nächsten Boss; der HUD-Fortschritt zeigt `x/10 BIS BOSS`.
- Bosskampf: 10 HP pro Boss; der gemeinsame HUD-Fortschritt wird während des Kampfes zur sichtbaren HP-Leiste mit Bossname und Rest-HP.
- Boss-Intro: kompakte mobile Fähigkeit-Karte mit Name und Erklärung der Mechanik sowie klarer 10-HP-Regel.
- Boss-Reihenfolge: horizontale, klick-/tippbare Leiste am unteren Rand mit allen 10 Bossen; `JETZT` und `NÄCHSTER` sind direkt markiert.
- Boss-Leiste ist ausdrücklich kein Level-Skip und kein Teleport; Tap/Klick öffnet nur Boss- und Fähigkeitsinfo.
- Pause: bisherige breite Bottom-Bar entfernt; kompakter Touch-Button oben rechts mit verbleibenden Pausen als Badge.
- Überarbeitete Bossmechaniken bleiben unterschiedlich, aber fair und lernorientiert:
  1. Pirat Kai – Fassregen mit geschützter Lesezeit.
  2. Kapitän Brax – angekündigter, verzögerter Tor-Tausch.
  3. Blackfinn – Schattenkopie auf einem falschen Tor; Text bleibt lesbar.
  4. Alt-Kapitän Roderick – Revancheprüfung mit einem früheren Fehlerwort.
  5. Piratenbaron Vargas – Muscheljagd mit wertvolleren Sammelobjekten zwischen Gefahren.
  6. Kapitän Ironhook – angekündigter Haken-Zug um eine Spur, nicht in jeder Runde.
  7. Admiral Thorne – angekündigter Seitenwind mit klarer Richtung.
  8. Kartenmeister Corvin – angekündigtes, verzögertes Kartenmischen, nicht in jeder Runde.
  9. Schattenfürst Azrak – Schattenphase auf falschen Toren ohne verdeckte Wörter.
  10. Piratenkönig Varkos – fünf HP-basierte Phasen: Fässer → Wind → Tor-Tausch → Schatten → Kartenmischen; Wechsel jeweils nach 2 verlorenen HP.
- Combo-Stufen: Muschel-Serie, Tula-Fieber, Goldene Welle, Insel-Legende.
- Tula-Fieber: zeitlich begrenzter x2-Punkte-Modus ab hoher Combo.
- Revanche-Wörter: falsch beantwortete normale Wörter kehren nach kurzer Verzögerung zurück.
- Wortmeisterschaft: Neu → Gesehen → Geübt → Sicher → Gemeistert; lokal auf dem Gerät gespeichert.
- Gold-/Risikoorunden mit höherer Belohnung, ohne das richtige Tor vorab zu verraten.
- Helferwahl vor dem Run: Lumi, Milo oder Nera.
- Goldener Kompass wirkt als gelegentlicher, verdienter Hinweis.
- Bossobjekte: Gold-, Schutz-, Zeit-, Combo- und Vargas-Muscheln sowie Roll-, Doppel-, Blindgänger- und Königsfässer.
- Bossobjekte bleiben visuell hinter den Worttoren, damit die Lernaufgabe Vorrang behält.
- Boss-Fässer starten später und fallen langsamer; pro Bossfrage schützt ein Lese-/Entscheidungsfenster vor frühen Fass-Treffern.
- Maximal zwei ungelöste Fass-Gefahren dürfen Tula gleichzeitig unter Druck setzen.
- Nach jedem Boss: Auswahl eines temporären Run-Perks und danach Streckenwahl (ruhig, Abenteuer, Schatz).
- Milo schützt einmal vor Herzverlust und zeigt trotzdem die korrekte Lösung.
- Tap-/Click-Steuerung erkennt nur kurze Eingaben im unteren Tula-Bereich; Swipes/Drags bleiben davon getrennt.

# Relevante Dateien
- `index.html` – materialisierte Runtime; nicht direkt als Quelle bearbeiten
- `source.html` – unveränderte Migrationsquelle
- `scripts/apply-boss-frequency.mjs`
- `scripts/apply-meta-gameplay.mjs`
- `scripts/apply-boss-unique-mechanics.mjs`
- `scripts/apply-post-boss-choices.mjs`
- `scripts/apply-release-polish.mjs`
- `scripts/apply-input-fairness.mjs`
- `scripts/apply-boss-progression-ui.mjs` – finaler v1.4-Enhancer
- `tests/static.test.mjs`
- `tests/runtime-syntax.test.mjs`
- `tests/release-polish.test.mjs`
- `tests/input-fairness.test.mjs`
- `tests/boss-progression-ui.test.mjs`
- `.github/workflows/pages.yml`
- `.masterbrain/game-design.yml`
- `.masterbrain/impact-scope.yml`
- `.masterbrain/bigbrain-snapshot.yml`

# CAF-Basis
- Chelonaki App Factory 1.2.0
- MasterBrain 4.6.1
- BigBrain 1.1.0
- Game-Module 96 / Playtest 97 / Release 98

# Aktueller v1.4 Rollback
- `backup/pre-boss-hp-roster-progression-2026-08-24`

# Frühere Rollbacks
- `backup/pre-caf-gameplay-expansion-2026-08-23`
- `backup/pre-caf-release-polish-2026-08-23`
- `backup/pre-bomb-tap-control-2026-08-23`
- `backup/pre-live-smoke-proof-2026-08-23`

# Deployment
- GitHub Pages: https://o-some.github.io/shell-runner/
- Workflow: `.github/workflows/pages.yml`
- Der Workflow materialisiert die Runtime, führt Tests und Build aus, deployed Pages und prüft danach die veröffentlichte Runtime auf die aktuelle Boss-Progression sowie die bestehende Fairness-/Tap-Control-Funktion.
- Nur ein erfolgreicher post-deploy Live-Smoke darf `docs/LAST_SUCCESSFUL_DEPLOY.md` als erfolgreiche Release-Evidence aktualisieren.

# Release-Evidence
`docs/LAST_SUCCESSFUL_DEPLOY.md` wird ausschließlich nach erfolgreichem Build, Deploy und Live-Smoke vom Workflow erzeugt. Ein technischer Live-Smoke ist kein physischer iPhone-/Android-Real-Device-Test.

# Do-not-touch
- kein Force-Push
- `source.html` bei normalen Gameplay-/UI-Arbeiten nicht ändern
- keine Änderungen an anderen Spiele-Repositories
- `o-some/tulasisland` nicht verändern oder alte Kopie entfernen, solange separate Migrationsfreigabe nicht abgeschlossen ist
