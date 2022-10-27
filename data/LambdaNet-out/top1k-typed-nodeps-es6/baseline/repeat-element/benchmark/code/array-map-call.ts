'use strict';

export default function repeat(ele: Function, num: String): String {
  return Array.prototype.map.call([] + Array(num + 1), function () {
    return ele;
  });
};
