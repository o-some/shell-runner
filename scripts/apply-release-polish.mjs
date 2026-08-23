import fs from 'node:fs/promises';

const path='index.html';
let html=await fs.readFile(path,'utf8');
const marker='/* Shell Runner CAF release polish v2.3 */';
if(html.includes(marker)){console.log('CAF release polish already present.');process.exit(0)}

const css=String.raw`
${marker}
/* Gold rounds must never reveal the correct lane: all three gates share the same gold treatment. */
.gates.risk-round{position:absolute}
.gates.risk-round::before{content:"GOLDRUNDE · x2";position:absolute;z-index:4;left:50%;top:-18px;transform:translateX(-50%);padding:4px 9px;border-radius:999px;background:linear-gradient(180deg,#fff0a7,#efc867);color:#082b44;font:1000 .5rem/1 Inter,system-ui,sans-serif;white-space:nowrap;box-shadow:0 5px 14px rgba(0,8,18,.28),0 0 18px rgba(255,226,126,.22)}
.gates.risk-round .gate{border-color:#fff0a8!important;box-shadow:0 7px 0 #805514,0 0 20px rgba(255,224,118,.25),0 14px 22px rgba(0,10,20,.26)!important;background:linear-gradient(180deg,rgba(89,68,22,.95),rgba(42,35,15,.97))!important}
.gates.risk-round .gate.correct{background:var(--good)!important;border-color:#c7ffe9!important}
.gates.risk-round .gate.wrong{background:rgba(76,51,28,.94)!important}
/* The compass is a deliberate earned helper and only gives an occasional subtle hint. */
.gate.compass-hint{animation:compassHintPulse .62s ease-in-out 2 alternate!important}
@keyframes compassHintPulse{to{border-color:#ffe18a;box-shadow:0 7px 0 rgba(83,52,14,.68),0 0 18px rgba(255,225,126,.42),0 14px 22px rgba(0,10,20,.26)}}
/* Boss collectibles/hazards stay behind the learning gates so words always win the visual hierarchy. */
.boss-object-layer{z-index:11!important}
.gates{z-index:12!important}
@media(max-width:520px){.gates.risk-round::before{font-size:.45rem;top:-16px}}
@media(prefers-reduced-motion:reduce){.gate.compass-hint{animation-duration:.18s!important}}
`;
html=html.replace('</style>',css+'\n</style>');

const spawnClassOld="const g=$('gates');g.innerHTML='';g.className='gates';let dur=Math.max(1.5,3-(s.speed-1)*.45);";
const spawnClassNew="const g=$('gates');g.innerHTML='';g.className='gates'+(q.risk?' risk-round':'');let dur=Math.max(1.5,3-(s.speed-1)*.45);";
if(!html.includes(spawnClassOld))throw new Error('Risk-round container anchor missing');
html=html.replace(spawnClassOld,spawnClassNew);

const gateClassOld="b.className='gate'+(i===s.lane?' sel':'')+(q.risk&&i===q.correct?' risk-gate':'')+(q.isRevenge&&i===q.correct?' revenge-gate':'');";
const gateClassNew="b.className='gate'+(i===s.lane?' sel':'')+(q.isRevenge&&i===q.correct?' revenge-gate':'');";
if(!html.includes(gateClassOld))throw new Error('Correct-only risk gate anchor missing');
html=html.replace(gateClassOld,gateClassNew);

const compassAnchor="if(s.helper==='lumi'&&!s.boss&&s.sequence%4===0)setTimeout(()=>{if(q===expected&&s.run)g.children[q.correct]?.classList.add('helper-hint')},Math.min(1200,dur*450));";
if(!html.includes(compassAnchor))throw new Error('Lumi helper anchor missing');
const compassLogic=compassAnchor+"if(perkActive('goldener-kompass')&&!s.boss&&s.sequence%3===0)setTimeout(()=>{if(q===expected&&s.run)g.children[q.correct]?.classList.add('compass-hint')},Math.min(1250,dur*470));";
html=html.replace(compassAnchor,compassLogic);

const miloOld="if(q.type==='boss')s.bossMiss++;else if(s.helper==='milo'&&!s.helperUsed){s.helperUsed=true;feedback('🛡 Milo schützt dein Herz!')}else s.lives--;$('runner').classList.add('sad');if(q.type==='boss')feedback('✕ Nicht passend');else if(!(s.helper==='milo'&&s.helperUsed))feedback('✕ '+q.target.en)";
const miloNew="if(q.type==='boss')s.bossMiss++;else if(s.helper==='milo'&&!s.helperUsed){s.helperUsed=true;feedback('🛡 Milo schützt dein Herz! · Richtig: '+q.target.en)}else{s.lives--;feedback('✕ Richtig wäre: '+q.target.en)}$('runner').classList.add('sad');if(q.type==='boss')feedback('✕ Nicht passend')";
if(!html.includes(miloOld))throw new Error('Milo feedback anchor missing');
html=html.replace(miloOld,miloNew);

await fs.writeFile(path,html,'utf8');
console.log('Applied CAF release polish: fair gold rounds, working compass, Milo teaching feedback, boss-object layering.');
