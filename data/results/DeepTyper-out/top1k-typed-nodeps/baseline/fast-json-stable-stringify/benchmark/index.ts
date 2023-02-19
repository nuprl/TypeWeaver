'use strict';

const Benchmark: any = require('benchmark');
const suite: any = new Benchmark.Suite;
const testData: any = require('./test.json');


const stringifyPackages: any = {
  // 'JSON.stringify': JSON.stringify,
  'fast-json-stable-stringify': require('../index'),
  'json-stable-stringify': true,
  'fast-stable-stringify': true,
  'faster-stable-stringify': true
};


for (const name in stringifyPackages) {
  let func: any = stringifyPackages[name];
  if (func === true) func = require(name);

  suite.add(name, function() {
    func(testData);
  });
}

suite
  .on('cycle', (event: any) => console.log(String(event.target)))
  .on('complete', function () {
    console.log('The fastest is ' + this.filter('fastest').map('name'));
  })
  .run({async: true});
