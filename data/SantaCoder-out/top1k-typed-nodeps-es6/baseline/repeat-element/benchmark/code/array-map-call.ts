'use strict';

export default function repeat(ele: HTMLElement, num: number) {
  return Array.prototype.map.call([] + Array(num + 1), function () {
    return ele;
  });
};