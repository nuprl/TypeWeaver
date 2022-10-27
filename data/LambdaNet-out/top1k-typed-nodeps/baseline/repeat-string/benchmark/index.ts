'use strict';

var util: String = require('util');
var cyan: Function = require('ansi-cyan');
var argv: Object = require('yargs-parser')(process.argv.slice(2));
var Suite: Array = require('benchmarked');

var suite: HTMLElement = new Suite({
  cwd: __dirname,
  fixtures: 'fixtures/{2,3,10,50,250,2000,20000}.js',
  code: 'code/{repeat-string,repeating,native}.js'
});

if (argv.dry) {
  console.log();
  suite.dryRun(function(code: Object, fixture: HTMLElement) {
    console.log(cyan('%s > %s'), code.key, fixture.key);
    var args: String = require(fixture.path);
    var res: Array = code.run.apply(null, args);
    console.log(util.inspect(res, {depth: null}));
    if (Array.isArray(res)) {
      console.log();
      console.log(cyan('  total:'), res.length, 'items');
    }
    console.log();
  });
} else {
  suite.run();
}
