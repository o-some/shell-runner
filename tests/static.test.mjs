import fs from 'node:fs';

const bossAssets = [
  'assets/bosses/boss-01-pirat-kai.png','assets/bosses/boss-02-kapitaen-brax.png','assets/bosses/boss-03-blackfinn.png','assets/bosses/boss-04-alt-kapitaen-roderick.png','assets/bosses/boss-05-piratenbaron-vargas.png','assets/bosses/boss-06-kapitaen-ironhook.png','assets/bosses/boss-07-admiral-thorne.png','assets/bosses/boss-08-kartenmeister-corvin.png','assets/bosses/boss-09-schattenfuerst-azrak.png','assets/bosses/boss-10-piratenkoenig-varkos.png'
];
const reactionAssets=['assets/characters/tula-celebrating.webp','assets/characters/tula-surprised.webp'];
const required=['index.html','source.html','assets/backgrounds/world-jungle-trail.webp','assets/characters/tula-profile.webp','assets/characters/tula-neutral-front.webp',...reactionAssets,'assets/bosses/captain-shelldon.webp',...bossAssets,'HANDOFF.md','docs/MIGRATION_RECORD.md','docs/ASSET_MANIFEST.md','docs/TEST_CHECKLIST.md','.masterbrain/manifest.yml','.masterbrain/game-design.yml','.masterbrain/impact-scope.yml'];
for(const file of required){if(!fs.existsSync(file))throw new Error(`Missing required file: ${file}`)}
for(const file of bossAssets){const data=fs.readFileSync(file);const png=data.length>8&&data[0]===0x89&&data[1]===0x50&&data[2]===0x4e&&data[3]===0x47;if(!png)throw new Error(`Invalid PNG boss asset: ${file}`)}
for(const file of reactionAssets){const data=fs.readFileSync(file);const webp=data.length>12&&data.toString('ascii',0,4)==='RIFF'&&data.toString('ascii',8,12)==='WEBP';if(!webp)throw new Error(`Invalid WEBP Tula reaction asset: ${file}`)}

const html=fs.readFileSync('index.html','utf8');
const source=fs.readFileSync('source.html','utf8');
const must=(needle,msg)=>{if(!html.includes(needle))throw new Error(msg)};
const mustNot=(needle,msg)=>{if(html.includes(needle))throw new Error(msg)};

must('Shell Runner','Shell Runner title missing');
must('Bosskampf starten','Boss start interaction missing');
must('pauseLeft:2','Pause limit of 2 missing');
must('touchstart','Touch handler missing');must('touchend','Touch end handler missing');
must('playHitFx','Enhanced hit feedback missing');must('navigator.vibrate','Mobile haptic feedback missing');
must('firework-particle','Particle fireworks missing');must('miniFirework','Mini fireworks missing');
must('id="bossResult"','Boss result modal missing');must('id="bossContinue"','Boss continue button missing');
must('Ich ziehe dir keine Herzen ab','Positive boss-loss message missing');
must('Shell Runner premium boss cutout v1.3','Premium boss styles missing');
must('Shell Runner Dropbox boss sprites v1.4','Dropbox boss styles missing');
must('const BOSS_PROFILES=[','Dynamic boss profiles missing');must('Pirat Kai','Boss roster start missing');must('Piratenkönig Varkos','Boss roster end missing');
for(const file of bossAssets)must('./'+file,`Runtime does not reference ${file}`);
mustNot('id="bossResultPortrait" src="data:image','Broken embedded boss result asset remains');

must('Shell Runner boss gameplay polish v1.5','Boss gameplay polish missing');
must('boss-react-startled','Boss startled state missing');must('boss-react-laugh','Boss laugh state missing');
must('id="bossObjectLayer"','Boss object layer missing');must('createBarrelSvg','Barrel vector art missing');must('createShellSvg','Shell vector art missing');
must('boss-fuse-flame','Fuse flame missing');must('barrelWobble','Barrel wobble missing');
must('boss-result-hero{position:relative!important;display:grid!important;place-items:end center!important','Boss result non-overlap layout missing');

must('Shell Runner official Tula reaction sprites v1.6','Official Tula reaction polish missing');
must('./assets/characters/tula-celebrating.webp','Celebrating sprite missing');must('./assets/characters/tula-surprised.webp','Surprised sprite missing');
must('TULA_REACTION_SPRITES','Tula sprite switching missing');must('.runner .runner-limb{display:none!important}','Synthetic Tula limbs are not disabled');

must('Shell Runner boss frequency v1.7','Boss frequency enhancer missing');must('const BOSS_CORRECT_INTERVAL=3;','Boss interval must be 3 correct words');
must('bossCorrect:0','Boss correct counter missing');must('if(correct)s.bossCorrect++','Boss progress must increment only on correct normal answers');
must('s.bossCorrect>=BOSS_CORRECT_INTERVAL','Boss trigger does not use correct-word progress');
mustNot('s.answered%15===0','Legacy 15-question boss trigger remains');

must('Shell Runner meta gameplay v2.0','Meta gameplay expansion missing');
must('comboTierName','Combo tiers missing');must('startFever','Tula Fever missing');must('TULA-FIEBER','Fever UI missing');
must('queueRevenge','Revenge word queue missing');must('takeRevenge','Revenge word replay missing');
must('updateMastery','Word mastery missing');must('shellRunnerMasteryV1','Local mastery persistence missing');
must('risk-gate','Risk gate styling missing');must('GOLDTOR · x2','Gold gate reward label missing');
must('helper-select','Helper selection missing');must("data-helper=\"lumi\"",'Lumi helper missing');must("data-helper=\"milo\"",'Milo helper missing');must("data-helper=\"nera\"",'Nera helper missing');

must('Shell Runner unique boss mechanics v2.1','Unique boss mechanics missing');
must('buildBossForCurrent','Roderick revenge mechanic missing');must('swapGatePair','Boss gate swap missing');must('shadow-gate','Blackfinn/Azrak shadow mechanic missing');
must('HAKEN-ZUG','Ironhook hook mechanic missing');must('STURMBÖE','Thorne wind mechanic missing');must('shuffleAllBossGates','Corvin card shuffle missing');must('5 Phasen','Varkos multi-phase mechanic missing');
for(const variant of ['gold-shell','shield-shell','time-shell','combo-shell','thief-shell','roll-barrel','double-barrel','dud-barrel','king-barrel'])must(variant,`Boss object variant missing: ${variant}`);
must('collectBossTreasure','Expanded shell collection missing');must('explodeBossHazard','Expanded barrel interaction missing');

must('Shell Runner post-boss choices v2.2','Post-boss choice system missing');
must('id="treasureChoice"','Treasure choice modal missing');must('id="routeChoice"','Route choice modal missing');
must('RUN_PERKS','Run perk catalog missing');must('Goldener Kompass','Goldener Kompass perk missing');must('Muschelmagnet','Muschelmagnet perk missing');must('Tulas Schutzschild','Shield perk missing');must('Kombokette','Combo chain perk missing');must('Doppelter Schatz','Double treasure perk missing');
must('ROUTES','Route catalog missing');must('Ruhiger Pfad','Calm route missing');must('Abenteuerpfad','Adventure route missing');must('Schatzpfad','Treasure route missing');must('showTreasureChoice','Treasure flow missing');must('showRouteChoice','Route flow missing');

mustNot('raw.githubusercontent.com/o-some/tulasisland','Cross-repo runtime dependency remains');
if(!source.includes('raw.githubusercontent.com/o-some/tulasisland'))throw new Error('source.html no longer looks like untouched migration snapshot');

console.log('Static migration/gameplay smoke checks: PASS');
