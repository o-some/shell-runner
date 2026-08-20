# Projekt
Shell Runner

# Zweck
Mobile-first Sprachlern-Endless-Runner für Tula’s Island.

# Aktuelle Version
v1.2.0-fireworks-boss-result

# Letzte getestete Commit-SHA
PENDING_LIVE_TEST_AFTER_BOSS_RESULT_POLISH

# Framework
Standalone HTML/CSS/JavaScript als stabile Übergangsstruktur. Refactoring nach Astro ist erst nach stabil abgeschlossener Migration vorgesehen.

# Plattformen
- iOS Safari
- Android Chrome
- Desktop Chrome
- Desktop Safari, wenn verfügbar

# Designregeln
- Tula’s-Island-Look mit dunklem Ozeanblau, Gold und Türkis.
- Wortwahl muss auf Mobile klar lesbar bleiben.
- Swipe links/rechts ist primäre Steuerung.
- Pause maximal 2-mal pro Run.
- Boss-Intro stoppt das Spiel bis „Bosskampf starten“ gedrückt wird.
- Trefferfeedback bleibt kurz und klar.
- Keine künstlichen Tula-Arm-/Kreis-Overlays verwenden.
- Positive Treffer nutzen kleine Feuerwerks-Partikel in Gold/Türkis/Weiß.

# Aktueller Funktionsstand
- Endless-Runner-Wortauswahl
- richtige/falsche Antwort
- Leben, Combo, Punkte, Muscheln, XP
- Swipe-/Keyboard-Steuerung
- Pause mit 2 Nutzungen pro Run
- Themen-Boss nach regulären Fragen
- Boss-Sieg/Niederlage
- Neustart nach Game Over
- korrekt: Tula-Sprung, Glow, Gate-Pulse, kleines Feuerwerk mit Partikeln, kurze Haptik sofern unterstützt
- falsch: Tula-Rückstoß, Shake, roter Impact, kleine Fehlerfragmente, Haptik sofern unterstützt
- keine künstlichen zusätzlichen Arme/Kreise mehr
- nach Boss-Sieg erscheint eine Bestätigung „Du hast Captain Shelldon besiegt!“ mit Boss-Bonus und „Weiter“-Button
- nach Boss-Niederlage erscheint eine positive Meldung mit Hinweis, dass keine Herzen abgezogen werden; Weiterlaufen erst nach Klick auf „Weiter“
- Boss-Ergebnis blockiert Pause/Neustart bis zur Bestätigung
- `prefers-reduced-motion` wird für Effekte berücksichtigt

# Bekannte Fehler
Keine freigegebenen bekannten Fehler. Live-/Geräteabnahme der neuen Feuerwerks- und Boss-Ergebnislogik steht noch aus.

# Nächste Schritte
1. Feature-Branch nur fast-forward nach `main`, wenn `main` unverändert ist.
2. Materialisierung + Gameplay-Polish durch Workflow prüfen.
3. Smoke-Test und Build prüfen.
4. GitHub Pages live testen.
5. Mobile/Desktop-Regressionsprüfung inkl. richtig/falsch und Boss-Sieg/Boss-Niederlage.
6. Letzte getestete SHA dokumentieren.
7. Alte Shell-Runner-Kopie in `tulasisland` weiterhin nicht löschen, solange das Migrations-Freigabe-Gate nicht vollständig bestanden ist.

# Wichtige Dateien
- `index.html` – aktive Runtime-Version, wird reproduzierbar erzeugt
- `source.html` – unveränderte Source-Sicherung vom Source-Commit
- `scripts/materialize.mjs` – reproduzierbare Übernahme und Pfadanpassung
- `scripts/apply-game-polish.mjs` – Feuerwerks-Partikel und Boss-Ergebnislogik
- `scripts/fix-polish.mjs` – kleine finale Runtime-CSS-Korrektur
- `scripts/build.mjs` – Build nach `dist/`
- `tests/static.test.mjs` – Smoke-/Integritätschecks
- `docs/MIGRATION_RECORD.md`
- `docs/ASSET_MANIFEST.md`
- `docs/TEST_CHECKLIST.md`

# Do-not-touch-Bereiche
- Keine Änderungen an anderen Spiele-Repositories.
- `o-some/tulasisland` während der Verifikation nicht löschen/verändern, außer später explizit für die freigegebene Shell-Runner-Entfernung.
- Kein Force-Push.

# Assets
Quelle: `o-some/tulasisland` am Source-Commit `892f676fbcef77ab49373aef7865d60afba0ebb7`.
Runtime-Zielpfade siehe `docs/ASSET_MANIFEST.md`.

# Deployment
- GitHub Pages URL: https://o-some.github.io/shell-runner/
- Workflow: `.github/workflows/pages.yml`

# Letzter erfolgreicher Test
PENDING_LIVE_TEST_AFTER_BOSS_RESULT_POLISH

# Wichtige Regeln
- Keine funktionierende Funktion ohne Anweisung entfernen.
- Vor jedem Write aktuellen `main` neu lesen.
- Kein Force-Push.
- Mobile immer mitprüfen.
- Vor großen Änderungen Sicherungs-/Rollback-Punkt setzen.
