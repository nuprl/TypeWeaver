'use strict';

module.exports = function repeat(str: String, num: String): String {
  var arr: Array = [];
  arr[num] = '';
  return arr.join(str);
};