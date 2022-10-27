'use strict';

export default function repeat(str: String, num: Number): String {
  var max: Number = str.length * num;
  num = Math.ceil(Math.sqrt(num));

  while (num--) {
    str += str;

    if (str.length > max) {
      break;
    }
  }

  return str.slice(0, max);
};