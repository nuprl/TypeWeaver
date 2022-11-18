'use strict';

export default function union(init: any[]): any[] {
  var len: number = arguments.length, i: number = 0;

  while (++i < len) {
    var arg: any[] = arguments[i];

    for (var j = 0; j < arg.length; j++) {
      var ele: string = arg[j];

      if (init.indexOf(ele) === -1) {
        init.push(ele);
      }
    }
  }
  return init;
};
