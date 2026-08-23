import fs from 'node:fs/promises';

const path='index.html';
let html=await fs.readFile(path,'utf8');
const marker='/* Shell Runner boss fairness + tap control v2.4 */';
if(html.includes(marker)){console.log('Boss fairness and tap control already present.');process.exit(0)}

const css=String.raw`
${marker}
/* Keep the learning decision readable before boss hazards can punish the player. */
.tap-lane-pulse{position:absolute;z-index:13;bottom:7.5%;width:92px;height:54px;transform:translateX(-50%);border:2px solid rgba(255,233,157,.72);border-radius:50%;pointer-events:none;opacity:0;background:radial-gradient(circle,rgba(121,217,199,.24),rgba(239,200,103,.13) 46%,transparent 72%);box-shadow:0 0 24px rgba(121,217,199,.26);animation:tapLanePulse .42s ease-out forwards}
@keyframes tapLanePulse{0%{opacity:0;transform:translateX(-50%) scale(.55)}18%{opacity:1}100%{opacity:0;transform:translateX(-50%) scale(1.28)}}
@media(max-width:520px){.tap-lane-pulse{width:78px;height:46px;bottom:8%}}
@media(prefers-reduced-motion:reduce){.tap-lane-pulse{animation-duration:.14s!important}}
`;
html=html.replace('</style>',css+'\n</style>');

const durationAnchor="if(q.risk)dur*=.86;g.style.setProperty('--dur',dur+'s');";
if(!html.includes(durationAnchor))throw new Error('Boss question timing anchor missing');
html=html.replace(durationAnchor,"if(q.risk)dur*=.86;if(s.boss)s.bossQuestionSafeUntil=Date.now()+Math.max(1350,dur*560);g.style.setProperty('--dur',dur+'s');");

const objectBlock=/function spawnBossObject\(\)\{.*?\}\nfunction checkBossObjectCollisions\(\)\{.*?\}\nfunction startBossObjects\(\)\{.*?\}\nfunction stopBossObjects/s;
if(!objectBlock.test(html))throw new Error('Boss object function block missing');
const fairObjects=String.raw`function spawnBossObject(){if(!s?.boss||!s.run||s.paused||s.bossResult||s.bossMiss>=3)return;const layer=ensureBossObjectLayer();if(!layer||layer.children.length>=4)return;const now=Date.now();if(now<Number(s.bossQuestionSafeUntil||0)-250)return;let kind=chooseBossObjectKind();const activeHazards=[...layer.querySelectorAll('.boss-object:not([data-resolved])')].filter(item=>isBarrelKind(item.dataset.kind)).length;if(isBarrelKind(kind)&&activeHazards>=2)kind=Math.random()<.28?'gold-shell':'shell';const lane=Math.floor(Math.random()*3),id=++bossObjectCounter,el=document.createElement('div');el.className='boss-object '+kind+(isShellKind(kind)?' shell-pulse':'');el.dataset.kind=kind;el.dataset.lane=String(lane);el.dataset.spawnedAt=String(now);el.style.setProperty('--lane-left',laneLeft[lane]);el.style.setProperty('--fall-time',(isBarrelKind(kind)?4.75+Math.random()*.65:4.1+Math.random()*.8).toFixed(2)+'s');el.innerHTML='<div class="object-art">'+(isBarrelKind(kind)?createBarrelSvg(id):createShellSvg(id))+'</div>';if(kind==='roll-barrel')setTimeout(()=>{if(el.isConnected&&!el.dataset.resolved){const next=Math.max(0,Math.min(2,Number(el.dataset.lane)+(Math.random()<.5?-1:1)));el.dataset.lane=String(next);el.style.setProperty('--lane-left',laneLeft[next])}},1850);el.addEventListener('animationend',event=>{if(event.animationName!=='bossObjectFall'||el.dataset.resolved)return;if(isBarrelKind(kind))explodeBossHazard(el,false);else{if(kind==='thief-shell')mechanicBanner('💰 Vargas schnappt die Muschel!',780);el.remove()}},{once:true});layer.appendChild(el)}
function checkBossObjectCollisions(){if(!s?.boss||!s.run||s.paused||s.bossResult)return;const runner=$('runner');if(!runner)return;const rr=runner.getBoundingClientRect(),magnet=perkActive('muschelmagnet')?52:0,safeUntil=Number(s.bossQuestionSafeUntil||0);ensureBossObjectLayer()?.querySelectorAll('.boss-object:not([data-resolved])').forEach(el=>{const kind=el.dataset.kind||'';if(!isShellKind(kind)&&Date.now()<safeUntil)return;let r=el.getBoundingClientRect();if(r.top<rr.top-36||r.bottom>rr.bottom+38)return;if(isShellKind(kind)&&magnet){r={left:r.left-magnet,right:r.right+magnet,top:r.top,bottom:r.bottom,width:r.width+magnet*2,height:r.height}}if(!bossRectsOverlap(r,rr))return;if(isShellKind(kind))collectBossTreasure(el);else explodeBossHazard(el,true)})}
function startBossObjects(){stopBossObjects();const layer=ensureBossObjectLayer();if(!layer)return;layer.innerHTML='';const interval=bossIndex===0?1350:bossIndex===9?1450:bossIndex===4?1500:1650;bossObjectInitialTimer=setTimeout(spawnBossObject,1000);bossObjectSpawnTimer=setInterval(spawnBossObject,interval);bossObjectCollisionTimer=setInterval(checkBossObjectCollisions,60)}
function stopBossObjects`;
html=html.replace(objectBlock,fairObjects);

