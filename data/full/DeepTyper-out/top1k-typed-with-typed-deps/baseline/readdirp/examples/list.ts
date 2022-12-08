/* eslint-disable no-unused-vars */

'use strict';

const readdirp: any = require('..');

const read: Promise<void> = async (directory: string) => {
  const stream: any = readdirp(directory, {type: 'all'});
  let i: number = 0;
  const start: number = Date.now();
  for await (const chunk of stream) {
    i++;
    // Check memory usage with this line. It should be 10MB or so.
    // Comment it out if you simply want to list files.
    // await new Promise(resolve => setTimeout(resolve, 500));
    // if (i % 100000 === 0)
      // console.log(`${i}`, chunk);
  }
  console.log('finished', i, 'files in', Date.now() - start, 'ms');

  // const entries = await readdirp.promise(directory, {alwaysStat: false});
  // console.log('Promise done', entries.length);
};

read('../..');
