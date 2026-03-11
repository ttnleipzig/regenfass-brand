import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const log = (msg) => { try { writeFileSync('./test-log.txt', String(msg) + '\n', { flag: 'a' }); } catch (_) {} };
log('start');
try {
  const { htmlInclude } = await import('./vite-plugin-html-include.js');
  log('plugin loaded');
  const plugin = htmlInclude({ repoBaseUrl: 'https://raw.githubusercontent.com/kieksme/regenfass.brand/main/' });
  const html = readFileSync('./app/implementations/pwa.html', 'utf8');
  const appDir = resolve(process.cwd(), 'app');
  const relativePath = 'implementations/pwa.html';
  const out = plugin.transformIndexHtml(html, { filename: resolve(appDir, relativePath) });
  writeFileSync('./dist-pwa-test.html', out);
  log('OK ' + out.length);
} catch (e) {
  log('Error ' + e.message);
  log(e.stack);
  process.exit(1);
}
