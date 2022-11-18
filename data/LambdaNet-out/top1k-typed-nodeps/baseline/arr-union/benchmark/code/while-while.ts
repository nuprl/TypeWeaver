'use strict';

module.exports = function union(init: any[]): any[] {
  var len: number = arguments.length, i: number = 0;

  while (++i < len) {
    var arg: any[] = arrayify(arguments[i]);
    var alen: number = arg.length, j: number = 0;

    while (alen--) {
      var ele: string = arg[j++];

      if (init.indexOf(ele) === -1) {
        init.push(ele);
      }
    }
  }
  return init;
};

function arrayify(val: any[]): any[] {
  return Array.isArray(val) ? val : [val];
}
