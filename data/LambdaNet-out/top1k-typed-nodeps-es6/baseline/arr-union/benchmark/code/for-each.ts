'use strict';

import unique from 'array-unique';

export default function diff(init: Array): String {
  var args: Array = [].slice.call(arguments, 1);

  args.forEach(function (arr: Array) {
    arr.forEach(function(ele: String) {
      init.push(ele);
    });
  });

  return unique(init);
};
