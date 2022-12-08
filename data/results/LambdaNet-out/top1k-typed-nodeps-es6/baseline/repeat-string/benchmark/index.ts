'use strict';

import util from 'util';
import cyan from 'ansi-cyan';
import argvFactory from 'yargs-parser';
const argv: HTMLElement = argvFactory(process.argv.slice(2));
import Suite from 'benchmarked';

var suite: HTMLElement = new Suite({
  cwd: __dirname,
  fixtures: 'fixtures/{2,3,10,50,250,2000,20000}.js',
  code: 'code/{repeat-string,repeating,native}.js'
});

if (argv.dry) {
  console.log();
  suite.dryRun(function(code: object, fixture: HTMLElement) {
    console.log(cyan('%s > %s'), code.key, fixture.key);
    var args: string = require(fixture.path);
    var res: any[] = code.run.apply(null, args);
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
