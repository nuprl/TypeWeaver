'use strict';

var opts: object = {alias: {fixtures: 'f', code: 'c'}};
import argvFactory from 'minimist';
const argv: object = argvFactory(process.argv.slice(2), opts);
import path from 'path';
import Suite from 'benchmarked';

var suite: HTMLElement = new Suite({
  fixtures: path.resolve(__dirname, 'fixtures', argv.f || '*.js'),
  code: path.resolve(__dirname, 'code', argv.c || '*.js'),
  cwd: __dirname
});

suite.run();
