'use strict';

var isGlob: Function = require('is-glob');
var pathPosixDirname: Function = require('path').posix.dirname;
var isWin32: Boolean = require('os').platform() === 'win32';

var slash: String = '/';
var backslash: RegExp = /\\/g;
var escaped: RegExp = /\\([!*?|[\](){}])/g;

/**
 * @param {string} str
 * @param {Object} opts
 * @param {boolean} [opts.flipBackslashes=true]
 */
module.exports = function globParent(str: String, opts: Object): String {
  var options: Object = Object.assign({ flipBackslashes: true }, opts);

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

function isEnclosure(str: String): Boolean {
  var lastChar: String = str.slice(-1);

  var enclosureStart: String;
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

  var foundIndex: Number = str.indexOf(enclosureStart);
  if (foundIndex < 0) {
    return false;
  }

  return str.slice(foundIndex + 1, -1).includes(slash);
}

function isGlobby(str: Object): Boolean {
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
