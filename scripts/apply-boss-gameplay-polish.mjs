import fs from 'node:fs/promises';

const path = 'index.html';
let html = await fs.readFile(path, 'utf8');

const marker = '/* Shell Runner boss gameplay polish v1.5 */';
if (html.includes(marker)) {
  console.log('Boss gameplay polish already present.');
  process.exit(0);
}

const runnerMarkup = '<div class="runner" id="runner"><img src="./assets/characters/tula-neutral-front.webp" alt="Tula"></div>';
const runnerMarkupEnhanced = '<div class="runner" id="runner"><span class="runner-limb runner-limb-left" aria-hidden="true"></span><span class="runner-limb runner-limb-right" aria-hidden="true"></span><img src="./assets/characters/tula-neutral-front.webp" alt="Tula"></div>';
if (!html.includes(runnerMarkup)) throw new Error('Runner markup anchor missing');
html = html.replace(runnerMarkup, runnerMarkupEnhanced);

const bossMarkup = '<div class="boss-side" id="bossSide"><img id="bossSideImg" alt="Captain Shelldon"></div>';
const bossMarkupEnhanced = '<div class="boss-side" id="bossSide"><span class="boss-limb boss-limb-left" aria-hidden="true"></span><span class="boss-limb boss-limb-right" aria-hidden="true"></span><img id="bossSideImg" alt="Captain Shelldon"></div>';
if (!html.includes(bossMarkup)) throw new Error('Boss-side markup anchor missing');
html = html.replace(bossMarkup, bossMarkupEnhanced);

const gatesMarkup = '<div class="gates" id="gates"></div>';
const gatesMarkupEnhanced = '<div class="boss-object-layer" id="bossObjectLayer" aria-hidden="true"></div><div class="gates" id="gates"></div>';
if (!html.includes(gatesMarkup)) throw new Error('Gate markup anchor missing');
html = html.replace(gatesMarkup, gatesMarkupEnhanced);

