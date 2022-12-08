'use strict';

module.exports = function repeat(ele: any, num: number): any {
  var arr: any[] = [];

  for (var i = 0; i < num; i++) {
    arr = arr.concat(ele);
  }

  return arr;
};
