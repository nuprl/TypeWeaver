'use strict';

const Benchmark: string = require('benchmark');
const suite: HTMLElement = new Benchmark.Suite;
const testData: string = require('./test.json');


const stringifyPackages: object = {
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
  .on('cycle', (event: object) => console.log(String(event.target)))
  .on('complete', function () {
    console.log('The fastest is ' + this.filter('fastest').map('name'));
  })
  .run({async: true});
