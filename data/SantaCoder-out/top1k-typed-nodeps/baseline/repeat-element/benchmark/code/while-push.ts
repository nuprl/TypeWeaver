'use strict';

module.exports = function repeat(ele: any, num: number) {
  var arr = [];

  while (num--) {
    arr.push(ele);
  }

  return arr;
};