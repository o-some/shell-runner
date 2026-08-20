import fs from 'node:fs';

const required = [
  'index.html',
  'source.html',
  'assets/backgrounds/world-jungle-trail.webp',
  'assets/characters/tula-profile.webp',
  'assets/characters/tula-neutral-front.webp',
  'assets/bosses/captain-shelldon.webp',
  'scripts/apply-arm-reactions.mjs',
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
if (!html.includes('navigator.vibrate') || !html.includes('hit-particle')) throw new Error('Mobile haptics/particle feedback missing');
if (!html.includes('tula-arm-left') || !html.includes('tula-arm-right')) throw new Error('Tula arm reaction markup missing');
if (!html.includes('tulaArmGoodLeft') || !html.includes('tulaArmGoodRight')) throw new Error('Positive Tula arm animation missing');
if (!html.includes('tulaArmBadLeft') || !html.includes('tulaArmBadRight')) throw new Error('Negative Tula arm animation missing');
if (html.includes('raw.githubusercontent.com/o-some/tulasisland')) throw new Error('Cross-repo runtime asset dependency remains');
if (!source.includes('raw.githubusercontent.com/o-some/tulasisland')) throw new Error('source.html does not look like untouched source snapshot');
console.log('Static migration/gameplay smoke checks: PASS');
