# Shell Runner

Sprachlern-Endless-Runner für **Tula’s Island**.

## Repository
Dieses Repository enthält ausschließlich **Shell Runner**. Andere Tula’s-Island-Spiele werden hier nicht bearbeitet.

## Stack
- Standalone HTML/CSS/JavaScript als stabile Runtime
- reproduzierbare Runtime-Enhancer unter `scripts/`
- Node.js Build-/Smoke-Tests
- mobile-first / iPhone-first
- GitHub Pages

## Aktueller Gameplay-Stand
- Boss nach **3 richtigen normalen Wörtern**
- Combo-Stufen und **Tula-Fieber**
- Revanche-Wörter nach Fehlern
- lokale Wortmeisterschaft
- Gold-/Risiko-Tore
- wählbare Helfer: Lumi, Milo, Nera
- 10 Bosse mit eigenen Mechaniken
- erweiterte Muscheln und Fassvarianten
- Boss-Schatzwahl mit temporären Run-Perks
- Streckenentscheidung nach jedem Boss
- offizielle Tula-Reaktionssprites und freigestellte Boss-Sprites

## Entwicklung
```bash
npm ci
npm run sync-runtime
npm test
npm run build
```

## Live
https://o-some.github.io/shell-runner/

## Migration
Quelle: `o-some/tulasisland/public/shell-runner/`

Verbindlicher Source-Commit:
`892f676fbcef77ab49373aef7865d60afba0ebb7`

`source.html` bleibt als unveränderte Migrationsquelle erhalten. Die aktive `index.html` wird reproduzierbar aus der Pipeline erzeugt.

Details: `HANDOFF.md` und `docs/MIGRATION_RECORD.md`.
