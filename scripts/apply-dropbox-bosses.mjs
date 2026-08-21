import fs from 'node:fs/promises';

const path = 'index.html';
let html = await fs.readFile(path, 'utf8');

const requiredBossAssets = [
  "assets/bosses/boss-01-pirat-kai.png",
  "assets/bosses/boss-02-kapitaen-brax.png",
  "assets/bosses/boss-03-blackfinn.png",
  "assets/bosses/boss-04-alt-kapitaen-roderick.png",
  "assets/bosses/boss-05-piratenbaron-vargas.png",
  "assets/bosses/boss-06-kapitaen-ironhook.png",
  "assets/bosses/boss-07-admiral-thorne.png",
  "assets/bosses/boss-08-kartenmeister-corvin.png",
  "assets/bosses/boss-09-schattenfuerst-azrak.png",
  "assets/bosses/boss-10-piratenkoenig-varkos.png"
];
for (const file of requiredBossAssets) {
  await fs.access(file);
}

const profiles = [{"name":"Pirat Kai","role":"Pirat","image":"./assets/bosses/boss-01-pirat-kai.png"},{"name":"Kapitän Brax","role":"Kapitän","image":"./assets/bosses/boss-02-kapitaen-brax.png"},{"name":"Blackfinn","role":"Pirat","image":"./assets/bosses/boss-03-blackfinn.png"},{"name":"Alt-Kapitän Roderick","role":"Alt-Kapitän","image":"./assets/bosses/boss-04-alt-kapitaen-roderick.png"},{"name":"Piratenbaron Vargas","role":"Piratenbaron","image":"./assets/bosses/boss-05-piratenbaron-vargas.png"},{"name":"Kapitän Ironhook","role":"Kapitän","image":"./assets/bosses/boss-06-kapitaen-ironhook.png"},{"name":"Admiral Thorne","role":"Admiral","image":"./assets/bosses/boss-07-admiral-thorne.png"},{"name":"Kartenmeister Corvin","role":"Kartenmeister","image":"./assets/bosses/boss-08-kartenmeister-corvin.png"},{"name":"Schattenfürst Azrak","role":"Schattenfürst","image":"./assets/bosses/boss-09-schattenfuerst-azrak.png"},{"name":"Piratenkönig Varkos","role":"Piratenkönig","image":"./assets/bosses/boss-10-piratenkoenig-varkos.png"}];
const profilesCode = `const BOSS_PROFILES=${JSON.stringify(profiles)};let bossIndex=0;const currentBoss=()=>BOSS_PROFILES[bossIndex%BOSS_PROFILES.length];let BOSS_IMG=currentBoss().image;`;

if (!/const BOSS_IMG='[^']+';/.test(html)) {
  throw new Error('BOSS_IMG anchor missing for Dropbox boss profiles');
}
html = html.replace(/const BOSS_IMG='[^']+';/, profilesCode);

const oldIntro = "function showBossIntro(){s.run=false;bossTheme=['TIERWELT','ESSEN','REISEN','SCHULE','NATUR'][Math.floor(Math.random()*5)];$('bossTheme').textContent=bossTheme;$('bossIntroImg').src=BOSS_IMG;$('bossSideImg').src=BOSS_IMG;$('bossIntro').classList.remove('hidden');updatePause()}";
const newIntro = "function showBossIntro(){s.run=false;const boss=currentBoss();BOSS_IMG=boss.image;bossTheme=['TIERWELT','ESSEN','REISEN','SCHULE','NATUR'][Math.floor(Math.random()*5)];$('bossTheme').textContent=bossTheme;$('bossName').textContent=boss.name+' fordert dich heraus!';$('bossIntroImg').src=boss.image;$('bossIntroImg').alt=boss.name;$('bossSideImg').src=boss.image;$('bossSideImg').alt=boss.name;$('bossIntro').classList.remove('hidden');updatePause()}";
if (!html.includes(oldIntro)) throw new Error('showBossIntro anchor missing');
html = html.replace(oldIntro, newIntro);

const oldStart = "function startBoss(){s.boss=true;s.bossMiss=0;bossRound=0;s.run=true;$('bossIntro').classList.add('hidden');$('bossSide').classList.add('show');render();spawn()}";
const newStart = "function startBoss(){const boss=currentBoss();BOSS_IMG=boss.image;$('bossSideImg').src=boss.image;$('bossSideImg').alt=boss.name;s.boss=true;s.bossMiss=0;bossRound=0;s.run=true;$('bossIntro').classList.add('hidden');$('bossSide').classList.add('show');render();spawn()}";
if (!html.includes(oldStart)) throw new Error('startBoss anchor missing');
html = html.replace(oldStart, newStart);