const css = String.raw`
${marker}
/* Result layout: boss image gets its own space and can never overlap the title. */
.boss-result-modal{display:flex!important;flex-direction:column!important;align-items:center!important;padding:22px 22px 20px!important}
.boss-result-hero{position:relative!important;display:grid!important;place-items:end center!important;width:156px!important;height:166px!important;margin:2px auto 14px!important;flex:0 0 166px!important;overflow:visible!important}
.boss-result-hero::before{content:"";position:absolute;left:12%;right:12%;bottom:6px;height:54%;border-radius:50%;background:radial-gradient(circle,rgba(255,224,133,.28),rgba(121,217,199,.12) 42%,transparent 74%);filter:blur(13px);z-index:0}
.boss-result-hero img{position:relative!important;z-index:1!important;display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;object-position:center bottom!important;transform:none!important;filter:drop-shadow(0 18px 18px rgba(0,8,18,.54))!important}
.boss-result-modal h2{position:relative!important;z-index:3!important;margin:4px auto 11px!important;max-width:12ch!important;font-size:clamp(1.95rem,7vw,2.7rem)!important;line-height:.96!important}
.boss-result-reward{position:relative!important;z-index:3!important;margin:0 auto 12px!important}
.boss-result-modal p{position:relative!important;z-index:3!important;margin:0 auto 17px!important;max-width:30ch!important}
.boss-result-modal button{position:relative!important;z-index:3!important}
@media(max-width:520px){
  .boss-result-modal{padding:17px 14px 16px!important}
  .boss-result-hero{width:128px!important;height:138px!important;flex-basis:138px!important;margin:0 auto 10px!important}
  .boss-result-modal h2{font-size:clamp(1.7rem,8vw,2.2rem)!important;margin-bottom:9px!important}
}

/* Character reaction limbs. They are tapered flippers, not circles, and only appear during reactions. */
.runner,.boss-side{overflow:visible!important}
.runner>img,.boss-side>img{position:relative;z-index:2}
.runner-limb,.boss-limb{position:absolute;z-index:4;display:block;opacity:0;pointer-events:none;transform-origin:50% 88%;will-change:transform,opacity;box-shadow:inset 0 1px rgba(255,255,255,.34),0 4px 8px rgba(0,10,18,.28)}
.runner-limb{top:43px;width:17px;height:48px;border:1px solid rgba(73,111,34,.58);border-radius:60% 55% 68% 48%/35% 42% 78% 72%;background:linear-gradient(145deg,#d5e875 0%,#9fc84f 42%,#649d3e 100%)}
.runner-limb::after{content:"";position:absolute;left:50%;top:-5px;width:16px;height:18px;transform:translateX(-50%);border-radius:58% 58% 48% 48%;background:linear-gradient(145deg,#d9ed7d,#82ad46);box-shadow:inset 0 1px rgba(255,255,255,.3)}
.runner-limb-left{left:20px;transform:rotate(34deg)}
.runner-limb-right{right:20px;transform:rotate(-34deg)}
.runner.reaction-correct .runner-limb,.runner.reaction-wrong .runner-limb{opacity:1}
.runner.reaction-correct .runner-limb-left{animation:runnerArmUpLeft .76s cubic-bezier(.18,.82,.2,1)}
.runner.reaction-correct .runner-limb-right{animation:runnerArmUpRight .76s cubic-bezier(.18,.82,.2,1)}
.runner.reaction-wrong .runner-limb-left{animation:runnerHandMouthLeft .76s cubic-bezier(.18,.82,.2,1)}
.runner.reaction-wrong .runner-limb-right{animation:runnerHandMouthRight .76s cubic-bezier(.18,.82,.2,1)}
.runner.reaction-correct>img{animation:runnerCelebrateBody .76s cubic-bezier(.18,.82,.2,1)!important}
.runner.reaction-wrong>img{animation:runnerOopsBody .76s cubic-bezier(.18,.82,.2,1)!important}
@keyframes runnerArmUpLeft{0%,100%{transform:rotate(34deg) translateY(0)}36%,66%{transform:translate(-7px,-29px) rotate(-132deg)}}
@keyframes runnerArmUpRight{0%,100%{transform:rotate(-34deg) translateY(0)}36%,66%{transform:translate(7px,-29px) rotate(132deg)}}
@keyframes runnerHandMouthLeft{0%,100%{transform:rotate(34deg)}38%,70%{transform:translate(17px,-19px) rotate(-48deg) scale(.96)}}
@keyframes runnerHandMouthRight{0%,100%{transform:rotate(-34deg)}38%,70%{transform:translate(-17px,-19px) rotate(48deg) scale(.96)}}
@keyframes runnerCelebrateBody{0%,100%{transform:translateY(0) scale(1)}38%{transform:translateY(-24px) scale(1.07)}68%{transform:translateY(-13px) scale(1.04)}}
@keyframes runnerOopsBody{0%,100%{transform:translateY(0) rotate(0)}25%{transform:translateY(5px) rotate(-5deg)}48%{transform:translateY(7px) rotate(4deg)}70%{transform:translateY(3px) rotate(-2deg)}}

/* Boss reacts opposite to Tula: surprised on player success, laughing on player error. */
.boss-limb{top:48px;width:15px;height:52px;border:1px solid rgba(66,94,31,.58);border-radius:58% 52% 68% 46%/32% 40% 80% 70%;background:linear-gradient(145deg,#b8cf62,#779a3f 56%,#4d7134);filter:drop-shadow(0 4px 5px rgba(0,8,16,.3))}
.boss-limb::after{content:"";position:absolute;left:50%;top:-5px;width:15px;height:17px;transform:translateX(-50%);border-radius:60% 60% 48% 48%;background:linear-gradient(145deg,#c7db6b,#708f3d)}
.boss-limb-left{left:18px;transform:rotate(27deg)}
.boss-limb-right{right:18px;transform:rotate(-27deg)}
.boss-side.boss-react-startled .boss-limb,.boss-side.boss-react-laugh .boss-limb{opacity:1}
.boss-side.boss-react-startled .boss-limb-left{animation:bossHandsMouthLeft .8s cubic-bezier(.2,.8,.2,1)}
.boss-side.boss-react-startled .boss-limb-right{animation:bossHandsMouthRight .8s cubic-bezier(.2,.8,.2,1)}
.boss-side.boss-react-startled>img{animation:bossStartledBody .8s cubic-bezier(.2,.8,.2,1)!important}
.boss-side.boss-react-laugh .boss-limb-left{animation:bossLaughArmLeft .82s ease-in-out}
.boss-side.boss-react-laugh .boss-limb-right{animation:bossLaughArmRight .82s ease-in-out}
.boss-side.boss-react-laugh>img{animation:bossLaughBody .82s ease-in-out!important}
.boss-side.final-boss{filter:drop-shadow(0 0 16px rgba(239,200,103,.26))}
@keyframes bossHandsMouthLeft{0%,100%{transform:rotate(27deg)}34%,70%{transform:translate(15px,-22px) rotate(-46deg)}}
@keyframes bossHandsMouthRight{0%,100%{transform:rotate(-27deg)}34%,70%{transform:translate(-15px,-22px) rotate(46deg)}}
@keyframes bossStartledBody{0%,100%{transform:translateY(0) scale(1)}30%{transform:translateY(-5px) scale(.94)}55%{transform:translateY(2px) scale(1.03)}76%{transform:translateY(-2px)}}
@keyframes bossLaughArmLeft{0%,100%{transform:rotate(27deg)}24%{transform:translate(-7px,-12px) rotate(78deg)}48%{transform:translate(-5px,-8px) rotate(55deg)}72%{transform:translate(-8px,-14px) rotate(82deg)}}
@keyframes bossLaughArmRight{0%,100%{transform:rotate(-27deg)}24%{transform:translate(7px,-12px) rotate(-78deg)}48%{transform:translate(5px,-8px) rotate(-55deg)}72%{transform:translate(8px,-14px) rotate(-82deg)}}
@keyframes bossLaughBody{0%,100%{transform:translateY(0) rotate(0)}20%{transform:translateY(-5px) rotate(-3deg)}40%{transform:translateY(1px) rotate(3deg)}60%{transform:translateY(-6px) rotate(-2deg)}80%{transform:translateY(0) rotate(2deg)}}

/* Boss-only collectible/hazard layer. */
.boss-object-layer{position:absolute;z-index:14;inset:0;pointer-events:none;overflow:hidden}
.boss-object{position:absolute;left:var(--lane-left);top:19%;width:72px;height:88px;transform:translateX(-50%);opacity:0;will-change:top,transform,opacity;animation:bossObjectFall var(--fall-time,4.2s) linear forwards}
.boss-object::before{content:"";position:absolute;z-index:-1;inset:4px;border-radius:50%;filter:blur(10px);opacity:.9}
.boss-object.barrel::before{background:radial-gradient(circle,rgba(255,72,72,.52),rgba(183,20,43,.22) 48%,transparent 72%)}
.boss-object.shell::before{background:radial-gradient(circle,rgba(255,229,133,.7),rgba(239,200,103,.26) 48%,transparent 72%)}
.boss-object .object-art{width:100%;height:100%;display:grid;place-items:center;transform-origin:center bottom}
.boss-object .object-art svg{display:block;width:100%;height:100%;overflow:visible;filter:drop-shadow(0 10px 9px rgba(0,8,16,.32))}
.boss-object.barrel .object-art{animation:barrelWobble .27s ease-in-out infinite alternate}
.boss-object.shell .object-art{animation:shellTreasureFloat .7s ease-in-out infinite alternate}
.boss-object.shell{width:62px;height:70px}
.boss-fuse-flame{transform-box:fill-box;transform-origin:center;animation:fuseFlame .12s ease-in-out infinite alternate}
.boss-object.collected{animation:none!important;opacity:1;top:76%}
.boss-object.collected .object-art{animation:shellCollect .42s ease-out forwards!important}
.boss-object.exploding{animation:none!important;opacity:1;top:79%}
.boss-object.exploding .object-art{opacity:0;transform:scale(.2)}
.boss-explosion-ring{position:absolute;left:50%;top:50%;width:20px;height:20px;border:4px solid #ffb55f;border-radius:50%;transform:translate(-50%,-50%);animation:bossExplosionRing .46s ease-out forwards;box-shadow:0 0 24px rgba(255,67,48,.8)}
.boss-explosion-particle{position:absolute;left:50%;top:50%;width:7px;height:14px;border-radius:2px;background:var(--spark,#ff6b4a);box-shadow:0 0 8px var(--spark,#ff6b4a);transform:translate(-50%,-50%);animation:bossExplosionParticle .52s ease-out forwards}
.boss-collect-spark{position:absolute;left:50%;top:50%;width:6px;height:10px;border-radius:2px;background:#ffe18a;box-shadow:0 0 9px #ffe18a;transform:translate(-50%,-50%);animation:bossCollectSpark .48s ease-out forwards}
@keyframes bossObjectFall{0%{top:19%;opacity:0;transform:translateX(-50%) scale(.68)}9%{opacity:1}100%{top:82%;opacity:1;transform:translateX(-50%) scale(1.05)}}
@keyframes barrelWobble{from{transform:rotate(-5deg) translateX(-2px)}to{transform:rotate(5deg) translateX(2px)}}
@keyframes shellTreasureFloat{from{transform:translateY(-3px) rotate(-4deg) scale(.96)}to{transform:translateY(4px) rotate(4deg) scale(1.04)}}
@keyframes fuseFlame{from{transform:scale(.72) rotate(-8deg);opacity:.78}to{transform:scale(1.18) rotate(8deg);opacity:1}}
@keyframes shellCollect{0%{opacity:1;transform:scale(1)}55%{opacity:1;transform:scale(1.28) translateY(-10px)}100%{opacity:0;transform:scale(.25) translateY(-34px)}}
@keyframes bossExplosionRing{0%{opacity:1;transform:translate(-50%,-50%) scale(.2)}100%{opacity:0;transform:translate(-50%,-50%) scale(4.7)}}
@keyframes bossExplosionParticle{0%{opacity:1;transform:translate(-50%,-50%) scale(.6)}100%{opacity:0;transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) rotate(var(--rot)) scale(.25)}}
@keyframes bossCollectSpark{0%{opacity:1;transform:translate(-50%,-50%) scale(.4)}100%{opacity:0;transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) rotate(var(--rot)) scale(.15)}}
.paused .boss-object,.paused .boss-object *{animation-play-state:paused!important}
@media(max-width:520px){
  .runner-limb{top:40px;width:15px;height:43px}.runner-limb-left{left:18px}.runner-limb-right{right:18px}
  .boss-limb{top:40px;width:13px;height:45px}.boss-limb-left{left:14px}.boss-limb-right{right:14px}
  .boss-object{width:61px;height:76px}.boss-object.shell{width:53px;height:61px}
}
@media(prefers-reduced-motion:reduce){
  .runner-limb,.boss-limb,.runner.reaction-correct>img,.runner.reaction-wrong>img,.boss-side.boss-react-startled>img,.boss-side.boss-react-laugh>img{animation-duration:.18s!important}
  .boss-object .object-art{animation-duration:.35s!important}
}
`;
html = html.replace('</style>', `${css}\n</style>`);

