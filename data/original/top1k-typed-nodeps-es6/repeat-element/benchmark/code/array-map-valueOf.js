'use strict';

export default function repeat(ele, num) {
  return Array.apply(null, Array(num)).map(String.prototype.valueOf, ele);
};
