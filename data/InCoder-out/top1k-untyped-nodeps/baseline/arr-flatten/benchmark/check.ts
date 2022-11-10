'use strict';

var path = require('path');
var util = require('util');
var glob = require('glob');
var bold = require('ansi-bold');

/**
 * Sanity check
 *
 * Run to ensure that all fns return the same, correct result.
 */

var fixtures = glob.sync(__dirname + '/fixtures/l*.js');

glob.sync(__dirname + '/code/*.js').forEach(function (fp: number) {
  var fn = require(path.resolve(__dirname, 'code', fp));
  var name = path.basename(fp, path.extname(fp));

  fixtures.forEach(function (fixture: ComponentFixture) {
    console.log(bold(name) + ':', inspect(fn(require(fixture))));
  });
});

function inspect(o: any) {
  var str = util.inspect(o, {depth: null});
  return str.replace(/[\s\n]+/g, ' ');
}