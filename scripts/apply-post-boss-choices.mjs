import fs from 'node:fs/promises';

const path='index.html';
let html=await fs.readFile(path,'utf8');
const marker='/* Shell Runner post-boss choices v2.2 */';
if(html.includes(marker)){console.log('Post-boss choices already present.');process.exit(0)}

const gameoverAnchor='<div class="overlay hidden" id="gameover"><div class="modal"><div class="boss-kicker">RUN BEENDET</div><h2>Neue Runde?</h2><p id="summary"></p><button id="restart">↻ Neustart</button></div></div>';
if(!html.includes(gameoverAnchor))throw new Error('Gameover anchor missing');
const overlays=`<div class="overlay hidden" id="treasureChoice"><div class="modal choice-modal"><div class="boss-kicker">SCHATZ DER REISE</div><h2>Wähle deinen Vorteil</h2><p>Ein Bonus begleitet dich für den Rest dieses Laufs.</p><div class="choice-grid" id="treasureChoices"></div></div></div>\n<div class="overlay hidden" id="routeChoice"><div class="modal choice-modal"><div class="boss-kicker">NÄCHSTER ABSCHNITT</div><h2>Welchen Weg nimmst du?</h2><p>Jeder Pfad verändert Tempo, Risiko und Belohnung bis zum nächsten Boss.</p><div class="choice-grid route-grid" id="routeChoices"></div></div></div>\n`;
html=html.replace(gameoverAnchor,overlays+gameoverAnchor);

const statusAnchor='<span id="helperBadge">✨ Lumi</span><span class="fever-badge" id="feverBadge">🔥 TULA-FIEBER</span>';
if(!html.includes(statusAnchor))throw new Error('Status badge anchor missing');
html=html.replace(statusAnchor,'<span id="helperBadge">✨ Lumi</span><span class="route-badge" id="routeBadge">🌿 Ruhig</span><span class="fever-badge" id="feverBadge">🔥 TULA-FIEBER</span>');

const css=String.raw`
${marker}
.choice-modal{max-width:470px!important;padding:20px 18px 18px!important}.choice-modal h2{margin-bottom:6px!important}.choice-modal>p{margin-bottom:14px!important}.choice-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.choice-card{min-height:142px!important;padding:12px 9px!important;border-radius:20px!important;background:linear-gradient(180deg,rgba(8,70,103,.96),rgba(3,37,61,.98))!important;border:1px solid rgba(239,200,103,.28)!important;color:#effffb!important;box-shadow:inset 0 1px rgba(255,255,255,.08),0 10px 20px rgba(0,8,18,.2)!important;text-align:left!important}.choice-card:hover,.choice-card:focus-visible{border-color:#ffe18a!important;transform:translateY(-2px)}.choice-card .choice-icon{display:block;font-size:1.7rem;line-height:1}.choice-card b{display:block;margin-top:7px;color:#ffe7a1;font:900 .86rem/1.05 Georgia,serif}.choice-card small{display:block;margin-top:6px;color:#d9f6f0;font-size:.66rem;line-height:1.3;font-weight:700}.choice-card em{display:block;margin-top:7px;color:#82ddcd;font-size:.57rem;font-style:normal;font-weight:1000;letter-spacing:.05em}.route-grid .choice-card{min-height:154px}.route-grid .choice-card[data-route="adventure"]{border-color:rgba(255,137,106,.4)!important}.route-grid .choice-card[data-route="treasure"]{border-color:rgba(255,226,126,.46)!important}.route-badge{color:#bfeee6!important}.run-status{flex-wrap:wrap}
@media(max-width:520px){.choice-modal{padding:17px 12px 14px!important}.choice-grid{gap:6px}.choice-card{min-height:132px!important;padding:10px 7px!important;border-radius:17px!important}.choice-card .choice-icon{font-size:1.45rem}.choice-card b{font-size:.72rem}.choice-card small{font-size:.57rem}.choice-card em{font-size:.5rem}.route-grid .choice-card{min-height:142px!important}.run-status span.route-badge{display:none}}
`;
html=html.replace('</style>',css+'\n</style>');

