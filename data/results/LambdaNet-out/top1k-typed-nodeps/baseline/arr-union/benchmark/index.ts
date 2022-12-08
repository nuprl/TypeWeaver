'use strict';

var Suite: any[] = require('benchmarked');
var suite: object = new Suite({
  result: false,
  fixtures: 'fixtures/*.js',
  add: 'code/{2-1-0,current,array-union}.js',
  cwd: __dirname
});

suite.run();
