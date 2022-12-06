'use strict';

module.exports = function repeat(ele: any,  num: number) {
  return Array.apply([], new Array(num)).map(function (nil: Element) {
    return ele;
  });
};