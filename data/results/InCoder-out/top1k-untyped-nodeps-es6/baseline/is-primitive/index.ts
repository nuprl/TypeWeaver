/*!
 * is-primitive <https://github.com/jonschlinkert/is-primitive>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

export default function isPrimitive(val: any) {
  if (typeof val === 'object') {
    return val === null;
  }
  return typeof val !== 'function';
};