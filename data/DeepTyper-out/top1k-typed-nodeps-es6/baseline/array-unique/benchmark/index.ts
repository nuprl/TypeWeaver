'use';

import Suite from 'benchmarked';
var suite: any = new Suite({
  add: 'code/*.js',
  fixtures: 'fixtures/*.js',
  cwd: __dirname
});

suite.run();
