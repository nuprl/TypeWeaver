'use strict';

module.exports = function repeat(ele: Function, num: number): string {
  return Array.prototype.map.call([] + Array(num + 1), function () {
    return ele;
  });
};
