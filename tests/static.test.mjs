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

const reactionAssets = [
  'assets/characters/tula-celebrating.webp',
  'assets/characters/tula-surprised.webp'
];

const required = [
  'index.html',
  'source.html',
  'assets/backgrounds/world-jungle-trail.webp',
  'assets/characters/tula-profile.webp',
  'assets/characters/tula-neutral-front.webp',
  ...reactionAssets,
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

for (const file of reactionAssets) {
  const data = fs.readFileSync(file);
  const webp = data.length > 12 && data.toString('ascii', 0, 4) === 'RIFF' && data.toString('ascii', 8, 12) === 'WEBP';
  if (!webp) throw new Error(`Invalid WEBP Tula reaction asset: ${file}`);
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

if (!html.includes('Shell Runner boss gameplay polish v1.5')) throw new Error('Boss gameplay polish missing');
if (!html.includes('boss-react-startled') || !html.includes('boss-react-laugh')) throw new Error('Boss reaction states missing');
if (!html.includes('bossHandsMouthLeft') || !html.includes('bossLaughBody')) throw new Error('Boss reaction animations missing');
if (!html.includes('id="bossObjectLayer"') || !html.includes('startBossObjects')) throw new Error('Boss obstacle/collectible layer missing');
if (!html.includes('createBarrelSvg') || !html.includes('createShellSvg')) throw new Error('Boss barrel/shell vector art missing');
if (!html.includes('boss-fuse-flame') || !html.includes('barrelWobble')) throw new Error('Lit fuse/wobbling barrel behavior missing');
if (!html.includes('explodeBossBarrel') || !html.includes('collectBossShell')) throw new Error('Boss object interaction logic missing');
if (!html.includes("background:radial-gradient(circle,rgba(255,72,72,.52)") || !html.includes("background:radial-gradient(circle,rgba(255,229,133,.7)")) throw new Error('Red/golden object glow missing');
if (!html.includes('boss-result-hero{position:relative!important;display:grid!important;place-items:end center!important')) throw new Error('Boss result non-overlap layout missing');

if (!html.includes('Shell Runner official Tula reaction sprites v1.6')) throw new Error('Official Tula reaction sprite polish missing');
if (!html.includes('./assets/characters/tula-celebrating.webp') || !html.includes('./assets/characters/tula-surprised.webp')) throw new Error('Official Tula reaction assets are not referenced by runtime');
if (!html.includes('TULA_REACTION_SPRITES')) throw new Error('Tula reaction sprite switching logic missing');
if (!html.includes('.runner .runner-limb{display:none!important}')) throw new Error('Synthetic Tula reaction limbs are not disabled');

if (!html.includes('Shell Runner boss frequency v1.7')) throw new Error('Boss frequency enhancer missing');
if (!html.includes('const BOSS_CORRECT_INTERVAL=3;')) throw new Error('Boss interval must be 3 correct words');
if (!html.includes('bossCorrect:0')) throw new Error('Boss correct-word progress state missing');
if (!html.includes('if(correct)s.bossCorrect++')) throw new Error('Boss progress must increment only on correct normal answers');
if (!html.includes('s.bossCorrect>=BOSS_CORRECT_INTERVAL')) throw new Error('Boss trigger does not use correct-word progress');
if (!html.includes('Nach 3 richtigen Wörtern wartet ein Themen-Boss.')) throw new Error('Boss intro copy does not reflect 3 correct words');
if (html.includes('s.answered%15===0') || html.includes('(s.answered%15)/15')) throw new Error('Legacy 15-question boss trigger/progress remains');

if (html.includes('raw.githubusercontent.com/o-some/tulasisland')) throw new Error('Cross-repo runtime asset dependency remains');
if (!source.includes('raw.githubusercontent.com/o-some/tulasisland')) throw new Error('source.html does not look like untouched source snapshot');

console.log('Static migration/gameplay smoke checks: PASS');
