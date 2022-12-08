'use strict';

module.exports = function union(init: any): any {
  var len: number = arguments.length, i = 0;

  while (++i < len) {
    var arg: any = arrayify(arguments[i]);
    var alen: number = arg.length, j = 0;

    while (alen--) {
      var ele: any = arg[j++];

      if (init.indexOf(ele) === -1) {
        init.push(ele);
      }
    }
  }
  return init;
};

function arrayify(val: any): any {
  return Array.isArray(val) ? val : [val];
}
