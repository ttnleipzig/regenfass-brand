#!/usr/bin/env node
/**
 * Tests that the waterline graphic repeats horizontally (wide strip with multiple tiles used in email footer).
 */

import { readFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '../..');
const assetsBackgrounds = join(projectRoot, 'assets', 'backgrounds');
const emailFooterPath = join(projectRoot, 'app', 'implementations', 'email-footer.html');

const TILE_WIDTH = 1024;
const EXPECTED_WIDE_WIDTH = 3072; // 3 tiles
const MIN_TILES = 3;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

async function runTests() {
  const results = [];

  function test(name, fn) {
    results.push({ name, fn });
  }

  async function run() {
    console.log('\nWaterline strip (horizontal repeat) tests\n');
    let passed = 0;
    let failed = 0;

    for (const { name, fn } of results) {
      try {
        await fn();
        console.log(`  ✓ ${name}`);
        passed++;
      } catch (error) {
        console.error(`  ✗ ${name}: ${error.message}`);
        failed++;
      }
    }

    console.log(`\n  Tests: ${passed} passed, ${failed} failed`);
    return failed === 0;
  }

  return { test, run };
}

const { test, run } = await runTests();

test('waterline-strip-wide.svg exists', () => {
  const widePath = join(assetsBackgrounds, 'waterline-strip-wide.svg');
  assert(existsSync(widePath), 'waterline-strip-wide.svg must exist in assets/backgrounds');
});

test('wide SVG has width 3072 (3× tile) for horizontal repeat', () => {
  const widePath = join(assetsBackgrounds, 'waterline-strip-wide.svg');
  const content = readFileSync(widePath, 'utf8');
  const widthMatch = content.match(/width="(\d+)"/);
  assert(widthMatch, 'wide SVG must have width attribute');
  const width = parseInt(widthMatch[1], 10);
  assert(width === EXPECTED_WIDE_WIDTH, `wide SVG width must be ${EXPECTED_WIDE_WIDTH}, got ${width}`);
});

test('wide SVG viewBox spans full width for horizontal repeat', () => {
  const widePath = join(assetsBackgrounds, 'waterline-strip-wide.svg');
  const content = readFileSync(widePath, 'utf8');
  const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
  assert(viewBoxMatch, 'wide SVG must have viewBox');
  const parts = viewBoxMatch[1].trim().split(/\s+/);
  assert(parts.length >= 3, 'viewBox must have at least x, y, width');
  const viewBoxWidth = parseInt(parts[2], 10);
  assert(viewBoxWidth === EXPECTED_WIDE_WIDTH, `viewBox width must be ${EXPECTED_WIDE_WIDTH}, got ${viewBoxWidth}`);
});

test('wide SVG contains repeated wave tiles (use with translate)', () => {
  const widePath = join(assetsBackgrounds, 'waterline-strip-wide.svg');
  const content = readFileSync(widePath, 'utf8');
  const useCount = (content.match(/<use\s[^>]*href="#wave-tile"/g) || []).length;
  assert(useCount >= MIN_TILES, `wide SVG must have at least ${MIN_TILES} <use> elements for wave-tile, got ${useCount}`);
  assert(content.includes('translate(1024,0)') || content.includes('translate(2048,0)'), 'wide SVG must repeat tile at 1024 and 2048 for horizontal repeat');
});

test('wide SVG defines wave-tile group for reuse', () => {
  const widePath = join(assetsBackgrounds, 'waterline-strip-wide.svg');
  const content = readFileSync(widePath, 'utf8');
  assert(content.includes('id="wave-tile"'), 'wide SVG must define <g id="wave-tile"> for horizontal repeat');
});

test('email footer uses wide waterline asset so graphic repeats horizontally', () => {
  assert(existsSync(emailFooterPath), 'email-footer.html must exist');
  const content = readFileSync(emailFooterPath, 'utf8');
  assert(
    content.includes('waterline-strip-wide.svg'),
    'email footer template must reference waterline-strip-wide.svg so the graphic repeats horizontally without CSS repeat-x'
  );
});

test('email footer waterline img has width 100% for full-width repeat', () => {
  const content = readFileSync(emailFooterPath, 'utf8');
  const hasWideRef = content.includes('waterline-strip-wide.svg');
  const hasFullWidth = content.includes('width: 100%') || content.includes('width="100%"');
  assert(hasWideRef && hasFullWidth, 'email footer waterline must use wide asset and width 100% for full-width horizontal repeat');
});

const ok = await run();
process.exit(ok ? 0 : 1);
