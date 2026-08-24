import fs from 'node:fs';

const workflow=fs.readFileSync('.github/workflows/pages.yml','utf8');
const must=(needle,msg)=>{if(!workflow.includes(needle))throw new Error(msg)};
const mustNot=(needle,msg)=>{if(workflow.includes(needle))throw new Error(msg)};

must('set -euo pipefail','Pages live smoke should keep strict shell mode');
must('-o /tmp/live-shell-runner.html','Pages live smoke must write the response to a file');
must("grep -Fq 'Shell Runner boss progression + roster v3.0' /tmp/live-shell-runner.html",'v3 runtime marker live check missing');
must("grep -Fq 'const BOSS_CORRECT_INTERVAL=10;' /tmp/live-shell-runner.html",'10-word live check missing');
must("grep -Fq 'const BOSS_MAX_HP=10;' /tmp/live-shell-runner.html",'10 HP live check missing');
must("grep -Fq 'bossRosterTrack' /tmp/live-shell-runner.html",'Boss roster live check missing');
must("grep -Fq 'bossAbilityName' /tmp/live-shell-runner.html",'Boss ability live check missing');
mustNot("printf '%s' \"$body\" | grep -Fq",'Live smoke still contains pipefail-sensitive printf|grep pipelines');

console.log('Pages live-smoke workflow safety checks: PASS');
