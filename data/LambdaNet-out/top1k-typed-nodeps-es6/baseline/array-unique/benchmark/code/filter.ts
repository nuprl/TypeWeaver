'use strict';

export default function (arr: Array) {
  var stack: Array = [];
  return arr.filter(function (ele: String) {
    if (stack.indexOf(ele) > -1) {
      return false;
    }
    stack.push(ele);
    return true;
  });
};