const helperFuncAnchor="function helperName(){return s?.helper==='milo'?'🛡 Milo':s?.helper==='nera'?'🐚 Nera':'✨ Lumi'}";
if(!html.includes(helperFuncAnchor))throw new Error('helperName anchor missing');
const postFns=String.raw`
const RUN_PERKS=[
  {id:'goldener-kompass',icon:'🧭',name:'Goldener Kompass',desc:'Das richtige Tor pulsiert gelegentlich ganz leicht.',tag:'Orientierung'},
  {id:'muschelmagnet',icon:'🧲',name:'Muschelmagnet',desc:'Boss-Muscheln lassen sich auch aus der Nachbarspur einsammeln.',tag:'Sammeln'},
  {id:'schutzschild',icon:'🛡',name:'Tulas Schutzschild',desc:'Blockiert einmal pro Boss einen Fass-Treffer.',tag:'Schutz'},
  {id:'zeitmuschel',icon:'⏳',name:'Zeitmuschel',desc:'Die Tore bewegen sich dauerhaft etwas langsamer.',tag:'Tempo'},
  {id:'kombokette',icon:'🔗',name:'Kombokette',desc:'Ein Fehler halbiert die Combo statt sie komplett zu löschen.',tag:'Combo'},
  {id:'piratenblick',icon:'👁',name:'Piratenblick',desc:'Ein falsches Tor wird kurz abgedunkelt.',tag:'Hinweis'},
  {id:'doppelter-schatz',icon:'✨',name:'Doppelter Schatz',desc:'Boss-Muscheln und Goldtore bringen zusätzliche Muscheln.',tag:'Belohnung'}
];
const ROUTES=[
  {id:'calm',icon:'🌿',name:'Ruhiger Pfad',desc:'Etwas langsamere Tore. Ideal zum sicheren Lernen.',tag:'Tempo −8 %'},
  {id:'adventure',icon:'⚔️',name:'Abenteuerpfad',desc:'Schnellere Tore und mehr Punkte für richtige Antworten.',tag:'Punkte +25 %'},
  {id:'treasure',icon:'🏴‍☠️',name:'Schatzpfad',desc:'Mehr Goldtore und zusätzliche Muscheln, aber etwas mehr Tempo.',tag:'Mehr Beute'}
];
function routeName(){return s?.route==='adventure'?'⚔ Abenteuer':s?.route==='treasure'?'🏴‍☠️ Schatz':'🌿 Ruhig'}
function riskChance(){return s?.route==='treasure'?.34:s?.route==='adventure'?.27:.18}
function showTreasureChoice(){s.postBossChoice=true;s.run=false;s.paused=false;updatePause();const pool=shuffle(RUN_PERKS.filter(p=>!perkActive(p.id))).slice(0,3);const choices=pool.length?pool:shuffle(RUN_PERKS).slice(0,3),box=$('treasureChoices');box.innerHTML='';choices.forEach(perk=>{const b=document.createElement('button');b.type='button';b.className='choice-card';b.dataset.perk=perk.id;b.innerHTML='<span class="choice-icon">'+perk.icon+'</span><b>'+perk.name+'</b><small>'+perk.desc+'</small><em>'+perk.tag+'</em>';b.onclick=()=>chooseTreasurePerk(perk.id);box.appendChild(b)});$('treasureChoice').classList.remove('hidden')}
function chooseTreasurePerk(id){if(!s.perks.includes(id))s.perks.push(id);if(id==='schutzschild')s.perkShieldUsed=false;if(id==='kombokette')s.comboShield=Math.max(1,s.comboShield||0);$('treasureChoice').classList.add('hidden');feedback('✨ Bonus gewählt!');showRouteChoice()}
function showRouteChoice(){const box=$('routeChoices');box.innerHTML='';ROUTES.forEach(route=>{const b=document.createElement('button');b.type='button';b.className='choice-card';b.dataset.route=route.id;b.innerHTML='<span class="choice-icon">'+route.icon+'</span><b>'+route.name+'</b><small>'+route.desc+'</small><em>'+route.tag+'</em>';b.onclick=()=>chooseRoute(route.id);box.appendChild(b)});$('routeChoice').classList.remove('hidden')}
function chooseRoute(id){s.route=ROUTES.some(r=>r.id===id)?id:'calm';$('routeChoice').classList.add('hidden');s.postBossChoice=false;bossIndex=(bossIndex+1)%BOSS_PROFILES.length;BOSS_IMG=currentBoss().image;s.run=true;s.paused=false;document.getElementById('app').classList.remove('paused');render();updatePause();feedback(routeName()+' gewählt');spawn()}
`;
html=html.replace(helperFuncAnchor,helperFuncAnchor+'\n'+postFns);

