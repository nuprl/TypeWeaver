'use strict';

const colors: any[] = require('..');
const justified: Function = require('justified');
let str: string = '';

/**
 * this is inspired by and modified from the
 * screenshot code and concept from chalk
 */

for (const key of Object.keys(colors.styles)) {
  let res: string = key;

  if (key === 'reset' || key === 'hidden' || key === 'grey' || key === 'verbose') {
    continue;
  }

  if (/bright/i.test(key)) {
    continue;
  }

  if (/^bg[^B]/.test(key)) {
    res = colors.black(res);
  }

  str += colors[key](res) + ' ';
}

console.log();
console.log();
console.log(justified(str, { width: 60, format: colors.unstyle, indent: '  ' }));
console.log();
console.log();
