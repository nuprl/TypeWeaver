'use strict';

module.exports = function repeat(ele: any,  num: number) {
  return Array.apply(null, Array(num)).map(String.prototype.valueOf, ele);
};