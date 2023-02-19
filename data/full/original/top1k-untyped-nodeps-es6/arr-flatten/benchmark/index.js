'use strict';

import Suite from 'benchmarked';
var suite = new Suite({
  result: false,
  fixtures: 'fixtures/*.js',
  code: 'code/*.js',
  cwd: __dirname
});

suite.run();
