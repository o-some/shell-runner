import fs from 'node:fs/promises';

const path = 'index.html';
let html = await fs.readFile(path, 'utf8');

const marker = '/* Shell Runner official Tula reaction sprites v1.6 */';
if (html.includes(marker)) {
  console.log('Official Tula reaction sprite polish already present.');
  process.exit(0);
}

await fs.access('assets/characters/tula-celebrating.webp');
await fs.access('assets/characters/tula-surprised.webp');
await fs.access('assets/characters/tula-neutral-front.webp');

const css = String.raw`
${marker}
/* Use official CI sprites for Tula reactions. Hide synthetic Tula limbs, keep boss limbs. */
.runner .runner-limb{display:none!important}
.runner.reaction-correct>img{
  animation:tulaOfficialCelebrate .78s cubic-bezier(.18,.82,.2,1)!important;
  filter:drop-shadow(0 0 18px rgba(255,225,126,.46)) drop-shadow(0 12px 9px rgba(0,0,0,.38))!important;
}
.runner.reaction-wrong>img{
  animation:tulaOfficialOops .78s cubic-bezier(.2,.78,.2,1)!important;
  filter:drop-shadow(0 0 15px rgba(255,104,124,.28)) drop-shadow(0 12px 9px rgba(0,0,0,.38))!important;
}
@keyframes tulaOfficialCelebrate{
  0%{transform:translateY(0) scale(1);opacity:.98}
  24%{transform:translateY(-10px) scale(1.04)}
  48%{transform:translateY(-27px) scale(1.1)}
  72%{transform:translateY(-10px) scale(1.045)}
  100%{transform:translateY(0) scale(1);opacity:1}
}
@keyframes tulaOfficialOops{
  0%{transform:translateY(0) rotate(0) scale(1)}
  22%{transform:translateY(6px) rotate(-4deg) scale(.97)}
  45%{transform:translateY(7px) rotate(3deg) scale(.965)}
  68%{transform:translateY(4px) rotate(-2deg) scale(.985)}
  100%{transform:translateY(0) rotate(0) scale(1)}
}
@media(prefers-reduced-motion:reduce){
  .runner.reaction-correct>img,.runner.reaction-wrong>img{animation-duration:.18s!important}
}
`;
html = html.replace('</style>', `${css}\n</style>`);

const oldFn = `function playCharacterReactions(good){
  const runner=$('runner'),boss=$('bossSide');
  if(runner){runner.classList.remove('reaction-correct','reaction-wrong');void runner.offsetWidth;runner.classList.add(good?'reaction-correct':'reaction-wrong')}
  if(s?.boss&&boss?.classList.contains('show')){boss.classList.remove('boss-react-startled','boss-react-laugh');void boss.offsetWidth;boss.classList.add(good?'boss-react-startled':'boss-react-laugh')}
  setTimeout(()=>{runner?.classList.remove('reaction-correct','reaction-wrong');boss?.classList.remove('boss-react-startled','boss-react-laugh')},840)
}`;

const newFn = `const TULA_REACTION_SPRITES={neutral:'./assets/characters/tula-neutral-front.webp',correct:'./assets/characters/tula-celebrating.webp',wrong:'./assets/characters/tula-surprised.webp'};
Object.values(TULA_REACTION_SPRITES).forEach(src=>{const preload=new Image();preload.src=src});
function playCharacterReactions(good){
  const runner=$('runner'),boss=$('bossSide'),runnerImg=runner?.querySelector('img');
  if(runner){
    runner.classList.remove('reaction-correct','reaction-wrong');
    if(runnerImg){runnerImg.src=good?TULA_REACTION_SPRITES.correct:TULA_REACTION_SPRITES.wrong;runnerImg.alt=good?'Tula jubelt':'Tula ist überrascht'}
    void runner.offsetWidth;
    runner.classList.add(good?'reaction-correct':'reaction-wrong');
  }
  if(s?.boss&&boss?.classList.contains('show')){
    boss.classList.remove('boss-react-startled','boss-react-laugh');
    void boss.offsetWidth;
    boss.classList.add(good?'boss-react-startled':'boss-react-laugh');
  }
  setTimeout(()=>{
    runner?.classList.remove('reaction-correct','reaction-wrong');
    boss?.classList.remove('boss-react-startled','boss-react-laugh');
    if(runnerImg){runnerImg.src=TULA_REACTION_SPRITES.neutral;runnerImg.alt='Tula'}
  },840)
}`;

if (!html.includes(oldFn)) throw new Error('playCharacterReactions anchor missing for official Tula sprites');
html = html.replace(oldFn, newFn);

await fs.writeFile(path, html, 'utf8');
console.log('Applied official Tula celebrating/surprised sprites to reactions.');
