'use strict';

export default function repeat(ele: any, num: number): boolean {
  return Array.prototype.map.call([] + Array(num + 1), function () {
    return ele;
  });
};
