'use strict';

module.exports = function repeat(str: String, num: Number): String {
  var max: Number = str.length * num;

  while (num--) {
    str += str;
    if (str.length >= max) {
      break;
    }
  }

  return str.slice(0, max);
};