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

const hitFxCss = String.raw`
/* Shell Runner hit feedback v1.1 */
.arena.hit-good::after,.arena.hit-bad::after{content:"";position:absolute;z-index:24;inset:0;pointer-events:none;opacity:0}
.arena.hit-good::after{background:radial-gradient(circle at 50% 72%,rgba(135,255,190,.34),rgba(121,217,199,.12) 25%,transparent 55%);animation:screenGood .5s ease}
.arena.hit-bad::after{background:radial-gradient(circle at 50% 72%,rgba(255,97,121,.30),rgba(255,97,121,.08) 28%,transparent 58%);animation:screenBad .46s ease}
.runner.correct-hit{filter:drop-shadow(0 0 18px rgba(132,255,194,.72))}
.runner.wrong-hit{filter:drop-shadow(0 0 16px rgba(255,100,125,.62))}
.runner.correct-hit img{animation:tulaCorrectHit .56s cubic-bezier(.2,.85,.2,1)!important}
.runner.wrong-hit img{animation:tulaWrongHit .56s cubic-bezier(.2,.8,.2,1)!important;filter:saturate(.78) brightness(.88)}
.gate.hit-correct{animation:gateSuccessHit .56s ease!important;z-index:3}
.gate.hit-wrong{animation:gateFailHit .5s ease!important;z-index:3}
.impact-layer{position:absolute;z-index:31;inset:0;overflow:hidden;pointer-events:none}
.hit-particle{position:absolute;left:50%;top:72%;font-size:clamp(.7rem,2.6vw,1rem);line-height:1;opacity:0;will-change:transform,opacity;animation:particleBurst .62s ease-out forwards;filter:drop-shadow(0 2px 3px rgba(0,0,0,.35))}
.hit-particle.spark{width:8px;height:8px;border-radius:50%;font-size:0;background:#ff788b;box-shadow:0 0 10px rgba(255,92,119,.7)}
@keyframes tulaCorrectHit{0%{transform:translateY(0) scale(1)}22%{transform:translateY(-10px) scale(1.04,.97)}52%{transform:translateY(-34px) scale(1.13)}76%{transform:translateY(-9px) scale(1.04,.98)}100%{transform:translateY(0) scale(1)}}
@keyframes tulaWrongHit{0%{transform:translate(0,0) rotate(0) scale(1)}18%{transform:translate(-8px,8px) rotate(-7deg) scale(.94)}38%{transform:translate(9px,10px) rotate(6deg) scale(.93)}58%{transform:translate(-6px,7px) rotate(-4deg) scale(.95)}78%{transform:translate(4px,3px) rotate(2deg) scale(.98)}100%{transform:translate(0,0) rotate(0) scale(1)}}
@keyframes gateSuccessHit{0%{transform:scale(1)}42%{transform:scale(1.08);box-shadow:0 8px 0 rgba(29,105,73,.78),0 0 34px rgba(115,255,176,.78)}100%{transform:scale(1)}}
@keyframes gateFailHit{0%,100%{transform:translateX(0)}18%{transform:translateX(-8px) rotate(-1deg)}36%{transform:translateX(8px) rotate(1deg)}54%{transform:translateX(-6px)}72%{transform:translateX(5px)}}
@keyframes screenGood{0%{opacity:0}32%{opacity:1}100%{opacity:0}}
@keyframes screenBad{0%{opacity:0}28%{opacity:1}100%{opacity:0}}
@keyframes particleBurst{0%{opacity:0;transform:translate(-50%,-50%) scale(.45)}12%{opacity:1}100%{opacity:0;transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) rotate(var(--rot)) scale(1.12)}}
@media(prefers-reduced-motion:reduce){.runner.correct-hit img,.runner.wrong-hit img,.gate.hit-correct,.gate.hit-wrong,.arena.hit-good::after,.arena.hit-bad::after,.hit-particle{animation-duration:.12s!important}}
`;
runtime = runtime.replace('</style>', `${hitFxCss}\n</style>`);

const impactMarkup = '<div class="impact-layer" id="impactLayer" aria-hidden="true"></div>';
const feedbackAnchor = '<div class="feedback" id="feedback"></div></section>';
if (!runtime.includes(feedbackAnchor)) throw new Error('Feedback markup anchor missing for hit FX');
runtime = runtime.replace(feedbackAnchor, `<div class="feedback" id="feedback"></div>${impactMarkup}</section>`);

