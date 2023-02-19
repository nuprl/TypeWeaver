'use strict';

import fs from 'fs';
import path from 'path';
import bold from 'ansi-bold';

/**
 * Sanity check. run to ensure that all fns return a correct
 * result.
 */

fs.readdirSync(__dirname + '/code').forEach(function (fp: string) {
  var fn: string = require(path.resolve(__dirname, 'code', fp));
  var name: string = path.basename(fp, path.extname(fp));

  if (/./.test(name)) {
    fs.readdirSync(__dirname + '/fixtures').forEach(function (fixture: string) {
      fixture = path.resolve(__dirname, 'fixtures', fixture);
      if (/\.js$/.test(fixture)) {
        console.log(bold(name) + ':', fn.apply(null, require(fixture)));
      }
    });
  }
});
