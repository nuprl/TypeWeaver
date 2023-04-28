'use strict';

export default function repeat(val: string, num: number) {
  if (arguments.length === 1) return '';
  return new Array(num + 1).join(val);
};