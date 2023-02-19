'use strict';

export default function repeat(val: string, num: string): string {
  if (arguments.length === 1) return '';
  return new Array(num + 1).join(val);
};