const oldResult = "function showBossResult(won){clearTimeout(timer);s.run=false;s.paused=false;s.bossResult=true;$('bossSide').classList.remove('show');$('bossResultKicker').textContent=won?'BOSS BESIEGT':'WEITER GEHT’S';$('bossResultTitle').textContent=won?'Du hast Captain Shelldon besiegt!':'Fast geschafft!';$('bossResultCopy').textContent=won?'Stark gespielt! Du bekommst deinen Boss-Bonus und deine Reise geht direkt weiter.':'Captain Shelldon war diesmal stärker – aber du darfst direkt weitermachen. Ich ziehe dir keine Herzen ab, damit deine Reise weitergeht.';$('bossResultReward').classList.toggle('hidden',!won);$('bossResult').classList.remove('hidden');if(won){runBossResultFireworks();vibrate([35,28,35])}else{vibrate(28)}updatePause()}";
const newResult = "function showBossResult(won){clearTimeout(timer);const boss=currentBoss();s.run=false;s.paused=false;s.bossResult=true;$('bossSide').classList.remove('show');$('bossResultPortrait').src=boss.image;$('bossResultPortrait').alt=boss.name;$('bossResultKicker').textContent=won?'BOSS BESIEGT':'WEITER GEHT’S';$('bossResultTitle').textContent=won?'Du hast '+boss.name+' besiegt!':'Fast geschafft!';$('bossResultCopy').textContent=won?'Stark gespielt! Du bekommst deinen Boss-Bonus und deine Reise geht direkt weiter.':boss.name+' war diesmal stärker – aber du darfst direkt weitermachen. Ich ziehe dir keine Herzen ab, damit deine Reise weitergeht.';$('bossResultReward').classList.toggle('hidden',!won);$('bossResult').classList.remove('hidden');if(won){runBossResultFireworks();vibrate([35,28,35])}else{vibrate(28)}updatePause()}";
if (!html.includes(oldResult)) throw new Error('showBossResult anchor missing');
html = html.replace(oldResult, newResult);

const oldContinue = "function continueAfterBoss(){$('bossResult').classList.add('hidden');$('bossResultFx').innerHTML='';s.bossResult=false;s.run=true;s.paused=false;document.getElementById('app').classList.remove('paused');updatePause();spawn()}";
const newContinue = "function continueAfterBoss(){$('bossResult').classList.add('hidden');$('bossResultFx').innerHTML='';bossIndex=(bossIndex+1)%BOSS_PROFILES.length;BOSS_IMG=currentBoss().image;s.bossResult=false;s.run=true;s.paused=false;document.getElementById('app').classList.remove('paused');updatePause();spawn()}";
if (!html.includes(oldContinue)) throw new Error('continueAfterBoss anchor missing');
html = html.replace(oldContinue, newContinue);

html = html.replace(/(<img id="bossResultPortrait" src=")[^"]*(" alt=")[^"]*(")/, `$1${profiles[0].image}$2${profiles[0].name}$3`);

const css = String.raw`
/* Shell Runner Dropbox boss sprites v1.4 */
.boss-art,.boss-side,.boss-result-hero{border:0!important;background:none!important;box-shadow:none!important;overflow:visible!important}
.boss-art img,.boss-side img,.boss-result-hero img{width:100%!important;height:100%!important;object-fit:contain!important;object-position:center bottom!important;filter:drop-shadow(0 16px 14px rgba(0,8,18,.48))}
.boss-art{width:158px!important;height:204px!important;margin:0 auto 5px!important}
.boss-side{width:104px!important;height:142px!important;right:1.4%!important;top:15.5%!important}
.boss-result-hero{width:160px!important;height:180px!important;margin:0 auto 2px!important}
@media(max-width:520px){
  .boss-art{width:138px!important;height:176px!important}
  .boss-side{width:88px!important;height:122px!important;right:.5%!important;top:16.5%!important}
  .boss-result-hero{width:142px!important;height:158px!important}
}
`;
html = html.replace('</style>', `${css}\n</style>`);

await fs.writeFile(path, html, 'utf8');
console.log('Applied 10 Dropbox boss sprites with dynamic level progression.');
