'use strict';

const assertDeepStrictEqual: any = require('assert').deepStrictEqual;
const tests: any = require('../spec/tests');
const Benchmark: any = require('benchmark');
const suite: any = new Benchmark.Suite;


const equalPackages: any = {
  'fast-deep-equal': require('..'),
  'fast-deep-equal/es6': require('../es6'),
  'fast-equals': require('fast-equals').deepEqual,
  'nano-equal': true,
  'shallow-equal-fuzzy': true,
  'underscore.isEqual': require('underscore').isEqual,
  'lodash.isEqual': require('lodash').isEqual,
  'deep-equal': true,
  'deep-eql': true,
  'ramda.equals': require('ramda').equals,
  'util.isDeepStrictEqual': require('util').isDeepStrictEqual,
  'assert.deepStrictEqual': (a: string, b: any) => {
    try { assertDeepStrictEqual(a, b); return true; }
    catch(e) { return false; }
  }
};


for (const equalName in equalPackages) {
  let equalFunc: any = equalPackages[equalName];
  if (equalFunc === true) equalFunc = require(equalName);

  for (const testSuite of tests) {
    for (const test of testSuite.tests) {
      try {
        if (equalFunc(test.value1, test.value2) !== test.equal)
          console.error('different result', equalName, testSuite.description, test.description);
      } catch(e) {
        console.error(equalName, testSuite.description, test.description, e);
      }
    }
  }

  suite.add(equalName, function() {
    for (const testSuite of tests) {
      for (const test of testSuite.tests) {
        if (test.description != 'pseudo array and equivalent array are not equal')
          equalFunc(test.value1, test.value2);
      }
    }
  });
}

console.log();

suite
  .on('cycle', (event: any) => console.log(String(event.target)))
  .on('complete', function () {
    console.log('The fastest is ' + this.filter('fastest').map('name'));
  })
  .run({async: true});
