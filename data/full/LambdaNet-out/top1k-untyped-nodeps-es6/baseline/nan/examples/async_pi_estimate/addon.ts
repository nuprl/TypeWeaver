/*********************************************************************
 * NAN - Native Abstractions for Node.js
 *
 * Copyright (c) 2018 NAN contributors
 *
 * MIT License <https://github.com/nodejs/nan/blob/master/LICENSE.md>
 ********************************************************************/

import addon from './build/Release/addon';

var calculations: number = process.argv[2] || 100000000;

function printResult(type: string, pi: number, ms: number): void {
  console.log(type, 'method:');
  console.log('\tπ ≈ ' + pi +
              ' (' + Math.abs(pi - Math.PI) + ' away from actual)');
  console.log('\tTook ' + ms + 'ms');
  console.log();
}

function runSync(): Promise {
  var start: number = Date.now();
  // Estimate() will execute in the current thread,
  // the next line won't return until it is finished
  var result: string = addon.calculateSync(calculations);
  printResult('Sync', result, Date.now() - start);
}

function runAsync(): void {
  // how many batches should we split the work in to?
  var batches: number = process.argv[3] || 16;
  var ended: number = 0;
  var total: number = 0;
  var start: number = Date.now();

  function done (err: Function, result: number): void {
    total += result;
    
    // have all the batches finished executing?
    if (++ended === batches) {
      printResult('Async', total / batches, Date.now() - start);
    }
  }

  // for each batch of work, request an async Estimate() for
  // a portion of the total number of calculations
  for (var i = 0; i < batches; i++) {
    addon.calculateAsync(calculations / batches, done);
  }
}

runSync();
runAsync();
