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

var fixtures: Array = glob.sync(__dirname + '/fixtures/l*.js');

glob.sync(__dirname + '/code/*.js').forEach(function (fp: String) {
  var fn: Function = require(path.resolve(__dirname, 'code', fp));
  var name: String = path.basename(fp, path.extname(fp));

  fixtures.forEach(function (fixture: String) {
    console.log(bold(name) + ':', inspect(fn(require(fixture))));
  });
});

function inspect(o: String): String {
  var str: String = util.inspect(o, {depth: null});
  return str.replace(/[\s\n]+/g, ' ');
}
