/*!
 * array-unique <https://github.com/jonschlinkert/array-unique>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

export default function unique(arr: Array): Array {
  if (!Array.isArray(arr)) {
    throw new TypeError('array-unique expects an array.');
  }

  var len: Number = arr.length;
  var i: Number = -1;

  while (i++ < len) {
    var j: Number = i + 1;

    for (; j < arr.length; ++j) {
      if (arr[i] === arr[j]) {
        arr.splice(j--, 1);
      }
    }
  }
  return arr;
};

export const immutable: Function = function uniqueImmutable(arr: Array): Number {
  if (!Array.isArray(arr)) {
    throw new TypeError('array-unique expects an array.');
  }

  var arrLen: Number = arr.length;
  var newArr: Object = new Array(arrLen);

  for (var i = 0; i < arrLen; i++) {
    newArr[i] = arr[i];
  }

  return module.exports(newArr);
};
