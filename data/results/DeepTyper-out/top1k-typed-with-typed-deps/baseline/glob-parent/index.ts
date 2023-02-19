'use strict';

var isGlob: any = require('is-glob');
var pathPosixDirname: any = require('path').posix.dirname;
var isWin32: any = require('os').platform() === 'win32';

var slash: string = '/';
var backslash: string = /\\/g;
var escaped: string = /\\([!*?|[\](){}])/g;

/**
 * @param {string} str
 * @param {Object} opts
 * @param {boolean} [opts.flipBackslashes=true]
 */
module.exports = function globParent(str: string, opts: any): string {
  var options: any = Object.assign({ flipBackslashes: true }, opts);

  // flip windows path separators
  if (options.flipBackslashes && isWin32 && str.indexOf(slash) < 0) {
    str = str.replace(backslash, slash);
  }

  // special case for strings ending in enclosure containing path separator
  if (isEnclosure(str)) {
    str += slash;
  }

  // preserves full path in case of trailing path separator
  str += 'a';

  // remove path parts that are globby
  do {
    str = pathPosixDirname(str);
  } while (isGlobby(str));

  // remove escape chars and return result
  return str.replace(escaped, '$1');
};

function isEnclosure(str: string): string {
  var lastChar: string = str.slice(-1);

  var enclosureStart: any;
  switch (lastChar) {
    case '}':
      enclosureStart = '{';
      break;
    case ']':
      enclosureStart = '[';
      break;
    default:
      return false;
  }

  var foundIndex: boolean = str.indexOf(enclosureStart);
  if (foundIndex < 0) {
    return false;
  }

  return str.slice(foundIndex + 1, -1).includes(slash);
}

function isGlobby(str: string): boolean {
  if (/\([^()]+$/.test(str)) {
    return true;
  }
  if (str[0] === '{' || str[0] === '[') {
    return true;
  }
  if (/[^\\][{[]/.test(str)) {
    return true;
  }
  return isGlob(str);
}
