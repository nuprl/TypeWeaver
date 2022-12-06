'use strict';

module.exports = function repeat(ele: any, num: number): any {
  return Array.prototype.map.call([] + Array(num + 1), function () {
    return ele;
  });
};
