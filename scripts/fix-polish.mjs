import fs from 'node:fs/promises';

const path = 'index.html';
let html = await fs.readFile(path, 'utf8');

const css = '.boss-result-reward.hidden{display:none!important}';
if (!html.includes(css)) {
  if (!html.includes('</style>')) throw new Error('Style closing tag missing');
  html = html.replace('</style>', `${css}\n</style>`);
}

await fs.writeFile(path, html, 'utf8');
console.log('Finalized boss result visibility');
