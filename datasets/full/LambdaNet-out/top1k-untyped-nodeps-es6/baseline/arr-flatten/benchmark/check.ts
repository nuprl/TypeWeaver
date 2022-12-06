'use strict';

import path from 'path';
import util from 'util';
import glob from 'glob';
import bold from 'ansi-bold';

/**
 * Sanity check
 *
 * Run to ensure that all fns return the same, correct result.
 */

var fixtures: any[] = glob.sync(__dirname + '/fixtures/l*.js');

glob.sync(__dirname + '/code/*.js').forEach(function (fp: string) {
  var fn: Function = require(path.resolve(__dirname, 'code', fp));
  var name: string = path.basename(fp, path.extname(fp));

  fixtures.forEach(function (fixture: string) {
    console.log(bold(name) + ':', inspect(fn(require(fixture))));
  });
});

function inspect(o: string): string {
  var str: string = util.inspect(o, {depth: null});
  return str.replace(/[\s\n]+/g, ' ');
}
