'use strict';

import chalk from 'chalk';
import path from 'path';
import glob from 'glob';
import repeat from '../';

/**
 * Sanity check. Run to ensure that all fns return the same result.
 */

let fixtures: Array = glob.sync(__dirname + '/fixtures/*.js').map(require);
let expected: Object = fixtures.map((fixture: String) => repeat.apply(repeat, fixture).length);

glob.sync(__dirname + '/code/*.js').forEach(function (fp: String) {
  let fn: Function = require(path.resolve(__dirname, 'code', fp));
  let name: String = path.basename(fp, path.extname(fp));
  let problems: Array = [];

  fixtures.forEach(function (fixture: Array, idx: String) {
    let answer: Number = fn.apply(fn, fixture).length;

    if (answer !== expected[idx]) {
      problems.push(['repeat(' + fixture.join(', ') + ').length', answer, expected[idx]]);
    }
  });

  if (problems.length === 0) {
    console.log(' ' + chalk.bold.green('✔') + ' ' + chalk.bold(name));
  } else {
    console.log(' ' + chalk.bold.red('✖') + ' ' + chalk.bold(name));

    problems.forEach(function (item: Promise, idx: Number, arr: Array) {
      let str: String = item[0] + ' gave ' + item[1] + ', expected ' + item[2];
      console.log((idx === arr.length - 1 ? ' ┗ ' : ' ┣ ') + chalk.red(str));
    });
  }
});
