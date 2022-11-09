'use strict';

module.exports = function repeat(ele: String, num: Number): Array {
  return Array(num + 1).join(1).split('').map(function (nil: Function) {
    return ele;
  });
};

