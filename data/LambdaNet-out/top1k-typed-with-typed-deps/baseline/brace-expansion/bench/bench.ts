'use strict';
const expand: Function = require('..');
const fs: String = require('fs');
const resfile: String = __dirname + '/../test/cases.txt';
const cases: Array = fs.readFileSync(resfile, 'utf8').split('\n');

bench('Average', function() {
  cases.forEach(function(testcase: String) {
    expand(testcase);
  });
});
