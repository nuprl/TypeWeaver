'use strict';

module.exports = function repeat(ele: String, num: String): Array {
  return Array.apply([], new Array(num)).map(function (nil: Function) {
    return ele;
  });
};
