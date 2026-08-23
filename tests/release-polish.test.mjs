import fs from 'node:fs';

const html=fs.readFileSync('index.html','utf8');
const must=(needle,msg)=>{if(!html.includes(needle))throw new Error(msg)};
const mustNot=(needle,msg)=>{if(html.includes(needle))throw new Error(msg)};

must('Shell Runner CAF release polish v2.3','CAF release polish marker missing');
must("g.className='gates'+(q.risk?' risk-round':'')",'Gold round is not applied to the whole gate set');
must('.gates.risk-round .gate{','Gold round does not style all gates equally');
mustNot("q.risk&&i===q.correct?' risk-gate':'')",'Gold round still reveals the correct answer');
must("perkActive('goldener-kompass')",'Goldener Kompass has no runtime behavior');
must("classList.add('compass-hint')",'Goldener Kompass hint animation missing');
must('Milo schützt dein Herz! · Richtig:','Milo first protection must still teach the correct answer');
must('✕ Richtig wäre: ','Normal wrong-answer teaching feedback missing');
must('.boss-object-layer{z-index:11!important}','Boss objects are not kept behind the learning gates');
must('.gates{z-index:12!important}','Learning gates are not guaranteed above boss objects');

console.log('CAF release polish checks: PASS');
