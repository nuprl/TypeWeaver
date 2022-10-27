/* eslint-disable no-unused-vars */

'use strict';

const readdirp: Function = require('..');

function logMem(i: String): Void {
  const vals: Array = Object.entries(process.memoryUsage()).map(([k, v]) => {
    return `${k}=${(`${(v / 1e6).toFixed(1)}M`).padEnd(7)}`;
  });
  console.log(String(i).padStart(6), ...vals);
}

const read: Function = async (directory: HTMLElement) => {
  const stream: Array = readdirp(directory, {type: 'all'});
  let i: Number = 0;
  const start: Number = Date.now();
  let lap: Number = 0;

  for await (const chunk of stream) {
    if (i % 1000 === 0) {
      const now: Number = Date.now();
      if (now - lap > 500) {
        lap = now;
        logMem(i);
      }
    }
    i++;
  }
  logMem(i);

  console.log(`Processed ${i} files in ${Date.now() - start} msecs`);
};

read('../..');
