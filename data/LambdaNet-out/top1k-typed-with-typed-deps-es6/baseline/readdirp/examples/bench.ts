/* eslint-disable no-unused-vars */

'use strict';

import readdirp from '..';

function logMem(i: string): Void {
  const vals: any[] = Object.entries(process.memoryUsage()).map(([k, v]) => {
    return `${k}=${(`${(v / 1e6).toFixed(1)}M`).padEnd(7)}`;
  });
  console.log(String(i).padStart(6), ...vals);
}

const read: Function = async (directory: HTMLElement) => {
  const stream: any[] = readdirp(directory, {type: 'all'});
  let i: number = 0;
  const start: number = Date.now();
  let lap: number = 0;

  for await (const chunk of stream) {
    if (i % 1000 === 0) {
      const now: number = Date.now();
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
