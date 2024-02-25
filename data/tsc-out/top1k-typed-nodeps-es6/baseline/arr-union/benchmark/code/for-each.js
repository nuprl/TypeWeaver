'use strict';

import unique from 'array-unique';

export default function diff(init) {
  var args = [].slice.call(arguments, 1);

  args.forEach(function (arr) {
    arr.forEach(function(ele) {
      init.push(ele);
    });
  });

  return unique(init);
};
