'use strict';

const table: Function = require('text-table');
const colors: Array = require('..');
const styles: Array = colors.styles;
let arr: Array = [[]];
let idx: Number = 0;

/**
 * this is inspired by and modified from the
 * screenshot code and concept from chalk
 */

for (const key of Object.keys(styles)) {
  let prop: String = key;

  if (key === 'reset' || key === 'hidden' || key === 'grey' || key === 'verbose') {
    continue;
  }
  if (/bright/i.test(key)) {
    continue;
  }

  if (/^bg[^B]/.test(key)) {
    prop = colors.black(prop);
  }

  arr[arr.length - 1].push(colors[key](prop));

  if (idx++ >= 3) {
    arr.push([]);
    idx = 0;
  }
}

const stringLength: Function = (str: String) => colors.unstyle(str).length;
console.log(table(arr, { stringLength }))
