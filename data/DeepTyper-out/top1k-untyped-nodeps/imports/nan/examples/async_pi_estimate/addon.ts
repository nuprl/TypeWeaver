import addon from './build/Release/addon';
var calculations: any = process.argv[2] || 100000000;

function printResult(type, pi: number, ms: number): void {
  console.log(type, 'method:');
  console.log('\tπ ≈ ' + pi +
              ' (' + Math.abs(pi - Math.PI) + ' away from actual)');
  console.log('\tTook ' + ms + 'ms');
  console.log();
}

function runSync(): void {
  var start: number = Date.now();
  // Estimate() will execute in the current thread,
  // the next line won't return until it is finished
  var result: number = addon.calculateSync(calculations);
  printResult('Sync', result, Date.now() - start);
}

function runAsync(): void {
  // how many batches should we split the work in to?
  var batches: any = process.argv[3] || 16;
  var ended: number = 0;
  var total: number = 0;
  var start: number = Date.now();

  function done (err: any, result: any): void {
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
