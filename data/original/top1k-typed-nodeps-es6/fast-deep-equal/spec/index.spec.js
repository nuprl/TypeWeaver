'use strict';

import equal from '..';
import equalReact from '../react';
import es6equal from '../es6';
import es6equalReact from '../es6/react';
import assert from 'assert';

testCases(equal, 'equal - standard tests', require('./tests'));
testCases(es6equal, 'es6 equal - standard tests', require('./tests'));
testCases(es6equal, 'es6 equal - es6 tests', require('./es6tests'));

testCases(equalReact, 'equal react - standard tests', require('./tests'));
testCases(es6equalReact, 'es6 equal react - standard tests', require('./tests'));
testCases(es6equalReact, 'es6 equal react - es6 tests', require('./es6tests'));

function testCases(equalFunc, suiteName, suiteTests) {
  describe(suiteName, function() {
    suiteTests.forEach(function (suite) {
      describe(suite.description, function() {
        suite.tests.forEach(function (test) {
          (test.skip ? it.skip : it)(test.description, function() {
            assert.strictEqual(equalFunc(test.value1, test.value2), test.equal);
          });
          (test.skip ? it.skip : it)(test.description + ' (reverse arguments)', function() {
            assert.strictEqual(equalFunc(test.value2, test.value1), test.equal);
          });
        });
      });
    });
  });
}