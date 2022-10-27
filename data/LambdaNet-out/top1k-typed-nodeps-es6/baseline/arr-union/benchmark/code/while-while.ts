'use strict';

export default function union(init: Array): Array {
  var len: Number = arguments.length, i: Number = 0;

  while (++i < len) {
    var arg: Array = arrayify(arguments[i]);
    var alen: Number = arg.length, j: Number = 0;

    while (alen--) {
      var ele: String = arg[j++];

      if (init.indexOf(ele) === -1) {
        init.push(ele);
      }
    }
  }
  return init;
};

function arrayify(val: Array): Array {
  return Array.isArray(val) ? val : [val];
}
