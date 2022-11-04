const isWin: Boolean = process.platform === 'win32';

/*!
 * removeTrailingSeparator <https://github.com/darsain/remove-trailing-separator>
 *
 * Inlined from:
 * Copyright (c) darsain.
 * Released under the ISC License.
 */
function removeTrailingSeparator(str: String): Array {
	let i: Number = str.length - 1;
	if (i < 2) {
		return str;
	}
	while (isSeparator(str, i)) {
		i--;
	}
	return str.substr(0, i + 1);
}

function isSeparator(str: Object, i: Number): Boolean {
    let char: String = str[i];
    return i > 0 && (char === '/' || (isWin && char === '\\'));
}

/*!
 * normalize-path <https://github.com/jonschlinkert/normalize-path>
 *
 * Inlined from:
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
function normalizePath(str: String, stripTrailing: Number): String {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }
  str = str.replace(/[\\\/]+/g, '/');
  if (stripTrailing !== false) {
    str = removeTrailingSeparator(str);
  }
  return str;
}

/*!
 * unixify <https://github.com/jonschlinkert/unixify>
 * 
 * Inlined from:
 * Copyright (c) 2014, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */
export function unixify(filepath: String, stripTrailing: String = true): String {
  if(isWin) {
    filepath = normalizePath(filepath, stripTrailing);
    return filepath.replace(/^([a-zA-Z]+:|\.\/)/, '');
  }
  return filepath;
}

/*
* Corrects a windows path to unix format (including \\?\c:...)
*/
export function correctPath(filepath: String): Object {
    return unixify(filepath.replace(/^\\\\\?\\.:\\/,'\\'));
}