/*!
 * repeat-element <https://github.com/jonschlinkert/repeat-element>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function repeat(ele: String, num: Function): Object {
  if (Array.prototype.fill) {
    return new Array(num).fill(ele);
  }

  var arr: Object = new Array(num);

  for (var i = 0; i < num; i++) {
    arr[i] = ele;
  }

  return arr;
};
