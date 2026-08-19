# Asset Manifest — Shell Runner

Source of Truth der Original-/Master-Assets: Dropbox gemäß Migrationsstandard.

Runtime-Quelle dieser Migration: `o-some/tulasisland@892f676fbcef77ab49373aef7865d60afba0ebb7`.

| Asset | Quelle | Ziel im Shell-Runner-Repo | Verwendung | Status |
|---|---|---|---|---|
| Jungle Trail | `assets/creative/world_jungle_trail.webp` | `assets/backgrounds/world-jungle-trail.webp` | Spielhintergrund | PENDING_MATERIALIZE |
| Tula Profil | `assets/creative/tula_profile.webp` | `assets/characters/tula-profile.webp` | Header/Brand | PENDING_MATERIALIZE |
| Tula neutral | `assets/creative/tula_neutral_front.webp` | `assets/characters/tula-neutral-front.webp` | Runner | PENDING_MATERIALIZE |
| Captain Shelldon | eingebettetes `BOSS_IMG` in Source-HTML | `assets/bosses/captain-shelldon.webp` | Boss-Intro/Arena | PENDING_MATERIALIZE |

Nach erfolgreicher Materialisierung müssen alle Zielassets lokal existieren und GitHub Pages HTTP 200 liefern. Keine Runtime-Abhängigkeit zu `tulasisland` ist nach Freigabe zulässig.
