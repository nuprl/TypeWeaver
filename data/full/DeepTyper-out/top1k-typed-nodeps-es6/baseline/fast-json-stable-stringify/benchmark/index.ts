'use strict';

import Benchmark from 'benchmark';
const suite: any = new Benchmark.Suite;
import testData from './test.json';

// 'JSON.stringify': JSON.stringify,
import '../index';


const stringifyPackages: any = {
  'fast-json-stable-stringify',
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
