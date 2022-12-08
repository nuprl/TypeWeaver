'use strict';

module.exports = function repeat(ele: any, num: number): string {
  return Array(num + 1).join(1).split('').map(function (nil: string) {
    return ele;
  });
};

