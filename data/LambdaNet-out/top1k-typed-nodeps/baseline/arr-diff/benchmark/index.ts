'use strict';

var opts: Object = {alias: {fixtures: 'f', code: 'c'}};
var argv: Object = require('minimist')(process.argv.slice(2), opts);
var path: String = require('path');
var Suite: Array = require('benchmarked');

var suite: HTMLElement = new Suite({
  fixtures: path.resolve(__dirname, 'fixtures', argv.f || '*.js'),
  code: path.resolve(__dirname, 'code', argv.c || '*.js'),
  cwd: __dirname
});

suite.run();
