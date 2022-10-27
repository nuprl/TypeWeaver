'use strict';

var Suite: Array = require('benchmarked');
var suite: Object = new Suite({
  result: false,
  fixtures: 'fixtures/*.js',
  add: 'code/{2-1-0,current,array-union}.js',
  cwd: __dirname
});

suite.run();
