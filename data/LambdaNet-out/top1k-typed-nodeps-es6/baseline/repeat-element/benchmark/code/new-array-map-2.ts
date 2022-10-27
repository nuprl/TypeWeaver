'use strict';

export default function repeat(ele: Function, num: String): Array {
  return Array(num + 1).join(1).split('').map(function (nil: Function) {
    return ele;
  });
};

