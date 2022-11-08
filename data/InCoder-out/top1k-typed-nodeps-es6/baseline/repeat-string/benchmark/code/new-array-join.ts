'use strict';

export default function repeat(val: any,  num: number) {
  if (arguments.length === 1) return '';
  return new Array(num + 1).join(val);
};