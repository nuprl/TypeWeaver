'use strict';

import unique from 'array-unique';

export default function diff(init: any) {
  var args = [].slice.call(arguments, 1);

  args.forEach(function (arr: number[]) {
    arr.forEach(function(ele: HTMLElement) {
      init.push(ele);
    });
  });

  return unique(init);
};