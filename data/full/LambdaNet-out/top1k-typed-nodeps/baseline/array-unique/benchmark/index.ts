'use';

var Suite: any[] = require('benchmarked');
var suite: object = new Suite({
  add: 'code/*.js',
  fixtures: 'fixtures/*.js',
  cwd: __dirname
});

suite.run();
