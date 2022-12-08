'use';

var Suite: any = require('benchmarked');
var suite: any = new Suite({
  add: 'code/*.js',
  fixtures: 'fixtures/*.js',
  cwd: __dirname
});

suite.run();
