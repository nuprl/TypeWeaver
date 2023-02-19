'use strict';

module.exports = function repeat(str: any,  num: number) {
  var arr = [];
  arr[num] = '';
  return arr.join(str);
};