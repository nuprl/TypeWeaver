'use strict';

export default function unique(init: any[]): any[] {
  var args: any[] = [].slice.call(arguments);
  var len: number = args.length;

  for (var i = 1; i < len; i++) {
    var arr: any[] = args[i];

    var alen: number = arr.length;
    while (alen--) {
      var ele: string = arr[alen];
      if (init.indexOf(ele) === -1) {
        init.push(ele);
      }
    }
  }

  return init;
};
