'use strict';

export default function (arr: any[]) {
  var stack = [];
  return arr.filter(function (ele: any) {
    if (stack.indexOf(ele) > -1) {
      return false;
    }
    stack.push(ele);
    return true;
  });
};