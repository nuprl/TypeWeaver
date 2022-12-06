'use strict';

module.exports = function repeat(ele: Function, num: number): any[] {
  return Array(num + 1).join(1).split('').map(function (nil: Function) {
    return ele;
  });
};

