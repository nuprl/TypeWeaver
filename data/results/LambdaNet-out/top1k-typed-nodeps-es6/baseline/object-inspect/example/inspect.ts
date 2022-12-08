'use strict';

/* eslint-env browser */
import inspect from '../';

var d: HTMLInputElement = document.createElement('div');
d.setAttribute('id', 'beep');
d.innerHTML = '<b>wooo</b><i>iiiii</i>';

console.log(inspect([d, { a: 3, b: 4, c: [5, 6, [7, [8, [9]]]] }]));
