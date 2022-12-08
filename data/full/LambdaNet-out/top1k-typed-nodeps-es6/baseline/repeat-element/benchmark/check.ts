'use strict';

import chalk from 'chalk';
import path from 'path';
import glob from 'glob';
import repeat from '../';

/**
 * Sanity check. Run to ensure that all fns return the same result.
 */

let fixtures: any[] = glob.sync(__dirname + '/fixtures/*.js').map(require);
let expected: object = fixtures.map((fixture: string) => repeat.apply(repeat, fixture).length);

glob.sync(__dirname + '/code/*.js').forEach(function (fp: string) {
  let fn: Function = require(path.resolve(__dirname, 'code', fp));
  let name: string = path.basename(fp, path.extname(fp));
  let problems: any[] = [];

  fixtures.forEach(function (fixture: any[], idx: string) {
    let answer: number = fn.apply(fn, fixture).length;

    if (answer !== expected[idx]) {
      problems.push(['repeat(' + fixture.join(', ') + ').length', answer, expected[idx]]);
    }
  });

  if (problems.length === 0) {
    console.log(' ' + chalk.bold.green('✔') + ' ' + chalk.bold(name));
  } else {
    console.log(' ' + chalk.bold.red('✖') + ' ' + chalk.bold(name));

    problems.forEach(function (item: Promise, idx: number, arr: any[]) {
      let str: string = item[0] + ' gave ' + item[1] + ', expected ' + item[2];
      console.log((idx === arr.length - 1 ? ' ┗ ' : ' ┣ ') + chalk.red(str));
    });
  }
});
