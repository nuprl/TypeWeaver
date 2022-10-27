'use';

var Suite: Array = require('benchmarked');
var suite: Object = new Suite({
  add: 'code/*.js',
  fixtures: 'fixtures/*.js',
  cwd: __dirname
});

suite.run();
