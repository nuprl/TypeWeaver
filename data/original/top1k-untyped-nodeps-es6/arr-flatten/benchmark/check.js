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

var fixtures = glob.sync(__dirname + '/fixtures/l*.js');

glob.sync(__dirname + '/code/*.js').forEach(function (fp) {
  var fn = require(path.resolve(__dirname, 'code', fp));
  var name = path.basename(fp, path.extname(fp));

  fixtures.forEach(function (fixture) {
    console.log(bold(name) + ':', inspect(fn(require(fixture))));
  });
});

function inspect(o) {
  var str = util.inspect(o, {depth: null});
  return str.replace(/[\s\n]+/g, ' ');
}
