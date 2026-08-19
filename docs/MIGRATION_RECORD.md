# Migration Record — Shell Runner

Source Repo: `o-some/tulasisland`

Source Path: `public/shell-runner/`

Source Commit: `892f676fbcef77ab49373aef7865d60afba0ebb7`

Source Backup Branch: `backup/pre-extraction-shell-runner-2026-08-19`

Target Repo: `o-some/shell-runner`

Target Initial Commit before migration: `9ef0db94d30fa526c39ceca89ed3be8b56ef2b06`

Target Rollback Branch: `migration/source-892f676`

Migration Date: 2026-08-19

## Strategy
- Nie zuerst löschen.
- `source.html` wird unverändert vom dokumentierten Source-Commit materialisiert.
- Runtime-Assets werden aus demselben unveränderlichen Source-Commit in dieses Repo kopiert.
- `index.html` erhält ausschließlich lokale Runtime-Pfade; die eingebettete Captain-Shelldon-Grafik wird als lokales WebP extrahiert.
- Übergangsstruktur bleibt bewusst Standalone HTML; Refactoring folgt erst nach stabiler Migration.

## Assets
Source-Spielordner: 1 HTML-Datei.

Abhängige Runtime-Assets: 3 externe Tula-/Hintergrund-Dateien + 1 im HTML eingebettete Bossgrafik.

Transformierte Assets: eingebettete Captain-Shelldon-WebP → `assets/bosses/captain-shelldon.webp` (inhaltlich identische Base64-Nutzlast).

## Tests
- Build: PENDING
- GitHub Actions: PENDING
- GitHub Pages: PENDING
- iPhone Safari / Mobile viewport: PENDING
- Android Chrome / Mobile viewport: PENDING
- Desktop Chromium: PENDING
- Gameplay: PENDING
- Assets/404: PENDING

## Live URL
https://o-some.github.io/shell-runner/

## Removal Approval
`REMOVE_OLD_COPY = FORBIDDEN`

Die Alt-Kopie in `tulasisland` darf erst nach vollständig bestandener Freigabe-Checkliste entfernt werden.
