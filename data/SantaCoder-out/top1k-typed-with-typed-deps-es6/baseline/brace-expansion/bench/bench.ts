'use strict';
import expand from '..';
import fs from 'fs';
const resfile = __dirname + '/../test/cases.txt';
const cases = fs.readFileSync(resfile, 'utf8').split('\n');

bench('Average', function() {
  cases.forEach(function(testcase: TestCase) {
    expand(testcase);
  });
});