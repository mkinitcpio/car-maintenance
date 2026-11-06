/**
 * Copies the pdf.js worker into the app assets so it can be served in both
 * the dev server and the packaged Electron build.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SOURCE = path.join(ROOT, 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.mjs');
const OUTPUT_DIR = path.join(ROOT, 'src', 'assets', 'pdfjs');
const OUTPUT = path.join(OUTPUT_DIR, 'pdf.worker.min.mjs');

if (!fs.existsSync(SOURCE)) {
  console.warn('pdfjs-dist is not installed; skipping pdf.worker.min.mjs copy.');
  process.exit(0);
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.copyFileSync(SOURCE, OUTPUT);
console.log(`pdf.worker.min.mjs: ${fs.statSync(OUTPUT).size} bytes`);
