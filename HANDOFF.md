# Projekt
Shell Runner

# Zweck
Mobile-first Sprachlern-Endless-Runner für Tula’s Island.

# Aktuelle Version
v1.0.0-migrating

# Letzte getestete Commit-SHA
PENDING_FINAL_TEST_SHA

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

# Aktueller Funktionsstand
- Endless-Runner-Wortauswahl
- richtige/falsche Antwort
- Leben, Combo, Punkte, Muscheln, XP
- Swipe-/Keyboard-Steuerung
- Pause mit 2 Nutzungen pro Run
- Themen-Boss nach regulären Fragen
- Boss-Sieg/Niederlage
- Neustart nach Game Over

# Bekannte Fehler
Keine freigegebenen bekannten Fehler. Finale Live-/Geräteabnahme steht während der Migration noch aus.

# Nächste Schritte
1. Materialisierung von Source + Runtime-Assets durch Workflow.
2. Build/Smoke-Tests.
3. GitHub Pages + Live-Test.
4. Mobile/Desktop-Regressionsprüfung.
5. Dokumentation der final getesteten SHA.
6. Erst danach Freigabeentscheidung zur Entfernung der Alt-Kopie in `tulasisland`.

# Wichtige Dateien
- `index.html` – aktive Runtime-Version (wird materialisiert)
- `source.html` – unveränderte Source-Sicherung vom Source-Commit
- `scripts/materialize.mjs` – reproduzierbare Übernahme und Pfadanpassung
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
PENDING_FINAL_TEST

# Wichtige Regeln
- Keine funktionierende Funktion ohne Anweisung entfernen.
- Vor jedem Write aktuellen `main` neu lesen.
- Kein Force-Push.
- Mobile immer mitprüfen.
- Vor großen Änderungen Sicherungs-/Rollback-Punkt setzen.
