'use strict';
const Limiter = require('../');

const concurrency = 1;
console.log(`Running async-limiter demo with concurrency '${concurrency}'. ` +
  'Edit example/index.js to try other configurations.');

// When concurrency != 1, async-limiter makes no ordering guarantees.
// Try playing with concurrency to see how it behaves.
const t = new Limiter({ concurrency });
const results = [];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function random(upperBound: number, lowerBound = 0: number) {
  return Math.floor(Math.random() * 200) + lowerBound;
}

function done(result: any) {
  results.push(result);
  console.log(new Date().toISOString() + ' ' + result);
}

// add jobs using the familiar Array API
t.push(async function(cb: Function) {
  await delay(random(200));
  done('two');
  cb();
});

t.push(
  async function(cb: Function) {
    await delay(random(200));
    done('four');
    cb();
  },
  async function(cb: any) {
    await delay(random(200));
    done('five');
    cb();
  }
);

t.unshift(async function(cb: any) {
  await delay(random(200));
  done('one');
  cb();
});

t.splice(2, 0, async function(cb: Function) {
  await delay(random(200));
  done('three');
  cb();
});

t.onDone(function() {
  console.log('all done:', results);
});