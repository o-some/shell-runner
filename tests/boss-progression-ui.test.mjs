import fs from 'node:fs';

const html=fs.readFileSync('index.html','utf8');
const must=(needle,msg)=>{if(!html.includes(needle))throw new Error(msg)};
const mustNot=(needle,msg)=>{if(html.includes(needle))throw new Error(msg)};

must('Shell Runner boss progression + roster v3.0','Boss progression enhancer marker missing');
must('const BOSS_CORRECT_INTERVAL=10;','Boss interval must be 10 correct normal words');
must('Nach 10 richtigen Wörtern wartet ein Themen-Boss.','Start copy does not explain 10-word boss progression');
must('const BOSS_MAX_HP=10;','Boss max HP must be 10');
must('bossHp:BOSS_MAX_HP','Boss HP state missing');
must("if(q.type==='boss')s.bossHp=Math.max(0,(s.bossHp??BOSS_MAX_HP)-1)",'Correct boss answer does not remove exactly one HP');
must("if(s.boss&&(s.bossHp<=0||s.bossMiss>=3)){endBoss();return}",'Boss fight does not end from HP depletion or miss limit');
must("const won=s.bossHp<=0&&s.bossMiss<3",'Boss victory is not HP based');
must("s.bossHp=BOSS_MAX_HP",'Boss HP is not reset at boss start');
must('id="progressTrack"','Progress track wrapper missing');
must('id="progressLabel"','Progress/HP label missing');
must('boss-health','Boss HP visual state missing');
must("currentBoss().name+' · '+s.bossHp+'/'+BOSS_MAX_HP+' HP'",'Boss HP label is not rendered during combat');
must('id="bossAbilityName"','Boss intro ability name missing');
must('id="bossAbilityText"','Boss intro ability description missing');
must('BOSS_ABILITY_DETAILS','Boss ability catalog missing');
for(const ability of ['Fassregen','Tor-Tausch','Schattenkopien','Revancheprüfung','Muscheljagd','Haken-Zug','Seitenwind','Kartenmischen','Schattenphase','Königsphasen'])must(ability,`Boss ability missing: ${ability}`);
must('Zieh dem Boss mit <b>10 richtigen Wörtern</b> alle 10 HP ab.','Boss intro does not explain the 10-hit objective');
must('id="bossRosterTrack"','Clickable boss roster missing');
must('syncBossRoster','Boss roster synchronization missing');
must("content:'JETZT'",'Current boss badge missing');
must("content:'NÄCHSTER'",'Next boss badge missing');
must('showBossRosterDetail','Boss roster detail interaction missing');
must('class="pause-top"','Pause control was not moved to the top');
must("data-left=\"2\"",'Pause remaining-count badge state missing');
must('applyBossQuestionMechanicV3','Reviewed boss mechanics are not active');
must('safeDelay=Math.max(1500,Math.min(1850,dur*560))','Telegraphed mechanic delay missing');
must('Math.floor((BOSS_MAX_HP-(s.bossHp??BOSS_MAX_HP))/2)','Varkos phases are not tied to HP loss');
mustNot('const BOSS_CORRECT_INTERVAL=3;','Legacy 3-word boss interval remains');
mustNot('bossRound>=5||s.bossMiss>=3','Legacy five-round boss completion remains');
mustNot('<div class="pausebar"><button id="pause">','Legacy bottom pause bar remains');

console.log('Boss progression, HP, roster and mobile boss UI checks: PASS');
