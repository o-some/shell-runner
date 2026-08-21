import fs from 'node:fs';

const bossAssets = [
  'assets/bosses/boss-01-pirat-kai.png',
  'assets/bosses/boss-02-kapitaen-brax.png',
  'assets/bosses/boss-03-blackfinn.png',
  'assets/bosses/boss-04-alt-kapitaen-roderick.png',
  'assets/bosses/boss-05-piratenbaron-vargas.png',
  'assets/bosses/boss-06-kapitaen-ironhook.png',
  'assets/bosses/boss-07-admiral-thorne.png',
  'assets/bosses/boss-08-kartenmeister-corvin.png',
  'assets/bosses/boss-09-schattenfuerst-azrak.png',
  'assets/bosses/boss-10-piratenkoenig-varkos.png'
];

const required = [
  'index.html',
  'source.html',
  'assets/backgrounds/world-jungle-trail.webp',
  'assets/characters/tula-profile.webp',
  'assets/characters/tula-neutral-front.webp',
  'assets/bosses/captain-shelldon.webp',
  ...bossAssets,
  'HANDOFF.md',
  'docs/MIGRATION_RECORD.md',
  'docs/ASSET_MANIFEST.md',
  'docs/TEST_CHECKLIST.md'
];

for (const file of required) {
  if (!fs.existsSync(file)) throw new Error(`Missing required file: ${file}`);
}

for (const file of bossAssets) {
  const data = fs.readFileSync(file);
  const png = data.length > 8 &&
    data[0] === 0x89 && data[1] === 0x50 && data[2] === 0x4e && data[3] === 0x47 &&
    data[4] === 0x0d && data[5] === 0x0a && data[6] === 0x1a && data[7] === 0x0a;
  if (!png) throw new Error(`Invalid PNG boss asset: ${file}`);
}

const html = fs.readFileSync('index.html', 'utf8');
const source = fs.readFileSync('source.html', 'utf8');

if (!html.includes('Shell Runner')) throw new Error('Shell Runner title missing');
if (!html.includes('Bosskampf starten')) throw new Error('Boss start interaction missing');
if (!html.includes('pauseLeft:2')) throw new Error('Pause limit of 2 missing');
if (!html.includes('touchstart') || !html.includes('touchend')) throw new Error('Touch/swipe handlers missing');
if (!html.includes('playHitFx') || !html.includes('tulaCorrectHit') || !html.includes('tulaWrongHit')) throw new Error('Enhanced hit feedback missing');
if (!html.includes('navigator.vibrate')) throw new Error('Mobile haptic feedback missing');
if (!html.includes('firework-particle') || !html.includes('miniFirework')) throw new Error('Particle fireworks missing');
if (html.includes('tula-arm')) throw new Error('Deprecated fake Tula arm overlays still present');
if (!html.includes('id="bossResult"') || !html.includes('id="bossContinue"')) throw new Error('Boss result confirmation modal missing');
if (!html.includes('Ich ziehe dir keine Herzen ab')) throw new Error('Positive boss-loss/no-heart message missing');
if (!html.includes('runBossResultFireworks') || !html.includes('continueAfterBoss')) throw new Error('Boss result flow/fireworks missing');
if (!html.includes('Shell Runner premium boss cutout v1.3')) throw new Error('Premium boss styles missing');
if (!html.includes('Shell Runner Dropbox boss sprites v1.4')) throw new Error('Dropbox boss sprite presentation missing');
if (!html.includes('const BOSS_PROFILES=[') || !html.includes('currentBoss=()=>')) throw new Error('Dynamic boss profile progression missing');
if (!html.includes('Pirat Kai') || !html.includes('Piratenkönig Varkos')) throw new Error('Expected boss roster missing');
for (const file of bossAssets) {
  if (!html.includes('./' + file)) throw new Error(`Runtime does not reference boss asset: ${file}`);
}
if (html.includes('id="bossResultPortrait" src="data:image')) throw new Error('Boss result still uses embedded/broken data URI');
if (html.includes('raw.githubusercontent.com/o-some/tulasisland')) throw new Error('Cross-repo runtime asset dependency remains');
if (!source.includes('raw.githubusercontent.com/o-some/tulasisland')) throw new Error('source.html does not look like untouched source snapshot');

console.log('Static migration/gameplay smoke checks: PASS');
