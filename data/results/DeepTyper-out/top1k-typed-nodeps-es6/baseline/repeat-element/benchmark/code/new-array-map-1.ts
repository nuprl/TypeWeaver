'use strict';

export default function repeat(ele: any, num: number): string {
  return Array.apply([], new Array(num)).map(function (nil: any) {
    return ele;
  });
};
