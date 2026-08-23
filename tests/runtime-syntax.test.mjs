import fs from 'node:fs';

const html=fs.readFileSync('index.html','utf8');
const match=html.match(/<script>([\s\S]*?)<\/script>/);
if(!match)throw new Error('Runtime script block missing');
try{new Function(match[1])}catch(error){throw new Error(`Runtime JavaScript syntax error: ${error.message}`)}
if(!html.includes('</html>'))throw new Error('Runtime HTML appears truncated');
console.log('Runtime syntax smoke check: PASS');
