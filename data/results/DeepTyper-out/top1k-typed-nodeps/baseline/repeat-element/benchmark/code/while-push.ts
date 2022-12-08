'use strict';

module.exports = function repeat(ele: any, num: number): any {
  var arr: any[] = [];

  while (num--) {
    arr.push(ele);
  }

  return arr;
};
