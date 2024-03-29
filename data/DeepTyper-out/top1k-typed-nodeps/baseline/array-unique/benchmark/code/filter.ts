'use strict';

module.exports = function (arr: any) {
  var stack: any[] = [];
  return arr.filter(function (ele: any) {
    if (stack.indexOf(ele) > -1) {
      return false;
    }
    stack.push(ele);
    return true;
  });
};
