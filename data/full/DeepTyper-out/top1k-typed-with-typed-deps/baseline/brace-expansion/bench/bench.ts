'use strict';
const expand: any = require('..');
const fs: any = require('fs');
const resfile: string = __dirname + '/../test/cases.txt';
const cases: any = fs.readFileSync(resfile, 'utf8').split('\n');

bench('Average', function() {
  cases.forEach(function(testcase: string) {
    expand(testcase);
  });
});
