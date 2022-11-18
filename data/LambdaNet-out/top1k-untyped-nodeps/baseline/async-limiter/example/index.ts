'use strict';
const Limiter: any[] = require('../');

const concurrency: number = 1;
console.log(`Running async-limiter demo with concurrency '${concurrency}'. ` +
  'Edit example/index.js to try other configurations.');

// When concurrency != 1, async-limiter makes no ordering guarantees.
// Try playing with concurrency to see how it behaves.
const t: any[] = new Limiter({ concurrency });
const results: any[] = [];

function delay(ms: number): Promise {
  return new Promise((resolve: number) => setTimeout(resolve, ms));
}

function random(upperBound: Function, lowerBound: number = 0): string {
  return Math.floor(Math.random() * 200) + lowerBound;
}

function done(result: string): Void {
  results.push(result);
  console.log(new Date().toISOString() + ' ' + result);
}

// add jobs using the familiar Array API
t.push(async function(cb: HTMLElement) {
  await delay(random(200));
  done('two');
  cb();
});

t.push(
  async function(cb: HTMLElement) {
    await delay(random(200));
    done('four');
    cb();
  },
  async function(cb: HTMLElement) {
    await delay(random(200));
    done('five');
    cb();
  }
);

t.unshift(async function(cb: HTMLElement) {
  await delay(random(200));
  done('one');
  cb();
});

t.splice(2, 0, async function(cb: HTMLElement) {
  await delay(random(200));
  done('three');
  cb();
});

t.onDone(function() {
  console.log('all done:', results);
});