const jsAnchor = "function playHitFx(good,selected,correctGate){";
if (!html.includes(jsAnchor)) throw new Error('playHitFx anchor missing');

const gameplayJs = String.raw`
let bossObjectSpawnTimer=null,bossObjectCollisionTimer=null,bossObjectInitialTimer=null,bossObjectCounter=0;
function playCharacterReactions(good){
  const runner=$('runner'),boss=$('bossSide');
  if(runner){runner.classList.remove('reaction-correct','reaction-wrong');void runner.offsetWidth;runner.classList.add(good?'reaction-correct':'reaction-wrong')}
  if(s?.boss&&boss?.classList.contains('show')){boss.classList.remove('boss-react-startled','boss-react-laugh');void boss.offsetWidth;boss.classList.add(good?'boss-react-startled':'boss-react-laugh')}
  setTimeout(()=>{runner?.classList.remove('reaction-correct','reaction-wrong');boss?.classList.remove('boss-react-startled','boss-react-laugh')},840)
}
function createBarrelSvg(id){return '<svg viewBox="0 0 96 118" aria-hidden="true"><defs><linearGradient id="wood'+id+'" x1="0" x2="1"><stop offset="0" stop-color="#5e260f"/><stop offset=".24" stop-color="#a64e22"/><stop offset=".5" stop-color="#d17832"/><stop offset=".78" stop-color="#9f441d"/><stop offset="1" stop-color="#4c1d0d"/></linearGradient><linearGradient id="metal'+id+'" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#f2c96d"/><stop offset=".45" stop-color="#8d6729"/><stop offset="1" stop-color="#37240d"/></linearGradient><radialGradient id="ember'+id+'"><stop stop-color="#fff6a5"/><stop offset=".35" stop-color="#ff9d37"/><stop offset="1" stop-color="#ff3b32"/></radialGradient></defs><path d="M24 21C32 14 64 14 72 21L78 95C70 106 26 106 18 95Z" fill="url(#wood'+id+')" stroke="#2b1209" stroke-width="3"/><ellipse cx="48" cy="22" rx="25" ry="8" fill="#8a3d1b" stroke="#2b1209" stroke-width="3"/><path d="M29 25L25 93M40 23L38 98M56 23L58 98M67 25L72 93" stroke="#3d170b" stroke-width="2" opacity=".6"/><path d="M19 41Q48 47 77 41M18 78Q48 84 78 78" fill="none" stroke="url(#metal'+id+')" stroke-width="7"/><circle cx="48" cy="61" r="13" fill="#32160d" opacity=".74"/><path d="M40 57c0-5 4-9 8-9s8 4 8 9c0 4-2 6-4 8l4 5h-5l-3-3-3 3h-5l4-5c-2-2-4-4-4-8Z" fill="#f0d792"/><circle cx="45" cy="57" r="2" fill="#32160d"/><circle cx="51" cy="57" r="2" fill="#32160d"/><path d="M57 21c9-7 10-15 18-15" fill="none" stroke="#28150b" stroke-width="4" stroke-linecap="round"/><circle class="boss-fuse-flame" cx="77" cy="5" r="7" fill="url(#ember'+id+')"/><circle class="boss-fuse-flame" cx="77" cy="5" r="3" fill="#fff6b6"/></svg>'}
function createShellSvg(id){return '<svg viewBox="0 0 100 90" aria-hidden="true"><defs><radialGradient id="shell'+id+'" cx="45%" cy="28%"><stop stop-color="#fff9d9"/><stop offset=".38" stop-color="#ffe18a"/><stop offset=".72" stop-color="#d9a535"/><stop offset="1" stop-color="#8b5a13"/></radialGradient><linearGradient id="shine'+id+'" x1="0" x2="1"><stop stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><path d="M50 10C24 10 11 29 13 51c2 18 16 28 37 28s35-10 37-28C89 29 76 10 50 10Z" fill="url(#shell'+id+')" stroke="#7c5517" stroke-width="3"/><path d="M50 13v63M35 16l8 60M65 16l-8 60M23 27l17 50M77 27L60 77" stroke="#a9731d" stroke-width="3" opacity=".78"/><path d="M26 27c12-11 35-15 50-4" fill="none" stroke="url(#shine'+id+')" stroke-width="5" stroke-linecap="round" opacity=".72"/><path d="M28 77h44c-5 8-13 10-22 10s-17-2-22-10Z" fill="#b57b20" stroke="#744812" stroke-width="2"/></svg>'}
function ensureBossObjectLayer(){return $('bossObjectLayer')}
function bossRectsOverlap(a,b){const padX=Math.min(a.width,b.width)*.2,padY=Math.min(a.height,b.height)*.18;return a.left+padX<b.right-padX&&a.right-padX>b.left+padX&&a.top+padY<b.bottom-padY&&a.bottom-padY>b.top+padY}
function bossBurst(el,good){for(let i=0;i<(good?12:16);i++){const p=document.createElement('span');p.className=good?'boss-collect-spark':'boss-explosion-particle';const angle=Math.PI*2*i/(good?12:16)+(Math.random()-.5)*.22,dist=(good?28:34)+Math.random()*(good?34:48);p.style.setProperty('--dx',Math.round(Math.cos(angle)*dist)+'px');p.style.setProperty('--dy',Math.round(Math.sin(angle)*dist)+'px');p.style.setProperty('--rot',Math.round(Math.random()*300-150)+'deg');if(!good)p.style.setProperty('--spark',['#ff513d','#ff9a48','#ffd06b','#e73642'][i%4]);el.appendChild(p)}}
function collectBossShell(el){if(!el||el.dataset.resolved)return;el.dataset.resolved='1';el.classList.add('collected');bossBurst(el,true);s.shells+=1;s.score+=75;s.xp+=2;render();feedback('🐚 Muschel eingesammelt! +75');vibrate(24);setTimeout(()=>el.remove(),460)}
function explodeBossBarrel(el,hit){if(!el||el.dataset.resolved)return;el.dataset.resolved='1';el.classList.add('exploding');const ring=document.createElement('span');ring.className='boss-explosion-ring';el.appendChild(ring);bossBurst(el,false);if(hit&&s?.boss){s.bossMiss=Math.min(3,s.bossMiss+1);s.combo=0;render();feedback('💥 Explosives Fass! Boss-Versuch verloren');playCharacterReactions(false);vibrate([62,34,76]);if(s.bossMiss>=3)stopBossObjects(false)}setTimeout(()=>el.remove(),560)}
function spawnBossObject(){if(!s?.boss||!s.run||s.paused||s.bossResult||s.bossMiss>=3)return;const layer=ensureBossObjectLayer();if(!layer||layer.children.length>=4)return;const kind=Math.random()<.58?'barrel':'shell',lane=Math.floor(Math.random()*3),id=++bossObjectCounter,el=document.createElement('div');el.className='boss-object '+kind;el.dataset.kind=kind;el.dataset.lane=String(lane);el.style.setProperty('--lane-left',laneLeft[lane]);el.style.setProperty('--fall-time',(kind==='barrel'?3.55+Math.random()*.7:3.9+Math.random()*.9).toFixed(2)+'s');el.innerHTML='<div class="object-art">'+(kind==='barrel'?createBarrelSvg(id):createShellSvg(id))+'</div>';el.addEventListener('animationend',event=>{if(event.animationName!=='bossObjectFall'||el.dataset.resolved)return;if(kind==='barrel')explodeBossBarrel(el,false);else el.remove()},{once:true});layer.appendChild(el)}
function checkBossObjectCollisions(){if(!s?.boss||!s.run||s.paused||s.bossResult)return;const runner=$('runner');if(!runner)return;const rr=runner.getBoundingClientRect();ensureBossObjectLayer()?.querySelectorAll('.boss-object:not([data-resolved])').forEach(el=>{const r=el.getBoundingClientRect();if(r.top<rr.top-30||r.bottom>rr.bottom+34)return;if(!bossRectsOverlap(r,rr))return;if(el.dataset.kind==='shell')collectBossShell(el);else explodeBossBarrel(el,true)})}
function startBossObjects(){stopBossObjects();const layer=ensureBossObjectLayer();if(!layer)return;layer.innerHTML='';bossObjectInitialTimer=setTimeout(spawnBossObject,520);bossObjectSpawnTimer=setInterval(spawnBossObject,1320);bossObjectCollisionTimer=setInterval(checkBossObjectCollisions,65)}
function stopBossObjects(clearLayer=true){clearTimeout(bossObjectInitialTimer);clearInterval(bossObjectSpawnTimer);clearInterval(bossObjectCollisionTimer);bossObjectInitialTimer=bossObjectSpawnTimer=bossObjectCollisionTimer=null;if(clearLayer)ensureBossObjectLayer()?.replaceChildren()}
`;
html = html.replace(jsAnchor, `${gameplayJs}\n${jsAnchor}`);

