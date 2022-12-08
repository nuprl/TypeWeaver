'use strict';

module.exports = function repeat(ele: any, num: number): any {
  return Array.apply([], new Array(num)).map(function (nil: any) {
    return ele;
  });
};
