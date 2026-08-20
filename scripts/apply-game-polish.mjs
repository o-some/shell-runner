import fs from 'node:fs/promises';

const path = 'index.html';
let html = await fs.readFile(path, 'utf8');

const cssMarker = '/* Shell Runner polish v1.2 */';
if (!html.includes(cssMarker)) {
  const css = String.raw`
/* Shell Runner polish v1.2 */
.firework-particle{position:absolute;z-index:32;width:5px;height:13px;pointer-events:none;opacity:0;border-radius:2px;background:var(--spark,#ffe18a);box-shadow:0 0 8px color-mix(in srgb,var(--spark,#ffe18a) 78%,transparent);transform-origin:center;will-change:transform,opacity;animation:miniFirework .68s cubic-bezier(.18,.72,.25,1) forwards}
.firework-particle.bad{width:5px;height:9px;border-radius:1px;animation:badFragment .52s ease-out forwards}
@keyframes miniFirework{0%{opacity:0;transform:translate(-50%,-50%) scale(.25) rotate(0)}10%{opacity:1}100%{opacity:0;transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(.72) rotate(var(--rot))}}
@keyframes badFragment{0%{opacity:0;transform:translate(-50%,-50%) scale(.4)}15%{opacity:.9}100%{opacity:0;transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) rotate(var(--rot)) scale(.7)}}
.boss-result-modal{position:relative;overflow:hidden;isolation:isolate}
.boss-result-modal h2,.boss-result-modal p,.boss-result-modal button,.boss-result-modal .boss-kicker{position:relative;z-index:3}
.boss-result-fx{position:absolute;z-index:1;inset:0;pointer-events:none;overflow:hidden}
.boss-firework-particle{position:absolute;width:6px;height:15px;border-radius:2px;background:var(--spark,#ffe18a);opacity:0;box-shadow:0 0 10px color-mix(in srgb,var(--spark,#ffe18a) 82%,transparent);animation:bossFirework .85s cubic-bezier(.16,.72,.25,1) forwards}
@keyframes bossFirework{0%{opacity:0;transform:translate(-50%,-50%) scale(.2)}10%{opacity:1}100%{opacity:0;transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) rotate(var(--rot)) scale(.75)}}
.boss-result-reward{display:inline-flex;gap:8px;align-items:center;justify-content:center;margin:4px auto 8px;padding:7px 11px;border:1px solid rgba(239,200,103,.42);border-radius:999px;background:rgba(255,255,255,.05);color:#ffe5a0;font-weight:900}
@media(prefers-reduced-motion:reduce){.firework-particle,.boss-firework-particle{animation-duration:.14s!important}}
`;
  if (!html.includes('</style>')) throw new Error('Style closing tag missing for gameplay polish');
  html = html.replace('</style>', `${css}\n</style>`);
}

const armMarkup = '<span class="tula-arm tula-arm-left" aria-hidden="true"></span><span class="tula-arm tula-arm-right" aria-hidden="true"></span>';
html = html.replaceAll(armMarkup, '');

const bossResultMarkup = '<div class="overlay hidden" id="bossResult"><div class="modal boss-result-modal"><div class="boss-result-fx" id="bossResultFx" aria-hidden="true"></div><div class="boss-kicker" id="bossResultKicker">BOSS BESIEGT</div><h2 id="bossResultTitle">Du hast Captain Shelldon besiegt!</h2><div class="boss-result-reward hidden" id="bossResultReward">🐚 +5 · ⭐ +30 XP</div><p id="bossResultCopy">Stark gespielt! Deine Reise geht weiter.</p><button id="bossContinue">Weiter</button></div></div>';
if (!html.includes('id="bossResult"')) {
  const gameoverAnchor = '<div class="overlay hidden" id="gameover">';
  if (!html.includes(gameoverAnchor)) throw new Error('Gameover anchor missing for boss result modal');
  html = html.replace(gameoverAnchor, `${bossResultMarkup}\n${gameoverAnchor}`);
}

const oldBurstStart = "function burstParticles(good){";
const playHitStart = "function playHitFx(good,selected,correctGate){";
const burstStart = html.indexOf(oldBurstStart);
const playStart = html.indexOf(playHitStart);
if (burstStart < 0 || playStart < 0 || playStart <= burstStart) throw new Error('Hit particle function anchors missing');
const fireworkBurstFn = String.raw`function burstParticles(good){const layer=$('impactLayer');if(!layer)return;layer.innerHTML='';const runner=$('runner'),arena=$('arena');const rr=runner.getBoundingClientRect(),ar=arena.getBoundingClientRect();const cx=rr.left+rr.width/2-ar.left,cy=rr.top+rr.height*.38-ar.top;const palette=good?['#ffe18a','#79d9c7','#ffffff','#efc867','#8fe7b3']:['#ff7f91','#ffb0bb','#d85b73'];const count=good?18:7;for(let i=0;i<count;i++){const p=document.createElement('span');p.className='firework-particle'+(good?'':' bad');const angle=good?(Math.PI*2*i/count)+(Math.random()-.5)*.18:(Math.PI*.22)+(Math.random()*Math.PI*.56);const distance=good?45+Math.random()*82:30+Math.random()*48;p.style.left=(cx+(good&&i%2===0?-18:good?18:0))+'px';p.style.top=(cy+(good&&i%2===0?-4:good?4:0))+'px';p.style.setProperty('--dx',Math.round(Math.cos(angle)*distance)+'px');p.style.setProperty('--dy',Math.round(Math.sin(angle)*distance-(good?24:0))+'px');p.style.setProperty('--rot',Math.round(Math.random()*260-130)+'deg');p.style.setProperty('--spark',palette[i%palette.length]);p.style.animationDelay=(i%6)*18+'ms';layer.appendChild(p)}setTimeout(()=>{if(layer)layer.innerHTML=''},760)}
`;
html = html.slice(0, burstStart) + fireworkBurstFn + html.slice(playStart);

