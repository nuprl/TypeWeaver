'use strict';

export default function repeat(ele: Function, num: string): any[] {
  return Array.apply(null, Array(num)).map(String.prototype.valueOf, ele);
};