const controlsAnchor="$('introStart').onclick=start;$('pause').onclick=pauseToggle;$('bossStart').onclick=startBoss;$('bossContinue').onclick=continueAfterBoss;$('restart').onclick=start;";
if(!html.includes(controlsAnchor))throw new Error('Input binding anchor missing');
const tapControls=String.raw`
let tapPointerStart=null;
function tapLaneFromPoint(clientX,clientY){const arena=$('arena');if(!arena)return null;const rect=arena.getBoundingClientRect(),x=(clientX-rect.left)/rect.width,y=(clientY-rect.top)/rect.height;if(x<0||x>1||y<.56||y>1)return null;return x<1/3?0:x<2/3?1:2}
function showTapLanePulse(lane){const arena=$('arena');if(!arena)return;const pulse=document.createElement('span');pulse.className='tap-lane-pulse';pulse.setAttribute('aria-hidden','true');pulse.style.left=laneLeft[lane];arena.appendChild(pulse);setTimeout(()=>pulse.remove(),480)}
function installTapLaneControl(){const arena=$('arena');if(!arena||arena.dataset.tapLaneControl==='1')return;arena.dataset.tapLaneControl='1';arena.addEventListener('pointerdown',e=>{const target=e.target instanceof Element?e.target:null;if(target?.closest('.gate,button')){tapPointerStart=null;return}const lane=tapLaneFromPoint(e.clientX,e.clientY);tapPointerStart=lane===null?null:{id:e.pointerId,x:e.clientX,y:e.clientY}});arena.addEventListener('pointerup',e=>{const start=tapPointerStart;tapPointerStart=null;if(!start||start.id!==e.pointerId)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;if(Math.hypot(dx,dy)>22)return;const target=e.target instanceof Element?e.target:null;if(target?.closest('.gate,button'))return;const lane=tapLaneFromPoint(e.clientX,e.clientY);if(lane===null||!s?.run||s.paused||s.bossResult||s.postBossChoice)return;move(lane);showTapLanePulse(lane);vibrate(12)});arena.addEventListener('pointercancel',()=>{tapPointerStart=null})}
installTapLaneControl();
`;
html=html.replace(controlsAnchor,tapControls+'\n'+controlsAnchor);

await fs.writeFile(path,html,'utf8');
console.log('Applied fair boss hazard timing and lower-field tap/click lane control.');
