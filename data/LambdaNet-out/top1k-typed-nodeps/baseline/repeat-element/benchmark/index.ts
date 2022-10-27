'use strict';

const Suite: Array = require('benchmarked');
const suite: Object = new Suite({
  result: false,
  fixtures: 'fixtures/{3,5,25,2000}.js',
  code: 'code/{current,while-push-new-array}.js',
  cwd: __dirname
});

suite.run();