const feedbackFn = "function feedback(t){const f=$('feedback');f.textContent=t;f.classList.add('show');setTimeout(()=>f.classList.remove('show'),650)}";
if (!runtime.includes(feedbackFn)) throw new Error('feedback() anchor missing for hit FX');
const hitFxJs = [
  "function vibrate(pattern){try{if(navigator.vibrate)navigator.vibrate(pattern)}catch{}}",
  "function clearHitFx(){const arena=$('arena'),runner=$('runner');arena.classList.remove('hit-good','hit-bad');runner.classList.remove('correct-hit','wrong-hit');document.querySelectorAll('.gate').forEach(g=>g.classList.remove('hit-correct','hit-wrong'));$('impactLayer').innerHTML=''}",
  "function burstParticles(good){const layer=$('impactLayer');if(!layer)return;layer.innerHTML='';const glyphs=good?['✦','🐚','✦','★','✦','🐚','✦','★']:['','','','','',''];const count=good?8:6;for(let i=0;i<count;i++){const p=document.createElement('span');p.className='hit-particle'+(good?'':' spark');p.textContent=glyphs[i]||'';p.style.setProperty('--dx',Math.round((Math.random()-.5)*150)+'px');p.style.setProperty('--dy',Math.round(-45-Math.random()*105)+'px');p.style.setProperty('--rot',Math.round((Math.random()-.5)*150)+'deg');p.style.animationDelay=(i*18)+'ms';layer.appendChild(p)}setTimeout(()=>{if(layer)layer.innerHTML=''},720)}",
  "function playHitFx(good,selected,correctGate){clearHitFx();const arena=$('arena'),runner=$('runner');void runner.offsetWidth;if(good){arena.classList.add('hit-good');runner.classList.add('correct-hit');(correctGate||selected)?.classList.add('hit-correct');burstParticles(true);vibrate(35)}else{arena.classList.add('hit-bad');runner.classList.add('wrong-hit');selected?.classList.add('hit-wrong');burstParticles(false);vibrate([48,34,62])}setTimeout(clearHitFx,680)}"
].join('\n');
runtime = runtime.replace(feedbackFn, `${feedbackFn}\n${hitFxJs}`);

const resolveFn = "function resolve(){if(!s.run||!q)return;const correct=s.lane===q.correct,gs=[...document.querySelectorAll('.gate')];gs.forEach((g,i)=>g.classList.add(i===q.correct?'correct':'wrong'));if(correct){s.correct++;s.combo++;s.best=Math.max(s.best,s.combo);s.score+=100+s.combo*15;s.shells++;s.xp+=2;$('runner').classList.add('happy');feedback('✓ Richtig!')}else{s.combo=0;if(q.type==='boss')s.bossMiss++;else s.lives--;$('runner').classList.add('sad');feedback(q.type==='boss'?'✕ Nicht passend':'✕ '+q.target.en)}s.total++;if(q.type==='normal')s.answered++;else bossRound++;render();setTimeout(()=>{$('runner').classList.remove('happy','sad');s.lane=1;$('runner').style.left='50%';if(s.lives<=0){gameover();return}if(s.boss&&(bossRound>=5||s.bossMiss>=3)){endBoss();return}if(!s.boss&&s.answered>0&&s.answered%15===0){showBossIntro();return}spawn()},750)}";
if (!runtime.includes(resolveFn)) throw new Error('resolve() anchor missing for hit FX');
const enhancedResolveFn = "function resolve(){if(!s.run||!q)return;const correct=s.lane===q.correct,gs=[...document.querySelectorAll('.gate')],selected=gs[s.lane],correctGate=gs[q.correct];gs.forEach((g,i)=>g.classList.add(i===q.correct?'correct':'wrong'));playHitFx(correct,selected,correctGate);if(correct){s.correct++;s.combo++;s.best=Math.max(s.best,s.combo);s.score+=100+s.combo*15;s.shells++;s.xp+=2;$('runner').classList.add('happy');feedback('✓ Richtig!')}else{s.combo=0;if(q.type==='boss')s.bossMiss++;else s.lives--;$('runner').classList.add('sad');feedback(q.type==='boss'?'✕ Nicht passend':'✕ '+q.target.en)}s.total++;if(q.type==='normal')s.answered++;else bossRound++;render();setTimeout(()=>{clearHitFx();$('runner').classList.remove('happy','sad');s.lane=1;$('runner').style.left='50%';if(s.lives<=0){gameover();return}if(s.boss&&(bossRound>=5||s.bossMiss>=3)){endBoss();return}if(!s.boss&&s.answered>0&&s.answered%15===0){showBossIntro();return}spawn()},750)}";
runtime = runtime.replace(resolveFn, enhancedResolveFn);

if (runtime.includes('raw.githubusercontent.com/o-some/tulasisland')) {
  throw new Error('Runtime still contains tulasisland raw asset dependencies');
}

runtime = runtime.replace('<title>Shell Runner · Tula\'s Island</title>', '<title>Shell Runner · Tula\'s Island</title>\n<meta name="migration-source" content="o-some/tulasisland@892f676fbcef77ab49373aef7865d60afba0ebb7">');
await fs.writeFile('index.html', runtime, 'utf8');
console.log('Materialized Shell Runner with enhanced hit feedback from', SOURCE_COMMIT);
