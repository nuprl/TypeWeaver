'use strict';

export default function repeat(ele: Function, num: String): Array {
  return Array.apply([], new Array(num)).map(function (nil: Function) {
    return ele;
  });
};
