/**
 * Builds SVG sprites from individual icon files.
 * Each source directory is packed into a single sprite with <symbol> entries;
 * the sprite is registered in MatIconRegistry as one file per group.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT, 'src', 'assets', 'sprites');

const GROUPS = [
    { dir: path.join(ROOT, 'src', 'assets', 'icons', 'vuesax'), out: 'vuesax.svg' },
    { dir: path.join(ROOT, 'src', 'assets', 'group-icons'), out: 'illustrations.svg' },
    { dir: path.join(ROOT, 'src', 'assets', 'icons', 'currencies'), out: 'currencies.svg' },
];

const SKIPPED_ROOT_ATTRS = new Set([
    'xmlns',
    'xmlns:xlink',
    'width',
    'height',
    'version',
    'id',
    'class',
    'x',
    'y',
]);

function parseRootAttrs(attrsStr) {
    const attrs = [];
    const pattern = /([a-zA-Z_:@][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
    let match;
    while ((match = pattern.exec(attrsStr)) !== null) {
        attrs.push([match[1], match[2] ?? match[3] ?? '']);
    }
    return attrs;
}

function buildSymbol(name, source) {
    const cleaned = source
        .replace(/<\?xml[\s\S]*?\?>/g, '')
        .replace(/<!DOCTYPE[\s\S]*?>/g, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        .trim();

    const rootMatch = cleaned.match(/^<svg\b([^>]*)>([\s\S]*)<\/svg\s*>\s*$/i);
    if (!rootMatch) {
        throw new Error(`Malformed svg root element: ${name}.svg`);
    }

    const attrs = parseRootAttrs(rootMatch[1]);
    const attrMap = new Map(attrs.map(([key, value]) => [key.toLowerCase(), value]));

    if (!attrMap.has('viewbox')) {
        const width = attrMap.get('width');
        const height = attrMap.get('height');
        if (width === undefined || height === undefined) {
            throw new Error(`Missing viewBox: ${name}.svg`);
        }
        attrs.push(['viewBox', `0 0 ${width} ${height}`]);
    }

    const keptAttrs = attrs
        .filter(([key]) => !SKIPPED_ROOT_ATTRS.has(key.toLowerCase()))
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');

    return `<symbol id="${name}"${keptAttrs ? ` ${keptAttrs}` : ''}>${rootMatch[2].trim()}</symbol>`;
}

function buildSprite(dir) {
    const files = fs.readdirSync(dir)
        .filter((file) => file.endsWith('.svg'))
        .sort();

    if (files.length === 0) {
        throw new Error(`No svg files found in ${dir}`);
    }

    const symbols = files.map((file) => {
        const name = path.basename(file, '.svg');
        return buildSymbol(name, fs.readFileSync(path.join(dir, file), 'utf8'));
    });

    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n${symbols.join('\n')}\n</svg>\n`;
}

function main() {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    for (const group of GROUPS) {
        const sprite = buildSprite(group.dir);
        const outFile = path.join(OUTPUT_DIR, group.out);
        fs.writeFileSync(outFile, sprite);
        console.log(`${group.out}: ${sprite.length} bytes`);
    }
}

main();
