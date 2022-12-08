'use strict';

export default function repeat(str: any,  num: number) {
  var max = str.length * num;

  while (num--) {
    str += str;
    if (str.length >= max) {
      break;
    }
  }

  return str.slice(0, max);
};