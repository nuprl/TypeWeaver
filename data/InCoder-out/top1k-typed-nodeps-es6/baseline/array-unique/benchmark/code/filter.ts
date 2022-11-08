'use strict';

export default function (arr: Array<any>) {
  var stack = [];
  return arr.filter(function (ele: HTMLElement) {
    if (stack.indexOf(ele) > -1) {
      return false;
    }
    stack.push(ele);
    return true;
  });
};