'use strict';

module.exports = function repeat(val: any,  num: number) {
  num += 1;
  var arr;
  for (arr = []; 0 < num; num -= 1, arr[num] = '');
  return arr.join(val);
};