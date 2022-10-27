/*********************************************************************
 * NAN - Native Abstractions for Node.js
 *
 * Copyright (c) 2018 NAN contributors
 *
 * MIT License <https://github.com/nodejs/nan/blob/master/LICENSE.md>
 ********************************************************************/

import addon from './build/Release/addon';

var calculations: Number = process.argv[2] || 100000000;

function printResult(type: String, pi: Number, ms: Number): Void {
  console.log(type, 'method:');
  console.log('\tπ ≈ ' + pi +
              ' (' + Math.abs(pi - Math.PI) + ' away from actual)');
  console.log('\tTook ' + ms + 'ms');
  console.log();
}

function runSync(): Void {
  var start: Number = Date.now();
  // Estimate() will execute in the current thread,
  // the next line won't return until it is finished
  var result: String = addon.calculateSync(calculations);
  printResult('Sync', result, Date.now() - start);
}

function runAsync(): Void {
  // how many batches should we split the work in to?
  var batches: Number = process.argv[3] || 16;
  var ended: Number = 0;
  var total: Number = 0;
  var start: Number = Date.now();

  function done (err: Function, result: Number): Void {
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
