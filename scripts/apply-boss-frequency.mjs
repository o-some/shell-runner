import fs from 'node:fs/promises';

const path = 'index.html';
let html = await fs.readFile(path, 'utf8');

const marker = '/* Shell Runner boss frequency v1.7 */';
if (html.includes(marker)) {
  console.log('Boss frequency polish already present.');
  process.exit(0);
}

const laneAnchor = "const $=id=>document.getElementById(id), shuffle=a=>[...a].sort(()=>Math.random()-.5), laneLeft=['24%','50%','76%'];";
if (!html.includes(laneAnchor)) throw new Error('Boss frequency lane anchor missing');
html = html.replace(laneAnchor, `${laneAnchor}\nconst BOSS_CORRECT_INTERVAL=10;`);

// Keep the historical 3-word copy only as an internal pipeline anchor for the
// following meta-gameplay enhancer. The final v1.4 copy enhancer changes the
// player-visible text to 10 after all legacy anchor-dependent steps have run.
const introOld = 'Nach 15 Wörtern wartet ein Themen-Boss.';
const introNew = 'Nach 3 richtigen Wörtern wartet ein Themen-Boss.';
if (!html.includes(introOld)) throw new Error('Boss frequency intro copy anchor missing');
html = html.replace(introOld, introNew);

const resetOld = 'answered:0,boss:false,bossMiss:0';
const resetNew = 'answered:0,bossCorrect:0,boss:false,bossMiss:0';
if (!html.includes(resetOld)) throw new Error('Boss frequency reset state anchor missing');
html = html.replace(resetOld, resetNew);

const progressOld = "$('progress').style.width=(s.boss?(bossRound/5)*100:(s.answered%15)/15*100)+'%';";
const progressNew = "$('progress').style.width=(s.boss?(bossRound/5)*100:Math.min(100,(s.bossCorrect/BOSS_CORRECT_INTERVAL)*100))+'%';";
if (!html.includes(progressOld)) throw new Error('Boss frequency progress anchor missing');
html = html.replace(progressOld, progressNew);

const countOld = "s.total++;if(q.type==='normal')s.answered++;else bossRound++;render();";
const countNew = "s.total++;if(q.type==='normal'){s.answered++;if(correct)s.bossCorrect++}else bossRound++;render();";
if (!html.includes(countOld)) throw new Error('Boss frequency normal count anchor missing');
html = html.replace(countOld, countNew);

const triggerOld = "if(!s.boss&&s.answered>0&&s.answered%15===0){showBossIntro();return}";
const triggerNew = "if(!s.boss&&s.bossCorrect>=BOSS_CORRECT_INTERVAL){showBossIntro();return}";
if (!html.includes(triggerOld)) throw new Error('Boss frequency trigger anchor missing');
html = html.replace(triggerOld, triggerNew);

const startBossOld = "s.boss=true;s.bossMiss=0;bossRound=0;s.run=true;";
const startBossNew = "s.boss=true;s.bossCorrect=0;s.bossMiss=0;bossRound=0;s.run=true;";
if (!html.includes(startBossOld)) throw new Error('Boss frequency boss-start reset anchor missing');
html = html.replace(startBossOld, startBossNew);

html = html.replace('</style>', `${marker}\n</style>`);

await fs.writeFile(path, html, 'utf8');
console.log('Boss frequency changed to 10 correct normal words.');
