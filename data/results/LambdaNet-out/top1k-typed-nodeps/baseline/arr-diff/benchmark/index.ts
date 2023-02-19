'use strict';

var opts: object = {alias: {fixtures: 'f', code: 'c'}};
var argv: object = require('minimist')(process.argv.slice(2), opts);
var path: string = require('path');
var Suite: any[] = require('benchmarked');

var suite: HTMLElement = new Suite({
  fixtures: path.resolve(__dirname, 'fixtures', argv.f || '*.js'),
  code: path.resolve(__dirname, 'code', argv.c || '*.js'),
  cwd: __dirname
});

suite.run();
