'use strict';

module.exports = function repeat(ele: HTMLElement, num: number) {
  return Array(num + 1).join(1).split('').map(function (nil: any) {
    return ele;
  });
};
