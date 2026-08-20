# Projekt
Shell Runner

# Zweck
Mobile-first Sprachlern-Endless-Runner für Tula’s Island.

# Aktuelle Version
v1.1.0-arm-reactions

# Letzte getestete Commit-SHA
PENDING_LIVE_TEST_AFTER_ARM_REACTIONS

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
- Trefferfeedback soll klar, hochwertig und kurz sein: korrekt = Sprung/Glow/Partikel, falsch = Rückstoß/Shake/roter Impact.
- Bei richtig und falsch bewegen sich Tulas Arme/Flipper zusätzlich sichtbar: positiv nach oben jubelnd, negativ nach unten hängend/taumelnd.

# Aktueller Funktionsstand
- Endless-Runner-Wortauswahl
- richtige/falsche Antwort
- Leben, Combo, Punkte, Muscheln, XP
- Swipe-/Keyboard-Steuerung
- Pause mit 2 Nutzungen pro Run
- Themen-Boss nach regulären Fragen
- Boss-Sieg/Niederlage
- Neustart nach Game Over
- erweitertes Trefferfeedback bei richtiger Antwort: Tula-Sprung, grüner Glow, Gate-Pulse, Muschel-/Stern-Partikel, kurze Haptik sofern vom Gerät unterstützt
- erweitertes Trefferfeedback bei falscher Antwort: Tula-Rückstoß, Taumeln/Shake, roter Impact, Gate-Fehleranimation, Haptik sofern unterstützt
- neue Arm-/Flipper-Reaktion bei richtig: beide Arme schwingen deutlich nach oben und außen
- neue Arm-/Flipper-Reaktion bei falsch: beide Arme sinken ab und wackeln kurz mit dem Rückstoß
- `prefers-reduced-motion` wird für Treffer- und Armreaktionen berücksichtigt

# Bekannte Fehler
Keine freigegebenen bekannten Fehler. Live-/Geräteabnahme der neuen Armreaktionen steht noch aus.

# Nächste Schritte
1. Feature-Branch mit `main` fast-forwarden, falls `main` unverändert ist.
2. Materialisierung + modularen Arm-Reaction-Schritt durch Workflow prüfen.
3. Smoke-Test und Build prüfen.
4. GitHub Pages live testen.
5. Mobile/Desktop-Regressionsprüfung inkl. richtig/falsch Treffer- und Armfeedback.
6. Letzte getestete SHA dokumentieren.
7. Alte Shell-Runner-Kopie in `tulasisland` weiterhin nicht löschen, solange das Migrations-Freigabe-Gate nicht vollständig bestanden ist.

# Wichtige Dateien
- `index.html` – aktive Runtime-Version
- `source.html` – unveränderte Source-Sicherung vom Source-Commit
- `scripts/materialize.mjs` – reproduzierbare Übernahme, Pfadanpassung und Basis-Trefferfeedback
- `scripts/apply-arm-reactions.mjs` – modulare positive/negative Arm-/Flipperanimationen für Tula
- `scripts/build.mjs` – Build nach `dist/`
- `tests/static.test.mjs` – Smoke-/Integritätschecks inkl. Treffer- und Armfeedback
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
PENDING_LIVE_TEST_AFTER_ARM_REACTIONS

# Wichtige Regeln
- Keine funktionierende Funktion ohne Anweisung entfernen.
- Vor jedem Write aktuellen `main` neu lesen.
- Kein Force-Push.
- Mobile immer mitprüfen.
- Vor großen Änderungen Sicherungs-/Rollback-Punkt setzen.
