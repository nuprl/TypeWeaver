'use strict';

export default function repeat(ele: Function, num: String): Array {
  return Array.apply(null, Array(num)).map(String.prototype.valueOf, ele);
};
