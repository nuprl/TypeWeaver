'use strict';

module.exports = function union(init: Array): Array {
  if (!Array.isArray(init)) {
    throw new TypeError('arr-union expects the first argument to be an array.');
  }

  var len: Number = arguments.length;
  var i: Number = 0;

  while (++i < len) {
    var arg: Array = arguments[i];
    if (!arg) continue;

    if (!Array.isArray(arg)) {
      arg = [arg];
    }

    for (var j = 0; j < arg.length; j++) {
      var ele: String = arg[j];

      if (init.indexOf(ele) >= 0) {
        continue;
      }
      init.push(ele);
    }
  }
  return init;
};
