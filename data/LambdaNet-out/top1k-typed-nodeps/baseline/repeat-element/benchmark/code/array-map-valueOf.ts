'use strict';

module.exports = function repeat(ele: String, num: String): Array {
  return Array.apply(null, Array(num)).map(String.prototype.valueOf, ele);
};
