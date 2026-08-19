import fs from 'node:fs/promises';
import path from 'node:path';

const SOURCE_REPO = 'o-some/tulasisland';
const SOURCE_COMMIT = '892f676fbcef77ab49373aef7865d60afba0ebb7';
const RAW = `https://raw.githubusercontent.com/${SOURCE_REPO}/${SOURCE_COMMIT}`;

const files = [
  ['assets/creative/world_jungle_trail.webp', 'assets/backgrounds/world-jungle-trail.webp'],
  ['assets/creative/tula_profile.webp', 'assets/characters/tula-profile.webp'],
  ['assets/creative/tula_neutral_front.webp', 'assets/characters/tula-neutral-front.webp']
];

async function fetchOk(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Fetch failed ${res.status}: ${url}`);
  return res;
}

await fs.mkdir('assets/backgrounds', { recursive: true });
await fs.mkdir('assets/characters', { recursive: true });
await fs.mkdir('assets/bosses', { recursive: true });

const sourceUrl = `${RAW}/public/shell-runner/index.html`;
const source = await (await fetchOk(sourceUrl)).text();
await fs.writeFile('source.html', source, 'utf8');

for (const [src, dest] of files) {
  const buf = Buffer.from(await (await fetchOk(`${RAW}/${src}`)).arrayBuffer());
  await fs.writeFile(dest, buf);
}

let runtime = source
  .replaceAll('https://raw.githubusercontent.com/o-some/tulasisland/main/assets/creative/world_jungle_trail.webp', './assets/backgrounds/world-jungle-trail.webp')
  .replaceAll('https://raw.githubusercontent.com/o-some/tulasisland/main/assets/creative/tula_profile.webp', './assets/characters/tula-profile.webp')
  .replaceAll('https://raw.githubusercontent.com/o-some/tulasisland/main/assets/creative/tula_neutral_front.webp', './assets/characters/tula-neutral-front.webp');

const bossMatch = runtime.match(/const BOSS_IMG='data:image\/webp;base64,([^']+)'/);
if (!bossMatch) throw new Error('Embedded boss image not found in source.html');
await fs.writeFile('assets/bosses/captain-shelldon.webp', Buffer.from(bossMatch[1], 'base64'));
runtime = runtime.replace(bossMatch[0], "const BOSS_IMG='./assets/bosses/captain-shelldon.webp'");

if (runtime.includes('raw.githubusercontent.com/o-some/tulasisland')) {
  throw new Error('Runtime still contains tulasisland raw asset dependencies');
}

runtime = runtime.replace('<title>Shell Runner · Tula\'s Island</title>', '<title>Shell Runner · Tula\'s Island</title>\n<meta name="migration-source" content="o-some/tulasisland@892f676fbcef77ab49373aef7865d60afba0ebb7">');
await fs.writeFile('index.html', runtime, 'utf8');
console.log('Materialized Shell Runner from', SOURCE_COMMIT);
