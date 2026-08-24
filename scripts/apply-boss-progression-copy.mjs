import fs from 'node:fs/promises';

const path='index.html';
let html=await fs.readFile(path,'utf8');
const marker='/* Shell Runner boss progression copy v3.1 */';
if(html.includes(marker)){console.log('Boss progression copy already present.');process.exit(0)}

const oldCopy='Nach 3 richtigen Wörtern wartet ein Themen-Boss.';
const newCopy='Nach 10 richtigen Wörtern wartet ein Themen-Boss.';
if(!html.includes(oldCopy))throw new Error('Final boss progression intro copy anchor missing');
html=html.replace(oldCopy,newCopy);
html=html.replace('</style>',marker+'\n</style>');

await fs.writeFile(path,html,'utf8');
console.log('Applied final 10-word boss progression copy.');