const hitCall = 'playHitFx(correct,selected,correctGate);';
if (!html.includes(hitCall)) throw new Error('resolve hit-FX call anchor missing');
html = html.replace(hitCall, `${hitCall}playCharacterReactions(correct);`);

const startBossNeedle = "s.boss=true;s.bossMiss=0;bossRound=0;s.run=true;$('bossIntro').classList.add('hidden');$('bossSide').classList.add('show');render();spawn()}";
const startBossReplacement = "s.boss=true;s.bossMiss=0;bossRound=0;s.run=true;$('bossIntro').classList.add('hidden');$('bossSide').classList.add('show');$('bossSide').classList.toggle('final-boss',bossIndex===BOSS_PROFILES.length-1);render();spawn();startBossObjects()}";
if (!html.includes(startBossNeedle)) throw new Error('startBoss lifecycle anchor missing');
html = html.replace(startBossNeedle, startBossReplacement);

const resultNeedle = "s.run=false;s.paused=false;s.bossResult=true;$('bossSide').classList.remove('show');";
const resultReplacement = "s.run=false;s.paused=false;s.bossResult=true;stopBossObjects();$('bossSide').classList.remove('show','final-boss');";
if (!html.includes(resultNeedle)) throw new Error('boss result lifecycle anchor missing');
html = html.replace(resultNeedle, resultReplacement);

const continueNeedle = "function continueAfterBoss(){$('bossResult').classList.add('hidden');";
const continueReplacement = "function continueAfterBoss(){stopBossObjects();$('bossResult').classList.add('hidden');";
if (!html.includes(continueNeedle)) throw new Error('continueAfterBoss anchor missing');
html = html.replace(continueNeedle, continueReplacement);

const resetNeedle = 'function reset(){clearTimeout(timer);';
if (!html.includes(resetNeedle)) throw new Error('reset anchor missing');
html = html.replace(resetNeedle, 'function reset(){clearTimeout(timer);stopBossObjects();');

const gameoverNeedle = 'function gameover(){s.run=false;s.paused=false;clearTimeout(timer);';
if (!html.includes(gameoverNeedle)) throw new Error('gameover anchor missing');
html = html.replace(gameoverNeedle, 'function gameover(){stopBossObjects();s.run=false;s.paused=false;clearTimeout(timer);');

await fs.writeFile(path, html, 'utf8');
console.log('Applied boss result spacing, character reactions, boss reactions and boss-only barrels/shell collectibles.');
