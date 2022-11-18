'use strict';

import unique from 'array-unique';

export default function diff(init: any[]): string {
  var args: any[] = [].slice.call(arguments, 1);

  args.forEach(function (arr: any[]) {
    arr.forEach(function(ele: string) {
      init.push(ele);
    });
  });

  return unique(init);
};
