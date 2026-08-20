# Changelog

## v1.1.0-arm-reactions — 2026-08-20
- Positive Trefferreaktion erweitert: Tulas Arme/Flipper schwingen beim richtigen Wort sichtbar nach oben und außen.
- Negative Trefferreaktion erweitert: Arme/Flipper sinken beim falschen Wort ab und wackeln passend zum Rückstoß.
- Armreaktionen sind an die bestehenden `correct-hit`/`wrong-hit` Zustände gekoppelt und benötigen keine zusätzliche Gameplay-Logik.
- `prefers-reduced-motion` wird berücksichtigt.
- Armreaktionen als eigenes Runtime-Modul `scripts/apply-arm-reactions.mjs` umgesetzt.
- CI führt jetzt `npm run sync-runtime` aus: Materialisierung + modulare Runtime-Erweiterungen.
- Smoke-Test prüft positive und negative Armreaktionen explizit.

## v1.0.1-hit-feedback — 2026-08-20
- Trefferfeedback bei richtigen Antworten mit Sprung, Glow, Gate-Pulse, Partikeln und Haptik erweitert.
- Trefferfeedback bei falschen Antworten mit Rückstoß, Shake, rotem Impact und Haptik erweitert.

## v1.0.0-migrating — 2026-08-19
- Migration von `o-some/tulasisland/public/shell-runner/` in eigenes Repository begonnen.
- Immutable Source-SHA dokumentiert.
- Rollback-Punkte gesetzt.
- Reproduzierbare Materialisierung lokaler Runtime-Assets vorbereitet.
- Build-, Smoke-Test- und GitHub-Pages-Workflow angelegt.
