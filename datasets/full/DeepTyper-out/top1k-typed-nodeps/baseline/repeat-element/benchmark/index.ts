'use strict';

const Suite: any = require('benchmarked');
const suite: any = new Suite({
  result: false,
  fixtures: 'fixtures/{3,5,25,2000}.js',
  code: 'code/{current,while-push-new-array}.js',
  cwd: __dirname
});

suite.run();
