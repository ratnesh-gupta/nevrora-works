#!/usr/bin/env node
/**
 * Nevrora Ventures 4-Tier E2E Test Suite Runner
 * Executes Tier 1 (Feature Coverage), Tier 2 (Boundary & Corner),
 * Tier 3 (Cross-Feature), and Tier 4 (Real-World Scenarios).
 */

import { run } from 'node:test';
import { spec, tap, dot, junit } from 'node:test/reporters';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { teardownTestContext } from './test-context.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootTestsDir = path.resolve(__dirname, '..');
const e2eDir = path.join(rootTestsDir, 'e2e');

// Parse CLI arguments
const args = process.argv.slice(2);
let selectedTier = 'all';
let reporterType = 'spec';
let targetFilter = '';

for (const arg of args) {
  if (arg.startsWith('--tier=')) {
    selectedTier = arg.replace('--tier=', '').toLowerCase();
  } else if (arg.startsWith('--target=')) {
    process.env.TEST_TARGET = arg.replace('--target=', '').toLowerCase();
  } else if (arg.startsWith('--reporter=')) {
    reporterType = arg.replace('--reporter=', '').toLowerCase();
  } else if (arg.startsWith('--filter=')) {
    targetFilter = arg.replace('--filter=', '');
  }
}

const TIER_DIRECTORIES = {
  '1': 'tier1-feature-coverage',
  '2': 'tier2-boundary-corner',
  '3': 'tier3-cross-feature',
  '4': 'tier4-real-world-scenarios',
};

function collectFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(collectFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.test.mjs')) {
      files.push(fullPath);
    }
  }
  return files;
}

let filesToRun = [];

if (selectedTier === 'all') {
  filesToRun = collectFiles(e2eDir);
} else if (TIER_DIRECTORIES[selectedTier]) {
  const targetDir = path.join(e2eDir, TIER_DIRECTORIES[selectedTier]);
  filesToRun = collectFiles(targetDir);
} else {
  console.error(`Invalid tier '${selectedTier}'. Valid options: 1, 2, 3, 4, all`);
  process.exit(1);
}

if (targetFilter) {
  filesToRun = filesToRun.filter(f => f.includes(targetFilter));
}

if (filesToRun.length === 0) {
  console.warn(`[WARN] No test files found for tier: ${selectedTier}`);
  process.exit(0);
}

console.log('\n======================================================');
console.log(' NEVRORA VENTURES - 4-TIER E2E TEST RUNNER');
console.log('======================================================');
console.log(` Target Tier: ${selectedTier.toUpperCase()}`);
console.log(` Target Mode: ${process.env.TEST_TARGET || 'auto'}`);
console.log(` Test Files (${filesToRun.length}):`);
filesToRun.forEach(f => console.log(`  - ${path.relative(rootTestsDir, f)}`));
console.log('------------------------------------------------------\n');

let reporterStream;
switch (reporterType) {
  case 'tap':
    reporterStream = new tap();
    break;
  case 'dot':
    reporterStream = new dot();
    break;
  case 'junit':
    reporterStream = new junit();
    break;
  case 'spec':
  default:
    reporterStream = new spec();
    break;
}

const testStream = run({
  files: filesToRun,
  concurrency: true,
});

let failedTestsCount = 0;
let passedTestsCount = 0;

testStream.on('test:fail', (data) => {
  failedTestsCount++;
});

testStream.on('test:pass', (data) => {
  passedTestsCount++;
});

testStream.compose(reporterStream).pipe(process.stdout);

testStream.on('end', async () => {
  await teardownTestContext();
  console.log('\n------------------------------------------------------');
  console.log(`[E2E SUMMARY] Passed: ${passedTestsCount} | Failed: ${failedTestsCount}`);
  if (failedTestsCount > 0) {
    console.log('[RESULT] FAILED - One or more test cases failed.');
    process.exit(1);
  } else {
    console.log('[RESULT] SUCCESS - All test cases in scope passed.');
    process.exit(0);
  }
});
