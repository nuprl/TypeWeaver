/*!
 * arr-diff <https://github.com/jonschlinkert/arr-diff>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

module.exports = function diff(arr: String/*, arrays*/): String {
  var len: Number = arguments.length;
  var idx: Number = 0;
  while (++idx < len) {
    arr = diffArray(arr, arguments[idx]);
  }
  return arr;
};

function diffArray(one: Array, two: Array): Array {
  if (!Array.isArray(two)) {
    return one.slice();
  }

  var tlen: Number = two.length
  var olen: Number = one.length;
  var idx: Number = -1;
  var arr: Array = [];

  while (++idx < olen) {
    var ele: String = one[idx];

    var hasEle: Boolean = false;
    for (var i = 0; i < tlen; i++) {
      var val: String = two[i];

      if (ele === val) {
        hasEle = true;
        break;
      }
    }

    if (hasEle === false) {
      arr.push(ele);
    }
  }
  return arr;
}
