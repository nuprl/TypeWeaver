'use strict';

export default function repeat(ele: Function, num: string): any[] {
  return Array.apply([], new Array(num)).map(function (nil: Function) {
    return ele;
  });
};
