import fs from 'fs';
import path from 'path';
import fileEntryCache from './cache.js';

var TEST_FILE_SIZE: number = 32;
var TEST_FILE_PATH: any = path.resolve(__dirname, '.perf.file');
var RUNS: number = 10000;
var LOOPS: number = 5;
var TIMER_NAME: string = 'cache.hasFileChanged (' + TEST_FILE_SIZE + ' KB file, ' + RUNS + ' runs)';

for (var i = 0; i < LOOPS; i++) {
  var cache: any = fileEntryCache.createFromFile('.perfcache');
  fs.writeFileSync(TEST_FILE_PATH, Buffer.alloc(1024 * TEST_FILE_SIZE));

  console.time(TIMER_NAME);
  for (var j = 0; j < RUNS; j++) {
    cache.hasFileChanged(TEST_FILE_PATH);
  }
  console.timeEnd(TIMER_NAME);

  cache.deleteCacheFile();
  fs.unlinkSync(TEST_FILE_PATH);
}
