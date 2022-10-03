'use strict';

var Suite: any = require('benchmarked');
var suite: any = new Suite({
  result: false,
  fixtures: 'fixtures/*.js',
  code: 'code/*.js',
  cwd: __dirname
});

suite.run();
