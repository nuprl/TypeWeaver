'use strict';

module.exports = function union(init: any): any {
  var len: number = arguments.length, i = 0;

  while (++i < len) {
    var arg: any = arguments[i];

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
