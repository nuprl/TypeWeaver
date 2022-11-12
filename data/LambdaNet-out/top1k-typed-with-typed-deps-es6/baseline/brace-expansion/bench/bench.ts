'use strict';
import expand from '..';
import fs from 'fs';
const resfile: String = __dirname + '/../test/cases.txt';
const cases: Array = fs.readFileSync(resfile, 'utf8').split('\n');

bench('Average', function() {
  cases.forEach(function(testcase: Array) {
    expand(testcase);
  });
});
