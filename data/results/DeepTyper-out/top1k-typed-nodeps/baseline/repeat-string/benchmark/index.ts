'use strict';

var util: any = require('util');
var cyan: any = require('ansi-cyan');
var argv: any = require('yargs-parser')(process.argv.slice(2));
var Suite: any = require('benchmarked');

var suite: any = new Suite({
  cwd: __dirname,
  fixtures: 'fixtures/{2,3,10,50,250,2000,20000}.js',
  code: 'code/{repeat-string,repeating,native}.js'
});

if (argv.dry) {
  console.log();
  suite.dryRun(function(code: string, fixture: any) {
    console.log(cyan('%s > %s'), code.key, fixture.key);
    var args: any = require(fixture.path);
    var res: any = code.run.apply(null, args);
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