const oldEndBoss = "function endBoss(){if(bossRound>=5&&s.bossMiss<3){s.score+=500;s.shells+=5;s.xp+=30;feedback('Boss geschafft! +5 Muscheln')}s.boss=false;s.answered=0;s.run=true;$('bossSide').classList.remove('show');render();setTimeout(spawn,900)}";
if (!html.includes(oldEndBoss)) throw new Error('endBoss() anchor missing for boss result flow');
const newBossFlow = String.raw`function runBossResultFireworks(){const layer=$('bossResultFx');if(!layer)return;layer.innerHTML='';const palette=['#ffe18a','#79d9c7','#ffffff','#efc867','#8fe7b3'];const centers=[[34,42],[66,38]];centers.forEach((center,c)=>{for(let i=0;i<12;i++){const p=document.createElement('span');p.className='boss-firework-particle';const angle=Math.PI*2*i/12+(c*.13);const distance=42+Math.random()*52;p.style.left=center[0]+'%';p.style.top=center[1]+'%';p.style.setProperty('--dx',Math.round(Math.cos(angle)*distance)+'px');p.style.setProperty('--dy',Math.round(Math.sin(angle)*distance)+'px');p.style.setProperty('--rot',Math.round(Math.random()*300-150)+'deg');p.style.setProperty('--spark',palette[(i+c)%palette.length]);p.style.animationDelay=(c*120+i*12)+'ms';layer.appendChild(p)}});setTimeout(()=>{if(layer)layer.innerHTML=''},1100)}
function showBossResult(won){clearTimeout(timer);s.run=false;s.paused=false;s.bossResult=true;$('bossSide').classList.remove('show');$('bossResultKicker').textContent=won?'BOSS BESIEGT':'WEITER GEHT’S';$('bossResultTitle').textContent=won?'Du hast Captain Shelldon besiegt!':'Fast geschafft!';$('bossResultCopy').textContent=won?'Stark gespielt! Du bekommst deinen Boss-Bonus und deine Reise geht direkt weiter.':'Captain Shelldon war diesmal stärker – aber du darfst direkt weitermachen. Ich ziehe dir keine Herzen ab, damit deine Reise weitergeht.';$('bossResultReward').classList.toggle('hidden',!won);$('bossResult').classList.remove('hidden');if(won){runBossResultFireworks();vibrate([35,28,35])}else{vibrate(28)}updatePause()}
function continueAfterBoss(){$('bossResult').classList.add('hidden');$('bossResultFx').innerHTML='';s.bossResult=false;s.run=true;s.paused=false;document.getElementById('app').classList.remove('paused');updatePause();spawn()}
function endBoss(){const won=bossRound>=5&&s.bossMiss<3;if(won){s.score+=500;s.shells+=5;s.xp+=30} s.boss=false;s.answered=0;render();showBossResult(won)}`;
html = html.replace(oldEndBoss, newBossFlow);

const oldPauseToggle = "function pauseToggle(){if(!s.run&&!s.paused){start();return}if(s.paused){s.paused=false;s.run=true;document.getElementById('app').classList.remove('paused');updatePause();spawn();return}if(s.pauseLeft<=0)return;s.pauseLeft--;s.run=false;s.paused=true;clearTimeout(timer);document.getElementById('app').classList.add('paused');updatePause()}";
if (!html.includes(oldPauseToggle)) throw new Error('pauseToggle() anchor missing for boss result guard');
const guardedPauseToggle = "function pauseToggle(){if(s?.bossResult)return;if(!s.run&&!s.paused){start();return}if(s.paused){s.paused=false;s.run=true;document.getElementById('app').classList.remove('paused');updatePause();spawn();return}if(s.pauseLeft<=0)return;s.pauseLeft--;s.run=false;s.paused=true;clearTimeout(timer);document.getElementById('app').classList.add('paused');updatePause()}";
html = html.replace(oldPauseToggle, guardedPauseToggle);

const handlerAnchor = "$('introStart').onclick=start;$('pause').onclick=pauseToggle;$('bossStart').onclick=startBoss;$('restart').onclick=start;";
if (!html.includes(handlerAnchor)) throw new Error('Event handler anchor missing for boss continue');
html = html.replace(handlerAnchor, "$('introStart').onclick=start;$('pause').onclick=pauseToggle;$('bossStart').onclick=startBoss;$('bossContinue').onclick=continueAfterBoss;$('restart').onclick=start;");

await fs.writeFile(path, html, 'utf8');
console.log('Applied fireworks and boss result flow to', path);
