'use strict';

export default function repeat(ele: any, num: number): string {
  return Array.apply(null, Array(num)).map(String.prototype.valueOf, ele);
};
