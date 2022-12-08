/*!
 * global-modules <https://github.com/jonschlinkert/global-modules>
 *
 * Copyright (c) 2015-2017 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

const path: any = require('path');
const prefix: any = require('global-prefix');
let gm: any;

function getPath(): string {
  if (process.platform === 'win32' || process.env.OSTYPE === 'msys' || process.env.OSTYPE === 'cygwin') {
    return path.resolve(prefix, 'node_modules');
  }
  return path.resolve(prefix, 'lib/node_modules');
}

/**
 * Expose `global-modules` path
 */

Reflect.defineProperty(module, 'exports', {
  get() {
    return gm || (gm = getPath());
  }
});
