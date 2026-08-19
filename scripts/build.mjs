import fs from 'node:fs/promises';

await fs.rm('dist', { recursive: true, force: true });
await fs.mkdir('dist', { recursive: true });
await fs.copyFile('index.html', 'dist/index.html');
await fs.cp('assets', 'dist/assets', { recursive: true });
console.log('Build complete: dist/');
