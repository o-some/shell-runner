import fs from 'node:fs/promises';

const path = 'index.html';
let html = await fs.readFile(path, 'utf8');

const cssMarker = '/* Tula arm reactions v1.2 */';
const runnerMarker = '<span class="tula-arm tula-arm-left" aria-hidden="true"></span>';

if (!html.includes(cssMarker)) {
  const css = String.raw`
/* Tula arm reactions v1.2 */
.runner{isolation:isolate}
.runner>img{position:relative;z-index:3}
.tula-arm{position:absolute;z-index:2;top:49%;width:40%;height:16%;opacity:0;pointer-events:none;background:linear-gradient(135deg,#86e6d3 0%,#46b7aa 48%,#247879 100%);border:1px solid rgba(255,233,166,.78);box-shadow:inset 0 2px 3px rgba(255,255,255,.3),0 5px 8px rgba(0,18,29,.28);will-change:transform,opacity,filter}
.tula-arm-left{left:-14%;border-radius:78% 32% 70% 34%;transform-origin:94% 50%}
.tula-arm-right{right:-14%;border-radius:32% 78% 34% 70%;transform-origin:6% 50%}
.runner.correct-hit .tula-arm{opacity:.96;filter:saturate(1.08) brightness(1.07)}
.runner.wrong-hit .tula-arm{opacity:.88;filter:saturate(.72) brightness(.78)}
.runner.correct-hit .tula-arm-left{animation:tulaArmGoodLeft .56s cubic-bezier(.2,.85,.2,1)!important}
.runner.correct-hit .tula-arm-right{animation:tulaArmGoodRight .56s cubic-bezier(.2,.85,.2,1)!important}
.runner.wrong-hit .tula-arm-left{animation:tulaArmBadLeft .56s cubic-bezier(.2,.8,.2,1)!important}
.runner.wrong-hit .tula-arm-right{animation:tulaArmBadRight .56s cubic-bezier(.2,.8,.2,1)!important}
@keyframes tulaArmGoodLeft{0%{opacity:.25;transform:translate(0,0) rotate(-10deg) scale(.9)}22%{opacity:1;transform:translate(0,-10px) rotate(-44deg) scale(1.02)}52%{opacity:1;transform:translate(0,-34px) rotate(-78deg) scale(1.08)}76%{opacity:1;transform:translate(0,-9px) rotate(-36deg) scale(1.02)}100%{opacity:.2;transform:translate(0,0) rotate(-10deg) scale(.94)}}
@keyframes tulaArmGoodRight{0%{opacity:.25;transform:translate(0,0) rotate(10deg) scale(.9)}22%{opacity:1;transform:translate(0,-10px) rotate(44deg) scale(1.02)}52%{opacity:1;transform:translate(0,-34px) rotate(78deg) scale(1.08)}76%{opacity:1;transform:translate(0,-9px) rotate(36deg) scale(1.02)}100%{opacity:.2;transform:translate(0,0) rotate(10deg) scale(.94)}}
@keyframes tulaArmBadLeft{0%{opacity:.35;transform:translate(0,0) rotate(-6deg) scale(.94)}18%{opacity:.95;transform:translate(-8px,8px) rotate(28deg) scale(.95)}38%{opacity:.95;transform:translate(9px,10px) rotate(48deg) scale(.92)}58%{opacity:.95;transform:translate(-6px,7px) rotate(30deg) scale(.94)}78%{opacity:.9;transform:translate(4px,3px) rotate(42deg) scale(.96)}100%{opacity:.2;transform:translate(0,0) rotate(16deg) scale(.92)}}
@keyframes tulaArmBadRight{0%{opacity:.35;transform:translate(0,0) rotate(6deg) scale(.94)}18%{opacity:.95;transform:translate(8px,8px) rotate(-28deg) scale(.95)}38%{opacity:.95;transform:translate(-9px,10px) rotate(-48deg) scale(.92)}58%{opacity:.95;transform:translate(6px,7px) rotate(-30deg) scale(.94)}78%{opacity:.9;transform:translate(-4px,3px) rotate(-42deg) scale(.96)}100%{opacity:.2;transform:translate(0,0) rotate(-16deg) scale(.92)}}
@media(max-width:520px){.tula-arm{top:50%;width:42%;height:15%}.tula-arm-left{left:-15%}.tula-arm-right{right:-15%}}
@media(prefers-reduced-motion:reduce){.runner.correct-hit .tula-arm,.runner.wrong-hit .tula-arm{animation-duration:.12s!important}}
`;
  if (!html.includes('</style>')) throw new Error('Style closing tag missing for Tula arm reactions');
  html = html.replace('</style>', `${css}\n</style>`);
}

if (!html.includes(runnerMarker)) {
  const runnerAnchor = '<div class="runner" id="runner"><img src="./assets/characters/tula-neutral-front.webp" alt="Tula"></div>';
  if (!html.includes(runnerAnchor)) throw new Error('Runner markup anchor missing for Tula arm reactions');
  const enhancedRunner = '<div class="runner" id="runner"><span class="tula-arm tula-arm-left" aria-hidden="true"></span><span class="tula-arm tula-arm-right" aria-hidden="true"></span><img src="./assets/characters/tula-neutral-front.webp" alt="Tula"></div>';
  html = html.replace(runnerAnchor, enhancedRunner);
}

await fs.writeFile(path, html, 'utf8');
console.log('Applied Tula arm reactions to', path);