const renderNeedle="if($('helperBadge'))$('helperBadge').textContent=helperName();syncFever();";
if(!html.includes(renderNeedle))throw new Error('Render extension anchor missing');
html=html.replace(renderNeedle,"if($('helperBadge'))$('helperBadge').textContent=helperName();if($('routeBadge'))$('routeBadge').textContent=routeName();syncFever();");

const updatePauseOld="function updatePause(){const b=$('pause');if(!s.run&&!s.paused){b.textContent='Abenteuer starten';b.disabled=false;return}if(s.paused){b.textContent='Weiter';b.disabled=false;return}b.textContent='Pause ('+s.pauseLeft+')';b.disabled=s.pauseLeft<=0;}";
const updatePauseNew="function updatePause(){const b=$('pause');if(s?.postBossChoice){b.textContent='Wähle deinen Weg …';b.disabled=true;return}if(!s.run&&!s.paused){b.textContent='Abenteuer starten';b.disabled=false;return}if(s.paused){b.textContent='Weiter';b.disabled=false;return}b.textContent='Pause ('+s.pauseLeft+')';b.disabled=s.pauseLeft<=0;}";
if(!html.includes(updatePauseOld))throw new Error('updatePause anchor missing');html=html.replace(updatePauseOld,updatePauseNew);

if(!html.includes("Math.random()<.22"))throw new Error('Risk chance anchor missing');html=html.replace("Math.random()<.22","Math.random()<riskChance()");
if(!html.includes("let shellGain=1+(s.helper==='nera'?1:0);"))throw new Error('Shell gain anchor missing');html=html.replace("let shellGain=1+(s.helper==='nera'?1:0);","let shellGain=1+(s.route==='treasure'?1:0)+(s.helper==='nera'?1:0);");

const continueOld="function continueAfterBoss(){stopBossObjects();$('bossResult').classList.add('hidden');$('bossResultFx').innerHTML='';bossIndex=(bossIndex+1)%BOSS_PROFILES.length;BOSS_IMG=currentBoss().image;s.bossResult=false;s.run=true;s.paused=false;document.getElementById('app').classList.remove('paused');updatePause();spawn()}";
const continueNew="function continueAfterBoss(){stopBossObjects();$('bossResult').classList.add('hidden');$('bossResultFx').innerHTML='';s.bossResult=false;showTreasureChoice()}";
if(!html.includes(continueOld))throw new Error('continueAfterBoss anchor missing');html=html.replace(continueOld,continueNew);

const pauseOld="function pauseToggle(){if(s?.bossResult)return;";
if(!html.includes(pauseOld))throw new Error('pauseToggle anchor missing');html=html.replace(pauseOld,"function pauseToggle(){if(s?.bossResult||s?.postBossChoice)return;");

await fs.writeFile(path,html,'utf8');
console.log('Applied post-boss treasure perks and route choices.');
