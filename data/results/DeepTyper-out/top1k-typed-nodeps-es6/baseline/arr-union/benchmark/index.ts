'use strict';

import Suite from 'benchmarked';
var suite: any = new Suite({
  result: false,
  fixtures: 'fixtures/*.js',
  add: 'code/{2-1-0,current,array-union}.js',
  cwd: __dirname
});

suite.run();
