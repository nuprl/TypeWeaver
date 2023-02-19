/*!
 * global-prefix <https://github.com/jonschlinkert/global-prefix>
 *
 * Copyright (c) 2015-present Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

import fs from 'fs';
import os from 'os';
import path from 'path';
import ini from 'ini';
let prefix: string;

const getPrefix: any = () => {
  if (process.env.PREFIX) return process.env.PREFIX;
  if (prefix) return prefix;

  // Start by checking if the global prefix is set by the user
  let home: any = os.homedir();

  // os.homedir() returns undefined if $HOME is not set; path.resolve requires strings
  if (home) {
    prefix = tryConfigPath(path.resolve(home, '.npmrc'));
  }

  if (prefix) {
    return prefix;
  }

  // Otherwise find the path of npm
  let npm: any = tryNpmPath();
  if (npm) {
    // Check the built-in npm config file
    prefix = tryConfigPath(path.resolve(npm, '..', '..', 'npmrc'));

    if (prefix) {
      // Now the global npm config can also be checked.
      prefix = tryConfigPath(path.resolve(prefix, 'etc', 'npmrc')) || prefix;
    }
  }

  if (!prefix) {
    let { APPDATA, DESTDIR, OSTYPE } = process.env;

    // c:\node\node.exe --> prefix=c:\node\
    if (process.platform === 'win32' || OSTYPE === 'msys' || OSTYPE === 'cygwin') {
      prefix = APPDATA ? path.join(APPDATA, 'npm') : path.dirname(process.execPath);
      return prefix;
    }

    // /usr/local/bin/node --> prefix=/usr/local
    prefix = path.dirname(path.dirname(process.execPath));

    // destdir only is respected on Unix
    if (DESTDIR) {
      prefix = path.join(DESTDIR, prefix);
    }
  }

  return prefix;
}

function tryNpmPath(): any {
  try {
    return fs.realpathSync(require('which').sync('npm'));
  } catch (err) { /* do nothing */ }
}

function tryConfigPath(configPath: string): any {
  try {
    return ini.parse(fs.readFileSync(configPath, 'utf-8')).prefix;
  } catch (err) { /* do nothing */ }
}

/**
 * Expose `prefix`
 */

Reflect.defineProperty(module, 'exports', {
  get() {
    return getPrefix();
  }
});
