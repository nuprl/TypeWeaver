/*!
 * arr-diff <https://github.com/jonschlinkert/arr-diff>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

export default function diff(arr: string/*, arrays*/): object {
  var len: number = arguments.length;
  var idx: number = 0;
  while (++idx < len) {
    arr = diffArray(arr, arguments[idx]);
  }
  return arr;
};

function diffArray(one: any[], two: any[]): any[] {
  if (!Array.isArray(two)) {
    return one.slice();
  }

  var tlen: number = two.length
  var olen: number = one.length;
  var idx: number = -1;
  var arr: any[] = [];

  while (++idx < olen) {
    var ele: string = one[idx];

    var hasEle: boolean = false;
    for (var i = 0; i < tlen; i++) {
      var val: string = two[i];

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
