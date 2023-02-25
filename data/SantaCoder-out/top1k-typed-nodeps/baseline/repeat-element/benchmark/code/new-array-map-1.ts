'use strict';

module.exports = function repeat(ele: HTMLElement, num: number) {
  return Array.apply([], new Array(num)).map(function (nil: any) {
    return ele;
  });
};