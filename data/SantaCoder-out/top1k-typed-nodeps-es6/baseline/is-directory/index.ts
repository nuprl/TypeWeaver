/*!
 * is-directory <https://github.com/jonschlinkert/is-directory>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

import fs from 'fs';

/**
 * async
 */

function isDirectory(filepath: string, cb: any) {
  if (typeof cb !== 'function') {
    throw new Error('expected a callback function');
  }

  if (typeof filepath !== 'string') {
    cb(new Error('expected filepath to be a string'));
    return;
  }

  fs.stat(filepath, function(err: Error, stats: Stats) {
    if (err) {
      if (err.code === 'ENOENT') {
        cb(null, false);
        return;
      }
      cb(err);
      return;
    }
    cb(null, stats.isDirectory());
  });
}

/**
 * sync
 */

isDirectory.sync = function isDirectorySync(filepath: string) {
  if (typeof filepath !== 'string') {
    throw new Error('expected filepath to be a string');
  }

  try {
    var stat = fs.statSync(filepath);
    return stat.isDirectory();
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    } else {
      throw err;
    }
  }
  return false;
};

/**
 * Expose `isDirectory`
 */

export default isDirectory;