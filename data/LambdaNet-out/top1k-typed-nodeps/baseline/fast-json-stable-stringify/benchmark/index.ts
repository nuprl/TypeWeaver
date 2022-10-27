'use strict';

const Benchmark: String = require('benchmark');
const suite: HTMLElement = new Benchmark.Suite;
const testData: String = require('./test.json');


const stringifyPackages: Object = {
  // 'JSON.stringify': JSON.stringify,
  'fast-json-stable-stringify': require('../index'),
  'json-stable-stringify': true,
  'fast-stable-stringify': true,
  'faster-stable-stringify': true
};


for (const name in stringifyPackages) {
  let func: Function = stringifyPackages[name];
  if (func === true) func = require(name);

  suite.add(name, function() {
    func(testData);
  });
}

suite
  .on('cycle', (event: Object) => console.log(String(event.target)))
  .on('complete', function () {
    console.log('The fastest is ' + this.filter('fastest').map('name'));
  })
  .run({async: true});
