'use strict';

export default function repeat(str: string, num: number): string {
  var arr: any[] = [];
  arr[num] = '';
  return arr.join(str);
};