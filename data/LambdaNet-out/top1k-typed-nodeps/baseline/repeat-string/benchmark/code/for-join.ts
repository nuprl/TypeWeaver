'use strict';

module.exports = function repeat(val: String, num: Number): String {
  num += 1;
  var arr: Array;
  for (arr = []; 0 < num; num -= 1, arr[num] = '');
  return arr.join(val);
};
