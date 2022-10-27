'use strict';

module.exports = function unique(init: Array): Array {
  var args: Array = [].slice.call(arguments);
  var len: Number = args.length;

  for (var i = 1; i < len; i++) {
    var arr: Array = args[i];

    var alen: Number = arr.length;
    while (alen--) {
      var ele: String = arr[alen];
      if (init.indexOf(ele) === -1) {
        init.push(ele);
      }
    }
  }

  return init;
};
