'use strict';

module.exports = function union(init: Array): Array {
  var len: Number = arguments.length, i: Number = 0;

  while (++i < len) {
    var arg: Array = arguments[i];

    for (var j = 0; j < arg.length; j++) {
      var ele: String = arg[j];

      if (init.indexOf(ele) === -1) {
        init.push(ele);
      }
    }
  }
  return init;
};
