'use strict';

export default function repeat(val: number, num: number) {
  if (arguments.length === 1) return '';
  return new Array(num + 1).join(val);
};