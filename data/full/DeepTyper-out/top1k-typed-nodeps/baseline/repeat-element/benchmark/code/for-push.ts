'use strict';

module.exports = function repeat(ele: any, num: number): any {
  var arr: any[] = [];

  for (var i = num; i > 0; i--) {
    arr.push(ele);
  }

  return arr;
};
