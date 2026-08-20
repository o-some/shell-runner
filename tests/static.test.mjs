import fs from 'node:fs';

const required = [
  'index.html',
  'source.html',
  'assets/backgrounds/world-jungle-trail.webp',
  'assets/characters/tula-profile.webp',
  'assets/characters/tula-neutral-front.webp',
  'assets/bosses/captain-shelldon.webp',
  'HANDOFF.md',
  'docs/MIGRATION_RECORD.md',
  'docs/ASSET_MANIFEST.md',
  'docs/TEST_CHECKLIST.md'
];
for (const file of required) {
  if (!fs.existsSync(file)) throw new Error(`Missing required file: ${file}`);
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
if (!html.includes('Du hast Captain Shelldon besiegt!')) throw new Error('Boss victory message missing');
if (!html.includes('Ich ziehe dir keine Herzen ab')) throw new Error('Positive boss-loss/no-heart message missing');
if (!html.includes('runBossResultFireworks') || !html.includes('continueAfterBoss')) throw new Error('Boss result flow/fireworks missing');
if (html.includes('raw.githubusercontent.com/o-some/tulasisland')) throw new Error('Cross-repo runtime asset dependency remains');
if (!source.includes('raw.githubusercontent.com/o-some/tulasisland')) throw new Error('source.html does not look like untouched source snapshot');
console.log('Static migration/gameplay smoke checks: PASS');
