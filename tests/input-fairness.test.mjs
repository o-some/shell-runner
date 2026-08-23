import fs from 'node:fs';

const html=fs.readFileSync('index.html','utf8');
const must=(needle,msg)=>{if(!html.includes(needle))throw new Error(msg)};
const mustNot=(needle,msg)=>{if(html.includes(needle))throw new Error(msg)};

must('Shell Runner boss fairness + tap control v2.4','Fairness/tap enhancer marker missing');
must('bossQuestionSafeUntil=Date.now()+Math.max(1350,dur*560)','Boss question reading grace window missing');
must("activeHazards>=2","Boss hazard concurrency limit missing");
must("4.75+Math.random()*.65","Barrel fall time was not slowed for reaction time");
must('bossObjectInitialTimer=setTimeout(spawnBossObject,1000)','Boss objects start too early');
must("if(!isShellKind(kind)&&Date.now()<safeUntil)return","Barrels can still punish during the protected reading window");
must("layer.children.length>=4","Boss object density cap missing");
must('tapLaneFromPoint','Lower-field tap lane mapping missing');
must("if(x<0||x>1||y<.56||y>1)return null","Tap control is not limited to the lower Tula play area");
must("addEventListener('pointerdown'","Pointer/mouse/touch start handler missing");
must("addEventListener('pointerup'","Pointer/mouse/touch tap handler missing");
must("Math.hypot(dx,dy)>22","Tap control does not distinguish taps from swipes/drags");
must("target?.closest('.gate,button')","Tap lane control can interfere with gate buttons");
must('showTapLanePulse','Tap lane feedback missing');
must("addEventListener('touchstart'","Existing swipe start input missing");
must("addEventListener('touchend'","Existing swipe end input missing");
must("if(e.key==='ArrowLeft')","Existing keyboard left input missing");
must("if(e.key==='ArrowRight')","Existing keyboard right input missing");
mustNot('bossObjectInitialTimer=setTimeout(spawnBossObject,480)','Legacy too-early boss object start remains');

console.log('Boss fairness and tap-control checks: PASS');
