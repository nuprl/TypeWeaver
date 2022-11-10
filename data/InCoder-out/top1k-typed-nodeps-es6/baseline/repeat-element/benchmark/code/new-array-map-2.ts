'use strict';

export default function repeat(ele: any,  num: number) {
  return Array(num + 1).join(1).split('').map(function (nil: any) {
    return ele;
  });
};
