'use strict';

module.exports = function repeat(str: string, num: number): string {
  var max: number = str.length * num;
  num = Math.ceil(Math.sqrt(num));

  while (num--) {
    str += str;

    if (str.length > max) {
      break;
    }
  }

  return str.slice(0, max);
};