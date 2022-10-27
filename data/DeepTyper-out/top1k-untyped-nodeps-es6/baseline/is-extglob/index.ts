/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var regex: RegExp = /(\\).|([@?!+*]\(.*\))/;

export default function isExtglob(str: string): boolean {
  if (typeof str !== 'string' || str === '') {
    return false;
  }

  var match: any;
  while ((match = regex.exec(str))) {
    if (match[2]) return true;
    str = str.slice(match.index + match[0].length);
  }

  return false;
};
