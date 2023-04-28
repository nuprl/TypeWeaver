'use strict';

export default function repeat(ele: HTMLElement, num: number) {
  var arr = [];

  while (num--) {
    arr.push(ele);
  }

  return arr;
};