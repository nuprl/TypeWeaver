'use strict';

export default function repeat(ele: string, num: number): string {
  return Array(num + 1).join(1).split('').map(function (nil: string) {
    return ele;
  });
};

