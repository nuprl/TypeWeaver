'use strict';

module.exports = function repeat(ele: any,  num: number) {
  return Array.prototype.map.call([] + Array(num + 1), function () {
    return ele;
  });
};