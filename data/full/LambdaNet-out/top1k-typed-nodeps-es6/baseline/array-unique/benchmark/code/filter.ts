'use strict';

export default function (arr: any[]) {
  var stack: any[] = [];
  return arr.filter(function (ele: string) {
    if (stack.indexOf(ele) > -1) {
      return false;
    }
    stack.push(ele);
    return true;
  });
};
