'use strict';

var fs: any = require('fs');
var path: any = require('path');
var bold: any = require('ansi-bold');

/**
 * Sanity check. run to ensure that all fns return a correct
 * result.
 */

fs.readdirSync(__dirname + '/code').forEach(function (fp: any) {
  var fn: any = require(path.resolve(__dirname, 'code', fp));
  var name: any = path.basename(fp, path.extname(fp));

  if (/./.test(name)) {
    fs.readdirSync(__dirname + '/fixtures').forEach(function (fixture: any) {
      fixture = path.resolve(__dirname, 'fixtures', fixture);
      if (/\.js$/.test(fixture)) {
        console.log(bold(name) + ':', fn.apply(null, require(fixture)));
      }
    });
  }
});
