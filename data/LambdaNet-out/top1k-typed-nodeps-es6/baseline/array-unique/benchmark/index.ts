'use';

import Suite from 'benchmarked';
var suite: Object = new Suite({
  add: 'code/*.js',
  fixtures: 'fixtures/*.js',
  cwd: __dirname
});

suite.run();
