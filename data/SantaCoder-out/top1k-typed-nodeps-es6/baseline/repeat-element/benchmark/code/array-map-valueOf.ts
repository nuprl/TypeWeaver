'use strict';

export default function repeat(ele: HTMLElement, num: number) {
  return Array.apply(null, Array(num)).map(String.prototype.valueOf, ele);
};