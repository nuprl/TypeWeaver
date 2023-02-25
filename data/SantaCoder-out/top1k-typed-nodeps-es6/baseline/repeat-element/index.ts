/*!
 * repeat-element <https://github.com/jonschlinkert/repeat-element>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

export default function repeat(ele: HTMLElement, num: number) {
  if (Array.prototype.fill) {
    return new Array(num).fill(ele);
  }

  var arr = new Array(num);

  for (var i = 0; i < num; i++) {
    arr[i] = ele;
  }

  return arr;
};