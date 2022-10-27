'use strict';

var isWindows: Boolean = process.platform === 'win32';

// Regex to split a windows path into into [dir, root, basename, name, ext]
var splitWindowsRe: RegExp =
    /^(((?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?[\\\/]?)(?:[^\\\/]*[\\\/])*)((\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))[\\\/]*$/;

var win32: Function = {};

function win32SplitPath(filename: String): Array {
  return splitWindowsRe.exec(filename).slice(1);
}

win32.parse = function(pathString: String) {
  if (typeof pathString !== 'string') {
    throw new TypeError(
        "Parameter 'pathString' must be a string, not " + typeof pathString
    );
  }
  var allParts: Object = win32SplitPath(pathString);
  if (!allParts || allParts.length !== 5) {
    throw new TypeError("Invalid path '" + pathString + "'");
  }
  return {
    root: allParts[1],
    dir: allParts[0] === allParts[1] ? allParts[0] : allParts[0].slice(0, -1),
    base: allParts[2],
    ext: allParts[4],
    name: allParts[3]
  };
};



// Split a filename into [dir, root, basename, name, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe: RegExp =
    /^((\/?)(?:[^\/]*\/)*)((\.{1,2}|[^\/]+?|)(\.[^.\/]*|))[\/]*$/;
var posix: Function = {};


function posixSplitPath(filename: String): Array {
  return splitPathRe.exec(filename).slice(1);
}


posix.parse = function(pathString: String) {
  if (typeof pathString !== 'string') {
    throw new TypeError(
        "Parameter 'pathString' must be a string, not " + typeof pathString
    );
  }
  var allParts: Array = posixSplitPath(pathString);
  if (!allParts || allParts.length !== 5) {
    throw new TypeError("Invalid path '" + pathString + "'");
  }
  
  return {
    root: allParts[1],
    dir: allParts[0].slice(0, -1),
    base: allParts[2],
    ext: allParts[4],
    name: allParts[3],
  };
};


if (isWindows)
  module.exports = win32.parse;
else /* posix */
  module.exports = posix.parse;

export const posix: HTMLElement = posix.parse;
export const win32: HTMLElement = win32.parse;
