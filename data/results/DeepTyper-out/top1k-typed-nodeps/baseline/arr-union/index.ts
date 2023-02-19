'use strict';

module.exports = function union(init: any): any {
  if (!Array.isArray(init)) {
    throw new TypeError('arr-union expects the first argument to be an array.');
  }

  var len: number = arguments.length;
  var i: number = 0;

  while (++i < len) {
    var arg: any = arguments[i];
    if (!arg) continue;

    if (!Array.isArray(arg)) {
      arg = [arg];
    }

    for (var j = 0; j < arg.length; j++) {
      var ele: any = arg[j];

      if (init.indexOf(ele) >= 0) {
        continue;
      }
      init.push(ele);
    }
  }
  return init;
};
